import express, { type Request, type Response } from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import taskRoutes from './routes/task.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import reportRoutes from './routes/report.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;


//health check
app.get('/', (req: Request, res: Response) => {
    res.send("API is running");
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Employee Routes (Admin only)
app.use('/api/employees', employeeRoutes);

// Task Routes
app.use('/api/tasks', taskRoutes);

// Dashboard Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})