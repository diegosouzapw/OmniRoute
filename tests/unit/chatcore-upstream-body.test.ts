// tests/unit/chatcore-upstream-body.test.ts
// Characterization of prepareUpstreamBody — the first internal sub-slice of executeProviderRequest
// (chatCore god-file decomposition, #3501). Uses a fresh temp DB (no payload rules / no detected
// tool limits → defaults). Locks: target-model pinning and the prompt_cache_key gating
// (excluded providers + non-OPENAI format never inject).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-upstream-body-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { setParamFilterConfig, deleteParamFilterConfig } =
  await import("../../src/lib/db/paramFilters.ts");

const { MODEL_SPECS } = await import("../../src/shared/constants/modelSpecs.ts");
const { setPayloadRulesConfig, resetPayloadRulesConfigForTests } =
  await import("../../open-sse/services/payloadRules.ts");

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("explicit hash intent follows translated reasoning representations before preparation", async () => {
  const { computeRequestHash } = await import("../../open-sse/services/requestDedup.ts");
  const variants = [
    {
      source: FORMATS.CLAUDE,
      target: FORMATS.OPENAI,
      model: "gpt-5.2",
      provider: "openai",
      field: "reasoning_effort",
    },
    {
      source: FORMATS.OPENAI,
      target: FORMATS.CLAUDE,
      model: "claude-opus-4.7",
      provider: "anthropic",
      field: "output_config",
    },
    {
      source: FORMATS.OPENAI,
      target: FORMATS.OPENAI_RESPONSES,
      model: "gpt-5.2",
      provider: "openai",
      field: "reasoning",
    },
  ];
  for (const variant of variants) {
    const translated = ["low", "high"].map(
      (effort) =>
        translateRequest(
          variant.source,
          variant.target,
          variant.model,
          {
            model: variant.model,
            messages: [{ role: "user", content: "Compare translated intent." }],
            ...(variant.source === FORMATS.CLAUDE
              ? { output_config: { effort } }
              : { reasoning_effort: effort }),
          },
          false,
          null,
          variant.provider
        ) as Record<string, unknown>
    );
    assert.ok(
      translated.every((request) => request[variant.field] !== undefined),
      variant.field
    );
    // Hold unrelated translated caps/sampling constant to isolate the intent projection.
    const requests = translated.map((request) => ({
      model: variant.model,
      messages: bodyMessages(),
      reasoning_effort: request.reasoning_effort,
      reasoning: request.reasoning,
      thinking: request.thinking,
      output_config: request.output_config,
    }));
    assert.notEqual(
      computeRequestHash(requests[0], "tenant", {}),
      computeRequestHash(requests[1], "tenant", {}),
      variant.field
    );
  }

  function bodyMessages() {
    return [{ role: "user", content: "Compare translated intent." }];
  }
});

test("automatic effort is limited to OpenAI chat bodies", async () => {
  for (const targetFormat of ["claude", "openai-responses", "gemini"]) {
    const out = await prepareUpstreamBody({
      translatedBody: {},
      modelToCall: "attempt-format-fixture",
      provider: "test",
      targetFormat,
      credentials: null,
      originModel: "attempt-format-fixture",
      resolvedThinkingEffort: "high",
      defaultThinkingEffort: "low",
    });
    assert.equal(out.reasoning_effort, undefined);
  }
});

test("attempt constraints rewrite Claude fields without changing the source", async () => {
  const source = {
    thinking: { type: "enabled", budget_tokens: 10000 },
    output_config: { effort: "max", format: "text" },
  };
  const before = structuredClone(source);
  const options = {
    translatedBody: source,
    provider: "anthropic",
    targetFormat: "claude",
    credentials: null,
    originModel: "claude-opus-4.7",
    resolvedThinkingEffort: "high",
  };
  const adaptive = await prepareUpstreamBody({ ...options, modelToCall: "claude-opus-4.7" });
  assert.deepEqual(adaptive.thinking, { type: "adaptive" });
  assert.equal(adaptive.reasoning_effort, undefined);
  const haiku = await prepareUpstreamBody({
    ...options,
    modelToCall: "claude-haiku-4.5",
    translatedBody: { ...source, thinking: { type: "adaptive" } },
  });
  assert.deepEqual(haiku.thinking, { type: "enabled", budget_tokens: 10000 });
  assert.deepEqual(haiku.output_config, { format: "text" });
  const disabled = await prepareUpstreamBody({
    ...options,
    modelToCall: "claude-opus-5",
    translatedBody: { ...source, thinking: { type: "disabled" } },
  });
  assert.deepEqual(disabled.output_config, { effort: "high", format: "text" });
  assert.deepEqual(source, before);
});

test("attempt effort leaves sampling and recovered history reusable for replacement models", async () => {
  const source = {
    model: "gpt-5.2",
    temperature: 0.3,
    top_p: 0.8,
    messages: [{ role: "user", content: "recovered history" }],
  };
  const before = structuredClone(source);
  const options = {
    translatedBody: source,
    provider: "openai",
    targetFormat: "openai",
    credentials: null,
    originModel: "gpt-5.2",
    resolvedThinkingEffort: "high",
    defaultThinkingEffort: "low",
  };
  const first = await prepareUpstreamBody({ ...options, modelToCall: "gpt-5.2" });
  assert.equal(first.reasoning_effort, "high");
  assert.equal(first.temperature, undefined);
  assert.equal(first.top_p, undefined);
  const replacement = await prepareUpstreamBody({ ...options, modelToCall: "gpt-5.1" });
  assert.equal(replacement.reasoning_effort, undefined);
  assert.equal(replacement.temperature, 0.3);
  assert.equal(replacement.top_p, 0.8);
  assert.deepEqual(replacement.messages, source.messages);
  assert.deepEqual(source, before);
  assert.notEqual(first, source);
});

test("static defaults belong to the attempt; suffix and synced defaults belong to the origin", async () => {
  const model = "gpt-5-attempt-fixture";
  MODEL_SPECS[model] = { defaultReasoningEffort: "low" };
  try {
    const options = {
      translatedBody: { temperature: 0.3 },
      modelToCall: model,
      provider: "openai",
      targetFormat: "openai",
      credentials: null,
      originModel: "original",
      resolvedThinkingEffort: "high",
      defaultThinkingEffort: "max",
    };
    const replacement = await prepareUpstreamBody(options);
    assert.equal(replacement.reasoning_effort, "low");
    assert.equal(replacement.temperature, undefined);
    const original = await prepareUpstreamBody({ ...options, originModel: model });
    assert.equal(original.reasoning_effort, "high");
    const staticOnly = await prepareUpstreamBody({
      ...options,
      originModel: model,
      resolvedThinkingEffort: null,
    });
    assert.equal(staticOnly.reasoning_effort, "low");
    delete MODEL_SPECS[model];
    const syncedOnly = await prepareUpstreamBody({
      ...options,
      originModel: model,
      resolvedThinkingEffort: null,
    });
    assert.equal(syncedOnly.reasoning_effort, "max");
  } finally {
    delete MODEL_SPECS[model];
  }
});

for (const choice of [
  { thinking: { type: "disabled" } },
  { thinking: false },
  { thinking: null },
  { thinking: {} },
  { reasoning: false },
  { reasoning: null },
  { reasoning: {} },
  { reasoning_effort: "none" },
  { reasoning_effort: null },
]) {
  test(`explicit intent precedes destructive constraints: ${JSON.stringify(choice)}`, async () => {
    const model = "claude-fable-5";
    const prior = MODEL_SPECS[model];
    MODEL_SPECS[model] = { ...prior, defaultReasoningEffort: "medium" };
    try {
      const source = structuredClone(choice);
      const out = await prepareUpstreamBody({
        translatedBody: source,
        modelToCall: model,
        provider: "cheaperinference",
        targetFormat: "openai",
        credentials: null,
        originModel: model,
        resolvedThinkingEffort: "high",
        defaultThinkingEffort: "low",
      });
      assert.equal(
        out.reasoning_effort,
        "reasoning_effort" in choice ? choice.reasoning_effort : undefined
      );
      if (
        "thinking" in choice &&
        choice.thinking &&
        typeof choice.thinking === "object" &&
        "type" in choice.thinking
      )
        assert.equal(out.thinking, undefined);
      assert.deepEqual(source, choice);
    } finally {
      MODEL_SPECS[model] = prior;
    }
  });
}

for (const metadata of [
  {},
  { originModel: null, resolvedThinkingEffort: null, defaultThinkingEffort: null },
]) {
  test(`empty bodies and absent metadata stay compatible: ${JSON.stringify(metadata)}`, async () => {
    const source = {};
    const out = await prepareUpstreamBody({
      translatedBody: source,
      modelToCall: "unconfigured-model",
      provider: null,
      targetFormat: "openai",
      credentials: undefined,
      ...metadata,
    });
    assert.deepEqual(out, { model: "unconfigured-model" });
    assert.deepEqual(source, {});
    assert.notEqual(out, source);
  });
}

test("attempt constraints isolate nested tool history and recompute registry restrictions", async () => {
  const source = {
    model: "o3",
    temperature: 0.2,
    tools: [{ type: "function", function: { name: "lookup" } }],
    messages: [
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call1", type: "function", function: { name: "lookup", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call1", content: "result" },
    ],
  };
  const before = structuredClone(source);
  const options = { translatedBody: source, targetFormat: "openai", credentials: null };
  const restricted = await prepareUpstreamBody({
    ...options,
    provider: "aihorde",
    modelToCall: "worker",
  });
  assert.equal(restricted.tools, undefined);
  assert.ok((restricted.messages as Array<{ role: string }>).every((m) => m.role !== "tool"));
  const open = await prepareUpstreamBody({ ...options, provider: "openai", modelToCall: "gpt-4o" });
  assert.deepEqual(open.tools, source.tools);
  assert.deepEqual(open.messages, source.messages);
  assert.equal(open.temperature, 0.2);
  const reasoning = await prepareUpstreamBody({
    ...options,
    provider: "openai",
    modelToCall: "o3",
  });
  assert.equal(reasoning.temperature, undefined);
  assert.deepEqual(source, before);
});

test("payload rules run after automatic guards and before target sanitation", async () => {
  setPayloadRulesConfig({
    default: [{ models: [{ name: "*" }], params: { reasoning_effort: "low" } }],
    override: [
      {
        models: [{ name: "*" }],
        params: { reasoning_effort: "high", temperature: 0.7, verbosity: "low" },
      },
    ],
    filter: [{ models: [{ name: "*" }], params: ["top_p"] }],
  });
  try {
    const source = {
      temperature: 0.2,
      top_p: 0.9,
      tools: [{ type: "function", function: { name: "lookup" } }],
    };
    const opts = {
      translatedBody: source,
      provider: "openai",
      targetFormat: "openai",
      credentials: null,
      originModel: "gpt-5.2",
      resolvedThinkingEffort: "high",
    };
    const origin = await prepareUpstreamBody({ ...opts, modelToCall: "gpt-5.2" });
    assert.equal(origin.reasoning_effort, "high");
    assert.equal(origin.temperature, 0.7);
    assert.equal(origin.top_p, undefined);
    const replacement = await prepareUpstreamBody({
      ...opts,
      modelToCall: "other-model",
      provider: "opencode-go",
    });
    assert.equal(replacement.reasoning_effort, "high");
    assert.equal(replacement.verbosity, undefined);
    assert.equal(source.temperature, 0.2);
  } finally {
    resetPayloadRulesConfigForTests();
  }
});

test("sampling guard precedes the function tools guard", async () => {
  const source = {
    temperature: 0.4,
    top_p: 0.8,
    tools: [{ type: "function", function: { name: "lookup" } }],
  };
  const out = await prepareUpstreamBody({
    translatedBody: source,
    modelToCall: "gpt-5.2",
    provider: "openai",
    targetFormat: "openai",
    credentials: null,
    originModel: "gpt-5.2",
    resolvedThinkingEffort: "high",
  });
  assert.equal(out.reasoning_effort, undefined);
  assert.equal(out.temperature, undefined);
  assert.equal(out.top_p, undefined);
  assert.equal(source.temperature, 0.4);
});

for (const provider of ["xiaomi-mimo", "opencode-go"]) {
  test(`${provider} cleanup runs after default selection without restoring explicit choices`, async () => {
    const options = {
      modelToCall: "unknown-model",
      originModel: "unknown-model",
      provider,
      targetFormat: "openai",
      credentials: null,
      resolvedThinkingEffort: "high",
    };
    const out = await prepareUpstreamBody({ ...options, translatedBody: { reasoning: false } });
    assert.equal(out.reasoning, undefined);
    assert.equal(out.reasoning_effort, undefined);
    if (provider === "xiaomi-mimo") {
      const bare = await prepareUpstreamBody({ ...options, translatedBody: {} });
      assert.equal(bare.reasoning_effort, undefined);
      assert.equal(bare.thinking, undefined);
    }
  });
}

test("pins the target model when it differs from the translated body model", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "model-a", messages: [] },
    modelToCall: "model-b",
    provider: "some-provider",
    targetFormat: "claude",
    credentials: null,
  });
  assert.equal(out.model, "model-b");
});

test("leaves the model untouched when it already matches", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "model-a", messages: [] },
    modelToCall: "model-a",
    provider: "some-provider",
    targetFormat: "claude",
    credentials: null,
  });
  assert.equal(out.model, "model-a");
});

test("defaults OpenAI image inputs to high detail for OpenCode clients without overriding explicit detail", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: {
      model: "model-a",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Read this screenshot" },
            { type: "image_url", image_url: { url: "data:image/png;base64,test" } },
            {
              type: "image_url",
              image_url: { url: "data:image/png;base64,test", detail: "low" },
            },
          ],
        },
      ],
    },
    modelToCall: "model-a",
    provider: "opencode-zen",
    targetFormat: FORMATS.OPENAI,
    credentials: null,
    isOpencodeClient: true,
  });

  const content = (
    out.messages as Array<{ content: Array<{ image_url?: { detail?: string } }> }>
  )[0].content;
  assert.equal(content[1].image_url?.detail, "high");
  assert.equal(content[2].image_url?.detail, "low");
});

test("defaults Responses input images to high detail for OpenCode clients", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: {
      model: "model-a",
      input: [
        {
          role: "user",
          content: [{ type: "input_image", image_url: "data:image/png;base64,test" }],
        },
      ],
    },
    modelToCall: "model-a",
    provider: "opencode-zen",
    targetFormat: FORMATS.OPENAI_RESPONSES,
    credentials: null,
    isOpencodeClient: true,
  });

  const content = (out.input as Array<{ content: Array<{ detail?: string }> }>)[0].content;
  assert.equal(content[0].detail, "high");
});

test("leaves image detail untouched for non-OpenCode clients on the same provider", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: {
      model: "model-a",
      messages: [
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: "data:image/png;base64,test" } }],
        },
      ],
    },
    modelToCall: "model-a",
    provider: "opencode-zen",
    targetFormat: FORMATS.OPENAI,
    credentials: null,
  });

  const content = (
    out.messages as Array<{ content: Array<{ image_url?: { detail?: string } }> }>
  )[0].content;
  assert.equal(content[0].image_url?.detail, undefined);
});

test("strips Codex GPT-5 verbosity after routing resolves to opencode-go/GLM", async () => {
  const translatedBody = {
    model: "glm-5.2",
    messages: [{ role: "user", content: "hi" }],
    verbosity: "low",
  };
  const out = await prepareUpstreamBody({
    translatedBody,
    modelToCall: "glm-5.2",
    provider: "opencode-go",
    targetFormat: "openai",
    credentials: null,
  });

  assert.equal(out.verbosity, undefined);
  assert.equal(translatedBody.verbosity, "low", "translated caller body must not be mutated");
});

test("Codex Responses routing clamps reasoning effort to the nearest declared tier while dropping GPT-only verbosity", async () => {
  // Simulates a combo/fallback reroute: the request is first translated while still
  // addressed at Codex (an allowlisted OpenAI-param destination, #7533), which is why
  // `text.verbosity` survives the Responses->Chat hop as top-level `verbosity`. Routing
  // then resolves the actual upstream target to opencode-go/GLM (a fallback target),
  // so `prepareUpstreamBody`'s final sanitizeRequestForResolvedTarget (#7050/#7533) must
  // strip the GPT-only `verbosity` for that concrete target. `reasoning_effort` is not
  // gated by destination provider, but since #10788 glm-5.2 declares its live tier
  // vocabulary {high, max}, the out-of-vocabulary `low` clamps up to the nearest
  // declared tier (`high`) instead of passing through verbatim.
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "glm-5.2",
    {
      model: "gpt-5.2",
      input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
      reasoning: { effort: "low", summary: "auto" },
      text: { verbosity: "low" },
    },
    true,
    { provider: "codex" },
    "codex"
  ) as Record<string, unknown>;

  assert.equal(translated.reasoning_effort, "low");
  assert.equal(translated.verbosity, "low");

  const outbound = await prepareUpstreamBody({
    translatedBody: translated,
    modelToCall: "glm-5.2",
    provider: "opencode-go",
    targetFormat: FORMATS.OPENAI,
    credentials: null,
  });

  // #10788 nearest-tier clamp: glm-5.2 accepts {high, max}; low → high.
  assert.equal(outbound.reasoning_effort, "high");
  assert.equal(outbound.verbosity, undefined);
});

test("Codex Responses reasoning effort is translated to Claude thinking for z.ai", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "glm-5.2",
    {
      model: "gpt-5.2",
      input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
      reasoning: { effort: "low" },
      text: { verbosity: "low" },
    },
    true,
    null,
    "zai"
  ) as Record<string, unknown>;

  assert.deepEqual(translated.thinking, { type: "enabled", budget_tokens: 1024 });
  assert.equal(translated.reasoning_effort, undefined);
  assert.equal(translated.verbosity, undefined);
});

test("resolved-target sanitation preserves Ollama Cloud reasoning effort", async () => {
  const outbound = await prepareUpstreamBody({
    translatedBody: {
      model: "glm-5.2",
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "max",
      verbosity: "low",
    },
    modelToCall: "glm-5.2",
    provider: "ollama-cloud",
    targetFormat: FORMATS.OPENAI,
    credentials: null,
  });

  assert.equal(outbound.reasoning_effort, "max");
  assert.equal(outbound.verbosity, undefined);
});

test("strips nested Responses text.verbosity for a non-GPT routed target", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: {
      model: "glm-5.2",
      input: "hi",
      text: { verbosity: "low", format: { type: "text" } },
    },
    modelToCall: "glm-5.2",
    provider: "ollama-cloud",
    targetFormat: "openai-responses",
    credentials: null,
  });

  assert.deepEqual(out.text, { format: { type: "text" } });
});

test("preserves verbosity when the resolved target is actually GPT-5", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "gpt-5.2", messages: [], verbosity: "low" },
    modelToCall: "gpt-5.2",
    provider: "openai",
    targetFormat: "openai",
    credentials: null,
  });

  assert.equal(out.verbosity, "low");
});

test("applies provider parameter filters at the universal target boundary", async () => {
  setParamFilterConfig("opencode-go", {
    block: ["source_only_control"],
    allow: [],
    autoLearn: false,
  });
  try {
    const out = await prepareUpstreamBody({
      translatedBody: {
        model: "glm-5.2",
        messages: [],
        source_only_control: true,
      },
      modelToCall: "glm-5.2",
      provider: "opencode-go",
      targetFormat: "openai",
      credentials: null,
    });
    assert.equal(out.source_only_control, undefined);
  } finally {
    deleteParamFilterConfig("opencode-go");
  }
});

// PR #5563: the `effectiveToolLimit < MAX_TOOLS_LIMIT` gate was removed from
// truncateToolList, so providers whose proactive limit is >= the 128 default
// (e.g. grok-cli at 200) are actually truncated. Without the gate removal these
// two assertions fail (250 tools would pass through untruncated).
test("truncates the tool list to the grok-cli proactive limit (200) when exceeded", async () => {
  const tools = Array.from({ length: 250 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}`, parameters: {} },
  }));
  const out = await prepareUpstreamBody({
    translatedBody: { model: "grok-cli-model", messages: [], tools },
    modelToCall: "grok-cli-model",
    provider: "grok-cli",
    targetFormat: "claude",
    credentials: null,
  });
  assert.ok(Array.isArray(out.tools));
  assert.equal(out.tools.length, 200);
});

test("preserves the full tool list when within the grok-cli limit", async () => {
  const tools = Array.from({ length: 150 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}`, parameters: {} },
  }));
  const out = await prepareUpstreamBody({
    translatedBody: { model: "grok-cli-model", messages: [], tools },
    modelToCall: "grok-cli-model",
    provider: "grok-cli",
    targetFormat: "claude",
    credentials: null,
  });
  assert.ok(Array.isArray(out.tools));
  assert.equal(out.tools.length, 150);
});

test("injects a stable prompt_cache_key for Codex automatic prefix caching", async () => {
  const request = {
    model: "gpt-5-codex",
    messages: [
      { role: "system", content: "stable coding instructions" },
      { role: "user", content: "fix this" },
    ],
  };
  const opts = {
    translatedBody: request,
    modelToCall: "gpt-5-codex",
    provider: "codex",
    targetFormat: "openai",
    credentials: null,
  };

  const first = await prepareUpstreamBody(opts);
  const second = await prepareUpstreamBody(opts);

  assert.match(String(first.prompt_cache_key), /^omni-[0-9a-f]{32}$/);
  assert.equal(second.prompt_cache_key, first.prompt_cache_key);
});

test("never injects prompt_cache_key when the target format is not OpenAI", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "claude-x", messages: [{ role: "user", content: "hi" }] },
    modelToCall: "claude-x",
    provider: "claude",
    targetFormat: "claude",
    credentials: null,
  });
  assert.equal(out.prompt_cache_key, undefined);
});

test("injects prompt_cache_key for Kimi Code's OpenAI protocol", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: {
      model: "kimi-for-coding",
      messages: [
        { role: "system", content: "coding instructions" },
        { role: "user", content: "fix this" },
      ],
    },
    modelToCall: "kimi-for-coding",
    provider: "kimi-coding",
    targetFormat: "openai",
    credentials: { accessToken: "oauth-token" },
  });
  assert.match(String(out.prompt_cache_key), /^omni-[0-9a-f]{32}$/);
});
