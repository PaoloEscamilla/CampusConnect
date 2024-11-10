import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig';

export class Ruta extends Model {
  public id!: number;
  //public nombre!: string;  // Comentado ya que no existe en la tabla
  public origen_id!: number;
  public destino_id!: number;
}

Ruta.init(
  {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // nombre: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },  // Comentado ya que no existe en la tabla
  },
  {
    sequelize,
    modelName: 'Ruta',
    tableName: 'rutas',
    timestamps: false,
  }
);

export default Ruta;
