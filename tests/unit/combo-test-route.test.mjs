import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-test-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const route = await import("../../src/app/api/combos/test/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createTestCombo(models = ["openrouter/openai/gpt-5.4"]) {
  return combosDb.createCombo({
    name: "strict-live-test",
    models,
    strategy: "priority",
  });
}

function makeRequest(comboName = "strict-live-test") {
  return new Request("http://localhost/api/combos/test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ comboName }),
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("combo test route marks a model healthy only when it returns assistant text", async () => {
  await createTestCombo();

  const fetchCalls = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({ url: String(url), init });
    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              content: "OK",
            },
          },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const response = await route.POST(makeRequest());
  const body = await response.json();
  const forwardedBody = JSON.parse(fetchCalls[0].init.body);

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].url, "http://localhost/v1/chat/completions");
  assert.equal(fetchCalls[0].init.headers["X-Internal-Test"], "combo-health-check");
  assert.equal(forwardedBody.model, "openrouter/openai/gpt-5.4");
  assert.equal(forwardedBody.messages[0].content, "Reply with OK only.");
  assert.equal(body.resolvedBy, "openrouter/openai/gpt-5.4");
  assert.equal(body.results[0].status, "ok");
  assert.equal(body.results[0].responseText, "OK");
});

test("combo test route treats empty successful responses as failures", async () => {
  await createTestCombo();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              content: "",
            },
          },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  const response = await route.POST(makeRequest());
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.resolvedBy, null);
  assert.equal(body.results[0].status, "error");
  assert.equal(body.results[0].statusCode, 200);
  assert.match(body.results[0].error, /no text content/i);
});

test("combo test route surfaces provider errors instead of downgrading them to reachability", async () => {
  await createTestCombo();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        error: {
          message: "Upstream rejected this request shape",
        },
      }),
      {
        status: 422,
        headers: { "content-type": "application/json" },
      }
    );

  const response = await route.POST(makeRequest());
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.resolvedBy, null);
  assert.equal(body.results[0].status, "error");
  assert.equal(body.results[0].statusCode, 422);
  assert.equal(body.results[0].error, "Upstream rejected this request shape");
  assert.equal("probeMethod" in body.results[0], false);
});
