import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeProviderUsageForRequest } = await import("../../../open-sse/utils/usageTracking.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");

test("issue #10705: provider-reported input_tokens: 0 on a non-trivial request must be repaired, not passed through", () => {
  const body = {
    model: "claude-fable-5",
    messages: [
      { role: "user", content: "你好，我想测试一下这个模型，请问你能帮我写一段代码吗？" },
      { role: "assistant", content: "你好！继续测试也行" },
      { role: "user", content: "帮我写一个 quicksort 的 python 实现，并解释一下时间复杂度。" },
    ],
  };

  const usage = { input_tokens: 0, output_tokens: 43 };
  const result = sanitizeProviderUsageForRequest(usage, body, FORMATS.CLAUDE);
  assert.ok(result && result.input_tokens > 0, "input_tokens: 0 for a real body must be repaired");
});

test("issue #10705: input_tokens: 0 for a genuinely empty/no-body request stays 0", () => {
  const usage = { input_tokens: 0, output_tokens: 5 };
  const result = sanitizeProviderUsageForRequest(usage, undefined, FORMATS.CLAUDE);
  assert.equal(result, usage, "no body to estimate from — must pass through unchanged");
});
