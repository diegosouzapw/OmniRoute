import test from "node:test";
import assert from "node:assert/strict";

const { grokCli } = await import("../../src/lib/oauth/providers/grok-cli.ts");

test("Grok Build OAuth Provider - config", () => {
  assert.ok(grokCli.config.clientId, "clientId should be defined");
  assert.ok(grokCli.config.clientId.includes("b1a00492"), "clientId should contain xAI client ID");
  assert.equal(grokCli.config.tokenUrl, "https://auth.x.ai/oauth2/token");
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
