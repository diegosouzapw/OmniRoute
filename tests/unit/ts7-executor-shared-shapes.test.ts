import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");

/**
 * Behavioral guards for the three type-only fixes in the TS 7 executor slice
 * (see #8484). Each fix restored a type the code already depended on at runtime;
 * these tests pin the runtime contracts so a future "simplification" of the
 * annotations cannot silently change behavior.
 *
 * The zed-hosted `SseEnqueueTarget` fix is already covered end-to-end by
 * `zed-hosted-think-close-marker.test.ts`, which drives the same TransformStream
 * that failed to type-check — no duplicate added here.
 */

// NOTE: the former truncates-to-128 guard here is superseded by
// opencode-tools-no-truncation.test.ts (#11444): tool-list limiting moved to
// chatCore truncateToolList(); the executor must forward arrays intact.

describe("OpencodeExecutor — tools truncation survives the narrowing fix", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

  const tools = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
      type: "function",
      function: { name: `tool_${i}`, parameters: {} },
    }));

  function bodyWith(toolCount: number) {
    return {
      model: "oc/kimi-k2.6",
      stream: true,
      messages: [{ role: "user", content: "hi" }],
      tools: tools(toolCount),
    };
  }

  // #11444 removed the executor's own `tools.slice(0, 128)`: it dropped every tool past
  // the 128th (task, skill, write, read…) and left subagent runs paralyzed. Limiting is
  // the chatCore layer's job now — `upstreamBody.truncateToolList()`, which reads a
  // per-provider limit from `toolLimitDetector` instead of a hardcoded 128, so
  // grok-cli (200) and nvidia (1536) are not cut at someone else's ceiling.
  //
  // This case used to assert the truncation and directly contradicted
  // `opencode-tools-no-truncation.test.ts`, which owns the pass-through contract. It now
  // pins the same direction from this file's angle — the narrowing fix must not let the
  // cap creep back in here — so the two agree instead of racing.
  it("forwards an over-long tools array intact, leaving the limit to chatCore (#11444)", () => {
    const out = executor.transformRequest("oc/kimi-k2.6", bodyWith(200), true, CREDENTIALS) as {
      tools: unknown[];
    };
    assert.equal(out.tools.length, 200, "the executor must not impose a tool cap");
    assert.equal(
      (out.tools[199] as { function: { name: string } }).function.name,
      "tool_199",
      "order and tail preserved — nothing sliced off"
    );
  });

  it("leaves a within-limit tools array untouched", () => {
    const out = executor.transformRequest("oc/kimi-k2.6", bodyWith(10), true, CREDENTIALS) as {
      tools: unknown[];
    };
    assert.equal(out.tools.length, 10);
  });

  it("is a no-op when the body carries no tools", () => {
    const body = {
      model: "oc/kimi-k2.6",
      stream: true,
      messages: [{ role: "user", content: "hi" }],
    };
    const out = executor.transformRequest("oc/kimi-k2.6", body, true, CREDENTIALS) as Record<
      string,
      unknown
    >;
    assert.equal("tools" in out, false);
    assert.ok(Array.isArray(out.messages), "messages preserved");
  });

  it("leaves an array-shaped body alone (pins the !Array.isArray guard)", () => {
    // The pre-fix condition reached `.tools` on any object, arrays included, and
    // relied on `Array.isArray(undefined)` short-circuiting. The explicit
    // !Array.isArray() guard must keep that outcome identical.
    const arrayBody = [{ role: "user", content: "hi" }] as unknown as Record<string, unknown>;
    const out = executor.transformRequest("oc/kimi-k2.6", arrayBody, true, CREDENTIALS);
    assert.ok(Array.isArray(out), "array body must pass through as an array");
    assert.equal((out as unknown[]).length, 1);
  });
});
