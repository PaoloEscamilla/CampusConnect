import express from 'express';
import path from 'path';
import rutasRoutes from './routers/rutasRoutes';
import ubicacionesRoutes from './routers/ubicacionesRoutes';
import pasosRutaRoutes from './routers/pasosRutaRoutes';
import './models/index';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/rutas', rutasRoutes);
app.use('/ubicaciones', ubicacionesRoutes);
app.use('/pasos', pasosRutaRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/instrucciones.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/instrucciones.html'));
});

export default app;
