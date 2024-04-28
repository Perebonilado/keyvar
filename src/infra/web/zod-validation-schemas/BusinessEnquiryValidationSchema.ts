import { z } from 'zod';

export const SubmitBusinessEnquirySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  enquiry: z.string(),
  service: z.number(),
});
