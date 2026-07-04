import prisma from '../utils/db.js';
import { publishNotification } from '../utils/rabbitmq.js';

export const createTask = async (data: any) => {
  if (!data.startDate || !data.dueDate) {
    throw new Error("Start date and due date are required");
  }
  const startDate = new Date(data.startDate);
  const dueDate = new Date(data.dueDate);
  if (dueDate < startDate) {
    throw new Error("Due date cannot be earlier than start date");
  }
  data.startDate = startDate;
  data.dueDate = dueDate;
  const task = await prisma.task.create({ data });
  
  publishNotification({
    type: 'TASK_ASSIGNED',
    userId: task.userId,
    taskTitle: task.title
  });
  
  return task;
};

export const getTasks = async (userRole: string, userId: number) => {
  if (userRole === 'ADMIN') {
    return await prisma.task.findMany({ include: { assignedTo: { select: { fullName: true, email: true } } } });
  }
  return await prisma.task.findMany({
    where: { userId },
    include: { assignedTo: { select: { fullName: true, email: true } } }
  });
};

export const getTaskById = async (id: number, userRole: string, userId: number) => {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return null;
  if (userRole !== 'ADMIN' && task.userId !== userId) {
    throw new Error("Unauthorized");
  }
  return task;
};

export const updateTask = async (id: number, data: any, userRole: string, userId: number) => {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new Error("Task not found");
  if (userRole !== 'ADMIN' && task.userId !== userId) {
    throw new Error("Unauthorized");
  }
  if (task.status === 'COMPLETED') {
    throw new Error("Completed tasks cannot be edited");
  }
  
  const newStartDate = data.startDate ? new Date(data.startDate) : task.startDate;
  const newDueDate = data.dueDate ? new Date(data.dueDate) : task.dueDate;
  
  if (newDueDate < newStartDate) {
    throw new Error("Due date cannot be earlier than start date");
  }
  if (data.startDate) data.startDate = newStartDate;
  if (data.dueDate) data.dueDate = newDueDate;

  const updatedTask = await prisma.task.update({ where: { id }, data });
  
  if (data.status === 'COMPLETED') {
    publishNotification({
      type: 'TASK_COMPLETED',
      taskTitle: updatedTask.title
    });
  }
  
  return updatedTask;
};

export const deleteTask = async (id: number, userRole: string, userId: number) => {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new Error("Task not found");
  if (userRole !== 'ADMIN' && task.userId !== userId) {
    throw new Error("Unauthorized");
  }
  return await prisma.task.delete({ where: { id } });
};
