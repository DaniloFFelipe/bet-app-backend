import { z } from 'zod';

export const CreateGroupDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
});
export type CreateGroupDto = z.infer<typeof CreateGroupDtoSchema>;
