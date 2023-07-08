import { Sequelize } from 'sequelize';

export const database = new Sequelize({
  host: 'containers-us-west-84.railway.app',
  database: 'railway',
  username: 'root',
  password: 'mCmZRaU5WMSJ9vTwUoIi',
  dialect: 'mysql',
  port: 7537,
  logging: false
});

export class Database {
  async connection() {
    try {
      await database.authenticate();
      return { ok: true, message: 'Connection has been established successfully.' };
    } catch (error) {
      return { ok: false, message: 'Unable to connect to the database:', error };
    }
  }
}
