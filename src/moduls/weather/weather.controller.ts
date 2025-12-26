import type { NextFunction, Request, Response } from "express";
import { getWeatherService } from "./weather.service.js";

type WeatherQuery = { city?: string };

export const getWeatherController = async (
  req: Request<{}, any, any, WeatherQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { city } = req.query;
    const weather = await getWeatherService(city as string);

    res.json({
      success: true,
      data: weather,
    });
  } catch (err) {
    next(err);
  }
};