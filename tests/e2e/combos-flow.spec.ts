import { expect, test } from "@playwright/test";

type ComboStub = {
  id: string;
  name: string;
  strategy: string;
  models: unknown[];
  config: Record<string, unknown>;
  isActive: boolean;
  sortOrder?: number;
};

type ComboCreatePayload = {
  name?: string;
  strategy?: string;
  models?: unknown[];
  config?: Record<string, unknown>;
};

test.describe("Combos flow", () => {
  test("applies template, creates combo, and runs quick test CTA", async ({ page }) => {
    const state: {
      combos: ComboStub[];
      nextId: number;
      comboTestRequests: number;
    } = {
      combos: [],
      nextId: 1,
      comboTestRequests: 0,
    };

    await page.route("**/api/combos/test", async (route) => {
      state.comboTestRequests += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          resolvedBy: "openai/qa-test-model",
          results: [{ model: "openai/qa-test-model", status: "ok", latencyMs: 42 }],
        }),
      });
    });

    await page.route("**/api/combos/metrics", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ metrics: {} }),
      });
    });

    await page.route("**/api/settings/proxy", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ combos: {} }),
      });
    });

    await page.route("**/api/providers", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          connections: [{ id: "conn-openai", provider: "openai", testStatus: "active" }],
        }),
      });
    });

    await page.route("**/api/provider-nodes", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ nodes: [] }),
      });
    });

    await page.route("**/api/models/alias", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ aliases: {} }),
      });
    });

    await page.route("**/api/provider-models", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          models: {
            openai: [{ id: "qa-test-model", name: "QA Test Model" }],
          },
        }),
      });
    });

    await page.route("**/api/pricing", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          openai: {
            "qa-test-model": {
              input: 0.01,
              output: 0.02,
            },
          },
        }),
      });
    });

    await page.route("**/api/combos", async (route) => {
      const method = route.request().method();
      if (method === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ combos: state.combos }),
        });
        return;
      }

      if (method === "POST") {
        const payloadRaw = route.request().postDataJSON();
        const payload =
          payloadRaw && typeof payloadRaw === "object" ? (payloadRaw as ComboCreatePayload) : {};
        const comboId = `combo-${state.nextId++}`;
        const createdCombo = {
          id: comboId,
          name: payload.name || comboId,
          strategy: payload.strategy || "priority",
          models: payload.models || [],
          config: payload.config || {},
          isActive: true,
        };
        state.combos.push(createdCombo);

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ combo: createdCombo }),
        });
        return;
      }

      await route.fulfill({
        status: 405,
        contentType: "application/json",
        body: JSON.stringify({ error: "Method not allowed in test stub" }),
      });
    });

    await page.goto("/dashboard/combos");
    await page.waitForLoadState("networkidle");

    const redirectedToLogin = page.url().includes("/login");
    test.skip(redirectedToLogin, "Authentication enabled without a login fixture.");

    await page
      .getByRole("button", { name: /create combo|criar combo/i })
      .first()
      .click();

    const comboDialog = page.getByRole("dialog").first();
    await expect(comboDialog).toBeVisible();
    const comboCreateButton = comboDialog
      .getByRole("button", { name: /create combo|criar combo/i })
      .last();
    const readinessPanel = comboDialog.locator('[data-testid="combo-readiness-panel"]');
    const saveBlockers = comboDialog.locator('[data-testid="combo-save-blockers"]');

    await expect(readinessPanel).toBeVisible();
    await expect(saveBlockers).toBeVisible();
    await expect(comboCreateButton).toBeDisabled();
    const applyRecommendationsButton = comboDialog
      .getByRole("button", { name: /apply recommendations|aplicar recomendações/i })
      .first();

    await expect(applyRecommendationsButton).toBeVisible();
    await comboDialog.locator('[data-testid="strategy-option-weighted"]').click();
    await expect(comboDialog.locator('[data-testid="strategy-change-nudge"]')).toBeVisible();
    await comboDialog.locator('[data-testid="strategy-option-priority"]').click();
    await expect(comboDialog.locator('[data-testid="strategy-change-nudge"]')).toBeVisible();
    await applyRecommendationsButton.click();

    await comboDialog
      .getByRole("button", { name: /high availability|alta disponibilidade/i })
      .click();
    await comboDialog.getByRole("button", { name: /add model|adicionar modelo/i }).click();

    const modelDialog = page.getByRole("dialog").last();
    await expect(modelDialog.getByRole("button", { name: /qa test model/i })).toBeVisible();
    await modelDialog.getByRole("button", { name: /qa test model/i }).click();
    await expect(saveBlockers).toHaveCount(0);
    await expect(comboCreateButton).toBeEnabled();

    await comboCreateButton.click();
    await expect(comboDialog).toBeHidden();

    const quickTestButton = page.getByRole("button", { name: /test now|testar agora/i });
    await expect(quickTestButton).toBeVisible();
    await quickTestButton.click();

    await expect
      .poll(() => state.comboTestRequests, {
        message: "Expected the quick test CTA to hit /api/combos/test once",
      })
      .toBe(1);

    const testResultsModal = page.getByRole("dialog").last();
    await expect(testResultsModal).toContainText(/qa-test-model/i);
  });

  test("allows dragging combo cards to persist manual order", async ({ page }) => {
    const state: {
      combos: ComboStub[];
      reorderRequests: number;
    } = {
      combos: [
        {
          id: "combo-1",
          name: "alpha-combo",
          strategy: "priority",
          models: ["openai/alpha"],
          config: {},
          isActive: true,
          sortOrder: 1,
        },
        {
          id: "combo-2",
          name: "bravo-combo",
          strategy: "priority",
          models: ["openai/bravo"],
          config: {},
          isActive: true,
          sortOrder: 2,
        },
        {
          id: "combo-3",
          name: "charlie-combo",
          strategy: "priority",
          models: ["openai/charlie"],
          config: {},
          isActive: true,
          sortOrder: 3,
        },
      ],
      reorderRequests: 0,
    };

    await page.route("**/api/combos/metrics", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ metrics: {} }),
      });
    });

    await page.route("**/api/settings/proxy", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ combos: {} }),
      });
    });

    await page.route("**/api/providers", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ connections: [] }),
      });
    });

    await page.route("**/api/provider-nodes", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ nodes: [] }),
      });
    });

    await page.route("**/api/combos/reorder", async (route) => {
      state.reorderRequests += 1;
      const payload = route.request().postDataJSON() as { comboIds?: string[] };
      const nextIds = Array.isArray(payload?.comboIds) ? payload.comboIds : [];
      const comboById = new Map(state.combos.map((combo) => [combo.id, combo]));
      state.combos = nextIds
        .map((id, index) => {
          const combo = comboById.get(id);
          return combo ? { ...combo, sortOrder: index + 1 } : null;
        })
        .filter((combo): combo is ComboStub => combo !== null);

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ combos: state.combos }),
      });
    });

    await page.route("**/api/combos", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ combos: state.combos }),
      });
    });

    await page.goto("/dashboard/combos");
    await page.waitForLoadState("networkidle");

    const redirectedToLogin = page.url().includes("/login");
    test.skip(redirectedToLogin, "Authentication enabled without a login fixture.");

    const comboCards = page.locator('[data-testid^="combo-card-"]');
    await expect
      .poll(async () =>
        comboCards.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-testid")))
      )
      .toEqual(["combo-card-combo-1", "combo-card-combo-2", "combo-card-combo-3"]);

    await page
      .getByTestId("combo-drag-handle-combo-3")
      .dragTo(page.getByTestId("combo-card-combo-1"));

    await expect.poll(() => state.reorderRequests).toBe(1);
    await expect
      .poll(async () =>
        comboCards.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-testid")))
      )
      .toEqual(["combo-card-combo-3", "combo-card-combo-1", "combo-card-combo-2"]);

    await page.reload();
    await page.waitForLoadState("networkidle");

    await expect
      .poll(async () =>
        comboCards.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-testid")))
      )
      .toEqual(["combo-card-combo-3", "combo-card-combo-1", "combo-card-combo-2"]);
  });
});
