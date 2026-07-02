import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

/**
 * F5.2 — Combo Live Studio (Tela B) smoke e2e.
 *
 * The cascade's per-target/per-provider logic is exhaustively unit-tested
 * (comboFlowModel reducer + enrich overlays) and the badges are vitest-covered
 * (ProviderCascadeNode). What unit tests CANNOT catch is a client-side render /
 * hydration crash on the real page — exactly the "no useTranslations trap on the
 * new page" risk the Tela B plan called out.
 *
 * This spec is that guard: it loads /dashboard/combos/live and asserts the studio
 * renders (cascade shell OR empty state). The visibility assertion IS the
 * hydration-trap guard — a `useTranslations`-outside-provider crash throws during
 * render, so neither testid would ever appear, and the page mounting at all proves
 * the U1b health-poll wiring (in the same client tree) loaded.
 *
 * Out of scope (kept unit-covered, to stay non-flaky): driving live combo cascades
 * (needs WS combo events an e2e cannot inject) and asserting console output
 * (dev-mode on-demand compilation emits transient fast-refresh noise the production
 * build CI runs against does not).
 */
test.describe("Combo Live Studio (Tela B)", () => {
  test("loads /dashboard/combos/live and renders the studio without crashing", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/combos/live");

    // The studio always renders one of these — never a blank/crashed page.
    const studioOrEmpty = page
      .locator('[data-testid="combo-live-studio"]')
      .or(page.locator('[data-testid="combo-live-studio-empty"]'))
      .first();
    await expect(studioOrEmpty).toBeVisible({ timeout: 30_000 });
  });
});
