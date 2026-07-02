import { expect, test } from "@playwright/test";

const errorPages = [
  {
    path: "/400",
    heading: "Bad Request",
    primaryHref: "/docs",
    secondaryHref: "/dashboard/translator",
  },
  {
    path: "/401",
    heading: "Unauthorized",
    primaryHref: "/login",
    secondaryHref: "/dashboard/api-manager",
  },
  {
    path: "/403",
    heading: "Forbidden",
    primaryHref: "/forbidden",
    secondaryHref: "/dashboard/settings?tab=security",
  },
  {
    path: "/408",
    heading: "Request Timeout",
    primaryHref: "/dashboard/endpoint",
    secondaryHref: "/status",
  },
  {
    path: "/429",
    heading: "Too Many Requests",
    primaryHref: "/dashboard/settings?tab=resilience",
    secondaryHref: "/dashboard/combos",
  },
  {
    path: "/500",
    heading: "Internal Server Error",
    primaryHref: "/dashboard/health",
    secondaryHref: "/dashboard/logs",
  },
  {
    path: "/502",
    heading: "Bad Gateway",
    primaryHref: "/dashboard/providers",
    secondaryHref: "/dashboard/translator",
  },
  {
    path: "/503",
    heading: "Service Unavailable",
    primaryHref: "/maintenance",
    secondaryHref: "/status",
  },
];

test.describe("Error and Resilience Pages", () => {
  for (const pageSpec of errorPages) {
    test(`${pageSpec.path} renders actionable recovery actions`, async ({ page }) => {
      const response = await page.goto(pageSpec.path);
      expect(response).toBeTruthy();
      const expectedHttpStatus = Number.parseInt(pageSpec.path.slice(1), 10);
      expect([200, expectedHttpStatus]).toContain(response?.status());

      await expect(page.getByRole("heading", { name: pageSpec.heading })).toBeVisible();
      await expect(page.locator(`a[href="${pageSpec.primaryHref}"]`).first()).toBeVisible();
      await expect(page.locator(`a[href="${pageSpec.secondaryHref}"]`).first()).toBeVisible();
    });
  }

  test("missing route renders not-found recovery actions", async ({ page }) => {
    await page.goto("/route-that-does-not-exist");

    await expect(page.getByRole("heading", { name: /Page not found/i })).toBeVisible();
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible();
    await expect(page.locator('a[href="/status"]')).toBeVisible();
  });

  test("/offline explains connectivity and offers recovery actions", async ({ page }) => {
    const response = await page.goto("/offline");
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { name: "Connectivity Issue" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Retry Connection" })).toBeVisible();
    await expect(page.locator('a[href="/status"]')).toBeVisible();
  });

  test("/maintenance provides maintenance guidance and status action", async ({ page }) => {
    const response = await page.goto("/maintenance");
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { name: "Scheduled Maintenance" })).toBeVisible();
    await expect(page.locator('a[href="/status"]')).toBeVisible();
    await expect(page.locator('a[href="/dashboard/health"]')).toBeVisible();
  });

  test("/status shows monitoring shell and refresh control", async ({ page }) => {
    const response = await page.goto("/status");
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { name: "System Status" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Refresh" })).toBeVisible();
  });
});
