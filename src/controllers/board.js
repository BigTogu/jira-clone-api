import { AppError } from '../statusCodes/error.js';
import { BoardMembers, Boards } from '../db/models/index.js';

export async function getBoards(req, res, next) {
	// Viene del middleware
	const user = req.user;
	const boards = await BoardMembers.findAll({
		where: {
			user_id: user.id,
		},
	});
	try {
		res.json({ boards: boards });
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
}

export async function createBoard(req, res, next) {
	const { name } = req.body;
	let newBoard;

	try {
		newBoard = await Boards.create({
			name,
		});
	} catch (error) {
		return next(new AppError(error.message, 409));
	}

	try {
		await BoardMembers.create({
			board_id: newBoard.id,
			user_id: req.user.id,
			isAdmin: true,
			isOwner: true,
		});
	} catch (error) {
		return next(new AppError(error.message, 409));
	}

	res.status(201).json({
		message: 'Board Creado',
	});
}
