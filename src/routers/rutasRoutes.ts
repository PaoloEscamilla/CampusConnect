import { Router } from 'express';
import { getRutas, getRutasPorDestino, getRutaConPasos } from '../controllers/rutasController';

const router = Router();

router.get('/', getRutas);
router.get('/destino/:destino_id', getRutasPorDestino);
router.get('/:id', getRutaConPasos); // Para obtener una ruta con sus pasos

export default router;
