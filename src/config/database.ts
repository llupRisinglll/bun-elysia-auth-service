import { Sequelize } from 'sequelize';
import config from './config';

const sequelize = new Sequelize(
	config.database.mysql.host,
	config.database.mysql.username,
	config.database.mysql.password, 
	{
		host: 'mysql', // Use the internal network of docker
		dialect: 'mysql',
	}
);

export default sequelize;