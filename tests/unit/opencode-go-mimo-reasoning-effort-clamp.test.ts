/**
 * Xiaomi MiMo V2.5 / V2.6 on OpenCode gateways accept none|low|medium|high.
 * `xhigh`/`max`/`ultra` clamp to `high`; `minimal` clamps to `low`. `none`
 * stays `none`. opencode-go (and opencode-zen / opencode) otherwise rewrite
 * every `xhigh` to `max`, and `max` then passes through because
 * supportsMaxEffortForProvider() is true for the whole OpenCode family.
 * The upstream 400 is the opaque "Invalid request parameters", which
 * parseReasoningEffortEnum cannot learn from.
 *
 * Assertions are on the JSON body OpencodeExecutor hands to fetch — the
 * bytes that would leave for the gateway.
 */
import assert from "node:assert/strict";
import { describe, it, type TestContext } from "node:test";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";
import {
  nextProbeReasoningEffort,
  parseReasoningEffortEnum,
} from "../../open-sse/services/learnedReasoningEffortCaps.ts";

const MESSAGES = [{ role: "user", content: "hi" }];

async function captureOutbound(
  t: TestContext,
  provider: string,
  model: string,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const sent: Record<string, unknown>[] = [];
  t.mock.method(globalThis, "fetch", async (_url: unknown, init: RequestInit) => {
    sent.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
    return new Response(JSON.stringify({ choices: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  });
  const executor = new OpencodeExecutor(provider);
  const result = await executor.execute({
    model,
    stream: false,
    credentials: { apiKey: "test-key" },
    body,
  });
  assert.equal(result.response.status, 200);
  assert.equal(sent.length, 1, "sanitizer must fix the body before the first upstream fetch");
  return sent[0];
}

function chatBody(model: string, effort: string): Record<string, unknown> {
  return { model, messages: MESSAGES, reasoning_effort: effort };
}

describe("opencode-go MiMo V2.6 reasoning_effort ceiling", () => {
  for (const model of ["mimo-v2.6-pro", "mimo-v2.6-flash"]) {
    for (const effort of ["xhigh", "max", "ultra"]) {
      it(`${model}: ${effort} is clamped to high on the outbound body`, async (t) => {
        const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, effort));
        assert.deepEqual(sent, {
          model,
          messages: MESSAGES,
          reasoning_effort: "high",
        });
      });
    }

    it(`${model}: minimal is clamped to low on the outbound body`, async (t) => {
      const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, "minimal"));
      assert.deepEqual(sent, chatBody(model, "low"));
    });

    // `none` is verified accepted on both V2.6 models and must not be remapped.
    for (const effort of ["none", "low", "medium", "high"]) {
      it(`${model}: accepted effort ${effort} is forwarded unchanged`, async (t) => {
        const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, effort));
        assert.deepEqual(sent, chatBody(model, effort));
      });
    }
  }

  it("rewrites every effort carrier, not only the top-level field", async (t) => {
    const sent = await captureOutbound(t, "opencode-go", "mimo-v2.6-pro", {
      model: "mimo-v2.6-pro",
      messages: MESSAGES,
      reasoning_effort: "xhigh",
      reasoning: { effort: "max", summary: "auto" },
      output_config: { effort: "ultra" },
    });
    assert.deepEqual(sent, {
      model: "mimo-v2.6-pro",
      messages: MESSAGES,
      reasoning_effort: "high",
      reasoning: { effort: "high", summary: "auto" },
      output_config: { effort: "high" },
    });
  });

  it("clamps a provider-prefixed model id after OpenCode strips the prefix", async (t) => {
    const sent = await captureOutbound(
      t,
      "opencode-go",
      "opencode-go/mimo-v2.6-pro",
      chatBody("opencode-go/mimo-v2.6-pro", "xhigh")
    );
    assert.deepEqual(sent, {
      model: "mimo-v2.6-pro",
      messages: MESSAGES,
      reasoning_effort: "high",
    });
  });
});

describe("MiMo V2.5 flat effort uses the same ceiling", () => {
  for (const model of ["mimo-v2.5", "mimo-v2.5-pro"]) {
    for (const effort of ["xhigh", "max", "ultra"]) {
      it(`${model}: ${effort} is clamped to high`, async (t) => {
        const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, effort));
        assert.deepEqual(sent, chatBody(model, "high"));
      });
    }

    it(`${model}: high stays high`, async (t) => {
      const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, "high"));
      assert.deepEqual(sent, chatBody(model, "high"));
    });

    it(`${model}: minimal is clamped to low`, async (t) => {
      const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, "minimal"));
      assert.deepEqual(sent, chatBody(model, "low"));
    });

    it(`${model}: none stays none`, async (t) => {
      const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, "none"));
      assert.deepEqual(sent, chatBody(model, "none"));
    });
  }

  it("mimo-v2.5-max alias is still forwarded verbatim with no injected effort", async (t) => {
    const sent = await captureOutbound(t, "opencode-go", "mimo-v2.5-max", {
      model: "mimo-v2.5-max",
      messages: MESSAGES,
    });
    assert.deepEqual(sent, {
      model: "mimo-v2.5-max",
      messages: MESSAGES,
    });
    assert.equal(Object.hasOwn(sent, "reasoning_effort"), false);
  });
});

describe("OpenCode provider family shares the clamp", () => {
  it("opencode-zen + mimo-v2.6-pro clamps xhigh to high", async (t) => {
    const sent = await captureOutbound(
      t,
      "opencode-zen",
      "mimo-v2.6-pro",
      chatBody("mimo-v2.6-pro", "xhigh")
    );
    assert.deepEqual(sent, chatBody("mimo-v2.6-pro", "high"));
  });

  it("opencode (noauth) + mimo-v2.5-free clamps max to high on the wire", async (t) => {
    const sent = await captureOutbound(
      t,
      "opencode",
      "mimo-v2.5-free",
      chatBody("mimo-v2.5-free", "max")
    );
    // The free-tier contract also forces stream:true and a placeholder tool.
    // Those fields are unrelated to the effort clamp; the effort itself is high.
    assert.equal(sent.model, "mimo-v2.5-free");
    assert.equal(sent.reasoning_effort, "high");
    assert.equal(sent.stream, true);
    assert.ok(Array.isArray(sent.tools));
    assert.deepEqual(Object.keys(sent).sort(), [
      "messages",
      "model",
      "reasoning_effort",
      "stream",
      "tools",
    ]);
  });

  it("opencode_go alias is in the same provider family", () => {
    const out = sanitizeReasoningEffortForProvider(
      chatBody("mimo-v2.6-flash", "xhigh"),
      "opencode_go",
      "mimo-v2.6-flash"
    );
    assert.deepEqual(out, chatBody("mimo-v2.6-flash", "high"));
  });
});

describe("models that accept max on opencode-go still receive max", () => {
  // Registry: open-sse/config/providers/registry/opencode/go/index.ts
  //   deepseek-v4-pro supportedThinkingEfforts: ["none", "low", "high", "max"]
  // EFFORT_TIERS in open-sse/executors/opencode.ts lists the same vocabulary.
  // The id does not match MIMO_V25_V26_PATTERN, so the OpenCode xhigh→max
  // rewrite must keep running for it.
  for (const effort of ["xhigh", "max"]) {
    it(`deepseek-v4-pro keeps max when the client sends ${effort}`, async (t) => {
      const sent = await captureOutbound(
        t,
        "opencode-go",
        "deepseek-v4-pro",
        chatBody("deepseek-v4-pro", effort)
      );
      assert.deepEqual(sent, chatBody("deepseek-v4-pro", "max"));
    });
  }

  // Same registry file: qwen3.7-plus supportedThinkingEfforts: ["high", "max"].
  // No family pattern rewrites this id; max must pass through untouched.
  it("qwen3.7-plus keeps max", async (t) => {
    const sent = await captureOutbound(
      t,
      "opencode-go",
      "qwen3.7-plus",
      chatBody("qwen3.7-plus", "max")
    );
    assert.deepEqual(sent, chatBody("qwen3.7-plus", "max"));
  });
});

describe("the MiMo pattern does not swallow neighbouring ids", () => {
  for (const model of ["mimo-v2-flash", "mimo-v2.7-pro"]) {
    it(`${model} still takes the OpenCode xhigh→max rewrite`, async (t) => {
      const sent = await captureOutbound(t, "opencode-go", model, chatBody(model, "xhigh"));
      assert.deepEqual(sent, chatBody(model, "max"));
    });
  }
});

describe("the clamp is not applied outside the OpenCode provider family", () => {
  it("openrouter keeps xhigh (its API expects that tier)", () => {
    const body = chatBody("xiaomi/mimo-v2.6-pro", "xhigh");
    const out = sanitizeReasoningEffortForProvider(body, "openrouter", "xiaomi/mimo-v2.6-pro");
    assert.equal((out as Record<string, unknown>).reasoning_effort, "xhigh");
  });

  it("command-code keeps max (native tier on that validator)", () => {
    const body = chatBody("mimo-v2.5-pro", "max");
    const out = sanitizeReasoningEffortForProvider(body, "command-code", "mimo-v2.5-pro");
    assert.equal((out as Record<string, unknown>).reasoning_effort, "max");
  });
});

describe("opaque MiMo 400 cannot be learned", () => {
  it("parseReasoningEffortEnum returns null for the Xiaomi error text", () => {
    assert.equal(parseReasoningEffortEnum("[400] Invalid request parameters"), null);
    assert.equal(
      parseReasoningEffortEnum(
        "bad_request: opencode-go/mimo-v2.6-pro: model — [400] Invalid request parameters"
      ),
      null
    );
    assert.equal(
      parseReasoningEffortEnum("Streaming response failed: [400] Invalid request parameters"),
      null
    );
  });

  it("the one-step opaque probe would move max to xhigh, which MiMo also rejects", () => {
    assert.equal(nextProbeReasoningEffort("max"), "xhigh");
    assert.equal(nextProbeReasoningEffort("xhigh"), "high");
  });
});
