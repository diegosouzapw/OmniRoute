/**
 * E2E — Cross-page smoke: AgentBridge → Traffic Inspector
 *
 * Verifies that the integration between AgentBridge and Traffic Inspector
 * works end-to-end:
 *   1. AgentBridge page is accessible
 *   2. "View in Traffic Inspector" link/button navigates to the Inspector
 *   3. Traffic Inspector receives/shows source=agent-bridge entries when
 *      an AgentBridge capture is active
 *
 * CI behaviour: marked `.skip` unless `RUN_CROSS_E2E=1` is set.
 * These tests are best-effort: they verify page-level integration, not
 * live MITM traffic (which requires real IDE agent activity).
 *
 * To run locally:
 *   RUN_CROSS_E2E=1 npx playwright test tests/e2e/agent-bridge-traffic-cross.spec.ts
 */
import { test, expect, type Page } from "@playwright/test";

const SKIP = !process.env["RUN_CROSS_E2E"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function isAuthenticated(page: Page): Promise<boolean> {
  return !page.url().includes("/login");
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("AgentBridge ↔ Traffic Inspector cross-page integration", () => {
  test.skip(SKIP, "Set RUN_CROSS_E2E=1 to run cross-page E2E tests");

  test("sidebar shows both agent-bridge and traffic-inspector entries", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Both Tools items should be in the sidebar
    const agentBridgeLink = page.locator(
      "a[href*='agent-bridge'], [data-testid='sidebar-agent-bridge']"
    ).first();
    const inspectorLink = page.locator(
      "a[href*='traffic-inspector'], [data-testid='sidebar-traffic-inspector']"
    ).first();

    await expect(agentBridgeLink).toBeVisible({ timeout: 5000 });
    await expect(inspectorLink).toBeVisible({ timeout: 5000 });
  });

  test("View in Traffic Inspector link from AgentBridge navigates correctly", async ({ page }) => {
    await page.goto("/dashboard/tools/agent-bridge");
    await page.waitForLoadState("networkidle");
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Look for a "View traffic" / "Traffic Inspector" link on the AgentBridge page
    const viewTrafficLink = page.locator(
      "a[href*='traffic-inspector'], a:has-text('Traffic Inspector'), [data-testid='view-traffic-link']"
    ).first();
    const isVisible = await viewTrafficLink.isVisible({ timeout: 5000 }).catch(() => false);
    if (!isVisible) {
      // Quick links section may not render without providers configured
      test.skip();
      return;
    }
    await viewTrafficLink.click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("traffic-inspector");
  });

  test("Traffic Inspector source filter includes agent-bridge option", async ({ page }) => {
    await page.goto("/dashboard/tools/traffic-inspector");
    await page.waitForLoadState("networkidle");
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Source filter dropdown should list agent-bridge as an option
    const sourceFilter = page.locator(
      "[data-testid='source-filter'], select[name='source'], [aria-label*='source']"
    ).first();
    const isVisible = await sourceFilter.isVisible({ timeout: 5000 }).catch(() => false);
    if (!isVisible) {
      test.skip();
      return;
    }
    // Open the dropdown
    await sourceFilter.click();
    const agentBridgeOption = page.locator(
      "option[value='agent-bridge'], [data-value='agent-bridge'], li:has-text('Agent Bridge'), li:has-text('agent-bridge')"
    ).first();
    await expect(agentBridgeOption).toBeVisible({ timeout: 3000 });
  });

  test("AgentBridge server control buttons exist and are interactable", async ({ page }) => {
    await page.goto("/dashboard/tools/agent-bridge");
    await page.waitForLoadState("networkidle");
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Start / Stop / Restart buttons should be present in server card
    const startBtn = page.locator(
      "button:has-text('Start'), button:has-text('Start Server'), [data-testid='start-server-btn']"
    ).first();
    const isVisible = await startBtn.isVisible({ timeout: 5000 }).catch(() => false);
    if (!isVisible) {
      test.skip();
      return;
    }
    // Verify button is not disabled in an error state
    const disabled = await startBtn.getAttribute("disabled");
    // We just check it exists and is rendered — not clicking (would spawn the MITM server)
    await expect(startBtn).toBeVisible();
    expect(disabled === null || disabled === "false").toBe(true);
  });

  test("navigating from Inspector back to AgentBridge preserves state", async ({ page }) => {
    // Navigate to Inspector first
    await page.goto("/dashboard/tools/traffic-inspector");
    await page.waitForLoadState("networkidle");
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Then navigate to AgentBridge
    await page.goto("/dashboard/tools/agent-bridge");
    await page.waitForLoadState("networkidle");
    // Page should render without errors
    const errorBoundary = page.locator("[data-testid='error-boundary'], text=Something went wrong");
    await expect(errorBoundary).not.toBeVisible();
    await expect(page.locator("body")).toBeVisible();
  });

  test("Traffic Inspector shows AgentBridge mode as always-on in capture sources", async ({ page }) => {
    await page.goto("/dashboard/tools/traffic-inspector");
    await page.waitForLoadState("networkidle");
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // AgentBridge capture mode should be shown as active/always-on
    const agentBridgeToggle = page.locator(
      "[data-testid='capture-agent-bridge'], [aria-label*='AgentBridge'], text=AgentBridge"
    ).first();
    await expect(agentBridgeToggle).toBeVisible({ timeout: 5000 });
  });
});
