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

export default {
    list
};
