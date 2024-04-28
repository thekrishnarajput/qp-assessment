import { validationResult } from "express-validator";

import { HttpStatus } from "../../utils/common/enums/httpStatusCodes";
import { LoggerType } from "../../utils/common/enums/loggerTypes";
import { printLogger } from "../../utils/common/functions/logger";
import { messages } from "../../utils/common/functions/message";
import { iNextFunction, iRequest, iResponse } from "../../utils/common/interfaces/types.interface";
import { response } from "../../utils/middlewares/response";
import { iItems } from "../interfaces/item.interface";
import itemModel from "../models/item.model";

// Save items controller
export const saveItemsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        let Body: iItems[] = req.body.items;
        if (!Body) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let saveResult = await itemModel.createItems(Body);
        if (saveResult.affectedRows === undefined) {
            return response(res, HttpStatus.internalServerError, false, messages.itemNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.itemSaved(), saveResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "saveItemsController", "item.controller.ts");
    }
};

// Get item
export const getItemController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const id: number = +(req.params?.id);

        let itemListResult = await itemModel.getItem(id);
        console.log("itemListResult:-", itemListResult);

        if (itemListResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), itemListResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getItemController", "item.controller.ts");
    }
};

// Get all items list
export const getAllItemsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {

        let itemListResult = await itemModel.getAllItemsList();
        console.log("itemListResult:-", itemListResult);

        if (itemListResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), itemListResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllItemsController", "item.controller.ts");
    }
};

// Get all items list by category
export const getAllItemsByCategoryController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {

        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const id: number = +(req.params?.id);

        let itemListResult = await itemModel.getAllItemsByCategory(id);
        console.log("itemListResult:-", itemListResult);

        if (itemListResult.length === 0) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), itemListResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllItemsByCategoryController", "item.controller.ts");
    }
};

// Update item details
export const updateItemDetailsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const id: number = +(req.params?.id);

        let Body: iItems = req.body;

        if (!id) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let updateResult = await itemModel.updateItem(id, Body);
        console.log("updateResult:-", updateResult);

        if (updateResult.affectedRows === undefined || updateResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.itemNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.itemSaved(), updateResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateItemDetailsController", "item.controller.ts");
    }
};

// Update item inventory
export const updateItemInventoryController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        console.log("req.params:-", req.params);
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const id: number = +(req.params?.id);

        let Body: iItems = req.body;

        if (!id) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let updateResult = await itemModel.updateItem(id, Body);
        console.log("updateResult:-", updateResult);

        if (updateResult.affectedRows === undefined || updateResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.itemNotUpdated(), null);
        }
        return response(res, HttpStatus.ok, true, messages.itemUpdated(), updateResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateItemInventoryController", "item.controller.ts");
    }
};

// Delete the item
export const deleteItemController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const id: number = +(req.params?.id);

        if (!id) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let deleteResult = await itemModel.deleteItem(id);
        console.log("deleteResult:-", deleteResult);

        if (deleteResult.affectedRows === undefined || deleteResult.affectedRows === 0) {
            return response(res, HttpStatus.internalServerError, false, messages.itemNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.itemSaved(), deleteResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "deleteItemController", "item.controller.ts");
    }
};