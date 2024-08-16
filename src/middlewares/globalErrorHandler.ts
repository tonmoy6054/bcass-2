import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface CustomError extends Error {
  statusCode?: number;
  errorMessages?: { path: string; message: string }[];
}

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const zodErrorResponse = {
      statusCode: 400,
      message: 'Validation Error',
      errorMessages: err.errors.map((error) => ({
        path: error.path.join('.'),
        message: error.message,
      })),
    };

    return res.status(zodErrorResponse.statusCode).json({
      success: false,
      message: zodErrorResponse.message,
      errorMessages: zodErrorResponse.errorMessages,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }

  // Default error handling
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errorMessages: err.errorMessages || [{ path: '', message: err.message }],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
