import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

export const PaginationRequestSchema = z.object({
  pageIndex: z.coerce.number().default(0),
  perPage: z.coerce.number().default(15),
});
export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;
export type WithPaginationRequest<D> = z.infer<typeof PaginationRequestSchema> &
  D;

export type PaginationMetadata = {
  pageIndex: number;
  perPage: number;
  nextPageIndex: number | null;
  total: number;
};

export type PaginationResponse<Data> = {
  meta: PaginationMetadata;
  data: Data[];
};

export function validatePagination(data: unknown): PaginationRequest {
  const result = PaginationRequestSchema.safeParse(data);
  if (result.success === false) {
    throw new BadRequestException(result.error);
  }

  return result.data;
}
