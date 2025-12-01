import axios from 'axios';
import { OPENWEATHER_API_KEY, WEATHER_API_URL } from '../config/config.js';
import { notFound,unauthorized,serverError } from './ApiError.js';

const getWeather = async (city) => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'ru'
      }
    });

    return {
      city: response.data.name,
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw notFound(`The city "${city}" was not found`);
    }
    if (error.response?.status === 401) {
      throw unauthorized(`Invalid OpenWeatherMap API key`);
    }
    if (error.response?.status === 429) {
      throw serverError('Request limit exceeded');
    }
    if (!error.response) {
      throw serverError(`There is no connection to the weather server. Check the Internet.`);
    }
    const message = error.response?.data?.message || 'External API error';
    throw serverError(message);  
  }
};

export default { getWeather };