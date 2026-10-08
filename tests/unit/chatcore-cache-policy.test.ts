import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(TEST_DATA_DIR, "plugins");

const core = await import("../../src/lib/db/core.ts");
const { updateDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");
const { clearCache, getCachedResponse, generateSignature } =
  await import("../../src/lib/semanticCache.ts");
const { SemanticCacheManager, resetSemanticCacheManager } =
  await import("../../open-sse/services/cache/semanticCacheManager.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { clearPendingRequests } = await import("../../src/lib/usage/usageHistory.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const originalFetch = globalThis.fetch;

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

function buildOpenAIResponse(stream: boolean, text: string) {
  const completion = {
    id: "chatcmpl-cache-policy",
    object: stream ? "chat.completion.chunk" : "chat.completion",
    model: "gpt-4o-mini",
    choices: [
      {
        index: 0,
        ...(stream
          ? { delta: { role: "assistant", content: text } }
          : { message: { role: "assistant", content: text } }),
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
  };
  return new Response(
    stream ? `data: ${JSON.stringify(completion)}\n\ndata: [DONE]\n\n` : JSON.stringify(completion),
    { headers: { "Content-Type": stream ? "text/event-stream" : "application/json" } }
  );
}

async function invokeChatCore({
  body,
  apiKeyInfo,
  accept,
  responseFactory,
}: {
  body: Record<string, unknown>;
  apiKeyInfo: { id: string; cacheDefaultMode: string };
  accept: string;
  responseFactory: () => Response;
}) {
  const calls: unknown[] = [];
  globalThis.fetch = async () => {
    calls.push(true);
    return responseFactory();
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini" },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    apiKeyInfo,
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept }),
    },
  } as Parameters<typeof handleChatCore>[0]);
  await flushAsyncSideEffects();
  return { result, calls };
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(5000);
  clearPendingRequests();
  clearInflight();
  clearCache();
  resetSemanticCacheManager(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  await waitForCallLogSaves(5000);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
for (const stream of [false, true]) {
  for (const control of ["key bypass", "database toggle", "legacy database toggle"]) {
    test(`chatCore skips semantic cache writes with ${control} (stream=${stream})`, async () => {
      const manager = new SemanticCacheManager({ enabled: true }, undefined, async () => ({
        embedding: [1, 0],
        inputTokens: 1,
      }));
      resetSemanticCacheManager(manager);
      const apiKeyInfo = { id: "cache-policy-key", cacheDefaultMode: "legacy" };
      const body = {
        model: "gpt-4o-mini",
        stream,
        temperature: 0,
        messages: [{ role: "user", content: `cache policy ${control} ${stream}` }],
      };
      const setEnabled = (enabled: boolean) => {
        if (control === "key bypass") {
          apiKeyInfo.cacheDefaultMode = enabled ? "legacy" : "bypass";
        } else if (control === "database toggle") {
          updateDatabaseSettings({ cache: { semanticCacheEnabled: enabled } });
        } else {
          core
            .getDbInstance()
            .prepare(
              "UPDATE key_value SET value = ? WHERE namespace = 'databaseSettings' AND key = 'semanticCacheEnabled'"
            )
            .run(JSON.stringify(enabled));
        }
      };
      const invoke = () =>
        invokeChatCore({
          body,
          apiKeyInfo,
          accept: stream ? "text/event-stream" : "application/json",
          responseFactory: () => buildOpenAIResponse(stream, "cache-policy-response"),
        });

      try {
        setEnabled(false);
        const bypassed = await invoke();
        assert.equal(bypassed.result.success, true);
        await bypassed.result.response.text();
        await flushAsyncSideEffects();
        const signature = generateSignature(body.model, body.messages, 0, 1, apiKeyInfo.id);
        assert.equal(
          getCachedResponse(signature),
          null,
          "disabled request must not write the legacy cache"
        );
        assert.equal(
          (await manager.getStats()).entries,
          0,
          "disabled request must not write the vector cache"
        );

        setEnabled(true);
        const fresh = await invoke();
        assert.equal(
          fresh.calls.length,
          1,
          "re-enabling caching must not expose bypassed responses"
        );
        await fresh.result.response.text();
        await flushAsyncSideEffects();
        assert.ok(
          getCachedResponse(signature),
          "enabled request must still populate the legacy cache"
        );
        assert.equal(
          (await manager.getStats()).entries,
          1,
          "enabled request must still populate the vector cache"
        );

        setEnabled(false);
        const ignoredHit = await invoke();
        assert.equal(ignoredHit.calls.length, 1, "disabled request must ignore existing entries");
        await ignoredHit.result.response.text();

        setEnabled(true);
        const hit = await invoke();
        assert.equal(hit.calls.length, 0, "re-enabled cache must serve existing entries");
        assert.equal(hit.result.response.headers.get("X-OmniRoute-Cache"), "HIT");
        await hit.result.response.text();
      } finally {
        await waitForCallLogSaves(5000);
        resetSemanticCacheManager(null);
      }
    });
  }
}
