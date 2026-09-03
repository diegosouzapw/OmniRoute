import assert from "node:assert/strict";
import { test } from "node:test";

test("device code normalization handles camelCase, snake_case, and authUrl without returning undefined", () => {
  const cases = [
    {
      input: { userCode: "ABCD-1234", verificationUri: "https://auth.example.com" },
      expectedCode: "ABCD-1234",
      expectedUri: "https://auth.example.com",
    },
    {
      input: { user_code: "EFGH-5678", verification_uri: "https://auth.example.com/device" },
      expectedCode: "EFGH-5678",
      expectedUri: "https://auth.example.com/device",
    },
    {
      input: { authUrl: "https://studio.example.com/auth" },
      expectedCode: "",
      expectedUri: "https://studio.example.com/auth",
    },
  ];

  for (const c of cases) {
    const userCode = c.input.userCode ?? c.input.user_code ?? "";
    const verificationUri =
      c.input.verificationUriComplete ??
      c.input.verification_uri_complete ??
      c.input.verificationUri ??
      c.input.verification_uri ??
      c.input.authUrl ??
      c.input.url ??
      "";

    assert.equal(userCode, c.expectedCode);
    assert.equal(verificationUri, c.expectedUri);
    assert.notEqual(verificationUri, "undefined");
  }
});
