import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

export class Ruta extends Model {
  public id!: number;
  public origen_id!: number;
  public destino_id!: number;
  public imagen_url!: string;
  public duracion!: number;
  public distancia!: number;
}

Ruta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    origen_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    destino_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    distancia: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'rutas',
    timestamps: false // Desactiva createdAt y updatedAt
  }
);
