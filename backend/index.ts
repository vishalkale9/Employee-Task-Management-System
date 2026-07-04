import express, { type Request, type Response } from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js';
import employeeRoutes from './routes/employee.routes.js';
dotenv.config();

const app = express();

//middlewares
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;


//health check
app.get('/', (req: Request, res: Response) => {
    res.send("API is running");
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Employee Routes (Admin only)
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})