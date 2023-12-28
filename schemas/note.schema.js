import joi from 'joi';

const getById = joi.object({
    id: joi.number().required(),
});

const create = joi.object({
    title: joi.string().required(),
    text: joi.string().required(),
    category_id: joi.number().required()
});

const update = joi.object({
    title: joi.string(),
    text: joi.string(),
    category_id: joi.number()
});

export default {
    getById,
    create,
    update
};
