import { collapseRepeated } from "./collapseRepeated.ts";
import type { McpAccessibilityConfig } from "./constants.ts";

const NOISE_PATTERNS: RegExp[] = [/^\s*-\s*generic:?\s*$/gm, /^\s*-\s*text:\s*""\s*$/gm];

export function smartFilterText(text: string, config: McpAccessibilityConfig): string {
  if (typeof text !== "string" || text.length < config.minLengthToProcess) {
    return text;
  }
  let out = text;
  for (const pattern of NOISE_PATTERNS) {
    out = out.replace(pattern, "");
  }
  out = collapseRepeated(
    out,
    config.collapseThreshold,
    config.collapseKeepHead,
    config.collapseKeepTail
  );

  if (out.length > config.maxTextChars) {
    const headSize = config.maxTextChars - 300;
    const head = out.slice(0, headSize);
    const omitted = text.length - head.length;
    out =
      `${head}\n\n... [truncated ${omitted} chars by OmniRoute MCP filter. ` +
      `Page is large; ask user to scroll/navigate to a specific section, or click an element with the refs shown above]`;
  }
  return out;
}

export type { McpAccessibilityConfig } from "./constants.ts";
export { DEFAULT_MCP_ACCESSIBILITY_CONFIG } from "./constants.ts";
