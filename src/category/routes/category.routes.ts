import { Router } from "express";
import { validator } from "../../utils/middlewares/validationHandler";
import { deleteCategoryController, getAllCategoriesController, getCategoryController, saveCategoriesController, updateCategoryDetailsController } from "../controllers/category.controller";
import { Roles } from "../../utils/common/enums/roles";
import { permit } from "../../utils/middlewares/permissionHandler";
import { auth } from "../../utils/middlewares/token";


export const categoryRouter = Router();

// To save the category
categoryRouter.post("/save",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can create categories
    validator.categoriesArray,
    validator.categoryName,
    validator.categoryImageUrl,
    saveCategoriesController);

// Get all categories list
categoryRouter.get("/get-category/:id", getCategoryController);

// Get all categories list
categoryRouter.get("/all-categories", getAllCategoriesController);

// Update the category details
categoryRouter.post("/update/:id",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can update categories
    validator.id,
    updateCategoryDetailsController);

// Delete the category
categoryRouter.post("/delete/:id",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can delete categories
    validator.id,
    deleteCategoryController);
