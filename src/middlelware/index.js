import { getUsernameFromToken } from '../auth/index.js';
import { User } from '../db/models/index.js';

export async function middleware(req, res, next) {
	try {
		const { authorization } = req.headers;

		if (authorization?.startsWith('Bearer')) {
			const token = authorization?.split(' ')[1];
			const [err, tokenDecoded] = getUsernameFromToken(token);

			if (err) {
				return res.status(403).json({ error: err });
			}

			const { username } = tokenDecoded;
			const user = await User.findOne({ where: { username } });

			if (user) {
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
		return res
			.status(500)
			.json({ error: { message: 'Error interno del servidor' } });
	}
}

export function unless(...paths) {
	return function (req, res, next) {
		const pathCheck = paths.some(path => path === req.path);
		pathCheck ? next() : middleware(req, res, next);
	};
}
