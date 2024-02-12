import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from 'sequelize';
import { todoStatusEnum } from '../../constants/enums.js';
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
		userId: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
		},
		boardId: {
			type: Sequelize.UUID,
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
		key: {
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
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		status: {
			type: Sequelize.ENUM,
			values: todoStatusEnum,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		responsibleId: {
			type: Sequelize.UUID,
			allowNull: true,
		},
		taskDuration: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		storyPoints: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		boardId: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{ tableName: 'Todos' },
);

export const TodoTags = sequelize.define(
	'TodoTags',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		todoId: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
		},
		tagId: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
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

// Relations
Users.belongsToMany(Boards, {
	through: BoardMembers,
	foreignKey: 'userId',
	otherKey: 'boardId',
});
Boards.belongsToMany(Users, {
	through: BoardMembers,
	foreignKey: 'boardId',
	otherKey: 'userId',
});

Todos.belongsTo(sequelize.models.Boards, {
	foreignKey: 'boardId',
	as: 'board',
	onDelete: 'CASCADE',
});
Todos.belongsTo(sequelize.models.Users, {
	foreignKey: 'responsibleId',
	as: 'responsible',
});
Todos.belongsToMany(Tags, {
	through: TodoTags,
	foreignKey: 'todoId',
	otherKey: 'tagId',
});
Tags.belongsToMany(Todos, {
	through: TodoTags,
	foreignKey: 'tagId',
	otherKey: 'todoId',
});
