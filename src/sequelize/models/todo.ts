import { DataTypes, Model, Sequelize, BuildOptions } from 'sequelize';

export interface TodoAttributes {
  id?: number;
  content: String;
  success: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface TodoModel extends Model<TodoAttributes>, TodoAttributes {};
export class Todo extends Model<TodoModel, TodoAttributes> {};
export type TodoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TodoModel;
};

export const todoTable = (sequelize: Sequelize): TodoStatic => {
  return <TodoStatic>sequelize.define('todo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    freezeTableName: true
  });
};