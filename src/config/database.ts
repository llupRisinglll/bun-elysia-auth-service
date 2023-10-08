import { Sequelize } from 'sequelize';
import config from './config';

const sequelize = new Sequelize(
	config.database.mysql.database,
	config.database.mysql.username,
	config.database.mysql.password, 
	{
	   host: 'mysql', // Update the host to match the service name in docker-compose
	   dialect: 'mysql',
	   port: 3306
	}
 );

export default sequelize;