import dotenv from 'dotenv';
import express from 'express';
import errorController from './controllers/error.controller.js';
import connectMongoDB from './mongodb/conn.js';
import routerIndex from './router/index.router.js';
import routerMongo from './router/mongo.router.js';
import routerNote from './router/note.router.js';
import routerUser from './router/user.router.js';

dotenv.config();

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json()); // for parsing application/json

app.use('/', routerIndex);
app.use('/mongo', routerMongo);
app.use('/api/user', routerUser);
app.use('/api/note', routerNote);


app.use(errorController); // error handler when next(error) is called

app.listen(SERVER_PORT, async () => {
  await connectMongoDB();
  console.log(`Server running on port ${SERVER_PORT}`);
});

// mongoose.connection.on('connected', (data) => {
//   const { name, host, port } = data.connection;
//   // console.log('Mongoose connected to db');
//   console.log(`Mongoose connected to db ${name} at ${host}:${port}`);
// });

// mongoose.connection.on('error', (err) => {
//   console.log('Mongoose connection error:', err);
// });

// let's validate the connection to the database mongoDB is running


// schema for Persons (mongoDB)
// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   gender: String,
//   nationality: String,
// });

// model for Persons (mongoDB)
// const Persons = mongoose.model('Persons', personSchema);



// app.get('/mongodb/person/list', async (req, res) => {

//   const allPersons = await Persons.find().sort({ createdAt: -1 });

//   res.json(allPersons);

//   // const data = mongoose.connection.readyState;

//   // // get name of database from connection
//   // const name = mongoose.connection.name; 
  
//   // // get host of database from connection
//   // const host = mongoose.connection.host;
  
//   // // get port of database from connection
//   // const port = mongoose.connection.port;
  
//   // // get user of database from connection
//   // const user = mongoose.connection.user;
  
//   // // get password of database from connection
//   // const pass = mongoose.connection.pass;
  
//   // // get options of database from connection
//   // const options = mongoose.connection.options;
  
//   // // get collections of database from connection
//   // const collections = mongoose.connection.collections;
  
//   // // get models of database from connection
//   // const models = mongoose.connection.models;

//   // // get base of database from connection
//   // const base = mongoose.connection.base;

//   // // res.send(`Mongoose connection state: ${data}`);
//   // const collectionsNames = Object.keys(collections);
//   // console.log(collectionsNames);

//   // res.send(`
//   //   Mongoose connection state: ${data}
//   //   <br>
//   //   Database name: ${name}
//   //   <br>
//   //   Database host: ${host}
//   //   <br>
//   //   Database port: ${port}
//   //   <br>
//   //   Database user: ${user}
//   //   <br>
//   //   Database pass: ${pass}
//   //   <br>
//   //   Database options: ${options}
//   //   <br>
//   //   Database collections: ${JSON.stringify(collections)}
//   //   <br>
//   //   Database models: ${JSON.stringify(models)}
//   //   <br>
//   //   Database base: ${base}
//   //   <br>    
//   // `);
// });

// https://www.youtube.com/watch?v=pkg0J6lpKT4&list=PL_c9BZzLwBRKWfmG3DTZ49tDV6Mn7GEQ2   !! very good playlist videos

// app.post('/mongodb/person/create', async (req, res) => {
//   const newPerson = new Persons(req.body);

//   const savedPerson = await newPerson.save();

//   res.json(savedPerson);
// });

// app.patch('/mongodb/person/update/:id', async (req, res) => {
//   const { id } = req.params;
//   const person = await Persons.findById(id);

//   if (!person) {
//     res.status(404).json({ message: 'Person not found' });
//   }

//   // here let's update the person
  

// });

// app.get('/mongodb', async (req, res) => {
//   // clear all data from database
//   await mongoose.connection.dropDatabase();

//   const personSchema = mongoose.Schema({
//       name: String,
//       age: Number,
//       gender: { type: String, enum: ["MALE","FEMALE"] },
//       nationality: { type: String, default: "ARG" },
//       createdAt: {
//         type: Date, 
//         default: Date.now,
//         // get: (value) => value.toLocaleString("es-AR"),
//         // set: (value) => value.toLocaleString("es-AR"),        
//       },
//       updatedAt: {
//         type: Date, 
//         default: Date.now,
//         // get: (value) => value.toLocaleString("es-AR")
//       },
//     });
//     const Person = mongoose.model("person", personSchema, "persons");
  
//     const vehicleSchema = mongoose.Schema({
//       name: String, 
//       model: String, 
//       yearModel: Number,
//       createdAt: {type: Date, default: Date.now},
//       updatedAt: {type: Date, default: Date.now}
//     });
//     const Vehicle = mongoose.model("vehicle", vehicleSchema, "vehicles");    
    
//     await Person.insertMany([
//       {
//         name: "Esteban Quito",
//         age: 24,
//         gender: "MALE",
//         nationality: "ARG"
//       }
//     ]);

//     await Vehicle.create({
//       name: "Fiat",
//       model: "Uno",
//       yearModel: 2010
//     });

//     res.send('Collencitions and data were created');

// });
