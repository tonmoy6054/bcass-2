import { z } from 'zod';

export const facilityValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Facility name is required'),
    description: z.string().min(1, 'Description is required'),
    pricePerHour: z.number().positive('Price per hour must be positive'),
    location: z.string().min(1, 'Location is required'),
  }),
});
