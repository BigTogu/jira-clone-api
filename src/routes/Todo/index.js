import { Router } from 'express';
import { getTodos, createTodo } from './../../controllers/todo.js';

const routerBoard = Router();

routerBoard.get('/todos', getTodos);
routerBoard.post('/todos', createTodo);

export default routerBoard;
