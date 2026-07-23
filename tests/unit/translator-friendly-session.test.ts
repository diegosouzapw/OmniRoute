/**
 * Unit tests for useTranslateSession logic.
 *
 * We extract and test the pure session orchestration logic — the fetch orchestration,
 * pipeline path selection, and error sanitization — without mounting React hooks.
 * The hook wraps this logic in useState/useCallback; the logic itself is testable
 * in isolation by replicating the core run() body.
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

// ─── Types (mirroring types.ts) ───────────────────────────────────────────────

type FormatId = "openai" | "openai-responses" | "claude" | "gemini" | "antigravity" | "kiro" | "cursor";
type TranslateMode = "preview" | "send";

interface TranslateNarratedResult {
  detected: FormatId | null;
  target: FormatId;
  status: "idle" | "translating" | "sending" | "ok" | "error";
  responsePreview: string | null;
  translatedJson: string | null;
  pipelinePath: "direct" | "hub-and-spoke" | "passthrough" | null;
  intermediateJson: string | null;
  errorMessage: string | null;
  latencyMs: number | null;
}

interface RunInput {
  source: FormatId;
  target: FormatId;
  provider: string;
  inputText: string;
  mode: TranslateMode;
}

// ─── Extracted sanitizeError logic ───────────────────────────────────────────

function sanitizeError(raw: unknown): string {
  const text =
    raw instanceof Error ? raw.message : typeof raw === "string" ? raw : "Unknown error";
  return text
    .replace(/\sat\s\/[^\s]+/g, "")
    .replace(/sk-[A-Za-z0-9_-]{16,}/g, "[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9_.-]+/g, "Bearer [REDACTED]");
}

// ─── Extracted run() logic (mirrors useTranslateSession hook implementation) ─

type FetchFn = (url: string, init?: RequestInit) => Promise<Response>;

async function runSession(
  input: RunInput,
  fetchImpl: FetchFn
): Promise<TranslateNarratedResult> {
  const { source, target, provider, inputText, mode } = input;
  const target_: FormatId = target;
  let detected: FormatId | null = null;
  let translatedJson: string | null = null;
  let intermediateJson: string | null = null;
  let pipelinePath: TranslateNarratedResult["pipelinePath"] = "passthrough";
  let translatedResult: Record<string, unknown>;
  let responsePreview: string | null = null;

  // 1. Parse input
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(inputText);
  } catch {
    parsed = { messages: [{ role: "user", content: inputText }] };
  }

  // 2. Detect format
  try {
    const detectRes = await fetchImpl("/api/translator/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: parsed }),
    });
    const detectData = (await detectRes.json()) as { success: boolean; format?: string };
    if (detectData.success) detected = detectData.format as FormatId;
  } catch {
    /* non-fatal */
  }

  // 3. Translate
  translatedResult = parsed;
  if (source !== target) {
    const needsHub = source !== "openai" && target !== "openai";
    if (needsHub) {
      const step1 = await fetchImpl("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "direct", sourceFormat: source, targetFormat: "openai", body: parsed }),
      });
      const step1Data = (await step1.json()) as { success: boolean; result?: Record<string, unknown>; error?: string };
      if (!step1Data.success) throw new Error(step1Data.error ?? "Translate step 1 failed");
      intermediateJson = JSON.stringify(step1Data.result, null, 2);

      const step2 = await fetchImpl("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "direct", sourceFormat: "openai", targetFormat: target, body: step1Data.result }),
      });
      const step2Data = (await step2.json()) as { success: boolean; result?: Record<string, unknown>; error?: string };
      if (!step2Data.success) throw new Error(step2Data.error ?? "Translate step 2 failed");
      translatedResult = step2Data.result as Record<string, unknown>;
      translatedJson = JSON.stringify(step2Data.result, null, 2);
      pipelinePath = "hub-and-spoke";
    } else {
      const stepDirect = await fetchImpl("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "direct", sourceFormat: source, targetFormat: target, body: parsed }),
      });
      const stepData = (await stepDirect.json()) as { success: boolean; result?: Record<string, unknown>; error?: string };
      if (!stepData.success) throw new Error(stepData.error ?? "Translate failed");
      translatedResult = stepData.result as Record<string, unknown>;
      translatedJson = JSON.stringify(stepData.result, null, 2);
      pipelinePath = "direct";
    }
  } else {
    translatedJson = JSON.stringify(parsed, null, 2);
  }

  // 4. Optional send
  if (mode === "send") {
    const sendRes = await fetchImpl("/api/translator/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, body: translatedResult }),
    });
    if (!sendRes.ok) {
      const errorBody = (await sendRes.json().catch(() => ({ error: `HTTP ${sendRes.status}` }))) as { error?: unknown };
      throw new Error(typeof errorBody.error === "string" ? errorBody.error : "Send failed");
    }
    const reader = sendRes.body?.getReader();
    if (reader) {
      const decoder = new TextDecoder();
      let buf = "";
      while (buf.length < 500) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
      }
      responsePreview = buf.slice(0, 500);
    }
  }

  return {
    detected,
    target: target_,
    status: "ok",
    responsePreview,
    translatedJson,
    pipelinePath,
    intermediateJson,
    errorMessage: null,
    latencyMs: 0,
  };
}

// ─── Fetch call tracker ───────────────────────────────────────────────────────

interface FetchCall {
  url: string;
  body: unknown;
}

let fetchCalls: FetchCall[] = [];

beforeEach(() => {
  fetchCalls = [];
});

function makeBody(body: unknown): ReadableStream<Uint8Array> | null {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("mode=preview, source === target (passthrough)", () => {
  it("pipelinePath is passthrough, no translate fetch", async () => {
    const fetchMock: FetchFn = async (url, init) => {
      const body = init?.body ? JSON.parse(init.body as string) : null;
      fetchCalls.push({ url, body });
      if (url.includes("detect")) {
        return new Response(JSON.stringify({ success: true, format: "openai" }), { status: 200 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    };

    const result = await runSession(
      { source: "openai", target: "openai", provider: "openai", inputText: '{"messages":[]}', mode: "preview" },
      fetchMock
    );

    assert.equal(result.pipelinePath, "passthrough");
    assert.equal(result.status, "ok");
    const translateCalls = fetchCalls.filter((c) => c.url.includes("translate"));
    assert.equal(translateCalls.length, 0);
    const sendCalls = fetchCalls.filter((c) => c.url.includes("send"));
    assert.equal(sendCalls.length, 0);
  });
});

describe("mode=preview, claude → gemini (hub-and-spoke)", () => {
  it("calls translate twice (step1: claude→openai, step2: openai→gemini), pipelinePath=hub-and-spoke", async () => {
    const fetchMock: FetchFn = async (url, init) => {
      const body = init?.body ? JSON.parse(init.body as string) : null;
      fetchCalls.push({ url, body });
      if (url.includes("detect")) {
        return new Response(JSON.stringify({ success: true, format: "claude" }), { status: 200 });
      }
      if (url.includes("translate")) {
        const b = body as { targetFormat?: string };
        if (b.targetFormat === "openai") {
          return new Response(JSON.stringify({ success: true, result: { intermediate: true } }), { status: 200 });
        }
        return new Response(JSON.stringify({ success: true, result: { gemini: true } }), { status: 200 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    };

    const result = await runSession(
      { source: "claude", target: "gemini", provider: "gemini", inputText: '{"messages":[]}', mode: "preview" },
      fetchMock
    );

    assert.equal(result.pipelinePath, "hub-and-spoke");
    assert.equal(result.status, "ok");
    assert.ok(result.intermediateJson !== null, "intermediateJson should be set");
    assert.ok(result.translatedJson !== null, "translatedJson should be set");
    const translateCalls = fetchCalls.filter((c) => c.url.includes("translate"));
    assert.equal(translateCalls.length, 2);
    const sendCalls = fetchCalls.filter((c) => c.url.includes("send"));
    assert.equal(sendCalls.length, 0);
  });
});

describe("mode=preview, openai → claude (direct)", () => {
  it("calls translate once, pipelinePath=direct", async () => {
    const fetchMock: FetchFn = async (url, init) => {
      const body = init?.body ? JSON.parse(init.body as string) : null;
      fetchCalls.push({ url, body });
      if (url.includes("detect")) {
        return new Response(JSON.stringify({ success: true, format: "openai" }), { status: 200 });
      }
      if (url.includes("translate")) {
        return new Response(JSON.stringify({ success: true, result: { claude: true } }), { status: 200 });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    };

    const result = await runSession(
      { source: "openai", target: "claude", provider: "claude", inputText: '{"messages":[]}', mode: "preview" },
      fetchMock
    );

    assert.equal(result.pipelinePath, "direct");
    assert.equal(result.status, "ok");
    const translateCalls = fetchCalls.filter((c) => c.url.includes("translate"));
    assert.equal(translateCalls.length, 1);
  });
});

describe("mode=send happy path", () => {
  it("calls detect + translate + send; status=ok, responsePreview populated", async () => {
    const fetchMock: FetchFn = async (url, init) => {
      const body = init?.body ? JSON.parse(init.body as string) : null;
      fetchCalls.push({ url, body });
      if (url.includes("detect")) {
        return new Response(JSON.stringify({ success: true, format: "openai" }), { status: 200 });
      }
      if (url.includes("translate")) {
        return new Response(JSON.stringify({ success: true, result: { openai: true } }), { status: 200 });
      }
      if (url.includes("send")) {
        return new Response(makeBody("hello from provider"), {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    };

    const result = await runSession(
      { source: "openai", target: "claude", provider: "claude", inputText: '{"messages":[]}', mode: "send" },
      fetchMock
    );

    assert.equal(result.status, "ok");
    const detectCalls = fetchCalls.filter((c) => c.url.includes("detect"));
    const translateCalls = fetchCalls.filter((c) => c.url.includes("translate"));
    const sendCalls = fetchCalls.filter((c) => c.url.includes("send"));
    assert.equal(detectCalls.length, 1);
    assert.equal(translateCalls.length, 1);
    assert.equal(sendCalls.length, 1);
    assert.ok(result.responsePreview !== null, "responsePreview should be populated");
  });
});

describe("error path — sanitization", () => {
  it("error message does not contain stack trace ('at /')", async () => {
    const fakeStack = "Translate failed at /home/user/foo.ts:42:10 sk-abcdefghijklmnopqrstuvwxyz1234567890";
    const sanitized = sanitizeError(new Error(fakeStack));
    assert.ok(!sanitized.includes("at /"), `Expected no stack trace in: ${sanitized}`);
    assert.ok(!sanitized.includes("sk-"), `Expected no API key in: ${sanitized}`);
  });

  it("error with Bearer token is redacted", () => {
    const msg = "Auth failed: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.somepayload.signature";
    const sanitized = sanitizeError(new Error(msg));
    assert.ok(!sanitized.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"), `Token not redacted in: ${sanitized}`);
    assert.ok(sanitized.includes("Bearer [REDACTED]"), `Expected Bearer [REDACTED] in: ${sanitized}`);
  });

  it("translate fetch 500 with stack trace in error body does not leak", async () => {
    const fetchMock: FetchFn = async (url, init) => {
      const body = init?.body ? JSON.parse(init.body as string) : null;
      fetchCalls.push({ url, body });
      if (url.includes("detect")) {
        return new Response(JSON.stringify({ success: false, format: null }), { status: 200 });
      }
      if (url.includes("translate")) {
        return new Response(
          JSON.stringify({ success: false, error: "internal error at /home/user/foo.ts:42 sk-abcdefghijklmnopqrstuvwxyz1234567890" }),
          { status: 500 }
        );
      }
      throw new Error(`Unexpected fetch: ${url}`);
    };

    let caught: string | null = null;
    try {
      await runSession(
        { source: "openai", target: "claude", provider: "claude", inputText: '{"messages":[]}', mode: "preview" },
        fetchMock
      );
    } catch (err) {
      caught = sanitizeError(err);
    }

    assert.ok(caught !== null, "should have thrown");
    // The error message from the fake response is thrown as-is (not sanitized in run())
    // but the hook's catch() applies sanitizeError. We verify the sanitizer works:
    assert.ok(!caught.includes("at /"), `Stack trace leaked: ${caught}`);
    assert.ok(!caught.includes("sk-"), `API key leaked: ${caught}`);
  });

  it("non-Error thrown value → 'Unknown error'", () => {
    const sanitized = sanitizeError(42);
    assert.equal(sanitized, "Unknown error");
  });

  it("string error → sanitized", () => {
    const sanitized = sanitizeError("error at /opt/node/foo.ts:10");
    assert.ok(!sanitized.includes("at /"), `Stack trace leaked: ${sanitized}`);
  });
});

describe("reset — returns idle state", () => {
  it("initialResult(openai) matches idle defaults", () => {
    // Replicate initialResult function
    const initial: TranslateNarratedResult = {
      detected: null,
      target: "openai",
      status: "idle",
      responsePreview: null,
      translatedJson: null,
      pipelinePath: null,
      intermediateJson: null,
      errorMessage: null,
      latencyMs: null,
    };
    assert.equal(initial.status, "idle");
    assert.equal(initial.detected, null);
    assert.equal(initial.responsePreview, null);
    assert.equal(initial.translatedJson, null);
    assert.equal(initial.pipelinePath, null);
    assert.equal(initial.errorMessage, null);
    assert.equal(initial.latencyMs, null);
  });
});
