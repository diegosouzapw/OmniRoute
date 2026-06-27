import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for the escalated mesh report "Nobody solve this color issue 🤫":
// the update-step status icon for the `warning` state used a bare `text-yellow-500`
// (Tailwind #eab308, no dark: variant) while its `done`/`failed` siblings use the
// vivid `text-green-500` / `text-red-500`. yellow-500 has poor contrast on light
// backgrounds (~1.9:1, fails WCAG) and is inconsistent with the project's warning
// convention, which is `amber` everywhere else in this same component (e.g. the
// `bg-amber-500/10 text-amber-500` badge). The warning icon must use amber, not yellow.

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  resolve(here, "../../../src/app/(dashboard)/dashboard/HomePageClient.tsx"),
  "utf8"
);

// Isolate the update-step status-icon block: the `warning` material symbol icon span.
// Match the className on the span immediately preceding the `warning` glyph.
const warningIconMatch = source.match(
  /className="material-symbols-outlined ([^"]*)"[^>]*>\s*warning\s*</
);

test("update-step warning icon renders with an amber color, not bare yellow", () => {
  assert.ok(
    warningIconMatch,
    "expected to find the update-step `warning` material-symbols icon span in HomePageClient.tsx"
  );
  const className = warningIconMatch![1];
  assert.ok(
    className.includes("text-amber-500"),
    `warning icon should use the project's amber warning convention; got: "${className}"`
  );
  assert.ok(
    !className.includes("text-yellow-500"),
    "warning icon must not use the low-contrast bare `text-yellow-500` (no dark variant, fails WCAG on light backgrounds)"
  );
});
