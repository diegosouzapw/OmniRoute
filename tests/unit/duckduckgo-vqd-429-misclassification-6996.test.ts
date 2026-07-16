import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6996-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { DuckDuckGoWebExecutor, STATUS_URL } = await import(
  "../../open-sse/executors/duckduckgo-web.ts"
);
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const executeInputBase = {
  model: "gpt-4o-mini",
  body: {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "hi" }],
    stream: false,
  },
  stream: false,
  credentials: {},
};

describe("#6996 DuckDuckGo VQD 429 misclassification", () => {
  let originalFetch: typeof fetch;

  before(() => {
    originalFetch = globalThis.fetch;
  });

  after(() => {
    globalThis.fetch = originalFetch;
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  });

  it("propagates upstream 429 instead of masking it as a generic 503", async () => {
    // Set the mock AFTER the module import so it wins over
    // open-sse/utils/proxyFetch.ts's own module-load-time
    // `globalThis.fetch = patchedFetch` side effect.
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : (input as URL | Request).toString();
      if (url === STATUS_URL) {
        return new Response("", {
          status: 429,
          headers: { "Retry-After": "30" },
        });
      }
      if (url.includes("/duckchat/v1/chat")) {
        throw new Error("unexpected chat POST reached without a VQD token");
      }
      return new Response("<html></html>", { status: 200 });
    }) as typeof fetch;

    const executor = new DuckDuckGoWebExecutor();
    const response = await executor.execute(executeInputBase);

    const httpResponse =
      response instanceof Response
        ? response
        : (response as { response: Response }).response;
    const bodyText = await httpResponse.text();

    assert.equal(
      httpResponse.status,
      429,
      `expected the executor to surface DuckDuckGo's real 429 rate-limit status, got ${httpResponse.status} (body: ${bodyText})`
    );
  });

  it("still returns 503 fallback for a genuine 5xx status on the VQD endpoint", async () => {
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : (input as URL | Request).toString();
      if (url === STATUS_URL) {
        return new Response("", { status: 500 });
      }
      if (url.includes("/duckchat/v1/chat")) {
        throw new Error("unexpected chat POST reached without a VQD token");
      }
      return new Response("<html></html>", { status: 200 });
    }) as typeof fetch;

    const executor = new DuckDuckGoWebExecutor();
    const response = await executor.execute(executeInputBase);

    const httpResponse =
      response instanceof Response
        ? response
        : (response as { response: Response }).response;
    const bodyText = await httpResponse.text();

    assert.equal(
      httpResponse.status,
      503,
      `expected the executor to keep the 503 fallback for a genuine upstream 5xx, got ${httpResponse.status} (body: ${bodyText})`
    );
  });
});
