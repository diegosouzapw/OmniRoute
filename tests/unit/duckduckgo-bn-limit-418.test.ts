import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bn-limit-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { DuckDuckGoWebExecutor, STATUS_URL, MODELS_URL } =
  await import("../../open-sse/executors/duckduckgo-web.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

// Load real challenge from fixtures
const FIXTURES = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "../fixtures/duckduckgo/challenge-variants.json"
);
const VARIANTS = JSON.parse(fs.readFileSync(FIXTURES, "utf8"));
const REAL_CHALLENGE_B64 = VARIANTS["variant-0.js"].challengeBase64;

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

// Valid model catalog response
const MODEL_CATALOG_RESPONSE = {
  models: [
    { id: "gpt-5.4-mini", accessTier: ["free"] },
    { id: "claude-haiku-4-5", accessTier: ["free"] },
    { id: "mistral-small-2603", accessTier: ["free"] },
  ],
};

describe("DuckDuckGo ERR_BN_LIMIT (418) — no retry on rate-limit ban", () => {
  let originalFetch: typeof fetch;
  let fetchCallLog: string[];

  before(() => {
    originalFetch = globalThis.fetch;
  });

  after(() => {
    globalThis.fetch = originalFetch;
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("does NOT retry with fresh VQD on 418 ERR_BN_LIMIT — returns error immediately", async () => {
    fetchCallLog = [];

    // Mock: STATUS_URL returns real challenge, CHAT_URL returns 418 ERR_BN_LIMIT
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : (input as URL | Request).toString();
      fetchCallLog.push(url);
      console.log(`[MOCK FETCH] ${url}`);

      if (url === MODELS_URL) {
        console.log(`[MOCK] Returning model catalog for ${url}`);
        return new Response(JSON.stringify(MODEL_CATALOG_RESPONSE), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url === STATUS_URL) {
        // Return a REAL challenge from fixtures (base64-encoded JavaScript)
        console.log(`[MOCK] Returning REAL challenge for ${url}`);
        return new Response("", {
          status: 200,
          headers: { "x-vqd-hash-1": REAL_CHALLENGE_B64 },
        });
      }

      if (url.includes("/duckchat/v1/chat")) {
        // Return 418 with ERR_BN_LIMIT error body
        console.log(`[MOCK] Returning 418 ERR_BN_LIMIT for ${url}`);
        return new Response(JSON.stringify({ type: "ERR_BN_LIMIT", overrideCode: "f46c" }), {
          status: 418,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Warmup requests (homepage, country, auth token, search page)
      console.log(`[MOCK] Returning HTML for warmup ${url}`);
      return new Response("<html></html>", { status: 200 });
    }) as typeof fetch;

    const executor = new DuckDuckGoWebExecutor();
    const response = await executor.execute(executeInputBase);

    const httpResponse =
      response instanceof Response ? response : (response as { response: Response }).response;
    const bodyText = await httpResponse.text();
    const body = JSON.parse(bodyText);

    // Verify status is 418 (not masked to 503/502)
    assert.equal(
      httpResponse.status,
      418,
      `expected 418 status for ERR_BN_LIMIT, got ${httpResponse.status} (body: ${bodyText})`
    );

    // Verify error message contains ERR_BN_LIMIT
    assert.ok(
      body.error?.message?.includes("ERR_BN_LIMIT"),
      `error message should contain ERR_BN_LIMIT: ${bodyText}`
    );

    // CRITICAL: Should only call STATUS_URL ONCE (no retry with fresh VQD)
    const statusCalls = fetchCallLog.filter((u) => u === STATUS_URL);
    assert.equal(
      statusCalls.length,
      1,
      `expected exactly 1 call to STATUS_URL (no retry on ERR_BN_LIMIT), got ${statusCalls.length} calls: ${JSON.stringify(fetchCallLog)}`
    );
  });

  it("still retries once with fresh VQD on 418 ERR_CHALLENGE", async () => {
    fetchCallLog = [];
    let statusCallCount = 0;

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : (input as URL | Request).toString();
      fetchCallLog.push(url);
      console.log(`[MOCK FETCH] ${url}`);

      if (url === MODELS_URL) {
        console.log(`[MOCK] Returning model catalog for ${url}`);
        return new Response(JSON.stringify(MODEL_CATALOG_RESPONSE), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url === STATUS_URL) {
        statusCallCount++;
        // Return a REAL challenge from fixtures (base64-encoded JavaScript)
        console.log(`[MOCK] Returning REAL challenge #${statusCallCount} for ${url}`);
        return new Response("", {
          status: 200,
          headers: { "x-vqd-hash-1": REAL_CHALLENGE_B64 },
        });
      }

      if (url.includes("/duckchat/v1/chat")) {
        // First chat call: return 418 ERR_CHALLENGE
        // Second chat call (retry): return success
        const isRetry = fetchCallLog.filter((u) => u.includes("/duckchat/v1/chat")).length > 1;
        if (!isRetry) {
          console.log(`[MOCK] Returning 418 ERR_CHALLENGE for ${url}`);
          return new Response(JSON.stringify({ type: "ERR_CHALLENGE", overrideCode: "abc123" }), {
            status: 418,
            headers: { "Content-Type": "application/json" },
          });
        }
        // Retry succeeds
        console.log(`[MOCK] Returning success for retry ${url}`);
        return new Response('data: {"message":"done"}\n\n', {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      }

      // Warmup requests
      console.log(`[MOCK] Returning HTML for warmup ${url}`);
      return new Response("<html></html>", { status: 200 });
    }) as typeof fetch;

    const executor = new DuckDuckGoWebExecutor();
    const response = await executor.execute(executeInputBase);

    const httpResponse =
      response instanceof Response ? response : (response as { response: Response }).response;
    const bodyText = await httpResponse.text();

    // Should eventually succeed (200) after retry
    assert.equal(
      httpResponse.status,
      200,
      `expected 200 after ERR_CHALLENGE retry, got ${httpResponse.status} (body: ${bodyText})`
    );

    // Should call STATUS_URL TWICE (initial + retry)
    const statusCalls = fetchCallLog.filter((u) => u === STATUS_URL);
    assert.equal(
      statusCalls.length,
      2,
      `expected 2 calls to STATUS_URL for ERR_CHALLENGE retry, got ${statusCalls.length}: ${JSON.stringify(fetchCallLog)}`
    );
  });
});
