// #7533 — Responses -> Chat translation leaked two GPT-5-only fields (`verbosity`,
// `prompt_cache_key`) into the translated Chat Completions body regardless of the
// destination provider. Any strict-protocol Chat Completions upstream that 400s on
// unrecognized top-level parameters (NVIDIA confirmed by the reporter) rejected 100% of
// requests routed through a `wire_api: responses` combo targeting that provider.
//
// Fix: gate both fields on `credentials.provider` being an OpenAI-family destination —
// unset/strip them otherwise. The OpenAI-destined path (needed for #517's prompt-caching
// fix) must stay byte-identical, which the sanity test below encodes as a hard regression
// guard.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>;
}

test("#7533: verbosity is stripped for a non-OpenAI upstream (NVIDIA)", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "z-ai/glm-5.2",
      {
        model: "z-ai/glm-5.2",
        input: [{ role: "user", content: "hello" }],
        text: { verbosity: "low" },
      },
      false,
      { provider: "nvidia" }
    )
  );

  assert.equal(
    out.verbosity,
    undefined,
    "verbosity is a GPT-5-only field and must be stripped for non-OpenAI upstreams"
  );
});

test("#7533: prompt_cache_key is stripped for a non-OpenAI upstream (NVIDIA)", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "z-ai/glm-5.2",
      {
        model: "z-ai/glm-5.2",
        input: [{ role: "user", content: "hello" }],
        prompt_cache_key: "abc-123",
      },
      false,
      { provider: "nvidia" }
    )
  );

  assert.equal(
    out.prompt_cache_key,
    undefined,
    "prompt_cache_key is a GPT-5-only field and must be stripped for non-OpenAI upstreams"
  );
});

test("#7533 sanity: both fields are still preserved for an actual OpenAI upstream (#517 regression guard)", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "gpt-5.5",
      {
        model: "gpt-5.5",
        input: [{ role: "user", content: "hello" }],
        text: { verbosity: "low" },
        prompt_cache_key: "abc-123",
      },
      false,
      { provider: "openai" }
    )
  );

  assert.equal(out.verbosity, "low");
  assert.equal(out.prompt_cache_key, "abc-123");
});

test("#7533: fields are also stripped when no credentials/provider is supplied at all", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "z-ai/glm-5.2",
      {
        model: "z-ai/glm-5.2",
        input: [{ role: "user", content: "hello" }],
        text: { verbosity: "high" },
        prompt_cache_key: "abc-123",
      },
      false,
      {}
    )
  );

  assert.equal(out.verbosity, undefined);
  assert.equal(out.prompt_cache_key, undefined);
});
