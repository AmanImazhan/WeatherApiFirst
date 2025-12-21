import "dotenv/config";

const validateConfig = () => {
  const required = ["OPENWEATHER_API_KEY"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("CONFIGURATION ERROR:");
    missing.forEach((key) =>
      console.error(`→ ${key} is missing in .env`)
    );
    console.error("Fix the .env and restart the server.");
    process.exit(1);
  }
};

validateConfig();

export const PORT: number = Number(process.env.PORT) || 3001;
export const OPENWEATHER_API_KEY: string = process.env.OPENWEATHER_API_KEY as string;
export const WEATHER_API_URL: string =
  process.env.WEATHER_API_URL ||
  "https://api.openweathermap.org/data/2.5/weather";

console.log("Configuration loaded successfully");