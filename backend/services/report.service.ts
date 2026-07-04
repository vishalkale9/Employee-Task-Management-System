import prisma from '../utils/db.js';
import { Parser } from 'json2csv';

export const generateTaskReport = async (status?: string, employeeId?: number) => {
  const where: any = {};
  if (status) where.status = status;
  if (employeeId) where.userId = employeeId;

  const tasks = await prisma.task.findMany({
    where,
    include: {
      assignedTo: {
        select: { fullName: true, email: true, department: true }
      }
    }
  });

  const formattedData = tasks.map((task: any) => ({
    Task_ID: task.id,
    Title: task.title,
    Status: task.status,
    Priority: task.priority,
    Start_Date: task.startDate.toISOString().split('T')[0],
    Due_Date: task.dueDate.toISOString().split('T')[0],
    Employee_Name: task.assignedTo.fullName,
    Employee_Email: task.assignedTo.email,
    Department: task.assignedTo.department || 'N/A'
  }));

  const parser = new Parser();
  return parser.parse(formattedData);
};
