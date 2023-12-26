import jwt from 'jsonwebtoken';
import errorsHelper from "../helpers/errors.helper.js";

const { JWT_SECRET_KEY } = process.env;

const main = async (req, res, next) => {
    try {

        const { authorization } = req.headers;
        if (!authorization) {
            errorsHelper.unauthorizedError('Authorization header not found', 'AUTHORIZATION_HEADER_NOT_FOUND');
        }

        let tokenInfo = null;

        try {
            tokenInfo = jwt.verify(authorization, JWT_SECRET_KEY);

            req.user = tokenInfo;
            next();

        } catch (error) {
            errorsHelper.unauthorizedError('Invalid token', 'INVALID_TOKEN');
        }

    } catch (error) {
        next(error);
    }
};

export default main;