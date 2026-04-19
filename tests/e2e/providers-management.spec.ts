import { expect, test, type Page } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;

type ProviderConnection = {
  id: string;
  provider: string;
  name: string;
  authType: "api_key";
  isActive: boolean;
  testStatus: string;
  priority: number;
  providerSpecificData: Record<string, unknown>;
  lastError: string | null;
  lastErrorAt: string | null;
  lastErrorType: string | null;
  lastErrorSource: string | null;
  errorCode: string | null;
  rateLimitedUntil: string | null;
};

async function installProviderFetchMock(page: Page) {
  await page.addInitScript(() => {
    const state = {
      connections: [] as ProviderConnection[],
      nextId: 1,
      retestCalls: 0,
      deleteCalls: 0,
      validationCalls: 0,
      forceInvalidValidation: false,
    };

    const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
    const jsonResponse = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      });

    const readJsonBody = async (request: Request): Promise<Record<string, unknown>> => {
      try {
        const rawBody = await request.clone().text();
        if (!rawBody) return {};
        const parsed = JSON.parse(rawBody);
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch {
        return {};
      }
    };

    Object.defineProperty(window, "__providersTestState", {
      configurable: true,
      value: state,
    });

    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = input instanceof Request ? input : new Request(input, init);
      const url = new URL(request.url, window.location.origin);
      const method = request.method.toUpperCase();
      const path = url.pathname;

      if (path === "/api/providers/expiration") {
        return jsonResponse({
          summary: { expired: 0, expiringSoon: 0 },
          list: [],
        });
      }

      if (path === "/api/provider-nodes") {
        return jsonResponse({
          nodes: [],
          ccCompatibleProviderEnabled: false,
        });
      }

      if (path === "/api/models/alias") {
        if (method === "GET") {
          return jsonResponse({ aliases: {} });
        }
        return jsonResponse({ success: true });
      }

      if (path === "/api/settings/proxy") {
        if (url.searchParams.has("resolve")) {
          return jsonResponse({ proxy: null, level: null });
        }
        return jsonResponse({ providers: {} });
      }

      if (path === "/api/provider-models") {
        return jsonResponse({
          models: [],
          modelCompatOverrides: [],
        });
      }

      if (path === "/api/rate-limits") {
        return jsonResponse({ providers: [] });
      }

      if (path === "/api/providers/validate") {
        state.validationCalls += 1;
        const valid = !state.forceInvalidValidation;
        return jsonResponse({ valid }, valid ? 200 : 400);
      }

      const testMatch = path.match(/^\/api\/providers\/([^/]+)\/test$/);
      if (testMatch && method === "POST") {
        state.retestCalls += 1;
        const connectionId = testMatch[1];
        state.connections = state.connections.map((connection) =>
          connection.id === connectionId
            ? {
                ...connection,
                testStatus: "active",
                lastError: null,
                lastErrorAt: null,
                lastErrorType: null,
                lastErrorSource: null,
                errorCode: null,
                rateLimitedUntil: null,
              }
            : connection
        );
        return jsonResponse({ valid: true });
      }

      const detailMatch = path.match(/^\/api\/providers\/([^/]+)$/);
      if (detailMatch) {
        const connectionId = detailMatch[1];

        if (method === "PUT") {
          const payload = await readJsonBody(request);
          state.connections = state.connections.map((connection) =>
            connection.id === connectionId
              ? {
                  ...connection,
                  name:
                    typeof payload.name === "string" && payload.name.trim()
                      ? payload.name.trim()
                      : connection.name,
                  priority:
                    typeof payload.priority === "number" ? payload.priority : connection.priority,
                  isActive:
                    typeof payload.isActive === "boolean" ? payload.isActive : connection.isActive,
                  providerSpecificData: {
                    ...connection.providerSpecificData,
                    ...(payload.providerSpecificData as Record<string, unknown> | undefined),
                    ...(typeof payload.tag === "string" ? { tag: payload.tag } : {}),
                    ...(typeof payload.validationModelId === "string"
                      ? { validationModelId: payload.validationModelId }
                      : {}),
                  },
                }
              : connection
          );
          const updated = state.connections.find((connection) => connection.id === connectionId);
          return jsonResponse({ connection: clone(updated) });
        }

        if (method === "DELETE") {
          state.deleteCalls += 1;
          state.connections = state.connections.filter(
            (connection) => connection.id !== connectionId
          );
          return jsonResponse({ success: true });
        }
      }

      if (path === "/api/providers") {
        if (method === "GET") {
          return jsonResponse({ connections: clone(state.connections) });
        }

        if (method === "POST") {
          const payload = await readJsonBody(request);
          const apiKey = typeof payload.apiKey === "string" ? payload.apiKey : "";

          if (!apiKey || apiKey.includes("invalid")) {
            return jsonResponse({ error: "Invalid API key" }, 400);
          }

          const connection: ProviderConnection = {
            id: `conn-openai-${state.nextId++}`,
            provider: String(payload.provider || "openai"),
            name: String(payload.name || `OpenAI ${state.nextId}`),
            authType: "api_key",
            isActive: true,
            testStatus: "active",
            priority: typeof payload.priority === "number" ? payload.priority : 1,
            providerSpecificData: {
              tag: typeof payload.tag === "string" ? payload.tag : "",
              validationModelId:
                typeof payload.validationModelId === "string" ? payload.validationModelId : "",
            },
            lastError: null,
            lastErrorAt: null,
            lastErrorType: null,
            lastErrorSource: null,
            errorCode: null,
            rateLimitedUntil: null,
          };

          state.connections.push(connection);
          return jsonResponse({ connection: clone(connection) });
        }
      }

      return originalFetch(input, init);
    };
  });
}

async function readProviderMockState(page: Page) {
  return page.evaluate(
    () =>
      (
        window as Window & {
          __providersTestState: {
            connections: ProviderConnection[];
            nextId: number;
            retestCalls: number;
            deleteCalls: number;
            validationCalls: number;
            forceInvalidValidation: boolean;
          };
        }
      ).__providersTestState
  );
}

test.describe("Providers management", () => {
  test.setTimeout(600_000);

  test("adds, edits, retests, deletes, and validates provider connections through the UI", async ({
    page,
  }) => {
    await installProviderFetchMock(page);

    await gotoDashboardRoute(page, "/dashboard/providers", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    const openAiCard = page.locator('a[href="/dashboard/providers/openai"]').first();
    await expect(openAiCard).toBeVisible();
    await openAiCard.click();

    await expect(page).toHaveURL(/\/dashboard\/providers\/openai$/);
    await page.getByRole("button", { name: /^add$/i }).first().click();

    const addDialog = page.getByRole("dialog");
    await expect(addDialog).toBeVisible();
    await addDialog.getByLabel(/name/i).fill("Primary OpenAI");
    await addDialog.getByLabel(/api key/i).fill("sk-openai-valid");
    await addDialog.getByRole("button", { name: /^save$/i }).click();

    await expect
      .poll(async () => (await readProviderMockState(page)).validationCalls)
      .toBeGreaterThan(0);
    await expect(page.getByText("Primary OpenAI")).toBeVisible();
    await expect.poll(async () => (await readProviderMockState(page)).connections.length).toBe(1);

    await page.getByTitle(/^edit$/i).click();
    const editDialog = page.getByRole("dialog");
    await editDialog.getByLabel(/name/i).fill("Primary OpenAI Edited");
    await editDialog.getByLabel(/priority/i).fill("3");
    await editDialog.getByRole("button", { name: /^save$/i }).click();

    await expect(page.getByText("Primary OpenAI Edited")).toBeVisible();
    await expect
      .poll(async () => (await readProviderMockState(page)).connections[0]?.name)
      .toBe("Primary OpenAI Edited");

    await page.getByRole("button", { name: /retest/i }).click();
    await expect.poll(async () => (await readProviderMockState(page)).retestCalls).toBe(1);

    await page.evaluate(() => {
      (
        window as Window & { __providersTestState: { forceInvalidValidation: boolean } }
      ).__providersTestState.forceInvalidValidation = true;
    });
    await page.getByRole("button", { name: /^add$/i }).first().click();
    const invalidDialog = page.getByRole("dialog");
    await invalidDialog.getByLabel(/name/i).fill("Broken OpenAI");
    await invalidDialog.getByLabel(/api key/i).fill("invalid-key");
    await invalidDialog.getByRole("button", { name: /^save$/i }).click();

    await expect(invalidDialog.getByText(/api key validation failed/i)).toBeVisible();
    await expect
      .poll(async () => (await readProviderMockState(page)).validationCalls)
      .toBeGreaterThan(1);
    await invalidDialog.getByRole("button", { name: /cancel/i }).click();
    await page.evaluate(() => {
      (
        window as Window & { __providersTestState: { forceInvalidValidation: boolean } }
      ).__providersTestState.forceInvalidValidation = false;
    });

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await page.getByTitle(/^delete$/i).click();

    await expect.poll(async () => (await readProviderMockState(page)).deleteCalls).toBe(1);
    await expect(page.getByText("Primary OpenAI Edited")).toHaveCount(0);
    await expect(page.getByText(/no connections yet/i)).toBeVisible();
  });
});
