import { DataTypes, Model } from 'sequelize';
import sequelize from './database';

const TokenTypes = {
	Refresh: 'refresh_token',
	Access: 'access_token',
	Revoked_Access: 'revoked_access_token',
	Revoked_Refresh: 'revoked_refresh_token',
};

interface TokenAttributes {
	id: number;
	userId: number;
	token: string;
	createdAt: Date;
	updatedAt: Date;
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
		token: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isIn: {
					args: [Object.values(TokenTypes)],
					msg: 'Invalid token type',
				},
			},
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