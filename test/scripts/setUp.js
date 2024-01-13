import { User } from '../../src/db/models/index.js';
import { getToken } from '../../src/jwt/index.js';
import { userCorrectData } from './constants.js';

// eslint-disable-next-line no-undef
beforeAll(async () => {
	console.log('base de datos de test eliminada');
	User.truncate();
	await User.create(userCorrectData);
});

export async function getAuthenticationHeader(username) {
	const user = await User.findOne({
		where: {
			username,
		},
	});
	return 'Bearer ' + getToken(user.id);
}
