import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseKimiJwt,
  getKimiTokenExpiration,
  isKimiTokenExpiringSoon,
} from "../../../open-sse/utils/kimiJwt.ts";

describe("Kimi JWT Decoder", () => {
  const makeToken = (payload: Record<string, unknown>) => {
    const header = Buffer.from(JSON.stringify({ alg: "HS512", typ: "JWT" })).toString("base64url");
    const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
    return `${header}.${body}.signature`;
  };

  it("parses valid Kimi JWT payload", () => {
    const now = Math.floor(Date.now() / 1000);
    const token = makeToken({
      sub: "user_123",
      region: "overseas",
      exp: now + 900,
      iat: now,
    });
    const parsed = parseKimiJwt(token);
    assert.ok(parsed);
    assert.equal(parsed?.sub, "user_123");
    assert.equal(parsed?.region, "overseas");
    assert.equal(parsed?.exp, now + 900);
  });

  it("handles malformed tokens safely without throwing", () => {
    assert.equal(parseKimiJwt(""), null);
    assert.equal(parseKimiJwt("invalid.token"), null);
    assert.equal(parseKimiJwt("a.invalid_json.c"), null);
  });

  it("calculates remaining seconds and expiration status", () => {
    const now = Math.floor(Date.now() / 1000);
    const validToken = makeToken({ exp: now + 300, iat: now });
    const expiredToken = makeToken({ exp: now - 100, iat: now - 400 });

    const validExp = getKimiTokenExpiration(validToken);
    assert.ok(validExp);
    assert.equal(validExp?.isExpired, false);
    assert.ok(validExp!.remainingSec > 250);

    const expiredExp = getKimiTokenExpiration(expiredToken);
    assert.ok(expiredExp);
    assert.equal(expiredExp?.isExpired, true);
    assert.ok(expiredExp!.remainingSec <= 0);
  });

  it("correctly identifies tokens expiring soon within threshold", () => {
    const now = Math.floor(Date.now() / 1000);
    const tokenExpiringIn2Min = makeToken({ exp: now + 120, iat: now });
    const tokenExpiringIn10Min = makeToken({ exp: now + 600, iat: now });

    assert.equal(isKimiTokenExpiringSoon(tokenExpiringIn2Min, 180), true);
    assert.equal(isKimiTokenExpiringSoon(tokenExpiringIn10Min, 180), false);
  });
});
