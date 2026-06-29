import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

/**
 * RTK semantic renderer for `terraform plan` / `tofu plan` output.
 *
 * Extracts:
 *  - The canonical summary line `Plan: N to add, M to change, K to destroy.`
 *    reformatted as `Plan: +N ~M -K`
 *  - Resource lines `# <addr> will be <verb>`
 *
 * "No changes." output ⇒ no-op (already short enough).
 * If no `Plan:` line is found ⇒ no-op (conservative).
 */
export function renderTerraformPlan(
  text: string,
  _detection: CommandDetectionResult,
): RenderResult {
  // "No changes" is already compact — idempotent no-op
  if (/^No changes\./m.test(text)) return NO_RENDER(text);

  // Extract the canonical Plan summary line
  const planMatch = text.match(/Plan:\s+(\d+)\s+to add,\s+(\d+)\s+to change,\s+(\d+)\s+to destroy/);
  if (!planMatch) return NO_RENDER(text);

  const [, add, change, destroy] = planMatch;
  const summary = `Plan: +${add} ~${change} -${destroy}`;

  // Collect resource address lines: "  # <addr> will be <verb>"
  const resources: string[] = [];
  for (const line of text.split("\n")) {
    const m = line.match(/^\s+#\s+(\S+)\s+will\s+be\s+\S+/);
    if (m) {
      resources.push(`  # ${m[1]} will be ${line.trim().replace(/^#\s+\S+\s+will\s+be\s+/, "")}`);
    }
  }

  const out = [summary, ...resources].join("\n");
  return { text: out, changed: true, renderer: "terraform-plan" };
}
