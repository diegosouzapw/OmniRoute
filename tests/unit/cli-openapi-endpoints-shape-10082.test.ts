import test from "node:test";
import assert from "node:assert/strict";

// #10082 — `GET /api/openapi/spec` answers with a compact catalog
// ({ info, servers, tags, endpoints[], schemas }), not an OpenAPI document.
// The CLI read `spec.paths`, so `openapi endpoints` and `openapi paths` printed
// "(empty)" against a live server and `openapi validate` reported the API as
// invalid, even though 318 endpoints were sitting in `spec.endpoints`.

const { extractEndpoints, extractPaths } = await import("../../bin/cli/commands/openapi.mjs");

const CATALOG_SHAPE = {
  info: { title: "OmniRoute API", version: "3.8.50" },
  servers: [{ url: "http://localhost:20128" }],
  tags: ["Playground"],
  endpoints: [
    {
      method: "POST",
      path: "/api/playground/improve-prompt",
      tags: ["Playground"],
      summary: "Improve prompt via LLM",
    },
    { method: "GET", path: "/api/providers", summary: "List provider connections" },
    { path: "/api/health", description: "Health probe" },
  ],
  schemas: {},
};

const SPEC_SHAPE = {
  openapi: "3.1.0",
  info: { title: "OmniRoute API", version: "3.8.50" },
  paths: {
    "/api/providers": {
      // Path Item fields that sit alongside operations must not be treated as one.
      parameters: [{ name: "limit", in: "query" }],
      summary: "Provider connections",
      get: { summary: "List provider connections", operationId: "listProviders" },
      post: { description: "Create connection", operationId: "createProvider" },
    },
    "/api/health": { get: { summary: "Health probe" } },
  },
};

test("extractEndpoints reads the compact catalog shape served by /api/openapi/spec", () => {
  const rows = extractEndpoints(CATALOG_SHAPE);

  assert.equal(rows.length, 3);
  assert.deepEqual(rows[0], {
    method: "POST",
    path: "/api/playground/improve-prompt",
    summary: "Improve prompt via LLM",
    operationId: undefined,
  });
  // description is used when summary is absent, and method defaults to GET.
  assert.deepEqual(rows[2], {
    method: "GET",
    path: "/api/health",
    summary: "Health probe",
    operationId: undefined,
  });
});

test("extractEndpoints still reads a real OpenAPI document", () => {
  const rows = extractEndpoints(SPEC_SHAPE);

  assert.equal(rows.length, 3);
  assert.ok(rows.every((r) => r.method !== "PARAMETERS" && r.method !== "SUMMARY"));
  const get = rows.find((r) => r.path === "/api/providers" && r.method === "GET");
  assert.equal(get?.operationId, "listProviders");
  assert.equal(get?.summary, "List provider connections");
});

test("extractPaths returns sorted, de-duplicated paths for both shapes", () => {
  assert.deepEqual(extractPaths(CATALOG_SHAPE), [
    "/api/health",
    "/api/playground/improve-prompt",
    "/api/providers",
  ]);
  // /api/providers has two operations but must appear once.
  assert.deepEqual(extractPaths(SPEC_SHAPE), ["/api/health", "/api/providers"]);
});

test("extractEndpoints degrades to an empty list on junk instead of throwing", () => {
  assert.deepEqual(extractEndpoints(null), []);
  assert.deepEqual(extractEndpoints({}), []);
  assert.deepEqual(extractEndpoints({ info: {}, endpoints: "nope" }), []);
  assert.deepEqual(extractEndpoints({ paths: { "/a": null } }), []);
});
