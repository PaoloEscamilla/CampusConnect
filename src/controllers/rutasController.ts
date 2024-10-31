import { Request, Response } from 'express';
import { Ruta } from '../models/ruta';

// Obtener todas las rutas
export const getRutas = async (req: Request, res: Response) => {
  try {
    const rutas = await Ruta.findAll();
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutas', error });
  }
};

// Obtener una ruta específica por ID
export const getRutaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ruta = await Ruta.findByPk(id);
    if (ruta) {
      res.status(200).json(ruta);
    } else {
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ruta', error });
  }
};

// Obtener rutas por destino
export const getRutasPorDestino = async (req: Request, res: Response) => {
  const { destino_id } = req.params;
  try {
    const rutas = await Ruta.findAll({ where: { destino_id } });
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutas por destino', error });
  }
};

// Obtener ruta con pasos
export const getRutaConPasos = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ruta = await Ruta.findByPk(id, { include: ['pasos'] });
    if (ruta) {
      res.status(200).json(ruta);
    } else {
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ruta con pasos', error });
  }
};

// Obtener rutas por origen y destino
export const getRutasPorOrigenYDestino = async (req: Request, res: Response) => {
  const { origen_id, destino_id } = req.query;

  if (!origen_id || !destino_id) {
    return res.status(400).json({ message: 'Se requieren origen_id y destino_id' });
  }

  try {
    const rutas = await Ruta.findAll({ where: { origen_id, destino_id } });
    if (rutas.length > 0) {
      res.status(200).json(rutas);
    } else {
      res.status(404).json({ message: 'No se encontraron rutas.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutas por origen y destino', error });
  }
};
