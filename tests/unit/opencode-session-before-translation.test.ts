import assert from "node:assert/strict";
import test from "node:test";
import { buildExecutorClientHeaders } from "../../open-sse/handlers/chatCore/executorClientHeaders.ts";
import { resolveOpencodeSessionIdentity } from "../../open-sse/utils/opencodeSessionIdentity.ts";

test("original Claude metadata survives executor header normalization before translation", () => {
  const body = { metadata: { user_id: JSON.stringify({ session_id: "claude-conversation" }) } };
  const result = buildExecutorClientHeaders({}, "claude-cli", { provider: "opencode-go", body });
  assert.equal(result?.["x-opencode-session"], "claude-conversation");
});

test("body identity is not forwarded for another provider", () => {
  const result = buildExecutorClientHeaders({}, undefined, {
    provider: "openai",
    body: { thread_id: "private" },
  });
  assert.equal(result, null);
});

test("OpenCode headers preserve native identity and strip lease-control headers", () => {
  const result = buildExecutorClientHeaders(
    new Headers({ Session_Id: "native-conversation", "x-omniroute-lease-owner": "private-owner" }),
    undefined,
    { provider: "opencode" }
  );
  assert.equal(result?.["x-opencode-session"], "native-conversation");
  assert.equal(result?.["x-omniroute-lease-owner"], undefined);
});

test("malformed or account-only Claude metadata never becomes conversation identity", () => {
  for (const user_id of ["bad-json", JSON.stringify({ account_id: "user" }), "x".repeat(4097)]) {
    const result = buildExecutorClientHeaders({}, undefined, {
      provider: "opencode-go",
      body: { metadata: { user_id } },
    });
    assert.equal(result, null);
  }
});

test("identity precedence is explicit headers, native headers, metadata, then body", () => {
  const body = { metadata: { session_id: "metadata" }, thread_id: "body" };
  assert.equal(
    resolveOpencodeSessionIdentity({ "X-OPENCODE-SESSION": "explicit", thread_id: "native" }, body),
    "explicit"
  );
  assert.equal(resolveOpencodeSessionIdentity({ thread_id: "native" }, body), "native");
  assert.equal(resolveOpencodeSessionIdentity({}, body), "metadata");
  assert.equal(resolveOpencodeSessionIdentity(null, { thread_id: "body" }), "body");
});

test("invalid identities are ignored without inventing an account-scoped session", () => {
  for (const invalid of [null, false, 42, [], {}, "", "\n", "bad\u007fvalue", "x".repeat(257)]) {
    assert.equal(
      resolveOpencodeSessionIdentity({}, { metadata: { session_id: invalid } }),
      undefined
    );
  }
  assert.equal(
    resolveOpencodeSessionIdentity({}, { metadata: { user_id: "account-name" } }),
    undefined
  );
  assert.equal(
    resolveOpencodeSessionIdentity(
      {},
      { metadata: { user_id: JSON.stringify({ session_id: "valid" }) } }
    ),
    "valid"
  );
});
