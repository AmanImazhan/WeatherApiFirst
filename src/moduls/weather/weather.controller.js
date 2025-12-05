import { getWeatherService } from './weather.service.js';

export const getWeatherController = async (req, res, next) => {
    try {
        const { city } = req.query;
        const weather = await getWeatherService(city);
        res.json({
            success: true,
            data: weather
        });
    } catch (err) {
        next(err);
    }
};