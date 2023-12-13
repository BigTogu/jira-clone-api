import express from 'express';
import authRouter from './routes/User/auth.js';
import router from './routes/User/index.js';
import sequelize from './db/config.js';
import { middleware } from './middlelware/index.js';

const app = express();

// Settings
app.set('port', 8000);
app.set('json spaces', 2);

app.use(express.json());

app.use(authRouter);
app.use(middleware);
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
