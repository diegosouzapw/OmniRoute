/**
 * GHSA-3w2r-vvhm-8h85 (Audio / Video Bridge variant) — the modality bridges
 * must not widen the caller API key's reach.
 *
 * The Audio Bridge (and the Video Bridge, which reuses its STT boundary and
 * the Vision Bridge describe call for frames) picked the STT / vision model
 * from ALL usable credentials and called OmniRoute's own /v1 routes through a
 * self-loop authenticated with the internal bearer — an unrestricted
 * identity. A key restricted by allowedModels / blockedModels /
 * allowedConnections therefore had its audio (or video frames) sent to a
 * model / connection it may not use. On top of that, /v1/audio/transcriptions
 * itself never applied the key's allowedConnections when it resolved
 * credentials, so even a direct call with a connection-scoped key was served
 * by any connection of the provider.
 *
 * The bridges now filter every candidate by the key's policy with the same
 * scope the Vision Bridge uses (#16481, `visionBridgeKeyScope`), pass the
 * request through unchanged when no allowed candidate exists, and carry the
 * caller key id on the self-loop (`x-omniroute-self-loop-key-id`, honored only
 * with the self-loop bearer). The transcription route bounds credential
 * selection by the effective key's allowed connections.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import sharp from "sharp";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-audio-bridge-ghsa-3w2r-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ghsa-3w2r-audio-test-secret";
useDecollidedMigrationsDir();

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { AudioBridgeGuardrail } = await import("../../src/lib/guardrails/audioBridge.ts");
const { callAudioTranscription } = await import("../../src/lib/guardrails/audioBridgeHelpers.ts");
const { VideoBridgeGuardrail } = await import("../../src/lib/guardrails/videoBridge.ts");
const { clearSelectionCache } = await import("../../src/lib/guardrails/visionBridgeRouter.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
const transcriptionRoute = await import("../../src/app/api/v1/audio/transcriptions/route.ts");

/** Header the self-loop uses to scope itself to the caller's API key (#16481). */
const KEY_ID_HEADER = "x-omniroute-self-loop-key-id";

const TEXT_ONLY_MODEL = "example/text-only";

type TranscriptionCall = { part: unknown; config: Record<string, unknown> };
type CredentialOptions = { allowedConnectionIds?: string[] | null };

function audioPayload(): Record<string, unknown> {
  return {
    model: TEXT_ONLY_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "input_audio", input_audio: { data: "UklGRg==", format: "wav" } },
          { type: "text", text: "What was said?" },
        ],
      },
    ],
  };
}

function audioGuardrail(
  calls: TranscriptionCall[],
  keyScopeDeps: Record<string, unknown>,
  configuredModel = "auto",
  supportsAudio: boolean | null = false
) {
  return new AudioBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeAudioEnabled: true,
        modalityBridgeAudioModel: configuredModel,
        modalityBridgeCacheEnabled: false,
      }),
      getCapabilities: () => ({ supportsAudio }),
      // Every STT model has credentials on this instance — the key policy is
      // the only thing that may narrow the candidate pool.
      hasUsableCredentials: async () => true,
      callTranscription: async (part, config) => {
        calls.push({ part, config: config as unknown as Record<string, unknown> });
        return "hello from the clip";
      },
      keyScope: keyScopeDeps,
    },
  });
}

/**
 * Key-scope seams: the model policy is evaluated against a known key secret,
 * and (as in the bridge deps) every STT model has a usable connection.
 */
function modelPolicyDeps(isAllowed: (model: string) => boolean) {
  return {
    getKeySecret: async () => "sk-ghsa-3w2r-key-secret",
    isModelAllowed: async (_secret: string, model: string) => isAllowed(model),
    hasUsableCredentials: async () => true,
  };
}

function keyScopeOf(config: Record<string, unknown>): { apiKeyId?: string } | undefined {
  return config.keyScope as { apiKeyId?: string } | undefined;
}

test.beforeEach(() => clearSelectionCache());

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── Audio Bridge guardrail ──────────────────────────────────────────────────

test("GHSA-3w2r audio: transcription never uses an STT model outside the key's allowedModels", async () => {
  const calls: TranscriptionCall[] = [];
  const guardrail = audioGuardrail(
    calls,
    modelPolicyDeps((model) => model.startsWith("groq/"))
  );

  const result = await guardrail.preCall(audioPayload(), {
    model: TEXT_ONLY_MODEL,
    apiKeyInfo: { id: "key-groq-only", allowedModels: ["groq/*"] },
  });

  assert.equal(calls.length, 1, "the clip is still transcribed by an allowed model");
  assert.ok(
    String(calls[0].config.model).startsWith("groq/"),
    `STT model ${String(calls[0].config.model)} must be allowed for the key`
  );
  assert.equal(
    keyScopeOf(calls[0].config)?.apiKeyId,
    "key-groq-only",
    "the transcription call carries the caller key scope"
  );
  assert.equal(result.meta?.clipsProcessed, 1);
});

test("GHSA-3w2r audio: a configured STT model the key may not use is never called", async () => {
  const calls: TranscriptionCall[] = [];
  const guardrail = audioGuardrail(
    calls,
    modelPolicyDeps((model) => model.startsWith("groq/")),
    "deepgram/nova-3"
  );

  const result = await guardrail.preCall(audioPayload(), {
    model: TEXT_ONLY_MODEL,
    apiKeyInfo: { id: "key-groq-only-fixed", allowedModels: ["groq/*"] },
  });

  assert.equal(calls.length, 0, "the operator's STT model is outside the key's policy");
  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined, "payload passes through unchanged");
});

test("GHSA-3w2r audio: no allowed STT model passes the request through unchanged", async () => {
  const calls: TranscriptionCall[] = [];
  const guardrail = audioGuardrail(
    calls,
    modelPolicyDeps(() => false)
  );

  const result = await guardrail.preCall(audioPayload(), {
    model: TEXT_ONLY_MODEL,
    apiKeyInfo: { id: "key-blocked", blockedModels: ["*"] },
  });

  assert.equal(calls.length, 0, "no transcription call may be made on behalf of the key");
  assert.equal(result.block, false, "fail-open: the request is not blocked");
  assert.equal(result.modifiedPayload, undefined, "payload passes through unchanged");
  assert.equal(result.meta?.skippedByKeyPolicy, true);
});

test("GHSA-3w2r audio: STT selection stays on the key's connections and the call carries the key", async () => {
  const calls: TranscriptionCall[] = [];
  const guardrail = audioGuardrail(calls, {
    // Only groq has a usable connection inside the key's scope.
    hasUsableCredentials: async (model: string, options: CredentialOptions = {}) =>
      options.allowedConnectionIds?.includes("conn-A") ? model.startsWith("groq/") : true,
  });

  await guardrail.preCall(audioPayload(), {
    model: TEXT_ONLY_MODEL,
    apiKeyInfo: { id: "key-conn-A", allowedConnections: ["conn-A"] },
  });

  assert.equal(calls.length, 1);
  assert.ok(String(calls[0].config.model).startsWith("groq/"), `got ${calls[0].config.model}`);
  assert.equal(
    keyScopeOf(calls[0].config)?.apiKeyId,
    "key-conn-A",
    "the transcription self-loop is scoped to the caller key"
  );
});

test("GHSA-3w2r audio: an unrestricted key keeps the configured STT model", async () => {
  const calls: TranscriptionCall[] = [];
  const guardrail = audioGuardrail(
    calls,
    {
      isModelAllowed: async () => {
        throw new Error("an unrestricted key must not consult the key policy");
      },
    },
    "deepgram/nova-3"
  );

  await guardrail.preCall(audioPayload(), {
    model: TEXT_ONLY_MODEL,
    apiKeyInfo: { id: "key-open" },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].config.model, "deepgram/nova-3");
  assert.equal(calls[0].config.keyScope, undefined);
});

test("GHSA-3w2r audio: the transcription self-loop sends the caller key id header", async () => {
  const captured: Array<Record<string, string>> = [];
  const fetchImpl = (async (_url: string, init: RequestInit) => {
    captured.push(init.headers as Record<string, string>);
    return new Response(JSON.stringify({ text: "scoped" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as unknown as typeof fetch;

  const part = {
    messageIndex: 0,
    partIndex: 0,
    ref: "data:audio/wav;base64,UklGRg==",
    shape: "input_audio" as const,
    format: "wav",
  };
  const scoped = await callAudioTranscription(
    part,
    {
      model: "groq/whisper-large-v3",
      timeoutMs: 5_000,
      keyScope: {
        apiKeyId: "key-under-test",
        cacheScope: "key-under-test:scope",
        hasUsableCredentials: async () => true,
      },
    },
    { fetchImpl, getPort: () => 20128, getBearer: () => "self-loop-bearer" }
  );
  const unscoped = await callAudioTranscription(
    part,
    { model: "groq/whisper-large-v3", timeoutMs: 5_000 },
    { fetchImpl, getPort: () => 20128, getBearer: () => "self-loop-bearer" }
  );

  assert.equal(scoped, "scoped");
  assert.equal(unscoped, "scoped");
  assert.equal(captured[0][KEY_ID_HEADER], "key-under-test");
  assert.equal(captured[1][KEY_ID_HEADER], undefined, "an unscoped call sends no key id header");
});

// ── Video Bridge (frames via vision describe + STT via audio boundary) ──────

for (const drilldown of [false, true]) {
  test(`GHSA-3w2r video: frame describe and STT stay in key scope with drilldown=${drilldown}`, async (t) => {
    const { getSharedVideoDrilldownLifecycle } =
      await import("../../src/lib/guardrails/videoBridgeDrilldownStore.ts");
    t.after(() => getSharedVideoDrilldownLifecycle().clearAll());
    const jpeg = await sharp({ create: { width: 64, height: 64, channels: 3, background: "blue" } })
      .jpeg()
      .toBuffer();
    const visionCalls: Array<Record<string, unknown>> = [];
    const sttCalls: Array<Record<string, unknown>> = [];
    const guardrail = new VideoBridgeGuardrail({
      deps: {
        getSettings: async () => ({
          modalityBridgeVideoEnabled: true,
          modalityBridgeVideoDrilldownEnabled: true,
          modalityBridgeVideoAudioTranscriptionEnabled: true,
          modalityBridgeAudioEnabled: true,
          modalityBridgeAudioModel: "auto",
          modalityBridgeVisionModel: "openai/gpt-4o-mini",
          modalityBridgeCacheEnabled: false,
        }),
        getCapabilities: () => ({ supportsVideo: false as const }),
        hasUsableCredentials: async () => true,
        keyScope: {
          // Only gemini (vision) and groq (STT) have a usable connection in scope.
          hasUsableCredentials: async (model: string, options: CredentialOptions = {}) =>
            options.allowedConnectionIds?.includes("conn-A")
              ? model.startsWith("gemini/") || model.startsWith("groq/")
              : true,
        },
        extractAudio: async () => ({
          audio: { channels: 1, dataUri: "data:audio/wav;base64,UklGRg==", sampleRateHz: 16000 },
          durationSeconds: 2,
        }),
        transcribeAudio: async (_part, config) => {
          sttCalls.push(config as unknown as Record<string, unknown>);
          return { text: "spoken words" };
        },
        extractFrames: async () => ({
          durationSeconds: 2,
          frames: [
            { dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 1 },
          ],
        }),
        callVisionModel: async (_image, config) => {
          visionCalls.push(config as unknown as Record<string, unknown>);
          return "a blue screen";
        },
      },
    });

    const result = await guardrail.preCall(
      {
        model: TEXT_ONLY_MODEL,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "input_video",
                video_url: `data:video/mp4;base64,${Buffer.from("ghsa-3w2r-video").toString("base64")}`,
                audioTranscription: true,
                drilldown,
              },
              { type: "text", text: "what happens?" },
            ],
          },
        ],
      },
      {
        model: TEXT_ONLY_MODEL,
        apiKeyInfo: { id: "key-video-conn-A", allowedConnections: ["conn-A"] },
      }
    );

    assert.ok(visionCalls.length > 0, "frames are still described by an allowed model");
    for (const config of visionCalls) {
      assert.ok(String(config.model).startsWith("gemini/"), `vision model ${config.model}`);
      assert.equal(keyScopeOf(config)?.apiKeyId, "key-video-conn-A");
    }
    assert.equal(sttCalls.length, 1, "the soundtrack is still transcribed by an allowed model");
    assert.ok(String(sttCalls[0].model).startsWith("groq/"), `STT model ${sttCalls[0].model}`);
    assert.equal(keyScopeOf(sttCalls[0])?.apiKeyId, "key-video-conn-A");
    const handles = result.meta?.videoDrilldownHandles as Array<{ handle: string }> | undefined;
    if (drilldown) {
      assert.equal(handles?.length, 1, "consented retention remains active with key-scoped STT");
      assert.match(handles![0].handle, /^v1\.[A-Za-z0-9_-]{43}$/);
    } else {
      assert.equal(handles, undefined, "operator enablement alone must not retain frames");
    }
  });
}

// ── /v1/audio/transcriptions route ──────────────────────────────────────────

async function seedOpenAiConnection(name: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function wavBlob(): Blob {
  const dataLen = 320;
  const b = Buffer.alloc(44 + dataLen);
  b.write("RIFF", 0, "ascii");
  b.writeUInt32LE(36 + dataLen, 4);
  b.write("WAVE", 8, "ascii");
  b.write("fmt ", 12, "ascii");
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22);
  b.writeUInt32LE(16000, 24);
  b.writeUInt32LE(32000, 28);
  b.writeUInt16LE(2, 32);
  b.writeUInt16LE(16, 34);
  b.write("data", 36, "ascii");
  b.writeUInt32LE(dataLen, 40);
  return new Blob([b], { type: "audio/wav" });
}

function transcriptionRequest(bearer: string, extraHeaders: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set("model", "openai/whisper-1");
  fd.set("file", wavBlob(), "clip.wav");
  return new Request("http://localhost/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${bearer}`, ...extraHeaders },
    body: fd,
  });
}

/** Captures the upstream Authorization header of every provider call. */
function stubUpstream() {
  const originalFetch = globalThis.fetch;
  const upstreamAuth: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    upstreamAuth.push(new Headers(init.headers).get("authorization") ?? "");
    return new Response(JSON.stringify({ text: "upstream transcript" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return { upstreamAuth, restore: () => (globalThis.fetch = originalFetch) };
}

const DEAD_CONNECTION_ID = "00000000-0000-4000-8000-00000000dead";

test("GHSA-3w2r route: transcriptions honor the key's allowedConnections", async () => {
  // B is created first, so it would win an unrestricted pool selection.
  const connB = await seedOpenAiConnection("route-conn-B", "sk-openai-connection-B");
  const connA = await seedOpenAiConnection("route-conn-A", "sk-openai-connection-A");
  const key = await apiKeysDb.createApiKey("audio-restricted-to-A", "machine-ghsa-3w2r", [], {
    allowedConnections: [connA.id],
  });
  const disjointKey = await apiKeysDb.createApiKey("audio-elsewhere", "machine-ghsa-3w2r", [], {
    allowedConnections: [DEAD_CONNECTION_ID],
  });
  assert.notEqual(connA.id, connB.id);

  const upstream = stubUpstream();
  try {
    for (let i = 0; i < 3; i++) {
      const response = await transcriptionRoute.POST(transcriptionRequest(key.key));
      assert.equal(response.status, 200, await response.clone().text());
    }
    assert.ok(upstream.upstreamAuth.length > 0, "the transcription still runs via A");
    assert.deepEqual(
      [...new Set(upstream.upstreamAuth)],
      ["Bearer sk-openai-connection-A"],
      "transcription must only use the key's allowed connection"
    );

    upstream.upstreamAuth.length = 0;
    const denied = await transcriptionRoute.POST(transcriptionRequest(disjointKey.key));
    assert.notEqual(denied.status, 200, "no allowed connection → no transcription");
    const deniedBody = await denied.text();
    assert.ok(!deniedBody.includes("at /"), "no stack trace leaks");
    assert.equal(upstream.upstreamAuth.length, 0, "no upstream call outside the key's scope");
  } finally {
    upstream.restore();
  }
});

test("GHSA-3w2r route: the self-loop key id scopes the internal bearer to the caller key", async () => {
  const bearer = resolveSelfLoopBearer();
  const connections = (await providersDb.getProviderConnections({
    provider: "openai",
    isActive: true,
  })) as Array<{ id: string; name?: string }>;
  const connA = connections.find((conn) => conn.name === "route-conn-A");
  assert.ok(connA, "route-conn-A seeded by the previous test");

  const keyA = await apiKeysDb.createApiKey("audio-self-loop-A", "machine-ghsa-3w2r", [], {
    allowedConnections: [connA.id],
  });
  const keyDisjoint = await apiKeysDb.createApiKey(
    "audio-self-loop-dead",
    "machine-ghsa-3w2r",
    [],
    {
      allowedConnections: [DEAD_CONNECTION_ID],
    }
  );
  const keyOpen = await apiKeysDb.createApiKey("audio-self-loop-open", "machine-ghsa-3w2r");
  apiKeysDb.clearApiKeyCaches();

  const upstream = stubUpstream();
  try {
    for (let i = 0; i < 3; i++) {
      const scoped = await transcriptionRoute.POST(
        transcriptionRequest(bearer, { [KEY_ID_HEADER]: keyA.id })
      );
      assert.equal(scoped.status, 200, await scoped.clone().text());
    }
    assert.deepEqual(
      [...new Set(upstream.upstreamAuth)],
      ["Bearer sk-openai-connection-A"],
      "the self-loop stays on the caller key's connection"
    );

    upstream.upstreamAuth.length = 0;
    const disjoint = await transcriptionRoute.POST(
      transcriptionRequest(bearer, { [KEY_ID_HEADER]: keyDisjoint.id })
    );
    assert.notEqual(disjoint.status, 200);
    assert.ok(!(await disjoint.text()).includes("at /"), "no stack trace leaks");
    assert.equal(upstream.upstreamAuth.length, 0, "a disjoint key scope admits no connection");

    // A client key cannot use the header to switch to another (wider) key's scope.
    upstream.upstreamAuth.length = 0;
    for (let i = 0; i < 3; i++) {
      const widened = await transcriptionRoute.POST(
        transcriptionRequest(keyA.key, { [KEY_ID_HEADER]: keyOpen.id })
      );
      assert.equal(widened.status, 200, await widened.clone().text());
    }
    assert.deepEqual([...new Set(upstream.upstreamAuth)], ["Bearer sk-openai-connection-A"]);
  } finally {
    upstream.restore();
  }
});
