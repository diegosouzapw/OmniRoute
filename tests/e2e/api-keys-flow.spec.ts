import { expect, test, type Page, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;
const UI_STABILITY_TIMEOUT_MS = 120_000;

type ApiKeyRecord = {
  id: string;
  name: string;
  key: string;
  fullKey: string;
  allowedModels: string[] | null;
  allowedConnections: string[] | null;
  /** Public shape: "all" | "restricted". Absent on legacy keys. */
  modelAccessMode?: "all" | "restricted" | null;
  createdAt: string;
};

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

async function installClipboardMock(page: Page) {
  await page.addInitScript(() => {
    let clipboardValue = "";
    Object.defineProperty(window, "__clipboardValue", {
      configurable: true,
      get: () => clipboardValue,
      set: (value) => {
        clipboardValue = typeof value === "string" ? value : String(value ?? "");
      },
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          (window as Window & { __clipboardValue?: string }).__clipboardValue = value;
        },
        readText: async () => clipboardValue,
      },
    });
  });
}

async function readClipboard(page: Page) {
  return page.evaluate(() => (window as Window & { __clipboardValue?: string }).__clipboardValue);
}

async function waitForPageToSettle(page: Page) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 15_000 });
  } catch {
    // Some dashboard pages keep background requests alive; visibility assertions below
    // are the authoritative readiness check for these E2E flows.
  }
}

async function waitForNextDevCompileToFinish(page: Page) {
  const nextDevToolsButton = page.getByRole("button", { name: /open next\.js dev tools/i });
  if ((await nextDevToolsButton.count()) === 0) return;
  await expect(nextDevToolsButton).not.toContainText(/compiling/i, { timeout: 120_000 });
}

test.describe("API keys flow", () => {
  test.setTimeout(600_000);

  test("creates, copies, reveals, revokes, and returns to the empty state", async ({ page }) => {
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
      revealCalls: number;
      deleteCalls: number;
    } = {
      keys: [],
      nextId: 1,
      revealCalls: 0,
      deleteCalls: 0,
    };

    await installClipboardMock(page);

    await page.route("**/v1/models", async (route) => {
      await fulfillJson(route, { data: [] });
    });

    await page.route("**/api/settings", async (route) => {
      await fulfillJson(route, {});
    });

    await page.route("**/api/providers", async (route) => {
      await fulfillJson(route, {
        connections: [
          { id: "conn-openai", name: "OpenAI Main", provider: "openai", isActive: true },
        ],
      });
    });

    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });

    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });

    await page.route(/\/api\/keys\/[^/]+\/reveal$/, async (route) => {
      state.revealCalls += 1;
      const keyId = route.request().url().split("/").slice(-2)[0];
      const record = state.keys.find((key) => key.id === keyId);
      await fulfillJson(route, { key: record?.fullKey ?? "" });
    });

    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      if (route.request().method() === "DELETE") {
        state.deleteCalls += 1;
        const keyId = route.request().url().split("/").pop() || "";
        state.keys = state.keys.filter((key) => key.id !== keyId);
        await fulfillJson(route, { success: true });
        return;
      }

      if (route.request().method() === "PATCH") {
        const keyId = route.request().url().split("/").pop() || "";
        const payload = (await route.request().postDataJSON()) as { name?: string };
        const record = state.keys.find((key) => key.id === keyId);
        if (!record) {
          await fulfillJson(route, { error: "Key not found" }, 404);
          return;
        }
        if (payload.name) {
          record.name = payload.name;
        }
        await fulfillJson(route, { message: "API key settings updated successfully", ...payload });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed in api key detail stub" }, 405);
    });

    await page.route("**/api/keys", async (route) => {
      const method = route.request().method();

      if (method === "GET") {
        await fulfillJson(route, {
          keys: state.keys.map(({ fullKey, ...record }) => record),
          allowKeyReveal: true,
        });
        return;
      }

      if (method === "POST") {
        const payload = (route.request().postDataJSON() as { name?: string }) || {};
        const id = `key-${state.nextId++}`;
        const suffix = String(1000 + state.nextId);
        const fullKey = `sk-live-${suffix}-demo-secret`;
        const maskedKey = `sk-live-****${suffix}`;
        state.keys.push({
          id,
          name: payload.name || "New Key",
          key: maskedKey,
          fullKey,
          allowedModels: null,
          allowedConnections: null,
          createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
        });

        await fulfillJson(route, { key: fullKey, id });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed in api keys stub" }, 405);
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Team Key");
    const createKeyButton = createDialog.getByRole("button", { name: /create api key/i });
    await expect(createKeyButton).toBeEnabled({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createKeyButton.click({ force: true });
    await expect.poll(() => state.keys.length).toBe(1);

    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    const createdKeyInput = createdDialog.locator("input[readonly]").first();
    await expect(createdKeyInput).toHaveValue(/sk-live-/);
    await createdDialog.getByRole("button", { name: /copy/i }).click();

    await expect.poll(() => readClipboard(page)).toBeTruthy();
    const createdClipboardValue = await readClipboard(page);
    await expect(createdKeyInput).toHaveValue(createdClipboardValue || "");

    await createdDialog.getByRole("button", { name: /done/i }).click();

    await expect(page.getByText("Team Key")).toBeVisible();
    await expect(page.getByText("sk-live-****1002")).toBeVisible();

    const keyRow = page
      .locator("div")
      .filter({ has: page.getByText("Team Key", { exact: true }) })
      .filter({ has: page.getByText("sk-live-****1002", { exact: true }) })
      .first();

    await keyRow.getByRole("button", { name: /copy/i }).click();
    await expect.poll(() => state.revealCalls).toBe(1);
    await expect.poll(() => readClipboard(page)).toBe("sk-live-1002-demo-secret");

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await keyRow.locator("button[title]").last().click({ force: true });

    await expect.poll(() => state.deleteCalls).toBe(1);
    await expect(page.getByText("Team Key")).toHaveCount(0);
    await expect(createFirstKeyButton).toBeVisible();
  });

  test("renames a key through the permissions modal", async ({ page }) => {
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
    } = {
      keys: [],
      nextId: 1,
    };

    await page.route("**/v1/models", async (route) => {
      await fulfillJson(route, { data: [] });
    });

    await page.route("**/api/settings", async (route) => {
      await fulfillJson(route, {});
    });

    await page.route("**/api/providers", async (route) => {
      await fulfillJson(route, {
        connections: [
          { id: "conn-openai", name: "OpenAI Main", provider: "openai", isActive: true },
        ],
      });
    });

    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });

    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });

    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      if (route.request().method() === "PATCH") {
        const keyId = route.request().url().split("/").pop() || "";
        const payload = (await route.request().postDataJSON()) as { name?: string };
        const record = state.keys.find((key) => key.id === keyId);
        if (!record) {
          await fulfillJson(route, { error: "Key not found" }, 404);
          return;
        }
        if (payload.name) {
          record.name = payload.name;
        }
        await fulfillJson(route, { message: "API key settings updated successfully", ...payload });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await page.route("**/api/keys", async (route) => {
      const method = route.request().method();

      if (method === "GET") {
        await fulfillJson(route, {
          keys: state.keys.map(({ fullKey, ...record }) => record),
          allowKeyReveal: true,
        });
        return;
      }

      if (method === "POST") {
        const payload = (route.request().postDataJSON() as { name?: string }) || {};
        const id = `key-${state.nextId++}`;
        const suffix = String(1000 + state.nextId);
        const fullKey = `sk-live-${suffix}-demo-secret`;
        const maskedKey = `sk-live-****${suffix}`;
        state.keys.push({
          id,
          name: payload.name || "New Key",
          key: maskedKey,
          fullKey,
          allowedModels: null,
          allowedConnections: null,
          createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
        });

        await fulfillJson(route, { key: fullKey, id });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // --- Create a key ---
    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Original Name");
    const createKeyButton = createDialog.getByRole("button", { name: /create api key/i });
    await expect(createKeyButton).toBeEnabled({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createKeyButton.click({ force: true });
    await expect.poll(() => state.keys.length).toBe(1);

    // Dismiss the "key created" dialog
    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    await createdDialog.getByRole("button", { name: /done/i }).click();

    // Wait for the key list to settle after re-fetch
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // Verify the key appears in the list
    await expect(page.getByText("Original Name")).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    // --- Open the permissions modal ---
    // The edit-permissions button is opacity-0 until hover; use title attribute locator
    const keyRow = page
      .locator("div")
      .filter({ has: page.getByText("Original Name", { exact: true }) })
      .first();
    await keyRow.locator('button[title="Edit permissions"]').click({ force: true });

    // --- Rename the key ---
    const permissionsDialog = page.getByRole("dialog", { name: /permissions: original name/i });
    await expect(permissionsDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // The key name input is inside the permissions modal
    const nameInput = permissionsDialog.locator("input").first();
    await expect(nameInput).toHaveValue("Original Name");
    await nameInput.clear();
    await nameInput.fill("Renamed Key");

    // Save
    await permissionsDialog
      .getByRole("button", { name: /save permissions/i })
      .click({ force: true });

    // Verify the mock state was updated
    await expect.poll(() => state.keys[0]?.name).toBe("Renamed Key");

    // Verify the dialog closes and the list reflects the new name
    await expect(permissionsDialog).not.toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await expect(page.getByText("Renamed Key")).toBeVisible();
  });

  test("validation error appears inside the create key modal, not behind the backdrop", async ({
    page,
  }) => {
    const state = {
      keys: [] as ApiKeyRecord[],
      nextId: 1,
    };

    // Stub all API routes
    await page.route("**/v1/models", async (route) => {
      await fulfillJson(route, { data: [] });
    });
    await page.route("**/api/connections", async (route) => {
      await fulfillJson(route, {
        connections: [
          { id: "conn-openai", name: "OpenAI Main", provider: "openai", isActive: true },
        ],
      });
    });
    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });
    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });
    await page.route("**/api/keys", async (route) => {
      const method = route.request().method();
      if (method === "GET") {
        await fulfillJson(route, {
          keys: state.keys.map(({ fullKey, ...record }) => record),
          allowKeyReveal: true,
        });
        return;
      }
      if (method === "POST") {
        const payload = (route.request().postDataJSON() as { name?: string }) || {};
        const id = `key-${state.nextId++}`;
        const suffix = String(1000 + state.nextId);
        const fullKey = `sk-live-${suffix}-demo-secret`;
        const maskedKey = `sk-live-****${suffix}`;
        state.keys.push({
          id,
          name: payload.name || "New Key",
          key: maskedKey,
          fullKey,
          allowedModels: null,
          allowedConnections: null,
          createdAt: new Date().toISOString(),
        });
        await fulfillJson(route, { key: fullKey, id });
        return;
      }
      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });
    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      await fulfillJson(route, { error: "Not found" }, 404);
    });
    await page.route(/\/api\/keys\/[^/]+\/reveal$/, async (route) => {
      await fulfillJson(route, { key: "" });
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // Open the create key modal
    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // Fill an invalid name (special characters) and submit
    const nameInput = createDialog.locator("input").first();
    await nameInput.fill("bad@name!");
    const createKeyButton = createDialog.getByRole("button", { name: /create api key/i });
    await createKeyButton.click({ force: true });

    // The validation error must appear as an inline <p role="alert"> INSIDE the modal
    const inlineError = createDialog.locator("p[role='alert']");
    await expect(inlineError).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // The error must be visible — i.e. not obscured by the backdrop.
    // A covered element has box visibility but fails the check below because
    // pointer events and paint are blocked by the overlay div.
    await expect(inlineError).toBeInViewport();

    // No page-level error banner should appear behind the modal
    const pageErrorBanner = page.locator('.flex.flex-col.gap-8 > [class~="bg-red-500/10"]');
    await expect(pageErrorBanner).not.toBeVisible();

    // Typing should clear the error
    await nameInput.fill("valid-name");
    await expect(inlineError).not.toBeVisible();

    // A valid name should succeed without errors
    await createKeyButton.click({ force: true });
    await expect.poll(() => state.keys.length).toBe(1);
  });

  test("validation error appears inside the permissions modal when renaming, not behind the backdrop", async ({
    page,
  }) => {
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
    } = {
      keys: [],
      nextId: 1,
    };

    // Stub all API routes
    await page.route("**/v1/models", async (route) => {
      await fulfillJson(route, { data: [] });
    });

    await page.route("**/api/settings", async (route) => {
      await fulfillJson(route, {});
    });

    await page.route("**/api/providers", async (route) => {
      await fulfillJson(route, {
        connections: [
          { id: "conn-openai", name: "OpenAI Main", provider: "openai", isActive: true },
        ],
      });
    });

    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });

    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });

    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      if (route.request().method() === "PATCH") {
        const keyId = route.request().url().split("/").pop() || "";
        const payload = (await route.request().postDataJSON()) as { name?: string };
        const record = state.keys.find((key) => key.id === keyId);
        if (!record) {
          await fulfillJson(route, { error: "Key not found" }, 404);
          return;
        }
        if (payload.name) {
          record.name = payload.name;
        }
        await fulfillJson(route, { message: "API key settings updated successfully", ...payload });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await page.route("**/api/keys", async (route) => {
      const method = route.request().method();

      if (method === "GET") {
        await fulfillJson(route, {
          keys: state.keys.map(({ fullKey, ...record }) => record),
          allowKeyReveal: true,
        });
        return;
      }

      if (method === "POST") {
        const payload = (route.request().postDataJSON() as { name?: string }) || {};
        const id = `key-${state.nextId++}`;
        const suffix = String(1000 + state.nextId);
        const fullKey = `sk-live-${suffix}-demo-secret`;
        const maskedKey = `sk-live-****${suffix}`;
        state.keys.push({
          id,
          name: payload.name || "New Key",
          key: maskedKey,
          fullKey,
          allowedModels: null,
          allowedConnections: null,
          createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
        });

        await fulfillJson(route, { key: fullKey, id });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // Create a key first
    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Original Name");
    await createDialog.getByRole("button", { name: /create api key/i }).click({ force: true });

    // Dismiss the created dialog
    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    await createdDialog.getByRole("button", { name: /done/i }).click();
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await expect(page.getByText("Original Name")).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    // Open the permissions modal
    const keyRow = page
      .locator("div")
      .filter({ has: page.getByText("Original Name", { exact: true }) })
      .first();
    await keyRow.locator('button[title="Edit permissions"]').click({ force: true });

    const permissionsDialog = page.getByRole("dialog", {
      name: /permissions: original name/i,
    });
    await expect(permissionsDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // --- Try to save with an invalid name (empty) ---
    const nameInput = permissionsDialog.locator("input").first();
    await nameInput.clear();
    await nameInput.fill("   ");
    const saveButton = permissionsDialog.getByRole("button", { name: /save permissions/i });
    await saveButton.click({ force: true });

    // Inline error should appear inside the permissions modal
    const inlineError = permissionsDialog.locator('[id$="-error"]');
    await expect(inlineError).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // No page-level error banner should appear behind the modal
    const pageErrorBanner = page.locator('.flex.flex-col.gap-8 > [class~="bg-red-500/10"]');
    await expect(pageErrorBanner).not.toBeVisible();

    // Typing a valid name should clear the error
    await nameInput.fill("Renamed Key");
    await expect(inlineError).not.toBeVisible();

    // Save should succeed now
    await saveButton.click({ force: true });
    await expect.poll(() => state.keys[0]?.name).toBe("Renamed Key");
    await expect(permissionsDialog).not.toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await expect(page.getByText("Renamed Key")).toBeVisible();
  });

  test("Restrict mode provider scope: selects ollama-cloud/* dynamically plus exact OpenAI model", async ({
    page,
  }) => {
    // R4 acceptance: selecting the Ollama Cloud provider must PATCH canonical
    // ollama-cloud/* (not alias-prefixed snapshot IDs), with modelAccessMode restricted;
    // reopening restores the provider checkbox and leaves children non-toggleable.
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
      patchPayloads: Array<Record<string, unknown>>;
    } = {
      keys: [],
      nextId: 1,
      patchPayloads: [],
    };

    const catalogModels = [
      {
        id: "ollamacloud/llama3",
        owned_by: "ollama-cloud",
        name: "llama3",
      },
      {
        id: "ollamacloud/qwen",
        owned_by: "ollama-cloud",
        name: "qwen",
      },
      {
        id: "openai/gpt-4.1",
        owned_by: "openai",
        name: "gpt-4.1",
      },
    ];

    // Override catalog fetches in-page. page.route alone can miss the early client
    // catalog load against a reused Playwright server; this keeps the fixture deterministic.
    // Note: init-script body is browser-serialized — keep it plain JS (no TS types).
    await page.addInitScript((models) => {
      const originalFetch = window.fetch.bind(window);
      window.fetch = async (input, init) => {
        const raw =
          typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const path = String(raw).replace(/^https?:\/\/[^/]+/, "");

        if (path.startsWith("/v1/models")) {
          return new Response(JSON.stringify({ data: models }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (path.startsWith("/api/models")) {
          return new Response(
            JSON.stringify({
              models: models.map((m) => ({
                provider: m.owned_by,
                model: m.id.split("/").slice(1).join("/"),
                fullModel: m.id,
                alias: m.name,
              })),
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        if (path.startsWith("/api/combos")) {
          return new Response(JSON.stringify({ combos: [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        return originalFetch(input, init);
      };
    }, catalogModels);

    // Defense in depth: also stub network for non-init-script navigations.
    await page.route(/\/v1\/models(?:\?|$)/, async (route) => {
      await fulfillJson(route, { data: catalogModels });
    });
    await page.route(/\/api\/models(?:\?|$)/, async (route) => {
      await fulfillJson(route, {
        models: catalogModels.map((m) => ({
          provider: m.owned_by,
          model: m.id.split("/").slice(1).join("/"),
          fullModel: m.id,
          alias: m.name,
        })),
      });
    });
    await page.route(/\/api\/combos(?:\?|$)/, async (route) => {
      await fulfillJson(route, { combos: [] });
    });

    await page.route("**/api/settings", async (route) => {
      await fulfillJson(route, {});
    });

    await page.route("**/api/providers", async (route) => {
      await fulfillJson(route, {
        connections: [
          {
            id: "conn-ollama-cloud",
            name: "Ollama Cloud",
            provider: "ollama-cloud",
            isActive: true,
          },
          { id: "conn-openai", name: "OpenAI Main", provider: "openai", isActive: true },
        ],
      });
    });

    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });

    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });

    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      if (route.request().method() === "PATCH") {
        const keyId = route.request().url().split("/").pop() || "";
        const payload = (await route.request().postDataJSON()) as {
          name?: string;
          allowedModels?: string[];
          modelAccessMode?: "all" | "restricted";
        };
        state.patchPayloads.push(payload);
        const record = state.keys.find((key) => key.id === keyId);
        if (!record) {
          await fulfillJson(route, { error: "Key not found" }, 404);
          return;
        }
        if (payload.name) record.name = payload.name;
        if (Array.isArray(payload.allowedModels)) {
          record.allowedModels = payload.allowedModels;
        }
        if (payload.modelAccessMode === "all" || payload.modelAccessMode === "restricted") {
          record.modelAccessMode = payload.modelAccessMode;
        }
        await fulfillJson(route, {
          message: "API key settings updated successfully",
          ...payload,
        });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await page.route("**/api/keys", async (route) => {
      const method = route.request().method();

      if (method === "GET") {
        await fulfillJson(route, {
          keys: state.keys.map(({ fullKey, ...record }) => record),
          allowKeyReveal: true,
        });
        return;
      }

      if (method === "POST") {
        const payload = (route.request().postDataJSON() as { name?: string }) || {};
        const id = `key-${state.nextId++}`;
        const suffix = String(1000 + state.nextId);
        const fullKey = `sk-live-${suffix}-demo-secret`;
        const maskedKey = `sk-live-****${suffix}`;
        state.keys.push({
          id,
          name: payload.name || "New Key",
          key: maskedKey,
          fullKey,
          allowedModels: null,
          allowedConnections: null,
          modelAccessMode: null,
          createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
        });
        await fulfillJson(route, { key: fullKey, id });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Provider Scope Key");
    await createDialog.getByRole("button", { name: /create api key/i }).click({ force: true });

    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    await createdDialog.getByRole("button", { name: /done/i }).click();
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await expect(page.getByText("Provider Scope Key")).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    const keyRow = page
      .locator("div")
      .filter({ has: page.getByText("Provider Scope Key", { exact: true }) })
      .first();
    await keyRow.locator('button[title="Edit permissions"]').click({ force: true });

    const permissionsDialog = page.getByRole("dialog", {
      name: /permissions: provider scope key/i,
    });
    await expect(permissionsDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // Enter Restrict mode via the primary Access Mode toggle (accessible name includes the lock icon text).
    const accessModeRestrict = permissionsDialog.getByRole("button", {
      name: /^lock\s+restrict$/i,
    });
    await expect(accessModeRestrict).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await accessModeRestrict.click();

    // Wait for the mocked catalog to render (search box appears only in Restrict mode).
    const modelSearch = permissionsDialog.getByPlaceholder(/search models/i);
    await expect(modelSearch).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await expect(permissionsDialog.getByText(/ollama[- ]?cloud/i).first()).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    const ollamaProviderCheckbox = permissionsDialog.getByRole("checkbox", {
      name: /ollama[- ]?cloud/i,
    });
    await expect(ollamaProviderCheckbox).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await ollamaProviderCheckbox.check();

    // Exact OpenAI model selection coexists with the provider scope.
    await modelSearch.fill("openai/gpt-4.1");
    const openaiModelButton = permissionsDialog.getByRole("button", {
      name: "openai/gpt-4.1",
    });
    await expect(openaiModelButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await openaiModelButton.click();
    await modelSearch.fill("");

    const saveButton = permissionsDialog.getByRole("button", { name: /save permissions/i });
    await saveButton.click();

    await expect.poll(() => state.patchPayloads.length).toBeGreaterThan(0);
    const patch = state.patchPayloads[state.patchPayloads.length - 1]!;
    const allowedModels = Array.isArray(patch.allowedModels)
      ? (patch.allowedModels as string[])
      : [];

    expect(patch.modelAccessMode).toBe("restricted");
    expect(allowedModels).toEqual(expect.arrayContaining(["ollama-cloud/*", "openai/gpt-4.1"]));
    expect(allowedModels).toContain("ollama-cloud/*");
    expect(allowedModels).toContain("openai/gpt-4.1");
    // Must not snapshot current Ollama catalog IDs (including alias-prefixed ones).
    expect(allowedModels).not.toContain("ollamacloud/llama3");
    expect(allowedModels).not.toContain("ollamacloud/qwen");
    expect(allowedModels).not.toContain("ollama-cloud/llama3");
    expect(allowedModels).not.toContain("ollama-cloud/qwen");

    await expect(permissionsDialog).not.toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // Reopen after state/refetch: provider scope restored; children inherited/non-toggleable.
    await keyRow.locator('button[title="Edit permissions"]').click({ force: true });
    const reopened = page.getByRole("dialog", {
      name: /permissions: provider scope key/i,
    });
    await expect(reopened).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // Restrict mode should remain selected after reopen.
    await expect(reopened.getByRole("button", { name: /^lock\s+restrict$/i })).toHaveClass(
      /bg-primary/
    );

    const reopenedProviderCheckbox = reopened.getByRole("checkbox", {
      name: /ollama[- ]?cloud/i,
    });
    await expect(reopenedProviderCheckbox).toBeChecked();

    // Child models under the provider scope are inherited and not individually toggleable.
    for (const childId of ["ollamacloud/llama3", "ollamacloud/qwen"]) {
      const child = reopened.getByRole("button", { name: childId });
      await expect(child).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
      await expect(child).toBeDisabled();
    }

    // Exact OpenAI selection remains individually selected/toggleable.
    const reopenedOpenAiModel = reopened.getByRole("button", { name: "openai/gpt-4.1" });
    await expect(reopenedOpenAiModel).toBeEnabled();

    // Explicit Restrict with no provider/model selections is a persistent deny-all state.
    await reopenedProviderCheckbox.uncheck();
    await reopenedOpenAiModel.click();
    await reopened.getByRole("button", { name: /save permissions/i }).click();
    await expect.poll(() => state.patchPayloads.length).toBeGreaterThan(1);
    const denyAllPatch = state.patchPayloads[state.patchPayloads.length - 1]!;
    expect(denyAllPatch.modelAccessMode).toBe("restricted");
    expect(denyAllPatch.allowedModels).toEqual([]);

    await keyRow.locator('button[title="Edit permissions"]').click({ force: true });
    const denyAllReopened = page.getByRole("dialog", {
      name: /permissions: provider scope key/i,
    });
    await expect(denyAllReopened).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await expect(denyAllReopened.getByRole("button", { name: /^lock\s+restrict$/i })).toHaveClass(
      /bg-primary/
    );
  });
});
