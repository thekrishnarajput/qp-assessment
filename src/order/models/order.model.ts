import connection from "../../db";
import { processQueryFn } from "../../utils/common/functions/db.config";

const orderModel = {
    createUserOrder: async (orderData: { user_id: number, status: number }) => {

        const columns = Object.keys(orderData);
        const values = Object.values(orderData);

        let query = `INSERT INTO orders (${columns.join(', ')}) VALUES (${values.join(', ')});`;

        let result = await processQueryFn(query);
        return result;
    },
    addItemsToOrderItems: async (orderData: any) => {
        // Call the mysql connection to make the query secure and sql injection proof
        const con = await connection;

        const columns = Object.keys(orderData);

        // Construct the column names string for the INSERT INTO query
        const values = Object.values(orderData);

        let query = `INSERT INTO order_items (${columns.join(', ')}) VALUES (${values.join(', ')});`;

        let result = await processQueryFn(query);
        return result;
    },
    getOrdersByUser: async (userId: number) => {

        let query = `SELECT * FROM orders WHERE user_id=${userId};`;

        let result = await processQueryFn(query);
        return result;
    },
    getOrderById: async (userId: number) => {

        let query = `SELECT * FROM orders WHERE id=${userId};`;

        let result = await processQueryFn(query);
        return result;
    },
    getUserAllOrderItems: async (userId: number) => {

        let query = `SELECT * FROM orders WHERE user_id=${userId} ORDER BY created_at DESC;`;

        let result = await processQueryFn(query);
        return result;
    },
    getAllOrderItems: async () => {

        let query = `SELECT * FROM orders ORDER BY created_at DESC LIMIT 100;`;

        let result = await processQueryFn(query);
        return result;
    },
    getOrderDetailsByOrderId: async (orderId: number) => {

        let query = `SELECT * FROM orders WHERE id=${orderId};`;

        let result = await processQueryFn(query);
        return result;
    },
    getOrderItemsDetailByOrderId: async (orderId: number) => {

        let query = `SELECT
                            order_items.id AS order_item_id,
                            order_items.item_id,
                            order_items.quantity AS order_item_quantity,
                            order_items.price AS order_item_price,
                            items.name AS item_name,
                            items.price AS item_price,
                            items.description AS item_description,
                            items.image_url AS item_image_url
                        FROM orders
                        JOIN order_items ON orders.id = order_items.order_id
                        JOIN items ON order_items.item_id = items.id
                        WHERE orders.id = ${orderId};
                        `;

        let result = await processQueryFn(query);
        return result;
    },
    updateOrderItem: async (id: number, quantity: number) => {

        let query = `UPDATE order_items SET quantity=? WHERE id=${id}`

        let result = processQueryFn(query, [quantity]);
        return result;
    },
    updateOrder: async (orderId: number, orderDetails: { delivery_address?: string, status?: number }) => {

        const columns = Object.keys(orderDetails).join("=?, ") + "=? ";
        const values = Object.values(orderDetails);

        let query = `UPDATE orders SET ${columns} WHERE id=${orderId}`

        let result = processQueryFn(query, values);
        return result;
    },
};

export default orderModel;