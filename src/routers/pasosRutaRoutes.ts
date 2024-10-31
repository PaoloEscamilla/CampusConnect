// routers/pasosRutaRoutes.ts
import { Router } from 'express';
import { getPasosPorRuta } from '../controllers/pasosRutaController';

const router = Router();

router.get('/:rutaId/pasos', getPasosPorRuta);

export default router;
