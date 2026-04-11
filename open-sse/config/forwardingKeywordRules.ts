type ForwardingKeywordLane = "claude-oauth-prefixed";

type ForwardingKeywordRule = {
  match: string;
  replace: string;
};

type ForwardingTagRule = {
  open: string;
  openReplacement: string;
  close: string;
  closeReplacement: string;
};

type ForwardingKeywordRules = {
  toolNames: ForwardingKeywordRule[];
  text: ForwardingKeywordRule[];
  tags: ForwardingTagRule[];
};

type ForwardingKeywordConfig = Record<ForwardingKeywordLane, ForwardingKeywordRules>;

export const DEFAULT_FORWARDING_KEYWORD_CONFIG: ForwardingKeywordConfig = {
  "claude-oauth-prefixed": {
    toolNames: [
      { match: "background_output", replace: "background_result" },
      { match: "background_cancel", replace: "background_stop" },
    ],
    text: [
      { match: "background_output", replace: "background_result" },
      { match: "background_cancel", replace: "background_stop" },
    ],
    tags: [
      {
        open: "<directories>",
        openReplacement: "directories:\n",
        close: "</directories>",
        closeReplacement: "",
      },
    ],
  },
};

let forwardingKeywordConfig: ForwardingKeywordConfig = cloneForwardingKeywordConfig(
  DEFAULT_FORWARDING_KEYWORD_CONFIG
);

function cloneForwardingKeywordConfig(config: ForwardingKeywordConfig): ForwardingKeywordConfig {
  return JSON.parse(JSON.stringify(config)) as ForwardingKeywordConfig;
}

function normalizeNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalizedValue = value.trim();
  return normalizedValue ? normalizedValue : null;
}

function normalizeKeywordRule(rule: unknown): ForwardingKeywordRule | null {
  if (!rule || typeof rule !== "object") return null;
  const candidate = rule as Record<string, unknown>;
  const match = normalizeNonEmptyString(candidate.match);
  if (!match || typeof candidate.replace !== "string") return null;
  return { match, replace: candidate.replace };
}

function normalizeTagRule(rule: unknown): ForwardingTagRule | null {
  if (!rule || typeof rule !== "object") return null;
  const candidate = rule as Record<string, unknown>;
  const open = normalizeNonEmptyString(candidate.open);
  const close = normalizeNonEmptyString(candidate.close);
  if (
    !open ||
    typeof candidate.openReplacement !== "string" ||
    !close ||
    typeof candidate.closeReplacement !== "string"
  ) {
    return null;
  }

  return {
    open,
    openReplacement: candidate.openReplacement,
    close,
    closeReplacement: candidate.closeReplacement,
  };
}

function mergeKeywordRules(
  defaults: ForwardingKeywordRule[],
  overrides: ForwardingKeywordRule[]
): ForwardingKeywordRule[] {
  if (overrides.length === 0) return defaults;

  const merged = new Map(defaults.map((rule) => [rule.match, rule]));
  for (const override of overrides) {
    merged.set(override.match, override);
  }

  return Array.from(merged.values());
}

function mergeTagRules(
  defaults: ForwardingTagRule[],
  overrides: ForwardingTagRule[]
): ForwardingTagRule[] {
  if (overrides.length === 0) return defaults;

  const merged = new Map(defaults.map((rule) => [`${rule.open}::${rule.close}`, rule]));
  for (const override of overrides) {
    merged.set(`${override.open}::${override.close}`, override);
  }

  return Array.from(merged.values());
}

export function normalizeForwardingKeywordConfig(value: unknown): ForwardingKeywordConfig {
  const normalized = cloneForwardingKeywordConfig(DEFAULT_FORWARDING_KEYWORD_CONFIG);
  if (!value || typeof value !== "object") return normalized;

  const rawConfig = value as Record<string, unknown>;
  for (const lane of Object.keys(DEFAULT_FORWARDING_KEYWORD_CONFIG) as ForwardingKeywordLane[]) {
    const rawLane = rawConfig[lane];
    if (!rawLane || typeof rawLane !== "object") continue;

    const rawLaneConfig = rawLane as Record<string, unknown>;
    const toolNameOverrides = Array.isArray(rawLaneConfig.toolNames)
      ? rawLaneConfig.toolNames.map(normalizeKeywordRule).filter(Boolean)
      : [];
    const textOverrides = Array.isArray(rawLaneConfig.text)
      ? rawLaneConfig.text.map(normalizeKeywordRule).filter(Boolean)
      : [];
    const tagOverrides = Array.isArray(rawLaneConfig.tags)
      ? rawLaneConfig.tags.map(normalizeTagRule).filter(Boolean)
      : [];

    normalized[lane] = {
      toolNames: mergeKeywordRules(normalized[lane].toolNames, toolNameOverrides),
      text: mergeKeywordRules(normalized[lane].text, textOverrides),
      tags: mergeTagRules(normalized[lane].tags, tagOverrides),
    };
  }

  return normalized;
}

export function setForwardingKeywordConfig(config: unknown) {
  forwardingKeywordConfig = normalizeForwardingKeywordConfig(config);
}

export function applyForwardingKeywordSettings(settings: Record<string, unknown>) {
  if (Object.prototype.hasOwnProperty.call(settings, "forwardingKeywordRules")) {
    setForwardingKeywordConfig(settings.forwardingKeywordRules);
    return;
  }

  setForwardingKeywordConfig(getDefaultForwardingKeywordConfig());
}

export function getForwardingKeywordConfig(): ForwardingKeywordConfig {
  return cloneForwardingKeywordConfig(forwardingKeywordConfig);
}

export function getDefaultForwardingKeywordConfig(): ForwardingKeywordConfig {
  return cloneForwardingKeywordConfig(DEFAULT_FORWARDING_KEYWORD_CONFIG);
}

export function rewriteForwardedTextForLane(lane: ForwardingKeywordLane, text: string): string {
  if (!text) return text;

  let rewrittenText = text;
  const rules = forwardingKeywordConfig[lane];

  for (const rule of rules.text) {
    rewrittenText = rewrittenText.replaceAll(rule.match, rule.replace);
  }

  for (const tagRule of rules.tags) {
    rewrittenText = rewrittenText
      .replaceAll(tagRule.open, tagRule.openReplacement)
      .replaceAll(tagRule.close, tagRule.closeReplacement);
  }

  return rewrittenText;
}

export function rewriteForwardedToolNameForLane(
  lane: ForwardingKeywordLane,
  toolName: string
): string {
  const rules = forwardingKeywordConfig[lane];
  const matchingRule = rules.toolNames.find((rule) => rule.match === toolName);
  return matchingRule?.replace ?? toolName;
}

export function getForwardingKeywordRulesForLane(
  lane: ForwardingKeywordLane
): ForwardingKeywordRules {
  return cloneForwardingKeywordConfig(forwardingKeywordConfig)[lane];
}

export type {
  ForwardingKeywordConfig,
  ForwardingKeywordLane,
  ForwardingKeywordRule,
  ForwardingKeywordRules,
  ForwardingTagRule,
};
