import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): any => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        try {

            token = token.split(' ')[1] as string;

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);


            req.user = decoded;

            next();
        } catch (error) {
            return res.status(401).json({ error: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ error: "Not authorized, no token" });
    }
};


export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): any => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ error: "Not authorized as an admin" });
    }
};
