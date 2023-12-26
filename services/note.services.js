import getPool from "../db/getPool.js";
import errorsHelper from "../helpers/errors.helper.js";


const list = async (userId) => {
    try {
        // connect DB
        const pool = await getPool();

        // select notes from DB
        const query = `SELECT title FROM notes WHERE user_id = ?`;
        const values = [userId];

        const [ notes ] = await pool.query(query, values);

        // return response
        return notes;

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_USER_ERROR_SERVICE');
    }
};

export default {
    list,
};
