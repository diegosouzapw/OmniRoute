import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

type ProxyStub = {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  status: string;
  region?: string | null;
  notes?: string | null;
};

test.describe("Proxy Registry smoke flow", () => {
  test("create, edit, bulk-assign modal, and delete proxy from settings advanced", async ({
    page,
  }) => {
    const state: {
      proxies: ProxyStub[];
      nextId: number;
      bulkAssignCalls: number;
    } = {
      proxies: [],
      nextId: 1,
      bulkAssignCalls: 0,
    };

    await page.route("**/api/settings/proxy?level=global", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ proxy: null }),
      });
    });

    await page.route("**/api/settings/proxies/health?hours=24", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          items: state.proxies.map((p) => ({
            proxyId: p.id,
            totalRequests: 0,
            successRate: null,
            avgLatencyMs: null,
            lastSeenAt: null,
          })),
          total: state.proxies.length,
          windowHours: 24,
        }),
      });
    });

    await page.route("**/api/settings/proxies/bulk-assign", async (route) => {
      if (route.request().method() !== "PUT") {
        await route.fulfill({
          status: 405,
          contentType: "application/json",
          body: JSON.stringify({ error: "method not allowed in test stub" }),
        });
        return;
      }

      state.bulkAssignCalls += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          scope: "provider",
          requested: 2,
          updated: 2,
          failed: [],
        }),
      });
    });

    await page.route("**/api/settings/proxies*", async (route) => {
      const req = route.request();
      const method = req.method();
      const url = new URL(req.url());
      const id = url.searchParams.get("id");
      const whereUsed = url.searchParams.get("whereUsed");

      if (method === "GET" && id && whereUsed === "1") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ count: 0, assignments: [] }),
        });
        return;
      }

      if (method === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ items: state.proxies, total: state.proxies.length }),
        });
        return;
      }

      if (method === "POST") {
        const payload = req.postDataJSON() as Partial<ProxyStub>;
        const proxy: ProxyStub = {
          id: `proxy-${state.nextId++}`,
          name: payload.name || "Proxy",
          type: payload.type || "http",
          host: payload.host || "localhost",
          port: Number(payload.port || 8080),
          status: payload.status || "active",
          region: payload.region || null,
          notes: payload.notes || null,
        };
        state.proxies.unshift(proxy);
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify(proxy),
        });
        return;
      }

      if (method === "PATCH") {
        const payload = req.postDataJSON() as Partial<ProxyStub> & { id?: string };
        const index = state.proxies.findIndex((p) => p.id === payload.id);
        if (index === -1) {
          await route.fulfill({
            status: 404,
            contentType: "application/json",
            body: JSON.stringify({ error: { message: "Proxy not found", type: "not_found" } }),
          });
          return;
        }

        const updated = {
          ...state.proxies[index],
          ...payload,
        } as ProxyStub;
        state.proxies[index] = updated;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(updated),
        });
        return;
      }

      if (method === "DELETE") {
        if (!id) {
          await route.fulfill({
            status: 400,
            contentType: "application/json",
            body: JSON.stringify({ error: { message: "id is required", type: "invalid_request" } }),
          });
          return;
        }
        state.proxies = state.proxies.filter((p) => p.id !== id);
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true }),
        });
        return;
      }

      await route.fulfill({
        status: 405,
        contentType: "application/json",
        body: JSON.stringify({ error: "method not allowed in test stub" }),
      });
    });

    await gotoDashboardRoute(page, "/dashboard/settings?tab=advanced");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: "Proxy Registry" })).toBeVisible();

    await page.getByTestId("proxy-registry-open-create").click();
    const createDialog = page.getByRole("dialog");
    await expect(createDialog.getByText("Create Proxy")).toBeVisible();
    await createDialog.getByTestId("proxy-registry-name-input").fill("Registry Smoke Proxy");
    await createDialog.getByTestId("proxy-registry-host-input").fill("smoke.local");
    await createDialog.getByRole("button", { name: "Save" }).click();

    await expect(page.locator("table")).toContainText("Registry Smoke Proxy");
    await expect(page.locator("table")).toContainText("http://smoke.local:8080");

    const row = page.locator("tr", { hasText: "Registry Smoke Proxy" });
    await row.getByRole("button", { name: "Edit" }).click();
    const editDialog = page.getByRole("dialog");
    await expect(editDialog.getByText("Edit Proxy")).toBeVisible();
    await editDialog.getByTestId("proxy-registry-host-input").fill("smoke-updated.local");
    await editDialog.getByRole("button", { name: "Save" }).click();

    await expect(page.locator("table")).toContainText("http://smoke-updated.local:8080");

    await page.getByTestId("proxy-registry-open-bulk").click();
    const bulkDialog = page.getByRole("dialog");
    await expect(bulkDialog.getByText("Bulk Proxy Assignment")).toBeVisible();
    await bulkDialog.getByTestId("proxy-registry-bulk-scopeids-input").fill("openai,anthropic");
    await bulkDialog.getByTestId("proxy-registry-bulk-apply").click();

    await expect
      .poll(() => state.bulkAssignCalls, {
        message: "Expected bulk assign API to be called exactly once",
      })
      .toBe(1);

    await row.getByRole("button", { name: "Delete" }).click();
    await expect
      .poll(() => state.proxies.some((proxy) => proxy.name === "Registry Smoke Proxy"))
      .toBe(false);
    await expect(page.locator("tr", { hasText: "Registry Smoke Proxy" })).toHaveCount(0);
  });
});
