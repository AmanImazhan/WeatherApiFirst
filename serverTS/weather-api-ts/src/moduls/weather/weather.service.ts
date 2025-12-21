import weatherApiClient from "../../api/weatherApiClient.js";
import { Weather } from "../../domain/entities/weather.js";

export const getWeatherService = async (city: string) => {
  const data = await weatherApiClient.getWeather(city);

  return new (Weather as any)({
    city: data.city,
    temperature: data.temp,
    description: data.description,
  });
};