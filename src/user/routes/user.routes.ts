import { Router } from "express";
import { validator } from "../../utils/middlewares/validationHandler";

import { Roles } from "../../utils/common/enums/roles";
import { permit } from "../../utils/middlewares/permissionHandler";
import { auth } from "../../utils/middlewares/token";
import { registerUserController, userLoginController } from "../controllers/user.controller";

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