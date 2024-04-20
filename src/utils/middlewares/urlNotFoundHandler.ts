import { HttpStatus } from "../common/enums/httpStatusCodes";
import { iNextFunction, iResponse } from "../common/interfaces/types.interface";
import { response } from "./response";

// URL handler middleware for unidentified routes
export const urlNotFound = async (res: iResponse, next: iNextFunction) => {
    next(response(res, HttpStatus.notFound, false, "URL not found!", null));
};