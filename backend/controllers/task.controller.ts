import type { Request, Response } from 'express';
import * as taskService from '../services/task.service.js';

export const createTask = async (req: any, res: Response): Promise<any> => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req: any, res: Response): Promise<any> => {
  try {
    const tasks = await taskService.getTasks(req.user.role, req.user.id);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req: any, res: Response): Promise<any> => {
  try {
    const task = await taskService.getTaskById(Number(req.params.id), req.user.role, req.user.id);
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json(task);
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
};

export const updateTask = async (req: any, res: Response): Promise<any> => {
  try {
    const task = await taskService.updateTask(Number(req.params.id), req.body, req.user.role, req.user.id);
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req: any, res: Response): Promise<any> => {
  try {
    await taskService.deleteTask(Number(req.params.id), req.user.role, req.user.id);
    res.json({ message: "Deleted" });
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
};
