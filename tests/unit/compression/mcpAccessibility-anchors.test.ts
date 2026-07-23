import { test } from "node:test";
import assert from "node:assert/strict";
import { smartFilterText } from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/index.ts";
import { DEFAULT_MCP_ACCESSIBILITY_CONFIG } from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/constants.ts";

/** Regex-extract every [ref=eNN] anchor from a blob, as a sorted unique list. */
function extractRefs(s: string): string[] {
  const refs = new Set<string>();
  for (const m of s.matchAll(/\[ref=e\d+\]/g)) {
    refs.add(m[0]);
  }
  return [...refs].sort();
}

/**
 * Build a realistic accessibility snapshot: a `list` with 40 `listitem` siblings, each carrying a
 * clickable child `link "..." [ref=eNN]`, with interleaved `- generic:` / `- text: ""` noise lines
 * between siblings (exactly the kind of tree real MCP accessibility dumps produce).
 */
function buildSnapshot(): string {
  const lines: string[] = ['- list "Results":'];
  for (let i = 0; i < 40; i++) {
    lines.push(`  - listitem:`);
    lines.push(`    - generic:`);
    lines.push(`    - link "Result ${i}" [ref=e${i}]`);
    lines.push(`    - text: ""`);
    // interleaved noise BETWEEN siblings — this is what breaks the sibling run for collapse
    lines.push(`  - generic:`);
    lines.push(`  - text: ""`);
  }
  // pad past minLengthToProcess so smartFilterText actually runs
  return lines.join("\n").padEnd(3000, " ");
}

test("collapse fires on interleaved tree AND no [ref=eXX] anchor is lost", () => {
  const input = buildSnapshot();
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);

  // BUG B: collapse must actually fire despite interleaved noise lines.
  assert.ok(out.length < input.length, "output shorter (compressed)");
  assert.ok(
    out.includes('items omitted by OmniRoute MCP filter'),
    "collapse notice present (collapse fired)"
  );

  // BUG A: every [ref=eNN] in the input must survive in the output (agent can still click them).
  const inRefs = extractRefs(input);
  const outRefs = extractRefs(out);
  assert.equal(inRefs.length, 40, "sanity: 40 refs in input");
  for (const r of inRefs) {
    assert.ok(outRefs.includes(r), `ref ${r} must survive collapse (extractRefs(input) ⊆ extractRefs(output))`);
  }

  // It still compresses meaningfully.
  const savings = input.length - out.length;
  assert.ok(savings > 0, "savings > 0");
});
