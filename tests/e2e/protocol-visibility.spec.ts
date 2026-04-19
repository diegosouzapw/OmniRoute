import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Protocol visibility", () => {
  test("shows MCP/A2A links inside protocols tab in endpoint page", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/endpoint");
    await page.waitForLoadState("networkidle");

    // MCP and A2A are now shown inside the "Protocols" tab — click it first
    const protocolTab = page.getByRole("tab", { name: /protocols|protocolos/i });
    await expect(protocolTab).toBeVisible();
    await protocolTab.click();

    // Links to MCP and A2A management pages appear after tab switch
    await expect(page.locator('a[href="/dashboard/mcp"]').first()).toBeVisible();
    await expect(page.locator('a[href="/dashboard/a2a"]').first()).toBeVisible();

    const mcpLinks = await page.locator('a[href="/dashboard/mcp"]').count();
    const a2aLinks = await page.locator('a[href="/dashboard/a2a"]').count();
    expect(mcpLinks).toBeGreaterThanOrEqual(1);
    expect(a2aLinks).toBeGreaterThanOrEqual(1);
  });

  test("loads MCP and A2A dashboards without runtime error page", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/mcp");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/application error|500/i);

    await gotoDashboardRoute(page, "/dashboard/a2a");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/application error|500/i);
  });
});
