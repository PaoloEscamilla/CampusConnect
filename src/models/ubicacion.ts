import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

export class Ubicacion extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public codigo!: string;
  public tipo!: string; // Añadir el campo 'tipo'
}

Ubicacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false // Este campo es requerido
    }
  },
  {
    sequelize,
    tableName: 'ubicaciones',
    timestamps: false // Desactiva createdAt y updatedAt
  }
);
