import jwt from 'jsonwebtoken';
import { claveSecreta } from '../constants/configs.js';

export function getToken(id, isValid) {
	const payload = { id };
	if (isValid !== undefined) {
		payload.isValid = isValid;
	}

	return jwt.sign(payload, claveSecreta, { expiresIn: '48h' });
}

export function getIdFromToken(token) {
	return jwt.verify(token, claveSecreta, function (err, decoded) {
		if (err) {
			return [err, null];
		}
		return [null, decoded];
	});
}

export function createTokenForGroup(groupId, userWhoInvites, email) {
	return jwt.sign({ groupId, email, userWhoInvites }, claveSecreta, {
		expiresIn: '48h',
	});
}
