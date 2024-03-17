import { z } from 'zod';

export const GetPresignedUrlDtoSchema = z.object({
  fileName: z.string(),
});

export type GetPresignedUrlDto = z.infer<typeof GetPresignedUrlDtoSchema>;
