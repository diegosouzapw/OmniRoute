import test from "node:test";
import assert from "node:assert/strict";

import {
  PUBLIC_API_ROUTE_PREFIXES,
  PUBLIC_API_ROUTES_EXACT,
  PUBLIC_READONLY_API_ROUTES_EXACT,
  PUBLIC_READONLY_CORS_API_ROUTES,
  isPublicApiRoute,
} from "../../../src/shared/constants/publicApiRoutes.ts";
import { classifyRoute } from "../../../src/server/authz/classify.ts";

// GHSA-74g9-q8f6-793h — `isPublicApiRoute()` matched every entry of
// PUBLIC_API_ROUTE_PREFIXES with startsWith(), but most entries name ONE exact
// route, not a subtree. As prefixes they also marked every adjacent path
// sharing the same leading characters as PUBLIC, skipping the MANAGEMENT auth
// gate. `/api/usage/om-usage<suffix>` resolves to the dynamic route
// `/api/usage/[connectionId]`, whose handler carries no auth of its own.

test("every prefix entry is a genuine subtree (ends in a slash)", () => {
  for (const prefix of PUBLIC_API_ROUTE_PREFIXES) {
    assert.equal(
      prefix.endsWith("/"),
      true,
      `${prefix} is matched with startsWith(): a prefix that does not end in "/" also ` +
        `matches every adjacent path sharing its leading characters (GHSA-74g9-q8f6-793h)`
    );
  }
});

test("exact public routes stay public in both spellings", () => {
  for (const route of PUBLIC_API_ROUTES_EXACT) {
    assert.equal(isPublicApiRoute(route, "POST"), true, route);
    assert.equal(isPublicApiRoute(`${route}/`, "POST"), true, `${route}/`);
  }
  for (const route of [...PUBLIC_READONLY_API_ROUTES_EXACT, ...PUBLIC_READONLY_CORS_API_ROUTES]) {
    assert.equal(isPublicApiRoute(route, "GET"), true, route);
    assert.equal(isPublicApiRoute(`${route}/`, "GET"), true, `${route}/`);
  }
});

test("sibling paths shadowed by an exact route are NOT public", () => {
  const shadowed = [
    "/api/auth/login-as",
    "/api/auth/logout-all",
    "/api/auth/status-page",
    "/api/init-db",
    "/api/sync/bundle-export",
    "/api/cli/connect-token",
    "/api/usage/om-usage-x",
    "/api/usage/om-usageZZZ",
    "/api/skills/collect/chaos-report",
    "/api/health/pings",
    "/api/monitoring/health-detail",
    "/api/settings/require-login-policy",
  ];
  for (const path of shadowed) {
    assert.equal(isPublicApiRoute(path, "GET"), false, `${path} (GET)`);
    assert.equal(isPublicApiRoute(path, "POST"), false, `${path} (POST)`);
  }
});

test("the reported bypass: /api/usage/om-usage<suffix> classifies MANAGEMENT", () => {
  // The live one — Next resolves it to /api/usage/[connectionId], a handler
  // with no auth of its own that reaches fetchAndPersistProviderLimits().
  assert.equal(classifyRoute("/api/usage/om-usage-x", "GET").routeClass, "MANAGEMENT");
  assert.equal(classifyRoute("/api/usage/om-usageZZZ", "GET").routeClass, "MANAGEMENT");
  // The real CLI route keeps its PUBLIC classification (it enforces its own key).
  assert.equal(classifyRoute("/api/usage/om-usage", "GET").routeClass, "PUBLIC");
  assert.equal(classifyRoute("/api/usage/om-usage/", "GET").routeClass, "PUBLIC");
});

test("genuine subtrees stay public all the way down", () => {
  assert.equal(isPublicApiRoute("/api/v1/chat/completions", "POST"), true);
  assert.equal(isPublicApiRoute("/api/oauth/cursor/callback", "GET"), true);
  assert.equal(isPublicApiRoute("/api/auth/oidc/callback", "GET"), true);
  assert.equal(isPublicApiRoute("/api/codex/connect/complete", "POST"), true);
  assert.equal(isPublicApiRoute("/api/telegram/update", "POST"), true);
  assert.equal(isPublicApiRoute("/api/cursor-cli/auth/exchange_user_api_key", "POST"), true);
});

test("read-only method gate is unchanged", () => {
  for (const route of [...PUBLIC_READONLY_API_ROUTES_EXACT, ...PUBLIC_READONLY_CORS_API_ROUTES]) {
    assert.equal(isPublicApiRoute(route, "GET"), true, `${route} GET`);
    assert.equal(isPublicApiRoute(route, "HEAD"), true, `${route} HEAD`);
    assert.equal(isPublicApiRoute(route, "OPTIONS"), true, `${route} OPTIONS`);
    assert.equal(isPublicApiRoute(route, "POST"), false, `${route} POST`);
    assert.equal(isPublicApiRoute(route, "DELETE"), false, `${route} DELETE`);
  }
});

test("CORS relaxation reason set is unchanged", () => {
  // pipeline.ts keys its CORS origin relaxation off `public_readonly_prefix`.
  for (const route of PUBLIC_READONLY_CORS_API_ROUTES) {
    assert.equal(classifyRoute(route, "GET").reason, "public_readonly_prefix", route);
  }
  // /api/health deliberately stays `public_prefix` — folding it into the
  // read-only set would silently widen CORS on it.
  assert.equal(classifyRoute("/api/health", "GET").reason, "public_prefix");
  // ...and a shadowed sibling must not inherit the relaxation either.
  assert.equal(classifyRoute("/api/monitoring/health-detail", "GET").routeClass, "MANAGEMENT");
});

test("LOCAL_ONLY oauth auto-import exclusions still win over the /api/oauth/ subtree", () => {
  for (const route of ["/api/oauth/cursor/auto-import", "/api/oauth/kiro/auto-import"]) {
    assert.equal(isPublicApiRoute(route, "POST"), false, route);
    assert.equal(classifyRoute(route, "POST").routeClass, "MANAGEMENT", route);
  }
});
