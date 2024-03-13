import { z } from 'zod';

export const SaveJobApplication = z.object({
  roleId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  experience: z.string(),
  isWorkAuthorization: z.boolean(),
});
