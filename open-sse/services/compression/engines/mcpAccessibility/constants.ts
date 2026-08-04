export const MCP_ACCESSIBILITY_DEFAULTS = {
  maxTextChars: 50000,
  collapseThreshold: 30,
  collapseKeepHead: 10,
  collapseKeepTail: 5,
  minLengthToProcess: 2000,
  preserveRefPattern: /\[ref=e\d+\]/g,
} as const;

export type McpAccessibilityConfig = {
  enabled: boolean;
  maxTextChars: number;
  collapseThreshold: number;
  collapseKeepHead: number;
  collapseKeepTail: number;
  minLengthToProcess: number;
};

export const DEFAULT_MCP_ACCESSIBILITY_CONFIG: McpAccessibilityConfig = {
  enabled: true,
  maxTextChars: MCP_ACCESSIBILITY_DEFAULTS.maxTextChars,
  collapseThreshold: MCP_ACCESSIBILITY_DEFAULTS.collapseThreshold,
  collapseKeepHead: MCP_ACCESSIBILITY_DEFAULTS.collapseKeepHead,
  collapseKeepTail: MCP_ACCESSIBILITY_DEFAULTS.collapseKeepTail,
  minLengthToProcess: MCP_ACCESSIBILITY_DEFAULTS.minLengthToProcess,
};

/**
 * Chars `smartFilterText` reserves for the truncation tail/notice (`maxTextChars - this` is the
 * head kept). A `maxTextChars` at or below this leaves no head, so the whole tool result would be
 * replaced by the notice. The engine and the config bounds must agree on this number.
 */
export const MCP_ACCESSIBILITY_TAIL_RESERVE = 300;

/**
 * Minimum sane `maxTextChars`: below this the truncated head is too small to be useful (or empty).
 * Values in `(0, MIN)` are treated as misconfiguration and fall back to the default.
 */
export const MCP_ACCESSIBILITY_MIN_MAX_TEXT_CHARS = MCP_ACCESSIBILITY_TAIL_RESERVE * 2;

function boundedInt(value: unknown, min: number, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value >= min
    ? Math.floor(value)
    : fallback;
}

/**
 * Bound a raw/persisted mcpAccessibility config into a safe, fully-populated config. Centralizes
 * the numeric floors so both the DB normalizer and the live MCP-server read path agree (a small
 * `maxTextChars` would otherwise make `smartFilterText` truncate the whole text away).
 */
export function clampMcpAccessibilityConfig(raw: unknown): McpAccessibilityConfig {
  const record = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const d = DEFAULT_MCP_ACCESSIBILITY_CONFIG;
  return {
    enabled: record["enabled"] !== false,
    maxTextChars: boundedInt(record["maxTextChars"], MCP_ACCESSIBILITY_MIN_MAX_TEXT_CHARS, d.maxTextChars),
    collapseThreshold: boundedInt(record["collapseThreshold"], 1, d.collapseThreshold),
    collapseKeepHead: boundedInt(record["collapseKeepHead"], 0, d.collapseKeepHead),
    collapseKeepTail: boundedInt(record["collapseKeepTail"], 0, d.collapseKeepTail),
    minLengthToProcess: boundedInt(record["minLengthToProcess"], 1, d.minLengthToProcess),
  };
}
