import connection from "../../db";
import { processQueryFn } from "../../utils/common/functions/db.config";

const cartModel = {
    createUserCart: async (userId: number) => {
        let query = `INSERT INTO carts (user_id) VALUES (${userId});`;

        let result = await processQueryFn(query);
        return result;
    },
    addItemsToCart: async (cartId: number, cartData: any) => {
        // Call the mysql connection to make the query secure and sql injection proof
        const con = await connection;

        const columns = Object.keys({ "cart_id": cartId, ...cartData[0] });

        // Construct the column names string for the INSERT INTO query
        let query = `INSERT INTO cart_items(${columns.join(", ")}) VALUES `;

        // Construct the values string for each row
        const rowValues = cartData.map((cartDataObj: any) => {
            // Append the cart_id field and value to the cartDataObj object
            cartDataObj["cart_id"] = cartId;
            const values = columns.map((column: any) => {
                // To make the query secure and SQL injection proof, you should escape the values

                return con.escape(cartDataObj[column]);
            });
            return `(${values.join(", ")})`;
        });

        // Append the row values to the query
        query += rowValues.join(", ");
        console.log("query:-", query);

        let result = await processQueryFn(query);
        return result;
    },
    getCart: async (userId: number) => {

        let query = `SELECT * FROM carts WHERE user_id=${userId};`;

        let result = await processQueryFn(query);
        return result;
    },
    getAllCartItems: async (userId: number) => {

        let query = `SELECT cart_items.id, items.name, items.image_url, items.price,
        cart_items.quantity
        FROM cart_items
        JOIN items On cart_items.item_id = items.id
        WHERE cart_items.cart_id=(
            SELECT cart_id FROM carts WHERE user_id = ?
        );`;

        let result = await processQueryFn(query, [userId]);
        return result;
    },
    updateCartItem: async (id: number, quantity: number) => {

        // const values = Object.values(quantity);

        let query = `UPDATE cart_items SET quantity=? WHERE id=${id}`
        console.log("query:-", query);
        
        let result = processQueryFn(query, [quantity]);
        return result;
    },
    removeCartItem: async (cart_item_id: number) => {

        let query = `DELETE FROM cart_items WHERE id=${cart_item_id};`

        let result = processQueryFn(query);
        return result;
    }
};

export default cartModel;