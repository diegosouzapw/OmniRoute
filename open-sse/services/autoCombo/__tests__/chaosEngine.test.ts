/**
 * Tests for the chaos engine — parallel multi-model dispatch for `auto/chaos`.
 *
 * Verifies:
 *   - runChaosPanel fans out to all models in parallel and collects each answer
 *   - a hung model is bounded by panelHardTimeoutMs (never stalls forever)
 *   - a failed model is reported as ok:false but does not break the panel
 *   - handleChaosChat emits the `omni-chaos-part` broadcast events + a final
 *     OpenAI-style chunk carrying the primary model's answer
 *   - single-model chaos degrades to a direct handleSingleModel call
 */

import { describe, it, expect, vi } from "vitest";
import { runChaosPanel, handleChaosChat, serializeChaosPart, type ChaosPart } from "../chaosEngine";

function textResponse(text: string): Response {
  return new Response(JSON.stringify({ choices: [{ message: { content: text } }] }), {
    headers: { "content-type": "application/json" },
  });
}

function fakeHandle(impl: (model: string) => Promise<Response>) {
  return vi.fn(async (_body: Record<string, unknown>, model: string) => impl(model));
}

describe("runChaosPanel", () => {
  it("fans out to all models in parallel and collects each answer", async () => {
    const order: string[] = [];
    const handle = fakeHandle(async (model) => {
      order.push(model);
      return textResponse(`answer-from-${model}`);
    });
    const { parts, primary } = await runChaosPanel({
      body: { messages: [] },
      models: ["a/gpt", "b/opus", "c/sonnet"],
      handleSingleModel: handle,
    });
    expect(handle).toHaveBeenCalledTimes(3);
    expect(parts).toHaveLength(3);
    expect(parts.every((p) => p.ok)).toBe(true);
    expect(parts.map((p) => p.text)).toEqual([
      "answer-from-a/gpt",
      "answer-from-b/opus",
      "answer-from-c/sonnet",
    ]);
    // primary = last successful (top-scored stable model by construction)
    expect(primary?.model).toBe("c/sonnet");
  });

  it("bounds a hung model via panelHardTimeoutMs", async () => {
    const handle = fakeHandle(async (model) => {
      if (model === "slow/x") {
        await new Promise((r) => setTimeout(r, 5000));
        return textResponse("late");
      }
      return textResponse("fast");
    });
    const start = Date.now();
    const { parts } = await runChaosPanel({
      body: {},
      models: ["fast/y", "slow/x"],
      handleSingleModel: handle,
      tuning: { panelHardTimeoutMs: 200 },
    });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(2000); // did not wait the full 5s
    const slow = parts.find((p) => p.model === "slow/x");
    expect(slow?.ok).toBe(false);
    expect(slow?.error).toBe("chaos-panel-timeout");
  });

  it("reports a failed model without breaking the panel", async () => {
    const handle = fakeHandle(async (model) => {
      if (model === "boom/z") throw new Error("upstream 500");
      return textResponse("ok");
    });
    const { parts } = await runChaosPanel({
      body: {},
      models: ["good/w", "boom/z"],
      handleSingleModel: handle,
    });
    expect(parts.find((p) => p.model === "good/w")?.ok).toBe(true);
    expect(parts.find((p) => p.model === "boom/z")?.ok).toBe(false);
  });
});

describe("serializeChaosPart", () => {
  it("emits a comment + omni-chaos-part event envelope", () => {
    const part: ChaosPart = { model: "a/gpt", index: 0, ok: true, text: "hi" };
    const s = serializeChaosPart(part, false);
    expect(s).toContain("event: omni-chaos-part");
    expect(s).toContain('"type":"omni-chaos-part"');
    expect(s).toContain('"model":"a/gpt"');
    expect(s).toContain(": chaos 0 ok a/gpt");
  });
});

describe("handleChaosChat", () => {
  it("emits broadcast events + final OpenAI chunk", async () => {
    const handle = fakeHandle(async (model) => textResponse(`ans-${model}`));
    const res = await handleChaosChat({
      body: { messages: [] },
      models: ["a/gpt", "b/opus"],
      handleSingleModel: handle,
    });
    expect(res.headers.get("X-OmniRoute-Chaos")).toBe("true");
    expect(res.headers.get("X-OmniRoute-Chaos-Panel")).toBe("2");
    const body = await res.text();
    // each model gets a broadcast event
    expect(body.match(/event: omni-chaos-part/g)?.length).toBe(2);
    // final canonical chunk carries the primary answer
    expect(body).toContain("ans-b/opus");
    expect(body).toContain("[DONE]");
  });

  it("degrades to a direct call when only one model", async () => {
    const handle = fakeHandle(async () => textResponse("solo"));
    const res = await handleChaosChat({
      body: {},
      models: ["only/x"],
      handleSingleModel: handle,
    });
    expect(handle).toHaveBeenCalledTimes(1);
    const txt = await res.text();
    expect(txt).toContain("solo");
  });

  it("streams an error final chunk (status 200) when every model fails", async () => {
    const handle = fakeHandle(async () => {
      throw new Error("dead");
    });
    const res = await handleChaosChat({
      body: {},
      models: ["a/x", "b/y"],
      handleSingleModel: handle,
    });
    // SSE envelope stays well-formed (200) even when the whole panel fails; the
    // client learns via the error final chunk rather than a bare 503.
    expect(res.status).toBe(200);
    const body = await res.text();
    // each model gets a broadcast fail event
    expect(body.match(/event: omni-chaos-part/g)?.length).toBe(2);
    expect(body).toContain("All chaos panel models failed");
    expect(body).toContain("[DONE]");
  });

  it("aborts the underlying request on panel timeout", async () => {
    let aborted = false;
    let settledEarly = false;
    const handle = vi.fn(
      async (
        _body: Record<string, unknown>,
        _model: string,
        target?: { modelAbortSignal?: AbortSignal }
      ) => {
        const signal = target?.modelAbortSignal;
        if (signal) signal.addEventListener("abort", () => (aborted = true), { once: true });
        // Mimic a real downstream dispatcher: abort the in-flight request when the
        // chaos panel timeout fires (handleSingleModelWithTimeout does exactly this
        // via target.modelAbortSignal).
        await new Promise<void>((resolve, reject) => {
          const t = setTimeout(resolve, 5000);
          signal?.addEventListener(
            "abort",
            () => {
              clearTimeout(t);
              settledEarly = true;
              reject(new Error("aborted"));
            },
            { once: true }
          );
        });
        return textResponse("late");
      }
    );
    const { parts } = await runChaosPanel({
      body: {},
      models: ["slow/x"],
      handleSingleModel: handle,
      tuning: { panelHardTimeoutMs: 150 },
    });
    // The single model timed out → its part is a fail and the underlying request
    // was aborted (did NOT wait the full 5s), releasing the connection.
    expect(parts).toHaveLength(1);
    expect(parts[0].ok).toBe(false);
    expect(parts[0].error).toBe("chaos-panel-timeout");
    expect(aborted).toBe(true);
    expect(settledEarly).toBe(true);
  });
});
