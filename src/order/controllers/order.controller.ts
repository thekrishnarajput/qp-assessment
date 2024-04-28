import { validationResult } from "express-validator";

import { HttpStatus } from "../../utils/common/enums/httpStatusCodes";
import { LoggerType } from "../../utils/common/enums/loggerTypes";
import { printLogger } from "../../utils/common/functions/logger";
import { messages } from "../../utils/common/functions/message";
import { iNextFunction, iRequest, iResponse } from "../../utils/common/interfaces/types.interface";
import { response } from "../../utils/middlewares/response";
import { iOrder, iOrderItem } from "../interfaces/order.interface";
import orderModel from "../models/order.model";
import cartModel from "../../cart/models/cart.model";
import itemModel from "../../item/models/item.model";
import { OrderStatus } from "../../utils/common/enums/orderStatus";
import { Roles } from "../../utils/common/enums/roles";

// Initiate order controller
export const initiateOrderController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        const userId: number = +(req.user?.id);

        let userCartItemsResult = await cartModel.getAllCartItems(userId);
        let totalOrderPrice = 0.00, itemStockQuantityArray = [], cartId = userCartItemsResult[0].cart_id;

        for (const cartItem of userCartItemsResult) {
            const { item_id, quantity: cartItemQuantity, ...restItemProps } = cartItem;
            const [stockRows] = await itemModel.getItemQuantity(item_id);
            itemStockQuantityArray.push(stockRows);
            const stockQuantity = stockRows?.quantity ?? 0;

            if (stockQuantity === 0) {
                return response(res, HttpStatus.notAcceptable, false, messages.outOfStock(), { item_id: item_id, ...restItemProps });
            } else if (stockQuantity < cartItemQuantity || stockQuantity < 0) {
                return response(res, HttpStatus.notAcceptable, false, messages.insufficientQuantity(stockQuantity), { item_id: item_id, ...restItemProps });
            }
            totalOrderPrice += (parseFloat(restItemProps?.price) * cartItemQuantity);
        };

        let placeOrder = {
            user_id: userId,
            status: OrderStatus.orderInitiated,
            price: totalOrderPrice
        };

        // Create new order and get the id
        let orderCreatedResult = await orderModel.createUserOrder(placeOrder);

        if (orderCreatedResult.affectedRows === undefined || orderCreatedResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.errorMessage(), null);
        }

        const orderId = orderCreatedResult.insertId;


        for (const cartItem of userCartItemsResult) {
            const { item_id, quantity: cartItemQuantity, price } = cartItem;

            // Find an object with id = 2
            const stockRows = itemStockQuantityArray.find(obj => obj.id === item_id);
            const stockQuantity = stockRows?.quantity ?? 0;


            //  Update the quantity in items table
            let updateQuantityResult = await itemModel.updateItemQuantity(item_id, stockQuantity - cartItemQuantity);

            if (updateQuantityResult.affectedRows === undefined || updateQuantityResult.affectedRows === 0) {
                return response(res, HttpStatus.internalServerError, false, messages.errorMessage(), null);
            }

            // Add an entry to order_items table
            const orderItemResult = await orderModel.addItemsToOrderItems({ order_id: orderId, item_id: item_id, quantity: cartItemQuantity, price: price });

            if (orderItemResult.affectedRows === undefined || orderItemResult.affectedRows === 0) {
                await orderModel.addItemsToOrderItems({ order_id: orderId, item_id: item_id, quantity: cartItemQuantity });
            }
        }

        let clearCartResult = await cartModel.clearCart(cartId);

        let responseData = { order_id: orderId, order_value: totalOrderPrice };

        return response(res, HttpStatus.ok, true, messages.orderInitiated(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "initiateOrderController", "order.controller.ts");
        next(error);
    }
};


// Place order controller
export const placeOrderController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }

        const userId: number = +(req.user?.id);

        let Body = req.body;
        const { order_id: orderId, ...restBodyProps } = Body;

        let isOrderPlaced = await orderModel.getOrderById(orderId);

        if (isOrderPlaced[0].status > OrderStatus.orderInitiated) {
            return response(res, HttpStatus.notFound, false, messages.orderAlreadyPlaced(), { order_id: isOrderPlaced[0].id });
        }

        restBodyProps["status"] = OrderStatus.orderPending;

        // Update order status and address by order_id
        let orderUpdateResult = await orderModel.updateOrder(orderId, restBodyProps);

        if (orderUpdateResult.affectedRows === undefined || orderUpdateResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.errorMessage(), null);
        }

        return response(res, HttpStatus.ok, true, messages.orderPlaced(req.user?.name, orderId), { order_id: orderId });
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "placeOrderController", "order.controller.ts");
        next(error);
    }
};

// Get all orders
export const getAllOrdersController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        let orderItemsResult = await orderModel.getAllOrderItems();
        if (orderItemsResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        const responseData = {
            total: orderItemsResult.length,
            orders: orderItemsResult
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getUserAllOrderItemsController", "order.controller.ts");
        next(error);
    }
};

// Get user all order items
export const getUserAllOrderItemsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        const userId: number = +(req.user?.id);
        let orderItemsResult = await orderModel.getUserAllOrderItems(userId);
        if (orderItemsResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), orderItemsResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getUserAllOrderItemsController", "order.controller.ts");
        next(error);
    }
};

// Get order items detail by order id
export const getOrderItemsDetailsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }

        const orderId: number = +(req.params?.order_id);

        // Fetching the product details for each item in the order
        let orderItemsResult = await orderModel.getOrderItemsDetailByOrderId(orderId);

        if (orderItemsResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        // Fetching the order details of specific order
        let ordersResult = await orderModel.getOrderDetailsByOrderId(orderId);

        if (ordersResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let responseData = {
            ...ordersResult[0],
            orderItems: orderItemsResult
        }

        return response(res, HttpStatus.ok, true, messages.dataFound(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getUserAllOrderItemsController", "order.controller.ts");
        next(error);
    }
};

// Update order details
export const updateOrderDetailsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.forbidden, false, messages.validationError(), errors.array());
        }

        const orderId: number = +(req.params?.order_id);

        let Body: any = req.body;

        if (!orderId) {
            return response(res, HttpStatus.notAcceptable, false, messages.errorMessage(), null);
        }

        let updateResult = await orderModel.updateOrder(orderId, Body);

        if (updateResult.affectedRows === undefined && updateResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.errorMessage(), null);
        }

        // Fetching the order details of specific order
        let ordersResult = await orderModel.getOrderDetailsByOrderId(orderId);

        return response(res, HttpStatus.ok, true, messages.itemUpdated(), ordersResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateQuantityController", "order.controller.ts");
        next(error);
    }
};