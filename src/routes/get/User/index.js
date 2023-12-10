import { Router } from 'express';
import { User } from '../../../db/models/index.js';
import { getToken } from '../../../auth/index.js';

const router = Router();

router.get('/', (req, res) => {
	res.json({
		Title: 'Hola mundo usando rutas!',
	});
});

router.get('/register', async (req, res) => {
	try {
		const { username, password } = req.body;

		const newUser = await User.create({
			username: username,
			password: password,
			email: username,
		});

		res.json({
			message: 'Usuario creado',
			token: getToken(newUser.username),
		});
	} catch (error) {
		res.status(500).json({
			error: error.message || 'Error interno del servidor',
		});
	}
});

router.get('/rompela', (req, res) => {
	res.json('Lo has conseguido');
});

export default router;
