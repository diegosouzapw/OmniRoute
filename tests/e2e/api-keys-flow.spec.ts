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
});
