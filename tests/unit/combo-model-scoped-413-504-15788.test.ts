import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("model-failure-15788");
const {
  buildRequest,
  buildOpenAIResponse,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;
const { reloadResourcePressureRuntime } = await import("../../open-sse/utils/resourcePressure.ts");
test.beforeEach(async () => {
  await resetStorage();
  // Routing scope must not depend on pressure from unrelated devbox workloads.
  reloadResourcePressureRuntime({
    immediateHeapUsedMb: () => 1,
    immediateRssUsedMb: () => 1,
    sample: async () => ({
      observedAtMs: Date.now(),
      v8: { heapUsedBytes: 1024, heapLimitBytes: 1024 * 1024 },
      process: {
        rssBytes: 1024,
        externalBytes: 0,
        arrayBuffersBytes: 0,
        availableBytes: null,
        constrainedBytes: null,
      },
      cgroup: {
        currentBytes: null,
        maxBytes: null,
        highBytes: null,
        fileBytes: null,
        events: null,
      },
      psi: null,
    }),
  });
});
test.afterEach(resetStorage);
test.after(async () => {
  await harness.cleanup();
  reloadResourcePressureRuntime();
});

for (const strategy of ["priority", "round-robin"]) {
  for (const status of [413, 504]) {
    for (const scoped of [true, false]) {
      test(`#15788 ${strategy} ${status} model scope=${scoped} preserves sibling eligibility`, async () => {
        await seedConnection("openai", { apiKey: "test-model-scope-15788" });
        await seedConnection("groq", { apiKey: "test-fallback-15788" });
        await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
        const name = `model-scope-${strategy}-${status}-${scoped}`;
        await combosDb.createCombo({
          name,
          strategy,
          config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
          models: ["openai/o3-mini", "openai/gpt-4.1-mini", "groq/llama-3.3-70b-versatile"],
        });
        const calls: string[] = [];
        globalThis.fetch = async (_url, init = {}) => {
          const sent = JSON.parse(String(init.body ?? "{}")) as { model: string };
          calls.push(sent.model);
          if (sent.model !== "o3-mini") return buildOpenAIResponse(`served ${sent.model}`);
          const message =
            status === 413
              ? scoped
                ? "Request too large for model `o3-mini` on service tier `on_demand`"
                : "Payload too large"
              : scoped
                ? "Fetch timeout after 110000ms on https://example.invalid/models/o3-mini:streamGenerateContent?alt=sse"
                : "Gateway timeout";
          return new Response(JSON.stringify({ error: { message } }), {
            status,
            headers: { "content-type": "application/json" },
          });
        };
        const response = await handleChat(
          buildRequest({
            body: { model: name, stream: false, messages: [{ role: "user", content: "hello" }] },
          })
        );
        const body = await response.json();
        assert.equal(response.status, 200);
        assert.equal(calls[0], "o3-mini");
        assert.equal(calls.includes("gpt-4.1-mini"), scoped, `dispatches: ${calls}`);
        assert.match(
          body.choices[0].message.content,
          scoped ? /served gpt-4.1-mini/ : /served llama/
        );
      });
    }
  }
}
