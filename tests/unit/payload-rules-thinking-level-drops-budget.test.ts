// Regression tests: a payload rule that writes a Gemini 3.x string
// thinkingLevel must drop the deprecated numeric thinkingBudget from the same
// generationConfig.thinkingConfig, so the upstream receives only the native
// field. Mirrors the custom-model scenario where translateRequest injects a
// default budget (from MODEL_SPECS) and the operator override then targets
// generationConfig.thinkingConfig.thinkingLevel.

import { test } from "node:test";
import assert from "node:assert/strict";

import { applyPayloadRules } from "../../open-sse/services/payloadRules.ts";

const MODEL = "gemini-3.7-flash-high";

const BODY = {
  model: "gemini-3.7-flash",
  messages: [{ role: "user", content: "hi" }],
  generationConfig: {
    maxOutputTokens: 16384,
    // Injected by translateRequest's default thinking path.
    thinkingConfig: { thinkingBudget: 24576, includeThoughts: true },
  },
};

test("override rule writing thinkingLevel drops the deprecated thinkingBudget", () => {
  const { payload } = applyPayloadRules(
    structuredClone(BODY),
    MODEL,
    ["gemini", "openai"],
    {
      default: [],
      defaultRaw: [],
      filter: [],
      override: [
        {
          models: [{ name: "*gemini-3.7-flash-high*" }],
          params: { "generationConfig.thinkingConfig.thinkingLevel": "high" },
        },
      ],
    }
  );

  const tc = (payload.generationConfig as Record<string, unknown>).thinkingConfig as Record<
    string,
    unknown
  >;
  assert.equal(tc.thinkingLevel, "high", "level must be written");
  assert.equal(
    "thinkingBudget" in tc,
    false,
    "deprecated numeric thinkingBudget must be dropped"
  );
  assert.equal(tc.includeThoughts, true, "includeThoughts must survive");
});

test("non-thinking rule paths leave thinkingBudget untouched", () => {
  const body = structuredClone(BODY);
  const { payload } = applyPayloadRules(body, MODEL, ["gemini"], {
    default: [],
    defaultRaw: [],
    filter: [],
    override: [
      {
        models: [{ name: MODEL }],
        params: { temperature: 0.4 },
      },
    ],
  });

  const tc = (payload.generationConfig as Record<string, unknown>).thinkingConfig as Record<
    string,
    unknown
  >;
  assert.equal(tc.thinkingBudget, 24576, "unrelated rules must not strip the budget");
});

test("default rules writing thinkingLevel also drop the budget", () => {
  const body = structuredClone(BODY);
  delete (body.generationConfig as Record<string, unknown>).thinkingConfig;

  const withDefault = applyPayloadRules(body, MODEL, ["gemini"], {
    default: [
      {
        models: [{ name: MODEL }],
        params: { "generationConfig.thinkingConfig.thinkingLevel": "medium" },
      },
    ],
    defaultRaw: [],
    filter: [],
    override: [],
  });

  const tc = (withDefault.payload.generationConfig as Record<string, unknown>).thinkingConfig as
    | Record<string, unknown>
    | undefined;
  assert.equal(tc?.thinkingLevel, "medium");
  assert.equal("thinkingBudget" in (tc ?? {}), false);
});

// Guard against over-eager stripping: only an explicit STRING thinking level
// may drop the numeric budget. An operator who writes the budget directly is
// stating exactly what belongs on the wire and must not be silently undone.
test("a rule that explicitly writes thinkingBudget keeps it (no self-erase)", () => {
  const body = structuredClone(BODY);
  (body.generationConfig as Record<string, unknown>).thinkingConfig = { includeThoughts: true };

  const { payload } = applyPayloadRules(body, MODEL, ["gemini"], {
    default: [],
    defaultRaw: [],
    filter: [],
    override: [
      {
        models: [{ name: MODEL }],
        params: { "generationConfig.thinkingConfig.thinkingBudget": 8192 },
      },
    ],
  });

  const tc = (payload.generationConfig as Record<string, unknown>).thinkingConfig as Record<
    string,
    unknown
  >;
  assert.equal(tc.thinkingBudget, 8192, "explicitly-written budget must survive");
});

// A null level (the "disable thinking" override pattern) is not a level and
// must not strip a budget the operator kept intentionally.
test("null thinkingLevel does not drop the budget", () => {
  const { payload } = applyPayloadRules(structuredClone(BODY), MODEL, ["gemini"], {
    default: [],
    defaultRaw: [],
    filter: [],
    override: [
      {
        models: [{ name: MODEL }],
        params: { "generationConfig.thinkingConfig.thinkingLevel": null },
      },
    ],
  });

  const tc = (payload.generationConfig as Record<string, unknown>).thinkingConfig as Record<
    string,
    unknown
  >;
  assert.equal(tc.thinkingBudget, 24576, "null level is not a level write");
});
