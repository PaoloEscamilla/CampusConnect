import { Request, Response } from 'express';
import Ruta from '../models/ruta';
import PasoRuta from '../models/pasoRuta';
import Ubicacion from '../models/ubicacion';
import sequelize from '../../config/dbConfig';

// Obtener todas las rutas
export const getRutas = async (req: Request, res: Response) => {
  try {
    const rutas = await Ruta.findAll();
    console.log('Rutas obtenidas:', rutas);
    res.status(200).json(rutas);
  } catch (error) {
    console.error('Error al obtener rutas:', error);
    res.status(500).json({ message: 'Error al obtener rutas', error });
  }
};

// Obtener una ruta específica por ID
export const getRutaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ruta = await Ruta.findByPk(id);
    if (ruta) {
      console.log(`Ruta encontrada con ID ${id}:`, ruta);
      res.status(200).json(ruta);
    } else {
      console.log(`Ruta con ID ${id} no encontrada`);
      res.status(404).json({ message: 'Ruta no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la ruta:', error);
    res.status(500).json({ message: 'Error al obtener la ruta', error });
  }
};

// Obtener rutas filtradas por origen y destino
export const getRutasPorOrigenYDestino = async (req: Request, res: Response) => {
  const { origen_id, destino_id } = req.query;

  if (!origen_id || !destino_id) {
    console.log('Solicitud sin origen_id o destino_id');
    res.status(400).json({ message: 'Por favor proporciona origen_id y destino_id.' });
    return;
  }

  const origenInt = parseInt(origen_id as string, 10);
  const destinoInt = parseInt(destino_id as string, 10);

  try {
    const rutas = await Ruta.findAll({
      where: {
        origen_id: origenInt,
        destino_id: destinoInt,
      },
      include: [
        {
          model: Ubicacion,
          as: 'ubicacionDestino',
          attributes: ['nombre', 'descripcion'],
        },
        {
          model: Ubicacion,
          as: 'ubicacionOrigen',
          attributes: ['nombre', 'descripcion'],
        },
      ],
    });

    if (rutas && rutas.length > 0) {
      console.log(`Rutas encontradas entre ${origen_id} y ${destino_id}:`, rutas);
      res.status(200).json(rutas);
    } else {
      console.log(`No se encontraron rutas entre ${origen_id} y ${destino_id}`);
      res.status(404).json({ message: 'No se encontraron rutas.' });
    }
  } catch (error) {
    console.error('Error al obtener rutas:', error);
    res.status(500).json({ message: 'Error al obtener rutas.', error });
  }
};

// Obtener una ruta con sus pasos
export const getRutaConPasos = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const rutaConPasos = await Ruta.findOne({
      where: { id },
      include: [
        {
          model: PasoRuta,
          as: 'pasosRuta',
          attributes: ['secuencia', 'instruccion', 'imagen_url'],
          separate: true,
          order: [['secuencia', 'ASC']],
        },
        {
          model: Ubicacion,
          as: 'ubicacionDestino',
          attributes: ['nombre', 'descripcion'],
        },
        {
          model: Ubicacion,
          as: 'ubicacionOrigen',
          attributes: ['nombre', 'descripcion'],
        },
      ],
    });

    console.log('Datos de la ruta con pasos y destino:', JSON.stringify(rutaConPasos, null, 2));

    if (rutaConPasos) {
      res.status(200).json(rutaConPasos);
    } else {
      res.status(404).json({ message: 'Ruta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener los pasos de la ruta:', error);
    res.status(500).json({ message: 'Error al obtener los pasos de la ruta.', error });
  }
};
