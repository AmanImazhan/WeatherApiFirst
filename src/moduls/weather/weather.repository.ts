import { fetchWeatherFromApi } from "../../api/weatherApiClient.js";

export async function getWeatherByCity(city: string) {
  return await fetchWeatherFromApi(city);
}