import test from "node:test";
import assert from "node:assert/strict";

import * as classifyPublicApi from "../../../src/server/authz/classify.ts";
import { classifyRoute } from "../../../src/server/authz/classify.ts";
import type { RouteClass } from "../../../src/server/authz/types.ts";

interface Case {
  name: string;
  path: string;
  method?: string;
  expectedClass: RouteClass;
  expectedNormalized?: string;
}

const cases: Case[] = [
  { name: "root /", path: "/", expectedClass: "MANAGEMENT", expectedNormalized: "/" },
  { name: "dashboard root", path: "/dashboard", expectedClass: "MANAGEMENT" },
  { name: "dashboard nested", path: "/dashboard/settings", expectedClass: "MANAGEMENT" },
  { name: "dashboard onboarding", path: "/dashboard/onboarding", expectedClass: "PUBLIC" },

  {
    name: "/api/v1 base",
    path: "/api/v1",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1",
  },
  {
    name: "/api/v1/chat/completions",
    path: "/api/v1/chat/completions",
    expectedClass: "CLIENT_API",
  },
  { name: "/api/v1/responses", path: "/api/v1/responses", expectedClass: "CLIENT_API" },
  { name: "/api/v1/models", path: "/api/v1/models", expectedClass: "CLIENT_API" },
  { name: "/api/v1/embeddings", path: "/api/v1/embeddings", expectedClass: "CLIENT_API" },
  { name: "/api/v1/files", path: "/api/v1/files", expectedClass: "CLIENT_API" },
  { name: "/api/v1/batches", path: "/api/v1/batches", expectedClass: "CLIENT_API" },
  { name: "/api/v1/ws", path: "/api/v1/ws", expectedClass: "CLIENT_API" },
  { name: "/api/mcp/* stays management", path: "/api/mcp/status", expectedClass: "MANAGEMENT" },

  {
    name: "/v1 alias",
    path: "/v1",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1",
  },
  {
    name: "/v1/chat/completions alias",
    path: "/v1/chat/completions",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1/chat/completions",
  },
  {
    name: "/v1beta alias",
    path: "/v1beta",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1beta",
  },
  {
    name: "/v1beta generateContent alias",
    path: "/v1beta/models/gemini-pro:generateContent",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1beta/models/gemini-pro:generateContent",
  },
  {
    name: "/api/v1beta generateContent",
    path: "/api/v1beta/models/gemini-pro:generateContent",
    expectedClass: "CLIENT_API",
  },
  {
    name: "/v1/v1 double-prefix",
    path: "/v1/v1",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1",
  },
  {
    name: "/v1/v1/embeddings double-prefix",
    path: "/v1/v1/embeddings",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1/embeddings",
  },
  {
    name: "/chat/completions alias",
    path: "/chat/completions",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1/chat/completions",
  },
  {
    name: "/responses alias",
    path: "/responses",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1/responses",
  },
  {
    name: "/responses/abc alias",
    path: "/responses/abc",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1/responses/abc",
  },
  {
    name: "/codex/* alias collapses to /api/v1/responses",
    path: "/codex/anything",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1/responses",
  },
  {
    name: "/models alias",
    path: "/models",
    expectedClass: "CLIENT_API",
    expectedNormalized: "/api/v1/models",
  },

  {
    name: "/api/auth/login is PUBLIC",
    path: "/api/auth/login",
    method: "POST",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/auth/logout is PUBLIC",
    path: "/api/auth/logout",
    method: "POST",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/auth/status is PUBLIC",
    path: "/api/auth/status",
    method: "GET",
    expectedClass: "PUBLIC",
  },
  { name: "/api/init is PUBLIC", path: "/api/init", method: "POST", expectedClass: "PUBLIC" },
  {
    name: "/api/monitoring/health is PUBLIC",
    path: "/api/monitoring/health",
    method: "GET",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/cloud/auth POST is PUBLIC",
    path: "/api/cloud/auth",
    method: "POST",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/cloud/model/resolve POST is PUBLIC",
    path: "/api/cloud/model/resolve",
    method: "POST",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/cloud/models/alias GET is PUBLIC",
    path: "/api/cloud/models/alias",
    method: "GET",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/cloud/credentials/update PUT is MANAGEMENT",
    path: "/api/cloud/credentials/update",
    method: "PUT",
    expectedClass: "MANAGEMENT",
  },
  {
    name: "/api/cloud/models/alias PUT is MANAGEMENT",
    path: "/api/cloud/models/alias",
    method: "PUT",
    expectedClass: "MANAGEMENT",
  },
  {
    name: "/api/cloud/unknown GET is MANAGEMENT",
    path: "/api/cloud/unknown",
    method: "GET",
    expectedClass: "MANAGEMENT",
  },
  {
    name: "/api/oauth/* is PUBLIC",
    path: "/api/oauth/callback",
    method: "GET",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/sync/bundle is PUBLIC",
    path: "/api/sync/bundle",
    method: "POST",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/settings/require-login GET is PUBLIC readonly",
    path: "/api/settings/require-login",
    method: "GET",
    expectedClass: "PUBLIC",
  },
  {
    name: "/api/settings/require-login POST is MANAGEMENT",
    path: "/api/settings/require-login",
    method: "POST",
    expectedClass: "MANAGEMENT",
  },

  {
    name: "/api/providers/* MUST stay MANAGEMENT",
    path: "/api/providers/openai",
    expectedClass: "MANAGEMENT",
  },
  { name: "/api/keys MANAGEMENT", path: "/api/keys", expectedClass: "MANAGEMENT" },
  { name: "/api/db/health MANAGEMENT", path: "/api/db/health", expectedClass: "MANAGEMENT" },
  { name: "/api/settings MANAGEMENT", path: "/api/settings", expectedClass: "MANAGEMENT" },
  { name: "/api/audit MANAGEMENT", path: "/api/audit", expectedClass: "MANAGEMENT" },

  {
    name: "/api/usage/om-usage is PUBLIC (handler enforces its own API key auth)",
    path: "/api/usage/om-usage",
    method: "GET",
    expectedClass: "PUBLIC",
  },

  {
    name: "Unknown top-level path defaults MANAGEMENT (fail-closed)",
    path: "/totally-unknown",
    expectedClass: "MANAGEMENT",
  },
];

for (const c of cases) {
  test(`classifyRoute: ${c.name}`, () => {
    const r = classifyRoute(c.path, c.method ?? "GET");
    assert.equal(r.routeClass, c.expectedClass, `routeClass for ${c.path}`);
    if (c.expectedNormalized) {
      assert.equal(r.normalizedPath, c.expectedNormalized, `normalizedPath for ${c.path}`);
    }
  });
}

test("classifyRoute returns deterministic result for trailing slash", () => {
  const a = classifyRoute("/api/v1/chat/completions", "POST");
  const b = classifyRoute("/api/v1/chat/completions/", "POST");
  assert.equal(a.routeClass, b.routeClass);
  assert.equal(a.normalizedPath, b.normalizedPath);
});

test("classifyRoute strips trailing slash on root only when not '/'", () => {
  assert.equal(classifyRoute("/").normalizedPath, "/");
});

test("classifyRoute treats /api/v1 prefix exactly", () => {
  assert.equal(classifyRoute("/api/v1abc").routeClass, "MANAGEMENT");
  assert.equal(classifyRoute("/api/v1/x").routeClass, "CLIENT_API");
  assert.equal(classifyRoute("/api/v1betamax").routeClass, "MANAGEMENT");
  assert.equal(classifyRoute("/api/v1beta/models").routeClass, "CLIENT_API");
});

test("classify module public surface only exposes route classification", () => {
  assert.equal("classifyRoute" in classifyPublicApi, true);
  assert.equal("isClientApi" in classifyPublicApi, false);
  assert.equal("isManagement" in classifyPublicApi, false);
  assert.equal("isPublic" in classifyPublicApi, false);
});
