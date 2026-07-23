import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Repro for issue #7680 — RTL layout compatibility.
//
// OmniRoute sets <html dir="rtl"> for ar/fa/he/ur locales (src/app/layout.tsx:61,
// config/i18n.json "rtl": ["ar","fa","he","ur"]) but src/app/globals.css has zero
// logical-property / RTL-mirroring rules, while dashboard components use Tailwind's
// *physical* spacing utilities (ml-/mr-/pl-/pr-/left-/right-/border-l-/border-r-).
// Tailwind v4 (this project: package.json "tailwindcss": "^4.3.0") always compiles
// `ml-1` to the physical `margin-left` declaration — it is NOT dir-aware and will
// NOT mirror under dir="rtl". Only the *logical* utilities (ms-/me-/ps-/pe-/start-/
// end-) compile to CSS logical properties (margin-inline-start, etc.) that the
// browser mirrors automatically based on the element's direction.
//
// This is the exact row from the reporter's screenshot: the action-icon cluster
// (edit / proxy / delete / retest buttons) next to the connection Toggle in the
// provider connection list. Under dir="rtl" the physical `ml-1` margin lands on
// the wrong side of the flipped flex row, crowding the icon group against the
// Toggle instead of spacing it away — visually reproducing the screenshot.
const rowFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "src",
  "app",
  "(dashboard)",
  "dashboard",
  "providers",
  "[id]",
  "components",
  "ConnectionRow.tsx"
);

test("ConnectionRow action-icon wrapper must use an RTL-mirroring (logical) spacing utility, not a physical one", () => {
  const source = readFileSync(rowFile, "utf8");

  const match = source.match(
    /<div className="flex gap-1 ([^"]*)transition-opacity">/
  );
  assert.ok(match, "expected to find the action-icon wrapper div in ConnectionRow.tsx");

  const spacingClasses = match![1];

  const physicalUtilityRe = /\b(ml-|mr-|pl-|pr-|left-|right-|border-l-|border-r-)\S/;
  assert.ok(
    !physicalUtilityRe.test(spacingClasses),
    `action-icon wrapper still uses a physical (non-mirroring) spacing utility: "${spacingClasses}". ` +
      `Under dir="rtl" this class computes the same physical CSS property regardless of direction, so the ` +
      `spacing lands on the wrong side once the flex row visually mirrors — reproducing issue #7680. ` +
      `Use the logical equivalent (e.g. ms-1/me-1) instead.`
  );
});
