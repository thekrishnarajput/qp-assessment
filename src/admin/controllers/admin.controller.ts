import { validationResult } from "express-validator";
import { HttpStatus } from "../../utils/common/enums/httpStatusCodes";
import { LoggerType } from "../../utils/common/enums/loggerTypes";
import { Roles } from "../../utils/common/enums/roles";
import { Status } from "../../utils/common/enums/status";
import { printLogger } from "../../utils/common/functions/logger";
import { messages } from "../../utils/common/functions/message";
import { comparePassword, hashPassword } from "../../utils/common/functions/passwordHashing";
import { iRequest, iResponse, iNextFunction } from "../../utils/common/interfaces/types.interface";
import { response } from "../../utils/middlewares/response";
import iAdmin from "../interfaces/admin.interface";
import adminModel from "../models/admin.model";
import { genAdminToken } from "../../utils/middlewares/token";


// Auto admin create controller
export const autoCreateAdminController = async () => {
    try {
        const { ADMIN_NAME, ADMIN_NAME2, ADMIN_EMAIL, ADMIN_EMAIL2, ADMIN_PASSWORD, ADMIN_PASSWORD2, ADMIN_MOBILE, ADMIN_MOBILE2 } = process.env;

        let adminDataArray: Array<iAdmin> = [
            {
                name: (ADMIN_NAME + ""),
                email: (ADMIN_EMAIL || ""),
                mobile_number: parseInt((ADMIN_MOBILE || ""), 10),
                password: await hashPassword((ADMIN_PASSWORD + "")),
                role: Roles.adminRoleId,
                status: Status.activeStatus,
                created_at: new Date()
            },
            {
                name: (ADMIN_NAME2 + ""),
                email: (ADMIN_EMAIL2 || ""),
                mobile_number: parseInt((ADMIN_MOBILE2 || ""), 10),
                password: await hashPassword((ADMIN_PASSWORD2 + "")),
                role: Roles.adminRoleId,
                status: Status.activeStatus,
                created_at: new Date()
            }
        ];

        adminDataArray.forEach(async (result: any) => {
            let adminResult = await adminModel.getAdmin(result.email);

            if (adminResult.length === 0) {
                let saveAdminResult = await adminModel.createAdmin(result);
                if (saveAdminResult) {
                    console.log(`Admin ${saveAdminResult.insertId} created successfully!`);
                }
                else {
                    console.log("Admin creation failed, something went wrong: ", saveAdminResult);
                }
            }
            else {
                console.log(`Admin ${adminResult[0].id} is already created!`);
            }
        });
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "autoCreateAdminController", "admin.controller.ts");
    }
};

// Admin login controller
export const adminLoginController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        let Body = req.body;
        console.log("Body:-", Body);

        let adminEmail = Body?.email.trim();;
        let adminPassword: string = (Body?.password + "").trim();
        const adminResult = await adminModel.getAdmin(adminEmail);
        if (adminResult.length > 0) {

            const { password, ...restProps } = adminResult[0];
            if (password) {
                let passwordMatched = await comparePassword(adminPassword, password);
                if (passwordMatched) {
                    const jwt = await genAdminToken(restProps);
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
        printLogger(LoggerType.error, error.message, "adminLoginController", "admin.controller.ts");
        next(error);
    }
};