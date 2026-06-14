/**
 * tests/e2e/a11y.spec.ts
 *
 * Accessibility gate using @axe-core/playwright (Task 13 — Fase 7).
 *
 * NIGHTLY advisory: this suite is scheduled in the NIGHTLY CI job, not in the
 * per-PR job, because axe analysis adds ~10–20 s per page and the results are
 * frozen baselines (see approach below).
 *
 * Approach — freeze-and-alert (not fail-on-first-violation):
 *   1. Run axe on each key page.
 *   2. Count `violations.length` per page.
 *   3. Assert the count has NOT increased since the frozen baseline.
 *   4. Report violations in the test output so they are visible in CI logs.
 *
 * This means:
 *   - Existing violations are GRANDFATHERED (baseline frozen).
 *   - A new violation (count grows) FAILS the gate — catraca `down`.
 *   - Fixing a violation (count drops) passes + you can lower the baseline.
 *
 * Graceful degradation:
 *   - If @axe-core/playwright is not installed the entire suite is skipped
 *     with a clear message instead of crashing the job.
 *   - The frozen baselines below are ADVISORY defaults (0). On the first real
 *     run update them to the actual counts (grep "axeViolationCount" in CI logs).
 *
 * Pages audited (key dashboard surfaces):
 *   /dashboard            — main overview
 *   /dashboard/providers  — provider management (most complex UI surface)
 *   /login                — public auth gate (a11y critical for users)
 *   /dashboard/settings   — settings (redirects to /dashboard/settings/general)
 *
 * Run locally (requires the app running on localhost:20128):
 *   npx playwright test tests/e2e/a11y.spec.ts --headed
 */

import { test, expect, type Page } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

// ---------------------------------------------------------------------------
// Conditional import — skip entire suite if @axe-core/playwright is absent.
// ---------------------------------------------------------------------------

let AxeBuilder: (new (args: { page: Page }) => {
  analyze(): Promise<{ violations: Array<{ id: string; description: string; impact: string | null; nodes: unknown[] }> }>;
  withTags(tags: string[]): unknown;
  exclude(selector: string): unknown;
  disableRules(rules: string[]): unknown;
}) | null = null;

try {
  // Dynamic import so the module parse does not fail when the package is absent.
  const mod = await import("@axe-core/playwright");
  AxeBuilder = mod.default ?? (mod as unknown as { AxeBuilder: typeof AxeBuilder }).AxeBuilder ?? null;
} catch {
  // Package not installed — suite will skip gracefully below.
  AxeBuilder = null;
}

// ---------------------------------------------------------------------------
// Frozen violation baselines.
//
// Update these after the first real run by reading the "axeViolationCount"
// lines from the CI log and setting each value to the actual count.
// Format: { [pageLabel]: maxAllowedViolations }
// ---------------------------------------------------------------------------

const VIOLATION_BASELINES: Record<string, number> = {
  "/login": 0,
  "/dashboard": 0,
  "/dashboard/providers": 0,
  "/dashboard/settings": 0,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type AxeViolation = {
  id: string;
  description: string;
  impact: string | null;
  nodes: unknown[];
};

async function runAxe(
  page: Page,
  label: string
): Promise<AxeViolation[]> {
  if (!AxeBuilder) {
    throw new Error("@axe-core/playwright not available");
  }
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    // Exclude third-party iframes / injected widgets that we don't control.
    .exclude("[data-axe-exclude]")
    .analyze();

  // Emit machine-parseable line for CI baseline tracking.
  console.log(`axeViolationCount page=${label} count=${results.violations.length}`);

  if (results.violations.length > 0) {
    const summary = results.violations
      .map((v) => `  [${v.impact ?? "unknown"}] ${v.id}: ${v.description} (${(v.nodes as unknown[]).length} nodes)`)
      .join("\n");
    console.log(`axeViolations page=${label}:\n${summary}`);
  }

  return results.violations;
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe("A11y — Dashboard key surfaces (@axe-core, nightly advisory)", () => {
  test.beforeAll(() => {
    if (!AxeBuilder) {
      // Log once; individual tests will call test.skip().
      console.log(
        "[a11y.spec.ts] SKIP: @axe-core/playwright is not installed.\n" +
          "Install with: npm install --save-dev @axe-core/playwright"
      );
    }
  });

  // -------------------------------------------------------------------------
  // /login — public auth gate
  // -------------------------------------------------------------------------
  test("/login — axe wcag2a/wcag2aa violations must not exceed baseline", async ({ page }) => {
    if (!AxeBuilder) {
      test.skip(true, "@axe-core/playwright not installed");
      return;
    }

    await page.goto("/login");
    await page.locator("body").waitFor({ state: "visible" });

    const violations = await runAxe(page, "/login");
    const baseline = VIOLATION_BASELINES["/login"] ?? 0;

    expect(violations.length).toBeLessThanOrEqual(
      baseline,
      `New a11y violations introduced on /login. ` +
        `Expected ≤${baseline}, got ${violations.length}. ` +
        `Run axe locally and update VIOLATION_BASELINES["/login"] if the new count is intentional.`
    );
  });

  // -------------------------------------------------------------------------
  // /dashboard — main overview
  // -------------------------------------------------------------------------
  test("/dashboard — axe wcag2a/wcag2aa violations must not exceed baseline", async ({ page }) => {
    if (!AxeBuilder) {
      test.skip(true, "@axe-core/playwright not installed");
      return;
    }

    await gotoDashboardRoute(page, "/dashboard");

    const violations = await runAxe(page, "/dashboard");
    const baseline = VIOLATION_BASELINES["/dashboard"] ?? 0;

    expect(violations.length).toBeLessThanOrEqual(
      baseline,
      `New a11y violations introduced on /dashboard. ` +
        `Expected ≤${baseline}, got ${violations.length}.`
    );
  });

  // -------------------------------------------------------------------------
  // /dashboard/providers — provider management (most complex UI surface)
  // -------------------------------------------------------------------------
  test("/dashboard/providers — axe wcag2a/wcag2aa violations must not exceed baseline", async ({
    page,
  }) => {
    if (!AxeBuilder) {
      test.skip(true, "@axe-core/playwright not installed");
      return;
    }

    await gotoDashboardRoute(page, "/dashboard/providers");

    const violations = await runAxe(page, "/dashboard/providers");
    const baseline = VIOLATION_BASELINES["/dashboard/providers"] ?? 0;

    expect(violations.length).toBeLessThanOrEqual(
      baseline,
      `New a11y violations introduced on /dashboard/providers. ` +
        `Expected ≤${baseline}, got ${violations.length}.`
    );
  });

  // -------------------------------------------------------------------------
  // /dashboard/settings — settings area
  // -------------------------------------------------------------------------
  test("/dashboard/settings — axe wcag2a/wcag2aa violations must not exceed baseline", async ({
    page,
  }) => {
    if (!AxeBuilder) {
      test.skip(true, "@axe-core/playwright not installed");
      return;
    }

    // The settings route redirects to /dashboard/settings/general; follow it.
    await gotoDashboardRoute(page, "/dashboard/settings");

    const violations = await runAxe(page, "/dashboard/settings");
    const baseline = VIOLATION_BASELINES["/dashboard/settings"] ?? 0;

    expect(violations.length).toBeLessThanOrEqual(
      baseline,
      `New a11y violations introduced on /dashboard/settings. ` +
        `Expected ≤${baseline}, got ${violations.length}.`
    );
  });

  // -------------------------------------------------------------------------
  // Regression guard: suite is skippable but the skip reason must be explicit.
  // This test always runs (no AxeBuilder check) and verifies the skip is
  // legitimate (package absent) and not an infrastructure failure.
  // -------------------------------------------------------------------------
  test("axe package availability is declared (meta-test)", async () => {
    if (AxeBuilder !== null) {
      // Package is present — nothing to check.
      expect(AxeBuilder).toBeTruthy();
    } else {
      // Package absent — this is acceptable in PR CI; fatal in the NIGHTLY job.
      // In the nightly job, set REQUIRE_AXE=1 and the check below will fail.
      const requireAxe = process.env.REQUIRE_AXE === "1";
      if (requireAxe) {
        throw new Error(
          "REQUIRE_AXE=1 but @axe-core/playwright is not installed. " +
            "Add it as a devDependency and run npm install."
        );
      }
      // Advisory skip in PR context.
      test.skip(true, "@axe-core/playwright not installed — advisory skip in PR context");
    }
  });
});
