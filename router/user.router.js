import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create', userController.create);
router.post('/login', userController.login)


export default router;