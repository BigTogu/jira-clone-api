/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';

const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || 5432;
console.log(database);

const sequelize = new Sequelize(database, username, password, {
	host: host,
	dialect: 'postgres',
	logging: true,
	port: port,
	define: {
		underscored: true,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(error => {
		console.error('Unable to connect to the database: ', error);
	});

export default sequelize;
