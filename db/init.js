import getPool from "./getPool.js";

const main = async () => {

    const pool = await getPool();

    // drop tables
    console.log('drop tables...');
    await pool.query(`DROP TABLE IF EXISTS categories, notes, users`);

    // create tables
    console.log('create tables...')
    await pool.query(`CREATE TABLE IF NOT EXISTS categories (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS notes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        user_id INT UNSIGNED NOT NULL,
        category_id INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // insert categories
    console.log('insert categories...')
    await pool.query(`INSERT INTO categories (name) VALUES ('category 1')`);
    await pool.query(`INSERT INTO categories (name) VALUES ('category 2')`);
    await pool.query(`INSERT INTO categories (name) VALUES ('category 3')`);

    console.log('tables created')

};

main();