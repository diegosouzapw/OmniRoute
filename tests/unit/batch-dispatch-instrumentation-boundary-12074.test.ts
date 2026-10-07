import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const dispatchSourcePath = join(import.meta.dirname, "../../src/lib/batches/dispatch.ts");

const originalFetch = globalThis.fetch;
const originalEnv = {
  OMNIROUTE_PORT: process.env.OMNIROUTE_PORT,
  PORT: process.env.PORT,
  DASHBOARD_PORT: process.env.DASHBOARD_PORT,
  OMNIROUTE_BASE_PATH: process.env.OMNIROUTE_BASE_PATH,
};

function restoreEnv(): void {
  for (const key of Object.keys(originalEnv) as Array<keyof typeof originalEnv>) {
    const value = originalEnv[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  restoreEnv();
});

test("batch dispatch does not pull API route modules into the instrumentation graph", () => {
  const source = readFileSync(dispatchSourcePath, "utf8");

  assert.doesNotMatch(source, /@\/app\/api\/v1\/.+\/route/);
  assert.doesNotMatch(source, /handlerLoaders|BatchRouteHandler/);
});

test("batch dispatch posts to the active dashboard loopback listener", async () => {
  process.env.OMNIROUTE_PORT = "24120";
  process.env.PORT = "24121";
  process.env.DASHBOARD_PORT = "24122";
  process.env.OMNIROUTE_BASE_PATH = "/omniroute/";

  const calls: Array<{ input: string; init?: RequestInit }> = [];
  const upstreamResponse = new Response("accepted", { status: 202 });
  globalThis.fetch = async (input, init) => {
    calls.push({ input: String(input), init });
    return upstreamResponse;
  };

  const { dispatch } = await import("../../src/lib/batches/dispatch.ts");
  const response = await dispatch.dispatchBatchApiRequest({
    endpoint: "/v1/chat/completions",
    body: { model: "provider/model", messages: [] },
    apiKey: "batch-secret",
  });

  assert.strictEqual(response, upstreamResponse);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].input, "http://127.0.0.1:24122/omniroute/v1/chat/completions");
  assert.equal(calls[0].init?.method, "POST");
  assert.equal(calls[0].init?.redirect, "error");
  assert.equal(new Headers(calls[0].init?.headers).get("authorization"), "Bearer batch-secret");
  assert.deepEqual(JSON.parse(String(calls[0].init?.body)), {
    model: "provider/model",
    messages: [],
  });
});
