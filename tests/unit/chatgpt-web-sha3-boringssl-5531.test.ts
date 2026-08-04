// #5531 — chatgpt-web sentinel PoW crashes on the Electron desktop app with
// "Digest method not supported" because Electron's BoringSSL lacks SHA-3
// (electron/electron#30530). The PoW must hash through a runtime-portable
// SHA3-512 that falls back to a pure-JS Keccak when native SHA-3 is absent.

import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const { sha3_512Hex, sha3_512HexJs, __setSha3NativeForTesting } =
  await import("../../open-sse/utils/sha3-512.ts");

// FIPS-202 known-answer vectors for SHA3-512.
const FIPS: Record<string, string> = {
  "":
    "a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a6" +
    "15b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26",
  abc:
    "b751850b1a57168a5693cd924b6b096e08f621827444f70d884f5d0240d2712e" +
    "10e116e9192af3c91a7ec57647e3934057340b4cf408d5a56592f8274eec53f0",
};

function nativeSha3Available(): boolean {
  try {
    createHash("sha3-512").update(Buffer.alloc(0)).digest("hex");
    return true;
  } catch {
    return false;
  }
}

test("pure-JS SHA3-512 matches the FIPS-202 known-answer vectors", () => {
  for (const [msg, want] of Object.entries(FIPS)) {
    assert.equal(sha3_512HexJs(msg), want, `FIPS-202 vector mismatch for "${msg}"`);
  }
});

test("pure-JS SHA3-512 is bit-identical to native createHash('sha3-512') on 300 random inputs", () => {
  if (!nativeSha3Available()) {
    // Runtime without native SHA-3 (e.g. an Electron CI) — FIPS vectors already cover correctness.
    return;
  }
  for (let i = 0; i < 300; i++) {
    const len = (i * 7) % 200; // spans multi-block (>72B) and exact-block-boundary cases
    const buf = Buffer.alloc(len);
    for (let j = 0; j < len; j++) buf[j] = (i * 31 + j * 17) & 0xff;
    const native = createHash("sha3-512").update(buf).digest("hex");
    assert.equal(sha3_512HexJs(buf), native, `mismatch vs native at len=${len}`);
  }
});

test("sha3_512Hex falls back to pure-JS when native SHA-3 is unavailable (Electron/BoringSSL sim) — #5531", () => {
  __setSha3NativeForTesting(null); // simulate BoringSSL: createHash('sha3-512') would throw
  try {
    assert.equal(sha3_512Hex("abc"), FIPS.abc);
    assert.equal(sha3_512Hex(""), FIPS[""]);
    assert.equal(sha3_512Hex(Buffer.from("abc")), FIPS.abc);
  } finally {
    __setSha3NativeForTesting(undefined); // restore auto-detect
  }
});

test("sha3_512Hex uses the native digest where available (parity with fallback)", () => {
  if (!nativeSha3Available()) return;
  __setSha3NativeForTesting(undefined); // force re-probe → native
  assert.equal(sha3_512Hex("abc"), FIPS.abc);
  assert.equal(sha3_512Hex("abc"), sha3_512HexJs("abc"));
});

test("chatgpt-web PoW routes SHA3-512 through the portable helper, not inline createHash (#5531 guard)", async () => {
  const execPath = fileURLToPath(
    new URL("../../open-sse/executors/chatgpt-web.ts", import.meta.url)
  );
  const src = await readFile(execPath, "utf8");
  assert.ok(
    !/createHash\(\s*["']sha3-512["']\s*\)/.test(src),
    "PoW must NOT call native createHash('sha3-512') inline — it crashes under Electron/BoringSSL"
  );
  assert.ok(/sha3_512Hex\s*\(/.test(src), "chatgpt-web PoW must hash via sha3_512Hex()");
});
