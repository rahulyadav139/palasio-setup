import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});

export type Pagination = z.infer<typeof paginationSchema>;
