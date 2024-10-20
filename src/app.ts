import express from 'express';
import path from 'path';
import rutasRoutes from './routers/rutasRoutes';
import ubicacionesRoutes from './routers/ubicacionesRoutes';
import pasosRutaRoutes from './routers/pasosRutaRoutes';  // Asegúrate de incluir esto

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/rutas', rutasRoutes);
app.use('/ubicaciones', ubicacionesRoutes);
app.use('/pasos', pasosRutaRoutes);  // Asegúrate de incluir la ruta de pasos

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/instrucciones.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/instrucciones.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
