import { User } from '../db/models/index.js';
import { getToken } from '../auth/index.js';

export async function register(req, res) {
	try {
		const { username, password } = req.body;

		const newUser = await User.create({
			username: username,
			password: password,
			email: username,
		});

		res.json({
			message: 'Usuario creado',
			token: getToken(newUser.id),
		});
	} catch (error) {
		res.status(500).json({
			error: error.message || 'Error interno del servidor',
		});
	}
}

export async function login(req, res) {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({
			where: {
				username: username,
			},
		});
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}

		const isValidPassword = await user.validPassword(password);
		if (isValidPassword) return res.json({ token: getToken(user.id) });
		else {
			res.json('Contraseña no válida');
		}
	} catch (error) {
		return res
			.status(500)
			.json({ error: error.message || 'Error interno del servidor' });
	}
}
