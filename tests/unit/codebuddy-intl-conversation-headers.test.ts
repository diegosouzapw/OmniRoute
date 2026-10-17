// The intl gateway's channel verification rejects requests without the
// X-Conversation-* header family with HTTP 400 code 11128 "conversation id
// missing". The official IDE sends a conversation id derived stably from the
// session key plus fresh per-request/per-message ids, and mirrors the message
// id on X-Request-ID.
import test from "node:test";
import assert from "node:assert/strict";
import {
  CodeBuddyIntlExecutor,
  withConversationHeaders,
} from "../../open-sse/executors/codebuddy-intl.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

test("CodeBuddyIntlExecutor sends the X-Conversation-* family", async (t) => {
  const exec = new CodeBuddyIntlExecutor();
  const creds = { accessToken: "***" };

  await t.test("always sets the three required headers", () => {
    const h = exec.buildHeaders(creds, true, null, "glm-5.2", null, {
      messages: [{ role: "user", content: "hi" }],
    });
    assert.match(h["X-Conversation-ID"], UUID_RE);
    assert.match(h["X-Conversation-Request-ID"], UUID_RE);
    assert.match(h["X-Conversation-Message-ID"], UUID_RE);
    assert.equal(h["X-Request-ID"], h["X-Conversation-Message-ID"]);
  });

  await t.test("keeps the conversation id stable across retries of the same turn", () => {
    const body = { messages: [{ role: "user", content: "same opening message" }] };
    const a = exec.buildHeaders(creds, true, null, "m", null, body);
    const b = exec.buildHeaders(creds, true, null, "m", null, body);
    assert.equal(a["X-Conversation-ID"], b["X-Conversation-ID"]);
    assert.notEqual(a["X-Conversation-Request-ID"], b["X-Conversation-Request-ID"]);
    assert.notEqual(a["X-Conversation-Message-ID"], b["X-Conversation-Message-ID"]);
  });

  await t.test("prefers an explicit session id over the message-derived key", () => {
    const a = exec.buildHeaders(creds, true, null, "m", null, {
      session_id: "sess-123",
      messages: [{ role: "user", content: "hi" }],
    });
    const b = exec.buildHeaders(creds, true, null, "m", null, {
      session_id: "sess-456",
      messages: [{ role: "user", content: "hi" }],
    });
    assert.notEqual(a["X-Conversation-ID"], b["X-Conversation-ID"]);
  });

  await t.test("supports typed-block user content for the derived key", () => {
    const h = exec.buildHeaders(creds, true, null, "m", null, {
      messages: [{ role: "user", content: [{ type: "text", text: "typed block" }] }],
    });
    assert.match(h["X-Conversation-ID"], UUID_RE);
  });

  await t.test("falls back to a random uuid when there is nothing to derive from", () => {
    const h = exec.buildHeaders(creds, true, null, "m", null, { messages: [] });
    assert.match(h["X-Conversation-ID"], UUID_RE);
  });

  await t.test("does not throw on a missing or null body", () => {
    for (const body of [undefined, null]) {
      const h = exec.buildHeaders(creds, true, null, "m", null, body);
      assert.match(h["X-Conversation-ID"], UUID_RE);
    }
  });
});

test("idempotency of a second pass over the same header bag", () => {
  const body = { messages: [{ role: "user", content: "hi" }] };
  const first = withConversationHeaders({}, body);
  const second = withConversationHeaders({ ...first }, body);
  assert.equal(second["X-Conversation-ID"], first["X-Conversation-ID"]);
  assert.equal(second["X-Conversation-Request-ID"], first["X-Conversation-Request-ID"]);
  assert.equal(second["X-Conversation-Message-ID"], first["X-Conversation-Message-ID"]);
  assert.equal(second["X-Request-ID"], first["X-Request-ID"]);
});

test("caller-supplied ids are preserved", async (t) => {
  const body = { messages: [{ role: "user", content: "hi" }] };

  await t.test("keeps non-empty values and only fills the gaps", () => {
    const out = withConversationHeaders(
      {
        "X-Conversation-ID": "11111111-1111-1111-1111-111111111111",
        "X-Conversation-Message-ID": "fixed-message-id",
      },
      body
    );
    assert.equal(out["X-Conversation-ID"], "11111111-1111-1111-1111-111111111111");
    assert.equal(out["X-Conversation-Message-ID"], "fixed-message-id");
    assert.equal(out["X-Request-ID"], "fixed-message-id");
    assert.match(out["X-Conversation-Request-ID"], UUID_RE);
  });

  await t.test("treats blank values as absent", () => {
    const out = withConversationHeaders({ "X-Conversation-ID": "   " }, body);
    assert.match(out["X-Conversation-ID"], UUID_RE);
  });
});

test("header lookup is case-insensitive", async (t) => {
  const body = { messages: [{ role: "user", content: "hi" }] };

  await t.test("does not duplicate a caller's lowercase conversation id", () => {
    const out = withConversationHeaders({ "x-conversation-id": "caller-lower" }, body);
    const idKeys = Object.keys(out).filter((k) => k.toLowerCase() === "x-conversation-id");
    assert.equal(idKeys.length, 1);
    assert.equal(out["x-conversation-id"], "caller-lower");
  });

  await t.test("does not duplicate a caller's mixed-case message id", () => {
    const out = withConversationHeaders({ "X-Conversation-Message-Id": "caller-mixed" }, body);
    const msgKeys = Object.keys(out).filter((k) => k.toLowerCase() === "x-conversation-message-id");
    assert.equal(msgKeys.length, 1);
    assert.equal(out["X-Request-ID"], "caller-mixed");
  });

  await t.test("recognises a lowercase X-Request-ID when mirroring", () => {
    const out = withConversationHeaders({ "x-request-id": "caller-trace" }, body);
    assert.equal(out["x-request-id"], "caller-trace");
    assert.equal(out["X-Conversation-Message-ID"], "caller-trace");
  });

  await t.test("fills a fetch Headers instance instead of adding plain properties", () => {
    const h = new Headers({ "x-conversation-id": "caller-lower" });
    const out = withConversationHeaders(h, body);
    assert.equal(out.get("X-Conversation-ID"), "caller-lower");
    assert.ok(out.get("X-Conversation-Request-ID"));
    assert.ok(out.get("X-Conversation-Message-ID"));
    assert.equal((out as unknown as Record<string, unknown>)["X-Conversation-ID"], undefined);
  });
});

test("buildHeaders fails closed when the family cannot be attached", () => {
  const exec = new CodeBuddyIntlExecutor();
  const realKeys = Object.keys;
  try {
    Object.keys = () => {
      throw new Error("simulated hostile headers");
    };
    let caught: Error | null = null;
    try {
      exec.buildHeaders({ accessToken: "x" }, true, null, "m", null, { messages: [] });
    } catch (error) {
      caught = error as Error;
    }
    assert.ok(caught instanceof Error);
    assert.match(caught.message, /channel verification/i);
    assert.match(caught.message, /X-Conversation/);
    assert.match(caught.message, /11128/);
  } finally {
    Object.keys = realKeys;
  }
});

test("parseError classifies the 11128 variants", async (t) => {
  const exec = new CodeBuddyIntlExecutor();
  const res = (status = 400) => new Response(null, { status });

  await t.test("names channel verification for the conversation-id variant", () => {
    const body = JSON.stringify({
      code: 11128,
      msg: "conversation id missing",
      displayTips: { en: "This call failed channel verification" },
    });
    const out = exec.parseError(res(), body);
    assert.equal(out.status, 400);
    assert.match(out.message, /channel verification/i);
    assert.match(out.message, /X-Conversation/);
  });

  await t.test("does NOT claim channel verification for the system-prompt variant", () => {
    const body = JSON.stringify({ code: 11128, msg: "first message is not system prompt" });
    const out = exec.parseError(res(), body);
    assert.doesNotMatch(out.message, /channel verification/i);
  });
});
