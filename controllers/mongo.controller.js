import mongoose from 'mongoose';
import { createSchemas, getModels } from '../mongodb/schema.js';

const reset = async (req, res, next) => {
    // drop database
    mongoose.connection.dropDatabase();

    // create schemas
    createSchemas();

    // insert default data
    const { personModel } = getModels();

    await personModel.insertMany([
        {
            name: 'Agustin Flador',
            age: 34,
            gender: 'MALE',
            address: {
                street: 'Av Colon',
                number: 237,
                city: 'Cordoba'
            },
            nationality: 'USA'            
        },
        {
            name: 'Esteban Quito',
            age: 26,
            gender: 'MALE',
            address: {
                street: 'Los Hornillos',
                number: 65,
                city: 'Cordoba'
            },            
        }
    ])

    res.send('Database was restored');

};

const list = async (req, res, next) => {
    const { personModel } = getModels();
    const persons = await personModel.find();

    res.json(persons);
};

const create = async (req, res, next) => {
    const { personModel } = getModels();
    const newPerson = new personModel(req.body);

    const personSaved =  await newPerson.save();

    res.json(personSaved);

};

const update = async (req, resp, next) => {

};

const remove = async (req, resp, next) => {

};

const getById = async (req, resp, next) => {

};

const mongoController = {
    create, getById, list, remove, reset, update
};

export default mongoController;

