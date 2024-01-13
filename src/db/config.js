/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';

const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
console.log(database);

const sequelize = new Sequelize(database, username, password, {
	host: host,
	dialect: 'postgres',
	logging: false,
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
