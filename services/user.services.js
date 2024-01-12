import bycript from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectionToDB from "../db/getPool.js";
import errorsHelper from "../helpers/errors.helper.js";

const {
    JWT_SECRET_KEY,
    JWT_EXPIRATION
} = process.env;

const list = async () => {

    const query = `SELECT * FROM users`;

    try {
        const connDB = await connectionToDB(); 
        const [ resultQuery ] = await connDB.query(query);
        
        return resultQuery;
    } catch (error) {                
        throw new Error(error);
    }

}

const create = async (user) => {
    try {
        // connect DB
        const pool = await connectionToDB();

        // insert user to DB
        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
        const values = [user.email, user.password];

        const [ response ] = await pool.query(query, values);
        // console.log('result query', result);

        if (response.affectedRows !== 1) {
            errorsHelper.conflictError('Error la insertar usuario', 'CREATE_USER_ERROR_DB');
        }

        // return response
        return {
            id: response.insertId,
            email: user.email
        };

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_USER_ERROR_SERVICE');
    }
};

const login = async (user) => {
    try {
        // connect DB
        const pool = await connectionToDB();

        // looking for user in DB
        const query = `SELECT * FROM users WHERE email = ?`;
        const values = [user.email];

        const [ users ] = await pool.query(query, values);
        // console.log('result query', result);

        if (users.length === 0) {
            errorsHelper.notFoundError('User not found in DB', 'LOGIN_USER_NOT_FOUND_DB');
        }       

        // compare password
        const userDB = users[0];
        const isPasswordCorrect = await bycript.compare(user.password, userDB.password);

        if (!isPasswordCorrect) {
            errorsHelper.unauthorizedError('Password incorrect', 'LOGIN_PASSWORD_INCORRECT');
        }

        // generate token
        const tokenInfo = {
            id: userDB.id, 
            email: userDB.email 
        };
        const tokenExpiration = { expiresIn: JWT_EXPIRATION };
        const token = jwt.sign(tokenInfo, JWT_SECRET_KEY, tokenExpiration);


        // return response
        return token;

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_USER_ERROR_SERVICE');
    }
};

export default {
    create,
    login,
    list
};
