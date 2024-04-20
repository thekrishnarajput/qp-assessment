import connection from "../../db";
import { processQueryFn } from "../../utils/common/functions/db.config"
import iAdmin from "../interfaces/admin.interface"
const adminModel = {
    createAdmin: async (adminData: any) => {
        // Call the mysql connection to make the query secure and sql injection proof
        const con = await connection;

        const columns = Object.keys(adminData);

        let query = `INSERT INTO admins(${columns.join(', ')}) VALUES `;

        const rowValues = columns.map((column: any) => {

            // To make the query secure and sql injection proof
            return con.escape(adminData[column]);
        });

        query += `(${rowValues.join(", ")})`;

        let result = await processQueryFn(query);
        return result;
    },
    getAdmin: async (email: string) => {

        let query = `SELECT * FROM admins WHERE email='${email}'`;

        let result = await processQueryFn(query);
        return result;
    },
}

export default adminModel;