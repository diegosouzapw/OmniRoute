// Regression: no client-supplied parameter reached Soniox. handleSonioxTranscription
// took no formData, the job body was a fixed three-key object, and the transcript was
// reduced to { text } — so `enable_speaker_diarization` was accepted with a 200 and
// silently dropped, and the per-token `speaker` attribution Soniox returns was thrown
// away. Diarization and `context` were both unreachable through the gateway.
//
// The default contract is load-bearing: a caller sending no options must still get
// exactly { text } and must still produce the same three-key job body, because that
// is what tests/unit/audio-soniox-provider.test.ts asserts with strict deep equality
// and what every existing client parses.
import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

function buildFile() {
  return new File([Buffer.from("abc")], "clip.wav", { type: "audio/wav" });
}

// A two-speaker exchange with a mid-turn token split, so grouping is actually exercised.
const TOKENS = [
  { text: "سلام", start_ms: 0, end_ms: 500, speaker: "1", language: "fa" },
  { text: " وقت بخیر", start_ms: 500, end_ms: 1200, speaker: "1", language: "fa" },
  { text: "بله", start_ms: 1300, end_ms: 1800, speaker: "2", language: "fa" },
  { text: " بفرمایید", start_ms: 1800, end_ms: 2400, speaker: "2", language: "fa" },
  { text: "ممنون", start_ms: 2500, end_ms: 3000, speaker: "1", language: "fa" },
];

/** Runs the handler against a stubbed Soniox and returns the job body + parsed response. */
async function runSoniox(fields: Record<string, string | string[]>) {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let jobBody: Record<string, unknown> = {};

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options: { body?: unknown } = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.soniox.com/v1/files") return Response.json({ id: "file-1" });
    if (stringUrl === "https://api.soniox.com/v1/transcriptions") {
      jobBody = JSON.parse(String(options.body || "{}"));
      return Response.json({ id: "job-1" });
    }
    if (stringUrl === "https://api.soniox.com/v1/transcriptions/job-1")
      return Response.json({ status: "completed" });
    return Response.json({ tokens: TOKENS });
  };

  try {
    const formData = new FormData();
    formData.append("model", "soniox/stt-async-v5");
    formData.append("file", buildFile());
    for (const [key, value] of Object.entries(fields)) {
      for (const item of Array.isArray(value) ? value : [value]) formData.append(key, item);
    }
    const response = await handleAudioTranscription({
      formData,
      credentials: { apiKey: "soniox-key" },
    });
    return { jobBody, status: response.status, payload: await response.json() };
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
}

test("no options: job body and response shape are unchanged", async () => {
  const { jobBody, payload } = await runSoniox({});
  assert.deepEqual(jobBody, {
    model: "stt-async-v5",
    file_id: "file-1",
    enable_language_identification: true,
  });
  assert.deepEqual(Object.keys(payload), ["text"]);
  assert.equal(payload.text, "سلام وقت بخیربله بفرماییدممنون");
});

test("diarization reaches Soniox and speaker attribution reaches the client", async () => {
  const { jobBody, payload } = await runSoniox({ enable_speaker_diarization: "true" });
  assert.equal(jobBody.enable_speaker_diarization, true);
  assert.ok(Array.isArray(payload.segments));
  assert.deepEqual(
    payload.segments.map((s) => [s.speaker, s.text]),
    [
      ["1", "سلام وقت بخیر"],
      ["2", "بله بفرمایید"],
      ["1", "ممنون"],
    ]
  );
  // More than one distinct label — the classic wrong "fix" applies one label to everything.
  assert.equal(new Set(payload.segments.map((s) => s.speaker)).size, 2);
});

test("segment boundaries carry real timings, in seconds", async () => {
  const { payload } = await runSoniox({ diarization: "true" });
  assert.deepEqual(payload.segments[0], {
    id: 0,
    start: 0,
    end: 1.2,
    text: "سلام وقت بخیر",
    speaker: "1",
  });
  assert.equal(payload.segments[1].start, 1.3);
  assert.equal(payload.duration, 3);
  assert.equal(payload.language, "fa");
  assert.equal(payload.text, "سلام وقت بخیربله بفرماییدممنون");
});

test("diarization is accepted under all three spellings callers use", async () => {
  for (const key of ["enable_speaker_diarization", "diarization", "speaker_labels"]) {
    const { jobBody } = await runSoniox({ [key]: "true" });
    assert.equal(jobBody.enable_speaker_diarization, true, `spelling ${key} was dropped`);
  }
  // ...and only for truthy values.
  const off = await runSoniox({ diarization: "false" });
  assert.ok(!("enable_speaker_diarization" in off.jobBody));
  assert.deepEqual(Object.keys(off.payload), ["text"]);
});

test("context reaches Soniox verbatim without changing the response contract", async () => {
  const { jobBody, payload } = await runSoniox({ context: "سانیتل، بانک رفاه" });
  assert.equal(jobBody.context, "سانیتل، بانک رفاه");
  // context alone is not a shape change — the caller did not ask for segments.
  assert.deepEqual(Object.keys(payload), ["text"]);
});

test("language becomes a Soniox language hint", async () => {
  const { jobBody } = await runSoniox({ language: "fa" });
  assert.deepEqual(jobBody.language_hints, ["fa"]);
  assert.equal(jobBody.enable_language_identification, true);
});

test("response_format=verbose_json alone yields segments without requesting diarization", async () => {
  const { jobBody, payload } = await runSoniox({ response_format: "verbose_json" });
  assert.ok(!("enable_speaker_diarization" in jobBody));
  assert.equal(payload.task, "transcribe");
  assert.ok(Array.isArray(payload.segments));
});

test("timestamp_granularities[]=word adds per-word timings", async () => {
  const { payload } = await runSoniox({
    diarization: "true",
    "timestamp_granularities[]": ["word"],
  });
  assert.equal(payload.words.length, TOKENS.length);
  assert.deepEqual(payload.words[0], { word: "سلام", start: 0, end: 0.5, speaker: "1" });
});

test("tokens without speaker labels still produce segments, with no speaker key", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.soniox.com/v1/files") return Response.json({ id: "file-1" });
    if (stringUrl === "https://api.soniox.com/v1/transcriptions")
      return Response.json({ id: "job-1" });
    if (stringUrl === "https://api.soniox.com/v1/transcriptions/job-1")
      return Response.json({ status: "completed" });
    return Response.json({
      tokens: [
        { text: "one ", start_ms: 0, end_ms: 100 },
        { text: "two", start_ms: 100, end_ms: 200 },
      ],
    });
  };
  try {
    const formData = new FormData();
    formData.append("model", "soniox/stt-async-v5");
    formData.append("file", buildFile());
    formData.append("response_format", "verbose_json");
    const response = await handleAudioTranscription({ formData, credentials: { apiKey: "k" } });
    const payload = await response.json();
    assert.equal(payload.segments.length, 1);
    assert.ok(!("speaker" in payload.segments[0]));
    assert.equal(payload.text, "one two");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});
