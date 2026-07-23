import test from "node:test";
import assert from "node:assert/strict";

import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

// ---------------------------------------------------------------------------
// OpencodeExecutor.buildHeaders — request format auth switch
// ---------------------------------------------------------------------------

test("OpencodeExecutor.buildHeaders: default format uses Bearer Authorization", () => {
  const executor = new OpencodeExecutor("opencode");
  // _requestFormat defaults to null → default Bearer path
  const headers = executor.buildHeaders({ apiKey: "sk-oc-1" }, true);
  assert.equal(headers["Authorization"], "Bearer sk-oc-1");
  assert.equal(headers["x-api-key"], undefined);
});

test("OpencodeExecutor.buildHeaders: claude format uses x-api-key header", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "claude";
  const headers = executor.buildHeaders({ apiKey: "sk-claude-1" }, true);
  assert.equal(headers["x-api-key"], "sk-claude-1");
  assert.equal(headers["Authorization"], undefined);
});

test("OpencodeExecutor.buildHeaders: claude format sets anthropic-version header", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "claude";
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["anthropic-version"], "2023-06-01");
});

test("OpencodeExecutor.buildHeaders: non-claude format omits anthropic-version", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "openai";
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["anthropic-version"], undefined);
});

test("OpencodeExecutor.buildHeaders: stream=true sets Accept text/event-stream", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["Accept"], "text/event-stream");
});

test("OpencodeExecutor.buildHeaders: stream=false omits Accept header", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, false);
  assert.equal(headers["Accept"], undefined);
});

test("OpencodeExecutor.buildHeaders: uses accessToken when apiKey is absent", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ accessToken: "tok-oc" }, true);
  assert.equal(headers["Authorization"], "Bearer tok-oc");
});

test("OpencodeExecutor.buildHeaders: apiKey takes precedence over accessToken", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "sk-pri", accessToken: "tok-sec" }, true);
  assert.equal(headers["Authorization"], "Bearer sk-pri");
});

test("OpencodeExecutor.buildHeaders: claude format with accessToken still uses x-api-key", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "claude";
  const headers = executor.buildHeaders({ apiKey: "sk-a", accessToken: "tok-b" }, true);
  assert.equal(headers["x-api-key"], "sk-a");
  assert.equal(headers["Authorization"], undefined);
});

test("OpencodeExecutor.buildHeaders: Content-Type always application/json", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["Content-Type"], "application/json");
});

test("OpencodeExecutor.buildHeaders: omits User-Agent when no client UA (forward-only, not fabricated)", () => {
  // Forward-only contract (see opencode-executor.test.ts): opencode client identity headers
  // are opencode-internal — inventing them risks upstream rejection, so we never fabricate a
  // default. A pure dedup refactor (#5720) briefly regressed this by defaulting to
  // "opencode/local"; the executor forwards a client-sent User-Agent but adds none of its own.
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["User-Agent"], undefined);
});

test("OpencodeExecutor.buildHeaders: preserves client User-Agent when provided", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true, {
    "User-Agent": "opencode/1.17.12",
  });
  assert.equal(headers["User-Agent"], "opencode/1.17.12");
});

test("OpencodeExecutor.buildHeaders: omits x-opencode-client when absent (forward-only, not fabricated)", () => {
  // x-opencode-client / x-opencode-project valid values are opencode-internal; fabricating a
  // default ("cli") risks upstream rejection, so they stay forward-only (see opencode-executor.test.ts).
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["x-opencode-client"], undefined);
});

test("OpencodeExecutor.buildHeaders: preserves x-opencode-client from client headers", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true, {
    "x-opencode-client": "desktop",
  });
  assert.equal(headers["x-opencode-client"], "desktop");
});
