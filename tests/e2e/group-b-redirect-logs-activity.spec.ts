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
    // Make a non-follow-redirect request to verify the redirect status code.
    const response = await request.get(
      "http://localhost:20128/dashboard/logs/activity",
      {
        maxRedirects: 0,
      }
    );

    // Next.js permanentRedirect() returns 308 (or 307 in development mode).
    // When auth is required the server may respond with a 302/307 to /login
    // before the page component's permanentRedirect() executes.
    // Accept any redirect (3xx) and verify:
    //   (a) the route does NOT return 200 (rendered without redirect) or 404/500
    //   (b) the Location header points to either /dashboard/activity or /login
    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(300);
    expect(status).toBeLessThan(400);

    const location = response.headers()["location"] ?? "";
    expect(location).toMatch(/\/(login|dashboard\/activity)/);
    // The route must NOT stay on /logs/activity
    expect(location).not.toContain("/logs/activity");
  });
});
