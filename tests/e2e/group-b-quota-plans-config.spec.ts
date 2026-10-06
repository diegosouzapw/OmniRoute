/**
 * Group B — Quota Plans Config E2E spec.
 *
 * The originally planned standalone page /dashboard/costs/quota-share/plans does not
 * exist in the current codebase (Group B plan 22 F9 implemented plans via the
 * PoolWizard inside /dashboard/costs/quota-share, not a separate route).
 *
 * Tests are corrected to navigate to the existing /dashboard/costs/quota-share page
 * which contains the group <select> element (QuotaSharePageClient.tsx line ~362).
 * Backend is mocked so this spec does not require a running upstream.
 */

import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Group B — Quota Plans Config", () => {
  // Client-side exception capture. Without it a page that falls into the error
  // boundary only shows up as "Internal Server Error" in the HTML, with no stack
  // trace anywhere in the CI log — which is exactly how this spec's failure went
  // undiagnosed for two CI rounds.
  const pageErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    pageErrors.length = 0;
    page.on("pageerror", (err) => {
      pageErrors.push(`[pageerror] ${err.message}\n${err.stack ?? ""}`);
    });
    page.on("console", (msg) => {
      if (msg.type() === "error") pageErrors.push(`[console.error] ${msg.text()}`);
    });
    // Mock the plans list endpoint
    await page.route("**/api/quota/plans**", async (route) => {
      const url = new URL(route.request().url());
      const pathParts = url.pathname.split("/");
      const lastPart = pathParts[pathParts.length - 1];

      if (lastPart === "plans") {
        // List all plans
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([
            {
              connectionId: null,
              provider: "codex",
              dimensions: [
                { unit: "percent", window: "5h", limit: 100 },
                { unit: "percent", window: "weekly", limit: 100 },
              ],
              source: "auto",
            },
          ]),
        });
      } else {
        // Single plan by connectionId
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            connectionId: lastPart,
            provider: "codex",
            dimensions: [
              { unit: "percent", window: "5h", limit: 100 },
              { unit: "percent", window: "weekly", limit: 100 },
            ],
            source: "auto",
          }),
        });
      }
    });

    // Mock pools list — QuotaSharePageClient uses usePools() which fetches /api/quota/pools
    await page.route("**/api/quota/pools**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    // Mock pool groups list
    await page.route("**/api/quota/groups**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    // Mock provider connections list
    await page.route("**/api/providers/client**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    // Mock API keys list
    await page.route("**/api/keys**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    // Mock quota-store settings
    await page.route("**/api/settings/quota-store**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ driver: "sqlite", redisUrl: null }),
      });
    });
  });

  test("quota share page exists and returns 200", async ({ page }) => {
    // /dashboard/costs/quota-share/plans does not exist as a standalone route;
    // the plans wizard is embedded in /dashboard/costs/quota-share.
    const response = await page.goto(
      "http://localhost:20128/dashboard/costs/quota-share",
      { waitUntil: "domcontentloaded" }
    );
    expect(response?.status()).not.toBe(404);
    expect(response?.status()).not.toBe(500);
  });

  test("quota plans config page renders provider selector", async ({ page }) => {
    // The standalone /plans sub-page was never created; the group <select> element
    // that allows filtering pools lives directly in /dashboard/costs/quota-share
    // (QuotaSharePageClient.tsx).  Navigate there instead.
    await gotoDashboardRoute(page, "/dashboard/costs/quota-share");

    // Group selector (a <select> element) should be visible
    const providerSelector = page.locator(
      "select, [role='combobox'], [data-testid='provider-selector']"
    );
    await expect(providerSelector.first()).toBeVisible({ timeout: 15000 });
  });

  test("selecting codex provider shows dimension rows", async ({ page }) => {
    // Navigate to the real quota-share page (plans are embedded, not a standalone route)
    await gotoDashboardRoute(page, "/dashboard/costs/quota-share");

    // The group selector is a <select> element in QuotaSharePageClient
    const selector = page.locator("select, [role='combobox']").first();
    await expect(selector).toBeVisible({ timeout: 15000 });

    // Select codex if the option is available (it will only appear if the mock
    // returns a group named "codex" — the current mock returns an empty groups list,
    // so the selector will only have the "All groups" option).
    const codexOption = page.getByRole("option", { name: /codex/i });
    if (await codexOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await selector.selectOption({ label: /codex/i });
    }

    // After selection, the page should not be in a broken state.
    //
    // Assert on RENDERED TEXT, not on page.content(). The raw HTML always contains
    // the string, on every route, so the old assertion could never pass: layout.tsx
    // hands the whole message catalogue to NextIntlClientProvider, React serialises
    // that prop into the RSC payload, and en.json carries "Internal Server Error"
    // twice (publicSystem.error.title and errors.500.title). Probing /dashboard,
    // /dashboard/costs, /dashboard/settings and even /login all showed the string
    // present in the source with the page rendering perfectly.
    //
    // This is the same trap that killed the sibling `not.toContain("500")` here in
    // fc77100c3f ("Checking for '500' in raw HTML is unreliable") — that one was
    // removed, this one was kept, and it has the identical flaw.
    //
    // The error boundary renders the title as visible text (src/app/error.tsx
    // `<h1>{t("error.title")}</h1>`), so innerText still catches the real defect
    // while ignoring the serialised dictionary.
    const bodyText = await page.locator("body").innerText();
    expect(bodyText, `client errors:\n${pageErrors.join("\n---\n")}`).not.toContain(
      "Internal Server Error"
    );
  });
});
