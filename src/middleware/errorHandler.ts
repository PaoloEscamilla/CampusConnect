import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
};
