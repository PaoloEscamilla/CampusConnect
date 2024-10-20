import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConfig';

export class Ruta extends Model {
  public id!: number;
  public origen_id!: number;
  public destino_id!: string;
  public imagen_url!: string;
  public duracion!: number;
  public distancia!: number;
}

Ruta.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  origen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  destino_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  distancia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'rutas',
  timestamps: false,
});
