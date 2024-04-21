import connection from "../../db";
import { processQueryFn } from "../../utils/common/functions/db.config";

const userModel = {
    createUser: async (userData: any) => {
        // Call the mysql connection to make the query secure and sql injection proof
        const con = await connection;

        const columns = Object.keys(userData);

        let query = `INSERT INTO users(${columns.join(', ')}) VALUES `;

        const rowValues = columns.map((column: string) => {

            // To make the query secure and sql injection proof
            return con.escape(userData[column]);
        });

        query += `(${rowValues.join(", ")})`;

        let result = await processQueryFn(query);
        return result;
    },
    getUser: async (email: string) => {

        let query = `SELECT * FROM users WHERE email='${email}'`;

        let result = await processQueryFn(query);
        return result;
    },
}

export default userModel;