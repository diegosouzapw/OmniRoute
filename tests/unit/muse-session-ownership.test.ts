import { test } from "node:test";
import assert from "node:assert/strict";
import {
  museSessionScope,
  claimMuseSession,
  bindMuseGeneration,
  recordMuseOutput,
  usesMuseOAuthOwnership,
  museClaimCandidates,
} from "../../src/sse/services/museSessionOwnership.ts";
import { lockModel, clearAllModelLockouts } from "../../open-sse/services/accountFallback.ts";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";

const candidates = [{ id: "account-a" }, { id: "account-b" }];
test("fresh sessions alternate while tool continuations preserve exact encrypted output and owner", async () => {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ?")
    .run("muse_session_ownership");
  const scope = museSessionScope({ prompt_cache_key: "session-a" }, undefined, "client");
  const other = museSessionScope({ prompt_cache_key: "session-b" }, undefined, "client");
  assert.equal(
    claimMuseSession(scope, { input: "read fixture" }, candidates).connectionId,
    "account-a"
  );
  assert.equal(
    claimMuseSession(other, { input: "read fixture" }, candidates).connectionId,
    "account-b"
  );
  const generation = bindMuseGeneration(scope, "account-a", "private-test-key-a", "identity-a");
  const output = [
    { type: "reasoning", encrypted_content: "opaque-test-a", summary: [] },
    { type: "function_call", call_id: "call-a", name: "read", arguments: "{}" },
  ];
  const wire =
    `data: ${JSON.stringify({ type: "response.output_item.done", item: output[0] })}\r\n\r\n` +
    `data: ${JSON.stringify({ type: "response.completed", response: { output } })}\n\n` +
    "data: [DONE]\n\n";
  const bytes = new TextEncoder().encode(wire);
  const source = new ReadableStream({
    start(controller) {
      for (let offset = 0; offset < bytes.length; offset += 7)
        controller.enqueue(bytes.slice(offset, offset + 7));
      controller.close();
    },
  });
  assert.equal(
    await recordMuseOutput(
      new Response(source, { headers: { "content-type": "text/event-stream" } }),
      scope,
      generation
    ).text(),
    wire
  );
  const input = [
    ...output,
    { type: "function_call_output", call_id: "call-a", output: "fixture result" },
  ];
  const before = structuredClone(input);
  assert.equal(claimMuseSession(scope, { input }, candidates).connectionId, "account-a");
  assert.deepEqual(input, before);
  assert.throws(() => claimMuseSession(other, { input }, candidates), /not issued/);
  assert.throws(() => claimMuseSession(scope, { input }, [candidates[1]]), /unavailable/);
  assert.throws(() => claimMuseSession(scope, { input }, candidates, "account-b"), /differs/);
  assert.throws(
    () => bindMuseGeneration(scope, "account-a", "replacement-key", "identity-a"),
    /generation changed/
  );
  assert.throws(
    () => bindMuseGeneration(scope, "account-a", "private-test-key-a", "identity-b"),
    /owner changed/
  );
  assert.equal(
    bindMuseGeneration(scope, "account-a", "private-test-key-a", "identity-a"),
    generation
  );
  assert.throws(
    () =>
      claimMuseSession(
        scope,
        { input: [{ type: "function_call_output", call_id: "foreign-call", output: "foreign" }] },
        candidates
      ),
    /not issued/
  );
});

test("reminted same-account key is adopted when no replayable history was recorded", () => {
  const scope = museSessionScope({ prompt_cache_key: "remint-session" }, undefined, "client");
  const owner = claimMuseSession(scope, { input: "fresh" }, candidates);
  const first = bindMuseGeneration(scope, owner.connectionId, "minted-key-1", "stable-identity");
  const second = bindMuseGeneration(scope, owner.connectionId, "minted-key-2", "stable-identity");
  assert.notEqual(first, second);
  assert.equal(
    bindMuseGeneration(scope, owner.connectionId, "minted-key-2", "stable-identity"),
    second
  );
});

test("unknown replay, missing identity and another API client cannot adopt encrypted reasoning", () => {
  assert.throws(
    () => museSessionScope({ input: "same prompt" }, undefined, "client"),
    /explicit session/
  );
  const scope = museSessionScope({ prompt_cache_key: "unknown-session" }, undefined, "client");
  for (const input of [
    [{ type: "reasoning", encrypted_content: "foreign" }],
    [{ type: "function_call_output", call_id: "old", output: "old result" }],
  ]) {
    assert.throws(() => claimMuseSession(scope, { input }, candidates), /no recorded owner/);
  }
  assert.throws(
    () => claimMuseSession(scope, { previous_response_id: "old" }, candidates),
    /no recorded owner/
  );
  assert.notEqual(
    museSessionScope({ prompt_cache_key: "session-a" }, undefined, "client"),
    museSessionScope({ prompt_cache_key: "session-a" }, undefined, "different-client")
  );
  assert.equal(
    museSessionScope({ input: "x" }, new Headers({ "x-session-id": "hdr-session" }), "client"),
    museSessionScope({ input: "x" }, { "x-session-id": "hdr-session" }, "client")
  );
});

test("JSON output records ownership, and upstream errors retain their original body/status", async () => {
  const scope = museSessionScope({ prompt_cache_key: "json-session" }, undefined, "client");
  const owner = claimMuseSession(scope, { input: "fresh" }, candidates);
  const generation = bindMuseGeneration(scope, owner.connectionId, "json-key", "json-identity");
  const output = [{ type: "reasoning", encrypted_content: "json-opaque" }];
  const wire = JSON.stringify({ output });
  assert.equal(await recordMuseOutput(new Response(wire), scope, generation).text(), wire);
  assert.equal(
    claimMuseSession(scope, { input: output }, candidates).connectionId,
    owner.connectionId
  );
  const failure = new Response("caller mismatch", { status: 400 });
  assert.equal(recordMuseOutput(failure, scope, generation), failure);
  assert.equal(await failure.text(), "caller mismatch");
});

test("chat tool history cannot acquire a fresh owner and emitted calls remain usable", async () => {
  const scope = museSessionScope({ session_id: "chat-tools" }, undefined, "client");
  const messages = [
    {
      role: "assistant",
      tool_calls: [
        { id: "chat-call", type: "function", function: { name: "read", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "chat-call", content: "result" },
  ];
  assert.throws(() => claimMuseSession(scope, { messages }, candidates), /no recorded owner/);
  const owner = claimMuseSession(
    scope,
    { messages: [{ role: "user", content: "hi" }] },
    candidates
  );
  const generation = bindMuseGeneration(scope, owner.connectionId, "chat-key", "chat-account");
  const wire = JSON.stringify({ choices: [{ message: messages[0] }] });
  assert.equal(await recordMuseOutput(new Response(wire), scope, generation).text(), wire);
  assert.equal(claimMuseSession(scope, { messages }, candidates).connectionId, owner.connectionId);
  const foreign = museSessionScope({ session_id: "foreign-chat" }, undefined, "client");
  claimMuseSession(foreign, { input: "fresh" }, candidates);
  assert.throws(() => claimMuseSession(foreign, { messages }, candidates), /not issued/);
});

test("exhausted account is skipped for new sessions and unserved pins move to a healthy account", async () => {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ?")
    .run("muse_session_ownership");
  const healthy = [{ id: "account-a" }, { id: "account-b" }];
  const exhausted = [{ id: "account-a", unavailable: true }, { id: "account-b" }];
  const unserved = museSessionScope({ session_id: "unserved" }, undefined, "client");
  assert.equal(claimMuseSession(unserved, { input: "fresh" }, healthy).connectionId, "account-a");
  for (const session of ["fresh-1", "fresh-2", "fresh-3"]) {
    const scope = museSessionScope({ session_id: session }, undefined, "client");
    assert.equal(claimMuseSession(scope, { input: "fresh" }, exhausted).connectionId, "account-b");
  }
  assert.equal(claimMuseSession(unserved, { input: "retry" }, exhausted).connectionId, "account-b");
  assert.equal(claimMuseSession(unserved, { input: "retry" }, healthy).connectionId, "account-b");

  const served = museSessionScope({ session_id: "served" }, undefined, "client");
  const flipped = [{ id: "account-a" }, { id: "account-b", unavailable: true }];
  assert.equal(claimMuseSession(served, { input: "fresh" }, flipped).connectionId, "account-a");
  const generation = bindMuseGeneration(served, "account-a", "served-key", "served-identity");
  await recordMuseOutput(
    new Response(JSON.stringify({ output: [{ type: "message", id: "msg-served" }] })),
    served,
    generation
  ).text();
  assert.throws(
    () => claimMuseSession(served, { input: "continue" }, exhausted),
    (error: { status?: number; message?: string }) =>
      error.status === 503 && /cross-account continuation is forbidden/.test(error.message || "")
  );
  assert.equal(claimMuseSession(served, { input: "continue" }, flipped).connectionId, "account-a");
});

test("a Muse 429 model lockout makes new and unserved sessions claim the healthy account", () => {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ?")
    .run("muse_session_ownership");
  clearAllModelLockouts();
  const connections = [
    { id: "account-a", authType: "oauth", rateLimitedUntil: null, testStatus: "active" },
    { id: "account-b", authType: "oauth", rateLimitedUntil: null, testStatus: "active" },
  ];
  const model = "muse-spark-1.3";
  const unserved = museSessionScope({ session_id: "lock-unserved" }, undefined, "client");
  const before = museClaimCandidates(connections, model);
  assert.equal(claimMuseSession(unserved, { input: "fresh" }, before).connectionId, "account-a");

  // Account A's upstream 429 records only a per-model lockout; rateLimitedUntil and
  // testStatus stay untouched, as observed live.
  lockModel("muse-code", "account-a", model, "rate_limit_exceeded", 120_000);
  const locked = museClaimCandidates(connections, model);
  assert.deepEqual(
    locked.map((candidate) => candidate.unavailable),
    [true, false]
  );
  for (const session of ["lock-fresh-1", "lock-fresh-2"]) {
    const scope = museSessionScope({ session_id: session }, undefined, "client");
    assert.equal(claimMuseSession(scope, { input: "fresh" }, locked).connectionId, "account-b");
  }
  assert.equal(claimMuseSession(unserved, { input: "retry" }, locked).connectionId, "account-b");
  assert.equal(
    museClaimCandidates(connections, model, null, true).every((c) => !c.unavailable),
    true
  );
  clearAllModelLockouts();
});

test("API-key Muse connections bypass OAuth ownership unless OAuth is selected", () => {
  const keys = [{ id: "key", authType: "apikey" }];
  assert.equal(usesMuseOAuthOwnership(keys), false);
  const mixed = [...keys, { id: "oauth", authType: "oauth" }];
  assert.equal(usesMuseOAuthOwnership(mixed, "key"), false);
  assert.equal(usesMuseOAuthOwnership(mixed, "oauth"), true);
  assert.equal(usesMuseOAuthOwnership(mixed), true);
});

test("chatCore fences reminted continuation before dispatch and records fresh serving generation", async () => {
  const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
  const originalFetch = globalThis.fetch;
  try {
    for (const continuation of [true, false]) {
      const scope = museSessionScope(
        { session_id: `execution-${continuation}` },
        undefined,
        "client"
      );
      const owner = claimMuseSession(scope, { input: "fresh" }, candidates);
      let generation = bindMuseGeneration(scope, owner.connectionId, "execution-key-1", "identity");
      if (continuation)
        await recordMuseOutput(
          new Response(
            JSON.stringify({
              output: [{ type: "reasoning", encrypted_content: "execution-opaque" }],
            })
          ),
          scope,
          generation
        ).text();
      const inferenceCalls: string[] = [];
      globalThis.fetch = async (url, init) => {
        if (String(url).endsWith("/muse-code/key"))
          return Response.json({ api_key: "execution-key-2" });
        const token = new Headers(init?.headers).get("authorization") || "";
        inferenceCalls.push(token);
        if (token.includes("execution-key-1"))
          return Response.json({ error: { message: "expired" } }, { status: 401 });
        return Response.json({
          id: "response-execution",
          object: "response",
          output: [
            { type: "reasoning", encrypted_content: "served-key-2" },
            { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
          ],
          usage: { input_tokens: 1, output_tokens: 1 },
        });
      };
      const result = await handleChatCore({
        body: {
          model: "muse-code/muse-spark",
          input: continuation
            ? [
                { type: "reasoning", encrypted_content: "execution-opaque" },
                { role: "user", content: "continue" },
              ]
            : "fresh",
          stream: false,
        },
        modelInfo: { provider: "muse-code", model: "muse-spark" },
        credentials: {
          accessToken: "execution-key-1",
          refreshToken: "dca:test",
          connectionId: owner.connectionId,
          providerSpecificData: {},
        },
        clientRawRequest: { endpoint: "/v1/responses", headers: { accept: "application/json" } },
        cachedSettings: {},
        skipResourcePressureGuard: true,
        beforeUpstreamAttempt: (credentials) => {
          generation = bindMuseGeneration(
            scope,
            owner.connectionId,
            credentials.accessToken,
            "identity"
          );
        },
        log: { debug() {}, info() {}, warn() {}, error() {} },
      });
      if (continuation) {
        assert.equal(result.success, false);
        assert.equal(result.status, 409);
        assert.equal(inferenceCalls.length, 1);
      } else {
        assert.equal(result.success, true);
        assert.equal(inferenceCalls.length, 2);
        assert.equal(
          generation,
          bindMuseGeneration(scope, owner.connectionId, "execution-key-2", "identity")
        );
        await recordMuseOutput(result.response, scope, generation).text();
        assert.equal(
          claimMuseSession(
            scope,
            { input: [{ type: "reasoning", encrypted_content: "served-key-2" }] },
            candidates
          ).connectionId,
          owner.connectionId
        );
      }
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test.after(() => resetDbInstance());
