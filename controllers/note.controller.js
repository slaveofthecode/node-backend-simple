import errorsHelper from '../helpers/errors.helper.js';
import validateHelper from '../helpers/validate.helper.js';
import schema from '../schemas/note.schema.js';
import noteServices from '../services/note.services.js';

const list = async (req, res, next) => {
    try {

        // call service
        const notes = await noteServices.list(req.user.id);

        // return response
        res.send({
            message : 'list notes success ',
            data : notes
        })
        
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        
        const { id } = req.params;

        await validateHelper(schema.getById, { id });
        
        const note = await noteServices.getById(id);
        console.log(
            note,
            note.user_id,
            req.user.id
        );
        if ( note.user_id !== req.user.id ) {
            errorsHelper.forbiddenError('You are not allowed to see this note', 'NOT_ALLOWED');
        }
        
        res.send({
            message : 'get note success ',
            data : note
        })
        
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {

    try {

        await validateHelper(schema.create, req.body);

        const noteCreated = await noteServices.create(req.body, req.user);

        return res.send({
            message: 'Note was created',
            data: noteCreated
        });

    } catch (error) {
        next(error);
    }

}

const update = async (req, res, next) => {

    try {

        await validateHelper(schema.update, req.body);

        const noteUpdated = await noteServices.update(req.params.id, req.body);

        console.log('NOTE UPDATED', noteUpdated);

        return res.json(noteUpdated)

        
    } catch (error) {
        next(error);
    }

}

export default {
    list,
    getById,
    create,
    update
};
