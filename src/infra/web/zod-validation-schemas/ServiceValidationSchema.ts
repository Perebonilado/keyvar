import { z } from 'zod';

export const CreateServiceValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  targetAudience: z.string(),
  price: z.number(),
  isActive: z.boolean(),
  category: z.string(),
});
