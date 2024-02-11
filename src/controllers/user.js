import { AppError } from '../statusCodes/error.js';

export async function home(req, res) {
	res.json({
		Title: 'Hola mundo usando rutas!',
	});
}

export async function getMe(req, res, next) {
	const { id, username, email, groupId } = req.user;
	try {
		res.json({
			id,
			username,
			email,
			groupId,
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
}

export async function updateMe(req, res) {
	const { username, email } = req.body;
	let updateValues = {};
	if (username) updateValues.username = username;
	if (email) updateValues.email = email;

	const user = req.user;

	user.update(updateValues).then(() => {
		res.json({ title: user });
	});
}
