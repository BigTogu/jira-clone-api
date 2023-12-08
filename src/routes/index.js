import { Router } from 'express';
import { User } from '../db/models/index.js';
import { getToken } from './auth.js';

const router = Router();

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
		.catch(error => {
			res.json({
				error: error,
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
		.then(user => {
			user
				.validPassword(password)
				.then(isValidPassword => {
					if (isValidPassword) return res.json({ token: getToken(username) });
					res.json('Contraseña no válida');
				})
				.catch(error => {
					res.json({
						error: error,
					});
				});
		})
		.catch(() => {
			res.json('Usuario no encontrado');
		});
});

export default router;
