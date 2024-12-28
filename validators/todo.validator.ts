import { Request, Response, NextFunction } from "express";
import { todoList } from '../utils/interfaces'
import ErrorHandler from "../config/error.handler";
const todoValidator = (req: Request, res: Response, next: NextFunction) => {
    const {description,title }: todoList = req.body;
    if(!title||title?.trim()==="") return next(new ErrorHandler("Title is a required field",400))
    if(!description||description?.trim()==="") return next(new ErrorHandler("Description is a required field",400))
    return next();
};

export default todoValidator;