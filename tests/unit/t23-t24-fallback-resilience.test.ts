import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { handleComboChat, shouldFallbackComboBadRequest } =
  await import("../../open-sse/services/combo.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

test.beforeEach(() => {
  resetAllCircuitBreakers();
});

function createLog() {
  const entries = [];
  return {
    info: (tag, msg) => entries.push({ level: "info", tag, msg }),
    warn: (tag, msg) => entries.push({ level: "warn", tag, msg }),
    error: (tag, msg) => entries.push({ level: "error", tag, msg }),
    entries,
  };
}

function createStatusSequenceHandler(sequence) {
  let idx = 0;
  return async () => {
    const step = sequence[idx++] || { status: 200 };
    if (step.status === 200) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response(
      JSON.stringify({
        error: { message: step.message || `Error ${step.status}` },
      }),
      {
        status: step.status,
        headers: step.headers || { "content-type": "application/json" },
      }
    );
  };
}

test("T23: 429 with long Retry-After uses real reset cooldown instead of short exponential backoff", () => {
  const headers = new Headers({ "retry-after": "3600" });
  const result = checkFallbackError(429, "Rate limit exceeded", 2, null, "groq", headers);

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "rate_limit_exceeded");
  assert.equal(result.newBackoffLevel, 0);
  assert.ok(result.cooldownMs > 3_590_000);
});

test("T24: combo awaits short 503 cooldown before falling through to next model", async () => {
  const log = createLog();

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "t24-short-cooldown",
      strategy: "priority",
      models: [
        { model: "groq/model-a", weight: 0 },
        { model: "groq/model-b", weight: 0 },
      ],
    },
    // Two transient failures on first model, then success on fallback model.
    handleSingleModel: createStatusSequenceHandler([
      { status: 503 },
      { status: 503 },
      { status: 200 },
    ]),
    isModelAvailable: () => true,
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  const waitLog = log.entries.find((e) => e.msg.includes("Waiting") && e.msg.includes("fallback"));
  assert.ok(waitLog);
});

test("T24: combo skips wait when 503 cooldown is long (>5s)", async () => {
  const log = createLog();

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "t24-long-cooldown",
      strategy: "priority",
      models: [
        { model: "groq/model-a", weight: 0 },
        { model: "groq/model-b", weight: 0 },
      ],
    },
    handleSingleModel: createStatusSequenceHandler([
      {
        status: 503,
        message: "rate limit exceeded",
        headers: { "content-type": "application/json", "retry-after": "120" },
      },
      {
        status: 503,
        message: "rate limit exceeded",
        headers: { "content-type": "application/json", "retry-after": "120" },
      },
      { status: 200 },
    ]),
    isModelAvailable: () => true,
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  const waitLog = log.entries.find((e) => e.msg.includes("Waiting") && e.msg.includes("fallback"));
  assert.equal(waitLog, undefined);
});

test("T24: all inactive accounts return 503 service_unavailable (not 406)", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "t24-all-inactive",
      strategy: "priority",
      models: [
        { model: "groq/model-a", weight: 0 },
        { model: "groq/model-b", weight: 0 },
      ],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not be called when all models are unavailable");
    },
    isModelAvailable: () => false,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.status, 503);
  const body = await result.json();
  assert.equal(body.error?.code, "ALL_ACCOUNTS_INACTIVE");
});

test("combo falls through provider-scoped 400s and reaches the next model", async () => {
  const log = createLog();

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "t24-provider-scoped-400",
      strategy: "priority",
      models: [
        { model: "free/gemini-3.1-pro-preview", weight: 0 },
        { model: "aio/gemini-3.1-pro-preview-thinking-high", weight: 0 },
        { model: "openrouter/google/gemini-3.1-pro-preview", weight: 0 },
      ],
    },
    handleSingleModel: createStatusSequenceHandler([
      { status: 429, message: "No capacity available for model gemini-3.1-pro-preview" },
      { status: 400, message: "request blocked by Gemini API: PROHIBITED_CONTENT" },
      { status: 200 },
    ]),
    isModelAvailable: () => true,
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  const badRequestLog = log.entries.find((entry) => entry.msg.includes("provider-scoped 400"));
  assert.ok(badRequestLog);
});

test("combo bad-request fallback helper keeps generic 400s terminal", () => {
  assert.equal(shouldFallbackComboBadRequest(400, "request blocked by Gemini API"), true);
  assert.equal(
    shouldFallbackComboBadRequest(400, "One or more of the provided message roles is not valid"),
    true
  );
  assert.equal(shouldFallbackComboBadRequest(400, "bad request"), false);
  assert.equal(shouldFallbackComboBadRequest(422, "request blocked by Gemini API"), false);
});
