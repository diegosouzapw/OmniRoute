/**
 * Unit tests for the UC (uncensored.com) persona executor + helpers.
 *
 * UC persona is a WebSocket web-app port: a 60s Clerk `__session` JWT (minted
 * from a durable `__client` cookie) authenticates the socket, one persona frame
 * carries the current turn + chat_history, and newline-delimited frames stream
 * back. These tests exercise the pure logic (credential resolution, JWT decode,
 * token mint, browserless Clerk email login, persona frame + context assembly,
 * frame parsing / error surfaces, soft-error detection) with a mocked `fetch`,
 * and the full executor path with a mocked WebSocket (no network).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveUcCredential,
  uidFromSessionJwt,
  sessionJwtExpiry,
  normalizeCookieJar,
  cookieHeader,
} from "../../open-sse/executors/uc/credentials.ts";
import {
  mintUcSessionToken,
  parseSetCookie,
  UcTokenCache,
} from "../../open-sse/executors/uc/clerkAuth.ts";
import {
  requestUcEmailCode,
  verifyUcEmailCode,
  UC_SIGNIN_PATH,
} from "../../open-sse/executors/uc/emailLogin.ts";
import {
  assembleUcTurn,
  buildPersonaFrame,
  ucContentToText,
  UC_IDENTITY_STEER,
} from "../../open-sse/executors/uc/protocol.ts";
import {
  UcFrameParser,
  detectUcSoftError,
  estimateUcTokens,
} from "../../open-sse/executors/uc/stream.ts";
import { UC_REGISTRY_MODELS, ucContextWindow } from "../../open-sse/executors/uc/catalog.ts";
import { buildUcWsUrl, __setUcWebSocketForTesting } from "../../open-sse/executors/uc/ws.ts";
import { UcExecutor } from "../../open-sse/executors/uc.ts";
import { ucDirectProvider } from "../../open-sse/config/providers/registry/uc-direct/index.ts";

// ─── Fixtures ────────────────────────────────────────────────────────────────

const UID = "b03dd963-d0c1-4193-99c9-f5a9d0c66b7f";
const SID = "sess_3EyqBpAa2C25iB8eJzZ2fwdsqLM";

/** Build a fake unsigned JWT with the given claims (base64url payload). */
function fakeJwt(claims: Record<string, unknown>): string {
  const b64 = (o: unknown) =>
    Buffer.from(JSON.stringify(o))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  return `${b64({ alg: "RS256", typ: "JWT" })}.${b64(claims)}.sig`;
}

function psd(extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    ucClientCookie: "client.jwt.cookie",
    ucSid: SID,
    ucUid: UID,
    ucCookies: { __client: "client.jwt.cookie", __cf_bm: "cf", _cfuvid: "uv" },
    ...extra,
  };
}

// ─── credentials.ts ──────────────────────────────────────────────────────────

test("resolveUcCredential resolves the full credential from providerSpecificData", () => {
  const cred = resolveUcCredential(psd());
  assert.ok(cred);
  assert.equal(cred!.sid, SID);
  assert.equal(cred!.uid, UID);
  assert.equal(cred!.clientCookie, "client.jwt.cookie");
  assert.equal(cred!.cookies.__client, "client.jwt.cookie");
});

test("resolveUcCredential returns null when the __client cookie is missing", () => {
  assert.equal(resolveUcCredential({ ucSid: SID, ucUid: UID }), null);
});

test("resolveUcCredential returns null when the sid is missing", () => {
  assert.equal(resolveUcCredential({ ucClientCookie: "c", ucUid: UID }), null);
});

test("resolveUcCredential folds __client into the jar when absent", () => {
  const cred = resolveUcCredential({
    ucClientCookie: "durable",
    ucSid: SID,
    ucUid: UID,
    ucCookies: { __cf_bm: "cf" },
  });
  assert.ok(cred);
  assert.equal(cred!.cookies.__client, "durable");
});

test("uidFromSessionJwt + sessionJwtExpiry decode the claims", () => {
  const jwt = fakeJwt({ uid: UID, sid: SID, exp: 1787659826 });
  assert.equal(uidFromSessionJwt(jwt), UID);
  assert.equal(sessionJwtExpiry(jwt), 1787659826);
});

test("uidFromSessionJwt returns null on garbage", () => {
  assert.equal(uidFromSessionJwt("not.a.jwt"), null);
  assert.equal(sessionJwtExpiry("not.a.jwt"), 0);
});

test("normalizeCookieJar handles both raw scalar and {value} shapes", () => {
  const flat = normalizeCookieJar({ a: "1", b: { value: "2" }, junk: { nope: 1 } });
  assert.equal(flat.a, "1");
  assert.equal(flat.b, "2");
  assert.equal(flat.junk, undefined);
});

test("cookieHeader serializes a jar to a Cookie header value", () => {
  assert.equal(cookieHeader({ a: "1", b: "2" }), "a=1; b=2");
});

// ─── clerkAuth.ts ────────────────────────────────────────────────────────────

test("parseSetCookie extracts rotated cookies and skips attributes", () => {
  const sc = "__cf_bm=NEWVAL; path=/; secure; HttpOnly, __client=DURABLE; SameSite=Lax";
  const got = parseSetCookie(sc);
  assert.equal(got.__cf_bm, "NEWVAL");
  assert.equal(got.__client, "DURABLE");
  assert.equal(got.path, undefined);
  assert.equal(got.secure, undefined);
});

test("mintUcSessionToken mints a 60s JWT from the cookie jar", async () => {
  const jwt = fakeJwt({ uid: UID, sid: SID, exp: Math.floor(Date.now() / 1000) + 60 });
  let seenUrl = "";
  let seenInit: RequestInit = {};
  const fakeFetch = (async (url: string, init: RequestInit) => {
    seenUrl = String(url);
    seenInit = init;
    return new Response(JSON.stringify({ object: "token", jwt }), {
      status: 200,
      headers: { "set-cookie": "__cf_bm=ROT; path=/" },
    });
  }) as unknown as typeof fetch;

  const r = await mintUcSessionToken({
    sid: SID,
    cookies: { __client: "c" },
    fetchImpl: fakeFetch,
  });
  assert.equal(r.ok, true);
  assert.equal(r.token!.jwt, jwt);
  assert.ok(r.token!.expiresAt > 0);
  assert.equal(r.rotatedCookies!.__cf_bm, "ROT");
  // URL + headers are the exact Clerk mint contract.
  assert.match(seenUrl, new RegExp(`/v1/client/sessions/${SID}/tokens`));
  const headers = seenInit.headers as Record<string, string>;
  assert.equal(headers.Origin, "https://uncensored.com");
  assert.match(headers.Cookie, /__client=c/);
});

test("mintUcSessionToken surfaces a 401 as a failure (durable login invalid)", async () => {
  const fakeFetch = (async () =>
    new Response("unauthorized", { status: 401 })) as unknown as typeof fetch;
  const r = await mintUcSessionToken({
    sid: SID,
    cookies: { __client: "c" },
    fetchImpl: fakeFetch,
  });
  assert.equal(r.ok, false);
  assert.equal(r.status, 401);
});

test("mintUcSessionToken fails fast without a __client cookie", async () => {
  const r = await mintUcSessionToken({ sid: SID, cookies: {} });
  assert.equal(r.ok, false);
  assert.match(r.error ?? "", /__client/);
});

test("UcTokenCache returns a fresh token and re-mints within the skew window", () => {
  const cache = new UcTokenCache();
  const now = () => 1_000_000; // fixed clock (seconds base handled internally)
  // exp 20s out (> 8s skew): fresh
  cache.set(SID, { jwt: "fresh", expiresAt: 1_000_000 / 1000 + 20 });
  assert.equal(cache.get(SID, now), "fresh");
  // exp 3s out (< 8s skew): needs re-mint
  cache.set(SID, { jwt: "stale", expiresAt: 1_000_000 / 1000 + 3 });
  assert.equal(cache.get(SID, now), null);
});

// ─── emailLogin.ts (browserless Clerk 3-step) ────────────────────────────────

test("requestUcEmailCode creates the sign-in attempt and requests the code", async () => {
  const calls: string[] = [];
  const fakeFetch = (async (url: string) => {
    const u = String(url);
    calls.push(u);
    if (u.includes("/prepare_first_factor")) {
      return new Response(JSON.stringify({ response: { status: "needs_first_factor" } }), {
        status: 200,
      });
    }
    // step 1: create sign-in
    return new Response(
      JSON.stringify({
        response: {
          id: "sia_ABC",
          status: "needs_first_factor",
          supported_first_factors: [
            { strategy: "password" },
            { strategy: "email_code", email_address_id: "idn_XYZ", safe_identifier: "a@b.c" },
          ],
        },
      }),
      { status: 200, headers: { "set-cookie": "__client=SIGNIN; path=/" } }
    );
  }) as unknown as typeof fetch;

  const r = await requestUcEmailCode({ email: "a@b.c", fetchImpl: fakeFetch });
  assert.equal(r.ok, true);
  assert.equal(r.sia, "sia_ABC");
  assert.equal(r.emailAddressId, "idn_XYZ");
  // Both steps hit the sign-in path; the second is prepare_first_factor.
  assert.equal(calls.length, 2);
  assert.ok(calls[0].includes(UC_SIGNIN_PATH));
  assert.ok(calls[1].includes("/sia_ABC/prepare_first_factor"));
});

test("requestUcEmailCode errors when email_code is not an available factor", async () => {
  const fakeFetch = (async () =>
    new Response(
      JSON.stringify({
        response: { id: "sia_1", supported_first_factors: [{ strategy: "password" }] },
      }),
      { status: 200 }
    )) as unknown as typeof fetch;
  const r = await requestUcEmailCode({ email: "a@b.c", fetchImpl: fakeFetch });
  assert.equal(r.ok, false);
  assert.match(r.error ?? "", /email_code/);
});

test("verifyUcEmailCode harvests __client + sid + uid on complete", async () => {
  const fakeFetch = (async () =>
    new Response(
      JSON.stringify({
        response: { status: "complete", created_session_id: SID },
        client: { sessions: [{ id: SID, user: { id: UID } }] },
      }),
      {
        status: 200,
        headers: { "set-cookie": "__client=DURABLE_COOKIE; path=/, __cf_bm=CF; path=/" },
      }
    )) as unknown as typeof fetch;

  const r = await verifyUcEmailCode({ sia: "sia_ABC", code: "123456", fetchImpl: fakeFetch });
  assert.equal(r.ok, true);
  assert.equal(r.credential!.clientCookie, "DURABLE_COOKIE");
  assert.equal(r.credential!.sid, SID);
  assert.equal(r.credential!.uid, UID);
  assert.equal(r.credential!.cookies.__cf_bm, "CF");
});

test("verifyUcEmailCode fails when the sign-in is not complete", async () => {
  const fakeFetch = (async () =>
    new Response(JSON.stringify({ response: { status: "needs_first_factor" } }), {
      status: 200,
    })) as unknown as typeof fetch;
  const r = await verifyUcEmailCode({ sia: "sia_ABC", code: "000000", fetchImpl: fakeFetch });
  assert.equal(r.ok, false);
  assert.match(r.error ?? "", /not complete/);
});

test("verifyUcEmailCode fails when no __client cookie is set", async () => {
  const fakeFetch = (async () =>
    new Response(
      JSON.stringify({
        response: { status: "complete", created_session_id: SID },
        client: { sessions: [{ id: SID, user: { id: UID } }] },
      }),
      { status: 200 } // no Set-Cookie
    )) as unknown as typeof fetch;
  const r = await verifyUcEmailCode({ sia: "sia_ABC", code: "123456", fetchImpl: fakeFetch });
  assert.equal(r.ok, false);
  assert.match(r.error ?? "", /__client/);
});

// ─── protocol.ts ─────────────────────────────────────────────────────────────

test("ucContentToText flattens string and multipart content", () => {
  assert.equal(ucContentToText("hi"), "hi");
  assert.equal(
    ucContentToText([
      { type: "text", text: "a" },
      { type: "image_url", image_url: { url: "x" } },
      { type: "text", text: "b" },
    ]),
    "a\nb"
  );
});

test("assembleUcTurn splits history at the last assistant and folds systems + steer", () => {
  const { text, history } = assembleUcTurn([
    { role: "system", content: "be terse" },
    { role: "user", content: "hi" },
    { role: "assistant", content: "hello" },
    { role: "user", content: "what's 2+2?" },
  ]);
  // history = everything up to & incl last assistant, roles mapped human/assistant
  assert.deepEqual(history, [
    { role: "human", content: [{ type: "text", text: "hi" }] },
    { role: "assistant", content: [{ type: "text", text: "hello" }] },
  ]);
  // current turn is the trailing user; systems + identity steer are folded in.
  assert.match(text, /be terse/);
  assert.match(text, new RegExp(UC_IDENTITY_STEER.slice(0, 20)));
  assert.match(text, /what's 2\+2\?/);
  assert.match(text, /\n\n---\n\n/);
});

test("assembleUcTurn maps a trailing tool result into the active text", () => {
  const { text, history } = assembleUcTurn([
    { role: "user", content: "weather?" },
    { role: "assistant", content: "calling tool" },
    { role: "tool", name: "get_weather", content: "sunny 20C" },
  ]);
  assert.equal(history.length, 2);
  assert.match(text, /get_weather tool already ran/);
  assert.match(text, /sunny 20C/);
});

test("assembleUcTurn maps a tool result in HISTORY to a human turn", () => {
  const { history } = assembleUcTurn([
    { role: "user", content: "q" },
    { role: "tool", content: "toolout" },
    { role: "assistant", content: "a" },
    { role: "user", content: "next" },
  ]);
  assert.deepEqual(history[1], {
    role: "human",
    content: [{ type: "text", text: "[tool result] toolout" }],
  });
});

test("buildPersonaFrame emits the exact persona wire shape and NO max_tokens", () => {
  const frame = buildPersonaFrame({
    model: "claude-opus-46",
    text: "hi",
    history: [{ role: "human", content: [{ type: "text", text: "prev" }] }],
    uid: UID,
  });
  assert.equal(frame.model, "claude-opus-46");
  assert.equal(frame.text, "hi");
  assert.equal(frame.chat_mode, "chat");
  assert.equal(frame.use_memory, false);
  assert.equal(frame.user_identifier, UID);
  assert.equal(frame.app_version, "1.0.0-web");
  assert.equal(frame.no_media_in_chat, true);
  // The forbidden knobs must NOT be present (max_tokens aborts the persona turn).
  assert.equal("max_tokens" in frame, false);
  assert.equal("direct_params" in frame, false);
  assert.equal("temperature" in frame, false);
  // Fresh uuids present.
  assert.match(String(frame.message_id), /[0-9a-f-]{36}/);
});

// ─── stream.ts ───────────────────────────────────────────────────────────────

test("UcFrameParser accumulates deltas and finishes on end_of_stream raw_text", () => {
  const p = new UcFrameParser();
  const e1 = p.feed(JSON.stringify({ message_type: "status", status: "Thinking" }));
  assert.deepEqual(e1, [{ kind: "status", text: "Thinking" }]);
  const e2 = p.feed(JSON.stringify({ message_type: "text", text: "Hel" }));
  assert.deepEqual(e2, [{ kind: "delta", text: "Hel" }]);
  const e3 = p.feed(
    JSON.stringify({ message_type: "text", text: "lo", end_of_stream: true, raw_text: "Hello!" })
  );
  assert.deepEqual(e3, [{ kind: "done", text: "Hello!" }]);
  assert.equal(p.done, true);
});

test("UcFrameParser splits multiple newline-delimited frames in one payload", () => {
  const p = new UcFrameParser();
  const raw =
    JSON.stringify({ message_type: "intermediary_message", text: "reasoning" }) +
    "\n" +
    JSON.stringify({ message_type: "text", text: "answer" });
  const evts = p.feed(raw);
  assert.deepEqual(evts, [
    { kind: "reasoning", text: "reasoning" },
    { kind: "delta", text: "answer" },
  ]);
});

test("UcFrameParser surfaces a top-level error frame immediately (incl paywall)", () => {
  for (const code of ["message_limit_exceeded", "paywall_exceeded", "rate_limit_exceeded"]) {
    const p = new UcFrameParser();
    const evts = p.feed(
      JSON.stringify({ type: "error", code, message: "nope", next_reset: "2026-01-01" })
    );
    assert.equal(evts.length, 1);
    assert.equal(evts[0].kind, "error");
    assert.match(evts[0].text, new RegExp(code));
    assert.equal(p.done, true);
  }
});

test("UcFrameParser surfaces generation_failed as a retryable error", () => {
  const p = new UcFrameParser();
  const evts = p.feed(
    JSON.stringify({ message_type: "generation_failed", direct_mode_error: "boom" })
  );
  assert.equal(evts[0].kind, "error");
  assert.match(evts[0].text, /boom/);
});

test("UcFrameParser falls back to concatenated deltas when no raw_text", () => {
  const p = new UcFrameParser();
  p.feed(JSON.stringify({ message_type: "text", text: "a" }));
  p.feed(JSON.stringify({ message_type: "text", text: "b" }));
  assert.equal(p.finalText(), "ab");
});

test("detectUcSoftError flags a short capacity apology but not a long real answer", () => {
  assert.ok(
    detectUcSoftError("Server overloaded temporarily, please switch models and try again.")
  );
  assert.equal(detectUcSoftError("x".repeat(400) + " server overloaded temporarily"), null);
  assert.equal(
    detectUcSoftError("Here is a normal answer about servers and load balancing."),
    null
  );
});

test("estimateUcTokens is a positive ~4char/token estimate", () => {
  assert.equal(estimateUcTokens(""), 0);
  assert.equal(estimateUcTokens("abcd"), 1);
  assert.ok(estimateUcTokens("a".repeat(40)) >= 10);
});

// ─── catalog.ts ──────────────────────────────────────────────────────────────

test("UC catalog exposes the verified persona models, all tool-calling", () => {
  assert.equal(UC_REGISTRY_MODELS.length, 19);
  assert.ok(UC_REGISTRY_MODELS.every((m) => m.toolCalling === true));
  const ids = UC_REGISTRY_MODELS.map((m) => m.id);
  assert.ok(ids.includes("claude-opus-46"));
  assert.ok(ids.includes("claude-opus-48-uncensored"));
  assert.ok(ids.includes("grok-4-3"));
  // reasoning flags where expected
  assert.ok(UC_REGISTRY_MODELS.find((m) => m.id === "deepseek-r1")?.supportsReasoning);
});

test("ucContextWindow returns per-model windows with a sane default", () => {
  assert.equal(ucContextWindow("claude-opus-46"), 1_000_000);
  assert.equal(ucContextWindow("grok-4-20"), 2_000_000);
  assert.equal(ucContextWindow("nonexistent"), 128_000);
});

// ─── ws.ts URL construction ──────────────────────────────────────────────────

test("buildUcWsUrl embeds uid, token, and a cache-bust", () => {
  const url = buildUcWsUrl(UID, "JWT123");
  assert.match(url, new RegExp(`wss://internal-6\\.pubyar\\.com/ws/${UID}`));
  assert.match(url, /token=JWT123/);
  assert.match(url, /_t=\d+/);
});

// ─── Executor path with a MOCKED WebSocket ───────────────────────────────────

/**
 * A minimal fake WebSocket matching the `ws` surface the driver uses: onopen /
 * onmessage / onerror / onclose + send/close. It replays a scripted set of
 * server frames (newline-delimited JSON strings) right after `send` is called.
 */
function makeFakeWs(frames: string[], opts: { failConnect?: boolean } = {}) {
  return class FakeWS {
    onopen: (() => void) | null = null;
    onmessage: ((e: { data: unknown }) => void) | null = null;
    onerror: (() => void) | null = null;
    onclose: (() => void) | null = null;
    readyState = 1;
    constructor(_url: string, _opts?: unknown) {
      if (opts.failConnect) {
        setTimeout(() => this.onerror?.(), 0);
        return;
      }
      setTimeout(() => this.onopen?.(), 0);
    }
    send(_data: string) {
      // Deliver scripted frames, then close.
      setTimeout(() => {
        for (const f of frames) this.onmessage?.({ data: f });
        this.onclose?.();
      }, 0);
    }
    close() {
      /* no-op */
    }
  } as unknown as typeof import("ws").default;
}

/** Mint-token fetch stub so the executor's ensureSessionToken succeeds. */
function tokenFetch(): typeof fetch {
  const jwt = fakeJwt({ uid: UID, sid: SID, exp: Math.floor(Date.now() / 1000) + 60 });
  return (async () =>
    new Response(JSON.stringify({ object: "token", jwt }), {
      status: 200,
    })) as unknown as typeof fetch;
}

// Loose completion shape for assertions (avoids `any` while allowing drilling).
interface LooseCompletion {
  object?: string;
  choices?: Array<{
    index?: number;
    message?: { role?: string; content?: string; reasoning_content?: string; tool_calls?: unknown };
    finish_reason?: string;
  }>;
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
  error?: { code?: string; message?: string; type?: string };
}

async function readJson(result: unknown): Promise<{ status: number; json: LooseCompletion }> {
  const resp = (result as { response?: Response }).response ?? (result as Response);
  const text = await resp.text();
  return { status: resp.status, json: text ? (JSON.parse(text) as LooseCompletion) : {} };
}

test("UcExecutor non-streaming returns an OpenAI chat.completion", async (t) => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = tokenFetch();
  const restore = __setUcWebSocketForTesting(
    makeFakeWs([JSON.stringify({ message_type: "text", end_of_stream: true, raw_text: "PONG" })])
  );
  t.after(() => {
    restore();
    globalThis.fetch = origFetch;
  });

  const exec = new UcExecutor();
  const result = await exec.execute({
    model: "claude-opus-46",
    stream: false,
    credentials: { providerSpecificData: psd() },
    body: { messages: [{ role: "user", content: "ping" }] },
  } as never);
  const { status, json } = await readJson(result);
  assert.equal(status, 200);
  assert.equal(json.object, "chat.completion");
  assert.equal(json.choices[0].message.content, "PONG");
  assert.equal(json.choices[0].finish_reason, "stop");
  assert.ok(json.usage.total_tokens > 0);
});

test("UcExecutor streaming emits SSE chunks incl the raw_text remainder", async (t) => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = tokenFetch();
  // Short answer arrives ONLY in raw_text (no deltas) — the remainder-flush must emit it.
  const restore = __setUcWebSocketForTesting(
    makeFakeWs([JSON.stringify({ message_type: "text", end_of_stream: true, raw_text: "READY" })])
  );
  t.after(() => {
    restore();
    globalThis.fetch = origFetch;
  });

  const exec = new UcExecutor();
  const result = await exec.execute({
    model: "grok-4-3",
    stream: true,
    credentials: { providerSpecificData: psd() },
    body: { messages: [{ role: "user", content: "ping" }] },
  } as never);
  const resp = (result as { response: Response }).response;
  assert.equal(resp.status, 200);
  const body = await resp.text();
  const assembled = body
    .split("\n\n")
    .filter((l) => l.startsWith("data:") && !l.includes("[DONE]"))
    .map((c) => {
      try {
        return JSON.parse(c.slice(5).trim())?.choices?.[0]?.delta?.content ?? "";
      } catch {
        return "";
      }
    })
    .join("");
  assert.equal(assembled, "READY");
  assert.match(body, /data: \[DONE\]/);
});

test("UcExecutor streaming flushes long delta content without duplication", async (t) => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = tokenFetch();
  const restore = __setUcWebSocketForTesting(
    makeFakeWs([
      JSON.stringify({ message_type: "text", text: "Hel" }),
      JSON.stringify({ message_type: "text", text: "lo" }),
      JSON.stringify({ message_type: "text", end_of_stream: true, raw_text: "Hello" }),
    ])
  );
  t.after(() => {
    restore();
    globalThis.fetch = origFetch;
  });

  const exec = new UcExecutor();
  const result = await exec.execute({
    model: "claude-opus-46",
    stream: true,
    credentials: { providerSpecificData: psd() },
    body: { messages: [{ role: "user", content: "hi" }] },
  } as never);
  const resp = (result as { response: Response }).response;
  const body = await resp.text();
  const assembled = body
    .split("\n\n")
    .filter((l) => l.startsWith("data:") && !l.includes("[DONE]"))
    .map((c) => {
      try {
        return JSON.parse(c.slice(5).trim())?.choices?.[0]?.delta?.content ?? "";
      } catch {
        return "";
      }
    })
    .join("");
  // Deltas streamed "Hello"; raw_text "Hello" adds no duplicate remainder.
  assert.equal(assembled, "Hello");
});

test("UcExecutor maps a paywall_exceeded frame to a 429", async (t) => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = tokenFetch();
  const restore = __setUcWebSocketForTesting(
    makeFakeWs([
      JSON.stringify({
        type: "error",
        code: "paywall_exceeded",
        message: "Paywall limit exceeded",
      }),
    ])
  );
  t.after(() => {
    restore();
    globalThis.fetch = origFetch;
  });

  const exec = new UcExecutor();
  const result = await exec.execute({
    model: "claude-opus-46",
    stream: false,
    credentials: { providerSpecificData: psd() },
    body: { messages: [{ role: "user", content: "ping" }] },
  } as never);
  const { status, json } = await readJson(result);
  assert.equal(status, 429);
  assert.equal(json.error.code, "uc_paywall_exceeded");
});

test("UcExecutor returns 401 when the connection is unconfigured", async () => {
  const exec = new UcExecutor();
  const result = await exec.execute({
    model: "claude-opus-46",
    stream: false,
    credentials: { providerSpecificData: {} },
    body: { messages: [{ role: "user", content: "ping" }] },
  } as never);
  const { status, json } = await readJson(result);
  assert.equal(status, 401);
  assert.equal(json.error.code, "uc_unconfigured");
});

test("UcExecutor returns the executor wrapper shape (response+url+headers+transformedBody)", async (t) => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = tokenFetch();
  const restore = __setUcWebSocketForTesting(
    makeFakeWs([JSON.stringify({ message_type: "text", end_of_stream: true, raw_text: "ok" })])
  );
  t.after(() => {
    restore();
    globalThis.fetch = origFetch;
  });

  const exec = new UcExecutor();
  const result = (await exec.execute({
    model: "claude-opus-46",
    stream: false,
    credentials: { providerSpecificData: psd() },
    body: { messages: [{ role: "user", content: "ping" }] },
  } as never)) as {
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  };
  assert.ok(result.response instanceof Response);
  assert.equal(typeof result.url, "string");
  assert.ok(result.transformedBody);
});

// ─── uc-direct registry (metered OpenAI-compatible REST) ─────────────────────

test("ucDirectProvider is a default-executor OpenAI provider with x-api-key auth", () => {
  assert.equal(ucDirectProvider.id, "uc-direct");
  assert.equal(ucDirectProvider.alias, "ucd");
  assert.equal(ucDirectProvider.format, "openai");
  assert.equal(ucDirectProvider.executor, "default");
  assert.equal(ucDirectProvider.authType, "apikey");
  // UC uses X-api-key (never-expiring uai_sk_live_ key), NOT Bearer.
  assert.equal(ucDirectProvider.authHeader, "x-api-key");
  assert.equal(ucDirectProvider.baseUrl, "https://api.uncensored.com/api/v1");
});

test("ucDirectProvider ships the metered catalog with unique ids", () => {
  assert.ok(ucDirectProvider.models.length >= 60, "expected the full metered catalog");
  const ids = ucDirectProvider.models.map((m) => m.id);
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  // Ids are REST SHORTNAMES (no provider prefix) — this is what the API expects.
  assert.ok(
    ids.every((id) => !id.includes("/")),
    "uc-direct ids must be shortnames"
  );
  // A few representative live models.
  assert.ok(ids.includes("claude-opus-4.8"));
  assert.ok(ids.includes("gpt-5.5"));
  assert.ok(ids.includes("gemini-3.1-pro-preview"));
});
