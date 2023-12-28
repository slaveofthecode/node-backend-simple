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

const getById = async (id) => {
    try {
        
        const pool = await getPool();

        const query = `SELECT * FROM notes WHERE id = ? `;
        const values = [id];

        const [ note ] = await pool.query(query, values);

        if ( !note.length ) {
            errorsHelper.notFoundError('Note not found', 'NOTE_NOT_FOUND');
        }

        return note[0];

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'GET_NOTE_ERROR_SERVICE');
    }
};

const create = async (newNote, user) => {

    try {

        const {
            title, text, category_id
        } = newNote;

        const pool = await getPool();
        
        const query = ` INSERT INTO notes ( title, text, category_id, user_id )
                            VALUES ( ?, ?, ?, ?) `;
        const values = [title, text, category_id, user.id];

        const [ response ] = await pool.query(query, values);

        if ( response.affectedRows !== 1) {
            errorsHelper.conflictError('Error insert new note', 'CREATE_NOTE_ERROR_DB');            
        }

        return {
            id: response.insertId,
        };

        
    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_NOTE_ERROR_SERVICE');
    }

}

const update = async (id, noteUpdate) => {

    try {

        const keysNoteToUpdate = Object.keys(noteUpdate);
        const valuesKeysNoteToUpdate = Object.values(noteUpdate);
        
        const pool = await getPool();

        const query = `UPDATE notes
                       SET
                          ${ keysNoteToUpdate.map(field=> field + ' = ?') }
                       WHERE
                          id = ?`;                        
        const values = [...valuesKeysNoteToUpdate,id];

        const result = await pool.query(query, values);

        console.log('RESULT', result);
        
    } catch (error) {
        errorsHelper.internalServerError(error.message, 'UPDATE_NOTE_ERROR_SERVICE');
    }

}

export default {
    list,
    getById,
    create,
    update
};
