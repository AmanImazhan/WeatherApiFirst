import axios, { AxiosError } from 'axios';
import { OPENWEATHER_API_KEY, WEATHER_API_URL } from '../config/config.js';
import { notFound, unauthorized, serverError } from './ApiError.js';

interface WeatherApiResponse {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export interface WeatherApiResult {
  city: string;
  temp: number;
  description: string;
  icon: string;
}

const getWeather = async (city: string): Promise<WeatherApiResult> => {
  try {
    const response = await axios.get<WeatherApiResponse>(WEATHER_API_URL, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    });

    return {
      city: response.data.name,
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response?.status === 404) {
      throw notFound(`The city "${city}" was not found`);
    }
    if (axiosError.response?.status === 401) {
      throw unauthorized('Invalid OpenWeatherMap API key');
    }
    if (axiosError.response?.status === 429) {
      throw serverError('Request limit exceeded');
    }
    if (!axiosError.response) {
      throw serverError('There is no connection to the weather server. Check the Internet.');
    }

    const message = axiosError.response?.data?.message || 'External API error';
    throw serverError(message);
  }
};

export default { getWeather };
