import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

/**
 * T03 — Compression Studio (Tela A) smoke e2e (gaps v3.8.42).
 *
 * The studio's reducers/renderers (compressionFlowModel, WaterfallInspector,
 * CompressionCockpit, PlayView/CompareView) are unit/vitest-covered. What unit tests
 * CANNOT catch is a client-side render / hydration crash on the real page — the same
 * "no `useTranslations` trap" risk the compression-UI plan flagged. The existing
 * combo-live-studio spec guards `/dashboard/combos/live`; this is its missing
 * counterpart for the dedicated compression studio (Tela A), which that spec does not
 * touch.
 *
 * It loads /dashboard/compression/studio and asserts the studio mounts (Play tab + its
 * lane), then flips to the Compare tab and asserts the switch took effect. The
 * visibility assertions ARE the hydration-trap guard: a render-time crash would mean
 * none of these testids ever appear.
 *
 * Out of scope (kept unit-covered, to stay non-flaky): driving a live WS compression
 * cascade (needs `compression.step` events an e2e cannot inject) and asserting console
 * output (dev-mode on-demand compilation emits transient fast-refresh noise).
 */
test.describe("Compression Studio (Tela A)", () => {
  test("loads /dashboard/compression/studio and renders the Play lane without crashing", async ({
    page,
  }) => {
    await gotoDashboardRoute(page, "/dashboard/compression/studio");

    const playTab = page.locator('[data-testid="tab-play"]');
    await expect(playTab).toBeVisible({ timeout: 30_000 });
    // Play view is the default tab → its playground input proves the studio body mounted.
    // NOTE: the per-lane `play-lane` buttons only render AFTER a preview-compression run
    // populates `batch.lanes` (usePreviewCompression keeps `batch` null until `run()` is
    // called — there is no mount auto-run). This smoke test intentionally does not drive a
    // compression cascade (see the "Out of scope" note above), so asserting `play-lane`
    // here can never become visible. Anchor on the always-present input panel instead.
    await expect(page.locator('[data-testid="play-input"]')).toBeVisible({
      timeout: 30_000,
    });
  });

  test("switches from Play to Compare", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/compression/studio");

    const compareTab = page.locator('[data-testid="tab-compare"]');
    await expect(compareTab).toBeVisible({ timeout: 30_000 });
    await compareTab.click();
    await expect(compareTab).toHaveAttribute("aria-pressed", "true");
    // Compare view mounted → its load control is present.
    await expect(page.locator('[data-testid="compare-load"]').first()).toBeVisible({
      timeout: 30_000,
    });
  });
});
