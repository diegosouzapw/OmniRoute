import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../../open-sse/executors/default.ts";

// Issue #10119 (closing gap): DefaultExecutor.buildHeaders() merges the client-negotiated
// anthropic-beta header (see the `if (clientHeaders)` block in open-sse/executors/default.ts)
// but, before this fix, never threaded the RESOLVED target model into
// mergeClientAnthropicBeta(). That left the context-1m-2025-08-07 eligibility gate blind at
// the executor level: a combo/fallback re-route to an ineligible model (e.g. claude-haiku-4-5)
// could still receive the beta the client negotiated for a more capable sibling, producing
// Anthropic's "long context beta is not yet available for this subscription" 400. buildHeaders
// now accepts an optional 4th `model` parameter (mirroring BaseExecutor.buildHeaders' existing
// signature and the pattern already used by grok-cli.ts/qoder.ts) and forwards it into
// mergeClientAnthropicBeta so the gate can actually see the resolved model.

const CONTEXT_1M = "context-1m-2025-08-07";

function buildHeadersFor(model: string) {
  const executor = new DefaultExecutor("claude");
  return executor.buildHeaders(
    { apiKey: "sk-ant-test" },
    true,
    { "anthropic-beta": CONTEXT_1M },
    model
  );
}

function betaValue(headers: Record<string, string>): string | undefined {
  const key = Object.keys(headers).find((k) => k.toLowerCase() === "anthropic-beta");
  return key ? headers[key] : undefined;
}

test("DefaultExecutor.buildHeaders omits context-1m beta for an ineligible Haiku target", () => {
  const headers = buildHeadersFor("claude-haiku-4-5-20251001");
  const beta = betaValue(headers);
  assert.ok(beta, "anthropic-beta header must still be present");
  assert.ok(
    !beta!.split(",").includes(CONTEXT_1M),
    "context-1m must not be forwarded to a Haiku target"
  );
});

test("DefaultExecutor.buildHeaders retains context-1m beta for an eligible model target", () => {
  const headers = buildHeadersFor("claude-sonnet-5");
  const beta = betaValue(headers);
  assert.ok(beta, "anthropic-beta header must be present");
  assert.ok(
    beta!.split(",").includes(CONTEXT_1M),
    "context-1m must be forwarded to an eligible (context-1m-capable) target"
  );
});
