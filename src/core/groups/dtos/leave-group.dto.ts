import { z } from 'zod';

export const LeaveGroupDtoSchema = z.object({
  groupId: z.string(),
});
export type LeaveGroupDto = z.infer<typeof LeaveGroupDtoSchema>;
