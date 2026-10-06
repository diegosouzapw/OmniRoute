// Parses the `--models` / `--model` options for `omniroute combo create` (#10954).
//
// Root cause of #10954: `combo create` only ever registered `--strategy`; the
// HTTP body (POST /api/combos) and the local-db fallback (db.combos.createCombo)
// both hardcoded `models: []`, so every combo created via the CLI came out
// empty regardless of what the operator intended to route to.
//
// Accepted shapes mirror the server-side Zod union in
// `src/shared/validation/schemas/combo.ts` (`comboModelEntry` /
// `createComboSchema.models`) so a CLI-built payload never gets rejected by
// the API that ultimately validates it:
//   - a plain string ("provider/model" or a bare model id) — the server's
//     `normalizeComboModels` (src/lib/combos/steps.ts) already splits the
//     leading "provider/" segment off a plain string, so passing the raw
//     token through is sufficient for the common case;
//   - a structured `{ kind?: "model", model, providerId?, provider?, ... }`
//     object;
//   - a structured `{ kind: "combo-ref", comboName, ... }` object (nested
//     combo reference).
//
// The CLI (bin/cli/**) ships as plain `.mjs` with relative-only imports — no
// `@/` path aliases and no TS transpilation at runtime — so importing the
// real Zod schema from `src/shared/validation/schemas/combo.ts` is not
// viable here. This module instead validates the same minimal shape by hand
// and stays a thin, independently testable unit.

/**
 * Validates one already-parsed combo model entry against the shape accepted
 * by `comboModelEntry` (string | model-step | combo-ref). Throws with a
 * 1-based, human-readable position when the entry does not match.
 *
 * @param {unknown} entry
 * @param {number} index
 * @returns {string | Record<string, unknown>}
 */
export function validateComboModelEntryShape(entry, index) {
  const position = index + 1;

  if (typeof entry === "string") {
    const trimmed = entry.trim();
    if (trimmed.length === 0) {
      throw new Error(`--models entry #${position}: empty model string`);
    }
    if (trimmed.length > 300) {
      throw new Error(`--models entry #${position}: model string exceeds 300 characters`);
    }
    return trimmed;
  }

  if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
    throw new Error(`--models entry #${position}: must be a string or a JSON object`);
  }

  const kind = entry.kind;

  if (kind === "combo-ref") {
    if (typeof entry.comboName !== "string" || entry.comboName.trim().length === 0) {
      throw new Error(
        `--models entry #${position}: kind "combo-ref" requires a non-empty "comboName"`
      );
    }
    return entry;
  }

  if (kind !== undefined && kind !== "model") {
    throw new Error(`--models entry #${position}: unknown "kind" value ${JSON.stringify(kind)}`);
  }

  if (typeof entry.model !== "string" || entry.model.trim().length === 0) {
    throw new Error(`--models entry #${position}: requires a non-empty "model"`);
  }
  if (entry.providerId !== undefined && typeof entry.providerId !== "string") {
    throw new Error(`--models entry #${position}: "providerId" must be a string`);
  }
  if (entry.provider !== undefined && typeof entry.provider !== "string") {
    throw new Error(`--models entry #${position}: "provider" must be a string`);
  }

  return entry;
}

/**
 * Parses one `--models` spec — either a JSON array (`--models '[{"model":"gpt-4o"}]'`)
 * or a comma-separated list of provider/model tokens
 * (`--models 'openai/gpt-4o,anthropic/claude-3-opus'`) — into an array of
 * combo model entries.
 *
 * @param {string} spec
 * @returns {Array<string | Record<string, unknown>>}
 */
export function parseModelsSpec(spec) {
  const trimmed = String(spec ?? "").trim();
  if (trimmed.length === 0) return [];

  if (trimmed.startsWith("[")) {
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch (err) {
      throw new Error(`--models: invalid JSON array (${err.message})`);
    }
    if (!Array.isArray(parsed)) {
      throw new Error("--models: JSON value must be an array");
    }
    return parsed.map((entry, i) => validateComboModelEntryShape(entry, i));
  }

  return trimmed
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
    .map((token, i) => validateComboModelEntryShape(token, i));
}

/**
 * Resolves the final `models` array for `combo create` from Commander opts:
 * `--models <csv-or-json>` and/or repeatable `--model <spec>`.
 *
 * @param {{ models?: string, model?: string[] }} opts
 * @returns {Array<string | Record<string, unknown>>}
 */
export function resolveComboModels(opts = {}) {
  const result = [];

  if (typeof opts.models === "string" && opts.models.trim().length > 0) {
    result.push(...parseModelsSpec(opts.models));
  }

  if (Array.isArray(opts.model)) {
    opts.model.forEach((token, i) => {
      result.push(validateComboModelEntryShape(String(token).trim(), i));
    });
  }

  return result;
}

/** Commander `collect`-style reducer for the repeatable `--model` option. */
export function collectModel(value, previous) {
  previous.push(value);
  return previous;
}
