import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('7d'),
  PORT: z.coerce.number().default(3333),
})

export type Env = z.infer<typeof envSchema>
