import test from "node:test";
import assert from "node:assert/strict";

const { handleBypassRequest } = await import("../../open-sse/utils/bypassHandler.ts");

test("handleBypassRequest returns null for non-Claude clients or missing messages", () => {
  assert.equal(handleBypassRequest({ messages: [] }, "gpt-5", "claude-cli/2.1.89"), null);
  assert.equal(
    handleBypassRequest(
      {
        messages: [{ role: "user", content: "Warmup" }],
      },
      "gpt-5",
      { broken: true }
    ),
    null
  );
  assert.equal(
    handleBypassRequest(
      {
        messages: [{ role: "user", content: "Warmup" }],
      },
      "gpt-5",
      "curl/8.0"
    ),
    null
  );
});

test("handleBypassRequest returns a canned JSON response for warmup bypasses", async () => {
  const result = handleBypassRequest(
    {
      stream: false,
      messages: [{ role: "user", content: "Warmup" }],
    },
    "gpt-5-mini",
    "claude-cli/2.1.89"
  );

  assert.ok(result);
  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("content-type"), "application/json");

  const payload = (await result.response.json()) as any;
  assert.equal(payload.model, "gpt-5-mini");
  assert.equal(payload.choices[0].message.role, "assistant");
  assert.match(payload.choices[0].message.content, /clear terminal/i);
});

test("handleBypassRequest returns an SSE response for title extraction bypasses", async () => {
  const result = handleBypassRequest(
    {
      messages: [
        { role: "user", content: "ignored" },
        { role: "assistant", content: [{ type: "text", text: "{" }] },
      ],
    },
    "gpt-5",
    "claude-cli/2.1.89"
  );

  assert.ok(result);
  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("content-type"), "text/event-stream");

  const body = await result.response.text();
  assert.match(body, /data:/);
  assert.match(body, /\[DONE\]/);
});

test("handleBypassRequest bypasses single-message count probes", async () => {
  const result = handleBypassRequest(
    {
      stream: false,
      messages: [{ role: "user", content: [{ type: "text", text: "count" }] }],
    },
    "gpt-4.1-mini",
    "claude-cli/2.1.89"
  );

  assert.ok(result);
  const payload = (await result.response.json()) as any;
  assert.equal(payload.usage.total_tokens, 2);
  assert.equal(payload.choices[0].finish_reason, "stop");
});
