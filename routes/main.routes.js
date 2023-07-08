import { userController } from '../controllers/user.controller.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwt.config.js';

export class mainRoutes {
  routes(app) {
    app.get('/hello-world', (req, res) => {
      res.send('Hello World!');
    });

    app.post('/createUser', userController.createUser);
    app.get('/readUsers', userController.readUsers);
    app.post('/updateUser', userController.updateUser);
    app.post('/deleteUser', userController.deleteUser);
    app.post('/login', userController.login);

    function verifyToken(req, res, next) {
      const token = req.headers.authorization?.split(' ')[1];
      console.log(token);
    
      jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ ok: false, message: 'Token de acceso inválido', error });
        }
    
        req.user = decoded;
        next();
      });
    }    

    app.get('/getUserByToken', verifyToken, userController.getUserByToken);
    app.get('/mostrarPacientes', verifyToken, userController.mostrarPacientes);
    app.get('/logout', userController.logout);
  }
}