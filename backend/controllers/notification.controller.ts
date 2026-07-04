import type { Request, Response } from 'express';
import * as notificationService from '../services/notification.service.js';

export const getNotifications = async (req: any, res: Response): Promise<any> => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user.id);
    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markNotificationRead = async (req: any, res: Response): Promise<any> => {
  try {
    await notificationService.markAsRead(Number(req.params.id), req.user.id);
    res.json({ message: 'Marked as read' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
