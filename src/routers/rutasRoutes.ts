import { Router } from 'express';
import { getRutas, getRutaById, getRutasPorOrigenYDestino, getRutaConPasos } from '../controllers/rutasController';

const router = Router();

router.get('/filtrar', getRutasPorOrigenYDestino); // Endpoint específico para filtrar
router.get('/conPasos/:id', getRutaConPasos);       // Endpoint específico para rutas con pasos
router.get('/:id', getRutaById);                    // Endpoint para obtener ruta por ID
router.get('/', getRutas);                          // Endpoint para obtener todas las rutas

export default router;
