import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");

function makeLog() {
  const messages: Array<[string, string]> = [];
  return {
    info: (tag: string, msg: string) => messages.push([tag, msg]),
    messages,
  };
}

// Native `max` mapping / per-model clamp coverage for #11875.
// Split out of base-executor-sanitize-effort.test.ts so the original file stays under testCap 1000.

test("sanitizeReasoningEffortForProvider: cmd / z-ai/glm-5.3-flash maps xhigh → max and preserves max", () => {
  const log = makeLog();
  const bodyXHigh = { model: "z-ai/glm-5.3-flash", reasoning_effort: "xhigh", messages: [] };
  const resXHigh = sanitizeReasoningEffortForProvider(
    bodyXHigh,
    "cmd",
    "z-ai/glm-5.3-flash",
    log
  ) as Record<string, unknown>;
  assert.equal(resXHigh.reasoning_effort, "max");

  const bodyMax = { model: "z-ai/glm-5.3-flash", reasoning_effort: "max", messages: [] };
  const resMax = sanitizeReasoningEffortForProvider(
    bodyMax,
    "cmd",
    "z-ai/glm-5.3-flash",
    log
  ) as Record<string, unknown>;
  assert.equal(resMax.reasoning_effort, "max");
});

test("sanitizeReasoningEffortForProvider: cmd / deepseek/deepseek-v4-flash-vision-exp maps xhigh → max and preserves max", () => {
  const log = makeLog();
  const bodyXHigh = {
    model: "deepseek/deepseek-v4-flash-vision-exp",
    reasoning_effort: "xhigh",
    messages: [],
  };
  const resXHigh = sanitizeReasoningEffortForProvider(
    bodyXHigh,
    "cmd",
    "deepseek/deepseek-v4-flash-vision-exp",
    log
  ) as Record<string, unknown>;
  assert.equal(resXHigh.reasoning_effort, "max");

  const bodyMax = {
    model: "deepseek/deepseek-v4-flash-vision-exp",
    reasoning_effort: "max",
    messages: [],
  };
  const resMax = sanitizeReasoningEffortForProvider(
    bodyMax,
    "cmd",
    "deepseek/deepseek-v4-flash-vision-exp",
    log
  ) as Record<string, unknown>;
  assert.equal(resMax.reasoning_effort, "max");
});

test("sanitizeReasoningEffortForProvider: opencode-go / glm-5.3-flash maps xhigh → max and preserves max", () => {
  const log = makeLog();
  const bodyXHigh = { model: "glm-5.3-flash", reasoning_effort: "xhigh", messages: [] };
  const resXHigh = sanitizeReasoningEffortForProvider(
    bodyXHigh,
    "opencode-go",
    "glm-5.3-flash",
    log
  ) as Record<string, unknown>;
  assert.equal(resXHigh.reasoning_effort, "max");

  const bodyMax = { model: "glm-5.3-flash", reasoning_effort: "max", messages: [] };
  const resMax = sanitizeReasoningEffortForProvider(
    bodyMax,
    "opencode-go",
    "glm-5.3-flash",
    log
  ) as Record<string, unknown>;
  assert.equal(resMax.reasoning_effort, "max");
});

test("sanitizeReasoningEffortForProvider: opencode-go / deepseek-v4-flash-vision-exp maps xhigh → max and preserves max", () => {
  const log = makeLog();
  const bodyXHigh = {
    model: "deepseek-v4-flash-vision-exp",
    reasoning_effort: "xhigh",
    messages: [],
  };
  const resXHigh = sanitizeReasoningEffortForProvider(
    bodyXHigh,
    "opencode-go",
    "deepseek-v4-flash-vision-exp",
    log
  ) as Record<string, unknown>;
  assert.equal(resXHigh.reasoning_effort, "max");

  const bodyMax = { model: "deepseek-v4-flash-vision-exp", reasoning_effort: "max", messages: [] };
  const resMax = sanitizeReasoningEffortForProvider(
    bodyMax,
    "opencode-go",
    "deepseek-v4-flash-vision-exp",
    log
  ) as Record<string, unknown>;
  assert.equal(resMax.reasoning_effort, "max");
});

test("sanitizeReasoningEffortForProvider: ollamacloud / glm-5.3-flash:cloud maps xhigh → max and preserves max", () => {
  const log = makeLog();
  const bodyXHigh = { model: "glm-5.3-flash:cloud", reasoning_effort: "xhigh", messages: [] };
  const resXHigh = sanitizeReasoningEffortForProvider(
    bodyXHigh,
    "ollamacloud",
    "glm-5.3-flash:cloud",
    log
  ) as Record<string, unknown>;
  assert.equal(resXHigh.reasoning_effort, "max");

  const bodyMax = { model: "glm-5.3-flash:cloud", reasoning_effort: "max", messages: [] };
  const resMax = sanitizeReasoningEffortForProvider(
    bodyMax,
    "ollamacloud",
    "glm-5.3-flash:cloud",
    log
  ) as Record<string, unknown>;
  assert.equal(resMax.reasoning_effort, "max");
});

test("sanitizeReasoningEffortForProvider: ollamacloud / deepseek-v4-pro:cloud maps xhigh → max and preserves max", () => {
  const log = makeLog();
  const bodyXHigh = { model: "deepseek-v4-pro:cloud", reasoning_effort: "xhigh", messages: [] };
  const resXHigh = sanitizeReasoningEffortForProvider(
    bodyXHigh,
    "ollamacloud",
    "deepseek-v4-pro:cloud",
    log
  ) as Record<string, unknown>;
  assert.equal(resXHigh.reasoning_effort, "max");

  const bodyMax = { model: "deepseek-v4-pro:cloud", reasoning_effort: "max", messages: [] };
  const resMax = sanitizeReasoningEffortForProvider(
    bodyMax,
    "ollamacloud",
    "deepseek-v4-pro:cloud",
    log
  ) as Record<string, unknown>;
  assert.equal(resMax.reasoning_effort, "max");
});

test("sanitizeReasoningEffortForProvider: future models (glm-5.4, deepseek-v5, kimi-k4) on arbitrary providers map xhigh → max and preserve max", () => {
  const log = makeLog();
  for (const m of [
    "glm-5.4",
    "glm-5.4-flash",
    "glm-6.0",
    "deepseek-v5",
    "deepseek-v5-pro",
    "kimi-k4",
    "moonshotai/Kimi-K4",
  ]) {
    const bXHigh = { model: m, reasoning_effort: "xhigh", messages: [] };
    const rXHigh = sanitizeReasoningEffortForProvider(bXHigh, "some-proxy", m, log) as Record<
      string,
      unknown
    >;
    assert.equal(rXHigh.reasoning_effort, "max", `model ${m} should map xhigh → max`);

    const bMax = { model: m, reasoning_effort: "max", messages: [] };
    const rMax = sanitizeReasoningEffortForProvider(bMax, "some-proxy", m, log) as Record<
      string,
      unknown
    >;
    assert.equal(rMax.reasoning_effort, "max", `model ${m} should preserve max`);
  }
});

test("sanitizeReasoningEffortForProvider: muse-spark-1.2 clamps max/ultra → xhigh and none → minimal", () => {
  const log = makeLog();
  const bodyMax = { model: "muse-spark-1.2", reasoning_effort: "max", messages: [] };
  const resMax = sanitizeReasoningEffortForProvider(
    bodyMax,
    "codex",
    "muse-spark-1.2",
    log
  ) as Record<string, unknown>;
  assert.equal(resMax.reasoning_effort, "xhigh", "muse-spark-1.2 clamps max to xhigh");

  const bodyUltra = { model: "muse-spark-1.2", reasoning_effort: "ultra", messages: [] };
  const resUltra = sanitizeReasoningEffortForProvider(
    bodyUltra,
    "codex",
    "muse-spark-1.2",
    log
  ) as Record<string, unknown>;
  assert.equal(resUltra.reasoning_effort, "xhigh", "muse-spark-1.2 clamps ultra to xhigh");

  const bodyNone = { model: "muse-spark-1.2", reasoning_effort: "none", messages: [] };
  const resNone = sanitizeReasoningEffortForProvider(
    bodyNone,
    "codex",
    "muse-spark-1.2",
    log
  ) as Record<string, unknown>;
  assert.equal(resNone.reasoning_effort, "minimal", "muse-spark-1.2 clamps none to minimal");

  const bodyMed = { model: "muse-spark-1.2", reasoning_effort: "medium", messages: [] };
  const resMed = sanitizeReasoningEffortForProvider(
    bodyMed,
    "codex",
    "muse-spark-1.2",
    log
  ) as Record<string, unknown>;
  assert.equal(resMed.reasoning_effort, "medium", "muse-spark-1.2 preserves medium");
});

test("sanitizeReasoningEffortForProvider: GLM-5.3 and GLM-5.3-flash mappings and forced thinking", () => {
  const log = makeLog();
  for (const model of ["glm-5.3", "glm-5.3-flash", "z-ai/glm-5.3-flash"]) {
    // none/minimal/low → low
    for (const effort of ["none", "minimal", "low"]) {
      const b = { model, reasoning_effort: effort, messages: [] };
      const r = sanitizeReasoningEffortForProvider(b, "glm", model, log) as Record<string, unknown>;
      assert.equal(r.reasoning_effort, "low", `${model} should map ${effort} → low`);
    }

    // medium/high → high
    for (const effort of ["medium", "high"]) {
      const b = { model, reasoning_effort: effort, messages: [] };
      const r = sanitizeReasoningEffortForProvider(b, "glm", model, log) as Record<string, unknown>;
      assert.equal(r.reasoning_effort, "high", `${model} should map ${effort} → high`);
    }

    // xhigh/max/ultra → max
    for (const effort of ["xhigh", "max", "ultra"]) {
      const b = { model, reasoning_effort: effort, messages: [] };
      const r = sanitizeReasoningEffortForProvider(b, "glm", model, log) as Record<string, unknown>;
      assert.equal(r.reasoning_effort, "max", `${model} should map ${effort} → max`);
    }

    // thinking.type="disabled" is forced to "enabled"
    const bDisabled = {
      model,
      reasoning_effort: "max",
      thinking: { type: "disabled" },
      messages: [],
    };
    const rDisabled = sanitizeReasoningEffortForProvider(bDisabled, "glm", model, log) as Record<
      string,
      unknown
    >;
    assert.deepEqual(rDisabled.thinking, { type: "enabled" });
  }
});

test("sanitizeReasoningEffortForProvider: GLM-5.2 mappings", () => {
  const log = makeLog();
  const model = "glm-5.2";
  // none/minimal → none
  for (const effort of ["none", "minimal"]) {
    const b = { model, reasoning_effort: effort, messages: [] };
    const r = sanitizeReasoningEffortForProvider(b, "glm", model, log) as Record<string, unknown>;
    assert.equal(r.reasoning_effort, "none", `glm-5.2 should map ${effort} → none`);
  }

  // low/medium → high
  for (const effort of ["low", "medium"]) {
    const b = { model, reasoning_effort: effort, messages: [] };
    const r = sanitizeReasoningEffortForProvider(b, "glm", model, log) as Record<string, unknown>;
    assert.equal(r.reasoning_effort, "high", `glm-5.2 should map ${effort} → high`);
  }

  // high → high
  const bHigh = { model, reasoning_effort: "high", messages: [] };
  const rHigh = sanitizeReasoningEffortForProvider(bHigh, "glm", model, log) as Record<
    string,
    unknown
  >;
  assert.equal(rHigh.reasoning_effort, "high");

  // xhigh/max/ultra → max
  for (const effort of ["xhigh", "max", "ultra"]) {
    const b = { model, reasoning_effort: effort, messages: [] };
    const r = sanitizeReasoningEffortForProvider(b, "glm", model, log) as Record<string, unknown>;
    assert.equal(r.reasoning_effort, "max", `glm-5.2 should map ${effort} → max`);
  }
});

test("sanitizeReasoningEffortForProvider: o1-preview strips reasoning_effort", () => {
  const log = makeLog();
  const body = { model: "o1-preview", reasoning_effort: "high", messages: [] };
  const res = sanitizeReasoningEffortForProvider(body, "openai", "o1-preview", log) as Record<
    string,
    unknown
  >;
  assert.equal(res.reasoning_effort, undefined, "o1-preview strips reasoning_effort");
});

test("sanitizeReasoningEffortForProvider: o1, o1-mini, o3-mini clamp xhigh/max/ultra → high", () => {
  const log = makeLog();
  for (const model of ["o1", "o1-mini", "o3-mini", "o3-pro"]) {
    for (const effort of ["xhigh", "max", "ultra"]) {
      const b = { model, reasoning_effort: effort, messages: [] };
      const r = sanitizeReasoningEffortForProvider(b, "openai", model, log) as Record<
        string,
        unknown
      >;
      assert.equal(r.reasoning_effort, "high", `${model} should clamp ${effort} → high`);
    }
    for (const effort of ["low", "medium", "high"]) {
      const b = { model, reasoning_effort: effort, messages: [] };
      const r = sanitizeReasoningEffortForProvider(b, "openai", model, log) as Record<
        string,
        unknown
      >;
      assert.equal(r.reasoning_effort, effort, `${model} should preserve ${effort}`);
    }
  }
});

test("sanitizeReasoningEffortForProvider: Qwen 3.8 family (qwen3.8-max, qwen3.8-flash, qwen3.8-coder) reasoning effort handling", () => {
  const log = makeLog();
  // qwen3.8-max on DashScope / qwen-cloud accepts low, medium, xhigh (and passes through max)
  const bQwenMax = { model: "qwen3.8-max", reasoning_effort: "xhigh", messages: [] };
  const rQwenMax = sanitizeReasoningEffortForProvider(
    bQwenMax,
    "qwen-cloud",
    "qwen3.8-max",
    log
  ) as Record<string, unknown>;
  assert.equal(rQwenMax.reasoning_effort, "xhigh", "qwen3.8-max preserves xhigh natively");

  const bQwenMaxLiteral = { model: "qwen3.8-max", reasoning_effort: "max", messages: [] };
  const rQwenMaxLiteral = sanitizeReasoningEffortForProvider(
    bQwenMaxLiteral,
    "qwen-cloud",
    "qwen3.8-max",
    log
  ) as Record<string, unknown>;
  assert.equal(rQwenMaxLiteral.reasoning_effort, "max", "qwen3.8-max passes max through");

  // qwen-3.8 on opencode-go / command-code gateways maps xhigh → max
  const bQwenCmd = { model: "qwen-3.8", reasoning_effort: "xhigh", messages: [] };
  const rQwenCmd = sanitizeReasoningEffortForProvider(bQwenCmd, "cmd", "qwen-3.8", log) as Record<
    string,
    unknown
  >;
  assert.equal(rQwenCmd.reasoning_effort, "max", "qwen-3.8 on command-code maps xhigh → max");
});

test("sanitizeReasoningEffortForProvider: 2026 comprehensive models (Claude 4.7+, GPT-5.6, Kimi K4, DeepSeek V4) pass-through & normalization", () => {
  const log = makeLog();

  // Claude 4.7 / 5.0 allows all tiers
  for (const m of ["claude-opus-4-7", "claude-opus-4-8", "claude-5-sonnet", "claude-5-opus"]) {
    for (const effort of ["low", "medium", "high", "xhigh", "max"]) {
      const b = { model: m, output_config: { effort }, messages: [] };
      const r = sanitizeReasoningEffortForProvider(b, "claude", m, log) as Record<string, unknown>;
      assert.equal(
        (r.output_config as Record<string, unknown>).effort,
        effort,
        `${m} should support ${effort}`
      );
    }
  }

  // GPT-5.6 Sol/Terra allow ultra/max/xhigh
  for (const effort of ["low", "medium", "high", "xhigh", "max", "ultra"]) {
    const b = { model: "gpt-5.6-sol", reasoning: { effort }, messages: [] };
    const r = sanitizeReasoningEffortForProvider(b, "codex", "gpt-5.6-sol", log) as Record<
      string,
      unknown
    >;
    assert.equal(
      (r.reasoning as Record<string, unknown>).effort,
      effort,
      `gpt-5.6-sol should preserve ${effort}`
    );
  }
});
