import { User } from '../../src/db/models/index.js';

// eslint-disable-next-line no-undef
beforeAll(() => {
	console.log('base de datos de test eliminada');
	User.truncate();
});
