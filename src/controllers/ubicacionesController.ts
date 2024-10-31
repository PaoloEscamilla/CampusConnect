import { Request, Response } from 'express';
import { Ubicacion } from '../models/ubicacion';

// Obtener todas las ubicaciones
export const getUbicaciones = async (req: Request, res: Response) => {
  try {
    const ubicaciones = await Ubicacion.findAll();
    res.status(200).json(ubicaciones);
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    res.status(500).json({ message: 'Error al obtener ubicaciones', error });
  }
};

// Obtener solo las entradas
export const getEntradasUniversidad = async (req: Request, res: Response) => {
  try {
    const entradas = await Ubicacion.findAll({
      where: { tipo: 'entrada' }
    });
    res.status(200).json(entradas);
  } catch (error) {
    console.error('Error al obtener las entradas:', error);
    res.status(500).json({ message: 'Error al obtener las entradas', error });
  }
};

// Obtener solo los edificios
export const getEdificios = async (req: Request, res: Response) => {
  try {
    const edificios = await Ubicacion.findAll({
      where: { tipo: 'edificio' }
    });
    res.status(200).json(edificios);
  } catch (error) {
    console.error('Error al obtener los edificios:', error);
    res.status(500).json({ message: 'Error al obtener los edificios', error });
  }
};
