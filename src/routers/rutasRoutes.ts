import { Router } from 'express';
import { getRutas, getRutaById, getRutasPorDestino, getRutaConPasos, getRutasPorOrigenYDestino } from '../controllers/rutasController';

const router = Router();

// Ruta para obtener todas las rutas
router.get('/', getRutas);

// Ruta para obtener una ruta específica por ID
router.get('/:id', getRutaById);

// Ruta para obtener rutas por destino
router.get('/destino/:destino_id', getRutasPorDestino);

// Ruta para obtener una ruta con sus pasos
router.get('/conPasos/:id', getRutaConPasos);

// Ruta para obtener rutas por origen y destino
router.get('/filtrar', getRutasPorOrigenYDestino);

export default router;
