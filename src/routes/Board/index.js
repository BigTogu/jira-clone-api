import { Router } from 'express';
import { getBoards, createBoard } from './../../controllers/board.js';

const routerBoard = Router();

routerBoard.get('/boards', getBoards);
routerBoard.post('/boards', createBoard);

export default routerBoard;
