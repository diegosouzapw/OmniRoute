import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

// Regression for #1944: Claude models served via Antigravity (Google Cloud Code) started
// returning `400 Invalid JSON payload received. Unknown name "output_config"` (path "/").
// `output_config` is an Anthropic/Claude-Code-only field; Google's Cloud Code envelope
// rejects unknown top-level fields. The Antigravity envelope spreads `...passthroughFields`
// (every top-level body field except a known few), so a top-level `output_config` (or the
// legacy `output_format`) leaked straight into the envelope Google validates.

test("transformRequest drops a top-level output_config from the Antigravity envelope (#1944)", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    output_config: { effort: "high", format: { type: "json_schema" } },
    output_format: "json",
    request: {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: {},
    },
  };

  const result = await executor.transformRequest("antigravity/claude-sonnet-4-6", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(
    (result as Record<string, unknown>).output_config,
    undefined,
    "output_config must not reach the Google Cloud Code envelope"
  );
  assert.equal(
    (result as Record<string, unknown>).output_format,
    undefined,
    "legacy output_format must not reach the envelope either"
  );
  // The sanitized inner request (Claude path) must also be free of output_config.
  assert.equal(
    (result.request as Record<string, unknown>).output_config,
    undefined,
    "output_config must not survive in the inner Gemini request"
  );
});
