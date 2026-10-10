import test from "node:test";
import assert from "node:assert/strict";

import {
  PUBLIC_API_ROUTE_PREFIXES,
  isPublicApiRoute,
} from "../../../src/shared/constants/publicApiRoutes.ts";
import { classifyRoute } from "../../../src/server/authz/classify.ts";

// #15153 — the Google/GitHub login routes are hit by a visitor that has no session yet. If the
// route guard classifies them MANAGEMENT, requireLogin answers 401 before the handler runs and
// the "Continue with Google/GitHub" button can never work. The handlers' own unit tests call
// GET() directly, so only a classifyRoute assertion catches this.

const SOCIAL_ROUTES = [
  "/api/auth/google/login",
  "/api/auth/google/callback",
  "/api/auth/github/login",
  "/api/auth/github/callback",
];

test("social login routes classify PUBLIC so an unauthenticated visitor can reach them", () => {
  for (const path of SOCIAL_ROUTES) {
    const classification = classifyRoute(path, "GET");
    assert.equal(classification.routeClass, "PUBLIC", `${path} must be PUBLIC`);
  }
});

test("social login prefixes are genuine subtrees (end in a slash)", () => {
  for (const prefix of ["/api/auth/google/", "/api/auth/github/"]) {
    assert.ok(PUBLIC_API_ROUTE_PREFIXES.includes(prefix), `${prefix} missing from public prefixes`);
  }
});

test("siblings that merely share the leading characters stay MANAGEMENT", () => {
  for (const path of [
    "/api/auth/google",
    "/api/auth/googleplus/login",
    "/api/auth/github-app/login",
    "/api/auth/githubber",
  ]) {
    assert.equal(isPublicApiRoute(path, "GET"), false, path);
  }
});
