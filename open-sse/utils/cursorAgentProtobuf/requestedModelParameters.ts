export const CURSOR_EFFORT_SUFFIXES = ["low", "medium", "high", "xhigh", "max"] as const;

type CursorRequestedModel = {
  modelId: string;
  parameters: Array<{ id: string; value: string }>;
};

const CURSOR_ONE_MILLION_SUFFIX = "-1m";
const CURSOR_GPT_REASONING_LEVELS = ["none", ...CURSOR_EFFORT_SUFFIXES] as const;

const CURSOR_CLAUDE_ONE_MILLION_FAMILIES = [
  {
    legacyPrefix: "claude-fable-5-1",
    modelId: "claude-fable-5-1",
    supportsFast: false,
    trailingThinking: false,
  },
  {
    legacyPrefix: "claude-opus-5",
    modelId: "claude-opus-5",
    supportsFast: true,
    trailingThinking: false,
  },
  {
    legacyPrefix: "claude-opus-4-8",
    modelId: "claude-opus-4-8",
    supportsFast: true,
    trailingThinking: false,
  },
  {
    legacyPrefix: "claude-sonnet-5",
    modelId: "claude-sonnet-5",
    supportsFast: false,
    trailingThinking: false,
  },
  {
    legacyPrefix: "claude-4.6-sonnet",
    modelId: "claude-sonnet-4-6",
    supportsFast: false,
    trailingThinking: true,
  },
] as const;

type CursorClaudeOneMillionFamily = (typeof CURSOR_CLAUDE_ONE_MILLION_FAMILIES)[number];

function isCursorEffort(value: string): value is (typeof CURSOR_EFFORT_SUFFIXES)[number] {
  return CURSOR_EFFORT_SUFFIXES.some((effort) => effort === value);
}

function resolveGptOneMillionContextModel(legacyId: string): CursorRequestedModel | null {
  const match = /^(gpt-5\.6-(?:sol|terra|luna))-(none|low|medium|high|xhigh|max)$/.exec(legacyId);
  if (!match) return null;

  const [, modelId, reasoning] = match;
  if (!CURSOR_GPT_REASONING_LEVELS.some((level) => level === reasoning)) return null;
  return {
    modelId,
    parameters: [
      { id: "context", value: "1m" },
      { id: "reasoning", value: reasoning },
      { id: "fast", value: "false" },
    ],
  };
}

function resolveClaudeOneMillionVariant(
  legacyId: string,
  family: CursorClaudeOneMillionFamily
): CursorRequestedModel | null {
  const prefix = `${family.legacyPrefix}-`;
  if (!legacyId.startsWith(prefix)) return null;

  let variant = legacyId.slice(prefix.length);
  const fast = variant.endsWith("-fast");
  if (fast) variant = variant.slice(0, -"-fast".length);
  if (fast && !family.supportsFast) return null;

  const trailingThinking = family.trailingThinking && variant.endsWith("-thinking");
  const leadingThinking = !family.trailingThinking && variant.startsWith("thinking-");
  if (trailingThinking) variant = variant.slice(0, -"-thinking".length);
  if (leadingThinking) variant = variant.slice("thinking-".length);
  if (!isCursorEffort(variant)) return null;

  const parameters = [
    { id: "thinking", value: String(trailingThinking || leadingThinking) },
    { id: "context", value: "1m" },
    { id: "effort", value: variant },
  ];
  if (family.supportsFast) parameters.push({ id: "fast", value: String(fast) });
  return { modelId: family.modelId, parameters };
}

function resolveClaudeOneMillionContextModel(legacyId: string): CursorRequestedModel | null {
  for (const family of CURSOR_CLAUDE_ONE_MILLION_FAMILIES) {
    const resolved = resolveClaudeOneMillionVariant(legacyId, family);
    if (resolved) return resolved;
  }
  return null;
}

/**
 * Cursor reuses each legacy slug for both its default and 1M context variants,
 * so the public catalog adds a terminal `-1m` discriminator. Translate that
 * synthetic id to the canonical wire model plus the complete parameter set
 * reported by Cursor's AvailableModels metadata.
 */
export function resolveOneMillionContextModel(normalized: string): CursorRequestedModel | null {
  if (!normalized.endsWith(CURSOR_ONE_MILLION_SUFFIX)) return null;
  const legacyId = normalized.slice(0, -CURSOR_ONE_MILLION_SUFFIX.length);
  return (
    resolveGptOneMillionContextModel(legacyId) ?? resolveClaudeOneMillionContextModel(legacyId)
  );
}
