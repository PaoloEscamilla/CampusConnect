import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/dbConfig';

export class PasoRuta extends Model {
  public id!: number;
  public ruta_id!: number;
  public secuencia!: number;
  public instruccion!: string;
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
}, {
  sequelize,
  modelName: 'PasoRuta',
  tableName: 'pasos_ruta',
  timestamps: false,
});

export default PasoRuta;
