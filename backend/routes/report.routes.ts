import { Router } from 'express';
import { getTaskReport } from '../controllers/report.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/tasks', protect, adminOnly, getTaskReport);

export default router;
