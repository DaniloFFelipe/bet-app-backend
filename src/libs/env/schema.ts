import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  JWT_SECRET_KEY: z.string(),
  STORAGE_AK: z.string(),
  STORAGE_SK: z.string(),
  STORAGE_URL: z.string(),
  STORAGE_BUCKET: z.string(),
  STORAGE_PORT: z.coerce.number(),
});
