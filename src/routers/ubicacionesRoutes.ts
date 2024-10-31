import { Router } from 'express';
import { getUbicaciones, getEntradasUniversidad, getEdificios } from '../controllers/ubicacionesController';

const router = Router();

// Ruta para obtener todas las ubicaciones
router.get('/', getUbicaciones);

// Nueva ruta para obtener las entradas específicas
router.get('/entradas', getEntradasUniversidad);

// Nueva ruta para obtener solo los edificios
router.get('/edificios', getEdificios);

export default router;
