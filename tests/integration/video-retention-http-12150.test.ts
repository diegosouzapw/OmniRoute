import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";
import { eventually, serveRetentionRoutes, syntheticReply } from "./_videoRetentionHttp.ts";

// Probe only: actual HTTP + real routes/guardrail/SQLite. Only video description
// and upstream response are synthetic; this does not certify ffmpeg/STT or Next routing.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-retention-http-12150-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "retention-fixture-only-secret-12150",
  REQUIRE_API_KEY: "true",
  APP_LOG_TO_FILE: "true",
  APP_LOG_LEVEL: "debug",
  APP_LOG_FILE_PATH: path.join(dataDir, "logs", "app.log"),
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  OMNIROUTE_LOG_REQUEST_SHAPE: "0",
});
const nativeFetch = globalThis.fetch;
const originalDispatcher = getGlobalDispatcher();
const networkGuard = new MockAgent();
networkGuard.disableNetConnect();
setGlobalDispatcher(networkGuard);
let upstream: typeof fetch = async () => {
  throw new Error("unconfigured synthetic upstream");
};
globalThis.fetch = (...args) => upstream(...args);

test("retention HTTP route matrix", { timeout: 300_000 }, async (t) => {
  console.error("RETENTION_IMPORT start");
  const core = await import("../../src/lib/db/core.ts");
  console.error("RETENTION_IMPORT core");
  const providers = await import("../../src/lib/db/providers.ts");
  console.error("RETENTION_IMPORT providers");
  const keys = await import("../../src/lib/db/apiKeys.ts");
  console.error("RETENTION_IMPORT keys");
  const settings = await import("../../src/lib/db/settings.ts");
  console.error("RETENTION_IMPORT settings");
  const readCache = await import("../../src/lib/db/readCache.ts");
  console.error("RETENTION_IMPORT readCache");
  const logs = await import("../../src/lib/usage/callLogs.ts");
  console.error("RETENTION_IMPORT logs");
  const pending = await import("../../src/lib/usage/usageHistory.ts");
  console.error("RETENTION_IMPORT pending");
  const memory = await import("../../src/lib/memory/store.ts");
  console.error("RETENTION_IMPORT memory");
  const memorySettings = await import("../../src/lib/memory/settings.ts");
  console.error("RETENTION_IMPORT memorySettings");
  const semantic = await import("../../src/lib/semanticCache.ts");
  console.error("RETENTION_IMPORT semantic");
  const manager = await import("../../open-sse/services/cache/semanticCacheManager.ts");
  console.error("RETENTION_IMPORT manager");
  const idempotency = await import("../../src/lib/idempotencyLayer.ts");
  console.error("RETENTION_IMPORT idempotency");
  const reasoning = await import("../../open-sse/services/reasoningCache.ts");
  console.error("RETENTION_IMPORT reasoning");
  const registry = await import("../../src/lib/guardrails/registry.ts");
  console.error("RETENTION_IMPORT registry");
  const { VideoBridgeGuardrail } = await import("../../src/lib/guardrails/videoBridge.ts");
  console.error("RETENTION_IMPORT VideoBridgeGuardrail");
  const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
  console.error("RETENTION_IMPORT chatRoute");
  const responsesRoute = await import("../../src/app/api/v1/responses/route.ts");
  console.error("RETENTION_IMPORT responsesRoute");
  const pressure = await import("../../open-sse/utils/resourcePressure.ts");
  const loggerResource = await import("../../src/shared/utils/loggerResource.ts");
  // Importing proxyFetch installs its global wrapper. Install the synthetic seam
  // only after the real application's complete import graph has finished.
  globalThis.fetch = (...args) => upstream(...args);

  let pressureFixture: ReturnType<typeof pressure.reloadResourcePressureRuntime>;
  const sentinel = "I prefer RETENTION_PRIVATE_SENTINEL_12150";
  const described = `[Video description: caption; transcript[source=client] ${sentinel}]`;
  let server: Awaited<ReturnType<typeof serveRetentionRoutes>>;
  let key: Awaited<ReturnType<typeof keys.createApiKey>>;
  let descriptionCalls = 0;

  t.before(async () => {
    // Only system metrics are synthetic; the route admission wrapper remains real.
    pressureFixture = pressure.reloadResourcePressureRuntime({
      heapThresholdMb: 10_000,
      immediateHeapUsedMb: () => 1,
      immediateRssUsedMb: () => 1,
      sample: async () => ({
        observedAtMs: Date.now(),
        v8: { heapUsedBytes: 1048576, heapLimitBytes: 10485760000 },
        process: {
          rssBytes: 1048576,
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
    await assert.rejects(nativeFetch("https://retention-egress-blocked.invalid/"), /fetch failed/);
    await providers.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "synthetic",
      apiKey: "sk-fixture-only",
      isActive: true,
      testStatus: "active",
    });
    await providers.createProviderConnection({
      provider: "deepseek",
      authType: "apikey",
      name: "synthetic reasoning",
      apiKey: "sk-fixture-only",
      isActive: true,
      testStatus: "active",
    });
    key = await keys.createApiKey("retention-fixture", "retention-machine");
    await settings.updateSettings({
      semanticCacheEnabled: true,
      semanticCacheVectorEnabled: true,
      memoryEnabled: true,
      memoryMaxTokens: 2000,
      call_log_pipeline_enabled: true,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4.1-mini",
      modalityBridgeCacheEnabled: false,
    });
    manager.getSemanticCacheManager().updateConfig({ enabled: true });
    manager
      .getSemanticCacheManager()
      .setEmbeddingGenerator(async () => ({ embedding: [1, 0, 0], inputTokens: 1 }));
    readCache.invalidateDbCache();
    memorySettings.invalidateMemorySettingsCache();
    registry.registerDefaultGuardrails();
    registry.guardrailRegistry.register(
      new VideoBridgeGuardrail({
        deps: {
          getCapabilities: () => ({ supportsVideo: false }),
          describePart: async () => {
            descriptionCalls++;
            return {
              description: described,
              descriptionRedacted: "[Video description: caption; [redacted-video-transcript]]",
              durationSeconds: 2,
              framesRequested: 1,
              framesUsed: 1,
              transcriptCues: [
                { text: sentinel, source: "client", confidence: 1, startSeconds: 0, endSeconds: 1 },
              ],
            };
          },
        },
      })
    );
    server = await serveRetentionRoutes({
      "/v1/chat/completions": chatRoute.POST,
      "/v1/responses": responsesRoute.POST,
    });
    networkGuard.enableNetConnect(new URL(server.url).host);
  });

  t.beforeEach(async () => {
    idempotency.clearIdempotency();
    semantic.clearCache();
    await manager.getSemanticCacheManager().clear();
    reasoning.clearReasoningCacheAll();
  });

  t.after(async () => {
    globalThis.fetch = nativeFetch;
    await logs.closeCallLogSaves(30_000);
    await server?.close();
    await loggerResource.closeSharedLoggerResource();
    const proxyLogs = await import("../../src/lib/proxyLogger.ts");
    proxyLogs.flushProxyLogsSync();
    pressureFixture.dispose();
    core.closeDbInstance({ checkpointMode: null });
    setGlobalDispatcher(originalDispatcher);
    await networkGuard.close();
    const finalApplicationLog = fs.readFileSync(path.join(dataDir, "logs", "app.log"), "utf8");
    assert(finalApplicationLog.includes("video-bridge pre-call"), "final debug log must exist");
    assert(
      !finalApplicationLog.includes(sentinel),
      "flushed application debug log retained a transcript from the matrix"
    );
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  function bodyFor(stream: boolean, padding: number, responses = false) {
    const content = [
      { type: "text", text: "Describe this scene. " + "x".repeat(padding) },
      {
        type: "input_video",
        video_url: "data:video/mp4;base64,QUJD",
        transcript: { cues: [{ text: sentinel, start: 0, end: 1, source: "client" }] },
      },
    ];
    return {
      model: "openai/gpt-4.1-mini",
      stream,
      temperature: 0,
      [responses ? "input" : "messages"]: [{ role: "user", content }],
    };
  }

  async function latestLog(correlationId: string) {
    return eventually(async () => {
      await logs.waitForCallLogSaves(30_000);
      const rows = await logs.getCallLogs({ correlationId, limit: 5 });
      return rows[0]?.id ? logs.getCallLogById(rows[0].id) : null;
    });
  }

  async function verifyObserved(
    stream: boolean,
    padding: number,
    responses = false,
    reasoningModel = false
  ) {
    let release!: () => void;
    let seen!: () => void;
    const ready = new Promise<void>((resolve) => {
      seen = resolve;
    });
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    let requestCount = 0;
    let retainedCorrelationId: string | null = null;
    upstream = async (input, init) => {
      const request = input instanceof Request ? input : new Request(input, init);
      assert.equal(
        new URL(request.url).hostname,
        reasoningModel ? "api.deepseek.com" : "api.openai.com"
      );
      const body = await request.json();
      assert(JSON.stringify(body).includes(sentinel), "model-bound transcript must survive");
      requestCount++;
      seen();
      await gate;
      return syntheticReply(sentinel, body.stream === true, reasoningModel ? sentinel : undefined);
    };
    const correlationId = randomUUID();
    const endpoint = responses ? "/v1/responses" : "/v1/chat/completions";
    const requestBody = bodyFor(stream, padding, responses);
    if (reasoningModel) requestBody.model = "deepseek/deepseek-v4-flash";
    const responsePromise = nativeFetch(server.url + endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key.key}`,
        "x-correlation-id": correlationId,
        "idempotency-key": correlationId,
      },
      body: JSON.stringify(requestBody),
    });
    try {
      await Promise.race([
        ready,
        responsePromise.then(async (response) => {
          if (response.status < 400) return new Promise<never>(() => {});
          throw new Error(
            `route returned ${response.status} before synthetic upstream: ${(await response.text()).slice(0, 180)}`
          );
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("upstream not reached")), 60_000).unref()
        ),
      ]);
      const snapshot = [...pending.getPendingById().values()];
      assert.equal(snapshot.length, 1, "exactly this request must be observed as pending");
      retainedCorrelationId = snapshot[0].correlationId ?? null;
      assert.equal(typeof retainedCorrelationId, "string");
      assert(!JSON.stringify(snapshot).includes(sentinel), "pending state retained transcript");
    } finally {
      release();
    }
    const response = await responsePromise;
    const text = await response.text();
    assert.equal(response.status, 200, text.slice(0, 300));
    assert(text.includes(sentinel), "client response must remain intact");
    assert.equal(requestCount, 1);
    const detail = await latestLog(retainedCorrelationId!);
    assert(detail, "completed log must exist");
    assert(!JSON.stringify(detail).includes(sentinel), "completed log retained transcript");
    const row = core
      .getDbInstance()
      .prepare(
        "SELECT video_content_removed, artifact_relpath, response_id FROM call_logs WHERE id = ?"
      )
      .get(detail.id) as {
      video_content_removed: number;
      artifact_relpath: string;
      response_id: string | null;
    };
    assert.equal(row.video_content_removed, 1);
    if (row.artifact_relpath) {
      const artifact = JSON.parse(
        fs.readFileSync(path.join(dataDir, "call_logs", row.artifact_relpath), "utf8")
      );
      assert(!JSON.stringify(artifact).includes(sentinel));
      assert(!artifact.pipeline, "observed detailed pipeline must be omitted");
    }
    assert.equal(semantic.getCacheStats().dbEntries, 0);
    assert.equal(semantic.getCacheStats().memoryEntries, 0);
    assert.equal((await manager.getSemanticCacheManager().getStats()).entries, 0);
    assert.equal((await idempotency.getIdempotencyStats()).activeKeys, 0);
    assert.equal((await memory.listMemories({ apiKeyId: key.id })).total, 0);
    assert.equal(reasoning.getReasoningCacheServiceStats().totalEntries, 0);
    const applicationLog = await eventually(() => {
      const file = path.join(dataDir, "logs", "app.log");
      return fs.existsSync(file) && fs.readFileSync(file, "utf8").includes("video-bridge pre-call")
        ? fs.readFileSync(file, "utf8")
        : null;
    });
    assert(!applicationLog.includes(sentinel), "application debug log retained transcript");
    return { row, text, correlationId, requestCount: () => requestCount };
  }

  await t.test("network guard blocks other loopback ports and external hosts", async () => {
    const otherPort = new URL(server.url);
    otherPort.port = String(Number(otherPort.port) === 65535 ? 65534 : Number(otherPort.port) + 1);
    for (const url of [otherPort.href, "https://retention-egress-blocked.invalid/"]) {
      await assert.rejects(nativeFetch(url), (error: unknown) => {
        assert(error instanceof TypeError);
        assert(error.cause instanceof Error && "code" in error.cause);
        assert.equal(error.cause.code, "UND_MOCK_ERR_MOCK_NOT_MATCHED");
        return true;
      });
    }
  });

  for (const stream of [false, true]) {
    for (const padding of [100_000, 300_000, 600_000]) {
      await t.test(
        `HTTP observed video ${stream ? "SSE" : "JSON"} with ${padding} padding: live payload intact, retained sinks empty/redacted`,
        { timeout: 120_000 },
        async () => {
          await verifyObserved(stream, padding);
        }
      );
    }
  }
  for (const stream of [false, true]) {
    await t.test(
      `HTTP observed reasoning ${stream ? "SSE" : "JSON"} does not populate replay cache`,
      async () => {
        await verifyObserved(stream, 1000, false, true);
      }
    );
    await t.test(
      `HTTP observed Responses ${stream ? "SSE" : "JSON"} denies durable continuation`,
      async () => {
        const first = await verifyObserved(stream, 1000, true);
        const responseId = stream
          ? first.text
              .split("\n")
              .filter((line) => line.startsWith("data: {"))
              .map((line) => JSON.parse(line.slice(6)))
              .find((event) => event.type === "response.completed")?.response?.id
          : JSON.parse(first.text).id;
        assert.equal(typeof responseId, "string", "client must receive a real response id");
        assert.equal(
          first.row.response_id,
          responseId,
          "continuation must target the persisted response"
        );
        const response = await nativeFetch(server.url + "/v1/responses", {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${key.key}` },
          body: JSON.stringify({
            model: "openai/gpt-4.1-mini",
            stream: false,
            previous_response_id: responseId,
            input: "Continue",
          }),
        });
        const body = await response.json();
        assert.equal(response.status, 400, JSON.stringify(body));
        assert.equal(body.error.code, "previous_response_not_found");
        assert.equal(
          first.requestCount(),
          1,
          "continuation must fail before another upstream call"
        );
      }
    );
  }

  await t.test(
    "HTTP model-policy rejection redacts raw transcript before the bridge executes",
    async () => {
      const restricted = await keys.createApiKey("retention-denied", "retention-machine", [], {
        modelAccessMode: "restricted",
        allowedModels: ["openai/gpt-4o"],
      });
      const descriptionsBeforeRejection = descriptionCalls;
      let calls = 0;
      upstream = async () => {
        calls++;
        throw new Error("rejection reached upstream");
      };
      const correlationId = randomUUID();
      const response = await nativeFetch(server.url + "/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${restricted.key}`,
          "x-correlation-id": correlationId,
        },
        body: JSON.stringify(bodyFor(false, 1000)),
      });
      assert.equal(response.status, 403, await response.text());
      assert.equal(calls, 0);
      assert.equal(descriptionCalls, descriptionsBeforeRejection, "rejection reached video bridge");
      const detail = await latestLog(correlationId);
      assert(detail, "rejected log must exist");
      assert(!JSON.stringify(detail).includes(sentinel), "rejected log retained raw transcript");
      assert.equal((await memory.listMemories({ apiKeyId: restricted.id })).total, 0);
    }
  );

  await t.test(
    "HTTP ordinary turn proves cache, idempotency, Memory and reasoning stores are enabled",
    async () => {
      const ordinary = "I prefer warm fruit tea and quiet music.";
      const requestBody = {
        model: "deepseek/deepseek-v4-flash",
        stream: false,
        temperature: 0,
        messages: [{ role: "user", content: ordinary }],
      };
      let calls = 0;
      upstream = async (input, init) => {
        const request = input instanceof Request ? input : new Request(input, init);
        assert.equal(new URL(request.url).hostname, "api.deepseek.com");
        calls++;
        return syntheticReply(ordinary, false, "Ordinary reasoning can be retained.");
      };
      const requestHeaders = {
        "content-type": "application/json",
        authorization: `Bearer ${key.key}`,
        "idempotency-key": randomUUID(),
      };
      const response = await nativeFetch(server.url + "/v1/chat/completions", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      assert.equal(response.status, 200, await response.text());
      await eventually(async () => (await memory.listMemories({ apiKeyId: key.id })).total > 0);
      assert(semantic.getCacheStats().dbEntries > 0);
      assert(semantic.getCacheStats().memoryEntries > 0);
      await eventually(
        async () => (await manager.getSemanticCacheManager().getStats()).entries > 0
      );
      assert((await idempotency.getIdempotencyStats()).activeKeys > 0);
      assert(reasoning.getReasoningCacheServiceStats().totalEntries > 0);
      const repeated = await nativeFetch(server.url + "/v1/chat/completions", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });
      assert.equal(repeated.status, 200);
      await repeated.text();
      assert.equal(calls, 1, "ordinary repeat must actually hit a retained store");
    }
  );
});
