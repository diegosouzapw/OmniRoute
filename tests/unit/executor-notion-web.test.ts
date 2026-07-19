// Tests for the Notion AI Web executor (#6758) — cookie auth + NDJSON
// transcript-patch parsing for Notion's undocumented runInferenceTranscript
// endpoint. Covers: registry consistency, request/response translation
// against a mocked upstream, and the error-sanitization contract.

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/notion-web.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers/web-cookie.ts");

describe("NotionWebExecutor — registry consistency", () => {
  it("is present in WEB_COOKIE_PROVIDERS with the expected shape", () => {
    const entry = (WEB_COOKIE_PROVIDERS as Record<string, Record<string, unknown>>)["notion-web"];
    assert.ok(entry, "notion-web missing from WEB_COOKIE_PROVIDERS");
    assert.equal(entry.id, "notion-web");
    assert.equal(entry.alias, "nw");
    assert.equal(entry.subscriptionRisk, true);
    assert.equal(entry.riskNoticeVariant, "webCookie");
    assert.match(String(entry.name), /unofficial|experimental/i);
  });

  it("registers a model catalog reachable via getModelsByProviderId", () => {
    const models = getModelsByProviderId("notion-web");
    assert.ok(models.length >= 1);
    assert.ok(models.some((m) => m.id === "notion-ai"));
    // Seed catalog includes real Notion codenames (live discovery still preferred).
    assert.ok(models.some((m) => m.id === "ambrosia-tart-high" || m.id === "orange-mousse"));
  });
});

describe("NotionWebExecutor — instantiation & auth errors", () => {
  it("can be instantiated", () => {
    const executor = new mod.NotionWebExecutor();
    assert.ok(executor);
    assert.equal(executor.getProvider(), "notion-web");
  });

  it("returns 401 when no cookie credential is supplied", async () => {
    const executor = new mod.NotionWebExecutor();
    const result = await executor.execute({
      model: "notion-ai",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
      signal: null,
    } as never);
    assert.equal(result.response.status, 401);
    const errBody = (await result.response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /token_v2/i);
  });

  it("returns 400 when no user message is present", async () => {
    const executor = new mod.NotionWebExecutor();
    const result = await executor.execute({
      model: "notion-ai",
      body: { messages: [{ role: "assistant", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "token_v2=fake" },
      signal: null,
    } as never);
    assert.equal(result.response.status, 400);
  });
});

describe("NotionWebExecutor — upstream translation (mocked fetch)", () => {
  it("posts the transcript to runInferenceTranscript with the cookie header and returns a chat.completion", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedUrl = "";
    let capturedHeaders: Record<string, string> = {};
    let capturedBody: { transcript: Array<{ type: string; value: unknown }> } | null = null;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (url: string | URL, opts: RequestInit) => {
        capturedUrl = String(url);
        capturedHeaders = opts.headers as Record<string, string>;
        capturedBody = JSON.parse(String(opts.body));
        const ndjson = [
          JSON.stringify({ value: [["Hel"]] }),
          JSON.stringify({ value: [["Hello"]] }),
          JSON.stringify({ value: [["Hello there!"]] }),
        ].join("\n");
        return new Response(ndjson, { status: 200 });
      }) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "abc123" },
        signal: null,
      } as never);

      assert.equal(capturedUrl, "https://www.notion.so/api/v3/runInferenceTranscript");
      assert.equal(capturedHeaders.Cookie, "token_v2=abc123");
      assert.ok(capturedBody);
      // notion-ai default does not inject a config entry (server-side default model).
      assert.equal(capturedBody.transcript[0].type, "human");
      assert.deepEqual(capturedBody.transcript[0].value, [["hi"]]);

      assert.equal(result.response.status, 200);
      const json = (await result.response.json()) as {
        object: string;
        choices: Array<{ message: { content: string } }>;
      };
      assert.equal(json.object, "chat.completion");
      // Cumulative NDJSON frames: only the LAST non-empty frame is kept, never
      // concatenated (mirrors gemini-web.ts's snapshot handling, #7163).
      assert.equal(json.choices[0].message.content, "Hello there!");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("injects a config transcript entry with the selected Notion model codename", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedBody: { transcript: Array<{ type: string; value?: { model?: string } }> } | null =
      null;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (_url: string | URL, opts: RequestInit) => {
        capturedBody = JSON.parse(String(opts.body));
        return new Response(JSON.stringify({ value: [["ok"]] }), { status: 200 });
      }) as typeof fetch;

      await executor.execute({
        model: "orange-mousse",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token_v2=xyz; space_id=space-1" },
        signal: null,
      } as never);

      assert.ok(capturedBody);
      assert.equal(capturedBody.transcript[0].type, "config");
      assert.equal(capturedBody.transcript[0].value?.model, "orange-mousse");
      assert.equal(capturedBody.transcript[1].type, "human");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("accepts a full cookie header verbatim (already containing token_v2=)", async () => {
    const executor = new mod.NotionWebExecutor();
    let capturedHeaders: Record<string, string> = {};
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (_url: string | URL, opts: RequestInit) => {
        capturedHeaders = opts.headers as Record<string, string>;
        return new Response(JSON.stringify({ value: [["ok"]] }), { status: 200 });
      }) as typeof fetch;

      await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token_v2=xyz; space_id=abc-def" },
        signal: null,
      } as never);

      assert.equal(capturedHeaders.Cookie, "token_v2=xyz; space_id=abc-def");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns a pseudo-streamed SSE response with [DONE] when stream=true", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () =>
        new Response(JSON.stringify({ value: [["Streamed reply"]] }), {
          status: 200,
        })) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: { apiKey: "token_v2=xyz" },
        signal: null,
      } as never);

      assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
      const text = await result.response.text();
      assert.match(text, /Streamed reply/);
      assert.match(text, /data: \[DONE\]/);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns 502 when Notion sends no parseable text (endpoint drift)", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () => new Response("not-json\n{}", { status: 200 })) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token_v2=xyz" },
        signal: null,
      } as never);
      assert.equal(result.response.status, 502);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns a sanitized 403 error without leaking raw upstream error text shape", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () =>
        new Response("Forbidden", { status: 403 })) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token_v2=expired" },
        signal: null,
      } as never);
      assert.equal(result.response.status, 403);
      const errBody = (await result.response.json()) as { error: { message: string; code: string } };
      assert.match(errBody.error.message, /session expired|invalid/i);
      assert.equal(errBody.error.code, "HTTP_403");
      // No stack trace / file path leakage (Hard Rule #12).
      assert.ok(!errBody.error.message.includes("at /"));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns 502 with a sanitized message when the fetch itself throws", async () => {
    const executor = new mod.NotionWebExecutor();
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async () => {
        throw new Error("getaddrinfo ENOTFOUND www.notion.so at /some/internal/path.ts:42");
      }) as typeof fetch;

      const result = await executor.execute({
        model: "notion-ai",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "token_v2=xyz" },
        signal: null,
      } as never);
      assert.equal(result.response.status, 502);
      const errBody = (await result.response.json()) as { error: { message: string } };
      assert.ok(!errBody.error.message.includes("at /some/internal/path.ts"));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("parseNotionInferenceStream", () => {
  const { parseNotionInferenceStream } = mod;

  it("returns empty string for empty input", () => {
    assert.equal(parseNotionInferenceStream(""), "");
  });

  it("keeps only the last non-empty cumulative frame (snapshot semantics)", () => {
    const ndjson = [
      JSON.stringify({ value: [["H"]] }),
      JSON.stringify({ value: [["He"]] }),
      JSON.stringify({ value: [["Hello world"]] }),
    ].join("\n");
    assert.equal(parseNotionInferenceStream(ndjson), "Hello world");
  });

  it("skips unparseable lines without throwing", () => {
    const ndjson = ["not json", JSON.stringify({ value: [["ok"]] }), ""].join("\n");
    assert.equal(parseNotionInferenceStream(ndjson), "ok");
  });

  it("ignores records with no usable rich-text value", () => {
    const ndjson = [JSON.stringify({ recordMap: { block: {} } }), JSON.stringify({ value: [["final"]] })].join(
      "\n"
    );
    assert.equal(parseNotionInferenceStream(ndjson), "final");
  });
});

describe("buildNotionTranscript", () => {
  const { buildNotionTranscript } = mod;

  it("maps roles to Notion transcript entry types", () => {
    const transcript = buildNotionTranscript([
      { role: "system", content: "be nice" },
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" },
    ]);
    assert.deepEqual(
      transcript.map((t) => t.type),
      ["context", "human", "ai"]
    );
    assert.deepEqual(
      transcript.map((t) => t.value),
      [[["be nice"]], [["hi"]], [["hello"]]]
    );
    assert.ok(transcript.every((t) => typeof t.id === "string" && (t.id as string).length > 0));
  });

  it("drops messages with empty/non-string content", () => {
    const transcript = buildNotionTranscript([
      { role: "user", content: "" },
      { role: "user", content: "keep me" },
    ]);
    assert.equal(transcript.length, 1);
  });
});

describe("resolveNotionWebCookie", () => {
  const { resolveNotionWebCookie, normalizeNotionCookieInput } = mod;

  it("normalizes a bare token to token_v2=...", () => {
    assert.equal(normalizeNotionCookieInput("abc"), "token_v2=abc");
  });

  it("leaves an already-prefixed cookie untouched", () => {
    assert.equal(normalizeNotionCookieInput("token_v2=abc"), "token_v2=abc");
  });

  it("prefers apiKey over providerSpecificData", () => {
    const cookie = resolveNotionWebCookie({
      apiKey: "token_v2=direct",
      providerSpecificData: { token_v2: "ignored" },
    } as never);
    assert.equal(cookie, "token_v2=direct");
  });

  it("assembles a cookie from structured providerSpecificData fields", () => {
    const cookie = resolveNotionWebCookie({
      providerSpecificData: {
        token_v2: "abc",
        space_id: "space-1",
        notion_browser_id: "browser-1",
      },
    } as never);
    assert.equal(cookie, "token_v2=abc; space_id=space-1; notion_browser_id=browser-1");
  });

  it("returns empty string when no credential is present", () => {
    assert.equal(resolveNotionWebCookie({} as never), "");
  });
});
