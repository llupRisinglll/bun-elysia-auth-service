import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'auth-service.sqlite', // Path to your SQLite database file
});

export default sequelize;