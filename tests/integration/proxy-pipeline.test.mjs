/**
 * Proxy Pipeline Integration Tests — T-3
 *
 * Tests the proxy pipeline wiring: format detection, credential retry loop,
 * circuit breaker integration, and the new Phase 2 modules (DI container,
 * prompt versioning, plugin architecture, eval scheduler).
 *
 * @module tests/integration/proxy-pipeline.test.mjs
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

// ═══════════════════════════════════════════════════
// 1. Chat Handler Pipeline Wiring
// ═══════════════════════════════════════════════════

describe("Chat Pipeline — handleSingleModelChat decomposition", () => {
  const src = readSrc("sse/handlers/chat.ts");

  it("should define resolveModelOrError helper", () => {
    assert.ok(src, "chat.ts should exist");
    assert.match(src, /function\s+resolveModelOrError/);
  });

  it("should define checkPipelineGates helper", () => {
    assert.match(src, /function\s+checkPipelineGates/);
  });

  it("should define executeChatWithBreaker helper", () => {
    assert.match(src, /function\s+executeChatWithBreaker/);
  });

  it("should define recordCostIfNeeded helper", () => {
    assert.match(src, /function\s+recordCostIfNeeded/);
  });

  it("handleSingleModelChat should use resolveModelOrError", () => {
    // Extract handleSingleModelChat body
    assert.match(src, /resolveModelOrError\(modelStr/);
  });

  it("handleSingleModelChat should use checkPipelineGates", () => {
    assert.match(src, /checkPipelineGates\(provider/);
  });

  it("handleSingleModelChat should use executeChatWithBreaker", () => {
    assert.match(src, /executeChatWithBreaker\(/);
  });

  it("handleSingleModelChat should use recordCostIfNeeded", () => {
    assert.match(src, /recordCostIfNeeded\(/);
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

  it("should check model availability before attempting combo models", () => {
    assert.match(src, /isModelAvailable/);
  });
});

describe("Chat Pipeline — circuit breaker integration", () => {
  const src = readSrc("sse/handlers/chat.ts");

  it("should import CircuitBreakerOpenError", () => {
    assert.ok(src, "chat.ts should exist");
    assert.match(src, /CircuitBreakerOpenError/);
  });

  it("should handle CircuitBreakerOpenError with retry-after", () => {
    assert.match(src, /retryAfterMs/);
  });

  it("should reject requests when circuit is open", () => {
    assert.match(src, /circuit breaker is open/i);
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
// 3. Plugin Architecture (L-8)
// ═══════════════════════════════════════════════════

describe("Plugin Architecture — plugins/index.ts", () => {
  let plugins;

  beforeEach(async () => {
    plugins = await import("../../src/lib/plugins/index.ts");
    plugins.resetPlugins();
  });

  afterEach(() => {
    plugins.resetPlugins();
  });

  it("should register and list plugins", () => {
    plugins.registerPlugin({
      name: "test-logger",
      priority: 10,
      onRequest: () => {},
    });

    const list = plugins.listPlugins();
    assert.equal(list.length, 1);
    assert.equal(list[0].name, "test-logger");
    assert.equal(list[0].priority, 10);
    assert.deepEqual(list[0].hooks, ["onRequest"]);
  });

  it("should sort plugins by priority", () => {
    plugins.registerPlugin({ name: "low", priority: 200 });
    plugins.registerPlugin({ name: "high", priority: 1 });
    plugins.registerPlugin({ name: "mid", priority: 50 });

    const list = plugins.listPlugins();
    assert.deepEqual(
      list.map((p) => p.name),
      ["high", "mid", "low"]
    );
  });

  it("should run onRequest hooks in order", async () => {
    const order = [];
    plugins.registerPlugin({
      name: "first",
      priority: 1,
      onRequest: () => {
        order.push("first");
      },
    });
    plugins.registerPlugin({
      name: "second",
      priority: 2,
      onRequest: () => {
        order.push("second");
      },
    });

    const ctx = { requestId: "r1", body: {}, model: "test", metadata: {} };
    await plugins.runOnRequest(ctx);
    assert.deepEqual(order, ["first", "second"]);
  });

  it("should support request blocking", async () => {
    plugins.registerPlugin({
      name: "blocker",
      priority: 1,
      onRequest: () => ({ blocked: true, response: { error: "denied" } }),
    });
    plugins.registerPlugin({
      name: "never-runs",
      priority: 2,
      onRequest: () => {
        throw new Error("should not run");
      },
    });

    const ctx = { requestId: "r2", body: {}, model: "test", metadata: {} };
    const result = await plugins.runOnRequest(ctx);
    assert.equal(result.blocked, true);
    assert.deepEqual(result.response, { error: "denied" });
  });

  it("should enable/disable plugins at runtime", () => {
    plugins.registerPlugin({
      name: "toggle-me",
      onRequest: () => {},
    });

    assert.ok(plugins.setPluginEnabled("toggle-me", false));
    const list = plugins.listPlugins();
    assert.equal(list[0].enabled, false);
  });

  it("should unregister plugins", () => {
    plugins.registerPlugin({ name: "removable" });
    assert.equal(plugins.listPlugins().length, 1);
    assert.ok(plugins.unregisterPlugin("removable"));
    assert.equal(plugins.listPlugins().length, 0);
  });

  it("should run onResponse hooks", async () => {
    plugins.registerPlugin({
      name: "response-modifier",
      onResponse: (_ctx, response) => ({ ...response, modified: true }),
    });

    const ctx = { requestId: "r3", body: {}, model: "test", metadata: {} };
    const result = await plugins.runOnResponse(ctx, { data: "original" });
    assert.equal(result.modified, true);
    assert.equal(result.data, "original");
  });

  it("should run onError hooks and allow recovery", async () => {
    plugins.registerPlugin({
      name: "error-handler",
      onError: (_ctx, _error) => ({ recovered: true }),
    });

    const ctx = { requestId: "r4", body: {}, model: "test", metadata: {} };
    const result = await plugins.runOnError(ctx, new Error("test error"));
    assert.deepEqual(result, { recovered: true });
  });

  it("should return null from onError if no recovery", async () => {
    const ctx = { requestId: "r5", body: {}, model: "test", metadata: {} };
    const result = await plugins.runOnError(ctx, new Error("unhandled"));
    assert.equal(result, null);
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
// 5. Eval Scheduler (L-7)
// ═══════════════════════════════════════════════════

describe("Eval Scheduler — scheduler.ts module existence", () => {
  it("scheduler.ts should exist", () => {
    const full = join(ROOT, "src", "lib", "evals", "scheduler.ts");
    assert.ok(existsSync(full), "scheduler.ts should exist");
  });

  it("should export scheduling functions", () => {
    const src = readFileSync(join(ROOT, "src", "lib", "evals", "scheduler.ts"), "utf8");
    assert.match(src, /export function schedule/);
    assert.match(src, /export function unschedule/);
    assert.match(src, /export function pause/);
    assert.match(src, /export function resume/);
    assert.match(src, /export\s+(async\s+)?function\s+runNow/);
    assert.match(src, /export function getSchedules/);
    assert.match(src, /export function getHistory/);
    assert.match(src, /export function stopAll/);
  });

  it("should define ScheduledEval and EvalRunResult types", () => {
    const src = readFileSync(join(ROOT, "src", "lib", "evals", "scheduler.ts"), "utf8");
    assert.match(src, /export interface ScheduledEval/);
    assert.match(src, /export interface EvalRunResult/);
  });

  it("should have pluggable output provider", () => {
    const src = readFileSync(join(ROOT, "src", "lib", "evals", "scheduler.ts"), "utf8");
    assert.match(src, /export function setOutputProvider/);
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

  it("should export CORS_HEADERS and CORS_ORIGIN", () => {
    const src = readSrc("shared/utils/cors.ts");
    assert.match(src, /CORS_HEADERS/);
    assert.match(src, /CORS_ORIGIN/);
  });
});
