import connect from "../../../db";
import { LoggerType } from "../enums/loggerTypes";
import { printLogger } from "./logger";

// Process all queries in this common function
export const processQueryFn = async (query: string) => {
    try {
        const con = await connect;
        let result = JSON.parse(JSON.stringify(await con.query(query)));
        return result[0];
    }
    catch (error: any) {
        console.log(error);
        printLogger(LoggerType.error, error.message, "processQueryFn", "db.config.ts");
        return error;
    }
}