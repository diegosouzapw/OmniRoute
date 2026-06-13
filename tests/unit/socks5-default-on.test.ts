/**
 * TDD — SOCKS5 proxy support must default ON (opt-OUT), so a fresh deploy
 * (Docker/npm/Electron with no .env) honours SOCKS5 proxies out of the box.
 * Previously the code defaulted OFF (`=== "true"`), so SOCKS5 proxies were
 * silently rejected unless the operator set the env explicitly — accounts then
 * fell back to the host IP. Only an explicit falsey value disables it now.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { isSocks5ProxyEnabled } = await import("../../open-sse/utils/proxyDispatcher.ts");

function withEnv(value: string | undefined, fn: () => void) {
  const prev = process.env.ENABLE_SOCKS5_PROXY;
  if (value === undefined) delete process.env.ENABLE_SOCKS5_PROXY;
  else process.env.ENABLE_SOCKS5_PROXY = value;
  try {
    fn();
  } finally {
    if (prev === undefined) delete process.env.ENABLE_SOCKS5_PROXY;
    else process.env.ENABLE_SOCKS5_PROXY = prev;
  }
}

test("SOCKS5 is ON by default when the env is unset", () => {
  withEnv(undefined, () => assert.equal(isSocks5ProxyEnabled(), true));
});

test("SOCKS5 is ON for empty string (treated as unset)", () => {
  withEnv("", () => assert.equal(isSocks5ProxyEnabled(), true));
});

test("SOCKS5 stays ON for explicit true-ish values", () => {
  for (const v of ["true", "TRUE", "1", "yes", "on"]) {
    withEnv(v, () => assert.equal(isSocks5ProxyEnabled(), true, `value ${v} must enable`));
  }
});

test("SOCKS5 is OFF only for explicit falsey values (opt-out)", () => {
  for (const v of ["false", "FALSE", "0", "no", "off"]) {
    withEnv(v, () => assert.equal(isSocks5ProxyEnabled(), false, `value ${v} must disable`));
  }
});
