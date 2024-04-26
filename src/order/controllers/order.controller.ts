import { validationResult } from "express-validator";

import { HttpStatus } from "../../utils/common/enums/httpStatusCodes";
import { LoggerType } from "../../utils/common/enums/loggerTypes";
import { printLogger } from "../../utils/common/functions/logger";
import { messages } from "../../utils/common/functions/message";
import { iNextFunction, iRequest, iResponse } from "../../utils/common/interfaces/types.interface";
import { response } from "../../utils/middlewares/response";
import { iOrder, iOrderItem } from "../interfaces/order.interface";
import orderModel from "../models/order.model";

// Place order controller
export const placeOrderController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const userId: number = +(req.user?.id);

        let Body: any[] = req.body.items;

        let userOrderResult = await orderModel.getOrder(userId);
        console.log("userOrderResult:-", userOrderResult);

        let orderId = userOrderResult[0]?.id || null;
        //  If there is no order for this user, create a new one and get its id
        if (userOrderResult.length === 0) {
            // Create new Order for User and then add item into it
            let newUserOrder: any = await orderModel.createUserOrder(userId);

            if (newUserOrder.affectedRows === 0 ? true : false) {
                return response(res, HttpStatus.internalServerError, false, messages.errorMessage(), null);
            }
            orderId = newUserOrder.insertId;
        }

        if (Body.length === 0) {
            return response(res, HttpStatus.notAcceptable, false, messages.errorMessage(), null);
        }

        let saveResult = await orderModel.addItemsToOrder(orderId, Body);
        if (!saveResult) {
            return response(res, HttpStatus.notModified, false, messages.categoryNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.categorySaved(), saveResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "addToOrderController", "order.controller.ts");
        next(error);
    }
};

// Get all order items
export const getAllOrderItemsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        const userId: number = +(req.user?.id);
        let responseData = await getAllOrderItems(userId);
        return response(res, HttpStatus.ok, true, messages.dataFound(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllOrderItemsController", "order.controller.ts");
        next(error);
    }
};

// Update order items quantity
export const updateQuantityController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const order_item_id: number = +(req.params?.order_item_id);

        let Body: iOrderItem = req.body;

        if (!order_item_id) {
            return response(res, HttpStatus.notAcceptable, false, messages.errorMessage(), null);
        }

        let updateResult = await orderModel.updateOrderItem(order_item_id, Body.quantity);
        console.log("updateResult:-", updateResult);

        if (updateResult.affectedRows === undefined) {
            return response(res, HttpStatus.internalServerError, false, messages.errorMessage(), null);
        }
        else if (updateResult.affectedRows === 0) {
            return response(res, HttpStatus.notModified, false, messages.itemNotUpdated(), null);
        }

        let responseData = await getAllOrderItems(+(req.user?.id));

        return response(res, HttpStatus.ok, true, messages.itemUpdated(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateQuantityController", "order.controller.ts");
        next(error);
    }
};

// Remove items from order
export const removeOrderItemController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const order_item_id: number = +(req.params?.order_item_id);

        if (!order_item_id) {
            return response(res, HttpStatus.notAcceptable, false, messages.errorMessage(), null);
        }

        let removeResult = await orderModel.removeOrderItem(order_item_id);
        console.log("removeResult:-", removeResult);

        if (removeResult.affectedRows === 0) {
            return response(res, HttpStatus.notModified, false, messages.itemNotRemoved(), null);
        }

        let responseData = await getAllOrderItems(+(req.user?.id));

        return response(res, HttpStatus.ok, true, messages.itemRemoved(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "removeOrderItemController", "order.controller.ts");
        next(error);
    }
};

const getAllOrderItems = async (userId: number) => {
    let orderItemsResult = await orderModel.getAllOrderItems(userId);

    let totalOrderValue = 0.0, totalOrderItems = orderItemsResult.length;

    if (totalOrderItems > 0) {
        orderItemsResult.map((items: any) => {
            totalOrderValue += (parseFloat(items.price) * items.quantity);
        });
    }
    return { total_order_items: totalOrderItems, total_order_value: totalOrderValue.toFixed(2), items: orderItemsResult }
};