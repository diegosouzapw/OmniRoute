import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("../../open-sse/services/usage.ts");
const originalFetch = globalThis.fetch;
const originalCreditsMode = process.env.ANTIGRAVITY_CREDITS;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalCreditsMode === undefined) delete process.env.ANTIGRAVITY_CREDITS;
  else process.env.ANTIGRAVITY_CREDITS = originalCreditsMode;
});

test("usage service scheduled Antigravity refresh does not proactively spend credits", async () => {
  process.env.ANTIGRAVITY_CREDITS = "always";
  let probeCalls = 0;
  let modelCalls = 0;
  let loadCodeAssistCalls = 0;

  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr.includes("loadCodeAssist")) {
      loadCodeAssistCalls++;
      return new Response(JSON.stringify({ cloudaicompanionProject: "ag-project" }), {
        status: 200,
      });
    }
    if (urlStr.includes("streamGenerateContent")) {
      probeCalls++;
      return new Response("data: [DONE]\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    if (urlStr.includes("fetchAvailableModels")) {
      modelCalls++;
      return new Response(JSON.stringify({ models: {} }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  await usageService.getUsageForProvider(
    {
      id: "ag-scheduled-refresh-service-test",
      provider: "antigravity",
      accessToken: "ag-scheduled-service-token",
      projectId: "ag-project",
    },
    { forceRefresh: false }
  );

  assert.equal(probeCalls, 0);
  assert.equal(modelCalls, 1);
  assert.equal(loadCodeAssistCalls, 1);
});

test("usage service manual refresh does not proactively spend credits in retry mode", async () => {
  process.env.ANTIGRAVITY_CREDITS = "retry";
  let probeCalls = 0;
  let modelCalls = 0;
  let loadCodeAssistCalls = 0;

  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr.includes("loadCodeAssist")) {
      loadCodeAssistCalls++;
      return new Response(JSON.stringify({ cloudaicompanionProject: "ag-retry-project" }), {
        status: 200,
      });
    }
    if (urlStr.includes("streamGenerateContent")) {
      probeCalls++;
      return new Response("data: [DONE]\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    if (urlStr.includes("fetchAvailableModels")) {
      modelCalls++;
      return new Response(JSON.stringify({ models: {} }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const connection = {
    id: "ag-retry-manual-refresh-service-test",
    provider: "antigravity",
    accessToken: "ag-retry-manual-service-token",
    projectId: "ag-retry-project",
  };

  await usageService.getUsageForProvider(connection, { forceRefresh: true });
  await usageService.getUsageForProvider(connection, { forceRefresh: true });

  assert.equal(probeCalls, 0);
  assert.equal(modelCalls, 2);
  assert.equal(loadCodeAssistCalls, 2);
});
