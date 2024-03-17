import { z } from 'zod';

export const MakeBetDtoSchema = z.object({
  betId: z.string(),
  participantChooseId: z.string(),
});

export type MakeBetDto = z.infer<typeof MakeBetDtoSchema>;
