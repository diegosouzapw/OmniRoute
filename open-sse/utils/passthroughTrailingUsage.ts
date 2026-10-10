import { estimateUsage } from "./usageTracking.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UsageRecord = Record<string, any>;

/**
 * Passthrough chat path: resolve the usage for a trailing usage-only
 * (`choices: []`) summary frame.
 *
 * - Some upstreams (e.g. Ollama Cloud) emit `prompt_tokens: 0` although input
 *   was sent; estimate the input count from the request body (mutates `summary`,
 *   which is what gets forwarded to the client).
 * - #15619: the real trailing summary wins over the finish-chunk usage
 *   (last-wins, never summed); fields the summary omits (e.g. completion_tokens)
 *   are kept from the previous usage.
 */
export function resolveTrailingUsageSummary(
  summary: UsageRecord,
  previous: unknown,
  body: unknown,
  totalContentLength: number,
  sourceFormat: string
) {
  if (typeof summary === "object" && !Array.isArray(summary) && summary.completion_tokens > 0) {
    if ((summary.prompt_tokens ?? 0) === 0) {
      const estimated = estimateUsage(body, totalContentLength, sourceFormat);
      if (estimated?.prompt_tokens > 0) {
        summary.prompt_tokens = estimated.prompt_tokens;
        summary.total_tokens = (summary.total_tokens ?? 0) + estimated.prompt_tokens;
      }
    }
  }
  if (previous && typeof previous === "object" && !Array.isArray(previous)) {
    return { ...previous, ...summary };
  }
  return summary;
}
