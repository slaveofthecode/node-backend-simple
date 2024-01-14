import mongoose from 'mongoose';
import { createSchemas, getModels } from '../mongodb/schema.js';

const reset = async (req, res, next) => {
    mongoose.connection.dropDatabase();

    createSchemas();

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

    try {
        const allPersons = await personModel.find().sort({ createdAt: -1 });
        res.json(allPersons);
        
    } catch (error) {
        res.json({
            message: 'There was an error',
            details: error.message
        })        
    }
};

const create = async (req, res, next) => {
    
    const { personModel } = getModels();
    
    try {
        const newPerson = new personModel(req.body);
        const personSaved = await newPerson.save();
        res.json(personSaved);
        
    } catch (error) {
        res.json({
            message: 'There was an error',
            details: error.message
        })    
    }
};

const update = async (req, res, next) => {

    const { id } = req.params;
    const { personModel } = getModels();

    try {
        
        const personUpdate = await personModel.updateOne({ _id: id }, req.body );
        
        if (personUpdate.acknowledged === false)
            return res.status(404).json({ message: 'Filed not allowed' });
        if (personUpdate.matchedCount === 0)
            return res.status(404).json({ message: 'Person not found' });
        if (personUpdate.modifiedCount === 0)
            return res.status(404).json({ message: 'Any field to update' });

        res.json({
            message: `${id} was updated`,
            details: req.body
        });


    } catch (error) {        
        res.json({
            message: 'There was an error',
            details: error.message
        })
    }

};

const remove = async (req, res, next) => {

    const { id } = req.params;
    const { personModel } = getModels();

    try {
        
        const deletedPerson = await personModel.findByIdAndDelete(id);
        if (!deletedPerson) 
            return res.status(404).json({ message: 'Person not found' });
        
        res.json({
            message: `${id} was removed`,
            details: deletedPerson
        });

    } catch (error) {
        res.json({
            message: 'There was an error',
            details: error.message
        })
    }

};

const getById = async (req, res, next) => {
    const { id } = req.params;
    const { personModel } = getModels();

    try {
        const person = await personModel.findById(id);
        if (!person) 
            return res.status(404).json({ message: 'Person not found' });

        res.json(person);

    } catch (error) {
        res.json({
            message: 'There was an error',
            details: error.message
        })
    }

};

const mongoController = {
    create, getById, list, remove, reset, update
};

export default mongoController;

