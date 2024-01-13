import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from 'sequelize';

import sequelize from '../config.js';

export const User = sequelize.define(
	'User',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: false,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
		},
		isValid: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		group_id: {
			type: Sequelize.UUID,
			allowNull: true,
		},
	},
	{
		tableName: 'users',
	},
);

// eslint-disable-next-line no-unused-vars
User.beforeCreate((user, options) => {
	return bcrypt
		.hash(user.password, 10)
		.then(hash => {
			user.password = hash;
		})
		.catch(err => {
			throw new Error(err);
		});
});
User.prototype.validPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

export const Group = sequelize.define(
	'Group',
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: 'groups' },
);

export const Board = sequelize.define(
	'Board',
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		group_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
		},
	},
	{ tableName: 'boards' },
);

export const Todo = sequelize.define(
	'Todo',
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
			primaryKey: true,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		responsable: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		task_duration: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		board_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
		},
	},
	{ tableName: 'todos' },
);
