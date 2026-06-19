import test from "node:test";
import assert from "node:assert/strict";

const {
  clientWantsJsonResponse,
  isKnownJsonOnlyClient,
  resolveStreamFlag,
  resolveExplicitStreamAlias,
  hasExplicitNoStreamParam,
  stripMarkdownCodeFence,
} = await import("../../open-sse/utils/aiSdkCompat.ts");

test("T26: explicit stream:true takes priority over Accept application/json (#656)", () => {
  assert.equal(clientWantsJsonResponse("application/json"), true);
  // Body stream:true always wins — even with Accept: application/json
  assert.equal(resolveStreamFlag(true, "application/json"), true);
});

test("T26: text/event-stream keeps SSE behavior", () => {
  assert.equal(clientWantsJsonResponse("text/event-stream"), false);
  assert.equal(resolveStreamFlag(true, "text/event-stream"), true);
});

test("T26: mixed Accept header prefers SSE only when text/event-stream is present", () => {
  assert.equal(clientWantsJsonResponse("application/json, text/event-stream"), false);
  assert.equal(resolveStreamFlag(true, "application/json, text/event-stream"), true);
});

test("T26: markdown code fence stripping unwraps Claude JSON blocks", () => {
  const wrapped = '```json\n{"name":"omniroute"}\n```';
  assert.equal(stripMarkdownCodeFence(wrapped), '{"name":"omniroute"}');
});

test("T26: non-fenced content is returned unchanged", () => {
  const plain = '{"name":"omniroute"}';
  assert.equal(stripMarkdownCodeFence(plain), plain);
});

test("T26: undefined stream falls back to Accept header heuristic (#656)", () => {
  // No explicit stream param — Accept: application/json means no streaming
  assert.equal(resolveStreamFlag(undefined, "application/json"), false);
  // No explicit stream param + no JSON accept = stream by default
  assert.equal(resolveStreamFlag(undefined, "text/event-stream"), true);
  assert.equal(resolveStreamFlag(undefined, undefined), true);
});

test("T26: explicit stream:false always prevents streaming", () => {
  assert.equal(resolveStreamFlag(false, "text/event-stream"), false);
  assert.equal(resolveStreamFlag(false, undefined), false);
});

test("T26: sourceFormat=claude applies Anthropic Messages non-stream default (#2325)", () => {
  // Anthropic Messages API spec: stream defaults to false when body omits it,
  // regardless of Accept header. Previously OmniRoute defaulted to stream=true
  // for Accept: */* or undefined, causing STREAM_EARLY_EOF on /v1/messages.

  // Ambiguous cases must default to non-stream when sourceFormat is claude
  assert.equal(resolveStreamFlag(undefined, undefined, "claude"), false);
  assert.equal(resolveStreamFlag(undefined, "*/*", "claude"), false);
  assert.equal(resolveStreamFlag(undefined, "application/json", "claude"), false);

  // Explicit body stream still wins over format default
  assert.equal(resolveStreamFlag(true, undefined, "claude"), true);
  assert.equal(resolveStreamFlag(true, "*/*", "claude"), true);
  assert.equal(resolveStreamFlag(false, "text/event-stream", "claude"), false);

  // Accept: text/event-stream is honored as an explicit SSE opt-in
  assert.equal(resolveStreamFlag(undefined, "text/event-stream", "claude"), true);
  assert.equal(resolveStreamFlag(undefined, "application/json, text/event-stream", "claude"), true);
});

test("T26: non-claude sourceFormat preserves pre-#2325 streaming default", () => {
  // OpenAI / Gemini / Codex callers keep the existing streaming-by-default heuristic
  // so we don't break SDKs that omit `stream` and expect SSE.
  assert.equal(resolveStreamFlag(undefined, undefined, "openai"), true);
  assert.equal(resolveStreamFlag(undefined, "*/*", "openai"), true);
  assert.equal(resolveStreamFlag(undefined, "application/json", "openai"), false);
  assert.equal(resolveStreamFlag(undefined, undefined, "gemini"), true);
  assert.equal(resolveStreamFlag(undefined, undefined, "codex"), true);
  // Omitting sourceFormat reproduces the legacy two-arg behavior exactly
  assert.equal(resolveStreamFlag(undefined, undefined), true);
  assert.equal(resolveStreamFlag(undefined, "application/json"), false);
});

test("T26: Nextcloud OpenAI integration defaults to non-streaming JSON", () => {
  const ua = "Nextcloud OpenAI/LocalAI integration";

  assert.equal(isKnownJsonOnlyClient(ua), true);
  assert.equal(resolveStreamFlag(undefined, undefined, "openai", ua), false);
  assert.equal(resolveStreamFlag(undefined, "*/*", "openai", ua), false);
  assert.equal(resolveStreamFlag(undefined, "application/json", "openai", ua), false);
  assert.equal(resolveStreamFlag(undefined, "text/event-stream", "openai", ua), true);
  assert.equal(resolveStreamFlag(true, "application/json", "openai", ua), true);
});

test("T26: per-key JSON stream default keeps omitted stream non-streaming", () => {
  const options = { streamDefaultMode: "json", userAgent: "generic-openai-client" };

  assert.equal(resolveStreamFlag(undefined, undefined, "openai", options), false);
  assert.equal(resolveStreamFlag(undefined, "*/*", "openai", options), false);
  assert.equal(resolveStreamFlag(undefined, "application/json", "openai", options), false);
  assert.equal(resolveStreamFlag(undefined, "text/event-stream", "openai", options), true);
  assert.equal(resolveStreamFlag(true, "application/json", "openai", options), true);
  assert.equal(resolveStreamFlag(false, "text/event-stream", "openai", options), false);
});

test("T26: explicit non-stream aliases are detected", () => {
  assert.equal(hasExplicitNoStreamParam({ non_stream: true }), true);
  assert.equal(hasExplicitNoStreamParam({ disable_stream: true }), true);
  assert.equal(hasExplicitNoStreamParam({ disable_streaming: true }), true);
  assert.equal(hasExplicitNoStreamParam({ streaming: false }), true);
  assert.equal(hasExplicitNoStreamParam({ streaming: true }), false);
  assert.equal(hasExplicitNoStreamParam({ stream: false }), false);
  assert.equal(hasExplicitNoStreamParam({}), false);
});

test("T26: explicit stream aliases resolve true/false correctly", () => {
  assert.equal(resolveExplicitStreamAlias({ streaming: true }), true);
  assert.equal(resolveExplicitStreamAlias({ streaming: false }), false);
  assert.equal(resolveExplicitStreamAlias({ disable_streaming: true }), false);
  assert.equal(resolveExplicitStreamAlias({}), undefined);
});

test("T26: sourceFormat=openai-responses applies spec default (stream=false when omitted) (#3708)", () => {
  // OpenAI Responses API spec: omitting `stream` means non-streaming, same as claude.
  // Previously OmniRoute fell through to the wildcard-Accept heuristic, treating
  // Accept: */* as streaming intent → STREAM_EARLY_EOF / 502 on spec-compliant upstreams.

  // Wildcard and undefined Accept must default to non-stream
  assert.equal(resolveStreamFlag(undefined, undefined, "openai-responses"), false);
  assert.equal(resolveStreamFlag(undefined, "*/*", "openai-responses"), false);
  assert.equal(resolveStreamFlag(undefined, "application/json", "openai-responses"), false);

  // Explicit body stream:true still wins
  assert.equal(resolveStreamFlag(true, undefined, "openai-responses"), true);
  assert.equal(resolveStreamFlag(true, "*/*", "openai-responses"), true);
  assert.equal(resolveStreamFlag(false, "text/event-stream", "openai-responses"), false);

  // Accept: text/event-stream is honored as an explicit SSE opt-in
  assert.equal(resolveStreamFlag(undefined, "text/event-stream", "openai-responses"), true);
  assert.equal(
    resolveStreamFlag(undefined, "application/json, text/event-stream", "openai-responses"),
    true
  );
});
