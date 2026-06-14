import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// Dynamic import to pick up ESM module
const { parseOpenapi, getEndpointsForArea } = await import("../../src/lib/agentSkills/openapiParser.ts");

// ─── Fixture helpers ──────────────────────────────────────────────────────────

/**
 * Creates a temporary directory with a minimal openapi.yaml fixture,
 * changes CWD to it, and returns a cleanup function.
 */
function withFixtureOpenapi(yamlContent: string): { cleanup: () => void } {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-openapi-test-"));
  const docsDir = path.join(tmpDir, "docs", "reference");
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, "openapi.yaml"), yamlContent, "utf-8");

  const originalCwd = process.cwd();
  process.chdir(tmpDir);

  return {
    cleanup() {
      process.chdir(originalCwd);
      fs.rmSync(tmpDir, { recursive: true, force: true });
    },
  };
}

// ─── Fixture YAML ─────────────────────────────────────────────────────────────

const FIXTURE_YAML = `
openapi: 3.1.0
info:
  title: OmniRoute Test
  version: 1.0.0
paths:
  /api/providers:
    get:
      tags: [Providers]
      summary: List provider connections
      description: Returns all configured provider connections.
    post:
      tags: [Providers]
      summary: Add provider connection
  /api/providers/{id}:
    get:
      tags: [Providers]
      summary: Get provider by id
    patch:
      tags: [Providers]
      summary: Update provider connection
    delete:
      tags: [Providers]
      summary: Remove provider connection
  /api/providers/{id}/test:
    post:
      tags: [Providers]
      summary: Test provider connection
  /api/keys:
    get:
      tags: [APIKeys]
      summary: List API keys
    post:
      tags: [APIKeys]
      summary: Create API key
  /api/keys/{id}:
    delete:
      tags: [APIKeys]
      summary: Revoke API key
  /api/usage/analytics:
    get:
      tags: [Usage]
      summary: Get usage analytics
  /api/v1/chat/completions:
    post:
      tags: [Chat]
      summary: Create chat completion
  /api/settings:
    get:
      tags: [Settings]
      summary: Get settings
    put:
      tags: [Settings]
      summary: Update settings
`;

// ─── Tests using fixture ──────────────────────────────────────────────────────

test("parseOpenapi() returns paths Map with all operations from fixture", () => {
  const { cleanup } = withFixtureOpenapi(FIXTURE_YAML);
  try {
    const { paths } = parseOpenapi();

    assert.ok(paths instanceof Map, "paths should be a Map");
    assert.ok(paths.size > 0, "paths should not be empty");

    // Spot-check a few keys
    assert.ok(paths.has("GET /api/providers"), "Expected GET /api/providers");
    assert.ok(paths.has("POST /api/providers"), "Expected POST /api/providers");
    assert.ok(paths.has("GET /api/providers/{id}"), "Expected GET /api/providers/{id}");
    assert.ok(paths.has("DELETE /api/providers/{id}"), "Expected DELETE /api/providers/{id}");
    assert.ok(paths.has("POST /api/v1/chat/completions"), "Expected POST /api/v1/chat/completions");
  } finally {
    cleanup();
  }
});

test("parseOpenapi() groups /api/providers/* under 'providers' area", () => {
  const { cleanup } = withFixtureOpenapi(FIXTURE_YAML);
  try {
    const { areas } = parseOpenapi();

    const providerOps = areas.get("providers");
    assert.ok(providerOps, "Expected 'providers' area to exist");
    assert.ok(
      providerOps!.length >= 5,
      `Expected at least 5 provider endpoints, got ${providerOps!.length}`,
    );

    const paths = providerOps!.map((op) => op.path);
    assert.ok(paths.includes("/api/providers"), "Expected /api/providers");
    assert.ok(paths.includes("/api/providers/{id}"), "Expected /api/providers/{id}");
    assert.ok(paths.includes("/api/providers/{id}/test"), "Expected /api/providers/{id}/test");
  } finally {
    cleanup();
  }
});

test("parseOpenapi() groups /api/keys/* under 'api-keys' area", () => {
  const { cleanup } = withFixtureOpenapi(FIXTURE_YAML);
  try {
    const { areas } = parseOpenapi();
    const keyOps = areas.get("api-keys");
    assert.ok(keyOps, "Expected 'api-keys' area to exist");
    assert.ok(keyOps!.length >= 2, `Expected at least 2 key endpoints, got ${keyOps!.length}`);
  } finally {
    cleanup();
  }
});

test("parseOpenapi() groups /api/v1/* under 'inference' area", () => {
  const { cleanup } = withFixtureOpenapi(FIXTURE_YAML);
  try {
    const { areas } = parseOpenapi();
    const inferenceOps = areas.get("inference");
    assert.ok(inferenceOps, "Expected 'inference' area to exist");
    assert.ok(
      inferenceOps!.length >= 1,
      `Expected at least 1 inference endpoint, got ${inferenceOps!.length}`,
    );
    assert.ok(
      inferenceOps!.some((op) => op.path === "/api/v1/chat/completions"),
      "Expected /api/v1/chat/completions in inference area",
    );
  } finally {
    cleanup();
  }
});

test("parseOpenapi() OpenapiPath entries have required fields", () => {
  const { cleanup } = withFixtureOpenapi(FIXTURE_YAML);
  try {
    const { paths } = parseOpenapi();
    for (const [key, op] of paths) {
      assert.ok(typeof op.method === "string" && op.method.length > 0, `${key}: method missing`);
      assert.ok(typeof op.path === "string" && op.path.length > 0, `${key}: path missing`);
      assert.ok(typeof op.summary === "string", `${key}: summary not a string`);
      assert.ok(Array.isArray(op.tags), `${key}: tags not an array`);
    }
  } finally {
    cleanup();
  }
});

test("parseOpenapi() throws if openapi.yaml is missing", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-openapi-missing-"));
  const originalCwd = process.cwd();
  process.chdir(tmpDir);
  try {
    assert.throws(
      () => parseOpenapi(),
      /openapiParser: could not read/,
      "Expected error when openapi.yaml is missing",
    );
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("parseOpenapi() returns empty areas Map for YAML with no paths", () => {
  const emptyPathsYaml = `
openapi: 3.1.0
info:
  title: Empty
  version: 1.0.0
paths: {}
`;
  const { cleanup } = withFixtureOpenapi(emptyPathsYaml);
  try {
    const { paths, areas } = parseOpenapi();
    assert.equal(paths.size, 0);
    assert.equal(areas.size, 0);
  } finally {
    cleanup();
  }
});

// ─── Integration test: real openapi.yaml (gated) ─────────────────────────────

const SKIP_REAL = process.env.SKIP_REAL_OPENAPI === "1";

test(
  "parseOpenapi() with real openapi.yaml: providers area has ≥5 endpoints",
  { skip: SKIP_REAL ? "SKIP_REAL_OPENAPI=1" : false },
  () => {
    // This test runs from the project root (the worktree).
    // It will fail if openapi.yaml doesn't exist — that's intentional.
    const { areas } = parseOpenapi();
    const providerOps = areas.get("providers");
    assert.ok(providerOps, "Expected 'providers' area in real OpenAPI spec");
    assert.ok(
      providerOps!.length >= 5,
      `Expected ≥5 provider endpoints in real spec, got ${providerOps!.length}`,
    );
  },
);

test(
  "getEndpointsForArea('providers') with real openapi.yaml: returns ≥5 strings",
  { skip: SKIP_REAL ? "SKIP_REAL_OPENAPI=1" : false },
  () => {
    const endpoints = getEndpointsForArea("providers");
    assert.ok(
      endpoints.length >= 5,
      `Expected ≥5 provider endpoint strings, got ${endpoints.length}: ${endpoints.join(", ")}`,
    );
    // Each entry should match "METHOD /path"
    for (const ep of endpoints) {
      assert.match(ep, /^[A-Z]+ \//, `Endpoint "${ep}" does not match METHOD /path format`);
    }
  },
);
