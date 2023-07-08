import { Model, DataTypes } from 'sequelize';
import { database } from '../config/database.conf.js';

export class userModel extends Model {}

userModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fechadeNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    contraseña: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: database,
    tableName: 'pacientes',
    timestamps: false
  }
);