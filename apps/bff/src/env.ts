import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(4322),
  OMNIROUTE_UPSTREAM: z.string().url().default('http://localhost:20128'),
  BFF_API_KEY: z.string().min(16).default('dev-bff-key-change-me-in-prod'),
  BFF_RATE_LIMIT_RPM: z.coerce.number().int().min(1).default(600),
  BFF_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  BFF_CORS_ORIGINS: z.string().default('http://localhost:4321,http://localhost:14321'),
  BFF_STORAGE_PATH: z.string().default('.data/snapshot.json'),
  BFF_UPSTREAM_TIMEOUT_MS: z.coerce.number().int().min(100).default(30000),
  BFF_CIRCUIT_BREAKER_THRESHOLD: z.coerce.number().int().min(1).default(5),
  BFF_CIRCUIT_BREAKER_COOLDOWN_MS: z.coerce.number().int().min(1000).default(30000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('[bff:env] invalid environment', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = z.infer<typeof EnvSchema>;
