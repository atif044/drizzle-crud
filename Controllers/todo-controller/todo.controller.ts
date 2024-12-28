import catchAsyncErrors from "../../config/catch.async.error";
import { Request,Response,NextFunction } from "express";
import { getConnection } from "../../database/db.connection";
import ErrorHandler from "../../config/error.handler";
import {tasks} from '../../schema/schema'
import { todoList } from "../../utils/interfaces";
import { count, eq, sql } from "drizzle-orm";
import { paginatorModule } from "../utils/paginator.module";
export const createTodo=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    const {connection,release}=await getConnection();
    const data:todoList=req.body;
    try {
        const result = await connection.insert(tasks).values({title:data.title,description:data.description}).returning();
         res.status(201).json({
            status:"success",
            message:"Task has been listed successfully"
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("An Error Occurred while adding task",400));
    }
    finally{
        release()
    }
});
export const getTodos=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    const {connection,release}=await getConnection();
    const data:todoList=req.body;
    const limit:number=Number(req.query.limit)||10
    const page:number=Number(req.query.page)||1
    try {
          const {offset,totalPages}=  await  paginatorModule(page,limit,tasks,connection)
        const rows=await connection.select().from(tasks).limit(limit).offset(offset);
         res.status(201).json({
            status:"success",
            body:rows,
            totalPages:totalPages
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("An Error Occurred while adding task",400));
    }
    finally{
         release()
    }
});
export const updateTodo = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { connection, release } = await getConnection();
    const id:number  = parseInt(req.params.id); 
    const data: todoList = req.body; 
    if(isNaN(id))
        return next(new ErrorHandler("Id must be a number",400));
    try {
      const task = await connection.select().from(tasks).where(eq(tasks.id,id));
      if (!task.length) {
        return next(new ErrorHandler("Task not found", 404)); 
      }
        const updateData: any = {
        title: data.title,
        description: data.description,
      };
  
      if (data.completed !== undefined) {
        updateData.completed = data.completed; 
      }
        const result = await connection
        .update(tasks)
        .set(updateData)
        .where(eq(tasks.id,id))
        .returning();
  
      res.status(200).json({
        status: "success",
        message: "Task updated successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler("An Error Occurred while updating task", 400));
    } finally {
      release();
    }
  });
export const deleteTodo = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { connection, release } = await getConnection();
    const id: number = parseInt(req.params.id);
  
    if (isNaN(id)) {
      return next(new ErrorHandler("Id must be a number", 400));
    }
  
    try {
      const task = await connection.select().from(tasks).where(eq(tasks.id, id));
      if (!task.length) {
        return next(new ErrorHandler("Task not found", 404));
      }
  
      await connection.delete(tasks).where(eq(tasks.id, id));
  
      res.status(200).json({
        status: "success",
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler("An Error Occurred while deleting task", 400));
    } finally {
      release();
    }
  });
  
  