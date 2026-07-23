import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";

// Regression guard for the browser-extension hydration-mismatch fix: extensions
// like Bitdefender (bis_skin_checked), Google Search (data-google-query-id),
// Grammarly (data-new-gr-c-s-check-loaded / data-gr-ext-installed) and
// LanguageTool (data-lt-installed / data-lt-tmp-id) inject attributes into the
// DOM after SSR but before React hydrates. React's suppressHydrationWarning on
// <html>/<body> only applies one level deep, so the mismatch still surfaces on
// Next.js's internal elements. The fix adds a synchronous pre-hydration <script>
// in src/app/layout.tsx that strips the known attributes from
// document.documentElement and keeps stripping late injections via a
// MutationObserver that auto-disconnects after 5s. These assertions fail on the
// pre-fix tree (no such script present) and stay green afterwards, preventing a
// future layout.tsx refactor from silently dropping this script.

const cwd = process.cwd();
const layoutPath = resolve(join(cwd, "src/app/layout.tsx"));

const EXPECTED_ATTRS = [
  "bis_skin_checked",
  "data-google-query-id",
  "data-new-gr-c-s-check-loaded",
  "data-gr-ext-installed",
  "data-lt-installed",
  "data-lt-tmp-id",
];

test("layout.tsx strips the full known browser-extension attribute list before hydration", () => {
  const layout = readFileSync(layoutPath, "utf8");
  for (const attr of EXPECTED_ATTRS) {
    assert.ok(
      layout.includes(`"${attr}"`),
      `layout.tsx must list "${attr}" among the pre-hydration extension attributes to strip`
    );
  }
  assert.match(
    layout,
    /removeAttribute\s*\(\s*ATTRS\s*\[\s*i\s*\]\s*\)/,
    "layout.tsx must call removeAttribute for each known extension attribute"
  );
});

test("layout.tsx observes late attribute injections via MutationObserver and auto-disconnects", () => {
  const layout = readFileSync(layoutPath, "utf8");
  assert.match(
    layout,
    /new MutationObserver\s*\(/,
    "layout.tsx must set up a MutationObserver to catch extension attributes injected after the initial strip"
  );
  assert.match(
    layout,
    /attributeFilter\s*:\s*ATTRS/,
    "the MutationObserver must filter on the same known extension ATTRS list"
  );
  assert.match(
    layout,
    /setTimeout\s*\(\s*function\s*\(\s*\)\s*\{\s*obs\.disconnect\(\)\s*;?\s*\}\s*,\s*5000\s*\)/,
    "the MutationObserver must auto-disconnect after 5s (well past typical hydration) to avoid a long-lived observer"
  );
});

test("layout.tsx strips extension attributes from document.documentElement synchronously (before React hydrates)", () => {
  const layout = readFileSync(layoutPath, "utf8");
  assert.match(
    layout,
    /strip\s*\(\s*document\.documentElement\s*\)/,
    "layout.tsx must run the strip synchronously against document.documentElement on initial script execution"
  );
});
