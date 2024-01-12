import bcrypt from 'bcrypt';
import validateHelper from '../helpers/validate.helper.js';
import schema from '../schemas/user.schema.js';
import userServices from '../services/user.services.js';

const list = async (req, res) => {

    try {
        const resultService = await userServices.list();
        const resultQueryMapped = resultService.map( item => {
    
            const originalDate = new Date(item.createdAt);
            const formattedDate = `${originalDate.getFullYear()}-${String(originalDate.getMonth() + 1).padStart(2, '0')}-${String(originalDate.getDate()).padStart(2, '0')}`;
            const formattedTime = `${String(originalDate.getUTCHours()).padStart(2, '0')}:${String(originalDate.getUTCMinutes()).padStart(2, '0')}`;
    
            return {
                id: item.id,
                email: item.email,
                createAt: `${formattedDate} ${formattedTime}`
            }
        });
        
        return res.json(resultQueryMapped);
    } catch (error) {         
        res.json(
            {
                error: 'Ha sucedido un problema',
                deatil: error.message
            });        
    }

}

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
    list
};
