// controllers/pasosRutaController.ts
import { Request, Response } from 'express';
import { PasoRuta } from '../models/pasoRuta';

// Obtener los pasos de una ruta específica
export const getPasosPorRuta = async (req: Request, res: Response) => {
  try {
    const { rutaId } = req.params;
    const pasos = await PasoRuta.findAll({
      where: { ruta_id: rutaId },
      order: [['secuencia', 'ASC']],
    });
    res.status(200).json(pasos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pasos de la ruta' });
  }
};
