import { Request, Response } from 'express';
import { PasoRuta } from '../models/pasoRuta'; // Asegúrate de que la importación esté bien

export const getPasosPorRuta = async (req: Request, res: Response) => {
  const { ruta_id } = req.params as { ruta_id: string }; // Asegura que req.params tenga el tipo adecuado
  try {
    const pasos = await PasoRuta.findAll({
      where: { ruta_id },
      order: [['secuencia', 'ASC']],
    });

    console.log('Pasos obtenidos:', pasos); // <-- Añade esto para verificar qué devuelve

    if (pasos.length > 0) {
      res.status(200).json(pasos);
    } else {
      res.status(404).json({ message: 'No se encontraron pasos para esta ruta.' });
    }
  } catch (error) {
    console.error('Error al obtener los pasos:', error);
    res.status(500).json({ message: 'Error al obtener los pasos.', error });
  }
};
