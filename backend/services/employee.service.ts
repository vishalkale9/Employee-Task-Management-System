import prisma from '../utils/db.js';
import bcrypt from 'bcrypt';

export const getAllEmployees = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      department: true,
      designation: true,
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
      department: true,
      designation: true,
      createdAt: true
    }
  });
};

export const createEmployee = async (data: any) => {
  const { fullName, email, password, role, department, designation } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return await prisma.user.create({
    data: { fullName, email, password: hashedPassword, role, department, designation },
    select: { id: true, fullName: true, email: true, role: true, department: true, designation: true }
  });
};

export const updateEmployee = async (id: number, data: { fullName?: string; role?: 'ADMIN' | 'EMPLOYEE'; department?: string; designation?: string }) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      department: true,
      designation: true
    }
  });
};

export const deleteEmployee = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
    select: { id: true, email: true }
  });
};
