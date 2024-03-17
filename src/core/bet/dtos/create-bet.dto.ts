import { z } from 'zod';

export const ParticipantSchema = z.object({
  pictureUrl: z.string().url(),
  name: z.string(),
});

export const CreateBetDtoSchema = z.object({
  participants: z.array(ParticipantSchema).length(2),
  groupId: z.string(),
});

export type CreateBetDto = z.infer<typeof CreateBetDtoSchema>;
