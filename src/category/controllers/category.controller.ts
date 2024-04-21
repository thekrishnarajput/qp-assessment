import { validationResult } from "express-validator";

import { HttpStatus } from "../../utils/common/enums/httpStatusCodes";
import { LoggerType } from "../../utils/common/enums/loggerTypes";
import { printLogger } from "../../utils/common/functions/logger";
import { messages } from "../../utils/common/functions/message";
import { iNextFunction, iRequest, iResponse } from "../../utils/common/interfaces/types.interface";
import { response } from "../../utils/middlewares/response";
import { iCategories } from "../interfaces/category.interface";
import categoryModel from "../models/category.model";

// Save categories controller
export const saveCategoriesController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        let Body: iCategories[] = req.body.categories;
        if (!Body) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let saveResult = await categoryModel.createCategories(Body);
        if (!saveResult) {
            return response(res, HttpStatus.notModified, false, messages.categoryNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.categorySaved(), saveResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "saveCategoriesController", "category.controller.ts");
        next(error);
    }
};

// Get category
export const getCategoryController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const id: number = +(req.params?.id);

        let categoryListResult = await categoryModel.getCategory(id);

        if (!categoryListResult) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), categoryListResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getCategoryController", "category.controller.ts");
        next(error);
    }
};

// Get all categories list
export const getAllCategoriesController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {

        let categoryListResult = await categoryModel.getAllCategoryList();
        console.log("categoryListResult:-", categoryListResult);

        if (!categoryListResult) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }
        return response(res, HttpStatus.ok, true, messages.dataFound(), categoryListResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "getAllCategoriesController", "category.controller.ts");
        next(error);
    }
};

// Update category details
export const updateCategoryDetailsController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, HttpStatus.unProcessableEntity, false, messages.validationError(), errors.array());
        }

        const id: number = +(req.params?.id);

        let Body: iCategories = req.body;

        if (!id) {
            return response(res, HttpStatus.notFound, false, messages.noDataFound(), null);
        }

        let updateResult = await categoryModel.updateCategory(id, Body);
        console.log("updateResult:-", updateResult);

        if (!updateResult) {
            return response(res, HttpStatus.notModified, false, messages.categoryNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.categorySaved(), updateResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "updateCategoryDetailsController", "category.controller.ts");
        next(error);
    }
};

// Delete the category
export const deleteCategoryController = async (req: iRequest, res: iResponse, next: iNextFunction) => {
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

        let deleteResult = await categoryModel.deleteCategory(id);
        console.log("deleteResult:-", deleteResult);

        if (!deleteResult) {
            return response(res, HttpStatus.notModified, false, messages.categoryNotSaved(), null);
        }
        return response(res, HttpStatus.ok, true, messages.categorySaved(), deleteResult);
    }
    catch (error: any) {
        console.error("Catch error:-", error);
        printLogger(LoggerType.error, error.message, "deleteCategoryController", "category.controller.ts");
        next(error);
    }
};