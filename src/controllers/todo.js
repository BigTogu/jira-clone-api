import { AppError } from '../statusCodes/error.js';
import { BoardMembers, Todos } from '../db/models/index.js';
import { todoStatus } from '../constants/enums.js';

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
	const { responsibleId, status, boardId } = req.query;
	const initialQuery = {
		boardId: boardId,
	};

	const queryForTodos = transformQuery(initialQuery, responsibleId, status);

	try {
		await BoardMembers.findOne({
			where: {
				boardId,
				userId: user.id,
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

export async function createTodo(req, res, next) {
	const { title, boardId, status } = req.body;
	let newTodo;

	try {
		newTodo = await Todos.create({
			title,
			boardId,
			status: status ? status : todoStatus.TO_DO,
		});
	} catch (error) {
		return next(new AppError(error.message, 409));
	}

	res.status(201).json({
		message: 'Todo Creado',
		data: newTodo,
	});
}
