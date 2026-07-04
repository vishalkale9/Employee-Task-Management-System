import type { Request, Response } from 'express';
import * as employeeService from '../services/employee.service.js';

export const getEmployees = async (req: Request, res: Response): Promise<any> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch employees", details: error.message });
  }
};

export const getEmployee = async (req: Request, res: Response): Promise<any> => {
  try {
    const employee = await employeeService.getEmployeeById(Number(req.params.id));
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch employee", details: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response): Promise<any> => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ error: "Email already exists" });
    res.status(500).json({ error: "Failed to create employee", details: error.message });
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullName, role, department, designation } = req.body;
    const employee = await employeeService.updateEmployee(Number(req.params.id), { fullName, role, department, designation });
    res.json({ message: "Employee updated successfully", employee });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update employee", details: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<any> => {
  try {
    await employeeService.deleteEmployee(Number(req.params.id));
    res.json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete employee", details: error.message });
  }
};
