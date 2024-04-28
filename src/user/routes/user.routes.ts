import { Router } from "express";
import { validator } from "../../utils/middlewares/validationHandler";

import { Roles } from "../../utils/common/enums/roles";
import { permit } from "../../utils/middlewares/permissionHandler";
import { auth } from "../../utils/middlewares/token";
import { deleteUserController, getAllUsersController, getUserController, registerUserController, updateUserController, userLoginController } from "../controllers/user.controller";

export const userRouter = Router();

// Register user data
userRouter.post("/register",
    validator.name,
    validator.email,
    validator.mobileNumber,
    validator.password,
    registerUserController);

userRouter.post("/login",
    validator.email,
    validator.password,
    userLoginController);

userRouter.post("/update-user",
    auth,
    permit([Roles.userRoleId, Roles.adminRoleId]), // User and admin both can perform this task
    updateUserController);

userRouter.post("/delete-user",
    auth,
    permit([Roles.userRoleId, Roles.adminRoleId]), // User and admin both can perform this task
    deleteUserController);

userRouter.get("/get-user/:id",
    auth,
    permit([Roles.adminRoleId]), // Admin can perform this task
    validator.id,
    getUserController);

userRouter.get("/get-all-users",
    auth,
    permit([Roles.adminRoleId]), // Admin can perform this task
    getAllUsersController);