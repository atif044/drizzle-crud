import express from "express";
import todoValidator from "../validators/todo.validator";
const router = express.Router();
import * as TodoController from '../Controllers/todo-controller/todo.controller';
router.route('/todo').post(todoValidator,TodoController.createTodo).get(TodoController.getTodos)
router.route('/todo/:id').put(todoValidator,TodoController.updateTodo).delete(TodoController.deleteTodo)
export default router;
