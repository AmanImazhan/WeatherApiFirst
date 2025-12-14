import { getWeatherByCity } from './weather.repository.js';
import { Weather } from '../../domain/entities/weather.js';

export const getWeatherService = async (city: string): Promise<Weather> => {
  const data = await getWeatherByCity(city);

  return new Weather({
    city: data.city,
    temperature: data.temp,
    description: data.description,
  });
};
