import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConfig';

export class PasoRuta extends Model {
  public id!: number;
  public ruta_id!: number;
  public secuencia!: number;
  public instruccion!: string;
  public imagen_url?: string;
}

PasoRuta.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ruta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  secuencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instruccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING, // URL de la imagen de referencia
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'PasoRuta',
  tableName: 'pasos_ruta',
  timestamps: false,
});

export default PasoRuta;
