import dotenv from 'dotenv';
import express from 'express';
import errorController from './controllers/error.controller.js';
import routerUser from './router/user.router.js';

dotenv.config();

const { SERVER_PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
    res.send('hello node-backend-simple project');
});

app.use(express.json()); // for parsing application/json

app.use('/api/user', routerUser);

app.use(errorController); // error handler when next(error) is called

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
