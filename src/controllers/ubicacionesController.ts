import { Request, Response } from 'express';
import { Ubicacion } from '../models/ubicacion';

export const getUbicaciones = async (req: Request, res: Response) => {
  try {
    const ubicaciones = await Ubicacion.findAll();
    res.status(200).json(ubicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ubicaciones', error });
  }
};

export const getUbicacionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ubicacion = await Ubicacion.findByPk(id);
    if (ubicacion) {
      res.status(200).json(ubicacion);
    } else {
      res.status(404).json({ message: 'Ubicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ubicación', error });
  }
};
