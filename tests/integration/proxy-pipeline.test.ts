/**
 * Proxy Pipeline Integration Tests — T-3
 *
 * Tests the proxy pipeline wiring: format detection, credential retry loop,
 * circuit breaker integration, and the new Phase 2 modules (DI container,
 * prompt versioning, plugin architecture, eval cleanup).
 *
 * @module tests/integration/proxy-pipeline.test.ts
 */

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

function readSrc(relPath) {
  const full = join(ROOT, "src", relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

function readOpenSse(relPath) {
  const full = join(ROOT, "open-sse", relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

// ═══════════════════════════════════════════════════
// 1. Chat Handler Pipeline Wiring
// ═══════════════════════════════════════════════════

describe("Chat Pipeline — handleSingleModelChat decomposition", () => {
  const src = readSrc("sse/handlers/chat.ts");
  const helpersSrc = readSrc("sse/handlers/chatHelpers.ts");
  const coreSrc = readOpenSse("handlers/chatCore.ts");

  it("should define resolveModelOrError helper", () => {
    assert.ok(helpersSrc, "chatHelpers.ts should exist");
    assert.match(helpersSrc, /function\s+resolveModelOrError/);
  });

  it("should define checkPipelineGates helper", () => {
    assert.match(helpersSrc, /function\s+checkPipelineGates/);
  });

  it("should define executeChatWithBreaker helper", () => {
    assert.match(helpersSrc, /function\s+executeChatWithBreaker/);
  });

  it("should keep cost accounting in the core chat pipeline", () => {
    assert.ok(coreSrc, "open-sse/handlers/chatCore.ts should exist");
    assert.match(coreSrc, /calculateCost\(/);
    assert.match(coreSrc, /recordCost\(/);
  });

  it("handleSingleModelChat should use resolveModelOrError", () => {
    // Extract handleSingleModelChat body
    assert.match(src, /resolveModelOrError\(\s*modelStr/);
  });

  it("handleSingleModelChat should use checkPipelineGates", () => {
    assert.match(src, /checkPipelineGates\(provider/);
  });

  it("handleSingleModelChat should use executeChatWithBreaker", () => {
    assert.match(src, /executeChatWithBreaker\(/);
  });

  it("chatCore should record cost for both non-streaming and streaming responses", () => {
    assert.match(coreSrc, /if \(apiKeyInfo\?\.id && estimatedCost > 0\)/);
    assert.match(coreSrc, /if \(apiKeyInfo\?\.id && streamUsage\)/);
  });
});

describe("Chat Pipeline — combo fallback support", () => {
  const src = readSrc("sse/handlers/chat.ts");

  it("should import handleComboChat", () => {
    assert.ok(src, "chat.ts should exist");
    assert.match(src, /handleComboChat/);
  });

  it("should delegate to handleSingleModelChat for each combo model", () => {
    assert.match(src, /handleSingleModel.*handleSingleModelChat/s);
  });

  it("should preflight provider credentials before attempting combo models", () => {
    assert.match(src, /getProviderCredentialsWithQuotaPreflight/);
  });
});

describe("Chat Pipeline — circuit breaker integration", () => {
  const helpersSrc = readSrc("sse/handlers/chatHelpers.ts");

  it("should import providerCircuitOpenResponse", () => {
    assert.ok(helpersSrc, "chatHelpers.ts should exist");
    assert.match(helpersSrc, /providerCircuitOpenResponse/);
  });

  it("should handle circuit-open responses with retry-after", () => {
    assert.match(helpersSrc, /retryAfterMs/);
  });

  it("should reject requests when circuit is open via structured provider breaker response", () => {
    assert.match(helpersSrc, /providerCircuitOpenResponse\(provider,\s*retryAfterSec\)/);
  });
});

// ═══════════════════════════════════════════════════
// 2. DI Container (A-5)
// ═══════════════════════════════════════════════════

describe("DI Container — container.ts", () => {
  let container;

  beforeEach(async () => {
    const mod = await import("../../src/lib/container.ts");
    container = mod.container;
  });

  afterEach(() => {
    // Don't reset — keep default registrations
  });

  it("should export a container singleton", () => {
    assert.ok(container);
    assert.equal(typeof container.register, "function");
    assert.equal(typeof container.resolve, "function");
    assert.equal(typeof container.has, "function");
  });

  it("should register and resolve a custom service", () => {
    container.register("testService", () => ({ greeting: "hello" }));
    const svc = container.resolve("testService");
    assert.deepEqual(svc, { greeting: "hello" });
  });

  it("should return cached singleton on repeated resolve", () => {
    let count = 0;
    container.register("counterService", () => ({ value: ++count }));
    const a = container.resolve("counterService");
    const b = container.resolve("counterService");
    assert.strictEqual(a, b);
    assert.equal(a.value, 1);
  });

  it("should throw on resolving unregistered service", () => {
    assert.throws(() => container.resolve("nonExistent"), /No factory registered/);
  });

  it("should have default registrations", () => {
    const names = container.list();
    assert.ok(names.includes("settings"), "should have settings");
    assert.ok(names.includes("db"), "should have db");
    assert.ok(names.includes("encryption"), "should have encryption");
    assert.ok(names.includes("policyEngine"), "should have policyEngine");
    assert.ok(names.includes("circuitBreaker"), "should have circuitBreaker");
    assert.ok(names.includes("telemetry"), "should have telemetry");
  });

  it("should support re-registration (overwrite)", () => {
    container.register("testOverwrite", () => "v1");
    assert.equal(container.resolve("testOverwrite"), "v1");
    container.register("testOverwrite", () => "v2");
    assert.equal(container.resolve("testOverwrite"), "v2");
  });
});

// ═══════════════════════════════════════════════════
// 3. Plugin Architecture (L-8) — hooks.ts registry
// ═══════════════════════════════════════════════════

describe("Plugin Architecture — plugins/hooks.ts", () => {
  let hooks;

  beforeEach(async () => {
    hooks = await import("../../src/lib/plugins/hooks.ts");
    hooks.resetHooks();
  });

  afterEach(() => {
    hooks.resetHooks();
  });

  it("should register hooks for events", () => {
    hooks.registerHook("onRequest", "test-logger", () => {}, 10);
    const list = hooks.getHooks("onRequest");
    assert.equal(list.length, 1);
    assert.equal(list[0].pluginName, "test-logger");
    assert.equal(list[0].priority, 10);
  });

  it("should sort hooks by priority", () => {
    hooks.registerHook("onRequest", "low", () => {}, 200);
    hooks.registerHook("onRequest", "high", () => {}, 1);
    hooks.registerHook("onRequest", "mid", () => {}, 50);

    const list = hooks.getHooks("onRequest");
    assert.deepEqual(
      list.map((r) => r.pluginName),
      ["high", "mid", "low"]
    );
  });

  it("should run onRequest hooks in priority order", async () => {
    const order = [];
    hooks.registerHook("onRequest", "first", () => {
      order.push("first");
    }, 1);
    hooks.registerHook("onRequest", "second", () => {
      order.push("second");
    }, 2);

    const ctx = { requestId: "r1", body: {}, model: "test", metadata: {} };
    await hooks.runOnRequest(ctx);
    assert.deepEqual(order, ["first", "second"]);
  });

  it("should support request blocking via emitHookBlocking", async () => {
    hooks.registerHook("onRequest", "blocker", () => ({
      blocked: true,
      response: { error: "denied" },
    }), 1);
    hooks.registerHook("onRequest", "never-runs", () => {
      throw new Error("should not run");
    }, 2);

    const ctx = { requestId: "r2", body: {}, model: "test", metadata: {} };
    const result = await hooks.emitHookBlocking("onRequest", ctx);
    assert.equal(result.blocked, true);
    assert.deepEqual(result.response, { error: "denied" });
  });

  it("should unregister all hooks for a plugin", () => {
    hooks.registerHook("onRequest", "removable", () => {});
    hooks.registerHook("onResponse", "removable", () => {});
    assert.equal(hooks.getHooks("onRequest").length, 1);
    hooks.unregisterHooks("removable");
    assert.equal(hooks.getHooks("onRequest").length, 0);
    assert.equal(hooks.getHooks("onResponse").length, 0);
  });

  it("should run onResponse hooks", async () => {
    hooks.registerHook("onResponse", "response-modifier", (payload) => ({
      response: { ...payload.response, modified: true },
    }));

    const ctx = { requestId: "r3", body: {}, model: "test", metadata: {} };
    const result = await hooks.runOnResponse(ctx, { data: "original" });
    assert.equal(result.modified, true);
    assert.equal(result.data, "original");
  });

  it("should fire onError hooks", async () => {
    let caught = false;
    hooks.registerHook("onError", "error-handler", () => {
      caught = true;
    });

    const ctx = { requestId: "r4", body: {}, model: "test", metadata: {} };
    await hooks.runOnError(ctx, new Error("test error"));
    assert.equal(caught, true);
  });
});

// ═══════════════════════════════════════════════════
// 4. Prompt Template Versioning (L-6)
// ═══════════════════════════════════════════════════

describe("Prompt Template Versioning — prompts.ts module existence", () => {
  it("prompts.ts should exist", () => {
    const full = join(ROOT, "src", "lib", "db", "prompts.ts");
    assert.ok(existsSync(full), "prompts.ts should exist");
  });

  it("should export CRUD functions", () => {
    const src = readFileSync(join(ROOT, "src", "lib", "db", "prompts.ts"), "utf8");
    assert.match(src, /export function savePrompt/);
    assert.match(src, /export function getActivePrompt/);
    assert.match(src, /export function getPromptVersion/);
    assert.match(src, /export function listPromptVersions/);
    assert.match(src, /export function listPrompts/);
    assert.match(src, /export function rollbackPrompt/);
    assert.match(src, /export function renderPrompt/);
  });

  it("should define PromptTemplate interface", () => {
    const src = readFileSync(join(ROOT, "src", "lib", "db", "prompts.ts"), "utf8");
    assert.match(src, /export interface PromptTemplate/);
  });

  it("should use content hashing for deduplication", () => {
    const src = readFileSync(join(ROOT, "src", "lib", "db", "prompts.ts"), "utf8");
    assert.match(src, /content_hash/);
    assert.match(src, /sha256/);
  });
});

// ═══════════════════════════════════════════════════
// 5. Eval cleanup (Task 28)
// ═══════════════════════════════════════════════════

describe("Eval cleanup — orphaned scheduler module", () => {
  it("scheduler.ts should remain deleted", () => {
    const full = join(ROOT, "src", "lib", "evals", "scheduler.ts");
    assert.equal(existsSync(full), false, "scheduler.ts should stay removed");
  });
});

// ═══════════════════════════════════════════════════
// 6. Migration Runner (E-5)
// ═══════════════════════════════════════════════════

describe("Migration System — files exist", () => {
  it("migrationRunner.ts should exist", () => {
    const full = join(ROOT, "src", "lib", "db", "migrationRunner.ts");
    assert.ok(existsSync(full), "migrationRunner.ts should exist");
  });

  it("001_initial_schema.sql should exist", () => {
    const full = join(ROOT, "src", "lib", "db", "migrations", "001_initial_schema.sql");
    assert.ok(existsSync(full), "001_initial_schema.sql should exist");
  });

  it("core.ts should reference migration runner", () => {
    const src = readSrc("lib/db/core.ts");
    assert.ok(src);
    assert.match(src, /runMigrations/);
    assert.match(src, /_omniroute_migrations/);
  });
});

// ═══════════════════════════════════════════════════
// 7. CORS Configuration (L-5)
// ═══════════════════════════════════════════════════

describe("CORS — centralized configuration", () => {
  it("shared/utils/cors.ts should exist", () => {
    const full = join(ROOT, "src", "shared", "utils", "cors.ts");
    assert.ok(existsSync(full), "shared/utils/cors.ts should exist");
  });

  it("should export CORS_HEADERS without a wildcard origin", () => {
    const src = readSrc("shared/utils/cors.ts");
    assert.match(src, /CORS_HEADERS/);
    // Extract the CORS_HEADERS object body (between { and }) to avoid matching JSDoc comments
    const objMatch = src.match(/CORS_HEADERS\s*=\s*\{([^}]+)\}/);
    assert.ok(objMatch, "CORS_HEADERS object should be found");
    assert.doesNotMatch(objMatch[1], /Access-Control-Allow-Origin/);
  });
});
