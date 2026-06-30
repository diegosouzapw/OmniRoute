import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Regression guard for #5427: the "Add Provider" / onboarding route
// (src/app/(dashboard)/dashboard/providers/new/page.tsx) was a redirect stub
// that bounced to /dashboard/providers, so every wizard button silently failed
// and the fully-built ProviderOnboardingWizard component stayed orphaned
// (never imported by any route). This asserts the route renders the wizard
// instead of redirecting, and that the wizard is wired into at least one route.

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const newRoute = join(
  repoRoot,
  "src/app/(dashboard)/dashboard/providers/new/page.tsx"
);

test("#5427: new-provider route does NOT redirect (no longer a silent stub)", () => {
  const src = readFileSync(newRoute, "utf8");
  assert.ok(
    !/from\s+["']next\/navigation["']/.test(src) || !/\bredirect\s*\(/.test(src),
    "new/page.tsx must not call redirect() from next/navigation — that reintroduces the #5427 silent failure"
  );
});

test("#5427: new-provider route renders ProviderOnboardingWizard", () => {
  const src = readFileSync(newRoute, "utf8");
  assert.match(
    src,
    /ProviderOnboardingWizard/,
    "new/page.tsx must render the ProviderOnboardingWizard component"
  );
});
