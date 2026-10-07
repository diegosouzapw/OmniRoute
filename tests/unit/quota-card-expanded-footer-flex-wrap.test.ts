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

  // Assert footer container has flex-wrap and border-t
  assert.match(
    content,
    /className="[^"]*flex\s+flex-wrap[^"]*border-t[^"]*"/,
    "Footer container must include flex-wrap to allow wrapping on narrow cards"
  );

  // Assert buttons container has flex-wrap
  assert.match(
    content,
    /className="[^"]*flex\s+flex-wrap[^"]*ml-auto[^"]*"/,
    "Action buttons container must include flex-wrap to prevent pushing Refresh now button off-screen"
  );

  // Assert Refresh now button has shrink-0
  assert.ok(
    content.includes("inline-flex shrink-0 items-center gap-1 text-[11px] font-medium") &&
      content.includes('tr("forceRefresh", "Refresh now")'),
    "Action buttons must include shrink-0 to prevent compression"
  );
});
