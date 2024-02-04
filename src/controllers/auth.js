import { Users, BoardMembers } from '../db/models/index.js';
import { getToken } from '../jwt/index.js';
import { AppError } from '../statusCodes/error.js';
import { sendEmail } from '../utils/sendEmail.js';
import { getIdFromToken } from '../jwt/index.js';

export async function register(req, res, next) {
	try {
		const { username, lastName, password, email, token } = req.body;
		if (token) {
			const [err, { id, groupId, email, userWhoInvites }] =
				getIdFromToken(token);
			try {
				await Users.findOne({
					where: {
						id: userWhoInvites,
					},
				});
			} catch (error) {
				return next(new AppError('Usuario no encontrado', 404));
			}
			const invitedUser = await Users.create({
				username,
				password,
				email,
				lastName,
				isValid: true,
			});
			await BoardMembers.create({
				board_id: groupId,
				user_id: invitedUser.id,
				isAdmin: false,
				isOwner: false,
			});
			return res.json({
				message: 'Usuario creado',
				token: getToken(invitedUser.id),
			});
		}
		let newUser;
		try {
			newUser = await Users.create({
				username,
				password,
				email,
				lastName,
			});
		} catch (error) {
			return next(new AppError(error.message, 409));
		}

		const verifyToken = getToken(newUser.id, true);

		await sendEmail(
			email,
			'Account Verification Link',
			`Hello, ${username} Please verify your email by
		clicking this link:`,
			verifyToken,
		);

		res.status(201).json({
			message: 'Usuario creado',
			token: getToken(newUser.id),
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
}

export async function login(req, res, next) {
	try {
		const { username, password } = req.body;
		const user = await Users.findOne({
			where: {
				username: username,
			},
		});
		if (!user) {
			return next(new AppError('Usuario no encontrado', 404));
		}

		const isValidPassword = await user.validPassword(password);

		if (isValidPassword)
			return res.json({ token: getToken(user.id, user.isValid) });
		else {
			return next(new AppError('Contraseña no válida', 401));
		}
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
}

export async function emailConfirmation(req, res, next) {
	try {
		const { token } = req.params;
		// eslint-disable-next-line no-unused-vars
		const [err, { id, isValid }] = getIdFromToken(token);

		const user = await Users.findOne({
			where: {
				id: id,
			},
		});
		if (isValid) {
			user.isValid = true;
			await user.save();
		}

		res.json({
			token: token,
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
}
