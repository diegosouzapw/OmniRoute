/**
 * Ensure Cursor catalog listings always expose OmniRoute's public auto-router
 * ids (`auto` + Cost/Balance/Intelligence variants). Live AvailableModels /
 * cursor-agent often return wire id `default` only.
 */

export type CursorAutoCatalogEntry = {
  id: string;
  name: string;
  owned_by?: string;
};

export const CURSOR_AUTO_ROUTER_VARIANT_IDS = [
  "auto-cost",
  "auto-balance",
  "auto-intelligence",
] as const;

const CURSOR_AUTO_ROUTER_VARIANT_NAMES: Record<
  (typeof CURSOR_AUTO_ROUTER_VARIANT_IDS)[number],
  string
> = {
  "auto-cost": "Auto (cost)",
  "auto-balance": "Auto (balance)",
  "auto-intelligence": "Auto (intelligence)",
};

const CURSOR_ONE_MILLION_CONTEXT = 1_000_000;
const CURSOR_CONTEXT_EFFORT = "(?:low|medium|high|xhigh|max)";
const CURSOR_ONE_MILLION_MODEL_PATTERNS = [
  new RegExp(`^claude-fable-5-1-thinking-${CURSOR_CONTEXT_EFFORT}$`),
  new RegExp(`^claude-opus-5-(?:thinking-)?${CURSOR_CONTEXT_EFFORT}(?:-fast)?$`),
  new RegExp(`^claude-opus-4-8-(?:thinking-)?${CURSOR_CONTEXT_EFFORT}(?:-fast)?$`),
  new RegExp(`^claude-sonnet-5-(?:thinking-)?${CURSOR_CONTEXT_EFFORT}$`),
  new RegExp(`^claude-4\\.6-sonnet-${CURSOR_CONTEXT_EFFORT}(?:-thinking)?$`),
  new RegExp(`^gpt-5\\.6-(?:sol|terra|luna)-(?:none|${CURSOR_CONTEXT_EFFORT})$`),
] as const;

const CURSOR_CONTEXT_FAMILY_NAMES = [
  "Claude Fable 5.1",
  "Claude Opus 5",
  "Claude Opus 4.8",
  "Claude Sonnet 5",
  "Claude Sonnet 4.6",
  "GPT-5.6 Sol",
  "GPT-5.6 Terra",
  "GPT-5.6 Luna",
] as const;

function supportsCursorOneMillionContext(id: string): boolean {
  return CURSOR_ONE_MILLION_MODEL_PATTERNS.some((pattern) => pattern.test(id));
}

function oneMillionDisplayName(name: string): string {
  const family = CURSOR_CONTEXT_FAMILY_NAMES.find((candidate) => name.startsWith(candidate));
  return family ? `${family} 1M${name.slice(family.length)}` : `${name} 1M`;
}

/** Cursor auto-router: catalog id `auto`, wire id `default`. Always keep `auto` visible. */
export function ensureCursorAutoCatalogEntry<T extends CursorAutoCatalogEntry>(models: T[]): T[] {
  const byId = new Map(models.map((m) => [m.id, m]));
  const out: T[] = [];

  for (const model of models) {
    const oneMillionId = `${model.id}-1m`;
    if (supportsCursorOneMillionContext(model.id) && !byId.has(oneMillionId)) {
      const oneMillionEntry = {
        ...model,
        id: oneMillionId,
        name: oneMillionDisplayName(model.name),
        contextLength: CURSOR_ONE_MILLION_CONTEXT,
      } as T;
      out.push(oneMillionEntry);
      byId.set(oneMillionId, oneMillionEntry);
    }
    out.push(model);
  }

  if (!byId.has("auto")) {
    const defaultEntry = byId.get("default");
    const autoEntry = {
      id: "auto",
      name:
        typeof defaultEntry?.name === "string" && defaultEntry.name.trim()
          ? defaultEntry.name
          : "Auto (current, default)",
      owned_by: "cursor",
    } as T;
    out.unshift(autoEntry);
    byId.set("auto", autoEntry);
  }

  for (const id of CURSOR_AUTO_ROUTER_VARIANT_IDS) {
    if (byId.has(id)) continue;
    const entry = {
      id,
      name: CURSOR_AUTO_ROUTER_VARIANT_NAMES[id],
      owned_by: "cursor",
    } as T;
    out.push(entry);
    byId.set(id, entry);
  }

  return out;
}
