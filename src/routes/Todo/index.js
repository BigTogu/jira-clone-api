import { Router } from 'express';
import { getTodos, createTodo } from './../../controllers/todo.js';

const routerTodos = Router();

routerTodos.get('/todos', getTodos);
routerTodos.post('/todos', createTodo);

export default routerTodos;
