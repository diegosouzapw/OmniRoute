import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-only-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { isQuotaExhaustionResponse } =
  await import("../../open-sse/services/combo/quotaExhaustion.ts");
const { clearAllModelLockouts, lockModel } =
  await import("../../open-sse/services/accountFallback.ts");
const { recordComboRequest, resetComboMetrics } =
  await import("../../open-sse/services/comboMetrics.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

test.afterEach(() => {
  clearAllModelLockouts();
  resetAllCircuitBreakers();
});

test.after(() => {
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function log() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function response(
  status: number,
  message: string,
  options: { code?: string; type?: string; headers?: Record<string, string> } = {}
) {
  return Response.json(
    {
      error: {
        message,
        ...(options.code ? { code: options.code } : {}),
        ...(options.type ? { type: options.type } : {}),
      },
    },
    { status, headers: options.headers }
  );
}

function ok(model: string) {
  return Response.json({ model });
}

function model(model: string, fallbackOnlyOnQuotaExhaustion?: boolean) {
  return {
    kind: "model" as const,
    model,
    providerId: model.split("/")[0],
    ...(fallbackOnlyOnQuotaExhaustion === undefined ? {} : { fallbackOnlyOnQuotaExhaustion }),
  };
}

async function run(
  first: Response | Response[],
  options: {
    enabled?: boolean;
    maxRetries?: number;
    strategy?: string;
    primary?: string;
    connectionId?: string;
    config?: Record<string, unknown>;
    settings?: Record<string, unknown> | null;
    available?: (modelStr: string) => Promise<boolean> | boolean;
  } = {}
) {
  const calls: string[] = [];
  const primaryResponses = Array.isArray(first) ? first : [first];
  let primaryAttempt = 0;
  const combo = {
    name: `quota-only-${Math.random()}`,
    strategy: options.strategy ?? "priority",
    models: [
      {
        ...model(options.primary ?? "openai/primary", options.enabled),
        ...(options.connectionId ? { connectionId: options.connectionId } : {}),
      },
      model("anthropic/backup"),
    ],
    config: { maxRetries: options.maxRetries ?? 0, retryDelayMs: 0, ...options.config },
  };
  const result = await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    settings: options.settings ?? null,
    log: log(),
    isModelAvailable: options.available ?? (async () => true),
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr !== (options.primary ?? "openai/primary")) return ok(modelStr);
      const result = primaryResponses[Math.min(primaryAttempt, primaryResponses.length - 1)];
      primaryAttempt += 1;
      return result.clone();
    },
  });
  return { result, calls };
}

test("quota classifier rejects terminal-looking evidence on ineligible statuses", async () => {
  for (const status of [400, 401, 404, 408, 409, 422, 500, 502, 503, 504]) {
    for (const terminal of ["insufficient_quota", "quota_exhausted", "credits_exhausted"]) {
      assert.equal(
        await isQuotaExhaustionResponse(
          response(status, `${terminal}: billing hard limit reached`, {
            code: terminal,
            type: terminal,
          }),
          "openai",
          "gpt-4o"
        ),
        false,
        `${status} with ${terminal} must not classify as terminal depletion`
      );
    }
  }
});

test("quota classifier accepts explicit terminal depletion only on eligible statuses", async () => {
  for (const status of [402, 429]) {
    assert.equal(
      await isQuotaExhaustionResponse(
        response(status, "Payment required", { code: "insufficient_quota" }),
        "openai",
        "gpt-4o"
      ),
      true
    );
  }
});

test("priority target advances on explicit quota exhaustion", async () => {
  const { result, calls } = await run(response(429, "You have exceeded your current quota"), {
    enabled: true,
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/primary", "anthropic/backup"]);
});

test("priority target retries plain 429 then returns the last response without advancing", async () => {
  const { result, calls } = await run(response(429, "Rate limit exceeded; retry later"), {
    enabled: true,
    maxRetries: 1,
  });
  assert.equal(result.status, 429);
  assert.deepEqual(calls, ["openai/primary", "openai/primary"]);
});

test("priority target keeps a non-quota retry monotonic through terminal quota exhaustion", async () => {
  const { result, calls } = await run(
    [
      response(503, "Service unavailable"),
      response(429, "Payment required", { code: "insufficient_quota" }),
    ],
    { enabled: true, maxRetries: 1 }
  );
  assert.equal(result.status, 429);
  assert.deepEqual(calls, ["openai/primary", "openai/primary"]);
});

test("priority target returns a later successful retry", async () => {
  const { result, calls } = await run(
    [response(503, "Service unavailable"), ok("openai/primary")],
    { enabled: true, maxRetries: 1 }
  );
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/primary", "openai/primary"]);
});

test("priority target advances when every retry is quota exhaustion", async () => {
  const { result, calls } = await run(
    [
      response(429, "Payment required", { code: "quota_exhausted" }),
      response(429, "Billing hard limit reached", { code: "quota_exhausted" }),
    ],
    { enabled: true, maxRetries: 1 }
  );
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/primary", "openai/primary", "anthropic/backup"]);
});

test("failures of another target do not contaminate protected target trust", async () => {
  const calls: string[] = [];
  const combo = {
    name: `target-local-${Math.random()}`,
    strategy: "priority",
    models: [model("openai/unprotected"), model("anthropic/protected", true), model("paid/backup")],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const result = await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    settings: null,
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return modelStr === "openai/unprotected"
        ? response(503, "Service unavailable")
        : modelStr === "anthropic/protected"
          ? response(429, "Payment required", { code: "quota_exhausted" })
          : ok(modelStr);
    },
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/unprotected", "anthropic/protected", "paid/backup"]);
});

for (const [status, message] of [
  [408, "Request timeout"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [503, "Local concurrency capacity reached"],
  [504, "Gateway timeout"],
  [401, "Invalid API key"],
] as const) {
  test(`priority target does not advance on non-quota ${status} (${message})`, async () => {
    const { result, calls } = await run(response(status, message), { enabled: true });
    assert.equal(result.status, status);
    assert.deepEqual(calls, ["openai/primary"]);
  });
}

test("protected non-quota response preserves status, body, and headers", async () => {
  const first = response(502, "upstream detail", { headers: { "x-upstream": "kept" } });
  const { result } = await run(first, { enabled: true });
  assert.equal(result.status, 502);
  assert.equal(result.headers.get("x-upstream"), "kept");
  assert.deepEqual(await result.json(), { error: { message: "upstream detail" } });
});

for (const [metric, advances] of [
  ["generate_content_free_tier_requests", false],
  ["generate_content_free_tier_input_token_count", false],
  ["generate_content_free_tier_requests_per_day", true],
] as const) {
  test(`Gemini ${metric} classification ${advances ? "advances" : "stops"} direct routing`, async () => {
    const message = `You exceeded your current quota for metric generativelanguage.googleapis.com/${metric}`;
    const { result, calls } = await run(response(429, message), {
      enabled: true,
      primary: "gemini/gemini-2.5-flash",
    });
    assert.equal(result.ok, advances);
    assert.deepEqual(
      calls,
      advances ? ["gemini/gemini-2.5-flash", "anthropic/backup"] : ["gemini/gemini-2.5-flash"]
    );
  });
}

test("compatible provider advances only on explicit structured terminal depletion", async () => {
  const plain = await run(response(402, "billing service unavailable"), {
    enabled: true,
    primary: "openai-compatible-chat-test/primary",
  });
  assert.equal(plain.result.status, 402);
  assert.deepEqual(plain.calls, ["openai-compatible-chat-test/primary"]);

  const terminal = await run(response(402, "Payment required", { code: "insufficient_quota" }), {
    enabled: true,
    primary: "openai-compatible-chat-test/primary",
  });
  assert.equal(terminal.result.ok, true);
  assert.deepEqual(terminal.calls, ["openai-compatible-chat-test/primary", "anthropic/backup"]);
});

test("unset Gemini RPM response retains baseline fallback", async () => {
  const { result, calls } = await run(
    response(
      429,
      "You exceeded your current quota for metric generativelanguage.googleapis.com/generate_content_free_tier_requests"
    ),
    { primary: "gemini/gemini-2.5-flash" }
  );
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["gemini/gemini-2.5-flash", "anthropic/backup"]);
});

test("unset target retains generic fallback", async () => {
  const { result, calls } = await run(response(503, "Service unavailable"));
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/primary", "anthropic/backup"]);
});

test("option is dormant outside priority", async () => {
  const { result, calls } = await run(response(503, "Service unavailable"), {
    enabled: true,
    strategy: "fill-first",
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/primary", "anthropic/backup"]);
});

test("authoritative local quota cutoff advances an opted-in priority target", async () => {
  const calls: string[] = [];
  const combo = {
    name: `local-quota-${Math.random()}`,
    strategy: "priority",
    models: [
      { ...model("openai/primary", true), connectionId: "quota-empty" },
      model("anthropic/backup"),
    ],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
  quotaPreflight.registerQuotaFetcher("openai", async () => ({
    used: 100,
    total: 100,
    percentUsed: 1,
  }));
  const result = await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    log: log(),
    settings: {
      resilienceSettings: {
        quotaPreflight: { enabled: true, defaultThresholdPercent: 2, warnThresholdPercent: 20 },
      },
    },
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return ok(modelStr);
    },
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["anthropic/backup"]);
});

test("protected pre-existing model lockout stops routing with a local 503", async () => {
  lockModel("openai", "locked-connection", "primary", "rate_limited", 60_000);
  const { result, calls } = await run(response(503, "unused"), {
    enabled: true,
    connectionId: "locked-connection",
  });
  assert.equal(result.status, 503);
  assert.deepEqual(calls, []);
});

test("protected target keeps configured retries after recording a transient model lockout", async () => {
  const { result, calls } = await run(response(503, "Service unavailable"), {
    enabled: true,
    maxRetries: 1,
    connectionId: "retry-connection",
    settings: {
      resilienceSettings: {
        modelLockout: { enabled: true, errorCodes: [503], baseCooldownMs: 60_000 },
      },
    },
  });
  assert.equal(result.status, 503);
  assert.deepEqual(calls, ["openai/primary", "openai/primary"]);
});

test("protected response-quality rejection returns a sanitized 502 without advancing", async () => {
  const { result, calls } = await run(ok("openai/primary"), {
    enabled: true,
    config: { responseValidation: { minContentLength: 100 } },
  });
  assert.equal(result.status, 502);
  assert.deepEqual(await result.json(), {
    error: {
      message: "Upstream response failed quality validation",
      type: "server_error",
      code: "bad_gateway",
    },
  });
  assert.deepEqual(calls, ["openai/primary"]);
});

test("protected predictive TTFT skip returns local 503 without advancing", async () => {
  const name = `predictive-${Math.random()}`;
  resetComboMetrics(name);
  for (let index = 0; index < 5; index += 1) {
    recordComboRequest(name, "openai/primary", { success: true, latencyMs: 10_000 });
  }
  const calls: string[] = [];
  const combo = {
    name,
    strategy: "priority",
    models: [model("openai/primary", true), model("anthropic/backup")],
    config: { maxRetries: 0, zeroLatencyOptimizationsEnabled: true, predictiveTtftMs: 1 },
  };
  const result = await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    log: log(),
    settings: null,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return ok(modelStr);
    },
  });
  assert.equal(result.status, 503);
  assert.deepEqual(calls, []);
});

test("opted-in combo ref remains a black box and only quota exhaustion advances parent", async () => {
  for (const childError of [
    response(429, "Billing hard limit reached"),
    response(503, "Service unavailable"),
  ]) {
    const calls: string[] = [];
    const child = {
      name: `child-${childError.status}-${Math.random()}`,
      strategy: "priority",
      models: [model("openai/child")],
      config: { maxRetries: 0, retryDelayMs: 0 },
    };
    const outer = {
      name: `outer-${Math.random()}`,
      strategy: "priority",
      models: [
        {
          kind: "combo-ref" as const,
          comboName: child.name,
          fallbackOnlyOnQuotaExhaustion: true,
        },
        model("anthropic/backup"),
      ],
      config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
    };
    const result = await handleComboChat({
      body: {},
      combo: outer,
      allCombos: [outer, child],
      settings: null,
      log: log(),
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return modelStr === "openai/child" ? childError.clone() : ok(modelStr);
      },
    });
    if (childError.status === 429) {
      assert.equal(result.ok, true);
      assert.deepEqual(calls, ["openai/child", "anthropic/backup"]);
    } else {
      assert.equal(result.status, 503);
      assert.deepEqual(calls, ["openai/child"]);
    }
  }
});

// #10501: the child combo's terminal status is now derived from
// resolveComboTerminalStatus instead of a bare `lastStatus`. A quality failure
// (openai/quality-invalid) mixed with a genuine quota-exhaustion 429
// (anthropic/quota) is a heterogeneous, non-"the request itself is invalid"
// mix, so it normalizes to a 5xx — the `fallbackOnlyOnQuotaExhaustion` STOP
// decision itself is untouched (it is driven by internal quota-observation
// tracking, not by re-reading the final HTTP status — asserted below via
// `calls`, which must still show the parent stopping instead of falling back
// to paid/backup).
test("protected parent combo-ref stops after normal child quality rejection then quota exhaustion", async () => {
  const calls: string[] = [];
  const child = {
    name: `quality-child-${Math.random()}`,
    strategy: "priority",
    models: [model("openai/quality-invalid"), model("anthropic/quota")],
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      flattenSingleTargetNested: true,
      responseValidation: { minContentLength: 100 },
    },
  };
  const outer = {
    name: `quality-outer-${Math.random()}`,
    strategy: "priority",
    models: [
      { kind: "combo-ref" as const, comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      model("paid/backup"),
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, child],
    settings: null,
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return modelStr === "openai/quality-invalid"
        ? Response.json({ choices: [{ message: {} }] })
        : modelStr === "anthropic/quota"
          ? response(429, "Payment required", { code: "insufficient_quota" })
          : ok(modelStr);
    },
  });
  assert.ok(
    result.status >= 500,
    `heterogeneous quality+quota-exhaustion mix must normalize to a 5xx, got ${result.status}`
  );
  assert.deepEqual(
    calls,
    ["openai/quality-invalid", "anthropic/quota"],
    "the parent must still STOP at the child (not fall back to paid/backup) — the " +
      "fallbackOnlyOnQuotaExhaustion decision is unaffected by the status-code change"
  );
});

test("protected parent combo-ref stops when a child has mixed quota and non-quota failures", async () => {
  const calls: string[] = [];
  const child = {
    name: `mixed-child-${Math.random()}`,
    strategy: "priority",
    models: [model("openai/quota"), model("anthropic/unavailable")],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const outer = {
    name: `mixed-outer-${Math.random()}`,
    strategy: "priority",
    models: [
      { kind: "combo-ref" as const, comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      model("anthropic/paid-backup"),
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, child],
    settings: null,
    log: log(),
    isModelAvailable: async (modelStr) => modelStr !== "anthropic/unavailable",
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return modelStr === "openai/quota"
        ? response(429, "Billing hard limit reached")
        : ok(modelStr);
    },
  });
  assert.equal(result.status, 429);
  assert.deepEqual(calls, ["openai/quota"]);
});

test("protected parent combo-ref keeps a child's non-quota target retry monotonic", async () => {
  const calls: string[] = [];
  const child = {
    name: `target-retry-child-${Math.random()}`,
    strategy: "priority",
    models: [model("retry-provider/child")],
    config: { maxRetries: 1, retryDelayMs: 0 },
  };
  const outer = {
    name: `target-retry-outer-${Math.random()}`,
    strategy: "priority",
    models: [
      { kind: "combo-ref" as const, comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      model("anthropic/paid-backup"),
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, child],
    settings: null,
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return calls.length === 1
        ? response(503, "Service unavailable")
        : response(429, "Payment required", { code: "insufficient_quota" });
    },
  });
  assert.equal(result.status, 429);
  assert.deepEqual(calls, ["retry-provider/child", "retry-provider/child"]);
});

test("protected parent combo-ref keeps a child's non-quota set failure monotonic", async () => {
  const calls: string[] = [];
  const child = {
    name: `set-retry-child-${Math.random()}`,
    strategy: "priority",
    models: [model("openai/child")],
    config: { maxRetries: 0, retryDelayMs: 0, maxSetRetries: 1, setRetryDelayMs: 0 },
  };
  const outer = {
    name: `set-retry-outer-${Math.random()}`,
    strategy: "priority",
    models: [
      { kind: "combo-ref" as const, comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      model("anthropic/paid-backup"),
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, child],
    settings: null,
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return calls.length === 1
        ? response(503, "Service unavailable")
        : response(429, "Payment required", { code: "insufficient_quota" });
    },
  });
  assert.equal(result.status, 429);
  assert.deepEqual(calls, ["openai/child", "openai/child"]);
});

test("protected parent combo-ref advances on a single authoritative child quota cutoff", async () => {
  const calls: string[] = [];
  const child = {
    name: `cutoff-child-${Math.random()}`,
    strategy: "priority",
    models: [{ ...model("openai/cutoff"), connectionId: "nested-quota-empty" }],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const outer = {
    name: `cutoff-outer-${Math.random()}`,
    strategy: "priority",
    models: [
      { kind: "combo-ref" as const, comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      model("anthropic/paid-backup"),
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
  quotaPreflight.registerQuotaFetcher("openai", async () => ({
    used: 100,
    total: 100,
    percentUsed: 1,
  }));
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, child],
    settings: {
      resilienceSettings: {
        quotaPreflight: { enabled: true, defaultThresholdPercent: 2, warnThresholdPercent: 20 },
      },
    },
    log: log(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return ok(modelStr);
    },
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["anthropic/paid-backup"]);
});

for (const [metric, advances] of [
  ["generate_content_free_tier_requests", false],
  ["generate_content_free_tier_input_token_count", false],
  ["generate_content_free_tier_requests_per_day", true],
] as const) {
  test(`nested Gemini ${metric} ${advances ? "advances" : "stops"} parent routing`, async () => {
    const calls: string[] = [];
    const child = {
      name: `gemini-child-${Math.random()}`,
      strategy: "priority",
      models: [model("gemini/gemini-2.5-flash")],
      config: { maxRetries: 0, retryDelayMs: 0 },
    };
    const outer = {
      name: `gemini-outer-${Math.random()}`,
      strategy: "priority",
      models: [
        { kind: "combo-ref" as const, comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
        model("anthropic/backup"),
      ],
      config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
    };
    const result = await handleComboChat({
      body: {},
      combo: outer,
      allCombos: [outer, child],
      settings: null,
      log: log(),
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return modelStr.startsWith("gemini/")
          ? response(
              429,
              `You exceeded your current quota for metric generativelanguage.googleapis.com/${metric}`
            )
          : ok(modelStr);
      },
    });
    assert.equal(result.ok, advances);
    assert.deepEqual(
      calls,
      advances ? ["gemini/gemini-2.5-flash", "anthropic/backup"] : ["gemini/gemini-2.5-flash"]
    );
  });
}
