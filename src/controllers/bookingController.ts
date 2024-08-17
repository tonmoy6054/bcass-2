import {
  cancelBooking,
  getAllBookings,
  getUserBookings,
  checkAvailability,
  createBooking,
} from '../services/bookingService';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { Booking } from '../models/bookingModel';

// Controller to check availability of time slots
export const checkAvailabilityController = catchAsync(
  async (req: Request, res: Response) => {
    const { date } = req.query as { date: string };
    const availableTimeSlots = await checkAvailability(date);

    if (availableTimeSlots.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Availability checked successfully',
      data: availableTimeSlots,
    });
  },
);

export const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const { facility, date, startTime, endTime } = req.body;
    const user = req.user?._id;

    if (!user) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'User not authenticated',
      });
    }

    const booking = await createBooking({
      facility,
      date,
      startTime,
      endTime,
      user: user as string,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking created successfully',
      data: booking,
    });
  },
);

// Controller to view all bookings (Admin Only)
export const getAllBookingsController = catchAsync(
  async (req: Request, res: Response) => {
    const bookings = await Booking.find()
      .populate('facility', 'name description pricePerHour location isDeleted')
      .populate('user', 'name email phone role address')
      .lean()
      .exec();

    console.log('Bookings with populated facility:', bookings);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  },
);

// Controller to view bookings by user (User Only)
export const getUserBookingsController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'User not authenticated',
      });
    }

    const bookings = await getUserBookings(userId);

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  },
);

// Controller to cancel a booking (User Only)
export const cancelBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const userId = (req.user as { _id: string })._id;

    const booking = await cancelBooking(bookingId, userId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking canceled successfully',
      data: booking,
    });
  },
);
