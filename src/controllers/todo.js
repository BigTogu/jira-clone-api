import { AppError } from '../statusCodes/error.js';
import { BoardMembers, Boards, Todos } from '../db/models/index.js';

function transformQuery(initialQuery, responsibleId, status) {
	let query = initialQuery;

	if (responsibleId) {
		query = {
			...query,
			responsible_id: responsibleId,
		};
	}

	if (status) {
		query = {
			...query,
			status,
		};
	}

	return query;
}

export async function getTodos(req, res, next) {
	const user = req.user;
	const { responsibleId, status } = req.query;
	const initialQuery = {
		board_id: req.params.boardId,
	};
	const queryForTodos = transformQuery(initialQuery, responsibleId, status);

	// Check if user is a member of the board
	try {
		await BoardMembers.findOne({
			where: {
				board_id: req.params.boardId,
				user_id: user.id,
			},
		});
	} catch (error) {
		return next(new AppError('User does not belongs to this board', 403));
	}

	const todos = await Todos.findAll({
		where: {
			...queryForTodos,
		},
	});

	try {
		res.json({ todos });
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
