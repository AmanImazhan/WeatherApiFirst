import { query, validationResult } from 'express-validator';
import { badRequest } from '../../../api/ApiError.js';

export const validateWeatherRequest = [
    query('city')
    .trim()
    .isString().withMessage('The name of the city should be a string')
    .isLength({ min: 2}).withMessage('The name of the city is too short'),
];
    export const validateCity = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw badRequest(errors.array()[0].msg)
                }
        next();
    };
