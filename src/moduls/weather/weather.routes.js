import express from 'express';
import { getWeatherController } from './weather.controller.js';
import { validateWeatherRequest, validateCity } from './middleware/validateCity.js';

const router = express.Router();

router.get(
  '/weather',
  validateWeatherRequest,   
  validateCity,          
  getWeatherController
);
export default router;