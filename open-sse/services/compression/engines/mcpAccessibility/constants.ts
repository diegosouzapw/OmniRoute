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
