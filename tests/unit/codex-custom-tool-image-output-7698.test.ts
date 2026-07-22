import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";

test("Codex passthrough preserves image-view custom tool output input parts (#7698)", () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Inspect the image." }],
      },
      {
        type: "custom_tool_call_output",
        call_id: "call_view_image",
        output: [
          { type: "input_text", text: "Script completed\nOutput:\n" },
          { type: "input_image", image_url: "data:image/png;base64,AA==" },
        ],
      },
    ],
    stream: false,
  };

  const result = executor.transformRequest("gpt-5.6", body, false, {
    requestEndpointPath: "/responses",
  });
  const toolOutput = result.input.find((item) => item.type === "custom_tool_call_output");

  assert.deepEqual(toolOutput, body.input[1]);
  assert.equal(JSON.stringify(toolOutput).includes('"type":"output_text"'), false);
});
