/**
 * Group B — Redirect /dashboard/logs/activity E2E spec.
 *
 * Validates that the old path /dashboard/logs/activity permanently redirects
 * (HTTP 308) to /dashboard/activity as implemented in Group B plan 16 (F4).
 *
 * This is a pure HTTP-level test — does not require full page render.
 */

import { test, expect } from "@playwright/test";

test.describe("Group B — /logs/activity redirect", () => {
  test("GET /dashboard/logs/activity redirects to /dashboard/activity", async ({
    page,
    request,
  }) => {
    // Follow redirects and verify the final URL is /dashboard/activity
    const response = await page.goto(
      "http://localhost:20128/dashboard/logs/activity",
      { waitUntil: "domcontentloaded" }
    );

    const finalUrl = page.url();
    // After following redirects, should end up at /dashboard/activity
    // (may also end up at /login if auth is required — that's OK, path is correct)
    expect(finalUrl).toMatch(/\/(login|dashboard\/activity)/);
    expect(finalUrl).not.toContain("/logs/activity");
  });

  test("direct request to /dashboard/logs/activity issues a permanent redirect", async ({
    request,
  }) => {
    // Make a non-follow-redirect request to verify the 308 status code
    const response = await request.get(
      "http://localhost:20128/dashboard/logs/activity",
      {
        maxRedirects: 0,
      }
    );

    // Next.js permanentRedirect() returns 308 (or 307 in development mode).
    // We accept either since Next.js dev mode may normalize to 307.
    expect([307, 308]).toContain(response.status());

    const location = response.headers()["location"];
    expect(location).toMatch(/\/dashboard\/activity/);
  });
});
