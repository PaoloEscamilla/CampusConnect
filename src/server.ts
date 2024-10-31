import express from 'express';
import path from 'path';
import rutasRoutes from './routers/rutasRoutes';
import ubicacionesRoutes from './routers/ubicacionesRoutes';
import pasosRutaRoutes from './routers/pasosRutaRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para parsear JSON
app.use(express.json());

// Rutas para la API
app.use('/rutas', rutasRoutes);
app.use('/ubicaciones', ubicacionesRoutes);
app.use('/pasos', pasosRutaRoutes);

// Ruta principal para el archivo HTML (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
