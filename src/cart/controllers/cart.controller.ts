import { validationResult } from "express-validator";

import { HttpStatus } from "../../utils/common/enums/httpStatusCodes";
import { LoggerType } from "../../utils/common/enums/loggerTypes";
import { printLogger } from "../../utils/common/functions/logger";
import { messages } from "../../utils/common/functions/message";
import { iNextFunction, iRequest, iResponse } from "../../utils/common/interfaces/types.interface";
import { response } from "../../utils/middlewares/response";
import { iCart, iCartItem } from "../interfaces/cart.interface";
import cartModel from "../models/cart.model";

// Add items to the cart controller
export const addToCartController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const userId: number = +(req.user?.id);

        let Body: any[] = req.body.items;

        let userCartResult = await cartModel.getCart(userId);
        console.log("userCartResult:-", userCartResult);

        let cartId = userCartResult[0]?.id || null;
        //  If there is no cart for this user, create a new one and get its id
        if (userCartResult.length === 0) {
            // Create new Cart for User and then add item into it
            let newUserCart: any = await cartModel.createUserCart(userId);
            console.log("newUserCart:-", newUserCart);

            if (newUserCart.affectedRows === undefined || newUserCart.affectedRows === 0) {
                return response(res, HttpStatus.internalServerError, false, messages.errorMessage(), null);
            }
            cartId = newUserCart.insertId;
        }

        if (Body.length === 0) {
            return response(res, HttpStatus.notAcceptable, false, messages.errorMessage(), null);
        }

        let saveResult = await cartModel.addItemsToCart(cartId, Body);
        console.log("saveResult:-", saveResult.affectedRows);

        if (saveResult.affectedRows === undefined || saveResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.itemNotAdded(), null);
        }
        return response(res, HttpStatus.ok, true, messages.itemAdded(), saveResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "addToCartController", "cart.controller.ts");
        next(error);
    }
};

// Get all cart items
export const getAllCartItemsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        const userId: number = +(req.user?.id);
        let responseData = await getAllCartItems(userId);
        return response(res, HttpStatus.ok, true, messages.dataFound(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllCartItemsController", "cart.controller.ts");
        next(error);
    }
};

// Update cart items quantity
export const updateQuantityController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const item_id: number = +(req.params?.item_id);

        let Body: iCartItem = req.body;

        if (!item_id) {
            return response(res, HttpStatus.notAcceptable, false, messages.errorMessage(), null);
        }

        let updateResult = await cartModel.updateCartItem(item_id, Body.quantity);
        console.log("updateResult:-", updateResult);

        if (updateResult.affectedRows === undefined || updateResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.itemNotUpdated(), null);
        }

        let responseData = await getAllCartItems(+(req.user?.id));

        return response(res, HttpStatus.ok, true, messages.itemUpdated(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateQuantityController", "cart.controller.ts");
        next(error);
    }
};

// Remove items from cart by cart_item_id
export const removeCartItemController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const cart_item_id: number = +(req.params?.cart_item_id);

        if (!cart_item_id) {
            return response(res, HttpStatus.notAcceptable, false, messages.errorMessage(), null);
        }

        let removeResult = await cartModel.removeCartItem(cart_item_id);
        console.log("removeResult:-", removeResult);

        if (removeResult.affectedRows === undefined || removeResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.itemNotRemoved(), null);
        }

        let responseData = await getAllCartItems(+(req.user?.id));

        return response(res, HttpStatus.ok, true, messages.itemRemoved(), responseData);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "removeCartItemController", "cart.controller.ts");
        next(error);
    }
};

const getAllCartItems = async (userId: number) => {
    let cartItemsResult = await cartModel.getAllCartItems(userId);
    if (cartItemsResult.length === 0) {
        return { total_cart_items: 0, total_cart_value: 0.0, items: [] }
    }
    let totalCartValue = 0.0, totalCartItems = cartItemsResult.length;

    if (totalCartItems > 0) {
        cartItemsResult.map((items: any) => {
            totalCartValue += (parseFloat(items.price) * items.quantity);
        });
    }
    return { total_cart_items: totalCartItems, total_cart_value: totalCartValue.toFixed(2), items: cartItemsResult }
};