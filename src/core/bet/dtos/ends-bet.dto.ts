import { z } from 'zod';

export const EndsBetDtoSchema = z.object({
  betId: z.string(),
  winnerId: z.string(),
});

export type EndsBetDto = z.infer<typeof EndsBetDtoSchema>;
