import { Router } from "express";
import { validator } from "../../utils/middlewares/validationHandler";
import { getAllOrderItemsController, placeOrderController, removeOrderItemController, updateQuantityController } from "../controllers/order.controller";
import { Roles } from "../../utils/common/enums/roles";
import { permit } from "../../utils/middlewares/permissionHandler";
import { auth } from "../../utils/middlewares/token";

export const orderRouter = Router();

// Add items to the order
orderRouter.post("/place-order",
    auth,
    permit([Roles.userRoleId]),  // Only user can add items to the order
    validator.itemsArray,
    validator.ItemId,
    // validator.orderItemQuantity,
    placeOrderController);

// Get all categories list
orderRouter.get("/all-order-items",
    auth,
    permit([Roles.userRoleId]),  // Only user can get items from their order
    getAllOrderItemsController);

// Update order items quantity
orderRouter.post("/update-quantity/:order_item_id",
    auth,
    permit([Roles.userRoleId]),  // Only user can delete order items
    // validator.order_item_id,
    updateQuantityController);

// Delete the category
orderRouter.get("/remove-item",
    auth,
    permit([Roles.userRoleId]),  // Only user can delete order items
    // validator.order_item_id,
    removeOrderItemController);