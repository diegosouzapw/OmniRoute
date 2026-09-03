// The Antigravity output ceiling comes from the model, not from one constant.
//
// The published models do not agree on a limit: most declare 65535 or 65536,
// gpt-oss-120b-medium declares 32768. A single global ceiling has to be wrong
// for one group or the other -- 16384 starved every model, and raising it to
// 65535 would have let an oversized request reach gpt-oss-120b-medium.
//
// MAX_ANTIGRAVITY_OUTPUT_TOKENS survives as the fallback for an id the
// catalogue has never seen, which is the case decolua/9router#779 described.

import test from "node:test";
import assert from "node:assert/strict";

import {
  AntigravityExecutor,
  MAX_ANTIGRAVITY_OUTPUT_TOKENS,
  __test_applyAntigravityGenerationDefaults as applyAntigravityGenerationDefaults,
} from "../../../open-sse/executors/antigravity.ts";
import {
  ANTIGRAVITY_MODEL_ALIASES,
  ANTIGRAVITY_PUBLIC_MODELS,
} from "../../../open-sse/config/antigravityModelAliases.ts";

function generationConfigOf(request: unknown): Record<string, unknown> {
  const gc = (request as Record<string, unknown>)?.generationConfig;
  assert.ok(gc && typeof gc === "object", "expected a generationConfig object on the request");
  return gc as Record<string, unknown>;
}

function clampFor(modelId: string | null | undefined, requested: number): number {
  const request: Record<string, unknown> = {
    generationConfig: { maxOutputTokens: requested },
  };
  applyAntigravityGenerationDefaults(request, modelId);
  return (request.generationConfig as Record<string, unknown>).maxOutputTokens as number;
}

test("each published model is clamped to the limit it declares, not to a shared constant", () => {
  const seen = new Set<number>();

  for (const model of ANTIGRAVITY_PUBLIC_MODELS) {
    const declared = model.maxOutputTokens;
    assert.equal(
      typeof declared,
      "number",
      `${model.id} declares no maxOutputTokens; the fallback would silently take over`
    );
    seen.add(declared as number);

    // A request far above any published limit comes back at this model's own.
    assert.equal(
      clampFor(model.id, 1_000_000),
      declared,
      `${model.id} should clamp to its declared ${declared}`
    );

    // One token under the limit is not the cap's business.
    assert.equal(clampFor(model.id, (declared as number) - 1), (declared as number) - 1);

    // Exactly at the limit is not clamped either.
    assert.equal(clampFor(model.id, declared as number), declared);
  }

  // If every model agreed on one number, this test would pass even with the
  // old global constant and would prove nothing.
  assert.ok(
    seen.size > 1,
    `expected the catalogue to declare more than one distinct limit, saw ${[...seen].join(", ")}`
  );
});

test("gpt-oss-120b-medium keeps its lower 32768 ceiling", () => {
  // The specific regression a global raise to 65535 would have introduced.
  assert.equal(clampFor("gpt-oss-120b-medium", 65535), 32768);
});

test("gemini-pro-agent reaches 65535 rather than the old 16384", () => {
  assert.equal(clampFor("gemini-pro-agent", 65535), 65535);
});

test("an unknown model id falls back to the conservative ceiling", () => {
  assert.equal(clampFor("no-such-model-xyz", 65535), MAX_ANTIGRAVITY_OUTPUT_TOKENS);
});

test("retired Antigravity Flash ids cannot inherit provider-neutral output caps", () => {
  for (const modelId of [
    "gemini-3.6-flash-low",
    "gemini-3.6-flash-medium",
    "gemini-3.6-flash-high",
    "gemini-3.5-flash-extra-low",
    "gemini-3.5-flash-low",
    "gemini-3.5-flash-medium",
    "gemini-3.5-flash-high",
    "gemini-3-flash-agent",
  ]) {
    assert.equal(clampFor(modelId, 65536), MAX_ANTIGRAVITY_OUTPUT_TOKENS, modelId);
  }
});

test("a missing or empty model id falls back too", () => {
  assert.equal(clampFor(undefined, 65535), MAX_ANTIGRAVITY_OUTPUT_TOKENS);
  assert.equal(clampFor(null, 65535), MAX_ANTIGRAVITY_OUTPUT_TOKENS);
  assert.equal(clampFor("   ", 65535), MAX_ANTIGRAVITY_OUTPUT_TOKENS);
});

test("the thinkingBudget bump is still clamped by the per-model ceiling", () => {
  // The bump sets floor(budget)+1; on the 32768 model that overshoots.
  const request: Record<string, unknown> = {
    generationConfig: {
      maxOutputTokens: 1000,
      thinkingConfig: { thinkingBudget: 60000 },
    },
  };
  applyAntigravityGenerationDefaults(request, "gpt-oss-120b-medium");
  assert.equal((request.generationConfig as Record<string, unknown>).maxOutputTokens, 32768);
});

test("a thinkingBudget bump under the ceiling is left alone", () => {
  // The counterpart to the test above: without this one, a cap that clamped
  // everything down to its own value would still pass, because every
  // assertion in sight would be looking at a clamped number.
  const request: Record<string, unknown> = {
    generationConfig: {
      maxOutputTokens: 1000,
      thinkingConfig: { thinkingBudget: 4000 },
    },
  };
  applyAntigravityGenerationDefaults(request, "gpt-oss-120b-medium");
  assert.equal((request.generationConfig as Record<string, unknown>).maxOutputTokens, 4001);
});

test("no maxOutputTokens requested means none is invented", () => {
  const request: Record<string, unknown> = {};
  applyAntigravityGenerationDefaults(request, "gemini-pro-agent");
  assert.equal((request.generationConfig as Record<string, unknown>).maxOutputTokens, undefined);
});

// The tests above call the defaults helper directly and hand it a model id, so
// they all keep passing if the executor stops passing one. These go through
// transformRequest instead, which is the only path that proves the wiring.

test("the executor passes the resolved model through to the cap", async () => {
  const executor = new AntigravityExecutor();

  const result = await executor.transformRequest(
    "antigravity/gemini-pro-agent",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
        generationConfig: { maxOutputTokens: 1_000_000 },
      },
    },
    true,
    { projectId: "project-1" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  // 65535 is this model's declared limit. Reaching MAX_ANTIGRAVITY_OUTPUT_TOKENS
  // here would mean the call site dropped the model argument.
  assert.equal(generationConfigOf(result.request).maxOutputTokens, 65535);
});

test("an aliased id is capped by the model it resolves to", async () => {
  // The two tests around this one use ids that are their own upstream name, so
  // they would pass even if the cap were looked up under the client-facing id.
  // These aliases resolve to a different id, which is the case that separates
  // the two. Image aliases are excluded: they are not user-callable on the chat
  // path (isUserCallableAntigravityModelId is false for them) and never reach
  // the generation defaults.
  const catalogue = new Map(ANTIGRAVITY_PUBLIC_MODELS.map((m) => [m.id, m.maxOutputTokens]));
  const renaming = Object.entries(ANTIGRAVITY_MODEL_ALIASES).filter(
    ([from, to]) => from !== to && catalogue.has(to as string)
  );
  assert.ok(renaming.length > 0, "expected at least one alias that renames to a catalogue model");

  for (const [clientId, upstreamId] of renaming) {
    const expected = catalogue.get(upstreamId as string);
    const executor = new AntigravityExecutor();
    const result = await executor.transformRequest(
      `antigravity/${clientId}`,
      {
        request: {
          contents: [{ role: "user", parts: [{ text: "Hello" }] }],
          generationConfig: { maxOutputTokens: 1_000_000 },
        },
      },
      true,
      { projectId: "project-1" }
    );
    if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
    assert.equal(
      generationConfigOf(result.request).maxOutputTokens,
      expected,
      `${clientId} resolves to ${upstreamId}, so it should cap at that model's ${expected}, ` +
        `not at the ${MAX_ANTIGRAVITY_OUTPUT_TOKENS} fallback`
    );
  }
});

test("the executor's cap differs per model on the same code path", async () => {
  const executor = new AntigravityExecutor();

  const result = await executor.transformRequest(
    "antigravity/gpt-oss-120b-medium",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
        generationConfig: { maxOutputTokens: 1_000_000 },
      },
    },
    true,
    { projectId: "project-1" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(generationConfigOf(result.request).maxOutputTokens, 32768);
});

// A routed request carries a provider prefix (`agy/...`, `antigravity/...`),
// and cleanModelName strips it before the ceiling is resolved. Nothing states
// that coupling in either function, so a change to the stripping would silently
// route every prefixed request to the fallback. Handing the prefixed id
// straight to the capability lookup returns null, which is what that failure
// would look like.
test("a provider-prefixed model id resolves to the model's ceiling, not the fallback", async () => {
  const cases: Array<[string, number]> = [
    ["agy/gemini-3.1-pro-high", 65535],
    ["antigravity/gemini-3.1-pro-high", 65535],
    ["agy/gemini-3.7-flash-high", 65536],
    ["agy/gpt-oss-120b-medium", 32768],
  ];

  for (const [modelId, expected] of cases) {
    const executor = new AntigravityExecutor();
    const result = await executor.transformRequest(
      modelId,
      {
        request: {
          contents: [{ role: "user", parts: [{ text: "Hello" }] }],
          generationConfig: { maxOutputTokens: 1_000_000 },
        },
      },
      true,
      { projectId: "project-1" }
    );

    if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
    assert.equal(
      generationConfigOf(result.request).maxOutputTokens,
      expected,
      `${modelId} must cap at ${expected}, not at the ${MAX_ANTIGRAVITY_OUTPUT_TOKENS} fallback`
    );
  }
});
