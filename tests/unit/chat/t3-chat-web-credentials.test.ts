import { test } from "node:test";
import assert from "node:assert/strict";

import {
  parseT3Credentials,
  validateT3Credentials,
  T3ChatWebExecutor,
} from "@omniroute/open-sse/executors/t3-chat-web.ts";

// Issue #3007: t3.chat web cookie providers not working.
// The credential pipeline stores the single pasted string as `credentials.apiKey`
// (fallback `accessToken`), but the executor used to read `credentials.cookies`
// and `credentials.convexSessionId` directly — fields nothing ever produces — so
// validation always failed with 400 "missing or empty cookies".
// These tests feed the three valid forms via `apiKey` and assert the parser/
// validator accept them and produce a Cookie header carrying convex-session-id.

test("parseT3Credentials: form (a) — convex-session-id=...; sessionToken=...", () => {
  const creds = { apiKey: "convex-session-id=abc; sessionToken=xyz" };
  const parsed = parseT3Credentials(creds);
  assert.ok(parsed, "parser should produce credentials");
  assert.ok(validateT3Credentials(parsed), "credentials should be valid");
  assert.match(parsed.cookieHeader, /convex-session-id=/);
  assert.match(parsed.cookieHeader, /sessionToken=xyz/);
});

test("parseT3Credentials: form (b) — full Cookie header already containing convex-session-id", () => {
  const creds = {
    apiKey:
      "__Secure-better-auth.session_token=foo; convex-session-id=session-123; theme=dark",
  };
  const parsed = parseT3Credentials(creds);
  assert.ok(parsed);
  assert.ok(validateT3Credentials(parsed));
  assert.match(parsed.cookieHeader, /convex-session-id=session-123/);
  // No duplication of convex-session-id
  assert.equal(
    parsed.cookieHeader.match(/convex-session-id=/g)?.length,
    1,
    "convex-session-id must appear exactly once"
  );
});

test("parseT3Credentials: form (c) — structured cookies=...\\nconvexSessionId=...", () => {
  const creds = {
    apiKey: "cookies=__Secure-session=foo; theme=dark\nconvexSessionId=conv-789",
  };
  const parsed = parseT3Credentials(creds);
  assert.ok(parsed);
  assert.ok(validateT3Credentials(parsed));
  assert.match(parsed.cookieHeader, /convex-session-id=conv-789/);
  assert.match(parsed.cookieHeader, /__Secure-session=foo/);
});

test("parseT3Credentials: reads accessToken fallback when apiKey is absent", () => {
  const creds = { accessToken: "convex-session-id=tok; sessionToken=zzz" };
  const parsed = parseT3Credentials(creds);
  assert.ok(parsed);
  assert.ok(validateT3Credentials(parsed));
  assert.match(parsed.cookieHeader, /convex-session-id=tok/);
});

test("validateT3Credentials: empty apiKey fails (negative case)", () => {
  const parsed = parseT3Credentials({ apiKey: "" });
  assert.equal(validateT3Credentials(parsed), false);
});

test("validateT3Credentials: undefined credentials fail", () => {
  const parsed = parseT3Credentials(undefined);
  assert.equal(validateT3Credentials(parsed), false);
});

test("execute(): empty apiKey still returns a 400 error response", async () => {
  const executor = new T3ChatWebExecutor();
  const result = await executor.execute({
    model: "gpt-4",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "" } as never,
  } as never);
  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.equal(body.error.code, "bad_request");
});
