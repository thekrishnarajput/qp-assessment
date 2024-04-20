import { Router } from "express";
import { adminLoginController } from "../controllers/admin.controller";
import { validator } from "../../utils/middlewares/validationHandler";

export const adminRouter = Router();

adminRouter.post("/login",
    validator.email,
    validator.adminPassword,
    adminLoginController);