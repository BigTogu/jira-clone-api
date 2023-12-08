import express from 'express';
//import morgan from "morgan";
import router from './routes/index.js';
import sequelize from './db/config.js';
const app = express();

// Settings
// eslint-disable-next-line no-undef
app.set('port', process.env.PORT || 8000);
app.set('json spaces', 2);

app.use(express.json());
app.use(router);

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
