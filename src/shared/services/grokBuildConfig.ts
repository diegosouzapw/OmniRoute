import path from "node:path";

import { parse as parseToml } from "smol-toml";

export const GROK_MAIN_MODEL_SLOT = "omniroute";
export const GROK_SUBAGENT_TYPES = ["general-purpose", "explore", "plan"] as const;

export type GrokSubagentType = (typeof GROK_SUBAGENT_TYPES)[number];

export interface GrokModelConfig {
  model: string | null;
  base_url: string | null;
  name: string | null;
  api_key: string | null;
  api_backend: string | null;
  context_window: number | null;
}

export interface GrokBuildSettings {
  model: GrokModelConfig | null;
  default: string | null;
  subagentModels: Record<GrokSubagentType, GrokModelConfig | null>;
  subagentMappings: Record<GrokSubagentType, string | null>;
}

export interface GrokBuildApplyOptions {
  baseUrl: string;
  apiKey?: string | null;
  model: string;
  contextWindow?: number;
  subagentModels?: Partial<Record<GrokSubagentType, { model: string; contextWindow?: number }>>;
}

/** Resolve config.toml from GROK_HOME or the CLI config home. */
export function resolveGrokBuildConfigPath(env: NodeJS.ProcessEnv, configHome: string): string {
  const grokHome = env.GROK_HOME?.trim();
  if (!grokHome) return path.join(configHome, ".grok", "config.toml");
  const hasTraversal = grokHome.split(/[\\/]+/).includes("..");
  if (!path.isAbsolute(grokHome) || hasTraversal) {
    throw new Error("GROK_HOME must be an absolute path without traversal");
  }
  if (/[$`;&|<>\r\n\0]/.test(grokHome)) {
    throw new Error("GROK_HOME contains invalid characters");
  }
  return path.join(path.normalize(grokHome), "config.toml");
}

const UNSET_SENTINEL = "__omniroute_unset__";
const MANAGED_MARKER = '# omniroute-managed = "true"';
const LEGACY_DESCRIPTION = "Routed via OmniRoute gateway";
const MODELS_SECTION = "models";
const SUBAGENT_MODELS_SECTION = "subagents.models";

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tomlString = (value: string): string => JSON.stringify(String(value));
const modelSlot = (type: GrokSubagentType): string => `${GROK_MAIN_MODEL_SLOT}-${type}`;

const sectionRegExp = (section: string): RegExp =>
  new RegExp(`^\\[${escapeRegExp(section)}\\][ \\t]*\\r?\\n((?:(?!\\[)[^\\r\\n]*\\r?\\n?)*)`, "m");

const previousDefaultRegExp = /^# omniroute-prev-default = "([^"]*)"[ \t]*\r?\n?/m;
const previousSubagentRegExp = (type: GrokSubagentType): RegExp =>
  new RegExp(`^# omniroute-prev-subagent-${escapeRegExp(type)} = "([^"]*)"[ \\t]*\\r?\\n?`, "m");

const getSectionBody = (toml: string, section: string): string | null =>
  toml.match(sectionRegExp(section))?.[1] ?? null;

const getSectionString = (toml: string, section: string, key: string): string | null => {
  const body = getSectionBody(toml, section);
  if (body === null) return null;
  const field = body.match(new RegExp(`^[ \\t]*${escapeRegExp(key)}[ \\t]*=[ \\t]*"([^"]*)"`, "m"));
  return field?.[1] ?? null;
};

const getSectionNumber = (toml: string, section: string, key: string): number | null => {
  const body = getSectionBody(toml, section);
  if (body === null) return null;
  const field = body.match(new RegExp(`^[ \\t]*${escapeRegExp(key)}[ \\t]*=[ \\t]*([0-9]+)`, "m"));
  if (!field) return null;
  const value = Number(field[1]);
  return Number.isSafeInteger(value) && value > 0 ? value : null;
};

const setSectionString = (toml: string, section: string, key: string, value: string): string => {
  const match = toml.match(sectionRegExp(section));
  const line = `${key} = ${tomlString(value)}`;
  if (!match) {
    const prefix = toml.length > 0 && !toml.endsWith("\n") ? `${toml}\n` : toml;
    return `${prefix}${prefix ? "\n" : ""}[${section}]\n${line}\n`;
  }

  const body = match[1] ?? "";
  const fieldRegExp = new RegExp(
    `^[ \\t]*${escapeRegExp(key)}[ \\t]*=[^\\r\\n]*(?:\\r?\\n|$)`,
    "m"
  );
  const nextBody = fieldRegExp.test(body)
    ? body.replace(fieldRegExp, `${line}\n`)
    : `${line}\n${body}`;
  return toml.replace(match[0], `[${section}]\n${nextBody}`);
};

const deleteSectionField = (toml: string, section: string, key: string): string => {
  const match = toml.match(sectionRegExp(section));
  if (!match) return toml;
  const fieldRegExp = new RegExp(
    `^[ \\t]*${escapeRegExp(key)}[ \\t]*=[^\\r\\n]*(?:\\r?\\n|$)`,
    "m"
  );
  const nextBody = (match[1] ?? "").replace(fieldRegExp, "");
  if (!nextBody.trim()) return toml.replace(match[0], "").replace(/\n{3,}/g, "\n\n");
  return toml.replace(match[0], `[${section}]\n${nextBody}`);
};

const parseModelSection = (toml: string, slot: string): GrokModelConfig | null => {
  if (getSectionBody(toml, `model.${slot}`) === null) return null;
  return {
    model: getSectionString(toml, `model.${slot}`, "model"),
    base_url: getSectionString(toml, `model.${slot}`, "base_url"),
    name: getSectionString(toml, `model.${slot}`, "name"),
    api_key: getSectionString(toml, `model.${slot}`, "api_key"),
    api_backend: getSectionString(toml, `model.${slot}`, "api_backend"),
    context_window: getSectionNumber(toml, `model.${slot}`, "context_window"),
  };
};

const buildModelSection = (options: {
  slot: string;
  model: string;
  baseUrl: string;
  apiKey?: string | null;
  contextWindow?: number;
  name: string;
}): string => {
  const lines = [
    `[model.${options.slot}]`,
    MANAGED_MARKER,
    `model = ${tomlString(options.model)}`,
    `base_url = ${tomlString(options.baseUrl)}`,
    `name = ${tomlString(options.name)}`,
    `description = ${tomlString(LEGACY_DESCRIPTION)}`,
    'api_backend = "chat_completions"',
  ];
  if (options.apiKey) lines.push(`api_key = ${tomlString(options.apiKey)}`);
  if (Number.isSafeInteger(options.contextWindow) && Number(options.contextWindow) > 0) {
    lines.push(`context_window = ${Math.floor(Number(options.contextWindow))}`);
  }
  return `${lines.join("\n")}\n`;
};

const upsertModelSection = (
  toml: string,
  options: Parameters<typeof buildModelSection>[0]
): string => {
  const regexp = sectionRegExp(`model.${options.slot}`);
  const section = buildModelSection(options);
  if (regexp.test(toml)) return toml.replace(regexp, section);
  const prefix = toml.length > 0 && !toml.endsWith("\n") ? `${toml}\n` : toml;
  return `${prefix}${prefix ? "\n" : ""}${section}`;
};

const removeModelSection = (toml: string, slot: string): string =>
  toml.replace(sectionRegExp(`model.${slot}`), "").replace(/\n{3,}/g, "\n\n");

const insertMarker = (toml: string, marker: string): string => {
  const mainSection = sectionRegExp(`model.${GROK_MAIN_MODEL_SLOT}`);
  if (mainSection.test(toml)) {
    return toml.replace(mainSection, (section) => `${marker}${section}`);
  }
  const prefix = toml.length > 0 && !toml.endsWith("\n") ? `${toml}\n` : toml;
  return `${prefix}${marker}`;
};

const rememberPreviousDefault = (toml: string): string => {
  if (previousDefaultRegExp.test(toml)) return toml;
  const current = getSectionString(toml, MODELS_SECTION, "default");
  const previous = !current || current === "grok-build" ? UNSET_SENTINEL : current;
  if (current === GROK_MAIN_MODEL_SLOT) return toml;
  return insertMarker(toml, `# omniroute-prev-default = ${tomlString(previous)}\n`);
};

const restorePreviousDefault = (toml: string): string => {
  const previous = toml.match(previousDefaultRegExp)?.[1] ?? UNSET_SENTINEL;
  let next = toml.replace(previousDefaultRegExp, "");
  if (getSectionString(next, MODELS_SECTION, "default") !== GROK_MAIN_MODEL_SLOT) return next;
  if (previous === UNSET_SENTINEL || previous === "grok-build") {
    return deleteSectionField(next, MODELS_SECTION, "default");
  }
  return setSectionString(next, MODELS_SECTION, "default", previous);
};

const rememberPreviousSubagent = (toml: string, type: GrokSubagentType): string => {
  if (previousSubagentRegExp(type).test(toml)) return toml;
  const current = getSectionString(toml, SUBAGENT_MODELS_SECTION, type);
  const previous = current ?? UNSET_SENTINEL;
  return insertMarker(toml, `# omniroute-prev-subagent-${type} = ${tomlString(previous)}\n`);
};

const restorePreviousSubagent = (toml: string, type: GrokSubagentType): string => {
  const regexp = previousSubagentRegExp(type);
  const previous = toml.match(regexp)?.[1] ?? UNSET_SENTINEL;
  let next = toml.replace(regexp, "");
  if (getSectionString(next, SUBAGENT_MODELS_SECTION, type) !== modelSlot(type)) return next;
  if (previous === UNSET_SENTINEL) {
    return deleteSectionField(next, SUBAGENT_MODELS_SECTION, type);
  }
  return setSectionString(next, SUBAGENT_MODELS_SECTION, type, previous);
};

const isLegacyOwnedMainSection = (toml: string): boolean => {
  const section = parseModelSection(toml, GROK_MAIN_MODEL_SLOT);
  if (!section) return false;
  const body = getSectionBody(toml, `model.${GROK_MAIN_MODEL_SLOT}`) ?? "";
  const keys = [...body.matchAll(/^\s*([A-Za-z0-9_-]+)\s*=/gm)].map((match) => match[1]);
  const allowed = new Set(["model", "base_url", "name", "description", "api_backend", "api_key"]);
  return (
    keys.every((key) => allowed.has(key)) &&
    section.model !== null &&
    section.base_url !== null &&
    section.name === "OmniRoute" &&
    section.api_backend === "chat_completions" &&
    getSectionString(toml, `model.${GROK_MAIN_MODEL_SLOT}`, "description") === LEGACY_DESCRIPTION
  );
};

const assertMainSlotOwnership = (toml: string): void => {
  const body = getSectionBody(toml, `model.${GROK_MAIN_MODEL_SLOT}`);
  if (body === null || body.includes(MANAGED_MARKER) || isLegacyOwnedMainSection(toml)) return;
  throw new GrokBuildConfigConflictError();
};

export class GrokBuildConfigConflictError extends Error {
  constructor() {
    super("The [model.omniroute] table exists and OmniRoute does not own it");
    this.name = "GrokBuildConfigConflictError";
  }
}

/** Parse the Grok Build fields that OmniRoute manages. */
export function parseGrokBuildConfig(toml: string): GrokBuildSettings {
  if (toml.trim()) parseToml(toml);
  const subagentModels = {} as Record<GrokSubagentType, GrokModelConfig | null>;
  const subagentMappings = {} as Record<GrokSubagentType, string | null>;
  for (const type of GROK_SUBAGENT_TYPES) {
    const mapping = getSectionString(toml, SUBAGENT_MODELS_SECTION, type);
    subagentMappings[type] = mapping;
    subagentModels[type] = mapping === modelSlot(type) ? parseModelSection(toml, mapping) : null;
  }
  return {
    model: parseModelSection(toml, GROK_MAIN_MODEL_SLOT),
    default: getSectionString(toml, MODELS_SECTION, "default"),
    subagentModels,
    subagentMappings,
  };
}

/** Apply the OmniRoute model slots and preserve unrelated TOML text. */
export function applyGrokBuildConfig(toml: string, options: GrokBuildApplyOptions): string {
  if (toml.trim()) parseToml(toml);
  assertMainSlotOwnership(toml);
  let next = rememberPreviousDefault(toml);
  next = upsertModelSection(next, {
    slot: GROK_MAIN_MODEL_SLOT,
    model: options.model,
    baseUrl: options.baseUrl,
    apiKey: options.apiKey,
    contextWindow: options.contextWindow,
    name: "OmniRoute",
  });
  next = setSectionString(next, MODELS_SECTION, "default", GROK_MAIN_MODEL_SLOT);

  if (options.subagentModels !== undefined) {
    for (const type of GROK_SUBAGENT_TYPES) {
      const selected = options.subagentModels[type];
      const slot = modelSlot(type);
      if (selected?.model) {
        next = rememberPreviousSubagent(next, type);
        next = upsertModelSection(next, {
          slot,
          model: selected.model,
          baseUrl: options.baseUrl,
          apiKey: options.apiKey,
          contextWindow: selected.contextWindow,
          name: `OmniRoute ${type}`,
        });
        next = setSectionString(next, SUBAGENT_MODELS_SECTION, type, slot);
      } else {
        next = restorePreviousSubagent(next, type);
        next = removeModelSection(next, slot);
      }
    }
  }
  return next;
}

/** Remove the OmniRoute model slots and restore values that users did not change. */
export function resetGrokBuildConfig(toml: string): string {
  if (toml.trim()) parseToml(toml);
  let next = toml;
  for (const type of GROK_SUBAGENT_TYPES) {
    next = restorePreviousSubagent(next, type);
    next = removeModelSection(next, modelSlot(type));
  }
  next = removeModelSection(next, GROK_MAIN_MODEL_SLOT);
  next = restorePreviousDefault(next);
  return next.replace(/\n{3,}/g, "\n\n");
}

/** Return the managed slot for a Grok Build subagent type. */
export function getGrokSubagentSlot(type: string): string | null {
  return GROK_SUBAGENT_TYPES.includes(type as GrokSubagentType)
    ? modelSlot(type as GrokSubagentType)
    : null;
}
