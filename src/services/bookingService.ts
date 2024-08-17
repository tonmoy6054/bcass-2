import { Facility } from '../models/facilityModel';
import { Booking } from '../models/bookingModel';
import { Request, Response } from 'express';

// Check availability of time slots for a specific date
export const checkAvailability = async (date?: string) => {
  const bookingDate = date || new Date().toISOString().split('T')[0];
  const bookings = await Booking.find({
    date: bookingDate,
    isBooked: 'confirmed',
  });

  // Define total available slots for the day (e.g., 08:00 - 20:00)
  const availableSlots = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' },
    { startTime: '18:00', endTime: '20:00' },
  ];

  // Filter out booked slots
  const availableTimeSlots = availableSlots.filter((slot) => {
    return !bookings.some((booking) => {
      const bookedStartTime = booking.startTime;
      const bookedEndTime = booking.endTime;
      const slotStartTime = slot.startTime;
      const slotEndTime = slot.endTime;

      return slotStartTime < bookedEndTime && slotEndTime > bookedStartTime;
    });
  });

  return availableTimeSlots;
};

interface CreateBookingInput {
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  user: string;
}

export const createBooking = async ({
  facility,
  date,
  startTime,
  endTime,
  user,
}: CreateBookingInput) => {
  try {
    const existingBooking = await Booking.findOne({
      facility,
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
      isBooked: 'confirmed',
    });

    if (existingBooking) {
      throw new Error(
        'The facility is unavailable during the requested time slot.',
      );
    }

    const facilityDetails = await Facility.findById(facility);
    if (!facilityDetails) {
      throw new Error('Facility not found.');
    }
    const pricePerHour = facilityDetails.pricePerHour;

    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(`${date}T${endTime}:00`);

    const durationInHours =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const payableAmount = durationInHours * pricePerHour;

    const newBooking = new Booking({
      facility,
      date,
      startTime,
      endTime,
      user,
      payableAmount,
      isBooked: 'confirmed',
    });

    return await newBooking.save();
  } catch (error) {
    throw error;
  }
};

// Get all bookings (Admin Only)

export const getAllBookings = async (req: Request, res: Response) => {
  console.log('Fetching all bookings');

  try {
    const bookings = await Booking.find()
      .populate('facility', 'name description pricePerHour location isDeleted')
      .populate('user', 'name email phone role address')
      .exec();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Get bookings by user (User Only)
export const getUserBookings = async (userId: string) => {
  return await Booking.find({ user: userId }).populate(
    'facility',
    'name description pricePerHour location isDeleted',
  );
};

export const cancelBooking = async (bookingId: string, userId: string) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });

  if (!booking) {
    throw new Error(
      'Booking not found or you do not have permission to cancel this booking',
    );
  }

  // Update the booking's status to 'canceled'
  booking.isBooked = 'canceled';
  await booking.save();

  return booking;
};
