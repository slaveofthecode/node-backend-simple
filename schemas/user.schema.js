import joi from 'joi';

const create = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8).max(20),
});

const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8).max(20),
});

export default {
    create,
    login,
};
