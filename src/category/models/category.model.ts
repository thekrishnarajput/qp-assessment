import connection from "../../db";
import { processQueryFn } from "../../utils/common/functions/db.config";

const categoryModel = {
    createCategories: async (categoryData: any) => {
        // Call the mysql connection to make the query secure and sql injection proof
        const con = await connection;


        const columns = Object.keys(categoryData[0]);

        // Construct the column names string for the INSERT INTO query
        let query = `INSERT INTO categories(${columns.join(", ")}) VALUES `;

        // Construct the values string for each row
        const rowValues = categoryData.map((data: any) => {
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
    getCategory: async (id: number) => {

        let query = `SELECT * FROM categories WHERE id=${id};`;

        let result = await processQueryFn(query);
        return result;
    },
    getAllCategoryList: async () => {

        let query = `SELECT * FROM categories;`;

        let result = await processQueryFn(query);
        return result;
    },
    updateCategory: async (id: number, categories: any) => {

        const columns = Object.keys(categories).join("=?, ") + "=? ";
        const values = Object.values(categories);

        let query = `UPDATE categories SET ${columns} WHERE id=${id}`

        let result = processQueryFn(query, values);
        return result;
    },
    deleteCategory: async (id: number) => {

        let query = `DELETE FROM categories WHERE id=${id};`

        let result = processQueryFn(query);
        return result;
    }
};

export default categoryModel;