import axios, { AxiosError } from "axios";
import { OPENWEATHER_API_KEY, WEATHER_API_URL } from "../config/config.js";
import { notFound, unauthorized, serverError } from "./ApiError.js";

type OpenWeatherResponse = {
  name: string;
  main: { temp: number };
  weather: Array<{ description: string; icon: string }>;
};

export type WeatherApiData = {
  city: string;
  temp: number;
  description: string;
  icon: string;
};

const getWeather = async (city: string): Promise<WeatherApiData> => {
  try {
    const response = await axios.get<OpenWeatherResponse>(WEATHER_API_URL, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: "metric",
        lang: "ru",
      },
    });

    return {
      city: response.data.name,
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0]?.description ?? "",
      icon: response.data.weather[0]?.icon ?? "",
    };
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 404) {
      throw notFound(`The city "${city}" was not found`);
    }
    if (err.response?.status === 401) {
      throw unauthorized("Invalid OpenWeatherMap API key");
    }
    if (err.response?.status === 429) {
      throw serverError("Request limit exceeded");
    }
    if (!err.response) {
      throw serverError(
        "There is no connection to the weather server. Check the Internet."
      );
    }

    const message =
      (err.response?.data as any)?.message ?? "External API error";
    throw serverError(message);
  }
};

// чтобы твой `weather.repository.js` мог работать “как на скрине”
export const fetchWeatherFromApi = getWeather;

export default { getWeather };