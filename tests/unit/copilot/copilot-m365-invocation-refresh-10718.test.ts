import test from "node:test";
import assert from "node:assert/strict";

// #10718 — the substrate started dropping the old type:4 chat invocation shape
// (immediate bare type:3 close, "(empty response)" on every request). A fresh
// TLS-MITM capture of a working m365.cloud.microsoft/chat round-trip (2026-08)
// showed a materially different argument shape AND a type:1 target:"Metrics"
// frame written in the SAME socket write right after the invocation — an
// invocation without its Metrics pair is silently ignored.
//
// These tests pin the recaptured wire shape and the refresh_token pre-flight
// (the browser-issued access_token lives ~75 min with no refresh path before
// this). Live round-trip on a real EDU (A3/Starter) tenant is the separate
// Rule #18 validation gate.

import {
  RECORD_SEPARATOR,
  metricsFrame,
  buildChatInvocation,
  resolveChatInvocationOverrides,
  M365_DEFAULT_OPTION_SETS,
  ALLOWED_MESSAGE_TYPES,
} from "../../../open-sse/executors/copilot-m365-frames.ts";
import {
  decodeJwtClaims,
  tokenNeedsRefresh,
  refreshM365AccessToken,
  M365_OAUTH_CLIENT_ID,
  M365_REFRESH_LEAD_MS,
} from "../../../open-sse/executors/copilot-m365-connection.ts";

// ── Metrics follow-up frame ────────────────────────────────────────────────

test("#10718: metricsFrame emits the exact bytes observed in the browser capture", () => {
  assert.equal(
    metricsFrame(),
    '{"arguments":[{"Timestamps":{"ConnectionEstablished":"","ConnectionStart":"","UserInputStart":"","UserInputSubmit":""}}],"target":"Metrics","type":1}' +
      RECORD_SEPARATOR
  );
});

// ── Recaptured invocation shape ────────────────────────────────────────────

test("2026-08-21: buildChatInvocation matches the recaptured arguments[0] key set", () => {
  const arg = buildChatInvocation({
    text: "Say OK in one word.",
    traceId: "11111111-1111-1111-1111-111111111111",
    sessionId: "22222222-2222-2222-2222-222222222222",
    requestId: "33333333-3333-3333-3333-333333333333",
    conversationId: "44444444-4444-4444-4444-444444444444",
  }).arguments[0] as Record<string, unknown>;

  // Exact key set from the 2026-08-21 capture (issue: individual/consumer M365
  // Copilot calls got only SignalR keepalive pings and no type:1 update at all
  // — "Stream ended before producing a non-ping SSE event" client-side). The
  // #10718 shape below is missing exactly the keys this capture added.
  assert.deepEqual(Object.keys(arg).sort(), [
    "allowedMessageTypes",
    "clientCorrelationId",
    "clientInfo",
    "conversationId",
    "disconnectBehavior",
    "extraExtensionParameters",
    "isSbsSupported",
    "isStartOfSession",
    "message",
    "options",
    "optionsSets",
    "plugins",
    "productThreadType",
    "renderReferencesBehindEOS",
    "sessionId",
    "sliceIds",
    "source",
    "streamingMode",
    "threadLevelGptId",
    "tone",
    "toolChoice",
    "traceId",
  ]);
  assert.equal(arg.productThreadType, "Office");
  assert.deepEqual(arg.clientInfo, {
    clientAppName: "Office",
    clientPlatform: "mcmcopilot-web",
    clientEntrypoint: "mcmcopilot-officeweb",
    clientSessionId: "22222222-2222-2222-2222-222222222222",
    ProductCategory: "Chat",
    clientAppType: "Web",
    productEntryPoint: "ChatPanel",
    deviceOS: "Windows",
    deviceType: "Desktop",
    clientPlatformVersion: "10",
  });
  assert.equal(arg.conversationId, "44444444-4444-4444-4444-444444444444");
  assert.equal(arg.toolChoice, null);
  // The individual/consumer surface now sends "Magic" (capitalized), matching
  // the enterprise tone literal — the #10718 lowercase "magic" is stale.
  assert.equal(arg.tone, "Magic");
  assert.equal(arg.isSbsSupported, true);
  assert.equal(arg.renderReferencesBehindEOS, true);
  assert.deepEqual(arg.extraExtensionParameters, {});
  assert.deepEqual(arg.plugins, [{ Id: "BingWebSearch", Source: "BuiltIn" }]);
  // Sent on every tier now, not gated to enterprise as #8971 described.
  assert.equal(arg.disconnectBehavior, "continue");
});

test("2026-08-21: the message object carries the recaptured rich shape", () => {
  const arg = buildChatInvocation({
    text: "Say OK in one word.",
    traceId: "t",
    sessionId: "s",
    requestId: "r",
    conversationId: "c",
  }).arguments[0] as Record<string, unknown>;
  const message = arg.message as Record<string, unknown>;

  assert.deepEqual(Object.keys(message).sort(), [
    "adaptiveCards",
    "attachments",
    "author",
    "clientInfo",
    "clientPreferences",
    "connectedFederatedConnections",
    "entityAnnotationTypes",
    "experienceType",
    "inputMethod",
    "locale",
    "locationInfo",
    "messageType",
    "requestId",
    "text",
  ]);
  assert.equal(message.author, "user");
  assert.equal(message.messageType, "Chat");
  assert.equal(message.requestId, "r");
  assert.equal(message.experienceType, "Default");
  assert.deepEqual(message.entityAnnotationTypes, [
    "People",
    "File",
    "Event",
    "Email",
    "TeamsMessage",
  ]);
  assert.equal(message.attachments, null);
  assert.deepEqual(message.locationInfo, { timeZone: "UTC", timeZoneOffset: 0 });
  assert.deepEqual(message.connectedFederatedConnections, ["dummyId"]);
  // Same clientInfo object echoed inside message, per the capture.
  assert.deepEqual(message.clientInfo, arg.clientInfo);
});

test("2026-08-21: default tier lists are the recaptured 34-entry optionsSets / 30-entry allowedMessageTypes", () => {
  const overrides = resolveChatInvocationOverrides(undefined);
  assert.equal(overrides.optionsSets.length, 34);
  assert.equal(overrides.allowedMessageTypes.length, 30);
  assert.equal(overrides.tone, "Magic");
  assert.equal(overrides.disconnectBehavior, "continue");
  const optionSets = M365_DEFAULT_OPTION_SETS as readonly string[];
  const messageTypes = ALLOWED_MESSAGE_TYPES as readonly string[];
  // Entries the 2026-08-21 capture showed that the #10718 lists lacked.
  for (const present of [
    "cwc_code_interpreter",
    "rich_responses",
    "async_client_interaction",
    "flux_v3_references",
  ]) {
    assert.ok(optionSets.includes(present), `${present} must be in the default option sets`);
  }
  for (const present of ["InternalSearchQuery", "GeneratedCode", "AuthError", "TriggerPlugin"]) {
    assert.ok(messageTypes.includes(present), `${present} must be in allowedMessageTypes`);
  }
  // Entries the #10718 capture showed and this capture still confirms.
  assert.ok(optionSets.includes("cwcfluxgptv"));
  assert.ok(messageTypes.includes("EndOfRequest"));
});

// ── refresh_token helpers ──────────────────────────────────────────────────

function fakeJwt(claims: Record<string, unknown>): string {
  const b64 = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${b64({ alg: "none" })}.${b64(claims)}.sig`;
}

test("#10718: decodeJwtClaims reads exp/tid without verification; non-JWT returns null", () => {
  const claims = decodeJwtClaims(fakeJwt({ exp: 123, tid: "tenant-id", oid: "oid" }));
  assert.equal(claims?.exp, 123);
  assert.equal(claims?.tid, "tenant-id");
  assert.equal(decodeJwtClaims("not.a-jwt"), null);
  assert.equal(decodeJwtClaims("opaque-jwe-token.with.five.parts.here.and-more"), null);
});

test("#10718: tokenNeedsRefresh — unreadable/expired/inside-lead needs refresh, fresh does not", () => {
  const now = Math.floor(Date.now() / 1000);
  assert.equal(tokenNeedsRefresh("opaque"), true);
  assert.equal(tokenNeedsRefresh(fakeJwt({ exp: now - 60 })), true);
  // Inside the 5-minute lead window.
  assert.equal(tokenNeedsRefresh(fakeJwt({ exp: now + M365_REFRESH_LEAD_MS / 1000 - 30 })), true);
  assert.equal(tokenNeedsRefresh(fakeJwt({ exp: now + 3600 })), false);
});

test("#10718: refreshM365AccessToken redeems the public client grant and returns rotated tokens", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedBody = "";
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    capturedUrl = String(url);
    capturedBody = String(init?.body);
    return new Response(
      JSON.stringify({
        access_token: "NEW-ACCESS",
        refresh_token: "ROTATED-REFRESH",
        expires_in: 4777,
      }),
      { status: 200 }
    );
  }) as typeof fetch;
  try {
    const result = await refreshM365AccessToken("OLD-REFRESH", "tenant-id");
    assert.ok("accessToken" in result);
    assert.equal(result.accessToken, "NEW-ACCESS");
    assert.equal(result.refreshToken, "ROTATED-REFRESH");
    assert.equal(result.expiresIn, 4777);
    assert.match(capturedUrl, /login\.microsoftonline\.com\/tenant-id\/oauth2\/v2\.0\/token/);
    assert.match(capturedBody, /grant_type=refresh_token/);
    assert.match(capturedBody, new RegExp(`client_id=${M365_OAUTH_CLIENT_ID}`));
    assert.match(capturedBody, /refresh_token=OLD-REFRESH/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#10718: refreshM365AccessToken surfaces AAD errors and network failures as {error}", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "invalid_grant", error_description: "AADSTS700082" }), {
      status: 400,
    })) as typeof fetch;
  const aadError = await refreshM365AccessToken("STALE");
  assert.deepEqual(aadError, { error: "invalid_grant" });

  globalThis.fetch = (async () => {
    throw new Error("ENOTFOUND");
  }) as typeof fetch;
  const netError = await refreshM365AccessToken("ANY");
  assert.deepEqual(netError, { error: "ENOTFOUND" });
  globalThis.fetch = originalFetch;
});
