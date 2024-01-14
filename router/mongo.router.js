import express from 'express';
import mongoController from '../controllers/mongo.controller.js';

const router = express.Router();

router.get('/reset', mongoController.reset);
router.get('/person', mongoController.list);
router.post('/person', mongoController.create);
router.patch('/person/:id', mongoController.update);
router.delete('/person/:id', mongoController.remove);
router.get('/person/:id', mongoController.getById);

export default router;