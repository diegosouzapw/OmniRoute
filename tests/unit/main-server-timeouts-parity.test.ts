import test from "node:test";
import assert from "node:assert";
import { getMainServerTimeoutConfig as mjsImpl } from "../../scripts/dev/main-server-timeouts.mjs";
import { getMainServerTimeoutConfig as tsImpl } from "../../src/shared/utils/runtimeTimeouts.ts";

// The shipped server-ws.mjs uses the SIBLING scripts/dev/main-server-timeouts.mjs
// (a ../../src import escapes the package after the dist copy — 2026-07-15 boot
// crash, #7065 class). This parity matrix is the anti-drift guard between the
// sibling and the canonical src/shared/utils/runtimeTimeouts.ts implementation.
const ENV_MATRIX: Record<string, string | undefined>[] = [
  {},
  { MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "70000" },
  { MAIN_SERVER_HEADERS_TIMEOUT_MS: "80000" },
  { MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "90000", MAIN_SERVER_HEADERS_TIMEOUT_MS: "10000" },
  { MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "0", MAIN_SERVER_HEADERS_TIMEOUT_MS: "0" },
  { MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "abc" },
  { MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "  " },
  { MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "-5" },
  { MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "1234.9" },
];

test("sibling main-server-timeouts.mjs stays in parity with runtimeTimeouts.ts", () => {
  for (const env of ENV_MATRIX) {
    assert.deepStrictEqual(
      mjsImpl(env),
      tsImpl(env),
      `divergence for env ${JSON.stringify(env)}`
    );
  }
});

test("invalid values log through the provided logger in both implementations", () => {
  const logsA: string[] = [];
  const logsB: string[] = [];
  mjsImpl({ MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "bogus" }, (m) => logsA.push(m));
  tsImpl({ MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "bogus" }, (m) => logsB.push(m));
  assert.strictEqual(logsA.length, 1);
  assert.deepStrictEqual(logsA, logsB);
});
