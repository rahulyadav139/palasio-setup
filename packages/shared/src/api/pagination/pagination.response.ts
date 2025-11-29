import { z } from 'zod';

export const paginationResponseSchema = z.object({
  total: z.coerce.number(),
  totalPages: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type PaginationResponse = z.infer<typeof paginationResponseSchema>;
