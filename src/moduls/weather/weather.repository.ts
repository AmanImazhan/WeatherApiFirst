import weatherApiClient, { WeatherApiResult } from '../../api/weatherApiClient.js';

export const getWeatherByCity = async (city: string): Promise<WeatherApiResult> => {
  return weatherApiClient.getWeather(city);
};
