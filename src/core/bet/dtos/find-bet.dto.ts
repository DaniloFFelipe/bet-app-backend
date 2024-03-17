import { z } from 'zod';

export const FindBetDtoSchema = z.object({
  betId: z.string(),
});

export type FindBetDto = z.infer<typeof FindBetDtoSchema>;
