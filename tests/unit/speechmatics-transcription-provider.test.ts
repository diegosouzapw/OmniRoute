// #6659 — Speechmatics STT provider: async batch workflow (submit multipart
// job → poll → fetch transcript), mirroring the existing AssemblyAI/Rev AI
// adapters. Streaming (WebSocket) mode is explicitly out of scope for v1.
import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");
const { getTranscriptionProvider } = await import("../../open-sse/config/audioRegistry.ts");

function buildFile(contents: string, name: string, type: string) {
  return new File([Buffer.from(contents)], name, { type });
}

function immediateTimeout(callback: (...args: unknown[]) => void, _ms?: number, ...args: unknown[]) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

test("speechmatics registry entry is async, apikey-bearer, batch-only", () => {
  const provider = getTranscriptionProvider("speechmatics");
  assert.ok(provider);
  assert.equal(provider?.authType, "apikey");
  assert.equal(provider?.authHeader, "bearer");
  assert.equal(provider?.async, true);
  assert.equal(provider?.format, "speechmatics");
  assert.ok(provider?.models.some((m) => m.id === "enhanced"));
});

test("handleAudioTranscription routes Speechmatics: submit job → poll → fetch transcript", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls: { url: string; method: string }[] = [];

  // @ts-expect-error test double swaps the timer signature intentionally
  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = (async (url: string, options: RequestInit = {}) => {
    const stringUrl = String(url);
    calls.push({ url: stringUrl, method: (options?.method as string) || "GET" });

    if (stringUrl === "https://asr.api.speechmatics.com/v2/jobs") {
      assert.equal(options.method, "POST");
      assert.equal((options.headers as Record<string, string>).Authorization, "Bearer sm-key");
      return new Response(JSON.stringify({ id: "job-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "https://asr.api.speechmatics.com/v2/jobs/job-1") {
      return new Response(JSON.stringify({ job: { status: "done" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "https://asr.api.speechmatics.com/v2/jobs/job-1/transcript?format=txt") {
      return new Response("speechmatics result", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  try {
    const formData = new FormData();
    formData.append("model", "speechmatics/enhanced");
    formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "sm-key" },
    });

    assert.deepEqual(await response.json(), { text: "speechmatics result" });
    assert.deepEqual(
      calls.map((entry) => entry.url),
      [
        "https://asr.api.speechmatics.com/v2/jobs",
        "https://asr.api.speechmatics.com/v2/jobs/job-1",
        "https://asr.api.speechmatics.com/v2/jobs/job-1/transcript?format=txt",
      ]
    );
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleAudioTranscription returns an error when Speechmatics rejects the job", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;

  // @ts-expect-error test double swaps the timer signature intentionally
  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = (async (url: string, options: RequestInit = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://asr.api.speechmatics.com/v2/jobs") {
      return new Response(JSON.stringify({ id: "job-2" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl === "https://asr.api.speechmatics.com/v2/jobs/job-2") {
      return new Response(
        JSON.stringify({ job: { status: "rejected", errors: [{ message: "bad audio" }] } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl} (${options.method})`);
  }) as typeof fetch;

  try {
    const formData = new FormData();
    formData.append("model", "speechmatics/enhanced");
    formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "sm-key" },
    });
    const payload = (await response.json()) as { error: { message: string } };

    assert.equal(response.status, 500);
    assert.equal(payload.error.message, "bad audio");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleAudioTranscription requires credentials for Speechmatics", async () => {
  const formData = new FormData();
  formData.append("model", "speechmatics/enhanced");
  formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

  const response = await handleAudioTranscription({ formData, credentials: null });
  const payload = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 401);
  assert.match(payload.error.message, /speechmatics/);
});
