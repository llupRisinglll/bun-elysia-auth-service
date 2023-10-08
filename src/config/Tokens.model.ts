import { DataTypes, Model } from 'sequelize';
import sequelize from './database';

const TokenTypes = {
	Refresh: 'refresh',
	RevokedAccess: 'revoked_access'
};

interface TokenAttributes {
	id?: number;
	userId: number;
	type: string;
	token: string;
	createdAt?: Date;
	updatedAt?: Date;
}

class Token extends Model<TokenAttributes> { }

Token.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isIn: {
					args: [Object.values(TokenTypes)],
					msg: 'Invalid token type',
				},
			},
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: 'Token',
		tableName: 'tokens',
	}
);

sequelize.sync();

export default Token;