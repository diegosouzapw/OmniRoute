/**
 * E2E (Playwright) — Translator friendly redesign (plano 19)
 *
 * Validates that `/dashboard/translator` now renders the 2-tab shell
 * (Translate + Monitor) with the concept card, deep-link support, and
 * that the simple mode flow narrates the result through the existing
 * `/api/translator/*` endpoints (mocked).
 *
 * Run with: npm run test:e2e -- tests/e2e/translator-friendly.spec.ts
 */

import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const TIMEOUT_MS = 300_000;

test.describe("Translator friendly redesign (plano 19)", () => {
  test.setTimeout(600_000);

  test("renders two tabs (Translate + Monitor) and the concept card", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/translator", { timeoutMs: TIMEOUT_MS });

    // ConceptCard exposes a "How it works" disclosure button (or its PT counterpart).
    await expect(
      page.getByRole("button", { name: /how it works|como funciona/i }).first()
    ).toBeVisible({ timeout: 15_000 });

    // The shell renders a SegmentedControl with role="tablist" that holds the 2 tabs.
    await expect(page.getByRole("tab", { name: /^translate$/i }).first()).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole("tab", { name: /^monitor$/i }).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("clicking the Monitor tab swaps content and pushes ?tab=monitor", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/translator", { timeoutMs: TIMEOUT_MS });

    await page.getByRole("tab", { name: /^monitor$/i }).first().click();
    await expect(page).toHaveURL(/tab=monitor/, { timeout: 10_000 });

    // MonitorTab origin hint or stats card should now be visible.
    await expect(
      page
        .getByText(/events generated|eventos gerados|recent translations|total translations/i)
        .first()
    ).toBeVisible({ timeout: 15_000 });
  });

  test("simple mode: typing input + clicking submit shows a narrated result (mocked)", async ({
    page,
  }) => {
    await page.route("**/api/translator/detect", (route) =>
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ success: true, format: "claude" }),
      })
    );
    await page.route("**/api/translator/translate", (route) =>
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          result: { messages: [{ role: "assistant", content: "ok" }] },
        }),
      })
    );
    await page.route("**/api/translator/send", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: 'data: {"choices":[{"delta":{"content":"hello"}}]}\n\ndata: [DONE]\n\n',
      })
    );

    await gotoDashboardRoute(page, "/dashboard/translator", { timeoutMs: TIMEOUT_MS });

    await page.locator("textarea").first().fill("Olá, quem é você?");
    await page
      .getByRole("button", { name: /send and see response|enviar|translate now/i })
      .first()
      .click();

    // narratedSuccess / narratedDetected use the keys "translated"/"detected" in EN
    // and "traduzido"/"detectado" in PT-BR.
    await expect(
      page.getByText(/translated|traduzido|detected|detectado/i).first()
    ).toBeVisible({ timeout: 15_000 });
  });

  test("deep-link ?advanced=streamtransform expands the Stream Transformer accordion", async ({
    page,
  }) => {
    await gotoDashboardRoute(page, "/dashboard/translator?advanced=streamtransform", {
      timeoutMs: TIMEOUT_MS,
    });

    await expect(
      page.getByText(/stream transformer/i).first()
    ).toBeVisible({ timeout: 15_000 });
  });

  test("deep-link ?tab=translate&advanced=testbench expands Test Bench accordion", async ({
    page,
  }) => {
    await gotoDashboardRoute(
      page,
      "/dashboard/translator?tab=translate&advanced=testbench",
      { timeoutMs: TIMEOUT_MS }
    );

    await expect(page.getByText(/test bench/i).first()).toBeVisible({ timeout: 15_000 });
  });
});
