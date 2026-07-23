import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-identity-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-antigravity-client-identity";

const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { setCliCompatProviders } = await import("../../open-sse/config/cliFingerprints.ts");
const { antigravityCliUserAgent } = await import("../../open-sse/services/antigravityHeaders.ts");
const { clearAntigravityVersionCaches, seedAntigravityCliVersionCache } =
  await import("../../open-sse/services/antigravityVersion.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;
const originalCreditsMode = process.env.ANTIGRAVITY_CREDITS;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  setCliCompatProviders([]);
  clearAntigravityVersionCaches();
  if (originalCreditsMode === undefined) {
    delete process.env.ANTIGRAVITY_CREDITS;
  } else {
    process.env.ANTIGRAVITY_CREDITS = originalCreditsMode;
  }
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("executor token refresh uses the selected CLI identity", async () => {
  seedAntigravityCliVersionCache("1.1.1");
  globalThis.fetch = async (url, init) => {
    assert.match(String(url), /oauth2\.googleapis\.com\/token$/);
    assert.equal(new Headers(init?.headers).get("User-Agent"), antigravityCliUserAgent("1.1.1"));
    return Response.json({
      access_token: "new-token",
      refresh_token: "new-refresh",
      expires_in: 3600,
    });
  };

  const result = await new AntigravityExecutor().refreshCredentials(
    {
      refreshToken: "refresh",
      projectId: "project-1",
      providerSpecificData: { clientProfile: "cli" },
    },
    null
  );

  assert.equal(result?.accessToken, "new-token");
  assert.deepEqual(result?.providerSpecificData, { clientProfile: "cli" });
});

test("credits retry keeps the selected CLI identity after fingerprint serialization", async () => {
  const calls: Array<{ body: Record<string, unknown>; headers: Headers }> = [];
  seedAntigravityCliVersionCache("1.1.1");
  setCliCompatProviders(["antigravity"]);
  process.env.ANTIGRAVITY_CREDITS = "retry";

  globalThis.fetch = async (_url, init) => {
    calls.push({ body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) });
    if (calls.length === 1) {
      return Response.json(
        { error: { message: "RESOURCE_EXHAUSTED: quota exhausted" } },
        { status: 429 }
      );
    }
    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"credits"}]},"finishReason":"STOP"}]}}\n\n',
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  const result = await new AntigravityExecutor().execute({
    model: "antigravity/gemini-2.5-flash",
    body: { request: { contents: [] } },
    stream: false,
    credentials: {
      accessToken: "cli-credit-token",
      projectId: "project-1",
      providerSpecificData: { clientProfile: "cli" },
    },
    log: { debug() {}, warn() {}, info() {} },
  });

  assert.equal(result.response.status, 200);
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[1].body.enabledCreditTypes, ["GOOGLE_ONE_AI"]);
  for (const call of calls) {
    assert.equal(call.headers.get("User-Agent"), antigravityCliUserAgent("1.1.1"));
    assert.equal(call.headers.get("x-client-name"), null);
    assert.equal(call.headers.get("X-Goog-Api-Client"), null);
  }
});

test("image generation forwards the selected CLI identity and public envelope", async () => {
  seedAntigravityCliVersionCache("1.1.1");
  let capturedHeaders = new Headers();
  let capturedBody: Record<string, unknown> = {};
  globalThis.fetch = async (_url, init) => {
    capturedHeaders = new Headers(init?.headers);
    capturedBody = JSON.parse(String(init?.body));
    return Response.json({
      response: {
        candidates: [
          {
            content: {
              parts: [{ inlineData: { mimeType: "image/png", data: "aW1hZ2U=" } }],
            },
          },
        ],
      },
    });
  };

  const result = await handleImageGeneration({
    body: {
      model: "antigravity/gemini-3.1-flash-image",
      prompt: "painted beach",
      size: "1024x1024",
    },
    credentials: {
      accessToken: "image-token",
      projectId: "image-project",
      providerSpecificData: { clientProfile: "cli" },
    },
    log: null,
  });

  assert.equal(result.success, true);
  assert.equal(capturedHeaders.get("User-Agent"), antigravityCliUserAgent("1.1.1"));
  assert.equal(capturedHeaders.get("x-client-name"), null);
  assert.equal(capturedHeaders.get("X-Goog-Api-Client"), null);
  assert.equal(capturedBody.userAgent, "antigravity");
  assert.equal(capturedBody.requestType, "image_gen");
});
