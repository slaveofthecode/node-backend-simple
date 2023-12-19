import express from 'express';
import createController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create', createController.create);

router.get('/list', (req, res) => { 
    res.send('list user');
});

export default router;