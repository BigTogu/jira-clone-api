import { getIdFromToken } from '../auth/index.js';
import { User } from '../db/models/index.js';

export async function middleware(req, res, next) {
	try {
		const { authorization } = req.headers;

		if (authorization?.startsWith('Bearer')) {
			const token = authorization?.split(' ')[1];
			const [err, tokenDecoded] = getIdFromToken(token);

			if (err) {
				return res.status(403).json({ error: err });
			}

			const { id, isValid } = tokenDecoded;
			const user = await User.findOne({ where: { id } });

			if (user && isValid) {
				req.user = user;
				return next();
			} else {
				res.status(403).json({ error: { message: 'Usuario no encontrado' } });
			}
		} else {
			res.status(403).json({
				error: { message: 'Formato de token incorrecto' },
			});
		}
	} catch (error) {
		console.log(error, 'error');
		return res
			.status(500)
			.json({ error: { message: 'Error interno del servidor' } });
	}
}
