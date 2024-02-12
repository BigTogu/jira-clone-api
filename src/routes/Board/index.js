import { Router } from 'express';
import {
	getBoards,
	createBoard,
	inviteToBoard,
	getBoardById,
	deleteBoard,
} from './../../controllers/board.js';

const routerBoard = Router();

routerBoard.get('/boards', getBoards);
routerBoard.post('/boards', createBoard);
routerBoard.post('/boards/invite', inviteToBoard);
routerBoard.get('/board', getBoardById);
routerBoard.delete('/board', deleteBoard);

export default routerBoard;
