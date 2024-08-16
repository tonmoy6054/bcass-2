import { Application, NextFunction, Request, Response } from 'express';
import express from 'express';

import { setupMiddleware } from './middlewares/middlewareSetup';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
const app: Application = express();

setupMiddleware(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// Not Found Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});
// Global error handling middleware
app.use(globalErrorHandler);
export default app;
