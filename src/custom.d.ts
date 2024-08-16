import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      _id: string;
      role: string;
      email: string;
      iat?: number;
      exp?: number;
      [key: string]: any;
    };
  }
}
