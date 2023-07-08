import { Sequelize } from 'sequelize';

export const database = new Sequelize({
  host: '127.0.0.1',
  database: 'prueba',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
  port: 3306,
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
