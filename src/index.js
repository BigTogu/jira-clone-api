import app from './app.js';
import sequelize from './db/config.js';

sequelize
	.sync()
	.then(() => {
		console.log('Sync models');
		//Iniciando el servidor, escuchando...
		app.listen(app.get('port'), () => {
			console.log(`Server on port ${app.get('port')}`);
		});
	})
	.catch(error => {
		console.error('Connection fail', error);
	});
