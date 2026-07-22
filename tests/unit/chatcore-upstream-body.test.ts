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

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
});

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

test("Codex Responses routing keeps reasoning effort while dropping GPT-only verbosity", async () => {
  // Simulates a combo/fallback reroute: the request is first translated while still
  // addressed at Codex (an allowlisted OpenAI-param destination, #7533), which is why
  // `text.verbosity` survives the Responses->Chat hop as top-level `verbosity`. Routing
  // then resolves the actual upstream target to opencode-go/GLM (a fallback target),
  // so `prepareUpstreamBody`'s final sanitizeRequestForResolvedTarget (#7050/#7533) must
  // strip the GPT-only `verbosity` for that concrete target while keeping
  // `reasoning_effort`, which is not gated by destination provider.
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

  assert.equal(outbound.reasoning_effort, "low");
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
  assert.equal(out.tools.length, 150);
});

test("never injects prompt_cache_key for an excluded provider (codex)", async () => {
  const out = await prepareUpstreamBody({
    translatedBody: { model: "gpt-5-codex", messages: [{ role: "user", content: "hi" }] },
    modelToCall: "gpt-5-codex",
    provider: "codex",
    targetFormat: "openai",
    credentials: null,
  });
  assert.equal(out.prompt_cache_key, undefined);
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
