import connection from "../../db";
import { processQueryFn } from "../../utils/common/functions/db.config";

const itemModel = {
    createItems: async (itemData: any) => {
        // Call the mysql connection to make the query secure and sql injection proof
        const con = await connection;


        const columns = Object.keys(itemData[0]);

        // Construct the column names string for the INSERT INTO query
        let query = `INSERT INTO items(${columns.join(", ")}) VALUES `;

        // Construct the values string for each row
        const rowValues = itemData.map((data: any) => {
            const values = columns.map((column) => {
                // To make the query secure and SQL injection proof, you should escape the values
                return con.escape(data[column]);
            });
            console.log("values:-", values);
            return `(${values.join(", ")})`;
        });

        // Append the row values to the query
        query += rowValues.join(", ");

        let result = await processQueryFn(query);
        return result;
    },
    getItem: async (id: number) => {

        let query = `SELECT * FROM items WHERE id=${id};`;

        let result = await processQueryFn(query);
        return result;
    },
    getItemQuantity: async (id: number) => {

        let query = `SELECT id, quantity FROM items WHERE id=${id};`;

        let result = await processQueryFn(query);
        return result;
    },
    getAllItemsList: async () => {

        let query = `SELECT * FROM items;`;

        let result = await processQueryFn(query);
        return result;
    },
    getAllItemsByCategory: async (id: number) => {

        let query = `SELECT * FROM items WHERE category_id=${id};`;

        let result = await processQueryFn(query);
        return result;
    },
    updateItem: async (id: number, items: any) => {

        const columns = Object.keys(items).join("=?, ") + "=? ";
        const values = Object.values(items);

        let query = `UPDATE items SET ${columns} WHERE id=${id}`

        let result = processQueryFn(query, values);
        return result;
    },
    updateItemQuantity: async (id: number, quantity: number) => {

        let query = `UPDATE items SET quantity = ${quantity} WHERE id=${id}`

        let result = processQueryFn(query);
        return result;
    },
    deleteItem: async (id: number) => {

        let query = `DELETE items WHERE id=${id};`

        let result = processQueryFn(query);
        return result;
    }
};

export default itemModel;