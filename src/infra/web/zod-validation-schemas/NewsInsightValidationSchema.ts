import { z } from 'zod';

export const SubscribeInsightValidationSchema = z.object({
  email: z.string().email(),
});
