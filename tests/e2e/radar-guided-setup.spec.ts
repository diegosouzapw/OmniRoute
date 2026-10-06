import { expect, test, type Page, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 75_000;
const EVIDENCE_DIR = process.env.RADAR_G11_EVIDENCE_DIR;

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

async function installGuidedSetupApi(page: Page) {
  const calls = { syncModels: 0 };
  await page.route("**/api/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();

    if (url.pathname === "/api/radar/catalog") {
      await fulfillJson(route, {
        entries: [
          {
            provider: "groq",
            setup: {
              keyUrl: "https://console.groq.com/keys",
              steps: [
                {
                  en: "Create a project-specific Groq key.",
                  pt: "Crie uma chave Groq específica para o projeto.",
                },
              ],
            },
          },
        ],
      });
      return;
    }

    if (url.pathname === "/api/providers/expiration") {
      await fulfillJson(route, { summary: { expired: 0, expiringSoon: 0 }, list: [] });
      return;
    }

    if (url.pathname === "/api/provider-nodes") {
      await fulfillJson(route, { nodes: [], ccCompatibleProviderEnabled: false });
      return;
    }

    if (url.pathname === "/api/models/alias") {
      await fulfillJson(route, method === "GET" ? { aliases: {} } : { success: true });
      return;
    }

    if (url.pathname === "/api/settings/proxy") {
      await fulfillJson(route, url.searchParams.has("resolve") ? { proxy: null, level: null } : {});
      return;
    }

    if (url.pathname === "/api/provider-models") {
      await fulfillJson(route, { models: [], modelCompatOverrides: [] });
      return;
    }

    if (url.pathname === "/api/rate-limits") {
      await fulfillJson(route, { providers: [] });
      return;
    }

    if (url.pathname === "/api/providers/validate" && method === "POST") {
      await fulfillJson(route, { valid: true });
      return;
    }

    if (url.pathname === "/api/providers") {
      await route.continue();
      return;
    }

    if (/^\/api\/providers\/[^/]+\/sync-models$/.test(url.pathname) && method === "POST") {
      calls.syncModels += 1;
      await fulfillJson(route, { syncedModels: 0, models: [], availableModelsCount: 0 });
      return;
    }

    if (/^\/api\/providers\/[^/]+\/test$/.test(url.pathname) && method === "POST") {
      await route.continue();
      return;
    }

    await route.continue();
  });
  return calls;
}

async function captureEvidence(page: Page, name: string) {
  if (!EVIDENCE_DIR) return;
  await page.screenshot({ path: `${EVIDENCE_DIR}/${name}.png`, fullPage: true });
}

test.describe("Radar guided setup", () => {
  test("uses the official URL, real provider routes, isolated persistence, and real test route", async ({
    page,
  }) => {
    const apiCalls = await installGuidedSetupApi(page);

    await gotoDashboardRoute(page, "/dashboard/radar/setup?provider=groq", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    const officialKeyLink = page.locator('a[href="https://console.groq.com/keys"]');
    await expect(officialKeyLink).toBeVisible();
    await captureEvidence(page, "01-official-guide");

    const addConnectionLink = page.locator(
      'a[href="/dashboard/providers/groq?action=add-api-key"]'
    );
    await expect(addConnectionLink).toBeVisible();
    await Promise.all([
      page.waitForURL(/\/dashboard\/providers\/groq\?action=add-api-key$/, {
        timeout: NAVIGATION_TIMEOUT_MS,
      }),
      addConnectionLink.click(),
    ]);
    const addDialog = page.getByRole("dialog");
    await expect(addDialog).toBeVisible({ timeout: NAVIGATION_TIMEOUT_MS });
    await captureEvidence(page, "02-real-api-key-form");
    await addDialog.locator('input[type="password"]').fill("test-key-not-real");
    const createResponsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/providers") &&
        response.request().method() === "POST" &&
        response.status() === 201,
      { timeout: NAVIGATION_TIMEOUT_MS }
    );
    await addDialog.getByRole("button", { name: /^save$/i }).click();
    const createResponse = await createResponsePromise;
    const created = (await createResponse.json()) as { connection?: { id?: string } };
    const connectionId = created.connection?.id;
    expect(connectionId).toBeTruthy();

    // PR #11798: model auto-fetch is opt-in (`providerSpecificData.autoFetchModels`,
    // default off). The add form does not opt in, so saving must NOT open the
    // model-import modal nor call /sync-models — the add dialog just closes.
    await expect(page.getByRole("dialog")).toHaveCount(0, { timeout: NAVIGATION_TIMEOUT_MS });
    expect(apiCalls.syncModels).toBe(0);

    await page.goto("/dashboard/radar/setup?provider=groq", {
      waitUntil: "commit",
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    await expect(page).toHaveURL(/\/dashboard\/radar\/setup\?provider=groq$/, {
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    await expect(page.getByText(/provider is configured|provedor configurado/i)).toBeVisible({
      timeout: NAVIGATION_TIMEOUT_MS,
    });

    const testButton = page.getByRole("button", { name: /test connection|testar conexão/i });
    await expect(testButton).toBeEnabled({ timeout: NAVIGATION_TIMEOUT_MS });
    const testResponsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith(`/api/providers/${connectionId}/test`) &&
        response.request().method() === "POST",
      { timeout: NAVIGATION_TIMEOUT_MS }
    );
    await testButton.click();
    const testResponse = await testResponsePromise;
    expect(testResponse.status()).toBe(200);
    const testResult = (await testResponse.json()) as { valid?: boolean };
    expect(testResult.valid).toBe(false);
    await expect(page.getByText(/connection test failed|falha no teste de conexão/i)).toBeVisible({
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    await captureEvidence(page, "03-real-connection-test-result");
  });
});
