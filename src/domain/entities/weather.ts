export interface WeatherProps {
  city: string;
  temperature: number;
  description: string;
}

export class Weather {
  public city: string;
  public temperature: number;
  public description: string;

  constructor({ city, temperature, description }: WeatherProps) {
    this.city = city;
    this.temperature = temperature;
    this.description = description;
  }
}
