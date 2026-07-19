// #6914: server-side tool invocations must be requested from Antigravity whenever the
// caller sends tools, and must NOT be forced when the request carries none. Lives in
// its own file (not executor-antigravity.test.ts) because that suite is frozen at the
// test-file-size cap.
import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

test("AntigravityExecutor.transformRequest includes includeServerSideToolInvocations when tools are present", async () => {
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
    functionCallingConfig: { mode: "VALIDATED", includeServerSideToolInvocations: true },
  });
});

test("AntigravityExecutor.transformRequest does not include includeServerSideToolInvocations when no tools", async () => {
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
