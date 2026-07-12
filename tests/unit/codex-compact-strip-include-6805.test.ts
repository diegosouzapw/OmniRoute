import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";

// #6805: compact Codex requests must not forward `include` (e.g.
// "reasoning.encrypted_content") — the compact endpoint rejects it. Kept in a
// standalone file so the frozen executor-codex.test.ts does not grow past its cap.
test("CodexExecutor.transformRequest strips include from compact requests (#6805)", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.3-codex",
    {
      _nativeCodexPassthrough: true,
      include: ["reasoning.encrypted_content"],
      instructions: "keep this",
      stream: false,
    },
    false,
    {
      requestEndpointPath: "/responses/compact",
      providerSpecificData: { requestDefaults: { serviceTier: "priority" } },
    }
  );
  assert.equal(result.include, undefined);
  assert.equal(result._nativeCodexPassthrough, undefined);
  assert.equal(result.instructions, "keep this");
});
