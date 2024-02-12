import { Router } from 'express';
import {
	getBoards,
	createBoard,
	inviteToBoard,
	getBoardById,
} from './../../controllers/board.js';

const routerBoard = Router();

routerBoard.get('/boards', getBoards);
routerBoard.post('/boards', createBoard);
routerBoard.post('/boards/invite', inviteToBoard);
routerBoard.get('/board', getBoardById);

export default routerBoard;
