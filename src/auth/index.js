import jwt from 'jsonwebtoken';
import { claveSecreta } from '../constants/configs.js';

export function getToken(username) {
	return jwt.sign(
		{
			username: username,
		},
		claveSecreta,
		{ expiresIn: '48h' },
	);
}

export function getUsernameFromToken(token) {
	return jwt.verify(token, claveSecreta, function (err, decoded) {
		if (err) {
			return [err, null];
		}
		return [null, decoded];
	});
}
