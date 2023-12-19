import validateHelper from '../helpers/validate.helper.js';
import schema from '../schemas/user.schema.js';

const create = async (req, res, next) => {
    try {
 
        // validate schema        
        await validateHelper(schema, req.body);

        // call service

        // return response
        
    } catch (error) {
        next(error);
    }
};

export default {
    create
};
