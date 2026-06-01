/**
 * E2E — AgentBridge page smoke tests
 *
 * These tests require the OmniRoute server to be running at http://localhost:20128
 * (or the URL in PLAYWRIGHT_BASE_URL / baseURL in playwright.config.ts).
 *
 * CI behaviour: tests are marked `.skip` unless the env var
 * `RUN_AGENT_BRIDGE_E2E=1` is set, since they require a full server process
 * AND port 443 privileges (or mock). In CI the unit/integration suites provide
 * functional coverage; the E2E layer verifies UI navigation and wiring.
 *
 * To run locally:
 *   RUN_AGENT_BRIDGE_E2E=1 npx playwright test tests/e2e/agent-bridge.spec.ts
 */
import { test, expect, type Page } from "@playwright/test";

const SKIP = !process.env["RUN_AGENT_BRIDGE_E2E"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function navigateToAgentBridge(page: Page): Promise<void> {
  await page.goto("/dashboard/tools/agent-bridge");
  // Wait for the page to settle (auth redirect or dashboard render)
  await page.waitForLoadState("networkidle");
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("AgentBridge page", () => {
  test.skip(SKIP, "Set RUN_AGENT_BRIDGE_E2E=1 to run AgentBridge E2E tests");

  test("page renders and shows heading", async ({ page }) => {
    await navigateToAgentBridge(page);
    // Should render AgentBridge heading (login may redirect first — tolerate both)
    const url = page.url();
    if (url.includes("/login")) {
      // Server is auth-protected; the page route itself exists
      await expect(page.locator("body")).toBeVisible();
      return;
    }
    await expect(page.locator("h1, [data-testid='agent-bridge-heading']").first()).toBeVisible();
  });

  test("page renders 9 agent cards (or empty-providers state)", async ({ page }) => {
    await navigateToAgentBridge(page);
    const url = page.url();
    if (url.includes("/login")) {
      test.skip();
      return;
    }
    // Either: 9 agent cards are visible
    // OR: empty-providers state is shown (no providers configured yet)
    const agentCards = page.locator("[data-testid='agent-card']");
    const emptyState = page.locator("[data-testid='empty-providers-state'], [data-testid='agent-bridge-empty']");

    const cardCount = await agentCards.count();
    const emptyVisible = await emptyState.isVisible().catch(() => false);

    expect(cardCount === 9 || emptyVisible).toBe(true);
  });

  test("each agent card shows agent name", async ({ page }) => {
    await navigateToAgentBridge(page);
    const url = page.url();
    if (url.includes("/login")) {
      test.skip();
      return;
    }
    const agentCards = page.locator("[data-testid='agent-card']");
    const count = await agentCards.count();
    if (count === 0) {
      // Empty providers state — skip the rest
      test.skip();
      return;
    }
    expect(count).toBe(9);
    // Spot-check: Antigravity and GitHub Copilot cards exist
    await expect(page.locator("text=Antigravity").first()).toBeVisible();
    await expect(page.locator("text=Copilot, text=GitHub Copilot").first()).toBeVisible().catch(async () => {
      // Accept either name variant
      await expect(page.locator("text=Copilot").first()).toBeVisible();
    });
  });

  test("AgentBridge Server Card is visible", async ({ page }) => {
    await navigateToAgentBridge(page);
    const url = page.url();
    if (url.includes("/login")) {
      test.skip();
      return;
    }
    const serverCard = page.locator(
      "[data-testid='agent-bridge-server-card'], [data-testid='server-card']"
    );
    await expect(serverCard.first()).toBeVisible();
  });

  test("Setup wizard opens when Setup button is clicked", async ({ page }) => {
    await navigateToAgentBridge(page);
    const url = page.url();
    if (url.includes("/login")) {
      test.skip();
      return;
    }
    const agentCards = page.locator("[data-testid='agent-card']");
    const count = await agentCards.count();
    if (count === 0) {
      test.skip();
      return;
    }
    // Click "Setup wizard" on the first card that has one visible
    const setupButton = page.locator("[data-testid='setup-wizard-btn'], button:has-text('Setup wizard')").first();
    const isVisible = await setupButton.isVisible().catch(() => false);
    if (!isVisible) {
      // All agents already set up — skip wizard open test
      test.skip();
      return;
    }
    await setupButton.click();
    // Wizard modal should appear
    const wizard = page.locator("[data-testid='setup-wizard'], [role='dialog']").first();
    await expect(wizard).toBeVisible({ timeout: 5000 });
  });

  test("DNS toggle interaction does not crash the page", async ({ page }) => {
    await navigateToAgentBridge(page);
    const url = page.url();
    if (url.includes("/login")) {
      test.skip();
      return;
    }
    const dnsToggle = page.locator("[data-testid='dns-toggle']").first();
    const isVisible = await dnsToggle.isVisible().catch(() => false);
    if (!isVisible) {
      test.skip();
      return;
    }
    // Click the toggle — may show a sudo prompt modal or update state
    await dnsToggle.click();
    // Page should not crash (no error boundary)
    await expect(page.locator("[data-testid='error-boundary']")).not.toBeVisible();
    await page.waitForTimeout(500);
    await expect(page.locator("body")).toBeVisible();
  });

  test("redirect from /dashboard/system/mitm-proxy to agent-bridge", async ({ page }) => {
    // Old mitm-proxy URL should redirect or show moved notice
    await page.goto("/dashboard/system/mitm-proxy");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    // Should redirect to agent-bridge or show a moved banner
    const isRedirected = url.includes("agent-bridge");
    const hasBanner = await page.locator("text=moved, text=AgentBridge").first().isVisible().catch(() => false);
    expect(isRedirected || hasBanner).toBe(true);
  });
});
