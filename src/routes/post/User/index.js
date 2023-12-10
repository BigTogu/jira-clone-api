import { Router } from 'express';
import { User } from '../../../db/models/index.js';
import { getToken } from '../../../auth/index.js';

const router = Router();

router.post('/login', async (req, res) => {
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
		if (isValidPassword) return res.json({ token: getToken(username) });
		else {
			res.json('Contraseña no válida');
		}
	} catch (error) {
		return res
			.status(500)
			.json({ error: error.message || 'Error interno del servidor' });
	}
});

export default router;
