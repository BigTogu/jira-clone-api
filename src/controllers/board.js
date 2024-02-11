import { AppError } from '../statusCodes/error.js';
import { BoardMembers, Boards, Users } from '../db/models/index.js';
import { createTokenForGroup } from '../jwt/index.js';
import { sendEmailInvitation } from '../utils/sendEmail.js';

export async function getBoards(req, res, next) {
	// Viene del middleware
	const user = req.user;
	const boardMembers = await BoardMembers.findAll({
		where: {
			userId: user.id,
		},
	});

	let boardIds = boardMembers.map(member => member.boardId);

	const boards = await Boards.findAll({
		where: {
			id: boardIds,
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
			boardId: newBoard.id,
			userId: req.user.id,
			isAdmin: true,
			isOwner: true,
		});
	} catch (error) {
		return next(new AppError(error.message, 409));
	}

	res.status(201).json({
		message: 'Board Creado',
		boardId: newBoard.id,
	});
}

export async function inviteToBoard(req, res, next) {
	const { boardId, email } = req.body;
	let userToInvite;
	try {
		await Boards.findOne({
			where: {
				id: boardId,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 409));
	}

	try {
		userToInvite = await Users.findOne({
			where: {
				email: email,
			},
		});
		await BoardMembers.create({
			boardId,
			userId: userToInvite.id,
			isAdmin: false,
			isOwner: false,
		});

		res.status(201).json({
			message: 'Usuario añadido al board',
		});
	} catch (error) {
		const tokenForGroup = createTokenForGroup(boardId, req.user.id, email);
		await sendEmailInvitation(
			email,
			'Account Verification Link',
			`Hello, Please verify your email by
			clicking this link:`,
			tokenForGroup,
			email,
		);
		return next(new AppError(error.message, 409));
	}
}
