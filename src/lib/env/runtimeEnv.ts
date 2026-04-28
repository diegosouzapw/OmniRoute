import { z } from "zod";

import { validateSecrets } from "@/shared/utils/secretsValidator";

const NODE_ENV_VALUES = ["development", "production", "test"] as const;
const BOOLEAN_ENV_VALUES = ["true", "false"] as const;

type RuntimeEnvIssue = {
  name: string;
  issue: string;
  hint?: string;
};

export type RuntimeEnvValidationResult = {
  valid: boolean;
  errors: RuntimeEnvIssue[];
  warnings: RuntimeEnvIssue[];
  data?: WebRuntimeEnv;
};

function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

const optionalTrimmedString = z.preprocess(normalizeOptionalString, z.string().min(1).optional());

const optionalBooleanEnv = z.preprocess(
  normalizeOptionalString,
  z.enum(BOOLEAN_ENV_VALUES).optional()
);

const optionalHttpUrl = z.preprocess(
  normalizeOptionalString,
  z
    .string()
    .url()
    .refine((value) => value.startsWith("http://") || value.startsWith("https://"), {
      message: "must start with http:// or https://",
    })
    .optional()
);

const optionalPortEnv = z.preprocess(
  normalizeOptionalString,
  z
    .string()
    .regex(/^\d+$/, "must be an integer between 1 and 65535")
    .refine((value) => {
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) && parsed >= 1 && parsed <= 65535;
    }, "must be an integer between 1 and 65535")
    .optional()
);

export const webRuntimeEnvSchema = z.object({
  NODE_ENV: z.preprocess(normalizeOptionalString, z.enum(NODE_ENV_VALUES).optional()),
  DATA_DIR: optionalTrimmedString,
  JWT_SECRET: optionalTrimmedString,
  API_KEY_SECRET: optionalTrimmedString,
  INITIAL_PASSWORD: optionalTrimmedString,
  AUTH_COOKIE_SECURE: optionalBooleanEnv,
  PRICING_SYNC_ENABLED: optionalBooleanEnv,
  OMNIROUTE_DISABLE_BACKGROUND_SERVICES: optionalBooleanEnv,
  CLOUD_URL: optionalHttpUrl,
  NEXT_PUBLIC_CLOUD_URL: optionalHttpUrl,
  OMNIROUTE_PUBLIC_BASE_URL: optionalHttpUrl,
  OMNIROUTE_BASE_URL: optionalHttpUrl,
  BASE_URL: optionalHttpUrl,
  NEXT_PUBLIC_BASE_URL: optionalHttpUrl,
  OMNIROUTE_PORT: optionalPortEnv,
  API_PORT: optionalPortEnv,
  DASHBOARD_PORT: optionalPortEnv,
});

export type WebRuntimeEnv = z.infer<typeof webRuntimeEnvSchema>;

function formatZodPath(path: Array<string | number>): string {
  return path.length > 0 ? String(path[0]) : "env";
}

function getSchemaIssues(error: z.ZodError): RuntimeEnvIssue[] {
  return error.issues.map((issue) => ({
    name: formatZodPath(issue.path),
    issue: `Invalid environment variable "${formatZodPath(issue.path)}": ${issue.message}.`,
  }));
}

export function validateWebRuntimeEnv(
  env: NodeJS.ProcessEnv = process.env
): RuntimeEnvValidationResult {
  const secretValidation = validateSecrets(env);
  const schemaValidation = webRuntimeEnvSchema.safeParse(env);
  const errors = [...secretValidation.errors];
  const warnings = [...secretValidation.warnings];

  if (!schemaValidation.success) {
    errors.push(...getSchemaIssues(schemaValidation.error));
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data: schemaValidation.success ? schemaValidation.data : undefined,
  };
}

export function formatRuntimeEnvValidationErrors(
  errors: RuntimeEnvIssue[],
  warnings: RuntimeEnvIssue[] = []
): string {
  const lines = ["Invalid web runtime environment configuration:"];

  for (const error of errors) {
    lines.push(`- ${error.issue}`);
    if (error.hint) {
      lines.push(`  hint: ${error.hint}`);
    }
  }

  for (const warning of warnings) {
    lines.push(`- Warning: ${warning.issue}`);
  }

  return lines.join("\n");
}

export function getWebRuntimeEnv(env: NodeJS.ProcessEnv = process.env): WebRuntimeEnv {
  const result = validateWebRuntimeEnv(env);
  if (!result.valid || !result.data) {
    throw new Error(formatRuntimeEnvValidationErrors(result.errors, result.warnings));
  }
  return result.data;
}

export function enforceWebRuntimeEnv(
  env: NodeJS.ProcessEnv = process.env,
  logger: Pick<Console, "error" | "warn"> = console
): void {
  const result = validateWebRuntimeEnv(env);

  for (const warning of result.warnings) {
    logger.warn(`[STARTUP] ${warning.issue}`);
  }

  if (result.valid) return;

  logger.error("");
  logger.error("═══════════════════════════════════════════════════");
  logger.error("  ❌  STARTUP: Invalid web runtime environment");
  logger.error("═══════════════════════════════════════════════════");
  for (const error of result.errors) {
    logger.error(`  • ${error.issue}`);
    if (error.hint) {
      logger.error(`    → ${error.hint}`);
    }
  }
  logger.error("");
  logger.error("  Fix the environment and restart the server.");
  logger.error("  Secrets are intentionally not printed.");
  logger.error("═══════════════════════════════════════════════════");
  logger.error("");
  process.exit(1);
}
