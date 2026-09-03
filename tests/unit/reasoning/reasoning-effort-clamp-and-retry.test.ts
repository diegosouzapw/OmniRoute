import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../../open-sse/executors/base.ts";
import {
  getLearnedReasoningEffort,
  recordLearnedReasoningEffort,
  __test_resetLearnedReasoningEffortCaps,
} from "../../../open-sse/services/learnedReasoningEffortCaps.ts";

const OVH_422_BODY = JSON.stringify({
  error: {
    message:
      "Failed to deserialize the JSON body into the target type: reasoning_effort: " +
      "unknown variant `xhigh`, expected one of `none`, `high`, `medium`, `low`, `minimal`",
  },
});

// Passthrough executor: returns the body unchanged so we assert on exactly what
// base.ts sends upstream.
class SimpleExecutor extends BaseExecutor {
  constructor() {
    super("openai-compatible-chat-eaff6869", {
      baseUrls: ["https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions"],
    });
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
});

test("422 'unknown variant xhigh, expected one of ...' clamps reasoning_effort and retries once", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    if (capturedBodies.length === 1) {
      return new Response(OVH_422_BODY, {
        status: 422,
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
      model: "qwen3-coder-30b-a3b-instruct",
      body: { reasoning_effort: "xhigh" },
      stream: false,
      credentials: {},
    });
    assert.equal(capturedBodies.length, 2);
    assert.equal(capturedBodies[0].reasoning_effort, "xhigh");
    assert.equal(capturedBodies[1].reasoning_effort, "high");
    assert.ok(
      (getLearnedReasoningEffort("openai-compatible-chat-eaff6869", "qwen3-coder-30b-a3b-instruct") as unknown as Set<string>).has("high")
    );
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a second request for the same provider+model sends the learned value on the first try", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    recordLearnedReasoningEffort(
      "openai-compatible-chat-eaff6869",
      "qwen3-coder-30b-a3b-instruct",
      ["none", "high", "medium", "low", "minimal"]
    );
    await executor.execute({
      model: "qwen3-coder-30b-a3b-instruct",
      body: { reasoning_effort: "xhigh" },
      stream: false,
      credentials: {},
    });
    assert.equal(capturedBodies.length, 1);
    assert.equal(capturedBodies[0].reasoning_effort, "high");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("400 please use low, high, or max clamps and retries once (nearest-tier: medium -> high, #11295)", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];
  const BODY_400_PLEASE_USE = JSON.stringify({
    error: { message: "This model always engages in thinking and cannot be disabled; please use low, high, or max" },
  });

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    if (capturedBodies.length === 1) {
      return new Response(BODY_400_PLEASE_USE, {
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
      model: "x-preview-f-free",
      body: { reasoning_effort: "medium" },
      stream: false,
      credentials: {},
    });
    assert.equal(capturedBodies.length, 2);
    assert.equal(capturedBodies[0].reasoning_effort, "medium");
    // #11295: nearest-tier — smallest accepted >= demand — maps medium(3) to
    // high(4), the smallest accepted rank at or above it (was "low" under the
    // old downgrade-only direction).
    assert.equal(capturedBodies[1].reasoning_effort, "high");
    const learned = getLearnedReasoningEffort("openai-compatible-chat-eaff6869", "x-preview-f-free") as unknown as Set<string>;
    assert.ok(learned instanceof Set);
    assert.ok(learned.has("low"));
    assert.ok(learned.has("high"));
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("400 please use low, medium with ultra retries to medium", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];
  const BODY_400_ULTRA = JSON.stringify({
    error: { message: "please use low, medium" },
  });

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    if (capturedBodies.length === 1) {
      return new Response(BODY_400_ULTRA, {
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
      model: "x-preview-f-free-2",
      body: { reasoning_effort: "ultra" },
      stream: false,
      credentials: {},
    });
    assert.equal(capturedBodies.length, 2);
    assert.equal(capturedBodies[0].reasoning_effort, "ultra");
    assert.equal(capturedBodies[1].reasoning_effort, "medium");
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("sub-floor clamp now retries: learned {high,max} with low request clamps up to high (#11295)", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];
  const BODY_400_HIGH_MAX = JSON.stringify({
    error: { message: "please use high, or max" },
  });

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);
    if (capturedBodies.length === 1) {
      return new Response(BODY_400_HIGH_MAX, {
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
    // #11295: low is below the learned minimum {high,max}. Pre-#11295 this was
    // a downgrade-only passthrough (no clamp, no retry, upstream stayed 400
    // forever). Nearest-tier now clamps up to the accepted floor (high) and
    // retries once, succeeding.
    const result = await executor.execute({
      model: "x-preview-f-free-3",
      body: { reasoning_effort: "low" },
      stream: false,
      credentials: {},
    });
    assert.equal(capturedBodies.length, 2);
    assert.equal(capturedBodies[0].reasoning_effort, "low");
    assert.equal(capturedBodies[1].reasoning_effort, "high");
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
