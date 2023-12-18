/* eslint-disable no-undef */
import app from '../src/app.js';
import request from 'supertest';
import { getAuthenticationHeader } from './scripts/setUp.js';
import { userCorrectData } from './scripts/constants.js';
import bcrypt from 'bcrypt';
import { User } from '../src/db/models/index.js';

describe('POST /register', () => {
	test('should respond with a 201 status code', async () => {
		const userData = {
			username: 'Togu',
			password: 'test',
			email: 'none',
		};
		const response = await request(app).post('/register').send(userData);

		expect(response.statusCode).toBe(201);
	});

	test('password is encrypted', async () => {
		const userData = {
			username: 'Togu',
			password: 'test',
			email: 'none',
		};
		await request(app).post('/register').send(userData);

		const user = await User.findOne({
			where: { username: 'Togu' },
		});

		const isPasswordEncrypted = await bcrypt.compare(
			userData.password,
			user.password,
		);
		expect(isPasswordEncrypted).toBe(true);
	});
});

describe('POST /login', () => {
	test('should respond with a 200 status code', async () => {
		const userData = {
			username: 'Togu',
			password: 'test',
			email: 'none',
		};
		const response = await request(app).post('/login').send(userData);

		expect(response.statusCode).toBe(200);
	});

	test('should respond with a 404 status code', async () => {
		const userDataNotFound = {
			username: 'UsuarioNoRegistrado',
			password: 'test',
			email: 'none',
		};
		const response = await request(app).post('/login').send(userDataNotFound);

		expect(response.statusCode).toBe(404);
	});
});

describe('GET /me', () => {
	test('should respond with a 200 status code', async () => {
		const headerAuthentication = await getAuthenticationHeader(
			userCorrectData.username,
		);
		const response = await request(app)
			.get('/me')
			.set('authorization', headerAuthentication)
			.send();

		expect(response.statusCode).toBe(200);
	});

	test('should respond with a json object containing the user with a id, username and email', async () => {
		const expectedFields = ['username', 'email', 'id'];

		const headerAuthentication = await getAuthenticationHeader(
			userCorrectData.username,
		);
		const response = await request(app)
			.get('/me')
			.set('authorization', headerAuthentication)
			.send();
		expectedFields.forEach(field => {
			expect(response.body[field]).toBeDefined();
		});
	});
});

describe('GET /', () => {
	test('should respond with a 200 status code', async () => {
		const headerAuthentication = await getAuthenticationHeader(
			userCorrectData.username,
		);
		const response = await request(app)
			.get('/')
			.set('authorization', headerAuthentication)
			.send();

		expect(response.statusCode).toBe(200);
	});
});
