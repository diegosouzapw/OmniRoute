import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omni-jev-test-"));
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resolveAutoStrategyOrder } =
  await import("../../open-sse/services/combo/resolveAutoStrategy.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createComboSchema } = await import("../../src/shared/validation/schemas/combo.ts");
const { normalizeIntelligentRoutingConfig, ROUTER_STRATEGY_OPTIONS } =
  await import("../../src/lib/combos/intelligentRouting.ts");
const { AUTO_ROUTING_STRATEGY_VALUES } =
  await import("../../src/shared/constants/routingStrategies.ts");
after(() => {
  resetDbInstance();
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});
const log = { info() {}, warn() {}, error() {}, debug() {} };

test("disabled enrichment and embeddings pass through unchanged", async () => {
  for (const sourceFormat of ["openai", "embeddings"]) {
    const body =
      sourceFormat === "embeddings"
        ? { input: "hello" }
        : { messages: [{ role: "user", content: "hello" }] };
    const response = await handleComboChat({
      sourceFormat,
      body,
      log,
      combo: {
        name: `omni-jev-off-${sourceFormat}`,
        strategy: "auto",
        models: ["openai/gpt-4o-mini"],
        config: {
          routerStrategy: "omni-jev",
          omniJev: { injectionEnabled: sourceFormat === "embeddings" },
        },
      },
      isModelAvailable: async () => true,
      handleSingleModel: async (received) => {
        assert.doesNotMatch(JSON.stringify(received), /OmniJev/);
        return Response.json({ ok: true });
      },
    });
    assert.equal(response.status, 200);
  }
});

test("successful stream is delivered without a post-generation reviewer", async () => {
  const data = 'data: {"choices":[{"delta":{"content":"hello"}}]}\n\ndata: [DONE]\n\n';
  let calls = 0;
  const response = await handleComboChat({
    body: { messages: [{ role: "user", content: "hello" }], stream: true },
    log,
    combo: {
      name: "omni-jev-stream",
      strategy: "auto",
      models: ["openai/gpt-4o-mini"],
      config: { routerStrategy: "omni-jev" },
    },
    isModelAvailable: async () => true,
    handleSingleModel: async (received) => {
      calls++;
      assert.match(JSON.stringify(received), /OmniJev/);
      return new Response(data, { headers: { "content-type": "text/event-stream" } });
    },
  });
  assert.equal(await response.text(), data);
  assert.equal(calls, 1);
});

test("OmniJev configuration survives the builder and rejects nested secrets", () => {
  assert.ok(AUTO_ROUTING_STRATEGY_VALUES.includes("omni-jev" as never));
  assert.ok(ROUTER_STRATEGY_OPTIONS.some((s) => s.id === "omni-jev"));
  assert.equal(
    normalizeIntelligentRoutingConfig({ routerStrategy: "omni-jev", omniJev: { mode: "jev-api" } })
      .omniJev.mode,
    "jev-api"
  );
  const nested = normalizeIntelligentRoutingConfig({
    auto: { routerStrategy: "jev", omniJev: { mode: "jev-api" } },
  });
  assert.equal(nested.routerStrategy, "omni-jev");
  assert.equal(nested.omniJev.mode, "jev-api");
  for (const config of [
    { omniJev: { apiKey: "bad" } },
    { auto: { routerStrategy: "omni-jev", omniJev: { apiKey: "bad" } } },
  ]) {
    assert.equal(createComboSchema.safeParse({ name: "test", config }).success, false);
  }
});

test("real combo enriches every attempt, preserves client body and fails over", async () => {
  const request = { messages: [{ role: "user", content: "Write TypeScript code" }], stream: false };
  const before = JSON.stringify(request);
  const seen: string[] = [];
  const result = await handleComboChat({
    body: request,
    combo: {
      name: "omni-jev-fallback",
      strategy: "auto",
      models: ["openai/gpt-4o-mini", "claude/sonnet"],
      config: {
        routerStrategy: "omni-jev",
        maxRetries: 0,
        fallbackDelayMs: 0,
        retryDelayMs: 0,
        candidatePool: ["openai", "claude"],
        explorationRate: 0,
        disableSessionStickiness: true,
      },
    },
    handleSingleModel: async (body, model) => {
      const serialized = JSON.stringify(body);
      assert.equal((serialized.match(/\[OmniJev v1/g) ?? []).length, 1);
      assert.match(serialized, /acceptance criteria/);
      seen.push(model);
      return seen.length === 1
        ? Response.json({ error: { message: "test unavailable" } }, { status: 503 })
        : Response.json({ choices: [{ message: { content: "done" } }] });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
  assert.equal(result.status, 200);
  assert.equal(seen.length, 2);
  assert.notEqual(seen[0], seen[1]);
  assert.equal(JSON.stringify(request), before);
  assert.doesNotMatch(await result.text(), /OmniJev/);
});

test("OmniJev excludes blocked targets instead of resurrecting them as fallback", async () => {
  const targets = [
    {
      kind: "model",
      stepId: "a",
      executionKey: "a",
      modelStr: "openai/glm-5",
      provider: "openai",
      connectionId: null,
    },
    {
      kind: "model",
      stepId: "b",
      executionKey: "b",
      modelStr: "claude/glm-4",
      provider: "claude",
      connectionId: null,
    },
    {
      kind: "model",
      stepId: "c",
      executionKey: "c",
      modelStr: "gemini/gemini-2.5-flash",
      provider: "gemini",
      connectionId: null,
    },
  ];
  const result = await resolveAutoStrategyOrder({
    orderedTargets: targets,
    body: {},
    combo: {
      name: "omni-jev-order",
      config: { routerStrategy: "omni-jev", candidatePool: ["openai", "claude", "gemini"] },
    },
    config: {},
    settings: null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log,
    buildAutoCandidates: async () =>
      targets.map((t, index) => ({
        ...t,
        model: t.modelStr.split("/")[1],
        quotaRemaining: 100,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 1,
        p95LatencyMs: 100,
        latencyStdDev: 0,
        errorRate: 0,
        quotaCutoffBlocked: index === 1,
      })),
  } as never);
  assert.ok("orderedTargets" in result);
  if ("orderedTargets" in result)
    assert.ok(result.orderedTargets.every((t) => t.executionKey !== "b"));
});
