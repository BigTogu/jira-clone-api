import { Users } from '../../src/db/models/index.js';
import { getToken } from '../../src/jwt/index.js';
import { userCorrectData } from './constants.js';
import sequelize from '../../src/db/config.js';

// eslint-disable-next-line no-undef
beforeAll(async () => {
	console.log('base de datos de test eliminada');
	try {
		sequelize
			.sync()
			.then(() => {
				console.log('Sync models');
				Users.create(userCorrectData);
			})
			.catch(error => {
				console.error('Connection fail', error);
			});
	} catch (error) {
		console.log(error);
	}
	console.log('usuario creado');
});

export async function getAuthenticationHeader(username) {
	const user = await Users.findOne({
		where: {
			username,
		},
	});
	return 'Bearer ' + getToken(user.id);
}
