import { z } from 'zod';

export const ListBetDtoSchema = z.object({
  groupId: z.string(),
});

export type ListBetDto = z.infer<typeof ListBetDtoSchema>;
