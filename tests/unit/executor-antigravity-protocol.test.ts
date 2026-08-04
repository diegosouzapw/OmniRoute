import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

test("AntigravityExecutor.transformRequest preserves prompt text byte-for-byte", async () => {
  const executor = new AntigravityExecutor();
  const text = "OmniRoute, OpenCode, Cursor — keep this exact text 👩🏽‍💻";
  const body = {
    request: {
      contents: [{ role: "user", parts: [{ text }] }],
    },
  };

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const transformedText = (result.request.contents as Array<{ parts: Array<{ text?: string }> }>)[0]
    .parts[0].text;
  assert.equal(transformedText, text);
  assert.deepEqual(Buffer.from(transformedText ?? ""), Buffer.from(text));
  assert.equal(transformedText?.includes("‍"), text.includes("‍"));
});
