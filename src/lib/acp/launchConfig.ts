import { z } from "zod";
import { buildSafeCliLaunchEnv } from "../../../bin/cli/launch-env.mjs";

const spawnOptionsSchema = z
  .object({
    cwd: z.string().min(1).optional(),
    env: z.record(z.string().regex(/^[A-Za-z_][A-Za-z0-9_]*$/), z.string().optional()).optional(),
  })
  .strict();

export type AcpSpawnOptions = z.infer<typeof spawnOptionsSchema>;

export function parseSpawnOptions(input: unknown): AcpSpawnOptions {
  const result = spawnOptionsSchema.safeParse(input);
  if (!result.success) throw new TypeError("ACP spawn options must contain only cwd and env");
  return result.data;
}

export function buildAcpChildEnv(overrides: AcpSpawnOptions["env"]): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = buildSafeCliLaunchEnv();
  for (const [key, value] of Object.entries(overrides || {})) {
    if (value === undefined) delete env[key];
    else env[key] = value;
  }
  return env;
}
