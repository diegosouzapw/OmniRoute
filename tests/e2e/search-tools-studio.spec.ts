import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Search Tools Studio", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the search providers catalog API
    await page.route("**/api/search/providers", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          providers: [
            {
              id: "serper",
              name: "Serper",
              kind: "search",
              costPerQuery: 0.001,
              freeMonthlyQuota: 100,
              searchTypes: ["web", "news"],
              status: "configured",
              configureHref: "/dashboard/providers",
            },
            {
              id: "firecrawl",
              name: "Firecrawl",
              kind: "fetch",
              costPerQuery: 0.002,
              freeMonthlyQuota: 0,
              fetchFormats: ["markdown", "html", "links"],
              status: "configured",
              configureHref: "/dashboard/providers",
            },
          ],
        }),
      });
    });

    // Mock the search endpoint
    await page.route("**/api/v1/search", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          provider: "serper",
          results: [
            {
              title: "Test Result",
              url: "https://example.com",
              snippet: "A test search result",
              score: 0.9,
            },
          ],
          cost: 0.001,
        }),
      });
    });

    // Mock the web fetch endpoint
    await page.route("**/api/v1/web/fetch", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          provider: "firecrawl",
          url: "https://example.com",
          content: "# Example Page\n\nThis is a test page.",
          links: ["https://example.com/about"],
          metadata: { title: "Example", description: "Test" },
          screenshot_url: null,
        }),
      });
    });
  });

  test("loads page and shows 3 tabs", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/search-tools");

    await expect(page.locator("body")).toBeVisible();

    // The Studio should render 3 tabs in a tablist
    const tablist = page.getByRole("tablist").first();
    await expect(tablist).toBeVisible({ timeout: 15000 });

    // Check all 3 tabs are present
    const searchTab = page.getByRole("tab", { name: /search/i }).first();
    const scrapeTab = page.getByRole("tab", { name: /scrape/i });
    const compareTab = page.getByRole("tab", { name: /compare/i });

    await expect(searchTab).toBeVisible({ timeout: 15000 });
    await expect(scrapeTab).toBeVisible({ timeout: 15000 });
    await expect(compareTab).toBeVisible({ timeout: 15000 });
  });

  test("shows SearchConceptCard (modalities guide)", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/search-tools");

    // The concept card should be visible and contain a modalities guide
    // It may be rendered as a collapsible section
    const conceptCard = page.locator("[data-testid='search-concept-card'], .search-concept-card").first();

    // Alternative: look for the guide text since it's always visible
    // The card has a "Modalities guide" or similar label
    const guideText = page
      .getByText(/modalities guide|guia de modalidades/i)
      .first();
    await expect(guideText).toBeVisible({ timeout: 15000 });
  });

  test("switches to Scrape tab and shows URL input", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/search-tools");

    // Wait for tabs
    const scrapeTab = page.getByRole("tab", { name: /scrape/i });
    await expect(scrapeTab).toBeVisible({ timeout: 15000 });

    // Click Scrape tab
    await scrapeTab.click();

    // The Scrape tab should have a URL input
    const urlInput = page.locator('input[type="url"], input[placeholder*="http"], input[placeholder*="URL"], input[placeholder*="url"]').first();
    await expect(urlInput).toBeVisible({ timeout: 10000 });
  });

  test("Search tab is active by default", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/search-tools");

    const searchTab = page.getByRole("tab", { name: /search/i }).first();
    await expect(searchTab).toBeVisible({ timeout: 15000 });

    // Search tab should be selected by default
    await expect(searchTab).toHaveAttribute("aria-selected", "true");
  });
});
