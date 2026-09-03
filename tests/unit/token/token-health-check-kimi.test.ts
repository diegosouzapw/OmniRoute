import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  checkKimiWebConnectionIfNeeded,
  defaultKimiRefreshJitterSec,
} from "../../../src/lib/tokenHealthCheckKimi.ts";

describe("Kimi Background Health Sweep", () => {
  it("skips non-kimi-web connections", async () => {
    const handled = await checkKimiWebConnectionIfNeeded({
      conn: { provider: "openai" },
      now: new Date().toISOString(),
      log: () => {},
      logWarn: () => {},
      logError: () => {},
      getConnectionLogLabel: () => "openai-1",
      logPrefix: "[Test]",
    });
    assert.equal(handled, false);
  });

  it("triggers refresh when the token is inside the refresh window", async () => {
    const nowSec = Math.floor(Date.now() / 1000);
    // Token expiring in 90 seconds. The window is decided by the caller here, not
    // drawn: with the default spread of [60, 240) a 90 s token is refreshed only
    // when the draw lands >= 90, which is 150 of 180 values — so this assertion
    // used to fail 1 run in 6, and did so on the Node 26 nightly (#11361).
    const token =
      "eyJhbGciOiJIUzUxMiJ9." +
      Buffer.from(JSON.stringify({ exp: nowSec + 90, iat: nowSec })).toString("base64url") +
      ".sig";

    let calledRefresh = false;
    const handled = await checkKimiWebConnectionIfNeeded({
      conn: {
        id: "kimi-conn-1",
        provider: "kimi-web",
        apiKey: token,
        refreshToken: "refresh_123",
      },
      now: new Date().toISOString(),
      log: () => {},
      logWarn: () => {},
      logError: () => {},
      getConnectionLogLabel: () => "kimi-web-1",
      logPrefix: "[Test]",
      jitterSecFn: () => 120,
      exchangeFn: async () => {
        calledRefresh = true;
        return {
          success: true,
          accessToken: "new_token",
          refreshToken: "new_refresh",
          expiresAtSec: nowSec + 900,
        };
      },
      persistFn: async () => {},
    });

    assert.equal(handled, true);
    assert.equal(calledRefresh, true);
  });

  it("leaves a token outside the window alone", async () => {
    const nowSec = Math.floor(Date.now() / 1000);
    const token =
      "eyJhbGciOiJIUzUxMiJ9." +
      Buffer.from(JSON.stringify({ exp: nowSec + 900, iat: nowSec })).toString("base64url") +
      ".sig";

    let calledRefresh = false;
    const handled = await checkKimiWebConnectionIfNeeded({
      conn: {
        id: "kimi-conn-2",
        provider: "kimi-web",
        apiKey: token,
        refreshToken: "refresh_123",
      },
      now: new Date().toISOString(),
      log: () => {},
      logWarn: () => {},
      logError: () => {},
      getConnectionLogLabel: () => "kimi-web-2",
      logPrefix: "[Test]",
      jitterSecFn: () => 240,
      exchangeFn: async () => {
        calledRefresh = true;
        return {
          success: true,
          accessToken: "new_token",
          refreshToken: "new_refresh",
          expiresAtSec: nowSec + 900,
        };
      },
      persistFn: async () => {},
    });

    // Handled (it is a kimi-web connection) but not refreshed.
    assert.equal(handled, true);
    assert.equal(calledRefresh, false);
  });

  it("the default spread stays inside [60, 240)", () => {
    for (let i = 0; i < 2_000; i++) {
      const jitter = defaultKimiRefreshJitterSec();
      assert.ok(Number.isInteger(jitter), `jitter must be whole seconds, got ${jitter}`);
      assert.ok(jitter >= 60 && jitter < 240, `jitter out of range: ${jitter}`);
    }
  });
});
