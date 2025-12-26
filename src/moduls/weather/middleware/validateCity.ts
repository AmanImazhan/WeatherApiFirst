import type { NextFunction, Request, Response } from "express";
import { query, validationResult, type ValidationChain } from "express-validator";
import { badRequest } from "../../../api/ApiError.js";

export const validateWeatherRequest: ValidationChain[] = [
  query("city")
    .trim()
    .isString()
    .withMessage("The name of the city should be a string")
    .isLength({ min: 2 })
    .withMessage("The name of the city is too short"),
];

export const validateCity = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw badRequest(errors.array()[0]?.msg as string);
  }
  next();
};