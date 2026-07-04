import prisma from '../utils/db.js';

export const getAdminDashboard = async () => {
  const totalEmployees = await prisma.user.count({ where: { role: 'EMPLOYEE' } });
  const totalTasks = await prisma.task.count();
  const completedTasks = await prisma.task.count({ where: { status: 'COMPLETED' } });
  const pendingTasks = await prisma.task.count({ where: { status: 'PENDING' } });

  return {
    totalEmployees,
    totalTasks,
    completedTasks,
    pendingTasks
  };
};

export const getEmployeeDashboard = async (userId: number) => {
  const totalTasks = await prisma.task.count({ where: { userId } });
  const completedTasks = await prisma.task.count({ where: { userId, status: 'COMPLETED' } });
  const pendingTasks = await prisma.task.count({ where: { userId, status: 'PENDING' } });
  const overdueTasks = await prisma.task.count({ where: { userId, status: 'OVERDUE' } });

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks
  };
};
