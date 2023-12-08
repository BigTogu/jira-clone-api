import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/index.js';

const router = Router();

const getToken = (username) => {
	let token = jwt.sign(
		{
			username: username,
		},
		'secret-password',
		{ expiresIn: '48h' }
	);
	return token;
};

router.get('/', (req, res) => {
	res.json({
		Title: 'Hola mundo usando rutas!',
	});
});

router.get('/register', (req, res) => {
	const { username, password } = req.body;

	User.create({
		username: username,
		password: password,
		email: username,
	})
		.then(() => {
			res.json({
				message: 'Usuario creado',
				token: getToken(username),
			});
		})
		.catch((error) => {
			res.json({
				title: `error: ${error}`,
			});
		});
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	User.findOne({
		where: {
			username: username,
		},
	})
		.then((user) => {
			user
				.validPassword(password)
				.then((isValidPassword) => {
					if (isValidPassword) return res.json({ token: getToken(username) });
					res.json('Contraseña no válida');
				})
				.catch((error) => {
					res.json({
						error,
					});
				});
		})
		.catch(() => {
			res.json('Usuario no encontrado');
		});
});

export default router;
