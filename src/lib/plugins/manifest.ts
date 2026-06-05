/**
 * Plugin manifest validator — Zod schema for plugin.json files.
 *
 * @module plugins/manifest
 */

import { z } from "zod";

// ── Permission enum ──

export const PermissionSchema = z.enum(["network", "file-read", "file-write", "env", "exec"]);
export type Permission = z.infer<typeof PermissionSchema>;

// ── Skill definition in manifest ──

export const ManifestSkillSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  input: z.record(z.string(), z.unknown()).optional(),
  output: z.record(z.string(), z.unknown()).optional(),
});
export type ManifestSkill = z.infer<typeof ManifestSkillSchema>;

// ── Config schema field ──

export const ConfigFieldSchema = z.object({
  type: z.enum(["string", "number", "boolean", "select"]),
  default: z.unknown().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  enum: z.array(z.string()).optional(),
  description: z.string().optional(),
});
export type ConfigField = z.infer<typeof ConfigFieldSchema>;

// ── Hooks ──

export const HooksSchema = z.object({
  onRequest: z.boolean().optional(),
  onResponse: z.boolean().optional(),
  onError: z.boolean().optional(),
});

// ── Requires ──

export const RequiresSchema = z.object({
  omniroute: z.string().optional(),
  permissions: z.array(PermissionSchema).optional(),
});

// ── Full manifest ──

export const PluginManifestSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Name must be kebab-case (lowercase, hyphens only)"),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must be semver (e.g. 1.0.0)"),
  description: z.string().max(500).optional(),
  author: z.string().max(200).optional(),
  license: z.string().optional(),
  main: z.string().optional(),
  source: z.enum(["local", "marketplace"]).optional(),
  tags: z.array(z.string()).optional(),
  requires: RequiresSchema.optional(),
  hooks: HooksSchema.optional(),
  skills: z.array(ManifestSkillSchema).optional(),
  enabledByDefault: z.boolean().optional(),
  configSchema: z.record(z.string(), ConfigFieldSchema).optional(),
  /**
   * OPT-IN tamper-detection: `sha256-<base64>` of the plugin's entry file.
   *
   * NOT a security boundary — loopback-only routing and exec opt-in are the real
   * boundaries. Local-operator plugins without `integrity` are fully allowed (trust
   * is implicit for locally installed code). When this field IS present, the loader
   * verifies the entry file hash at load time and refuses to activate on mismatch.
   *
   * Format: `sha256-<base64url>` (same as SRI / W3C Subresource Integrity).
   * Generate with: `node -e "const {createHash}=require('crypto'),{readFileSync}=require('fs');
   *   console.log('sha256-'+createHash('sha256').update(readFileSync('index.js')).digest('base64'))"`
   */
  integrity: z.string().optional(),
});

export type PluginManifest = z.infer<typeof PluginManifestSchema>;

// ── Defaults applied after parsing ──

export interface PluginManifestWithDefaults extends PluginManifest {
  license: string;
  main: string;
  source: "local" | "marketplace";
  tags: string[];
  requires: { omniroute?: string; permissions: Permission[] };
  hooks: { onRequest: boolean; onResponse: boolean; onError: boolean };
  skills: ManifestSkill[];
  enabledByDefault: boolean;
  configSchema: Record<string, ConfigField>;
}

export function applyDefaults(manifest: PluginManifest): PluginManifestWithDefaults {
  return {
    ...manifest,
    license: manifest.license ?? "MIT",
    main: manifest.main ?? "index.js",
    source: manifest.source ?? "local",
    tags: manifest.tags ?? [],
    requires: {
      omniroute: manifest.requires?.omniroute,
      permissions: manifest.requires?.permissions ?? [],
    },
    hooks: {
      onRequest: manifest.hooks?.onRequest ?? false,
      onResponse: manifest.hooks?.onResponse ?? false,
      onError: manifest.hooks?.onError ?? false,
    },
    skills: manifest.skills ?? [],
    enabledByDefault: manifest.enabledByDefault ?? false,
    configSchema: manifest.configSchema ?? {},
  };
}

// ── Validation ──

export function validateManifest(raw: unknown): PluginManifestWithDefaults {
  const parsed = PluginManifestSchema.parse(raw);
  return applyDefaults(parsed);
}

export function safeValidateManifest(
  raw: unknown
): { success: true; data: PluginManifestWithDefaults } | { success: false; errors: string[] } {
  const result = PluginManifestSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: applyDefaults(result.data) };
  }
  return {
    success: false,
    errors: result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
  };
}

// ── Config validation ──

export type ValidatePluginConfigResult =
  | { valid: true }
  | { valid: false; errors: string[] };

/**
 * Validate a config object against a ConfigField schema map.
 * Only provided keys are validated — missing keys are fine (use defaults).
 */
export function validatePluginConfig(
  config: Record<string, unknown>,
  schema: Record<string, ConfigField>
): ValidatePluginConfigResult {
  const errors: string[] = [];

  // If schema is empty, allow anything
  const hasSchema = Object.keys(schema).length > 0;
  if (!hasSchema) return { valid: true };

  for (const [key, value] of Object.entries(config)) {
    const field = schema[key];
    if (!field) {
      errors.push(`Unknown config key: ${key}`);
      continue;
    }

    switch (field.type) {
      case "string":
        if (typeof value !== "string") errors.push(`${key} must be a string`);
        break;
      case "number":
        if (typeof value !== "number") {
          errors.push(`${key} must be a number`);
        } else {
          if (field.min !== undefined && value < field.min)
            errors.push(`${key} must be >= ${field.min}`);
          if (field.max !== undefined && value > field.max)
            errors.push(`${key} must be <= ${field.max}`);
        }
        break;
      case "boolean":
        if (typeof value !== "boolean") errors.push(`${key} must be a boolean`);
        break;
      case "select":
        if (!field.enum || !field.enum.includes(value as string))
          errors.push(`${key} must be one of: ${(field.enum ?? []).join(", ")}`);
        break;
    }
  }

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true };
}
