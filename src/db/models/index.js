import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from 'sequelize';

import sequelize from '../config.js';

export const Users = sequelize.define(
	'Users',
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
		isValid: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: 'Users',
	},
);

// eslint-disable-next-line no-unused-vars
Users.beforeCreate((user, options) => {
	return bcrypt
		.hash(user.password, 10)
		.then(hash => {
			user.password = hash;
		})
		.catch(err => {
			throw new Error(err);
		});
});
Users.prototype.validPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

export const BoardMembers = sequelize.define(
	'BoardMembers',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
		},
		board_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		isOwner: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{ tableName: 'BoardMembers' },
);

export const Boards = sequelize.define(
	'Boards',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: 'Boards' },
);

export const Todos = sequelize.define(
	'Todos',
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
		responsable_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		task_duration: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		story_points: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		board_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: 'Todos' },
);

export const TodoTags = sequelize.define(
	'TodoTags',
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
			primaryKey: true,
		},
		todo_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
		},
		tag_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
		},
	},
	{ tableName: 'TodoTags' },
);

export const Tags = sequelize.define(
	'Tags',
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUID,
			primaryKey: true,
		},
		key: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ tableName: 'Tags' },
);
