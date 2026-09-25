import type { ConnectionRateLimitOverrides } from "@/lib/db/providers/columns";
import {
  formatModelConcurrencyInput,
  parseModelConcurrencyInput,
} from "@/lib/providers/modelConcurrency";

export interface RateLimitOverridesFormFields {
  rpm: string;
  rpd: string;
  tpm: string;
  tpd: string;
  minTime: string;
  maxWaitMs: string;
  rateLimitMaxConcurrent: string;
  modelConcurrency: string;
}

const NUMERIC_FIELDS = ["rpm", "rpd", "tpm", "tpd", "minTime", "maxWaitMs"] as const;

/**
 * Builds the `rateLimitOverrides` payload from the edit form. Per-model caps
 * (`model=cap`, one per line): blank = no caps; malformed entries return an
 * `error` so operator intent is never silently dropped on save.
 */
export function buildRateLimitOverridesFromForm(form: RateLimitOverridesFormFields): {
  overrides: ConnectionRateLimitOverrides | null;
  error?: string;
} {
  const overrides: ConnectionRateLimitOverrides = {};
  for (const key of NUMERIC_FIELDS) {
    if (form[key].trim()) overrides[key] = Number(form[key]);
  }
  if (form.rateLimitMaxConcurrent.trim())
    overrides.maxConcurrent = Number(form.rateLimitMaxConcurrent);
  const parsed = parseModelConcurrencyInput(form.modelConcurrency);
  if (parsed.error) return { overrides: null, error: parsed.error };
  if (parsed.map) overrides.modelConcurrency = parsed.map;
  return { overrides: Object.keys(overrides).length > 0 ? overrides : null };
}

/** Form value for the stored per-model caps; written back on save so API-configured caps survive edits. */
export function modelConcurrencyFormValue(
  overrides: ConnectionRateLimitOverrides | null | undefined
): string {
  return formatModelConcurrencyInput(overrides?.modelConcurrency);
}
