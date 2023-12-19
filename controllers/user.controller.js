import validateHelper from '../helpers/validate.helper.js';
import schema from '../schemas/user.schema.js';
import userServices from '../services/user.services.js';

const create = async (req, res, next) => {
    try {
 
        // validate schema        
        await validateHelper(schema, req.body);

        // call service
        const response = await userServices.create(req.body);

        // return response
        res.json({
            message : 'create user success ',
            data : response
        });
        
    } catch (error) {
        next(error);
    }
};

export default {
    create
};
