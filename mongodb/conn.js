import mongoose from "mongoose";

const connectionString = 'mongodb+srv://gmlgustavoml:dpJXM19F6qvknMCx@cluster0.k6g3sg8.mongodb.net/TestDB?retryWrites=true&w=majority';

const main = async () => {
    try {
        
      await mongoose.connect(connectionString);
      console.log('Mongoose connected to db');

    } catch (error) {
      console.error('ERROR_CONNECTION_MONGODB', error);

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