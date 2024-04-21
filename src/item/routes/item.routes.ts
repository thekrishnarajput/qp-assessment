import { Router } from "express";
import { validator } from "../../utils/middlewares/validationHandler";
import { saveItemsController, getAllItemsController, updateItemDetailsController, updateItemInventoryController, getAllItemsByCategoryController, getItemController, deleteItemController } from "../controllers/item.controller";
import { Roles } from "../../utils/common/enums/roles";
import { permit } from "../../utils/middlewares/permissionHandler";
import { auth } from "../../utils/middlewares/token";


export const itemRouter = Router();

// To save the items
itemRouter.post("/save",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can create items
    validator.itemsArray,
    validator.itemsName,
    validator.itemsPrice,
    validator.itemsCategoryId,
    validator.itemsQuantity,
    saveItemsController);

// Get all items list
itemRouter.get("/get-item/:id", getItemController);

// Get all items list
itemRouter.get("/all-items", getAllItemsController);

// Get all items list  by category
itemRouter.get("/all-items-by-category/:id",
    validator.id,
    getAllItemsByCategoryController);

// Update the item details
itemRouter.post("/update/:id",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can create items
    validator.id,
    updateItemDetailsController);

// Update the item details
itemRouter.post("/update/:id/inventory",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can create items
    validator.id,
    updateItemInventoryController);

// Delete the item
itemRouter.post("/delete/:id",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can create items
    validator.id,
    deleteItemController);

/* Category routes */


// To save the category
itemRouter.post("/save-category",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can create items
    validator.name,
    saveItemsController);