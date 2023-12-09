import { getUsernameFromToken } from '../routes/auth.js';
import { User } from '../db/models/index.js';

export function middleware(req, res, next) {
	const { authorization } = req.headers;
	if (authorization?.includes('Bearer')) {
		const token = authorization?.split(' ')[1];
		const [err, tokenDecoded] = getUsernameFromToken(token);

		if (err) {
			return res.status(403).json({
				err,
			});
		}
		const { username } = tokenDecoded;

		User.findOne({
			where: {
				username: username,
			},
		})
			.then(user => {
				if (user) {
					return next();
				} else {
					res.status(403).json({ error: { message: 'Usuario no encontrado' } });
				}
			})
			.catch(error => {
				res.status(403).json({ error });
			});
	} else {
		res.status(403).json({
			error: { message: 'Formato de token incorrecto' },
		});
	}
}

export function unless(...paths) {
	return function (req, res, next) {
		const pathCheck = paths.some(path => path === req.path);
		pathCheck ? next() : middleware(req, res, next);
	};
}
