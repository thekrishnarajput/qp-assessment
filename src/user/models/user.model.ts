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
    getUserByEmail: async (email: string) => {

        let query = `SELECT * FROM users WHERE email='${email}'`;

        let result = await processQueryFn(query);
        return result;
    },
    getUserByMobile: async (mobileNumber: number) => {

        let query = `SELECT * FROM users WHERE mobile_number=${mobileNumber}`;

        let result = await processQueryFn(query);
        return result;
    },
    getUserById: async (id: number) => {
        let query = `SELECT * FROM users WHERE id='${id}'`;

        let result = await processQueryFn(query);
        return result;
    },
    getAllUsers: async () => {
        let query = `SELECT * FROM users;`;

        let result = await processQueryFn(query);
        return result;
    },
    updateUserById: async (id: number, userData: any) => {
        const columns = Object.keys(userData).join('=?, ') + "=? ";
        const values = Object.values(userData);
        let query = `UPDATE users SET ${columns} WHERE id='${id}'`;

        let result = await processQueryFn(query, values);
        return result;
    },
}

export default userModel;