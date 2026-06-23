import test from "node:test";
import assert from "node:assert/strict";

// #4042 — M365 Copilot (individual) connection helpers: credential resolution,
// WS URL building, token redaction, and prompt flattening. Pure functions, no
// live socket — the round-trip is the separate Rule #18 validation gate.

import {
  M365_INDIVIDUAL_DEFAULTS,
  newChatSessionId,
  resolveConnectionParams,
  buildWsUrl,
  redactWsUrl,
  buildPrompt,
} from "../../open-sse/executors/copilot-m365-connection.ts";

// ── Credential resolution ────────────────────────────────────────────────

test("resolveConnectionParams errors when the access_token is missing", () => {
  const r = resolveConnectionParams(undefined);
  assert.ok("error" in r);
  assert.match((r as { error: string }).error, /access_token/i);
});

test("resolveConnectionParams errors when the Chathub path is missing", () => {
  const r = resolveConnectionParams({ apiKey: "tok" });
  assert.ok("error" in r);
  assert.match((r as { error: string }).error, /Chathub path/i);
});

test("resolveConnectionParams reads token from apiKey and path from providerSpecificData", () => {
  const r = resolveConnectionParams({
    apiKey: "opaque-jwe-token",
    providerSpecificData: { chathubPath: "user-oid@tenant-id" },
  });
  assert.ok(!("error" in r));
  const p = r as { host: string; chathubPath: string; accessToken: string };
  assert.equal(p.accessToken, "opaque-jwe-token");
  assert.equal(p.chathubPath, "user-oid@tenant-id");
  assert.equal(p.host, M365_INDIVIDUAL_DEFAULTS.host);
});

test("resolveConnectionParams accepts access_token in providerSpecificData and a custom host", () => {
  const r = resolveConnectionParams({
    providerSpecificData: {
      access_token: "tok2",
      userTenant: "u@t",
      host: "substrate.svc.cloud.microsoft",
    },
  });
  assert.ok(!("error" in r));
  const p = r as { host: string; chathubPath: string; accessToken: string };
  assert.equal(p.accessToken, "tok2");
  assert.equal(p.chathubPath, "u@t");
  assert.equal(p.host, "substrate.svc.cloud.microsoft");
});

// ── WS URL building ──────────────────────────────────────────────────────

test("buildWsUrl targets the substrate Chathub with the individual-tier query", () => {
  const url = buildWsUrl({ host: "substrate.office.com", chathubPath: "u@t", accessToken: "TOK" });
  assert.ok(url.startsWith("wss://substrate.office.com/m365Copilot/Chathub/u@t?"));
  const qs = new URLSearchParams(url.split("?")[1]);
  assert.equal(qs.get("licenseType"), "Starter");
  assert.equal(qs.get("agent"), "web");
  assert.equal(qs.get("scenario"), "OfficeWebPaidConsumerCopilot");
  assert.equal(qs.get("source"), "officeweb");
  assert.equal(qs.get("access_token"), "TOK");
  // chatsessionid == XRoutingParameterSessionKey == clientrequestid (same value)
  const sid = qs.get("chatsessionid");
  assert.ok(sid && /^[0-9a-f]{32}$/.test(sid));
  assert.equal(qs.get("XRoutingParameterSessionKey"), sid);
  assert.equal(qs.get("clientrequestid"), sid);
});

test("redactWsUrl strips the access_token so the URL is safe to log", () => {
  const url = buildWsUrl({ host: "substrate.office.com", chathubPath: "u@t", accessToken: "SECRET" });
  const redacted = redactWsUrl(url);
  assert.ok(!redacted.includes("SECRET"), "token must not survive redaction");
  assert.match(redacted, /access_token=REDACTED/);
});

test("newChatSessionId is 32 lowercase hex chars", () => {
  const id = newChatSessionId();
  assert.match(id, /^[0-9a-f]{32}$/);
  assert.notEqual(newChatSessionId(), id);
});

// ── Prompt flattening ────────────────────────────────────────────────────

test("buildPrompt returns the last user message", () => {
  const prompt = buildPrompt({
    messages: [
      { role: "user", content: "first" },
      { role: "user", content: "second" },
    ],
  });
  assert.equal(prompt, "second");
});

test("buildPrompt prepends system instructions", () => {
  const prompt = buildPrompt({
    messages: [
      { role: "system", content: "Be terse." },
      { role: "user", content: "hi" },
    ],
  });
  assert.match(prompt, /\[System Instructions\]\nBe terse\.\n\nhi$/);
});
