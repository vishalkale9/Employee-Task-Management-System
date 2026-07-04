import { Router } from 'express';
import { getEmployees, getEmployee, updateEmployee, deleteEmployee } from '../controllers/employee.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = Router();

// ALL routes in this file are protected and require ADMIN role
router.use(protect);
router.use(adminOnly);

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
