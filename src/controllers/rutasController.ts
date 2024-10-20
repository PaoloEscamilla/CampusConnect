import { Request, Response } from 'express';
import { Ruta } from '../models/ruta';
import { PasoRuta } from '../models/pasoRuta'; // Importamos modelo de pasos

// Obtener todas las rutas
export const getRutas = async (req: Request, res: Response) => {
  try {
    const rutas = await Ruta.findAll();
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutas', error });
  }
};

// Obtener una ruta por ID
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
    res.status(500).json({ message: 'Error al obtener ruta', error });
  }
};

// Obtener rutas filtradas por destino
export const getRutasPorDestino = async (req: Request, res: Response) => {
  const { destino_id } = req.params;
  try {
    const rutas = await Ruta.findAll({
      where: { destino_id }
    });
    if (rutas.length > 0) {
      res.status(200).json(rutas);
    } else {
      res.status(404).json({ message: 'No se encontraron rutas para el destino seleccionado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutas', error });
  }
};

// Obtener una ruta con sus pasos
export const getRutaConPasos = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ruta = await Ruta.findByPk(id);
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }

    const pasos = await PasoRuta.findAll({
      where: { ruta_id: id },
      order: [['secuencia', 'ASC']]
    });

    res.status(200).json({ ruta, pasos });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ruta y sus pasos', error });
  }
};
