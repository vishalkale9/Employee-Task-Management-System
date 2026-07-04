import { Router } from 'express';
import { getAdminDashboard, getEmployeeDashboard } from '../controllers/dashboard.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/admin', adminOnly, getAdminDashboard);
router.get('/employee', getEmployeeDashboard);

export default router;
