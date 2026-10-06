/**
 * Regression test for PR #10571 — `x-opencode-session` must be a STABLE,
 * conversation-scoped fingerprint (via `generateSessionId()`) instead of a
 * fresh random UUID on every request, so upstream prompt caching can hit
 * across requests belonging to the same conversation.
 *
 * `open-sse/utils/opencodeHeaders.ts::applyCliDefaults` derives
 * `x-opencode-session` from `generateSessionId(sessionBody)`
 * (`open-sse/services/sessionManager.ts`) when a `sessionBody` is supplied.
 *
 * Since 2026-09-17 the upstream also checks the SHAPE of that header: `ses_` + 12 hex +
 * 14 base62, anything else answering 403 FreeTierError. The fingerprint therefore goes
 * out rendered in that shape — stability (and so prompt caching) is unchanged, only the
 * rendering is — and a request without a derivable fingerprint gets a random id in the
 * same shape rather than a UUID.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { forwardOpencodeClientHeaders } from "../../open-sse/utils/opencodeHeaders.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SESSION_HASH_RE = /^ses_[0-9a-f]{12}[0-9A-Za-z]{14}$/;

const CLI_DEFAULTS = { userAgent: "opencode/1.18.31", client: "desktop", project: "global" };

const CONVERSATION_A = {
  model: "big-pickle",
  messages: [{ role: "user", content: "Hello there" }],
};

const CONVERSATION_A_SECOND_TURN = {
  model: "big-pickle",
  messages: [
    { role: "user", content: "Hello there" },
    { role: "assistant", content: "Hi! How can I help?" },
    { role: "user", content: "What's the weather?" },
  ],
};

const CONVERSATION_B_DIFFERENT_MODEL = {
  model: "deepseek-v4-flash-free",
  messages: [{ role: "user", content: "Hello there" }],
};

const CONVERSATION_C_DIFFERENT_FIRST_MESSAGE = {
  model: "big-pickle",
  messages: [{ role: "user", content: "A completely different opening message" }],
};

test("x-opencode-session is a stable fingerprint hash (not a random UUID) when sessionBody is provided", () => {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headers,
    {},
    { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_A }
  );
  assert.match(headers["x-opencode-session"] ?? "", SESSION_HASH_RE);
  assert.doesNotMatch(
    headers["x-opencode-session"] ?? "",
    UUID_RE,
    "must not be a random UUID when a fingerprint can be derived"
  );
});

test("x-opencode-session stays STABLE across requests in the same conversation (same model + growing message history keeps the first-user-message fingerprint)", () => {
  const headersFirstTurn: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headersFirstTurn,
    {},
    { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_A }
  );

  const headersSecondTurn: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headersSecondTurn,
    {},
    { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_A_SECOND_TURN }
  );

  assert.equal(
    headersFirstTurn["x-opencode-session"],
    headersSecondTurn["x-opencode-session"],
    "same conversation (same model + same first user message) must yield the same session id across turns"
  );
});

test("x-opencode-session CHANGES when the model differs", () => {
  const headersA: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headersA,
    {},
    { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_A }
  );

  const headersB: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headersB,
    {},
    { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_B_DIFFERENT_MODEL }
  );

  assert.notEqual(
    headersA["x-opencode-session"],
    headersB["x-opencode-session"],
    "a different model must produce a different session id"
  );
});

test("x-opencode-session CHANGES when the first user message (conversation identity) differs", () => {
  const headersA: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headersA,
    {},
    { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_A }
  );

  const headersC: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headersC,
    {},
    { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_C_DIFFERENT_FIRST_MESSAGE }
  );

  assert.notEqual(
    headersA["x-opencode-session"],
    headersC["x-opencode-session"],
    "a different conversation (different first user message) must produce a different session id"
  );
});

test("x-opencode-session falls back to a random canonical id when no sessionBody is provided", () => {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(headers, {}, { cliDefaults: CLI_DEFAULTS });
  assert.match(headers["x-opencode-session"] ?? "", SESSION_HASH_RE);
  assert.doesNotMatch(headers["x-opencode-session"] ?? "", UUID_RE);
});

test("a client-supplied x-opencode-session still wins over the derived fingerprint, mapped one-to-one", () => {
  const sessionFor = (clientSession: string) => {
    const headers: Record<string, string> = {};
    forwardOpencodeClientHeaders(
      headers,
      { "x-opencode-session": clientSession },
      { cliDefaults: CLI_DEFAULTS, sessionBody: CONVERSATION_A }
    );
    return headers["x-opencode-session"] ?? "";
  };
  const mapped = sessionFor("client-supplied-session-id");
  assert.match(mapped, SESSION_HASH_RE, "rendered in the shape the upstream accepts");
  assert.equal(sessionFor("client-supplied-session-id"), mapped, "same client session, same id");
  assert.notEqual(sessionFor("another-session-id"), mapped, "different session, different id");
});

test("OpencodeExecutor.buildHeaders derives a stable x-opencode-session from the request body across calls with the same conversation", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const headersFirst = executor.buildHeaders(null, true, null, "big-pickle", undefined, {
    model: "big-pickle",
    messages: [{ role: "user", content: "Same conversation" }],
  });
  const headersSecond = executor.buildHeaders(null, true, null, "big-pickle", undefined, {
    model: "big-pickle",
    messages: [
      { role: "user", content: "Same conversation" },
      { role: "assistant", content: "..." },
      { role: "user", content: "follow-up" },
    ],
  });

  assert.match(headersFirst["x-opencode-session"] ?? "", SESSION_HASH_RE);
  assert.equal(headersFirst["x-opencode-session"], headersSecond["x-opencode-session"]);
});

test("Responses requests use the same canonical session as every other surface", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "openai-responses";
  const headers = executor.buildHeaders(
    null,
    true,
    null,
    "muse-spark-1.2-contributor-free",
    undefined,
    {
      model: "muse-spark-1.2-contributor-free",
      input: [],
    }
  );
  // The UUID this path used to force is now refused upstream. Measured 2026-09-17 on
  // muse-spark-1.3-contributor-free: the Responses surface answers 200 with a canonical
  // `ses_` session, so the transport no longer needs a shape of its own.
  assert.match(headers["x-opencode-session"] ?? "", SESSION_HASH_RE);
});

test("OpencodeExecutor.buildHeaders derives a DIFFERENT x-opencode-session for a different conversation body", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const headersA = executor.buildHeaders(null, true, null, "big-pickle", undefined, {
    model: "big-pickle",
    messages: [{ role: "user", content: "Conversation one" }],
  });
  const headersB = executor.buildHeaders(null, true, null, "big-pickle", undefined, {
    model: "big-pickle",
    messages: [{ role: "user", content: "Conversation two, totally different" }],
  });

  assert.notEqual(headersA["x-opencode-session"], headersB["x-opencode-session"]);
});
