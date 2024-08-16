// import mongoose, { Document, Schema } from 'mongoose';

// interface Booking extends Document {
//   facility: mongoose.Types.ObjectId;
//   date: string;
//   startTime: string;
//   endTime: string;
//   user: mongoose.Types.ObjectId;
//   payableAmount: number;
//   isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
// }

// const bookingSchema = new Schema<Booking>({
//   facility: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Facility',
//     required: true,
//   },
//   date: { type: String, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   payableAmount: { type: Number, required: true },
//   isBooked: {
//     type: String,
//     enum: ['confirmed', 'unconfirmed', 'canceled'],
//     default: 'confirmed',
//   },
// });

// export const Booking = mongoose.model<Booking>('Booking', bookingSchema);

import mongoose, { Document, Schema } from 'mongoose';

interface Booking extends Document {
  facility: mongoose.Types.ObjectId; // Ensure this matches your Facility model's ID type
  date: string;
  startTime: string;
  endTime: string;
  user: mongoose.Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}

const bookingSchema = new Schema<Booking>({
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payableAmount: { type: Number, required: true },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'confirmed',
  },
});

export const Booking = mongoose.model<Booking>('Booking', bookingSchema);
