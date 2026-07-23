import test from "node:test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

// Issue #7134 — claude-web reported "Claude Web API error (400) with no
// response body" even when Claude's upstream DID send a real JSON error body.
//
// Root cause: tlsFetchStreaming() streams the upstream response to a temp
// file via tls-client-node's `streamOutputPath` mode. For a non-SSE,
// non-2xx response, the native binding resolves with an EMPTY in-memory
// `body` field (it only populates `body` for its non-streaming mode) even
// though the real error bytes were already written to the temp file and
// even peeked (`looksLikeSse`) to decide the response wasn't SSE. The old
// code read the empty `r.body` instead of the file it just peeked, throwing
// away the real upstream error detail.
//
// This test injects a fake `client` (matching the `{ request }` shape
// tlsFetchStreaming already accepts for DI) that reproduces the exact
// tls-client-node contract under `streamOutputPath`: write bytes to the file,
// resolve with an empty `body`. No `--experimental-test-module-mocks` flag
// needed — this exercises the real, unmodified `tlsFetchStreaming` via
// dependency injection instead of module-mocking `tls-client-node`.

const { tlsFetchStreaming } = await import("../../open-sse/services/claudeTlsClient.ts");

const REAL_CLAUDE_ERROR_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "invalid_request_error",
    message: "This conversation UUID does not exist or you do not have access to it.",
  },
});

function makeFakeClient(status: number, bodyOnFile: string) {
  return {
    request: async (_url: string, opts: Record<string, unknown>) => {
      const streamOutputPath = opts.streamOutputPath as string;
      await writeFile(streamOutputPath, bodyOnFile);
      return {
        status,
        headers: {},
        // tls-client-node does not populate `body` for streamed requests —
        // this is the exact defect condition.
        body: "",
        cookies: {},
        text: async () => "",
        json: async () => ({}),
        bytes: async () => new Uint8Array(),
      };
    },
  };
}

test("issue #7134: tlsFetchStreaming surfaces the real error body for a non-SSE 400 under stream:true", async () => {
  const client = makeFakeClient(400, REAL_CLAUDE_ERROR_BODY);

  const result = await tlsFetchStreaming(
    client,
    "https://claude.ai/api/organizations/x/chat_conversations/y/completion",
    { method: "POST" },
    "[DONE]",
    null,
    5_000
  );

  assert.equal(result.status, 400);
  assert.equal(result.body, null);
  assert.ok(
    result.text && result.text.includes("does not exist or you do not have access to it"),
    `expected the real Claude error body to be surfaced, got: ${JSON.stringify(result.text)}`
  );
});

test("issue #7134: tlsFetchStreaming still uses r.body when the native client DOES populate it", async () => {
  const client = {
    request: async (_url: string, opts: Record<string, unknown>) => {
      const streamOutputPath = opts.streamOutputPath as string;
      await writeFile(streamOutputPath, "{}");
      return {
        status: 403,
        headers: {},
        body: "populated body from native client",
        cookies: {},
        text: async () => "",
        json: async () => ({}),
        bytes: async () => new Uint8Array(),
      };
    },
  };

  const result = await tlsFetchStreaming(
    client,
    "https://claude.ai/api/organizations/x/chat_conversations/y/completion",
    { method: "POST" },
    "[DONE]",
    null,
    5_000
  );

  assert.equal(result.status, 403);
  assert.equal(result.text, "populated body from native client");
});
