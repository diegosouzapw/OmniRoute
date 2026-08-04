import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { parseSSEToOpenAIResponse, extractSSEErrorMessage } =
  await import("../../open-sse/handlers/sseParser.ts");

const GENERIC = "Invalid SSE response for non-streaming request";

// ─── PART 2: error-only SSE passthrough ───────────────────────────────────────

test("extractSSEErrorMessage surfaces the error message from an error-only SSE chunk", () => {
  const rawSSE = [
    'data: {"error":{"message":"Devin CLI not found on PATH"}}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const surfaced = extractSSEErrorMessage(rawSSE);

  assert.ok(surfaced, "expected a surfaced error message, got null");
  assert.ok(
    surfaced.includes("Devin CLI not found on PATH"),
    `expected surfaced message to contain the real Devin error, got: ${surfaced}`
  );
  assert.notEqual(surfaced, GENERIC);
});

test("extractSSEErrorMessage surfaces the real Devin spawn error shape (type+code)", () => {
  const rawSSE = [
    'data: {"error":{"message":"Devin CLI not found: devin. Install via https://cli.devin.ai or set CLI_DEVIN_BIN env var.","type":"devin_cli_error","code":"spawn_failed"}}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const surfaced = extractSSEErrorMessage(rawSSE);

  assert.ok(surfaced);
  assert.ok(surfaced.includes("Devin CLI not found"));
});

test("extractSSEErrorMessage accepts a top-level string error field", () => {
  const rawSSE = ['data: {"error":"upstream blew up"}', "", "data: [DONE]"].join("\n");

  const surfaced = extractSSEErrorMessage(rawSSE);

  assert.ok(surfaced);
  assert.ok(surfaced.includes("upstream blew up"));
});

test("extractSSEErrorMessage returns null when a valid choices chunk is present (no false positive)", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_ok","choices":[{"index":0,"delta":{"content":"hi"},"finish_reason":"stop"}]}',
    "data: [DONE]",
  ].join("\n");

  assert.equal(extractSSEErrorMessage(rawSSE), null);
});

test("extractSSEErrorMessage returns null for a stream with no error and no choices", () => {
  const rawSSE = ['data: {"foo":"bar"}', "data: [DONE]"].join("\n");

  assert.equal(extractSSEErrorMessage(rawSSE), null);
});

test("extractSSEErrorMessage sanitizes stack-trace-like error messages (no `at /` leak)", () => {
  // Genuine V8 stack shape: real newline between the message and the frames, so
  // a JSON.stringify of a real Error.stack-style string round-trips with the
  // newline intact (sanitizeErrorMessage drops everything after the first line).
  const stacky =
    "ENOENT: spawn devin\n    at ChildProcess._handle.onexit (/home/me/app/open-sse/executors/devin-cli.ts:170:5)";
  // A bare absolute source path on the surviving first line must also be redacted.
  const bareInline = "Devin failed loading /home/me/app/open-sse/executors/devin-cli.ts module";
  const rawSSE = [
    `data: ${JSON.stringify({ error: { message: stacky } })}`,
    "",
    `data: ${JSON.stringify({ error: { message: bareInline } })}`,
    "",
    "data: [DONE]",
  ].join("\n");

  const surfaced = extractSSEErrorMessage(rawSSE);

  assert.ok(surfaced, "expected a sanitized error message");
  // The first error-only chunk wins; its stack tail is dropped at the newline.
  assert.equal(surfaced, "ENOENT: spawn devin");
  assert.ok(!surfaced.includes("at /"), `surfaced message leaked a stack frame path: ${surfaced}`);
  assert.ok(
    !/\/[^\s]+\.ts/.test(surfaced),
    `surfaced message leaked an absolute source path: ${surfaced}`
  );

  // A bare absolute source path on a single line is redacted to <path>.
  const bareSurfaced = extractSSEErrorMessage(
    [`data: ${JSON.stringify({ error: { message: bareInline } })}`, "", "data: [DONE]"].join("\n")
  );
  assert.ok(bareSurfaced);
  assert.ok(
    bareSurfaced.includes("<path>"),
    `expected the bare absolute path to be redacted, got: ${bareSurfaced}`
  );
  assert.ok(!/\/[^\s]+\.ts/.test(bareSurfaced), `bare-path message leaked: ${bareSurfaced}`);
});

// ─── Regression: the normal valid-SSE parse path still works ───────────────────

test("parseSSEToOpenAIResponse still parses a normal valid SSE (no regression)", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_ok","model":"gpt-4o-mini","choices":[{"index":0,"delta":{"content":"hello"},"finish_reason":"stop"}]}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.ok(parsed);
  assert.equal(parsed.choices[0].message.content, "hello");
});

test("parseSSEToOpenAIResponse still returns null for an error-only SSE (boundary owns the error path)", () => {
  const rawSSE = ['data: {"error":{"message":"Devin CLI not found on PATH"}}', "data: [DONE]"].join(
    "\n"
  );

  // The valid-SSE parser intentionally returns null here (no `choices`); the
  // error surfacing is the job of extractSSEErrorMessage at the boundary.
  assert.equal(parseSSEToOpenAIResponse(rawSSE, "fallback-model"), null);
});

// ─── PART 1: windsurf instruction text references the IDE command-palette flow ─

test("PART 1: windsurf authHint references the `Windsurf: Provide Auth Token` command", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // After the providers.ts oauth-constants split, the windsurf authHint moved to
  // src/shared/constants/providers/oauth.ts.
  const providers = readFileSync(
    path.join(here, "../../src/shared/constants/providers/oauth.ts"),
    "utf8"
  );

  // The windsurf authHint must lead with the IDE command-palette flow.
  assert.match(
    providers,
    /Windsurf: Provide Auth Token/,
    "providers.ts windsurf authHint should reference the `Windsurf: Provide Auth Token` command"
  );
});

test("PART 1: oauth route 410 errors reference the IDE command-palette flow", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const route = readFileSync(
    path.join(here, "../../src/app/api/oauth/[provider]/[action]/route.ts"),
    "utf8"
  );

  assert.match(
    route,
    /Windsurf: Provide Auth Token/,
    "oauth route should direct users to the `Windsurf: Provide Auth Token` command"
  );
});
