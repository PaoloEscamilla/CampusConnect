import { Router } from 'express';
import { getPasosPorRuta } from '../controllers/pasosRutaController';

const router = Router();

// Ruta para obtener los pasos de una ruta específica
router.get('/:ruta_id', getPasosPorRuta);

export default router;
