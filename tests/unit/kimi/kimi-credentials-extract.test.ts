import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  extractKimiAccessToken,
  extractKimiRefreshToken,
  extractKimiCredentials,
} from "../../../src/lib/providers/webCookieAuth.ts";

describe("Kimi Credential Extraction", () => {
  it("extracts refresh_token from key-value or raw token", () => {
    assert.equal(extractKimiRefreshToken("refresh_token=refresh_12345"), "refresh_12345");
    assert.equal(extractKimiRefreshToken("refresh_token=refresh_abc; other=1"), "refresh_abc");
  });

  it("extracts both access_token and refresh_token from JSON localStorage dump", () => {
    const jsonDump = JSON.stringify({
      access_token: "access_jwt_xyz",
      refresh_token: "refresh_jwt_abc",
      user_id: "user_999",
    });
    const creds = extractKimiCredentials(jsonDump);
    assert.equal(creds.accessToken, "access_jwt_xyz");
    assert.equal(creds.refreshToken, "refresh_jwt_abc");
  });

  it("extracts credentials from plain access token", () => {
    const plainToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjMifQ.sig";
    const creds = extractKimiCredentials(plainToken);
    assert.equal(creds.accessToken, plainToken);
    assert.equal(creds.refreshToken, "");
  });
});
