import { z } from 'zod';

export const JoinGroupDtoSchema = z.object({
  code: z.string().length(6),
});
export type JoinGroupDto = z.infer<typeof JoinGroupDtoSchema>;
