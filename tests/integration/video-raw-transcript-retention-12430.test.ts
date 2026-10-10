import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Socket } from "node:net";
import { randomUUID } from "node:crypto";
import { fetch as httpFetch, MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";
import { eventually, serveRetentionRoutes, syntheticReply } from "./_videoRetentionHttp.ts";

// Real HTTP routes + guardrail + temporary SQLite. Only video description,
// upstream inference and host-pressure metrics are synthetic; no ffmpeg/STT.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-raw-video-12430-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "raw-video-fixture-only-secret-12430",
  JWT_SECRET: "raw-video-fixture-only-jwt-12430",
  REQUIRE_API_KEY: "true",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
});
const originalFetch = globalThis.fetch;
const originalDispatcher = getGlobalDispatcher();
const originalConnect = Socket.prototype.connect;
const networkGuard = new MockAgent();
networkGuard.disableNetConnect();
setGlobalDispatcher(networkGuard);
let allowedPort = 0;
Socket.prototype.connect = function (...args: unknown[]) {
  const normalized = Array.isArray(args[0]) ? args[0] : args;
  const first = normalized[0];
  const options = first && typeof first === "object" ? (first as Record<string, unknown>) : null;
  const host = options?.host ?? normalized[1];
  const port = Number(options?.port ?? first);
  assert(
    host === "127.0.0.1" && port === allowedPort && allowedPort > 0,
    "raw video fixture blocks sockets outside its HTTP server"
  );
  return Reflect.apply(originalConnect, this, args);
};
let upstream: typeof fetch = async () => {
  throw new Error("unconfigured synthetic inference");
};
globalThis.fetch = (...args) => upstream(...args);

test("raw video transcript retention through HTTP and SQLite", { timeout: 120_000 }, async (t) => {
  const core = await import("../../src/lib/db/core.ts");
  const providers = await import("../../src/lib/db/providers.ts");
  const keys = await import("../../src/lib/db/apiKeys.ts");
  const settings = await import("../../src/lib/db/settings.ts");
  const readCache = await import("../../src/lib/db/readCache.ts");
  const logs = await import("../../src/lib/usage/callLogs.ts");
  const pending = await import("../../src/lib/usage/usageHistory.ts");
  const registry = await import("../../src/lib/guardrails/registry.ts");
  const { VideoBridgeGuardrail } = await import("../../src/lib/guardrails/videoBridge.ts");
  const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
  const pressure = await import("../../open-sse/utils/resourcePressure.ts");
  globalThis.fetch = (...args) => upstream(...args);
  const pressureFixture = pressure.reloadResourcePressureRuntime({
    heapThresholdMb: 10_000,
    immediateHeapUsedMb: () => 1,
    immediateRssUsedMb: () => 1,
  });
  let server: Awaited<ReturnType<typeof serveRetentionRoutes>>;
  t.after(async () => {
    await logs.closeCallLogSaves(10_000);
    await server?.close();
    pressureFixture.dispose();
    core.closeDbInstance({ checkpointMode: null });
    globalThis.fetch = originalFetch;
    setGlobalDispatcher(originalDispatcher);
    await networkGuard.close();
    Socket.prototype.connect = originalConnect;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });
  await providers.createProviderConnection({
    provider: "moonshot",
    authType: "apikey",
    name: "synthetic raw video",
    apiKey: "sk-fixture-only-12430",
    isActive: true,
    testStatus: "active",
  });
  const key = await keys.createApiKey("raw-video-fixture", "raw-video-machine");
  await settings.updateSettings({
    call_log_pipeline_enabled: true,
    modalityBridgeVideoEnabled: true,
    modalityBridgeVideoModel: "openai/gpt-4.1-mini",
    modalityBridgeVideoMaxVideos: 1,
    modalityBridgeCacheEnabled: false,
  });
  readCache.invalidateDbCache();
  registry.registerDefaultGuardrails();
  server = await serveRetentionRoutes({ "/v1/chat/completions": chatRoute.POST });
  allowedPort = Number(new URL(server.url).port);
  networkGuard.enableNetConnect(new URL(server.url).host);
  await assert.rejects(httpFetch("https://raw-video-egress-blocked.invalid/"), /fetch failed/);

  async function exercise(
    content: Record<string, unknown>[],
    sensitive: string[],
    failDescription: boolean,
    renderedTranscript?: string
  ) {
    let descriptionCalls = 0;
    registry.guardrailRegistry.register(
      new VideoBridgeGuardrail({
        deps: {
          getCapabilities: () => ({ supportsVideo: null }),
          describePart: async () => {
            descriptionCalls++;
            if (failDescription) throw new Error("synthetic description failure");
            return {
              description: renderedTranscript
                ? `[Video description: ${renderedTranscript}]`
                : "[Video description: ordinary visual caption]",
              ...(renderedTranscript
                ? {
                    descriptionRedacted: "[Video description: [redacted-video-transcript]]",
                    transcriptCues: [
                      {
                        text: renderedTranscript,
                        source: "client" as const,
                        confidence: 1,
                        startSeconds: 0,
                        endSeconds: 1,
                      },
                    ],
                  }
                : {}),
              durationSeconds: 2,
              framesRequested: 1,
              framesUsed: 1,
            };
          },
        },
      })
    );
    const body = {
      model: "moonshot/kimi-k2.5",
      stream: false,
      messages: [{ role: "user", content }],
    };
    const before = JSON.stringify(body);
    let release!: () => void;
    let reached!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const ready = new Promise<void>((resolve) => {
      reached = resolve;
    });
    let upstreamBody = "";
    let dispatches = 0;
    upstream = async (input, init) => {
      const request = input instanceof Request ? input : new Request(input, init);
      assert.match(new URL(request.url).hostname, /^api\.moonshot\.(ai|cn)$/);
      upstreamBody = await request.text();
      dispatches++;
      reached();
      await gate;
      return syntheticReply("ordinary reply", false);
    };
    const responsePromise = httpFetch(server.url + "/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key.key}`,
        "x-correlation-id": randomUUID(),
      },
      body: before,
    });
    let snapshot: unknown;
    let correlationId: string | null = null;
    try {
      await Promise.race([
        ready,
        responsePromise.then(async (response) => {
          if (response.status < 400) return new Promise<never>(() => {});
          throw new Error(
            `route returned before upstream: ${response.status} ${(await response.text()).slice(0, 160)}`
          );
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("upstream not reached")), 15_000).unref()
        ),
      ]);
      const rows = [...pending.getPendingById().values()];
      assert.equal(rows.length, 1);
      correlationId = rows[0].correlationId ?? null;
      snapshot = structuredClone(rows);
    } finally {
      release();
    }
    const response = await responsePromise;
    assert.equal(response.status, 200, await response.text());
    assert.equal(dispatches, 1);
    assert.equal(JSON.stringify(body), before, "caller-owned body stays intact");
    for (const value of sensitive)
      assert(upstreamBody.includes(value), "raw video transcript reaches model");
    if (failDescription)
      assert.deepEqual(
        JSON.parse(upstreamBody).messages[0].content,
        content,
        "failed description preserves the exact live video part, including transcript fields"
      );
    const detail = await eventually(async () => {
      await logs.waitForCallLogSaves(10_000);
      const rows = await logs.getCallLogs({ correlationId, limit: 5 });
      return rows[0]?.id ? logs.getCallLogById(rows[0].id) : null;
    });
    assert(detail);
    const row = core
      .getDbInstance()
      .prepare("SELECT video_content_removed, artifact_relpath FROM call_logs WHERE id = ?")
      .get(detail.id) as { video_content_removed: number; artifact_relpath: string | null };
    const artifact = row.artifact_relpath
      ? fs.readFileSync(path.join(dataDir, "call_logs", row.artifact_relpath), "utf8")
      : "";
    return {
      snapshot: JSON.stringify(snapshot),
      detail: JSON.stringify(detail),
      row,
      artifact,
      upstreamBody,
      descriptionCalls,
    };
  }

  await t.test("ordinary non-video transcript metadata stays live and retained", async () => {
    const ordinary = "ORDINARY_NON_VIDEO_12430";
    const result = await exercise(
      [{ type: "text", text: ordinary, transcript: ordinary }],
      [],
      false
    );
    assert.equal(result.descriptionCalls, 0);
    assert.equal(result.row.video_content_removed, 0);
    assert(result.upstreamBody.includes(ordinary));
    assert(result.snapshot.includes(ordinary));
    assert(result.detail.includes(ordinary));
  });

  await t.test("failed video without transcript fields preserves ordinary retention", async () => {
    const ordinary = "ORDINARY_VIDEO_NO_TRANSCRIPT_12430";
    const result = await exercise(
      [
        { type: "text", text: ordinary, transcript: "ordinary text metadata" },
        { type: "video_url", video_url: { url: "data:video/mp4;base64,QUJD" } },
      ],
      [],
      true
    );
    assert.equal(result.descriptionCalls, 1);
    assert.equal(result.row.video_content_removed, 0);
    assert(result.detail.includes(ordinary));
    assert(result.detail.includes("ordinary text metadata"));
  });

  await t.test(
    "defined empty and null video transcript fields conservatively activate retention protection",
    async () => {
      for (const empty of [null, ""]) {
        const result = await exercise(
          [
            { type: "text", text: "Describe this scene." },
            {
              type: "video_url",
              video_url: { url: "data:video/mp4;base64,QUJD" },
              transcript: empty,
              audioTranscript: empty,
            },
          ],
          [],
          true
        );
        assert.equal(result.descriptionCalls, 1);
        assert.equal(result.row.video_content_removed, 1);
        assert(result.detail.includes("video-transcript"));
      }
    }
  );

  await t.test(
    "failed description with unknown native capability keeps raw transcript live but not retained",
    async () => {
      const transcript = "PRIVATE_FAILED_TRANSCRIPT_12430";
      const audio = "PRIVATE_FAILED_AUDIO_12430";
      const result = await exercise(
        [
          { type: "text", text: "Describe the scene." },
          {
            type: "video_url",
            video_url: { url: "data:video/mp4;base64,QUJD" },
            transcript: { cues: [{ text: transcript, start: 0, end: 1, source: "client" }] },
            audioTranscript: { cues: [{ text: audio, start: 0, end: 1, source: "client" }] },
          },
        ],
        [transcript, audio],
        true
      );
      assert.equal(result.descriptionCalls, 1, "failure happened inside the real Video Bridge");
      const leaked = ["snapshot", "detail", "artifact"].filter((sink) =>
        [transcript, audio].some((value) => result[sink].includes(value))
      );
      assert.deepEqual(leaked, [], "retained sinks must remove raw video transcript fields");
      assert.equal(result.row.video_content_removed, 1);
    }
  );

  await t.test(
    "maxVideos keeps the raw sibling live while redacting it beside a successful shadow",
    async () => {
      const rendered = "PRIVATE_RENDERED_12430";
      const raw = "PRIVATE_OVER_LIMIT_12430";
      const rawPart = {
        type: "video_url",
        video_url: {
          url: "data:video/mp4;base64,REVG",
          audioTranscript: { cues: [{ text: raw, start: 0, end: 1, source: "client" }] },
        },
      };
      const result = await exercise(
        [
          { type: "text", text: "Describe both scenes." },
          {
            type: "video_url",
            video_url: { url: "data:video/mp4;base64,QUJD" },
            transcript: { cues: [{ text: rendered, start: 0, end: 1, source: "client" }] },
          },
          rawPart,
        ],
        [rendered, raw],
        false,
        rendered
      );
      assert.equal(result.descriptionCalls, 1, "maxVideos must prevent the second description");
      assert.deepEqual(
        JSON.parse(result.upstreamBody).messages[0].content[2],
        rawPart,
        "the over-limit part sent to the provider is not edited for logging"
      );
      const leaked = ["snapshot", "detail", "artifact"].filter((sink) =>
        [rendered, raw].some((value) => result[sink].includes(value))
      );
      assert.deepEqual(
        leaked,
        [],
        "both rendered and raw sibling transcripts must be removed from retained copies"
      );
      assert.equal(result.row.video_content_removed, 1);
      assert(result.detail.includes("[redacted-video-transcript]"));
    }
  );
});
