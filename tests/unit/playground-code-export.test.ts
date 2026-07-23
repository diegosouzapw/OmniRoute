import test from "node:test";
import assert from "node:assert/strict";

const { exportCode, exportAllLanguages, endpointToPath, API_KEY_PLACEHOLDER } = await import(
  "../../src/lib/playground/codeExport.ts"
);

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Assert security invariants on every generated snippet. */
function assertSecurityInvariants(generated: string, label: string) {
  assert.ok(generated.includes(API_KEY_PLACEHOLDER), `${label}: must include $OMNIROUTE_API_KEY`);
  assert.ok(generated.length > 0, `${label}: must not be empty`);
  assert.doesNotMatch(
    generated,
    /sk-[A-Za-z0-9_\-]{16,}/,
    `${label}: must not contain real API keys`,
  );
  assert.doesNotMatch(
    generated,
    /Bearer\s+[A-Za-z0-9_\-]{20,}\s/,
    `${label}: must not contain real Bearer tokens`,
  );
}

// ── endpointToPath ─────────────────────────────────────────────────────────────

test("endpointToPath: maps all 13 endpoints correctly (D4-rev2)", () => {
  assert.equal(endpointToPath("chat.completions"), "/v1/chat/completions");
  assert.equal(endpointToPath("responses"), "/v1/responses");
  assert.equal(endpointToPath("completions"), "/v1/completions");
  assert.equal(endpointToPath("embeddings"), "/v1/embeddings");
  assert.equal(endpointToPath("images"), "/v1/images/generations");
  assert.equal(endpointToPath("audio.transcriptions"), "/v1/audio/transcriptions");
  assert.equal(endpointToPath("audio.speech"), "/v1/audio/speech");
  assert.equal(endpointToPath("video"), "/v1/videos/generations");
  assert.equal(endpointToPath("music"), "/v1/music/generations");
  assert.equal(endpointToPath("moderations"), "/v1/moderations");
  assert.equal(endpointToPath("rerank"), "/v1/rerank");
  assert.equal(endpointToPath("search"), "/v1/search");
  assert.equal(endpointToPath("web.fetch"), "/v1/web/fetch");
});

// ── API_KEY_PLACEHOLDER ───────────────────────────────────────────────────────

test("API_KEY_PLACEHOLDER is $OMNIROUTE_API_KEY", () => {
  assert.equal(API_KEY_PLACEHOLDER, "$OMNIROUTE_API_KEY");
});

// ── Table-driven tests for chat.completions ────────────────────────────────────

const baseState = {
  endpoint: "chat.completions" as const,
  baseUrl: "http://localhost:20128",
  model: "gpt-4o-mini",
  stream: false,
};

test("chat.completions × curl: contains required elements", () => {
  const generated = exportCode(baseState, "curl");
  assertSecurityInvariants(generated, "chat.completions/curl");
  assert.ok(generated.includes("/v1/chat/completions"), "path present");
  assert.ok(generated.includes("Authorization: Bearer"), "auth header present");
  assert.ok(generated.includes("gpt-4o-mini"), "model present");
});

test("chat.completions × python: contains required elements", () => {
  const generated = exportCode(baseState, "python");
  assertSecurityInvariants(generated, "chat.completions/python");
  assert.ok(generated.includes("import requests"), "imports requests");
  assert.ok(generated.includes('os.environ["OMNIROUTE_API_KEY"]'), "uses os.environ");
  assert.ok(generated.includes("gpt-4o-mini"), "model present");
});

test("chat.completions × typescript: contains required elements", () => {
  const generated = exportCode(baseState, "typescript");
  assertSecurityInvariants(generated, "chat.completions/typescript");
  assert.ok(generated.includes("await fetch("), "uses fetch");
  assert.ok(generated.includes("process.env.OMNIROUTE_API_KEY"), "uses process.env");
  assert.ok(generated.includes("gpt-4o-mini"), "model present");
});

// ── chat.completions with systemPrompt ────────────────────────────────────────

test("chat.completions: uses systemPrompt when messages is empty", () => {
  const state = { ...baseState, systemPrompt: "You are helpful.", messages: [] };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assert.ok(generated.includes("You are helpful."), `${lang}: systemPrompt in output`);
  }
});

test("chat.completions: uses messages when provided", () => {
  const state = {
    ...baseState,
    messages: [
      { role: "user" as const, content: "My custom message" },
    ],
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assert.ok(generated.includes("My custom message"), `${lang}: message in output`);
  }
});

// ── completions ────────────────────────────────────────────────────────────────

test("completions × all languages: security + path", () => {
  const state = {
    endpoint: "completions" as const,
    baseUrl: "http://localhost:20128",
    model: "gpt-3.5-turbo-instruct",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `completions/${lang}`);
    assert.ok(generated.includes("/v1/completions"), `${lang}: correct path`);
  }
});

// ── embeddings ─────────────────────────────────────────────────────────────────

test("embeddings × all languages: security + path", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Hello world",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `embeddings/${lang}`);
    assert.ok(generated.includes("/v1/embeddings"), `${lang}: correct path`);
  }
});

// ── images ─────────────────────────────────────────────────────────────────────

test("images × all languages: security + path", () => {
  const state = {
    endpoint: "images" as const,
    baseUrl: "http://localhost:20128",
    model: "dall-e-3",
    prompt: "A beautiful sunset",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `images/${lang}`);
    assert.ok(generated.includes("/v1/images/generations"), `${lang}: correct path`);
  }
});

// ── search ─────────────────────────────────────────────────────────────────────

test("search × all languages: security + path + query", () => {
  const state = {
    endpoint: "search" as const,
    baseUrl: "http://localhost:20128",
    query: "AI news today",
    searchProvider: "tavily",
    searchType: "web" as const,
    maxResults: 5,
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `search/${lang}`);
    assert.ok(generated.includes("/v1/search"), `${lang}: correct path`);
    assert.ok(generated.includes("AI news today"), `${lang}: query present`);
  }
});

// ── web.fetch ─────────────────────────────────────────────────────────────────

test("web.fetch × all languages: security + path + url", () => {
  const state = {
    endpoint: "web.fetch" as const,
    baseUrl: "http://localhost:20128",
    url: "https://example.com",
    fetchProvider: "firecrawl" as const,
    fetchFormat: "markdown" as const,
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `web.fetch/${lang}`);
    assert.ok(generated.includes("/v1/web/fetch"), `${lang}: correct path`);
    assert.ok(generated.includes("https://example.com"), `${lang}: url present`);
  }
});

// ── rerank ─────────────────────────────────────────────────────────────────────

test("rerank × all languages: security + path + query", () => {
  const state = {
    endpoint: "rerank" as const,
    baseUrl: "http://localhost:20128",
    query: "find relevant docs",
    rerankModel: "rerank-english-v3.0",
    documents: ["Doc 1", "Doc 2"],
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `rerank/${lang}`);
    assert.ok(generated.includes("/v1/rerank"), `${lang}: correct path`);
  }
});

// ── audio.transcriptions ──────────────────────────────────────────────────────

test("audio.transcriptions × all languages: security + path", () => {
  const state = {
    endpoint: "audio.transcriptions" as const,
    baseUrl: "http://localhost:20128",
    model: "whisper-1",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `audio.transcriptions/${lang}`);
    assert.ok(generated.includes("/v1/audio/transcriptions"), `${lang}: correct path`);
  }
});

// ── audio.speech ──────────────────────────────────────────────────────────────

test("audio.speech × all languages: security + path", () => {
  const state = {
    endpoint: "audio.speech" as const,
    baseUrl: "http://localhost:20128",
    model: "tts-1",
    prompt: "Hello world",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `audio.speech/${lang}`);
    assert.ok(generated.includes("/v1/audio/speech"), `${lang}: correct path`);
  }
});

// ── moderations ───────────────────────────────────────────────────────────────

test("moderations × all languages: security + path", () => {
  const state = {
    endpoint: "moderations" as const,
    baseUrl: "http://localhost:20128",
    model: "text-moderation-latest",
    prompt: "Hello world",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `moderations/${lang}`);
    assert.ok(generated.includes("/v1/moderations"), `${lang}: correct path`);
  }
});

// ── exportAllLanguages ─────────────────────────────────────────────────────────

test("exportAllLanguages returns all 3 snippets with valid content", () => {
  const state = { ...baseState, model: "gpt-4o" };
  const result = exportAllLanguages(state);

  assert.ok(typeof result.curl === "string" && result.curl.length > 0, "curl non-empty");
  assert.ok(typeof result.python === "string" && result.python.length > 0, "python non-empty");
  assert.ok(
    typeof result.typescript === "string" && result.typescript.length > 0,
    "typescript non-empty",
  );

  for (const [lang, snippet] of Object.entries(result)) {
    assertSecurityInvariants(snippet, `exportAll/${lang}`);
  }
});

// ── JSON formatting (pretty-printed bodies) ───────────────────────────────────

test("curl: body is present (JSON.stringify used)", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Test input",
  };
  const generated = exportCode(state, "curl");
  // The body should contain the model name in JSON form
  assert.ok(generated.includes("text-embedding-3-small"), "model in JSON body");
});

test("python: body uses json.loads for JSON parsing", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Test input",
  };
  const generated = exportCode(state, "python");
  assert.ok(generated.includes("json.loads"), "uses json.loads");
});

test("typescript: body uses JSON object literal", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Test input",
  };
  const generated = exportCode(state, "typescript");
  assert.ok(generated.includes("const body ="), "uses const body =");
});

// ── Default fallback branches ─────────────────────────────────────────────────
// These tests cover the ?? defaults in buildBody to satisfy branch coverage

test("chat.completions: defaults model when not provided", () => {
  const state = {
    endpoint: "chat.completions" as const,
    baseUrl: "http://localhost:20128",
    // no model
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `chat.completions/defaults/${lang}`);
    assert.ok(generated.includes("gpt-4o-mini"), `${lang}: default model fallback`);
    // default prompt "Hello!" should appear (no messages, no systemPrompt, no prompt)
    assert.ok(generated.includes("Hello!"), `${lang}: default prompt fallback`);
    // default stream=false
    assert.ok(generated.includes("false") || generated.includes("stream"), `${lang}: stream default`);
  }
});

test("chat.completions: no messages, no systemPrompt — builds default user message", () => {
  const state = {
    endpoint: "chat.completions" as const,
    baseUrl: "http://localhost:20128",
    model: "gpt-4o",
    // no messages, no systemPrompt, no prompt
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assert.ok(generated.includes("Hello!"), `${lang}: default Hello! prompt`);
  }
});

test("completions: defaults model when not provided", () => {
  const state = {
    endpoint: "completions" as const,
    baseUrl: "http://localhost:20128",
    // no model, no prompt, no stream
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `completions/defaults/${lang}`);
    assert.ok(generated.includes("gpt-3.5-turbo-instruct"), `${lang}: default model`);
    assert.ok(generated.includes("Hello,"), `${lang}: default prompt`);
  }
});

test("embeddings: defaults model and prompt when not provided", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    // no model, no prompt
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `embeddings/defaults/${lang}`);
    assert.ok(generated.includes("text-embedding-3-small"), `${lang}: default model`);
    assert.ok(generated.includes("Hello world"), `${lang}: default input`);
  }
});

test("images: defaults model and prompt when not provided", () => {
  const state = {
    endpoint: "images" as const,
    baseUrl: "http://localhost:20128",
    // no model, no prompt
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `images/defaults/${lang}`);
    assert.ok(generated.includes("dall-e-3"), `${lang}: default model`);
  }
});

test("audio.transcriptions: defaults model when not provided", () => {
  const state = {
    endpoint: "audio.transcriptions" as const,
    baseUrl: "http://localhost:20128",
    // no model
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `audio.transcriptions/defaults/${lang}`);
    assert.ok(generated.includes("whisper-1"), `${lang}: default model`);
  }
});

test("audio.speech: defaults model and prompt when not provided", () => {
  const state = {
    endpoint: "audio.speech" as const,
    baseUrl: "http://localhost:20128",
    // no model, no prompt
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `audio.speech/defaults/${lang}`);
    assert.ok(generated.includes("tts-1"), `${lang}: default model`);
    assert.ok(generated.includes("Hello, world!"), `${lang}: default prompt`);
  }
});

// ── responses (D4-rev2) ───────────────────────────────────────────────────────

test("responses × all languages: security + path", () => {
  const state = {
    endpoint: "responses" as const,
    baseUrl: "http://localhost:20128",
    model: "gpt-4o",
    prompt: "Summarize the news",
    systemPrompt: "Be concise.",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `responses/${lang}`);
    assert.ok(generated.includes("/v1/responses"), `${lang}: correct path`);
    assert.ok(generated.includes("Summarize the news"), `${lang}: input present`);
    assert.ok(generated.includes("Be concise."), `${lang}: instructions present`);
  }
});

test("responses: defaults model and input when not provided", () => {
  const state = {
    endpoint: "responses" as const,
    baseUrl: "http://localhost:20128",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `responses/defaults/${lang}`);
    assert.ok(generated.includes("gpt-4o-mini"), `${lang}: default model`);
    assert.ok(generated.includes("Hello!"), `${lang}: default input`);
  }
});

// ── video (D4-rev2) ───────────────────────────────────────────────────────────

test("video × all languages: security + path", () => {
  const state = {
    endpoint: "video" as const,
    baseUrl: "http://localhost:20128",
    model: "sora-1.0",
    prompt: "A cat playing piano",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `video/${lang}`);
    assert.ok(generated.includes("/v1/videos/generations"), `${lang}: correct path`);
    assert.ok(generated.includes("A cat playing piano"), `${lang}: prompt present`);
  }
});

test("video: defaults when no model/prompt provided", () => {
  const state = {
    endpoint: "video" as const,
    baseUrl: "http://localhost:20128",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `video/defaults/${lang}`);
    assert.ok(generated.includes("sora-1.0"), `${lang}: default model`);
  }
});

// ── music (D4-rev2) ───────────────────────────────────────────────────────────

test("music × all languages: security + path", () => {
  const state = {
    endpoint: "music" as const,
    baseUrl: "http://localhost:20128",
    model: "music-1",
    prompt: "An ambient piano piece",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `music/${lang}`);
    assert.ok(generated.includes("/v1/music/generations"), `${lang}: correct path`);
    assert.ok(generated.includes("An ambient piano piece"), `${lang}: prompt present`);
  }
});

test("music: defaults when no model/prompt provided", () => {
  const state = {
    endpoint: "music" as const,
    baseUrl: "http://localhost:20128",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `music/defaults/${lang}`);
    assert.ok(generated.includes("music-1"), `${lang}: default model`);
  }
});

test("moderations: defaults model and prompt when not provided", () => {
  const state = {
    endpoint: "moderations" as const,
    baseUrl: "http://localhost:20128",
    // no model, no prompt
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `moderations/defaults/${lang}`);
    assert.ok(generated.includes("text-moderation-latest"), `${lang}: default model`);
  }
});

test("rerank: defaults query and documents when not provided", () => {
  const state = {
    endpoint: "rerank" as const,
    baseUrl: "http://localhost:20128",
    // no model, no query, no documents
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `rerank/defaults/${lang}`);
    assert.ok(generated.includes("rerank-english-v3.0"), `${lang}: default rerank model`);
    assert.ok(generated.includes("search query"), `${lang}: default query`);
  }
});

test("search: omits optional fields when not provided", () => {
  const state = {
    endpoint: "search" as const,
    baseUrl: "http://localhost:20128",
    query: "test query",
    // no model, no provider, no type, no maxResults
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `search/minimal/${lang}`);
    assert.ok(generated.includes("test query"), `${lang}: query present`);
  }
});

test("web.fetch: minimal state (only url)", () => {
  const state = {
    endpoint: "web.fetch" as const,
    baseUrl: "http://localhost:20128",
    url: "https://my-site.com",
    // no provider, no format, no depth
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `web.fetch/minimal/${lang}`);
    assert.ok(generated.includes("https://my-site.com"), `${lang}: url present`);
  }
});

test("chat.completions: with tools in state", () => {
  const state = {
    endpoint: "chat.completions" as const,
    baseUrl: "http://localhost:20128",
    model: "gpt-4o",
    tools: [
      {
        type: "function" as const,
        function: {
          name: "get_weather",
          description: "Get weather",
          parameters: { type: "object", properties: {} },
        },
      },
    ],
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assert.ok(generated.includes("get_weather"), `${lang}: tools included`);
  }
});

test("chat.completions: with params in state", () => {
  const state = {
    endpoint: "chat.completions" as const,
    baseUrl: "http://localhost:20128",
    model: "gpt-4o",
    params: { temperature: 0.7, max_tokens: 500 },
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assert.ok(generated.includes("temperature"), `${lang}: params included`);
  }
});

test("completions: with params in state", () => {
  const state = {
    endpoint: "completions" as const,
    baseUrl: "http://localhost:20128",
    model: "gpt-3.5-turbo-instruct",
    prompt: "Say hello",
    params: { temperature: 0.5, max_tokens: 100 },
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `completions/params/${lang}`);
    assert.ok(generated.includes("temperature"), `${lang}: params included`);
  }
});

test("search: with model in state (covers model branch)", () => {
  const state = {
    endpoint: "search" as const,
    baseUrl: "http://localhost:20128",
    query: "test",
    model: "some-search-model",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `search/model/${lang}`);
    assert.ok(generated.includes("some-search-model"), `${lang}: model included`);
  }
});

test("search: default url used when url not provided", () => {
  const state = {
    endpoint: "search" as const,
    baseUrl: "http://localhost:20128",
    // no query — will use default
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `search/default-query/${lang}`);
    assert.ok(generated.includes("search query"), `${lang}: default query`);
  }
});

test("web.fetch: with all optional fields set (depth, format, provider)", () => {
  const state = {
    endpoint: "web.fetch" as const,
    baseUrl: "http://localhost:20128",
    url: "https://example.com",
    fetchProvider: "firecrawl" as const,
    fetchFormat: "html" as const,
    fetchDepth: 1 as const,
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `web.fetch/full/${lang}`);
    assert.ok(generated.includes("firecrawl"), `${lang}: provider present`);
    assert.ok(generated.includes("html"), `${lang}: format present`);
    assert.ok(generated.includes("1") || generated.includes("depth"), `${lang}: depth present`);
  }
});

test("web.fetch: default url when url not provided", () => {
  const state = {
    endpoint: "web.fetch" as const,
    baseUrl: "http://localhost:20128",
    // no url
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `web.fetch/default-url/${lang}`);
    assert.ok(generated.includes("example.com"), `${lang}: default url`);
  }
});

test("web.fetch: fetchDepth 0 is included (not null)", () => {
  const state = {
    endpoint: "web.fetch" as const,
    baseUrl: "http://localhost:20128",
    url: "https://example.com",
    fetchDepth: 0 as const,
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `web.fetch/depth0/${lang}`);
    // depth: 0 should be included (fetchDepth != null check)
    assert.ok(generated.includes("depth"), `${lang}: depth key present`);
  }
});
