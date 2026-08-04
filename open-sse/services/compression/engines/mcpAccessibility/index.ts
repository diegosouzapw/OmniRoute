import { collapseRepeated } from "./collapseRepeated.ts";
import { MCP_ACCESSIBILITY_TAIL_RESERVE, type McpAccessibilityConfig } from "./constants.ts";

// Per-line (non-global, anchored) noise matchers. Used to DELETE whole noise lines rather than
// blank them: `replace(pattern, "")` would leave empty strings behind, and a blank line between two
// sibling headers breaks collapseRepeated's sibling run (an empty line is neither a sibling header
// nor an indented child), so collapse would never fire on realistic interleaved trees.
const NOISE_LINE_PATTERNS: RegExp[] = [/^\s*-\s*generic:?\s*$/, /^\s*-\s*text:\s*""\s*$/];

function isNoiseLine(line: string): boolean {
  return NOISE_LINE_PATTERNS.some((p) => p.test(line));
}

export function smartFilterText(text: string, config: McpAccessibilityConfig): string {
  if (typeof text !== "string" || text.length < config.minLengthToProcess) {
    return text;
  }
  // Drop noise lines entirely (not blank them) so interleaved noise does not split sibling runs.
  let out = text
    .split("\n")
    .filter((line) => !isNoiseLine(line))
    .join("\n");
  out = collapseRepeated(
    out,
    config.collapseThreshold,
    config.collapseKeepHead,
    config.collapseKeepTail
  );

  if (out.length > config.maxTextChars) {
    // Clamp to >=0: a maxTextChars below the tail reservation would make headSize negative, and
    // slice(0, negative) counts from the END — silently keeping a wrong, oversized fragment
    // instead of the intended head. (clampMcpAccessibilityConfig keeps maxTextChars sane, but
    // smartFilterText is also called with raw configs in tests, so the clamp stays here too.)
    const headSize = Math.max(0, config.maxTextChars - MCP_ACCESSIBILITY_TAIL_RESERVE);
    const head = out.slice(0, headSize);
    // Measure omitted against the FILTERED text (out), not the raw input (text), which may
    // have shrunk via noise removal / collapse above.
    const omitted = out.length - head.length;
    out =
      `${head}\n\n... [truncated ${omitted} chars by OmniRoute MCP filter. ` +
      `Page is large; ask user to scroll/navigate to a specific section, or click an element with the refs shown above]`;
  }
  return out;
}

export type { McpAccessibilityConfig } from "./constants.ts";
export {
  DEFAULT_MCP_ACCESSIBILITY_CONFIG,
  clampMcpAccessibilityConfig,
  MCP_ACCESSIBILITY_TAIL_RESERVE,
} from "./constants.ts";
