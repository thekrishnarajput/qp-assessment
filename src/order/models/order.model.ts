import connection from "../../db";
import { processQueryFn } from "../../utils/common/functions/db.config";

const orderModel = {
    createUserOrder: async (userId: number) => {
        let query = `INSERT INTO orders (user_id) VALUES (${userId});`;

        let result = await processQueryFn(query);
        return result;
    },
    addItemsToOrder: async (orderId: number, orderData: any) => {
        // Call the mysql connection to make the query secure and sql injection proof
        const con = await connection;

        const columns = Object.keys({ "order_id": orderId, ...orderData[0] });

        // Construct the column names string for the INSERT INTO query
        let query = `INSERT INTO order_items(${columns.join(", ")}) VALUES `;

        // Construct the values string for each row
        const rowValues = orderData.map((orderDataObj: any) => {
            // Append the order_id field and value to the orderDataObj object
            orderDataObj["order_id"] = orderId;
            const values = columns.map((column: any) => {
                // To make the query secure and SQL injection proof, you should escape the values

                return con.escape(orderDataObj[column]);
            });
            return `(${values.join(", ")})`;
        });

        // Append the row values to the query
        query += rowValues.join(", ");
        console.log("query:-", query);

        let result = await processQueryFn(query);
        return result;
    },
    getOrder: async (userId: number) => {

        let query = `SELECT * FROM orders WHERE user_id=${userId};`;

        let result = await processQueryFn(query);
        return result;
    },
    getAllOrderItems: async (userId: number) => {

        let query = `SELECT order_items.id, items.name, items.image_url, items.price,
        order_items.quantity
        FROM order_items
        JOIN items On order_items.item_id = items.id
        WHERE order_items.order_id=(
            SELECT order_id FROM orders WHERE user_id = ?
        );`;

        let result = await processQueryFn(query, [userId]);
        return result;
    },
    updateOrderItem: async (id: number, quantity: number) => {

        // const values = Object.values(quantity);

        let query = `UPDATE order_items SET quantity=? WHERE id=${id}`
        console.log("query:-", query);
        
        let result = processQueryFn(query, [quantity]);
        return result;
    },
    removeOrderItem: async (order_item_id: number) => {

        let query = `DELETE FROM order_items WHERE id=${order_item_id};`

        let result = processQueryFn(query);
        return result;
    }
};

export default orderModel;