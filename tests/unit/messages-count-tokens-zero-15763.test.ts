import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-count-tokens-zero-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

type CountResponse = { input_tokens: number; source: string };

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function countWithProviderReply(model: string, provider: string, reply: unknown) {
  await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-zero-count`,
    apiKey: `sk-${provider}-zero`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(reply), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  try {
    const response = await POST(
      new Request("http://localhost/api/v1/messages/count_tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: "Count these tokens please, there are several." }],
        }),
      })
    );
    return (await response.json()) as CountResponse;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("count_tokens does not trust a provider count of 0 for non-empty input (#15763)", async () => {
  const body = await countWithProviderReply("anthropic/claude-opus-4.6", "anthropic", {
    input_tokens: 0,
  });
  assert.ok(body.input_tokens > 0);
  assert.equal(body.source, "local");
});
