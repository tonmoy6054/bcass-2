import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import authRoutes from '../routes/authRoutes';
import userRoute from '../routes/userRoute';
import facultyRoute from '../routes/facilityRoute';
import bookingRoute from '../routes/bookingRoute';
import { errorMiddleware } from '../middlewares/errorMiddleware';

export const setupMiddleware = (app: Application) => {
  app.use(express.json());
  app.use(cors());

  // Route middlewares
  app.use('/api/auth', authRoutes);

  app.use('/api', userRoute);
  app.use('/api', facultyRoute);
  app.use('/api', bookingRoute);

  // Error handling middleware
  app.use(errorMiddleware);
};
