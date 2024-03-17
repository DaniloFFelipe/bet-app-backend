import { z } from 'zod';

export const UpdateScoresDtoSchema = z.object({
  betId: z.string(),
  winnerId: z.string(),
});

export type UpdateScoresDto = z.infer<typeof UpdateScoresDtoSchema>;
