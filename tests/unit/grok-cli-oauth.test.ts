import test from "node:test";
import assert from "node:assert/strict";

const { grokCli } = await import("../../src/lib/oauth/providers/grok-cli.ts");
const { resolvePublicCred } = await import("@omniroute/open-sse/utils/publicCreds");

test("Grok Build OAuth Provider - config", () => {
  assert.ok(grokCli.config.clientId, "clientId should be defined");
  // The public client_id must come from the embedded default (Hard Rule #11),
  // not a string literal — assert it matches resolvePublicCred("grok_id").
  assert.equal(
    grokCli.config.clientId,
    resolvePublicCred("grok_id", "GROK_OAUTH_CLIENT_ID"),
    "clientId must resolve from the embedded grok_id default"
  );
  assert.equal(grokCli.config.tokenUrl, "https://auth.x.ai/oauth2/token");
});

test("publicCreds: grok_id embedded default is present and decodes", () => {
  const decoded = resolvePublicCred("grok_id");
  assert.ok(decoded.length > 0, "grok_id must decode to a non-empty client id");
});

test("Grok Build OAuth Provider - flowType is import_token", () => {
  assert.equal(grokCli.flowType, "import_token");
});

test("Grok Build OAuth Provider - mapTokens from raw JWT", () => {
  // Create a valid JWT with base64url-encoded payload
  const payload = { sub: "12345", email: "test@example.com", team_id: "team-67890", tier: 1 };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mockJwt = `eyJhbGciOiJFUzI1NiJ9.${payloadBase64}.signature`;
  const result = grokCli.mapTokens(mockJwt, null);

  assert.equal(result.accessToken, mockJwt);
  assert.equal(result.refreshToken, null);
  assert.equal(result.email, "test@example.com");
  assert.equal(result.expiresIn, 21600);
  assert.equal(result.providerSpecificData?.userId, "12345");
  assert.equal(result.providerSpecificData?.teamId, "team-67890");
  assert.equal(result.providerSpecificData?.tier, 1);
});

test("Grok Build OAuth Provider - mapTokens from auth.json", () => {
  const authJson = {
    "https://auth.x.ai::clientId": {
      key: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.signature",
      refresh_token: "test-refresh-token",
    },
  };
  const result = grokCli.mapTokens(authJson, null);

  assert.ok(result.accessToken.includes("eyJ"), "accessToken should be JWT");
  assert.equal(result.refreshToken, "test-refresh-token");
  assert.equal(result.email, "test@example.com");
});

test("Grok Build OAuth Provider - mapTokens from empty string", () => {
  const result = grokCli.mapTokens("", null);
  assert.equal(result.accessToken, "");
});

test("Grok Build OAuth Provider - mapTokens from object with accessToken", () => {
  const input = { accessToken: "direct-token" };
  const result = grokCli.mapTokens(input, null);
  assert.equal(result.accessToken, "direct-token");
});

test("Grok Build OAuth Provider - mapTokens from route-wrapped auth.json", () => {
  // The route handler wraps the token: { accessToken: <token> }.
  // This simulates what the import-token endpoint passes to mapTokens.
  const authJson = {
    "https://auth.x.ai::b1a00492-073a-47ea-816f-4c329264a828": {
      key: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.signature",
      refresh_token: "test-refresh-token-wrapped",
      expires_at: "2026-12-31T00:00:00Z",
    },
  };
  const wrapped = { accessToken: authJson };
  const result = grokCli.mapTokens(wrapped, null);

  assert.ok(
    result.accessToken.startsWith("eyJ"),
    "accessToken should be JWT from wrapped auth.json"
  );
  assert.equal(result.refreshToken, "test-refresh-token-wrapped");
  assert.equal(result.email, "test@example.com");
  assert.ok(result.providerSpecificData?.rawAuthJson, "rawAuthJson should be populated");
  assert.deepEqual(
    result.providerSpecificData?.rawAuthJson,
    authJson,
    "rawAuthJson should equal the original auth.json"
  );
});

test("Grok Build OAuth Provider - mapTokens from direct auth.json has rawAuthJson", () => {
  const authJson = {
    "https://auth.x.ai::clientId": {
      key: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.signature",
      refresh_token: "direct-refresh",
    },
  };
  const result = grokCli.mapTokens(authJson, null);

  assert.ok(result.accessToken.startsWith("eyJ"));
  assert.equal(result.refreshToken, "direct-refresh");
  assert.deepEqual(result.providerSpecificData?.rawAuthJson, authJson);
});

test("Grok Build OAuth Provider - mapTokens from raw JWT has no rawAuthJson", () => {
  const payload = { sub: "12345", email: "test@example.com" };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mockJwt = `eyJhbGciOiJFUzI1NiJ9.${payloadBase64}.signature`;
  const result = grokCli.mapTokens(mockJwt, null);

  assert.equal(result.accessToken, mockJwt);
  assert.equal(result.refreshToken, null);
  assert.equal(result.providerSpecificData?.rawAuthJson, undefined);
});

test("Grok Build OAuth Provider - mapTokens extracts expiresIn from JWT exp (dynamic)", () => {
  const futureSec = Math.floor(Date.now() / 1000) + 1200; // 20 minutes from now
  const payload = { sub: "12345", email: "test@example.com", exp: futureSec };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mockJwt = `eyJhbGciOiJFUzI1NiJ9.${payloadBase64}.signature`;
  const result = grokCli.mapTokens(mockJwt, null);

  assert.ok(result.expiresIn > 0);
  assert.ok(Math.abs(result.expiresIn - 1200) <= 2);
});

test("Grok Build OAuth Provider - mapTokens extracts expiresIn from JSON expires_at (dynamic)", () => {
  const futureDateStr = new Date(Date.now() + 1800 * 1000).toISOString(); // 30 minutes from now
  const authJson = {
    "https://auth.x.ai::clientId": {
      key: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.signature",
      refresh_token: "test-refresh-token",
      expires_at: futureDateStr,
    },
  };
  const result = grokCli.mapTokens(authJson, null);

  assert.ok(result.expiresIn > 0);
  assert.ok(Math.abs(result.expiresIn - 1800) <= 2);
});

test("Grok Build OAuth Provider - mapTokens falls back to 21600 if no exp or expires_at", () => {
  const payload = { sub: "12345", email: "test@example.com" };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mockJwt = `eyJhbGciOiJFUzI1NiJ9.${payloadBase64}.signature`;
  const result = grokCli.mapTokens(mockJwt, null);

  assert.equal(result.expiresIn, 21600);
});
