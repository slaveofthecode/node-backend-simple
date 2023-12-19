import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const { SERVER_PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
    res.send('hello node-backend-simple project');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
