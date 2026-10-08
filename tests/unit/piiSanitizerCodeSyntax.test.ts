/**
 * Regression tests: code syntax must NOT be treated as IPv6.
 *
 * The ipv6_address pattern's bare `::` alternative matched any double colon, so
 * every language construct built on `::` was rewritten to `[IP_REDACTED]`:
 *
 *   Python   s[::-1]            -> s[[IP_REDACTED]-1]
 *   Haskell  x :: Int           -> x [IP_REDACTED] Int
 *   Elixir   @spec f(a :: int)  -> @spec f(a [IP_REDACTED] int)
 *   Markdown :::note            -> [IP_REDACTED]note
 *
 * The corruption is silent: the result is often still syntactically valid
 * (a function definition that is never called), so a downstream execution gate
 * reports success on code that cannot work.
 *
 * Deliberate trade-off: a bare `::` (the unspecified address, which never
 * appears as a usable host address) is no longer redacted on its own. Every
 * `::`-bearing IPv6 form is still matched, including `::1` and `[::1]`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resetDbInstance } from "../../src/lib/db/core";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-slice-"));
process.env.DATA_DIR = tmpDir;

process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";

const { sanitizePII } = await import("../../src/lib/piiSanitizer");

// ── Code constructs that must survive verbatim ───────────────────────────────

const CODE_SYNTAX = [
  ["Python reverse slice", "def f(s):\n    return s[::-1]"],
  ["Python step slice", "evens = arr[::2]"],
  ["Python chained slice", "return x[::-1].upper()"],
  ["Python single-colon slice", "d[1:2]"],
  ["Rust path qualifier", "use ::std::io::Read;"],
  ["Rust turbofish", "let v = Vec::<u8>::new();"],
  ["C++ namespace", "std::vector<int> v;"],
  ["C++ static call", "Foo::bar();"],
  ["Haskell type annotation", "x :: Int"],
  ["Haskell function signature", "foo :: Int -> String"],
  ["Elixir spec", "@spec add(a :: integer) :: integer"],
  ["Scala type annotation", "def f(x :: Int)"],
  ["Markdown admonition", ":::note\nhello\n:::"],
];

for (const [label, code] of CODE_SYNTAX) {
  test(`${label} is NOT redacted`, () => {
    const result = sanitizePII(code);
    assert.strictEqual(result.text, code, `${label} must pass through unchanged`);
  });
}

// ── Real IPv6 addresses that must still be caught ────────────────────────────

const REAL_IPV6 = [
  ["loopback", "server at ::1"],
  ["link-local", "gateway fe80::1"],
  ["full address", "2001:db8:3333:4444:5555:6666:7777:8888"],
  ["trailing compression", "2001:db8::"],
  ["IPv4-mapped", "::ffff:0:0"],
  ["zone id", "fe80::1%eth0"],
  ["multiple in one string", "hosts: ::1 and 2001:db8::cafe"],
];

for (const [label, text] of REAL_IPV6) {
  test(`real IPv6 (${label}) is still redacted`, () => {
    const result = sanitizePII(text);
    assert.ok(result.text.includes("[IP_REDACTED]"), `${label} must still be redacted`);
  });
}

test("bracketed URL IPv6 literal http://[::1]:8080/ is redacted", () => {
  const result = sanitizePII("http://[::1]:8080/");
  assert.ok(!result.text.includes("[::1]"), "bracketed IPv6 literal must be redacted");
});

test("bracketed link-local URL literal http://[fe80::1]/ is redacted", () => {
  const result = sanitizePII("http://[fe80::1]/");
  assert.ok(!result.text.includes("fe80::1"), "bracketed link-local must be redacted");
});

// ── The deliberate carve-out ────────────────────────────────────────────────
//
// `::` alone is the unspecified address: never a usable host address, while
// `::` is load-bearing in Python, Rust, C++, Haskell, Elixir, Scala and
// Markdown. Redacting it costs far more than it protects.

test("bare :: (unspecified address) is left alone by design", () => {
  const result = sanitizePII("::");
  assert.strictEqual(result.text, "::", "bare :: must not be redacted");
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
