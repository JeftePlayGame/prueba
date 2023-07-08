import express from 'express';
import { mainRoutes } from '../routes/main.routes.js';
import { Database } from './database.conf.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from './jwt.config.js';

class App {
  app = null;
  mainRoutes = new mainRoutes();
  db = new Database();

  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    this.app = express();
    this.config();
    this.mainRoutes.routes(this.app);
    await this.dbConnection();
  }

  config() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'https://andormedproyect.web.app');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Max-Age', '86400');
      next();
    });

    this.app.set('jwtSecret', jwtSecret);

    this.app.use((req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (token) {
        jwt.verify(token, this.app.get('jwtSecret'), (error, decoded) => {
          if (error) {
            return res.status(401).json({ ok: false, message: 'Token de acceso inválido' });
          }

          req.user = decoded;
          next();
        });
      } else {
        next();
      }
    });
  }

  async dbConnection() {
    const connection = await this.db.connection();
    console.log(connection);
  }
}

export default new App();
