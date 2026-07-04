import { Router } from 'express';
import { getNotifications, markNotificationRead } from '../controllers/notification.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/', getNotifications);
router.put('/:id/read', markNotificationRead);

export default router;
