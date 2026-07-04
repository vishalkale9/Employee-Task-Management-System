import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);

router.post('/', adminOnly, createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
