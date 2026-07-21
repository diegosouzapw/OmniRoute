import { deleteModelAlias, getModelAliases, setModelAlias } from "@/lib/db/models";

export const DEFAULT_MODEL_ALIAS_SEED = Object.freeze({
  "gemini-3.1-pro": "agy/gemini-pro-agent",
  "gemini-3.1-flash-lite-preview": "gemini/gemini-3.1-flash-lite",
});

// Remove only aliases that still match a default value previously shipped by OmniRoute.
// User-customized targets with the same alias key are intentionally preserved.
export const RETIRED_DEFAULT_MODEL_ALIAS_SEED = Object.freeze({
  "gemini-3-pro-high": ["agy/gemini-3.1-pro-high", "agy/gemini-pro-agent"],
  "gemini-3-pro-low": "agy/gemini-3.1-pro-low",
  "gemini-3-pro-preview": "agy/gemini-pro-agent",
  "gemini-3.1-pro-preview": "agy/gemini-pro-agent",
  "gemini-3-flash-preview": "agy/gemini-3.5-flash-medium",
});

type SeedLogger = {
  warn?: (message: string, ...args: unknown[]) => void;
};

type SeedOptions = {
  deleteAlias?: typeof deleteModelAlias;
  getAliases?: typeof getModelAliases;
  logger?: SeedLogger;
  retiredSeedMap?: Record<string, unknown>;
  seedMap?: Record<string, unknown>;
  setAlias?: typeof setModelAlias;
};

type SeedResult = {
  applied: string[];
  failed: string[];
  removed: string[];
  skipped: string[];
};

function isValidAliasTarget(value: unknown): boolean {
  if (typeof value === "string" && value.trim().length > 0) return true;
  return Boolean(
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof (value as { provider?: unknown }).provider === "string" &&
    typeof (value as { model?: unknown }).model === "string"
  );
}

function matchesRetiredAliasTarget(existingTarget: unknown, retiredTarget: unknown): boolean {
  return Array.isArray(retiredTarget)
    ? retiredTarget.includes(existingTarget)
    : existingTarget === retiredTarget;
}

export async function seedDefaultModelAliases(options: SeedOptions = {}): Promise<SeedResult> {
  const getAliases = options.getAliases || getModelAliases;
  const setAlias = options.setAlias || setModelAlias;
  const deleteAlias = options.deleteAlias || deleteModelAlias;
  const seedMap = options.seedMap || DEFAULT_MODEL_ALIAS_SEED;
  const retiredSeedMap = options.retiredSeedMap || RETIRED_DEFAULT_MODEL_ALIAS_SEED;
  const logger = options.logger || console;

  let existing: Record<string, unknown> = {};
  try {
    const loaded = await getAliases();
    existing = loaded && typeof loaded === "object" ? loaded : {};
  } catch (error) {
    logger.warn?.("[STARTUP] Failed to load model aliases before seed:", error);
    return { applied: [], skipped: [], failed: Object.keys(seedMap), removed: [] };
  }

  const applied: string[] = [];
  const skipped: string[] = [];
  const failed: string[] = [];
  const removed: string[] = [];

  for (const [alias, retiredTarget] of Object.entries(retiredSeedMap)) {
    if (!matchesRetiredAliasTarget(existing[alias], retiredTarget)) continue;
    try {
      await deleteAlias(alias);
      delete existing[alias];
      removed.push(alias);
    } catch (error) {
      failed.push(alias);
      logger.warn?.(`[STARTUP] Failed to remove retired model alias seed "${alias}":`, error);
    }
  }

  for (const [alias, target] of Object.entries(seedMap)) {
    if (!alias || !isValidAliasTarget(target)) {
      failed.push(alias || "<invalid>");
      logger.warn?.(`[STARTUP] Skipping invalid model alias seed for "${alias || "<invalid>"}"`);
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(existing, alias)) {
      skipped.push(alias);
      continue;
    }

    try {
      await setAlias(alias, target);
      existing[alias] = target;
      applied.push(alias);
    } catch (error) {
      failed.push(alias);
      logger.warn?.(`[STARTUP] Failed to persist model alias seed "${alias}":`, error);
    }
  }

  return { applied, skipped, failed, removed };
}
