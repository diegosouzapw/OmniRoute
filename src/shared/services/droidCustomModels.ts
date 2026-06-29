/**
 * Build the OmniRoute `customModels` entries for Factory Droid's `settings.json`.
 *
 * Ported from upstream PR decolua/9router#618 (author Anurag Saxena) — multi-model
 * support for the Factory Droid CLI tool. Adapted to OmniRoute branding
 * (`custom:OmniRoute-<i>`) and extracted as a pure helper so the route-handler
 * logic is unit-testable without touching the filesystem.
 */

export interface DroidCustomModelOptions {
  /** Already-normalized base URL (callers must ensure /v1 suffix). */
  baseUrl: string;
  /** API key to embed in every entry. */
  apiKey: string;
  /**
   * Model id (e.g. `"openai/gpt-5"`) that should appear first in the array.
   * When omitted (or not in `models`), entry index 0 stays first.
   * When the empty string `""` is passed explicitly, no reordering happens
   * — the caller signalled "do not promote any model to default".
   */
  activeModel?: string;
}

export interface DroidCustomModelEntry {
  model: string;
  id: string;
  index: number;
  baseUrl: string;
  apiKey: string;
  displayName: string;
  maxOutputTokens: number;
  noImageSupport: boolean;
  provider: string;
}

/**
 * Returns the trimmed, deduplicated, non-empty model ids in input order.
 * Accepts either a `models` array (multi-model, upstream #618) or a legacy
 * `model` string (single-model, pre-#618 behavior).
 */
export function normalizeDroidModelList(input: {
  model?: unknown;
  models?: unknown;
}): string[] {
  const raw: unknown[] = Array.isArray(input.models)
    ? input.models
    : typeof input.model === "string"
      ? [input.model]
      : [];

  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of raw) {
    if (typeof m !== "string") continue;
    const trimmed = m.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

/**
 * Build the final `customModels` array. Throws when `models` is empty —
 * callers should validate before invoking.
 */
export function buildDroidCustomModels(
  models: string[],
  opts: DroidCustomModelOptions
): DroidCustomModelEntry[] {
  if (models.length === 0) {
    throw new Error("buildDroidCustomModels requires at least one model");
  }

  // Default index resolution:
  //   - undefined  → 0 (first entry stays first)
  //   - ""         → -1 (do not promote anything)
  //   - <value>    → index of value in models (or 0 if not found)
  let defaultIndex: number;
  if (typeof opts.activeModel === "string") {
    if (opts.activeModel === "") {
      defaultIndex = -1;
    } else {
      const idx = models.indexOf(opts.activeModel);
      defaultIndex = idx >= 0 ? idx : 0;
    }
  } else {
    defaultIndex = 0;
  }

  const entries: DroidCustomModelEntry[] = models.map((m, i) => ({
    model: m,
    id: `custom:OmniRoute-${i}`,
    index: i,
    baseUrl: opts.baseUrl,
    apiKey: opts.apiKey,
    displayName: m,
    maxOutputTokens: 131072,
    noImageSupport: false,
    provider: "openai",
  }));

  if (defaultIndex > 0 && entries[defaultIndex]) {
    const [defaultEntry] = entries.splice(defaultIndex, 1);
    entries.unshift({ ...defaultEntry, index: 0 });
    entries.forEach((e, i) => {
      e.index = i;
      e.id = `custom:OmniRoute-${i}`;
    });
  }

  return entries;
}

/** True when a `customModels` entry was written by OmniRoute (any index). */
export function isOmniRouteCustomModel(entry: { id?: unknown } | null | undefined): boolean {
  return typeof entry?.id === "string" && entry.id.startsWith("custom:OmniRoute");
}
