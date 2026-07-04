import type { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service.js';

export const getAdminDashboard = async (req: any, res: Response): Promise<any> => {
  try {
    const data = await dashboardService.getAdminDashboard();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeDashboard = async (req: any, res: Response): Promise<any> => {
  try {
    const data = await dashboardService.getEmployeeDashboard(req.user.id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
