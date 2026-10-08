import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const COMPONENT_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded.tsx"
);

test("QuotaCardExpanded footer enables flex-wrap to prevent action button clipping", () => {
  const content = fs.readFileSync(COMPONENT_PATH, "utf8");

  // contract changed by #15138: the footer was redesigned for narrow cards — the
  // "Refresh now" action became a fixed-size icon button on its own row (shrink-0 +
  // ml-auto, so it can never be pushed off-screen) and the remaining actions moved
  // into an auto-fit grid that wraps instead of a flex-wrap row. The #11464 invariant
  // (no action button is clipped on narrow cards) is kept below; the real-browser
  // layout check lives in tests/helpers/assertQuotaCardLayout.cjs.

  // Footer container keeps the border-t separator and can shrink with the card
  assert.match(
    content,
    /className="[^"]*min-w-0[^"]*border-t[^"]*"/,
    "Footer container must be shrinkable (min-w-0) and keep the border-t separator"
  );

  // Secondary action buttons wrap via an auto-fit grid instead of overflowing
  assert.match(
    content,
    /className="grid min-w-0 grid-cols-\[repeat\(auto-fit,minmax\(min\(100%,[^"]*\)\)\]/,
    "Action buttons container must wrap (auto-fit grid) to prevent clipping on narrow cards"
  );

  // Refresh now button is never compressed or pushed off-screen
  assert.ok(
    /className="ml-auto inline-flex size-7 shrink-0 /.test(content) &&
      content.includes('aria-label={tr("forceRefresh", "Refresh now")}'),
    "Refresh now button must be a shrink-0 ml-auto icon button with an accessible label"
  );
});
