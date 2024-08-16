import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
