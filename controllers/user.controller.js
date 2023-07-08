import { userModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
class UserController {
  async userRegistration(req, res) {
    const { type, nombre, fechadeNacimiento, genero, direccion, telefono, correo, contraseña } = req.body;
    let passwordHash = await bcrypt.hashSync(contraseña, 10);
    try {
      let query;
      
      if (type === 'patient') {
        query = await userModel.create({
          nombre,
          fechadeNacimiento,
          genero,
          direccion,
          telefono,
          correo,
          contraseña : passwordHash,
        });

      } else if (type === 'doctor') {
        // Código para registrar un doctor
      } else if (type === 'admin') {
        // Código para registrar un admin
      } else {
        return res.status(400).json({ ok: false, message: 'Tipo de registro no válido' });
      }
      
    return res.status(200).json({ ok: true, response: "Registrado correctamente" });
  } catch (error) {
    return res.status(500).json({ ok: false, response: error });
  }
}

  async readUsers(req, res) {
    try {
      const query = await userModel.findAll();
      return res.status(200).json({ ok: true, response: query });
    } catch (error) {
      return res.status(500).json({ ok: false, response: error });
    }
  }

  async updateUser(req, res) {
    const { id, nombre, email, telefono } = req.body;
    try {
      const query = await userModel.update(
        { nombre, email, telefono },
        { where: { id } }
      );
      return res.status(200).json({ ok: true, response: query });
    } catch (error) {
      return res.status(500).json({ ok: false, response: error });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.body;
    try {
      const query = await userModel.destroy({ where: { id } });
      return res.status(200).json({ ok: true, response: query });
    } catch (error) {
      return res.status(500).json({ ok: false, response: error });
    }
  }

  async login(req, res) {
    const { correo, contraseña } = req.body;
  
    try {
      const user = await userModel.findOne({ where: { correo } });
  
      if (user) {
        const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
  
        if (passwordMatch) {
          const token = jwt.sign({ id: user.id, nombre: user.nombre }, req.app.get('jwtSecret'), { expiresIn: '1h' });
          const response = { ok: true, message: 'Inicio de sesión exitoso', user, token };
          return res.status(200).json(response);
        } else {
          const response = { ok: false, message: 'Credenciales inválidas' };
          return res.status(401).json(response);
        }
      } else {
        const response = { ok: false, message: 'La contraseña es incorrecta' };
        return res.status(401).json(response);
      }
    } catch (error) {
      const response = { ok: false, message: 'Correo electronico no registrado', error };
      return res.status(500).json(response);
    }
  }

  async getUserByToken(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log( token );
    try {
      const decodedToken = jwt.verify(token, req.app.get('jwtSecret'));
      const userId = decodedToken.id;
  
      const user = await userModel.findOne({ where: { id: userId } });
  
      if (user) {
        return res.status(200).json({ ok: true, response: user.nombre });
      } else {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      }
    } catch (error) {
      return res.status(401).json({ ok: false, message: 'Token de acceso inválido' });
      
    }
  }

  async mostrarPacientes(req, res) {
    try {
      const query = await userModel.findAll();
      return res.status(200).json({ ok: true, response: query });
    } catch (error) {
      return res.status(500).json({ ok: false, response: error });
    }
  }

  async logout(req, res) {
    req.session.destroy();
    const response = { ok: true, message: 'Sesión cerrada' };
    return res.status(200).json(response);
  }
}

export const userController = new UserController();
