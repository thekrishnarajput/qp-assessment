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
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        let Body: iUser = req.body;
        if (!Body) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        Body.password = await hashPassword((Body?.password));
        Body.status = Status.inactiveStatus;
        Body.role = Roles.userRoleId;

        let saveResult = await userModel.createUser(Body);
        if (!saveResult) {
            return response(res, HttpStatus.notModified, false, messages.itemNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.itemSaved(), saveResult);
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
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        let Body = req.body;
        console.log("Body:-", Body);

        let userEmail = Body?.email.trim();;
        let userPassword: string = (Body?.password + "").trim();
        const userResult = await userModel.getUser(userEmail);
        if (userResult.length > 0) {

            const { password, ...restProps } = userResult[0];
            if (password) {
                let passwordMatched = await comparePassword(userPassword, password);
                if (passwordMatched) {
                    const jwt = await genToken(restProps);
                    return response(res, HttpStatus.ok, true, messages.loginSuccess(), jwt);
                }
                return response(res, HttpStatus.notFound, false, messages.incorrectPassword(), null);
            }
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
    }
    catch (error: any) {
        console.log("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "userLoginController", "user.controller.ts");
        next(error);
    }
};