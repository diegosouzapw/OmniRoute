/**
 * Auth redirect: active sessions are redirected from /login to /dashboard.
 *
 * Upstream: decolua/9router#3005 — fix(auth): redirect active sessions from /login
 * When a user navigates to /login while already authenticated, the login page
 * fetches /api/settings/require-login and redirects to /dashboard.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("auth redirect login (port from 9router#3005)", () => {
  it("login page checks data.authenticated === true before showing the form", () => {
    const source = fs.readFileSync(path.resolve("src/app/login/page.tsx"), "utf-8");
    // The redirect guard must check both:
    //   - authenticated=true (active session → redirect to dashboard)
    //   - requireLogin=false (no auth configured → allow access)
    const redirectCheck = source.match(/if\s*\(.*authenticated.*requireLogin.*\)/);
    assert.ok(redirectCheck, "login page must check both authenticated and requireLogin");
    assert.ok(
      source.includes("data.authenticated === true"),
      "login page must check data.authenticated === true for redirect",
    );
  });

  it("require-login API route returns authenticated field", () => {
    const source = fs.readFileSync(
      path.resolve("src/app/api/settings/require-login/route.ts"),
      "utf-8",
    );
    assert.ok(
      source.includes("authenticated:"),
      "require-login route must include authenticated in the response",
    );
    assert.ok(
      source.includes("authenticated,"),
      "authenticated must be part of the JSON response object (spread or key)",
    );
  });
});
