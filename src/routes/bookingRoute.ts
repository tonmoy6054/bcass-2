import { Router } from 'express';
import {
  cancelBookingController,
  checkAvailabilityController,
  createBookingController,
} from '../controllers/bookingController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  getAllBookingsController,
  getUserBookingsController,
} from '../controllers/bookingController';
// import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = Router();

// Route to check availability of time slots
router.get('/check-availability', checkAvailabilityController);

// Route to create a new booking
router.post('/bookings', authMiddleware, createBookingController);

// Route to view all bookings (Admin Only)
// router.get(
//   '/bookings',
//   authMiddleware,
//   adminMiddleware,
//   getAllBookingsController,
// );
router.get(
  '/bookings',
  authMiddleware,

  getAllBookingsController,
);

// Route to view bookings by user (User Only)
router.get('/bookings/user', authMiddleware, getUserBookingsController);

router.delete('/bookings/:id', authMiddleware, cancelBookingController);

export default router;
