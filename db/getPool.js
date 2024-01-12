import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

let pool = null;
const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME
} = process.env;

const connectionToDB = async () => {
    try {
        
        if(pool) return pool;

        const poolTemp = mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS
        });

        await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

        pool = mysql.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database : DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            timezone: 'Z'
        });        

        return pool;

    } catch (error) {
        console.log('error getPool', error);
    }
};

export default connectionToDB;