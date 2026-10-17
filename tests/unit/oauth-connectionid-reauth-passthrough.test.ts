import test from "node:test";
import assert from "node:assert/strict";

// #16984: the dashboard sends a connectionId with OAuth exchange/poll bodies
// to signal "re-auth THIS connection". The zod schemas stripped it, so the
// completion handlers never saw it and email-less providers (kimi-coding)
// fell through to createProviderConnection — duplicating the connection on
// every re-auth. Both schemas must pass the field through (poll-callback
// and import-token already declared it).

const { oauthExchangeSchema, oauthPollSchema } =
  await import("../../src/shared/validation/schemas/auth.ts");

test("oauthExchangeSchema passes connectionId through", () => {
  const parsed = oauthExchangeSchema.parse({
    code: "auth-code",
    redirectUri: "http://localhost:8080/callback",
    connectionId: "c245b958-e8d1-442b-afde-875f61f3e426",
  });
  assert.equal(parsed.connectionId, "c245b958-e8d1-442b-afde-875f61f3e426");
});

test("oauthExchangeSchema still validates without connectionId (fresh connect)", () => {
  const parsed = oauthExchangeSchema.parse({
    code: "auth-code",
    redirectUri: "http://localhost:8080/callback",
  });
  assert.equal(parsed.connectionId, undefined);
});

test("oauthPollSchema passes connectionId through", () => {
  const parsed = oauthPollSchema.parse({
    deviceCode: "dev-code",
    connectionId: "c245b958-e8d1-442b-afde-875f61f3e426",
  });
  assert.equal(parsed.connectionId, "c245b958-e8d1-442b-afde-875f61f3e426");
});
