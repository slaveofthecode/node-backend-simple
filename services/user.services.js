import getPool from "../db/getPool.js";
import errorsHelper from "../helpers/errors.helper";

const create = async (user) => {
    try {
        // connect DB
        const pool = await getPool();

        // insert user to DB
        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
        const values = [user.email, user.password];

        const result = await pool.query(query, values);
        console.log('result query', result);

        if (result[0].affectedRows !== 1) {
            errorsHelper.conflictError('Error la insertar usuario', 'CREATE_USER_ERROR_DB');
        }

        return {
            id: result[0].insertId,
            email: user.email
        };

        // return response
    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_USER_ERROR_SERVICE');
    }
};

export default {
    create
};
