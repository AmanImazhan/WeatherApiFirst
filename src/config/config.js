import 'dotenv/config';


const validateConfig = () => {
const required = ['OPENWEATHER_API_KEY'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
    console.error('CONFIGURATION ERROR:');
    missing.forEach(k => console.error(` → ${key} is missing in .env`));
    console.error('Fix the .env and restart the server.');
    process.exit(1);
    }
};
validateConfig();

export const PORT =  Number(process.env.PORT) || 3000;
export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
export const WEATHER_API_URL = process.env.WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5/weather'


console.log('Configuration loaded successfully');