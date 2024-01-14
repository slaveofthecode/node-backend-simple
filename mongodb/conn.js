import mongoose from "mongoose";
import { createSchemas } from "./schema.js";

const connUrl = 'mongodb+srv://gmlgustavoml:dpJXM19F6qvknMCx@cluster0.k6g3sg8.mongodb.net/';
const dbName = 'TestDB';

const main = async () => {
    try {
        
      // mongoose.connection.on('open', () => console.log('open'));
      // mongoose.connection.on('reconnected', () => console.log('reconnected'));
      // mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
      mongoose.connection.on('connected', () => {
        console.log(`...Connected to DB ${dbName}`); 

        createSchemas();
        console.log('...Schemas created');
        
      });
      mongoose.connection.on('disconnected', () => console.log('disconnected'));
      mongoose.connection.on('close', () => console.log('close'));

      await mongoose.connect(connUrl, {
        dbName,
        retryWrites: true,      
        w: "majority",   
      });      

    } catch (error) {
      console.error('ERROR_CONNECTION_MONGODB', error.message);

    }
  };

export default main; 


// mongoDB
// project: 
// db: MONGODBFORTESTS
// user: gmlgustavoml | dpJXM19F6qvknMCx

// in NodeJs
// npm install mongodb
// connection string: mongodb+srv://gmlgustavoml:dpJXM19F6qvknMCx@cluster0.k6g3sg8.mongodb.net/?retryWrites=true&w=majority