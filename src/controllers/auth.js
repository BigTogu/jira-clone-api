import { User } from '../db/models/index.js';
import { getToken } from '../auth/index.js';
import { AppError } from '../statusCodes/error.js';
import { sendEmail } from '../utils/sendEmail.js';

export async function register(req, res, next) {
	try {
		const { username, password, email } = req.body;
		const newUser = await User.create({
			username: username,
			password: password,
			email: email,
		});

		await sendEmail(
			email,
			'Account Verification Link',
			`Hello, ${username} Please verify your email by
		clicking this link:`,
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
		const user = await User.findOne({
			where: {
				username: username,
			},
		});
		if (!user) {
			return next(new AppError('Usuario no encontrado', 404));
		}

		const isValidPassword = await user.validPassword(password);
		if (isValidPassword) return res.json({ token: getToken(user.id) });
		else {
			return next(new AppError('Contraseña no válida', 400));
		}
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
}
