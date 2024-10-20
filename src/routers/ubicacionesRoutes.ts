import { Router } from 'express';
import { getUbicaciones } from '../controllers/ubicacionesController';

const router = Router();

// Ruta para obtener todas las ubicaciones
router.get('/', getUbicaciones);

export default router;
