import prisma from '../utils/db.js';

export const getUserNotifications = async (userId: number) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const markAsRead = async (id: number, userId: number) => {
  return await prisma.notification.updateMany({
    where: { id, userId },
    data: { isRead: true }
  });
};
