import { createConnection, Connection } from "mysql2/promise";
import { adminSchema } from "./admin/schemas/admin.schema";
import { itemSchema } from "./item/schemas/item.schema";
import { categorySchema } from "./category/schemas/category.schema";
import { userSchema } from "./user/schemas/user.schema";
import { cartItemSchema, cartSchema } from "./cart/schemas/cart.schema";
import { orderItemSchema, orderSchema } from "./order/schemas/order.schema";

const { IS_DOCKER_ENV, DOCKER_MYSQL_HOST, MYSQL_HOST, MYSQL_ROOT_PASSWORD } = process.env;

const connect = async () => {
    try {
        const connection = await createConnection({
            host: IS_DOCKER_ENV === "true" ? DOCKER_MYSQL_HOST : MYSQL_HOST,
            user: "root",
            password: MYSQL_ROOT_PASSWORD,
        });
        // Create database if not exists
        let dbCreate = JSON.parse(JSON.stringify(await connection.query('CREATE DATABASE IF NOT EXISTS grocery_db;')));

        if (dbCreate[0].warningStatus === 0) {

            console.log("Database created successfully!");
            // Create tables if not exists
            await createTables(connection);
        }
        else {
            // Create tables if not exists
            await createTables(connection);
            console.log("Database is already created!");
        }
        return connection;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
};

// Create tables if not exists function
const createTables = async (connection: Connection): Promise<void> => {
    // Switch to the grocery_db database
    await connection.query('USE grocery_db');

    // Create tables if they not exist
    await connection.query(adminSchema);
    await connection.query(categorySchema);
    await connection.query(itemSchema);
    await connection.query(userSchema);
    await connection.query(cartSchema);
    await connection.query(cartItemSchema);
    await connection.query(orderSchema);
    await connection.query(orderItemSchema);
};

export default connect();