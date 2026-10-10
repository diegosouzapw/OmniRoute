import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("responses-correlation-12994");
const { POST } = await import("../../src/app/api/v1/responses/route.ts");
const streamBody =
  'data: {"id":"chatcmpl-correlation","object":"chat.completion.chunk","model":"gpt-4.1","choices":[{"index":0,"delta":{"content":"OK"},"finish_reason":null}]}\n\ndata: [DONE]\n\n';

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.seedConnection("openai");
  await harness.settingsDb.updateSettings({ call_log_pipeline_enabled: true });
});
test.after(async () => await harness.cleanup());

const cases: Array<{
  name: string;
  stream: boolean;
  slow?: boolean;
  headers: Record<string, string>;
  expected?: string;
}> = [
  {
    name: "fast stream accepts X-Request-Id",
    stream: true,
    headers: { "X-Request-Id": "attempt-fast" },
    expected: "attempt-fast",
  },
  {
    name: "early keepalive preserves preferred correlation",
    stream: true,
    slow: true,
    headers: { "X-Request-Id": "attempt-secondary", "X-Correlation-Id": "attempt-primary" },
    expected: "attempt-primary",
  },
  {
    name: "nonstream preserves correlation",
    stream: false,
    headers: { "X-Correlation-Id": "attempt-json" },
    expected: "attempt-json",
  },
  {
    name: "invalid primary falls back to request id",
    stream: false,
    headers: { "X-Correlation-Id": "x".repeat(257), "X-Request-Id": "attempt-fallback" },
    expected: "attempt-fallback",
  },
  { name: "absent headers generate a discoverable id", stream: false, headers: {} },
  {
    name: "overlong headers generate a discoverable id",
    stream: false,
    headers: { "X-Correlation-Id": "x".repeat(257), "X-Request-Id": "y".repeat(257) },
  },
];

for (const scenario of cases) {
  test(scenario.name, async () => {
    let release = () => {};
    const released = new Promise<void>((resolve) => {
      release = resolve;
    });
    globalThis.fetch = async () => {
      if (scenario.slow) await released;
      return scenario.stream
        ? new Response(streamBody, { headers: { "Content-Type": "text/event-stream" } })
        : harness.buildOpenAIResponse("OK", "gpt-4.1");
    };
    let response: Response;
    let wire: string;
    try {
      response = await POST(
        harness.buildRequest({
          url: "http://localhost/v1/responses",
          headers: scenario.headers,
          body: {
            model: "openai/gpt-4.1",
            input: [{ role: "user", content: "hi" }],
            stream: scenario.stream,
          },
        })
      );
      release();
      wire = await response.text();
    } finally {
      release();
    }
    assert.equal(response.status, 200, wire);
    if (scenario.slow)
      assert.match(wire, /response.in_progress/, "the early-keepalive path must actually run");
    const id = response.headers.get("x-correlation-id");
    if (scenario.expected) assert.equal(id, scenario.expected);
    else
      assert.ok(
        id && id.length <= 256 && !/[\r\n]/.test(id),
        "the generated id must be safe and visible"
      );
    await harness.callLogsDb.waitForCallLogSaves(10_000);
    const row = await harness.waitFor(async () => {
      const rows = await harness.callLogsDb.getCallLogs({ limit: 20 });
      return rows.find((entry: { correlationId?: string }) => entry.correlationId === id);
    }, 10_000);
    assert.ok(row, "the persisted call log must carry the same id returned to the caller");
  });
}
