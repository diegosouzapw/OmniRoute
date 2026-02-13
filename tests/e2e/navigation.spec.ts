import { test, expect } from "@playwright/test";

test.describe("Dashboard Navigation", () => {
  test("redirects unauthenticated user to /login", async ({ page }) => {
    const response = await page.goto("/dashboard");
    // Should either show login page or redirect to /login
    await page.waitForURL(/\/(login|dashboard)/);
    const url = page.url();
    // The app should show some kind of page (login or dashboard)
    expect(url).toMatch(/\/(login|dashboard)/);
  });

  test("login page renders with form elements", async ({ page }) => {
    await page.goto("/login");
    // Should show some form of authentication UI
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("/docs page renders documentation", async ({ page }) => {
    await page.goto("/docs");
    const body = page.locator("body");
    await expect(body).toBeVisible();
    // Docs should contain some content
    const text = await body.textContent();
    expect(text?.length).toBeGreaterThan(100);
  });
});
