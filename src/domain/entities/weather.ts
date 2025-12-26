export type WeatherProps = {
  city: string;
  temperature: number;
  description: string;
};

export function Weather(
  this: any,
  { city, temperature, description }: WeatherProps
) {
  this.city = city;
  this.temperature = temperature;
  this.description = description;
}