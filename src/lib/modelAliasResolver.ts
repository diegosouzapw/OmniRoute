/**
 * Model Alias Resolver — maps client-facing model names to OmniRoute provider IDs.
 *
 * When a client sends `model: "deepseek-chat"`, this resolver looks up the alias
 * in the database and rewrites it to the target model ID (e.g. `"ds/deepseek-v4-flash"`)
 * before the request reaches the chat handler.
 *
 * Aliases are stored in the `modelAliases` key-value namespace and seeded by
 * `src/lib/modelAliasSeed.ts`.
 */
import { getModelAliases } from "@/lib/db/models/aliases";

let cachedAliases: Record<string, unknown> | null = null;
let lastFetch = 0;
const CACHE_TTL_MS = 60_000; // 1 minute

async function loadAliases(): Promise<Record<string, unknown>> {
  const now = Date.now();
  if (cachedAliases && now - lastFetch < CACHE_TTL_MS) {
    return cachedAliases;
  }
  cachedAliases = await getModelAliases();
  lastFetch = now;
  return cachedAliases;
}

/**
 * Resolve a model alias to its target provider model ID.
 * If the alias maps to an array, returns the first element.
 * If no alias is found, returns the original model name unchanged.
 */
export async function resolveModelAlias(
  model: string | null | undefined
): Promise<string | null | undefined> {
  if (!model) return model;

  const aliases = await loadAliases();
  const target = aliases[model];

  if (target === undefined) return model;

  if (typeof target === "string") return target;

  if (Array.isArray(target) && target.length > 0) {
    const first = target[0];
    return typeof first === "string" ? first : model;
  }

  if (typeof target === "object" && target !== null) {
    const t = target as { provider?: string; model?: string };
    if (t.provider && t.model) return `${t.provider}/${t.model}`;
  }

  return model;
}

/**
 * Resolve model alias on a parsed request body in-place.
 * Mutates `body.model` if an alias is found.
 */
export async function resolveModelAliasOnBody(
  body: Record<string, unknown> | null | undefined
): Promise<void> {
  if (!body || typeof body !== "object") return;
  body.model = await resolveModelAlias(body.model as string | null | undefined);
}

/**
 * Invalidate the alias cache (e.g. after a new alias is added).
 */
export function invalidateAliasCache(): void {
  cachedAliases = null;
  lastFetch = 0;
}
