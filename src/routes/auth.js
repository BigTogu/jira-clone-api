import jwt from 'jsonwebtoken';
import { claveSecreta } from '../constants/configs.js';

export function getToken(username) {
	let token = jwt.sign(
		{
			username: username,
		},
		claveSecreta,
		{ expiresIn: '48h' },
	);
	return token;
}
