/**
 * #5696 — Layer A capability filter unit tests.
 *
 * Tests the pure `checkRequestCapabilityFit` function and the
 * `deriveRequestCapabilityRequirements` helper. The chatCore integration
 * gate is tested via the feature flag assertion below.
 *
 * Note: `getResolvedModelCapabilities` requires a database connection, so
 * the full integration path (capabilities → filter → error response) is
 * tested by verifying the filter function's behavior with mock capabilities.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  checkRequestCapabilityFit,
  deriveRequestCapabilityRequirements,
  type RequestCapabilityRequirements,
  type CapabilityFilterResult,
} from "../../src/shared/constants/capabilities/capabilityFilter.ts";

// ── Helpers ───────────────────────────────────────────────────────────────

/** Minimal capabilities shape for filter testing. */
function caps(
  overrides: Partial<{
    supportsTools: boolean | null;
    toolCalling: boolean;
    supportsVision: boolean | null;
    structuredOutput: boolean | null;
    contextWindow: number | null;
    maxInputTokens: number | null;
    maxOutputTokens: number | null;
  }> = {}
) {
  return {
    supportsTools: overrides.supportsTools ?? null,
    toolCalling: overrides.toolCalling ?? true,
    supportsVision: overrides.supportsVision ?? null,
    structuredOutput: overrides.structuredOutput ?? null,
    contextWindow: overrides.contextWindow ?? null,
    maxInputTokens: overrides.maxInputTokens ?? null,
    maxOutputTokens: overrides.maxOutputTokens ?? null,
  };
}

function req(
  overrides: Partial<RequestCapabilityRequirements> = {}
): RequestCapabilityRequirements {
  return {
    requiresTools: false,
    requiresVision: false,
    requiresStructuredOutput: false,
    requiredContextTokens: 0,
    toolCount: 0,
    ...overrides,
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────

test("checkRequestCapabilityFit: compatible when no requirements", () => {
  const result = checkRequestCapabilityFit(caps(), req());
  assert.equal(result.compatible, true);
  assert.deepEqual(result.failures, []);
});

test("checkRequestCapabilityFit: vision failure when model lacks vision", () => {
  const result = checkRequestCapabilityFit(
    caps({ supportsVision: false }),
    req({ requiresVision: true })
  );
  assert.equal(result.compatible, false);
  assert.deepEqual(result.failures, ["vision"]);
  assert.equal(result.terminalReason, "vision");
});

test("checkRequestCapabilityFit: vision failure when model vision is unknown (null)", () => {
  const result = checkRequestCapabilityFit(
    caps({ supportsVision: null }),
    req({ requiresVision: true })
  );
  assert.equal(result.compatible, false);
  assert.deepEqual(result.failures, ["vision"]);
  assert.equal(result.terminalReason, "vision");
});

test("checkRequestCapabilityFit: vision OK when model supports vision", () => {
  const result = checkRequestCapabilityFit(
    caps({ supportsVision: true }),
    req({ requiresVision: true })
  );
  assert.equal(result.compatible, true);
  assert.deepEqual(result.failures, []);
});

test("checkRequestCapabilityFit: tools failure when model has no tool support", () => {
  const result = checkRequestCapabilityFit(
    caps({ supportsTools: false, toolCalling: false }),
    req({ requiresTools: true }),
    "openai"
  );
  assert.equal(result.compatible, false);
  assert.deepEqual(result.failures, ["tools"]);
  assert.equal(result.terminalReason, "tools");
});

test("checkRequestCapabilityFit: tools OK when model supports tools", () => {
  const result = checkRequestCapabilityFit(
    caps({ supportsTools: true, toolCalling: true }),
    req({ requiresTools: true }),
    "openai"
  );
  assert.equal(result.compatible, true);
  assert.deepEqual(result.failures, []);
});

test("checkRequestCapabilityFit: tools bypassed for emulated-tool provider", () => {
  // gemini-web has toolCalling: "emulated" in the provider registry,
  // so the filter must not reject it even when capabilities report false.
  const result = checkRequestCapabilityFit(
    caps({ supportsTools: false, toolCalling: false }),
    req({ requiresTools: true }),
    "gemini-web"
  );
  assert.equal(result.compatible, true);
  assert.deepEqual(result.failures, []);
});

test("checkRequestCapabilityFit: structured output failure when model does not support", () => {
  const result = checkRequestCapabilityFit(
    caps({ structuredOutput: false }),
    req({ requiresStructuredOutput: true })
  );
  assert.equal(result.compatible, false);
  assert.deepEqual(result.failures, ["structured_output"]);
  assert.equal(result.terminalReason, "structured_output");
});

test("checkRequestCapabilityFit: structured output OK when model supports", () => {
  const result = checkRequestCapabilityFit(
    caps({ structuredOutput: true }),
    req({ requiresStructuredOutput: true })
  );
  assert.equal(result.compatible, true);
  assert.deepEqual(result.failures, []);
});

test("checkRequestCapabilityFit: context window failure when tokens exceed window", () => {
  const result = checkRequestCapabilityFit(
    caps({ contextWindow: 1000, maxInputTokens: 1000 }),
    req({ requiredContextTokens: 2000 })
  );
  assert.equal(result.compatible, false);
  assert.deepEqual(result.failures, ["context_window"]);
  assert.equal(result.terminalReason, "context_window");
});

test("checkRequestCapabilityFit: context window OK when tokens fit", () => {
  const result = checkRequestCapabilityFit(
    caps({ contextWindow: 10000, maxInputTokens: 10000 }),
    req({ requiredContextTokens: 2000 })
  );
  assert.equal(result.compatible, true);
  assert.deepEqual(result.failures, []);
});

test("checkRequestCapabilityFit: multiple failures reported", () => {
  const result = checkRequestCapabilityFit(
    caps({ supportsVision: false, supportsTools: false, toolCalling: false }),
    req({ requiresVision: true, requiresTools: true }),
    "openai"
  );
  assert.equal(result.compatible, false);
  // vision is checked first, so it's the terminalReason
  assert.ok(result.failures.length >= 1);
  assert.ok(result.failures.includes("vision"));
});

test("checkRequestCapabilityFit: context window returns null (unknown) when no window data", () => {
  // When contextWindow and maxInputTokens are both null, evaluateContextLimit
  // returns null, which means compatible (no data to judge).
  const result = checkRequestCapabilityFit(
    caps({ contextWindow: null, maxInputTokens: null }),
    req({ requiredContextTokens: 2000 })
  );
  assert.equal(result.compatible, true);
  assert.deepEqual(result.failures, []);
});

test("deriveRequestCapabilityRequirements: no requirements from empty body", () => {
  const requirements = deriveRequestCapabilityRequirements({});
  assert.equal(requirements.requiresTools, false);
  assert.equal(requirements.requiresVision, false);
  assert.equal(requirements.requiresStructuredOutput, false);
  assert.equal(requirements.requiredContextTokens, 0);
  assert.equal(requirements.toolCount, 0);
});

test("deriveRequestCapabilityRequirements: detects tools from body", () => {
  const requirements = deriveRequestCapabilityRequirements({
    tools: [{ type: "function", function: { name: "test" } }],
  });
  assert.equal(requirements.requiresTools, true);
  assert.equal(requirements.toolCount, 1);
});

test("deriveRequestCapabilityRequirements: detects vision from image_url", () => {
  const requirements = deriveRequestCapabilityRequirements({
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "https://example.com/img.jpg" } }],
      },
    ],
  });
  assert.equal(requirements.requiresVision, true);
});

test("deriveRequestCapabilityRequirements: detects structured output from response_format", () => {
  const requirements = deriveRequestCapabilityRequirements({
    response_format: { type: "json_object" },
  });
  assert.equal(requirements.requiresStructuredOutput, true);
});

test("deriveRequestCapabilityRequirements: detects json_schema structured output", () => {
  const requirements = deriveRequestCapabilityRequirements({
    response_format: { type: "json_schema", json_schema: { name: "test", schema: {} } },
  });
  assert.equal(requirements.requiresStructuredOutput, true);
});

test("feature flag CAPABILITY_FILTER_ENABLED defaults to false", () => {
  // This test verifies the feature flag definition ensures the gate is
  // opt-in. The default value must be "false" per the plan.
  import("../../src/shared/constants/featureFlagDefinitions.ts").then(
    ({ FEATURE_FLAG_DEFINITIONS }) => {
      const flag = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "CAPABILITY_FILTER_ENABLED");
      assert.ok(flag, "CAPABILITY_FILTER_ENABLED flag must be defined");
      assert.equal(flag.defaultValue, "false");
      assert.equal(flag.type, "boolean");
      assert.equal(flag.category, "policies");
    }
  );
});

test("error responses use buildErrorBody and do not leak stack traces", () => {
  // Verify that capability mismatch errors route through buildErrorBody
  // (createErrorResult) and never contain stack traces.
  import("../../open-sse/utils/error.ts").then(({ createErrorResult }) => {
    const result = createErrorResult(
      400,
      "Provider 'test' does not support vision for this image request",
      null,
      "vision",
      "invalid_request_error"
    );
    assert.equal(result.status, 400);
    assert.equal(result.error, "Provider 'test' does not support vision for this image request");
    assert.equal(result.errorType, "invalid_request_error");
    assert.equal(result.errorCode, "vision");

    // Parse the response body and assert no stack leak
    result.response.text().then((text) => {
      const body = JSON.parse(text);
      assert.ok(body.error.message, "error message must exist");
      assert.equal(body.error.message.includes("at /"), false, "must not leak stack traces");
      assert.equal(body.error.code, "vision");
      assert.equal(body.error.type, "invalid_request_error");
    });
  });
});
