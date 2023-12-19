import bcrypt from 'bcrypt';
import validateHelper from '../helpers/validate.helper.js';
import schema from '../schemas/user.schema.js';
import userServices from '../services/user.services.js';

const create = async (req, res, next) => {
    try {
 
        // validate schema        
        await validateHelper(schema.create, req.body);

        // call service
        req.body.password = await bcrypt.hash(req.body.password, 10);
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

const login = async (req, res, next) => {
    try {
        // validate schema        
        await validateHelper(schema.login, req.body);

        // call service
        const token = await userServices.login(req.body);

        // return token
        res.send(token);
        
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    login,
};
