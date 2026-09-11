/**
 * #3229 — the internal upstream-failure classification must reach chatCore through the
 * non-streaming leg without ever widening the client-facing ChatCoreErrorResult, and a
 * locally generated failure must never carry one.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import {
  baseInput,
  makeExecutorResult,
  makeResponse,
} from "./_helpers/nonStreamingProviderLegFixtures.ts";

test("pipeline error hands off the diagnostic without widening ChatCoreErrorResult", async () => {
  const diagnostic = {
    httpStatus: 400,
    validationCategory: "tool_schema",
  };
  const input = baseInput({
    provider: "antigravity",
    executeProviderRequest: async () => {
      throw new Error("pipeline owns the first send");
    },
    runProviderExecution: async () => ({
      kind: "error",
      result: {
        success: false,
        status: 400,
        response: makeResponse({ error: { message: "Antigravity upstream error (400)" } }, 400),
        error: "Antigravity upstream error (400)",
      },
      providerUsage: null,
      upstreamDiagnostic: diagnostic,
      model: "gemini-pro-agent",
      connectionId: "agy-a",
    }),
  });

  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.deepEqual(result.upstreamDiagnostic, diagnostic);
  assert.equal(
    Object.prototype.hasOwnProperty.call(result.result, "upstreamDiagnostic"),
    false,
    "the client-facing ChatCoreErrorResult must not contain internal diagnostics"
  );
});

test("direct provider error carries its response diagnostic at the leg boundary", async () => {
  const diagnostic = {
    httpStatus: 400,
    validationCategory: "tool_pairing",
  };
  const input = baseInput({
    provider: "antigravity",
    executeProviderRequest: async () => ({
      ...makeExecutorResult({ error: { message: "Antigravity upstream error (400)" } }, 400),
      upstreamDiagnostic: diagnostic,
    }),
  });

  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.deepEqual(result.upstreamDiagnostic, diagnostic);
  assert.equal(Object.prototype.hasOwnProperty.call(result.result, "upstreamDiagnostic"), false);
});

test("locally generated network errors carry no upstream diagnostic", async () => {
  const input = baseInput({
    provider: "antigravity",
    executeProviderRequest: async () => {
      throw new TypeError("fetch failed");
    },
  });

  const result = await runNonStreamingProviderLeg(input);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.upstreamDiagnostic, undefined);
});
