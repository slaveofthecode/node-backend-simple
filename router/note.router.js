import express from 'express';
import noteController from '../controllers/note.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/list', authMiddleware, noteController.list);


export default router;