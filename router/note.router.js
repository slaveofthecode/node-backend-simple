import express from 'express';
import noteController from '../controllers/note.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/list', authMiddleware, noteController.list);
router.get('/:id', authMiddleware, noteController.getById);
router.post('/create', authMiddleware, noteController.create);

export default router;