import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config.js";
import bcrypt from "bcrypt";

export const User = sequelize.define(
  "User",
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    group_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
  },
  { tableName: "users" }
);

export const Group = sequelize.define(
  "Group",
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
  { tableName: "groups" }
);

export const Board = sequelize.define(
  "Board",
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
  { tableName: "boards" }
);

export const Todo = sequelize.define(
  "Todo",
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
  { tableName: "todos" }
);
