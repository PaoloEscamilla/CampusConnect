import { Sequelize } from 'sequelize';

// Crear una instancia de Sequelize con los parámetros de conexión
const sequelize = new Sequelize('campusconnect', 'paoloescamilla', 'password', {
  host: 'localhost',
  dialect: 'postgres',  // Cambia 'postgres' por 'mysql' si estás usando MySQL
  port: 5432,  // Cambia este puerto si es necesario (por defecto PostgreSQL usa el 5432 y MySQL el 3306)
  logging: console.log,  // Desactiva el logging en consola (puedes habilitarlo si necesitas depurar)
});

export default sequelize;
// Prueba de conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida exitosamente con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });
