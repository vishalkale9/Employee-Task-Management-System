import prisma from '../utils/db.js';


export const getAllEmployees = async () => {
  return await prisma.user.findMany({
    where: { role: 'EMPLOYEE' },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

export const getEmployeeById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

export const updateEmployee = async (id: number, data: { fullName?: string; role?: 'ADMIN' | 'EMPLOYEE' }) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true
    }
  });
};

export const deleteEmployee = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
    select: { id: true, email: true }
  });
};
