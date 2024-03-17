import { z } from 'zod';

export const SignUpDtoSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  fullName: z.string(),
  avatarUrl: z.string().optional(),
});
export type SignUpDto = z.infer<typeof SignUpDtoSchema>;

export const SignInWithPasswordDtoSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInWithPasswordDto = z.infer<typeof SignInWithPasswordDtoSchema>;

export const SignInWithCodeDtoSchema = z.object({
  code: z.string().length(6),
  token: z.string(),
});
export type SignInWithCodeDto = z.infer<typeof SignInWithCodeDtoSchema>;

export const RequestAuthCodeDtoSchema = z.object({
  email: z.string().email(),
});
export type RequestAuthCodeDto = z.infer<typeof RequestAuthCodeDtoSchema>;
