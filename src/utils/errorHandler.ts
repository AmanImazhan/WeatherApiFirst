import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';
import { ApiError } from '../api/ApiError.js';

type ValidationResult = ValidationError[] & { array?: () => ValidationError[] };

type AppError = ApiError | (Error & { status?: number; isApiError?: boolean });

const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err.message || err);

  if (err instanceof ApiError && err.status) {
    res.status(err.status).json({
      error: { message: err.message },
    });
    return;
  }

  const validationError = err as ValidationResult;
  if (validationError.array || err.name === 'ValidationError') {
    res.status(400).json({
      error: {
        message: err.message || 'Incorrect data',
        details: validationError.array?.() || undefined,
      },
    });
    return;
  }

  const message = err.message || 'Unknown server error';
  res.status(err.status || 500).json({
    error: {
      message,
    },
  });
};

export default errorHandler;
