import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Protocol visibility", () => {
  test("shows MCP and A2A tabs inside the endpoint page", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/endpoint");
    await page.waitForLoadState("networkidle");

    // MCP and A2A are now tabs directly in the SegmentedControl
    const mcpTab = page.getByRole("tab", { name: "MCP" });
    const a2aTab = page.getByRole("tab", { name: "A2A" });

    await expect(mcpTab).toBeVisible();
    await expect(a2aTab).toBeVisible();

    // Verify MCP dashboard mounts
    await mcpTab.click();
    // In dev/test it might just show "loading..." or the processStatus card
    await expect(page.locator("body")).not.toContainText(/application error|500/i);

    // Verify A2A dashboard mounts
    await a2aTab.click();
    await expect(page.locator("body")).not.toContainText(/application error|500/i);
  });
});
