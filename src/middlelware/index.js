import { getIdFromToken } from '../jwt/index.js';
import { User } from '../db/models/index.js';

export async function middleware(req, res, next) {
	try {
		const { authorization } = req.headers;

		if (authorization?.startsWith('Bearer')) {
			const token = authorization?.split(' ')[1];
			const [err, tokenDecoded] = getIdFromToken(token);

			if (err) {
				return res.status(401).json({ error: err });
			}

			const { id, isValid } = tokenDecoded;
			const user = await User.findOne({ where: { id } });

			if (user && isValid) {
				req.user = user;
				return next();
			} else {
				res.status(404).json({
					error: {
						message: isValid ? 'Usuario no encontrado' : 'token no valido',
					},
				});
			}
		} else {
			res.status(401).json({
				error: { message: 'Formato de token incorrecto' },
			});
		}
	} catch (error) {
		console.error(error, 'error');
		return res
			.status(500)
			.json({ error: { message: 'Error interno del servidor' } });
	}
}
