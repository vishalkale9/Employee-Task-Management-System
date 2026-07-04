import type { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully!", user: { id: user.id, email: user.email, fullName: user.fullName } });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: "Invalid data or registration failed", details: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
