// #6914 (revised by #8098 protocol fidelity): the real Antigravity client does NOT
// synthesize an `includeServerSideToolInvocations` flag on toolConfig, so OmniRoute must
// not either — sending a flag the native client never sends breaks protocol fidelity.
// When tools are present the request still carries `functionCallingConfig.mode = "VALIDATED"`
// (and NO synthetic server-side flag); when no tools are present toolConfig stays absent.
// Server-side tool-call cloaking is covered separately by
// antigravity-tool-cloak-server-side-invocations.test.ts. Lives in its own file (not
// executor-antigravity.test.ts) because that suite is frozen at the test-file-size cap.
import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

test("AntigravityExecutor.transformRequest sets VALIDATED mode without a synthetic server-side flag when tools are present", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      tools: [{ functionDeclarations: [{ name: "search" }] }],
    },
  };

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.deepEqual(result.request.toolConfig, {
    functionCallingConfig: { mode: "VALIDATED" },
  });
});

test("AntigravityExecutor.transformRequest does not include a toolConfig when no tools", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
    },
  };

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.request.toolConfig, undefined);
});
