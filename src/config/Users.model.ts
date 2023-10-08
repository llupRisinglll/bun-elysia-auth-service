import { DataTypes, Model } from 'sequelize';
import sequelize from './database';

export interface UserAttributes {
	id?: number;
	username: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
	payload?: {
		created: Date;
		updated: Date;
		[key: string]: any; // Other dynamic payload properties
	};
}

class User extends Model<UserAttributes> { }
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
			field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
			field: 'updated_at',
		},
		payload: {
			type: DataTypes.JSON,
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
	}
);

sequelize.sync();

export default User;