import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create', userController.create);
router.post('/login', userController.login);
router.get('/list', userController.list);


export default router;


// mongoDB
// project: 
// db: MONGODBFORTESTS
// user: gmlgustavoml | dpJXM19F6qvknMCx

// in NodeJs
// npm install mongodb
// connection string: mongodb+srv://gmlgustavoml:dpJXM19F6qvknMCx@cluster0.k6g3sg8.mongodb.net/?retryWrites=true&w=majority