import { Request, Response, NextFunction } from 'express';
import { getWeatherService } from './weather.service.js';

export const getWeatherController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { city } = req.query as { city?: string };
    const weather = await getWeatherService(city ?? '');
    res.json({
      success: true,
      data: weather,
    });
  } catch (err) {
    next(err);
  }
};
