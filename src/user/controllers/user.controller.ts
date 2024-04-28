import { validationResult } from "express-validator";
import { HttpStatus } from "../../utils/common/enums/httpStatusCodes";
import { response } from "../../utils/middlewares/response";
import { messages } from "../../utils/common/functions/message";
import { iNextFunction, iRequest, iResponse } from "../../utils/common/interfaces/types.interface";
import iUser from "../interfaces/user.interface";
import { printLogger } from "../../utils/common/functions/logger";
import { LoggerType } from "../../utils/common/enums/loggerTypes";
import { comparePassword, hashPassword } from "../../utils/common/functions/passwordHashing";
import userModel from "../models/user.model";
import { Status } from "../../utils/common/enums/status";
import { Roles } from "../../utils/common/enums/roles";
import { genToken } from "../../utils/middlewares/token";


// Register user controller
export const registerUserController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }

        let Body: iUser = req.body;
        const userExists = await userModel.getUserByEmail(Body.email);

        if (userExists.length) {
            return response(res, HttpStatus.badRequest, false, messages.alreadyExists(`email: ${Body.email}`), null);
        }

        const userMobileExists = await userModel.getUserByMobile(Body.mobile_number);

        if (userMobileExists.length) {
            return response(res, HttpStatus.badRequest, false, messages.alreadyExists(`mobile no: ${Body.mobile_number}`), null);
        }

        Body.password = await hashPassword((Body?.password));
        Body.status = Status.inactiveStatus;
        Body.role = Roles.userRoleId;

        let saveResult = await userModel.createUser(Body);
        if (saveResult.affectedRows === undefined) {
            return response(res, HttpStatus.internalServerError, false, messages.userNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.userSaved(), saveResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "registerUserController", "user.controller.ts");
    }
};

// User login controller
export const userLoginController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }

        let Body = req.body;

        let userEmail = Body?.email.trim();;
        let userPassword: string = (Body?.password + "").trim();
        const userResult = await userModel.getUserByEmail(userEmail);
        if (userResult.length > 0) {

            const { password, ...restProps } = userResult[0];
            // Check if the user is blocked or deleted
            if (restProps.status === Status.deletedStatus || restProps.status === Status.blockedStatus) {
                return response(res, HttpStatus.forbidden, false, messages.blockedOrDeletedMessage(), null);
            }

            if (password) {
                let passwordMatched = await comparePassword(userPassword, password);
                if (passwordMatched) {
                    // Check if the user is logging in for the first time then mark the status as active
                    if (restProps.status === Status.inactiveStatus) {
                        let updateResult = await userModel.updateUserById(restProps.id, { status: Status.activeStatus });
                        if (updateResult.affectedRows > 0) {
                            restProps.status = Status.activeStatus;
                        }
                    }
                    const jwt = await genToken(restProps);
                    let responseData = {
                        ...restProps,
                        token: jwt
                    };
                    return response(res, HttpStatus.ok, true, messages.loginSuccess(), responseData);
                }
                return response(res, HttpStatus.unauthorized, false, messages.incorrectPassword(), null);
            }
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "userLoginController", "user.controller.ts");
        next(error);
    }
};

// Update user controller
export const updateUserController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }
        let Body: iUser = req.body;
        // Destruct the Body object so user can't modify the crucial fields
        const { id, role, status, email, mobile_number, ...restBodyProps } = Body;

        let userId: number = req.user?.role === Roles.adminRoleId ? +(id || "") : +(req.user?.id);

        var userResult = await userModel.getUserById(userId);

        if (userResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        const { password: userPassword } = userResult[0];

        // Check if old password is same as new password
        let oldPassword = await comparePassword(restBodyProps.password, userPassword);
        if (oldPassword) {
            return response(res, HttpStatus.found, false, messages.oldPasswordExists(), null);
        }
        restBodyProps.password = await hashPassword(restBodyProps.password);
        const updateResult = await userModel.updateUserById(userId, restBodyProps);

        if (updateResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.updatedFailed(), null);
        }
        var { password, ...restUserProps } = (await userModel.getUserById(userId))[0];
        return response(res, HttpStatus.ok, true, messages.updatedSuccess(), restUserProps);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateUserController", "user.controller.ts");
    }
};

// delete user controller
export const deleteUserController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }
        let id: number = req.user?.role === Roles.adminRoleId ? req.body?.id : +(req.user?.id);

        let userResult = await userModel.getUserById(id);

        if (userResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        // Soft delete user by updating the status as deleted
        let updateStatus = { status: Status.deletedStatus };

        const updateResult = await userModel.updateUserById(id, updateStatus);

        if (updateResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.deletedFailed(), null);
        }
        const { password, ...restUserProps } = (await userModel.getUserById(id))[0];
        return response(res, HttpStatus.ok, true, messages.deletedSuccess(), restUserProps);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "deleteUserController", "user.controller.ts");
    }
};

// Get user data
export const getUserController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }
        let id: number = +(req.params?.id);

        let userResult = await userModel.getUserById(id);

        if (userResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        const { password, ...restUserProps } = userResult[0];
        return response(res, HttpStatus.ok, true, messages.dataFound(), restUserProps);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getUserController", "user.controller.ts");
    }
};

// Get all users data
export const getAllUsersController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {

        let userResult = await userModel.getAllUsers();

        if (userResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let responseData = {
            count: userResult.length,
            users: userResult
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllUsersController", "user.controller.ts");
    }
};