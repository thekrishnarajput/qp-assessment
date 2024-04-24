export const adminSchema = `
            CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            mobile_number BIGINT UNSIGNED,
            password VARCHAR(255) NOT NULL,
            role INT NOT NULL,
            status INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
            )
        `;