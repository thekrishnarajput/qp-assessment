export const itemSchema = `
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT '0.00',
    category_id INT,
    description VARCHAR(255),
    image_url TEXT,
    quantity INT UNSIGNED NOT NULL DEFAULT 0,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);
`;