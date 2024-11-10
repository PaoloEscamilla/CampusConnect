import Ruta from './ruta';
import PasoRuta from './pasoRuta';
import Ubicacion from './ubicacion';

// Definir las relaciones entre los modelos
Ruta.hasMany(PasoRuta, {
  sourceKey: 'id',
  foreignKey: 'ruta_id',
  as: 'pasosRuta',
});

PasoRuta.belongsTo(Ruta, {
  foreignKey: 'ruta_id',
  as: 'rutaRelacion',
});

// Relación entre Ruta y Ubicacion (ubicación de destino)
Ruta.belongsTo(Ubicacion, {
  foreignKey: 'destino_id',
  as: 'ubicacionDestino',
});

// Relación entre Ruta y Ubicacion (ubicación de origen)
Ruta.belongsTo(Ubicacion, {
  foreignKey: 'origen_id',
  as: 'ubicacionOrigen',
});

export { Ruta, PasoRuta, Ubicacion };
