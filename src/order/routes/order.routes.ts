import { Router } from "express";
import { validator } from "../../utils/middlewares/validationHandler";
import { getAllOrdersController, getOrderItemsDetailsController, getUserAllOrderItemsController, initiateOrderController, placeOrderController, updateOrderDetailsController } from "../controllers/order.controller";
import { Roles } from "../../utils/common/enums/roles";
import { permit } from "../../utils/middlewares/permissionHandler";
import { auth } from "../../utils/middlewares/token";

export const orderRouter = Router();

// Initiate the order
orderRouter.post("/initiate-order",
    auth,
    permit([Roles.userRoleId]),  // Only user can add items to the order
    initiateOrderController);

// Place order and add address
orderRouter.post("/place-order",
    auth,
    permit([Roles.userRoleId]),  // Only user can add items to the order
    validator.order_id,
    validator.delivery_address,
    // validator.orderItemQuantity,
    placeOrderController);

// Get all order list
orderRouter.get("/all-orders",
    auth,
    permit([Roles.adminRoleId]),  // Only Admin can access this
    getAllOrdersController);

// Get all order list by a specific user
orderRouter.get("/user-all-orders",
    auth,
    permit([Roles.userRoleId, Roles.adminRoleId]),  // User and Admin both can access this
    getUserAllOrderItemsController);

// Get order items detail list by a specific order
orderRouter.get("/order-items-detail/:order_id",
    auth,
    permit([Roles.userRoleId, Roles.adminRoleId]),  // User and Admin both can access this
    validator.order_id,
    getOrderItemsDetailsController);

// Update order details
orderRouter.post("/update-order-details/:order_id",
    auth,
    permit([Roles.adminRoleId]),  // Only admin can update the order details
    validator.order_id,
    updateOrderDetailsController);