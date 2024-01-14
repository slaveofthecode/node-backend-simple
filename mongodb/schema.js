import mongoose from "mongoose";

const schema = {};

const createSchemas = () => {
    
    schema.addressSchema = new mongoose.Schema({
        street: String,
        number: Number,
        city: { type: String, uppercase: true },
        state: String,
        country: String,
    });

    schema.personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        gender: { type: String, enmum: ["MALE", "FEMALE"] },
        address: schema.addressSchema,
        nationality: { type: String, default: "ARG" },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    });        

}

const getModels = ()=> {

    const personModel = mongoose.model('person', schema.personSchema, 'persons');

    return {
        personModel
    }
}

export {
    createSchemas,
    getModels
};
