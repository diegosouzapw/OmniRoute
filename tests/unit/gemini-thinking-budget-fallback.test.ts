import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";
import {
  getLearnedThinkingCap,
  __test_resetLearnedThinkingCaps,
} from "../../open-sse/services/learnedThinkingCaps.ts";

const GEMINI_400_BODY = JSON.stringify({
  error: {
    code: 400,
    message:
      "* GenerateContentRequest.generation_config.thinking_config.thinking_budget: " +
      "thinking_budget must be in the range [-1, 65535]",
    status: "INVALID_ARGUMENT",
  },
});

// Passthrough executor: returns the body unchanged so we assert on exactly what
// base.ts sends upstream.
class SimpleExecutor extends BaseExecutor {
  constructor() {
    super("gemini", {
      baseUrls: ["https://generativelanguage.example/v1/models"],
    });
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

beforeEach(() => {
  __test_resetLearnedThinkingCaps();
});

after(() => {
  __test_resetLearnedThinkingCaps();
});

// ── Reactive clamp-and-retry ───────────────────────────────────────────────

test("400 'thinking_budget must be in the range' clamps nested budget and retries once", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    if (capturedBodies.length === 1) {
      return new Response(GEMINI_400_BODY, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: {
        contents: [{ role: "user", parts: [{ text: "hi" }] }],
        generationConfig: { thinkingConfig: { thinkingBudget: 131072 } },
      },
      stream: false,
      credentials: {},
    });

    assert.equal(capturedBodies.length, 2, "fetch should be called exactly twice");
    assert.equal(
      capturedBodies[0].generationConfig.thinkingConfig.thinkingBudget,
      131072,
      "first request sends the raw over-max budget"
    );
    assert.equal(
      capturedBodies[1].generationConfig.thinkingConfig.thinkingBudget,
      65535,
      "retry clamps the budget to the upstream-advertised max"
    );
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("the learned cap is recorded process-wide after a 400 (provider+model key)", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(GEMINI_400_BODY, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });

  try {
    await executor
      .execute({
        model: "gemini-2.5-pro",
        body: { generationConfig: { thinkingConfig: { thinkingBudget: 131072 } } },
        stream: false,
        credentials: {},
      })
      .catch(() => {});
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(
    getLearnedThinkingCap("gemini", "gemini-2.5-pro"),
    32768,
    "a cap must be learned so future requests clamp proactively (first step below 131072)"
  );
});

test("Antigravity envelope: budget nested under request.generationConfig is clamped too", async () => {
  class AntigravityLikeExecutor extends BaseExecutor {
    constructor() {
      super("antigravity", { baseUrls: ["https://antigravity.example/v1"] });
    }
    async transformRequest(_model: string, body: Record<string, unknown>) {
      return { ...body };
    }
  }
  const executor = new AntigravityLikeExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    if (capturedBodies.length === 1) {
      return new Response(GEMINI_400_BODY, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-3.1-pro",
      body: {
        request: {
          contents: [{ role: "user", parts: [{ text: "hi" }] }],
          generationConfig: { thinkingConfig: { thinkingBudget: 131072 } },
        },
      },
      stream: false,
      credentials: {},
    });

    assert.equal(capturedBodies.length, 2);
    assert.equal(
      capturedBodies[1].request.generationConfig.thinkingConfig.thinkingBudget,
      65535,
      "retry clamps the Antigravity-envelope budget"
    );
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── Guards ─────────────────────────────────────────────────────────────────

test("no retry when the body carries no thinking budget (nothing to clamp → would loop)", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(GEMINI_400_BODY, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
      stream: false,
      credentials: {},
    });
    assert.equal(callCount, 1, "no spurious retry when there is no budget to lower");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("no retry when the budget is already at/below the upstream max", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(GEMINI_400_BODY, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { generationConfig: { thinkingConfig: { thinkingBudget: 8192 } } },
      stream: false,
      credentials: {},
    });
    // 8192 < 65535 → clamping would not change the body → a retry would resend
    // an identical request and 400 again. Guard must skip it.
    assert.equal(callCount, 1, "no retry when clamping would not change the body");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("no retry for a non-thinking-budget 400", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(JSON.stringify({ error: "some unrelated upstream error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { generationConfig: { thinkingConfig: { thinkingBudget: 131072 } } },
      stream: false,
      credentials: {},
    });
    assert.equal(callCount, 1, "unrelated 400 must not trigger the budget retry");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("clamp fires at most once per execute() even if the retry also 400s", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(GEMINI_400_BODY, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { generationConfig: { thinkingConfig: { thinkingBudget: 131072 } } },
      stream: false,
      credentials: {},
    });
    assert.equal(callCount, 2, "original + exactly one clamp retry, no loop");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── End-to-end: the user's actual scenario (xhigh on an unregistered model) ──

test("E2E: reasoning_effort=xhigh on an unregistered Gemini model is clamped proactively — first request succeeds, no double round-trip", async () => {
  // The user's report: Claude Code's xhigh/ultracode sends a huge budget that an
  // unregistered Gemini model (e.g. gemini-2.5-pro, absent from MODEL_SPECS)
  // used to forward verbatim → upstream 400 → failed request. The proactive
  // gemini fallback in capThinkingBudget must clamp it BEFORE the first fetch so
  // the request succeeds in a single round-trip (no 400→retry latency).
  class RealTranslatorExecutor extends BaseExecutor {
    constructor() {
      super("gemini", { baseUrls: ["https://generativelanguage.example/v1/models"] });
    }
    async transformRequest(model: string, body: Record<string, unknown>) {
      return openaiToGeminiRequest(model, body, false) as Record<string, unknown>;
    }
  }
  const executor = new RealTranslatorExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    // First request succeeds — the budget must already be within range.
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-2.5-pro", // NOT in MODEL_SPECS
      body: {
        messages: [{ role: "user", content: "hi" }],
        reasoning_effort: "xhigh", // would have sent 131072 before the fix
      },
      stream: false,
      credentials: {},
    });

    assert.equal(capturedBodies.length, 1, "single request — no 400→retry double round-trip");
    const budget = capturedBodies[0].generationConfig.thinkingConfig.thinkingBudget;
    assert.ok(
      budget <= 32768,
      `budget must be proactively clamped to the pro-tier ceiling, got ${budget}`
    );
    assert.equal(budget, 32768);
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
