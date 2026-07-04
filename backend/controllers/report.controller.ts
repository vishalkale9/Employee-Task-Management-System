import type { Request, Response } from 'express';
import * as reportService from '../services/report.service.js';

export const getTaskReport = async (req: Request, res: Response): Promise<any> => {
  try {
    const { status, employeeId } = req.query;
    const csv = await reportService.generateTaskReport(
      status as string,
      employeeId ? Number(employeeId) : undefined
    );

    res.header('Content-Type', 'text/csv');
    res.attachment(`tasks_report_${new Date().getTime()}.csv`);
    res.send(csv);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
