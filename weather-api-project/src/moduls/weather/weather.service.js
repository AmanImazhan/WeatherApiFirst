import weatherApiClient from '../../api/weatherApiClient.js';
import { Weather } from '../../domain/entities /weather.js';

export const getWeatherService = async (city) => {
    const data = await weatherApiClient.getWeather(city);

    return new Weather({
        city: data.city,
        temperature: data.temp,
        description: data.description
    });
};