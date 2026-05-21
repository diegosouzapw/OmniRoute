import { getModelAliases, setModelAlias } from "@/lib/db/models";

export const DEFAULT_MODEL_ALIAS_SEED = Object.freeze({
  "gemini-1.5-pro": "gemini-cli/gemini-1.5-pro",
  "gemini-1.5-flash": "gemini-cli/gemini-1.5-flash",
  "gemini-3-pro-high": "gemini-cli/gemini-3.1-pro-preview",
  "gemini-3-pro-low": "gemini-cli/gemini-3.1-flash-lite-preview",
  "gemini-3-pro-preview": "gemini-cli/gemini-3.1-pro-preview",
  "gemini-3.1-pro-preview": "gemini-cli/gemini-3.1-pro-preview",
  "gemini-3.1-pro-preview-customtools": "gemini-cli/gemini-3.1-pro-preview-customtools",
  "gemini-3-flash-preview": "gemini-cli/gemini-3-flash-preview",
  "gemini-3.1-flash-lite-preview": "gemini-cli/gemini-3.1-flash-lite-preview",
});

type SeedLogger = {
  warn?: (message: string, ...args: unknown[]) => void;
};

type SeedOptions = {
  getAliases?: typeof getModelAliases;
  logger?: SeedLogger;
  seedMap?: Record<string, unknown>;
  setAlias?: typeof setModelAlias;
};

type SeedResult = {
  applied: string[];
  failed: string[];
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

export async function seedDefaultModelAliases(options: SeedOptions = {}): Promise<SeedResult> {
  const getAliases = options.getAliases || getModelAliases;
  const setAlias = options.setAlias || setModelAlias;
  const seedMap = options.seedMap || DEFAULT_MODEL_ALIAS_SEED;
  const logger = options.logger || console;

  let existing: Record<string, unknown> = {};
  try {
    const loaded = await getAliases();
    existing = loaded && typeof loaded === "object" ? loaded : {};
  } catch (error) {
    logger.warn?.("[STARTUP] Failed to load model aliases before seed:", error);
    return { applied: [], skipped: [], failed: Object.keys(seedMap) };
  }

  const applied: string[] = [];
  const skipped: string[] = [];
  const failed: string[] = [];

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

  return { applied, skipped, failed };
}
