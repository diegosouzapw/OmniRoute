import { expect, test, type Page, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;

type MemoryConfig = {
  enabled: boolean;
  maxTokens: number;
  retentionDays: number;
  strategy: "recent" | "semantic" | "hybrid";
  skillsEnabled: boolean;
};

type MemoryEntry = {
  id: string;
  apiKeyId: string;
  sessionId: string | null;
  type: "factual" | "episodic" | "procedural" | "semantic";
  key: string;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
};

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

async function setRangeValue(page: Page, testId: string, value: number) {
  await page.getByTestId(testId).evaluate((element, nextValue) => {
    const input = element as HTMLInputElement;
    const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    valueSetter?.call(input, String(nextValue));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
}

test.describe("Memory settings", () => {
  test.setTimeout(600_000);

  test("updates memory config in settings and deletes stored memory entries", async ({ page }) => {
    const state: {
      config: MemoryConfig;
      settings: { skillsmpApiKey: string };
      memories: MemoryEntry[];
      updateCalls: number;
      deleteCalls: number;
    } = {
      config: {
        enabled: false,
        maxTokens: 2000,
        retentionDays: 30,
        strategy: "hybrid",
        skillsEnabled: false,
      },
      settings: {
        skillsmpApiKey: "",
      },
      memories: [
        {
          id: "mem-1",
          apiKeyId: "key-1",
          sessionId: "session-a",
          type: "factual",
          key: "preferred_language",
          content: "The user prefers answers in Portuguese.",
          metadata: {},
          createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
          updatedAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
          expiresAt: null,
        },
      ],
      updateCalls: 0,
      deleteCalls: 0,
    };

    await page.route(/\/api\/settings$/, async (route) => {
      const method = route.request().method();
      if (method === "GET") {
        await fulfillJson(route, state.settings);
        return;
      }
      if (method === "PATCH") {
        const payload = (route.request().postDataJSON() as Record<string, unknown>) || {};
        state.settings = {
          ...state.settings,
          ...(typeof payload.skillsmpApiKey === "string"
            ? { skillsmpApiKey: payload.skillsmpApiKey }
            : {}),
        };
        await fulfillJson(route, state.settings);
        return;
      }
      await fulfillJson(route, { error: "Method not allowed in settings stub" }, 405);
    });

    await page.route(/\/api\/settings\/memory$/, async (route) => {
      const method = route.request().method();
      if (method === "GET") {
        await fulfillJson(route, state.config);
        return;
      }
      if (method === "PUT") {
        state.updateCalls += 1;
        const payload = (route.request().postDataJSON() as Partial<MemoryConfig>) || {};
        state.config = {
          ...state.config,
          ...payload,
        };
        await fulfillJson(route, state.config);
        return;
      }
      await fulfillJson(route, { error: "Method not allowed in memory settings stub" }, 405);
    });

    await page.route(/\/api\/memory(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, {
        data: state.memories,
        total: state.memories.length,
        totalPages: 1,
        stats: {
          total: state.memories.length,
          tokensUsed: state.memories.length * 24,
          hitRate: state.memories.length > 0 ? 0.75 : 0,
        },
      });
    });

    await page.route(/\/api\/memory\/[^/]+$/, async (route) => {
      state.deleteCalls += 1;
      const memoryId = route.request().url().split("/").pop() || "";
      state.memories = state.memories.filter((memory) => memory.id !== memoryId);
      await fulfillJson(route, { success: true });
    });

    await gotoDashboardRoute(page, "/dashboard/settings?tab=ai", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    let settingsHydrationRetries = 0;
    await expect(async () => {
      if (settingsHydrationRetries++ > 0) {
        await page.reload({ waitUntil: "commit" }).catch(() => {});
      }
      await expect(page.getByTestId("memory-enabled-switch")).toBeVisible({ timeout: 15000 });
    }).toPass({ timeout: 45_000, intervals: [1000, 2500, 5000] });
    await expect(page.getByTestId("memory-enabled-switch")).toHaveAttribute(
      "aria-checked",
      "false"
    );

    await page.getByTestId("memory-enabled-switch").click();
    await expect(page.getByTestId("memory-enabled-switch")).toHaveAttribute("aria-checked", "true");
    await expect.poll(() => state.config.enabled).toBe(true);

    await setRangeValue(page, "memory-retention-slider", 45);
    await expect.poll(() => state.config.retentionDays).toBe(45);

    await page.getByTestId("memory-strategy-recent").click();
    await expect.poll(() => state.config.strategy).toBe("recent");
    await expect.poll(() => state.updateCalls).toBeGreaterThanOrEqual(3);

    await page.getByTestId("memory-enabled-switch").click();
    await expect(page.getByTestId("memory-enabled-switch")).toHaveAttribute(
      "aria-checked",
      "false"
    );
    await expect.poll(() => state.config.enabled).toBe(false);

    await gotoDashboardRoute(page, "/dashboard/memory", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    let memoryHydrationRetries = 0;
    await expect(async () => {
      if (memoryHydrationRetries++ > 0) {
        await page.reload({ waitUntil: "commit" }).catch(() => {});
      }
      await expect(page.getByText("preferred_language")).toBeVisible({ timeout: 15000 });
    }).toPass({ timeout: 45_000, intervals: [1000, 2500, 5000] });
    await page.getByRole("button", { name: /delete/i }).click();

    await expect.poll(() => state.deleteCalls).toBe(1);
    await expect(page.getByText("preferred_language")).toHaveCount(0);
  });
});
