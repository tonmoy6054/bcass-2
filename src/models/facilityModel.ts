import { Schema, model, Document } from 'mongoose';

interface IFacility extends Document {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
}

const facilitySchema = new Schema<IFacility>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Facility = model<IFacility>('Facility', facilitySchema);
