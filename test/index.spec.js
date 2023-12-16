/* eslint-disable no-undef */
import app from '../src/app.js';
import request from 'supertest';
import { User } from '../src/db/models/index.js';

describe('POST /register', () => {
	test('should respond with a 201 status code', async () => {
		const userData = await User.create({
			username: 'Togu',
			password: 'test',
			email: 'none',
		});
		console.log(userData.username, 'userData');
		console.log(User.username, User.password, 'user');
		const response = await request(app).post('/register').send(userData);
		console.log(response, 'response');
		if (response.statusCode !== 201) {
			console.log(response.body, 'response body'); // Esto mostrará el error si el estado no es 201
		}
		expect(response.statusCode).toBe(201);
		//  User.destroy({
		// 	where: {
		// 		username: userData.username,
		// 	},
		// });
	});
});

// 	// test('should respond with an array', async () => {
// 	// 	const response = await request(app).get('/tasks').send();
// 	// 	// expect(response.body).toEqual(expect.arrayContainer([]));
// 	// 	expect(response.body).toBeInstanceOf(Array);
// 	// });
// });

// describe('POST /tasks', () => {
// 	describe('given a title and description', () => {
// 		const newTask = {
// 			title: 'Test Task',
// 			description: 'Test description',
// 		};

// 		test('should respond with a 200 status code', async () => {
// 			const response = await request(app).post('/tasks').send(newTask);
// 			expect(response.statusCode).toBe(200);
// 		});

// 		test('should have a content-type: application/json in header', async () => {
// 			const response = await request(app).post('/tasks').send(newTask);

// 			// expect(response.header['content-type'].toBe('application/json'));
// 			expect(response.headers['content-type']).toEqual(
// 				expect.stringContaining('json'),
// 			);
// 		});

// 		test('should respond with a json object containing the new task with a id', async () => {
// 			const response = await request(app).post('/tasks').send(newTask);
// 			expect(response.body.id).toBeDefined();
// 		});
// 	});

// 	describe('when title and description is missing', () => {
// 		test('should respond with a 404 status code', async () => {
// 			const fields = [
// 				{},
// 				{ title: 'Task Title' },
// 				{ description: 'Test Description' },
// 			];

// 			for (const body of fields) {
// 				const response = await request(app).post('/tasks').send(body);
// 				expect(response.statusCode).toBe(404);
// 			}
// 		});
// 	});
// });
