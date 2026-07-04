import express, { type Request, type Response } from "express";
import cors from 'cors'
import dotenv from 'dotenv'

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})