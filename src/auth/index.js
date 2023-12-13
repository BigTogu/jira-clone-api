import jwt from 'jsonwebtoken';
import { claveSecreta } from '../constants/configs.js';

export function getToken(id) {
	return jwt.sign(
		{
			id: id,
		},
		claveSecreta,
		{ expiresIn: '48h' },
	);
}

export function getIdFromToken(token) {
	return jwt.verify(token, claveSecreta, function (err, decoded) {
		if (err) {
			return [err, null];
		}
		return [null, decoded];
	});
}
