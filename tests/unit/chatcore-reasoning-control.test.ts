import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-reasoning-control-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { withReasoningRuleContext } = await import("../../open-sse/utils/reasoningRuleContext.ts");
const { getReasoningControlEndpointFingerprint } =
  await import("../../open-sse/utils/reasoningControl.ts");
const { setParamFilterConfig, deleteParamFilterConfig } =
  await import("../../src/lib/db/paramFilters.ts");
const { MODEL_SPECS } = await import("../../src/shared/constants/modelSpecs.ts");
const { setPayloadRulesConfig, resetPayloadRulesConfigForTests } =
  await import("../../open-sse/services/payloadRules.ts");
const { applyOutputStyles } =
  await import("../../open-sse/services/compression/outputStyles/apply.ts");

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const templateControlProvider = "openai-compatible-template-control";
const templateControlCredentials = {
  providerSpecificData: { reasoningControl: "chat-template" },
};

function translateReasoning(
  sourceFormat: string,
  targetFormat: string,
  body: Record<string, unknown>
) {
  return translateRequest(
    sourceFormat,
    targetFormat,
    "arbitrary-local-model",
    body,
    false,
    null,
    templateControlProvider
  );
}

test("chat-template reasoning control maps none for arbitrary model ids", async () => {
  for (const model of ["local-model", "vendor/path-shaped-model"]) {
    const source = {
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "NONE",
      chat_template_kwargs: { custom_flag: true },
    };
    const before = structuredClone(source);
    const first = await prepareUpstreamBody({
      translatedBody: source,
      modelToCall: model,
      provider: templateControlProvider,
      targetFormat: FORMATS.OPENAI,
      credentials: templateControlCredentials,
    });

    assert.equal(first.reasoning_effort, undefined);
    assert.deepEqual(first.chat_template_kwargs, {
      thinking: false,
      enable_thinking: false,
      custom_flag: true,
    });

    const second = await prepareUpstreamBody({
      translatedBody: first,
      modelToCall: model,
      provider: templateControlProvider,
      targetFormat: FORMATS.OPENAI,
      credentials: templateControlCredentials,
    });
    assert.deepEqual(second, first, "mapping should be idempotent");
    assert.deepEqual(source, before, "source body should not be mutated");
  }
});

test("detected reasoning control applies only while its endpoint fingerprint is current", async () => {
  const providerSpecificData: Record<string, unknown> = {
    baseUrl: "https://engine.example.test/v1",
    apiType: "chat",
  };
  providerSpecificData.detectedReasoningControl = {
    mode: "chat-template",
    modelBackends: { "detected-model": "vllm" },
    source: "models.data.effective_owned_by",
    detectorVersion: 2,
    observedAt: "2026-10-05T00:00:00.000Z",
    endpointFingerprint: getReasoningControlEndpointFingerprint(providerSpecificData),
  };
  const options = {
    translatedBody: { messages: [], reasoning_effort: "none" },
    modelToCall: "detected-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
  };

  const detected = await prepareUpstreamBody({
    ...options,
    credentials: { providerSpecificData },
  });
  assert.equal(detected.reasoning_effort, undefined);
  assert.deepEqual(detected.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
  });

  const stale = await prepareUpstreamBody({
    ...options,
    credentials: {
      providerSpecificData: {
        ...providerSpecificData,
        baseUrl: "https://replacement.example.test/v1",
      },
    },
  });
  assert.equal(stale.reasoning_effort, "none");
  assert.equal(stale.chat_template_kwargs, undefined);

  const explicitlyOpenAI = await prepareUpstreamBody({
    ...options,
    credentials: {
      providerSpecificData: { ...providerSpecificData, reasoningControl: "openai" },
    },
  });
  assert.equal(explicitlyOpenAI.reasoning_effort, "none");
  assert.equal(explicitlyOpenAI.chat_template_kwargs, undefined);
});

test("detected reasoning control uses exact final wire model evidence", async () => {
  const providerSpecificData: Record<string, unknown> = {
    baseUrl: "https://engine.example.test/v1",
    apiType: "chat",
  };
  providerSpecificData.detectedReasoningControl = {
    mode: "chat-template",
    modelBackends: Object.fromEntries([
      ["Case/Known-Model", "vllm"],
      ["__proto__", "sglang"],
    ]),
    source: "models.data.effective_owned_by",
    detectorVersion: 2,
    observedAt: "2026-10-05T00:00:00.000Z",
    endpointFingerprint: getReasoningControlEndpointFingerprint(providerSpecificData),
  };
  const credentials = { providerSpecificData };
  const prepare = (modelToCall: string) =>
    prepareUpstreamBody({
      translatedBody: { messages: [], reasoning_effort: "none" },
      modelToCall,
      provider: templateControlProvider,
      targetFormat: FORMATS.OPENAI,
      credentials,
    });

  const known = await prepare("Case/Known-Model");
  assert.equal(known.reasoning_effort, undefined);
  assert.deepEqual(known.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
  });

  const differentCase = await prepare("case/known-model");
  assert.equal(differentCase.reasoning_effort, "none");
  assert.equal(differentCase.chat_template_kwargs, undefined);

  const prototypeNamed = await prepare("__proto__");
  assert.equal(prototypeNamed.reasoning_effort, undefined);
  const detected = providerSpecificData.detectedReasoningControl as Record<string, unknown>;
  assert.equal(Object.hasOwn(detected.modelBackends as object, "__proto__"), true);
});

test("payload-rule model rewrites select reasoning control from the final wire model", async () => {
  const providerSpecificData: Record<string, unknown> = {
    baseUrl: "https://engine.example.test/v1",
    apiType: "chat",
  };
  providerSpecificData.detectedReasoningControl = {
    mode: "chat-template",
    modelBackends: {
      "gpt-5-known-final-model": "vllm",
      "gpt-5-known-initial-model": "sglang",
    },
    source: "models.data.effective_owned_by",
    detectorVersion: 2,
    observedAt: "2026-10-05T00:00:00.000Z",
    endpointFingerprint: getReasoningControlEndpointFingerprint(providerSpecificData),
  };
  const options = {
    translatedBody: { messages: [], reasoning_effort: "none", verbosity: "high" },
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: { providerSpecificData },
  };

  setPayloadRulesConfig({
    override: [{ models: [{ name: "*" }], params: { model: "gpt-5-known-final-model" } }],
  });
  try {
    const routedToKnown = await prepareUpstreamBody({
      ...options,
      modelToCall: "unknown-initial-model",
    });
    assert.equal(routedToKnown.model, "gpt-5-known-final-model");
    assert.equal(routedToKnown.reasoning_effort, undefined);
    assert.equal(routedToKnown.verbosity, "high");
    assert.deepEqual(routedToKnown.chat_template_kwargs, {
      thinking: false,
      enable_thinking: false,
    });

    const nativeOff = await prepareUpstreamBody({
      ...options,
      translatedBody: {
        messages: [],
        chat_template_kwargs: { thinking: false, enable_thinking: false },
      },
      modelToCall: "unknown-initial-model",
      originModel: "unknown-initial-model",
      resolvedThinkingEffort: "high",
      defaultThinkingEffort: "high",
    });
    const repeatedNativeOff = await prepareUpstreamBody({
      ...options,
      translatedBody: nativeOff,
      modelToCall: "unknown-initial-model",
      originModel: "unknown-initial-model",
      resolvedThinkingEffort: "high",
      defaultThinkingEffort: "high",
    });
    assert.equal(nativeOff.reasoning_effort, undefined);
    assert.deepEqual(repeatedNativeOff, nativeOff);
  } finally {
    resetPayloadRulesConfigForTests();
  }

  setPayloadRulesConfig({
    override: [{ models: [{ name: "*" }], params: { model: "unknown-final-model" } }],
  });
  try {
    const routedToUnknown = await prepareUpstreamBody({
      ...options,
      modelToCall: "gpt-5-known-initial-model",
    });
    assert.equal(routedToUnknown.model, "unknown-final-model");
    assert.equal(routedToUnknown.reasoning_effort, "none");
    assert.equal(routedToUnknown.chat_template_kwargs, undefined);
    assert.equal(routedToUnknown.verbosity, undefined);
  } finally {
    resetPayloadRulesConfigForTests();
  }
});

test("native chat-template off remains explicit across automatic defaults and repeated preparation", async () => {
  const model = "chat-template-default-fixture";
  const prior = MODEL_SPECS[model];
  MODEL_SPECS[model] = { defaultReasoningEffort: "high" };
  const options = {
    modelToCall: model,
    originModel: model,
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: templateControlCredentials,
    resolvedThinkingEffort: "high",
    defaultThinkingEffort: "high",
    rawBody: { messages: [{ role: "user", content: "Use an automatic effort" }] },
    clientRawRequest: { headers: { "x-omniroute-effort": "auto" } },
  };
  try {
    const nativeOff = await prepareUpstreamBody({
      ...options,
      translatedBody: {
        messages: [{ role: "user", content: "hi" }],
        chat_template_kwargs: { thinking: false, enable_thinking: false },
      },
    });
    assert.equal(nativeOff.reasoning_effort, undefined);
    assert.deepEqual(nativeOff.chat_template_kwargs, {
      thinking: false,
      enable_thinking: false,
    });

    const mappedOff = await prepareUpstreamBody({
      ...options,
      translatedBody: {
        messages: [{ role: "user", content: "hi" }],
        reasoning_effort: "none",
      },
    });
    const repeated = await prepareUpstreamBody({ ...options, translatedBody: mappedOff });
    assert.equal(repeated.reasoning_effort, undefined);
    assert.deepEqual(repeated, mappedOff);
  } finally {
    if (prior) MODEL_SPECS[model] = prior;
    else delete MODEL_SPECS[model];
  }
});

test("chat-template reasoning control removes every none carrier and preserves native overrides", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: {
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "none",
      reasoning: { effort: "none", summary: "auto" },
      output_config: { effort: "none", format: "text" },
      chat_template_kwargs: { enable_thinking: true, custom_flag: "kept" },
    },
    modelToCall: "any-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: templateControlCredentials,
  });

  assert.equal(out.reasoning_effort, undefined);
  assert.deepEqual(out.reasoning, { summary: "auto" });
  assert.deepEqual(out.output_config, { format: "text" });
  assert.deepEqual(out.chat_template_kwargs, {
    thinking: false,
    enable_thinking: true,
    custom_flag: "kept",
  });
});

test("forced reasoning rules override conflicting native chat-template switches", async () => {
  const forcedNoneCredentials = withReasoningRuleContext(templateControlCredentials, {
    id: "force-none",
    effortMode: "force",
    targetEffort: "none",
  });
  const forcedNone = await prepareUpstreamBody({
    translatedBody: {
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "none",
      chat_template_kwargs: { thinking: true, enable_thinking: true, custom_flag: 1 },
    },
    modelToCall: "forced-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: forcedNoneCredentials,
  });
  assert.equal(forcedNone.reasoning_effort, undefined);
  assert.deepEqual(forcedNone.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
    custom_flag: 1,
  });

  const forcedHighCredentials = withReasoningRuleContext(templateControlCredentials, {
    id: "force-high",
    effortMode: "force",
    targetEffort: "high",
  });
  const forcedHigh = await prepareUpstreamBody({
    translatedBody: {
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "high",
      chat_template_kwargs: { thinking: false, enable_thinking: false, custom_flag: 2 },
    },
    modelToCall: "forced-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: forcedHighCredentials,
  });
  assert.equal(forcedHigh.reasoning_effort, "high");
  assert.deepEqual(forcedHigh.chat_template_kwargs, {
    thinking: true,
    enable_thinking: true,
    custom_flag: 2,
  });

  const forcedMalformed = await prepareUpstreamBody({
    translatedBody: {
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "none",
      chat_template_kwargs: "invalid",
    },
    modelToCall: "forced-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: forcedNoneCredentials,
  });
  assert.equal(forcedMalformed.reasoning_effort, undefined);
  assert.deepEqual(forcedMalformed.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
  });
});

test("chat-template reasoning control rejects malformed native kwargs for an explicit opt-out", async () => {
  await assert.rejects(
    prepareUpstreamBody({
      translatedBody: {
        messages: [{ role: "user", content: "hi" }],
        reasoning_effort: "none",
        chat_template_kwargs: "invalid",
      },
      modelToCall: "malformed-model",
      provider: templateControlProvider,
      targetFormat: FORMATS.OPENAI,
      credentials: templateControlCredentials,
    }),
    (error: Error & { statusCode?: number; errorType?: string }) => {
      assert.equal(error.statusCode, 400);
      assert.equal(error.errorType, "reasoning_control_invalid_template_kwargs");
      assert.match(error.message, /chat_template_kwargs.*object/i);
      return true;
    }
  );
});

test("chat-template reasoning control fails when a target filter removes every native off switch", async () => {
  setParamFilterConfig(templateControlProvider, {
    block: ["chat_template_kwargs"],
    allow: [],
    autoLearn: false,
  });
  try {
    await assert.rejects(
      prepareUpstreamBody({
        translatedBody: {
          messages: [{ role: "user", content: "hi" }],
          reasoning_effort: "none",
        },
        modelToCall: "filtered-model",
        provider: templateControlProvider,
        targetFormat: FORMATS.OPENAI,
        credentials: templateControlCredentials,
      }),
      (error: Error & { statusCode?: number; errorType?: string }) => {
        assert.equal(error.statusCode, 400);
        assert.equal(error.errorType, "reasoning_control_configuration_conflict");
        assert.match(error.message, /reasoningControl.*chat-template.*removed/i);
        return true;
      }
    );
  } finally {
    deleteParamFilterConfig(templateControlProvider);
  }
});

for (const scenario of [
  {
    name: "default compatible mode",
    provider: templateControlProvider,
    credentials: null,
    body: { messages: [], reasoning_effort: "none" },
  },
  {
    name: "strict OpenAI provider",
    provider: "openai",
    credentials: templateControlCredentials,
    body: { messages: [], reasoning_effort: "none" },
  },
  {
    name: "Responses body",
    provider: "openai-compatible-responses-template-control",
    credentials: templateControlCredentials,
    body: { input: [], reasoning: { effort: "none" } },
  },
  {
    name: "positive effort",
    provider: templateControlProvider,
    credentials: templateControlCredentials,
    body: { messages: [], reasoning_effort: "low" },
  },
  {
    name: "absent effort",
    provider: templateControlProvider,
    credentials: templateControlCredentials,
    body: { messages: [] },
  },
] as const) {
  test(`chat-template reasoning control leaves ${scenario.name} unchanged`, async () => {
    const out = await prepareUpstreamBody({
      translatedBody: scenario.body,
      modelToCall: "unchanged-model",
      provider: scenario.provider,
      targetFormat: scenario.name === "Responses body" ? FORMATS.OPENAI_RESPONSES : FORMATS.OPENAI,
      credentials: scenario.credentials,
    });
    assert.deepEqual(out, { ...scenario.body, model: "unchanged-model" });
  });
}

test("Claude disabled thinking reaches chat-template dispatch as native off switches", async () => {
  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "arbitrary-local-model",
    {
      model: "arbitrary-local-model",
      messages: [{ role: "user", content: "classify" }],
      thinking: { type: "disabled" },
    },
    false,
    null,
    templateControlProvider
  );
  assert.equal(translated.reasoning_effort, "none");

  const outbound = await prepareUpstreamBody({
    translatedBody: translated,
    modelToCall: "arbitrary-local-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: templateControlCredentials,
  });
  assert.equal(outbound.reasoning_effort, undefined);
  assert.deepEqual(outbound.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
  });
});

test("reasoning.enabled false crosses shared OpenAI and Claude translation as explicit none", () => {
  const source = {
    model: "arbitrary-local-model",
    messages: [{ role: "user", content: "classify" }],
    reasoning: { enabled: false, summary: "auto" },
  };
  const before = structuredClone(source);
  const openai = translateReasoning(FORMATS.OPENAI, FORMATS.OPENAI, source);
  assert.equal(openai.reasoning_effort, "none");
  assert.deepEqual(openai.reasoning, { summary: "auto", effort: "none" });
  assert.deepEqual(source, before);
  assert.deepEqual(
    translateReasoning(FORMATS.OPENAI, FORMATS.OPENAI, structuredClone(openai)),
    openai
  );

  const responses = translateReasoning(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    structuredClone(source)
  );
  assert.deepEqual(responses.reasoning, { summary: "auto", effort: "none" });

  const claude = translateReasoning(FORMATS.CLAUDE, FORMATS.OPENAI, structuredClone(source));
  assert.equal(claude.reasoning_effort, "none");

  const claudeOverride = translateReasoning(FORMATS.CLAUDE, FORMATS.OPENAI, {
    ...structuredClone(source),
    output_config: { effort: "high" },
  });
  assert.equal(claudeOverride.reasoning_effort, "high");

  const thinkingOverride = translateReasoning(FORMATS.CLAUDE, FORMATS.OPENAI, {
    ...structuredClone(source),
    thinking: { type: "enabled", budget_tokens: 2048 },
  });
  assert.equal(thinkingOverride.reasoning_effort, "medium");

  const forced = translateReasoning(FORMATS.OPENAI, FORMATS.OPENAI, {
    ...structuredClone(source),
    _omnirouteReasoningRule: {
      id: "force-high",
      effortMode: "force",
      targetEffort: "high",
      budgetAction: "preserve",
    },
  });
  assert.equal(forced.reasoning_effort, "high");
  assert.deepEqual(forced.reasoning, { summary: "auto", effort: "high" });
});

test("reasoning.enabled false reaches chat-template dispatch as native off switches", async () => {
  const translated = translateReasoning(FORMATS.OPENAI, FORMATS.OPENAI, {
    messages: [{ role: "user", content: "classify" }],
    reasoning: { enabled: false },
  });
  const outbound = await prepareUpstreamBody({
    translatedBody: translated,
    modelToCall: "arbitrary-local-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: templateControlCredentials,
  });

  assert.equal(outbound.reasoning_effort, undefined);
  assert.equal(outbound.reasoning, undefined);
  assert.deepEqual(outbound.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
  });

  const nativeOverride = await prepareUpstreamBody({
    translatedBody: translateReasoning(FORMATS.OPENAI, FORMATS.OPENAI, {
      messages: [{ role: "user", content: "classify" }],
      reasoning: { enabled: false },
      chat_template_kwargs: { enable_thinking: true, custom_flag: "kept" },
    }),
    modelToCall: "arbitrary-local-model",
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: templateControlCredentials,
  });
  assert.equal(nativeOverride.reasoning_effort, undefined);
  assert.equal(nativeOverride.reasoning, undefined);
  assert.deepEqual(nativeOverride.chat_template_kwargs, {
    enable_thinking: true,
    custom_flag: "kept",
  });
});

test("output-style injection preserves Claude disabled thinking through dispatch", async () => {
  const targetModel = "wrapped-disabled-model";
  const styled = applyOutputStyles(
    {
      messages: [{ role: "user", content: "Reply with the requested marker." }],
      thinking: { type: "disabled" },
      max_tokens: 64,
    },
    [{ id: "terse-prose", level: "full" }],
    "en",
    { autoClarity: false }
  );
  assert.equal(styled.applied, true);
  assert.equal(styled.body.messages?.at(-1)?.role, "system");

  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    targetModel,
    styled.body,
    false,
    null,
    templateControlProvider
  );
  assert.equal(translated.reasoning_effort, "none");

  const providerSpecificData: Record<string, unknown> = {
    baseUrl: "https://engine.example.test/v1",
    apiType: "chat",
  };
  providerSpecificData.detectedReasoningControl = {
    mode: "chat-template",
    modelBackends: { [targetModel]: "vllm" },
    source: "models.data.effective_owned_by",
    detectorVersion: 2,
    observedAt: "2026-10-05T00:00:00.000Z",
    endpointFingerprint: getReasoningControlEndpointFingerprint(providerSpecificData),
  };
  const outbound = await prepareUpstreamBody({
    translatedBody: translated,
    modelToCall: targetModel,
    provider: templateControlProvider,
    targetFormat: FORMATS.OPENAI,
    credentials: { providerSpecificData },
  });
  assert.equal(outbound.reasoning_effort, undefined);
  assert.deepEqual(outbound.chat_template_kwargs, {
    thinking: false,
    enable_thinking: false,
  });
});
