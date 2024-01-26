import { Users } from '../../src/db/models/index.js';
import { getToken } from '../../src/jwt/index.js';
import { userCorrectData, invalidUserData } from './constants.js';
import sequelize from '../../src/db/config.js';

// eslint-disable-next-line no-undef
beforeAll(async () => {
	try {
		sequelize
			.sync()
			.then(async () => {
				await Users.create(userCorrectData);
				await Users.create(invalidUserData);
			})
			.catch(error => {
				console.error('Connection fail', error);
			});
	} catch (error) {
		console.log(error);
	}
});

// eslint-disable-next-line no-undef
afterAll(async () => {
	await Users.destroy({
		where: {},
		truncate: true,
	});
});

export async function getAuthenticationHeader(username) {
	const user = await Users.findOne({
		where: {
			username,
		},
	});
	return 'Bearer ' + getToken(user.id);
}
