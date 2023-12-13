export async function home(req, res) {
	res.json({
		Title: 'Hola mundo usando rutas!',
	});
}

export async function getMe(req, res) {
	const { id, username, email, group_id } = req.user;
	try {
		res.json({
			id,
			username,
			email,
			group_id,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message || 'Error interno del servidor',
		});
	}
}

export async function updateMe(req, res) {
	const { username, email } = req.body;
	console.log(username);
	let updateValues = {};
	if (username) updateValues.username = username;
	if (email) updateValues.email = email;

	const user = req.user;

	user.update(updateValues).then(() => {
		res.json({ title: user });
	});
}
