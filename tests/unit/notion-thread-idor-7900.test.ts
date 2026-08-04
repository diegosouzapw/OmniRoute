// Regression guard for the cross-tenant IDOR flagged in the #7900 security review:
// the Notion thread-session cache was keyed only by spaceId (space-, not user-scoped)
// and accepted an arbitrary client-supplied thread id, so one user of a shared Notion
// space could pin/read another user's thread. Fix: validate the id is a real Notion
// UUID, and namespace the cache per caller (hash of the caller's cookie).

import test from "node:test";
import assert from "node:assert/strict";
import {
  isValidNotionThreadId,
  readClientThreadId,
  hashNotionCallerCookie,
} from "../../open-sse/services/notionThreadSessions.ts";

test("isValidNotionThreadId accepts real Notion UUIDs (dashed + undashed), rejects junk", () => {
  assert.equal(isValidNotionThreadId("11111111-2222-3333-4444-555555555555"), true);
  assert.equal(isValidNotionThreadId("11111111222233334444555555555555"), true);
  assert.equal(isValidNotionThreadId("../../etc/passwd"), false);
  assert.equal(isValidNotionThreadId("not-a-uuid"), false);
  assert.equal(isValidNotionThreadId(""), false);
  assert.equal(isValidNotionThreadId("11111111-2222-3333-4444-55555555555"), false); // too short
});

test("readClientThreadId rejects a non-UUID client-supplied thread id (body + header)", () => {
  // A malformed id must NOT be accepted into the session cache.
  assert.equal(readClientThreadId({ notion_thread_id: "attacker-pinned-value" }), "");
  assert.equal(readClientThreadId({ thread_id: "'; DROP TABLE" }), "");
  assert.equal(
    readClientThreadId({}, { "x-notion-thread-id": "../../secret" }),
    ""
  );
  // A well-formed id is still accepted.
  const good = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  assert.equal(readClientThreadId({ notion_thread_id: good }), good);
  assert.equal(readClientThreadId({}, { "x-notion-thread-id": good }), good);
});

test("hashNotionCallerCookie namespaces per caller — different cookies never collide", () => {
  const a = hashNotionCallerCookie("token_v2=USER_A_SESSION; space=X");
  const b = hashNotionCallerCookie("token_v2=USER_B_SESSION; space=X");
  assert.notEqual(a, b, "two users of the same space must get different cache namespaces");
  // Stable for the same caller.
  assert.equal(a, hashNotionCallerCookie("token_v2=USER_A_SESSION; space=X"));
  // Never stores the raw cookie.
  assert.ok(!a.includes("USER_A_SESSION"));
  assert.equal(hashNotionCallerCookie(""), "anon");
});
