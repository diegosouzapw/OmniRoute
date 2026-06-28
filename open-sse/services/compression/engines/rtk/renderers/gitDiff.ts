import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

/**
 * RTK semantic renderer for `git diff` / `git show` output.
 *
 * Keeps only:
 *  - `diff --git a/... b/...` file header lines
 *  - `@@ ... @@` hunk headers
 *  - change lines starting with `+` or `-` (but NOT `+++`/`---`)
 *
 * Everything else (context lines, index lines, mode lines, etc.) is dropped.
 * If no hunk header is found, returns no-op (input is not a real diff).
 */
export function renderGitDiff(text: string, _detection: CommandDetectionResult): RenderResult {
  // Guard: must have at least one hunk header
  if (!text.includes("@@ ")) {
    return NO_RENDER(text);
  }

  const kept: string[] = [];
  for (const line of text.split("\n")) {
    if (
      line.startsWith("diff --git ") ||
      line.startsWith("@@ ")
    ) {
      kept.push(line);
    } else if (/^[+-](?![+-])/.test(line)) {
      // change line (+foo or -foo) but NOT +++ or ---
      kept.push(line);
    }
    // drop: context lines (space), index lines, --- a/, +++ b/, mode lines, etc.
  }

  const out = kept.join("\n");
  if (out === text) return NO_RENDER(text);

  return { text: out, changed: true, renderer: "git-diff" };
}
