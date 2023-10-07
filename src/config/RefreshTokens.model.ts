import { DataTypes, Model } from 'sequelize';
import sequelize from './database';

interface RefreshTokenAttributes {
	id: number;
	userId: number;
	token: string;
}

class RefreshToken extends Model<RefreshTokenAttributes> { }

RefreshToken.init(
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
		},
	},
	{
		sequelize,
		modelName: 'RefreshToken',
		tableName: 'refresh_tokens',
	}
);

sequelize.sync();

export default RefreshToken;