/**
 * muse-spark max-first effort fallback (opencode-go).
 *
 * Upstream /responses rejects a literal `max` reasoning effort for muse-spark
 * (400: reasoning_effort 'max' is not supported … Supported values:
 * [minimal, low, medium, high, xhigh]). OmniRoute therefore sends `max` first
 * and, only on that specific 400 signature, retries once with `xhigh` —
 * so a future upstream that accepts `max` is used automatically.
 *
 * command-code needs no fallback: it passes `reasoning_effort` through
 * verbatim and accepts `max` natively (covered by passthrough test below).
 */

import test from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor, isUnsupportedReasoningEffortRejection } =
  (await import("../../open-sse/executors/opencode.ts")) as unknown as {
    OpencodeExecutor: new (provider: string) => {
      transformRequest: (
        model: string,
        body: Record<string, unknown>,
        stream: boolean,
        credentials: unknown
      ) => Record<string, unknown>;
      execute: (input: {
        model: string;
        body: unknown;
        stream: boolean;
        credentials: unknown;
      }) => Promise<{ response: Response } & Record<string, unknown>>;
    };
    isUnsupportedReasoningEffortRejection: (bodyText: string) => boolean;
  };

const { BaseExecutor } = (await import("../../open-sse/executors/base.ts")) as unknown as {
  BaseExecutor: {
    prototype: {
      execute: (input: unknown) => Promise<{ response: Response } & Record<string, unknown>>;
    };
  };
};

const CREDENTIALS = { apiKey: "k" } as unknown as Record<string, unknown>;

/** Real upstream 400 body when sending reasoning.effort=max (2026-09-04 probe). */
const UPSTREAM_MAX_REJECTION = JSON.stringify({
  model: "muse-spark-1.3-contributor",
  error: {
    param: "reasoning.effort",
    type: "invalid_request_error",
    message:
      "Error from provider (Console Go): Upstream request failed: " +
      "[invalid_request_error] reasoning_effort 'max' is not supported for " +
      "model 'muse-spark-1.3-contributor'. Supported values: " +
      "[minimal, low, medium, high, xhigh]",
  },
});

const OTHER_400 = JSON.stringify({
  error: {
    message: "Extra inputs are not permitted, field: 'client_metadata'",
    type: "invalid_request_error",
  },
});

// ─── transformRequest: max goes to the wire first ─────────────────────────────

test("max-fallback: transformRequest sends reasoning.effort=max first (no pre-clamp)", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const out = executor.transformRequest(
    "muse-spark-1.3-contributor-max",
    { model: "muse-spark-1.3-contributor-max", messages: [{ role: "user", content: "hi" }] },
    true,
    CREDENTIALS
  );

  assert.equal(out.model, "muse-spark-1.3-contributor");
  assert.deepEqual(out.reasoning, { effort: "max" });
});

// ─── rejection predicate ──────────────────────────────────────────────────────

test("max-fallback: predicate matches the upstream unsupported-effort 400", () => {
  assert.equal(isUnsupportedReasoningEffortRejection(UPSTREAM_MAX_REJECTION), true);
});

test("max-fallback: predicate rejects unrelated 400 bodies", () => {
  assert.equal(isUnsupportedReasoningEffortRejection(OTHER_400), false);
  assert.equal(isUnsupportedReasoningEffortRejection(""), false);
  assert.equal(isUnsupportedReasoningEffortRejection("not json at all"), false);
});

// ─── execute(): retry once with xhigh ─────────────────────────────────────────

type SeenInput = { model: string; body: Record<string, unknown> };

async function withStubbedDispatch(
  script: Array<{ status: number; body: string }>,
  run: (seen: SeenInput[]) => Promise<void>
): Promise<void> {
  const seen: SeenInput[] = [];
  const original = BaseExecutor.prototype.execute;
  let call = 0;
  BaseExecutor.prototype.execute = (async (input: unknown) => {
    const rec = input as { model: string; body: Record<string, unknown> };
    seen.push({ model: rec.model, body: rec.body });
    const step = script[Math.min(call, script.length - 1)] as { status: number; body: string };
    call += 1;
    return {
      response: new Response(step.body, {
        status: step.status,
        headers: { "Content-Type": "application/json" },
      }),
      url: "https://opencode.ai/zen/go/v1/responses",
      headers: {},
      transformedBody: null,
    };
  }) as typeof original;
  try {
    await run(seen);
  } finally {
    BaseExecutor.prototype.execute = original;
  }
}

function maxAliasInput(): {
  model: string;
  body: unknown;
  stream: boolean;
  credentials: unknown;
} {
  return {
    model: "muse-spark-1.3-contributor-max",
    body: {
      model: "muse-spark-1.3-contributor-max",
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 1000,
    },
    stream: false,
    credentials: CREDENTIALS,
  };
}

test("max-fallback: execute retries once with base model + xhigh on unsupported-effort 400", async () => {
  await withStubbedDispatch(
    [
      { status: 400, body: UPSTREAM_MAX_REJECTION },
      { status: 200, body: JSON.stringify({ choices: [{ message: { content: "ok" } }] }) },
    ],
    async (seen) => {
      const executor = new OpencodeExecutor("opencode-go");
      const result = await executor.execute(maxAliasInput());

      assert.equal(result.response.status, 200);
      assert.equal(seen.length, 2);
      assert.equal(seen[1]?.model, "muse-spark-1.3-contributor");
      assert.equal((seen[1]?.body as Record<string, unknown>).reasoning_effort, "xhigh");
    }
  );
});

test("max-fallback: execute does not retry unrelated 400s", async () => {
  await withStubbedDispatch([{ status: 400, body: OTHER_400 }], async (seen) => {
    const executor = new OpencodeExecutor("opencode-go");
    const result = await executor.execute(maxAliasInput());

    assert.equal(result.response.status, 400);
    assert.equal(seen.length, 1);
  });
});

test("max-fallback: execute does not retry when the first attempt succeeds", async () => {
  await withStubbedDispatch(
    [{ status: 200, body: JSON.stringify({ choices: [{ message: { content: "ok" } }] }) }],
    async (seen) => {
      const executor = new OpencodeExecutor("opencode-go");
      const result = await executor.execute(maxAliasInput());

      assert.equal(result.response.status, 200);
      assert.equal(seen.length, 1);
    }
  );
});

// ─── command-code: max passes through natively ────────────────────────────────

test("max-fallback: command-code passes reasoning_effort=max through untouched", async () => {
  const { CommandCodeExecutor } =
    (await import("../../open-sse/executors/commandCode.ts")) as unknown as {
      CommandCodeExecutor: new (provider: string) => {
        transformRequest: (
          model: string,
          body: Record<string, unknown>,
          stream: boolean,
          credentials: unknown
        ) => Record<string, unknown>;
      };
    };
  const executor = new CommandCodeExecutor("command-code");
  const out = executor.transformRequest(
    "meta/muse-spark-1.3-contributor",
    {
      model: "meta/muse-spark-1.3-contributor",
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "max",
    },
    true,
    CREDENTIALS
  );

  assert.equal(out.reasoning_effort, "max");
});
