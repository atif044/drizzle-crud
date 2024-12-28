import express, { Express, NextFunction } from "express";
import globalErrorHandler from './Controllers/error-controller/error.controller';
import todoRouter from './routes/todo.routes'
const app: Express = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',todoRouter)
app.use(globalErrorHandler)
export default app;
