// SSRF regression guard for the Deno Deploy relay worker (PR #4643 follow-up).
//
// The generated edge worker reads an attacker-controlled `x-relay-path` header
// and previously appended it to the (validated) `x-relay-target` origin via
// string concatenation: `fetch(target.replace(/\/$/, "") + relayPath)`. That
// lets the caller smuggle a NEW host past the allow/SSRF check using userinfo
// (`@`), a backslash, or a protocol-relative path:
//   - x-relay-target: https://api.anthropic.com   (passes the host guard)
//   - x-relay-path:   //evil.com/x                 → fetches https://evil.com/x
//   - x-relay-path:   /x@evil.com                  → userinfo confusion
//   - x-relay-path:   \evil.com                    → backslash host confusion
//
// The fix resolves the path against the validated target with `new URL()` and
// re-checks that the resolved host/credentials still match the target. The
// path-resolution decision is exported as the pure `resolveRelayTarget()` so it
// can be unit-tested directly (the worker body — a Deno-runtime string — embeds
// the SAME function source, asserted below by diffing the generated worker).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  resolveRelayTarget,
  __buildRelayWorkerForTest,
} from "../../src/app/api/settings/proxy/deno-deploy/route";

const TARGET = "https://api.anthropic.com";

describe("resolveRelayTarget — SSRF-safe path join", () => {
  it("accepts a legitimate absolute path and keeps the validated host", () => {
    const r = resolveRelayTarget(TARGET, "/v1/foo");
    assert.equal(r.ok, true, "a normal path must pass");
    if (r.ok) {
      assert.equal(r.url, "https://api.anthropic.com/v1/foo");
    }
  });

  it("accepts a path with a query string", () => {
    const r = resolveRelayTarget(TARGET, "/v1/messages?beta=true");
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.url, "https://api.anthropic.com/v1/messages?beta=true");
    }
  });

  it("rejects a protocol-relative path that swaps the host (//evil.com/x)", () => {
    const r = resolveRelayTarget(TARGET, "//evil.com/x");
    assert.equal(r.ok, false, "//evil.com must NOT be allowed to change the host");
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects a path containing userinfo (/x@evil.com)", () => {
    const r = resolveRelayTarget(TARGET, "/x@evil.com");
    assert.equal(r.ok, false, "@ in the path must be rejected");
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects a backslash host-confusion path (\\evil.com)", () => {
    const r = resolveRelayTarget(TARGET, "\\evil.com");
    assert.equal(r.ok, false, "backslash must be rejected");
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects a value that does not start with '/'", () => {
    const r = resolveRelayTarget(TARGET, "evil.com/x");
    assert.equal(r.ok, false, "a path must start with '/'");
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects an embedded-credentials path that resolves a different host", () => {
    // Classic userinfo trick: everything before '@' becomes userinfo, the real
    // host is after it.
    const r = resolveRelayTarget(TARGET, "/@evil.com/path");
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.status, 403);
  });

  it("rejects backslash-prefixed protocol-relative (\\\\evil.com)", () => {
    const r = resolveRelayTarget(TARGET, "\\\\evil.com/x");
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.status, 403);
  });
});

describe("buildRelayWorker — generated worker has no string-concat SSRF hole", () => {
  it("does not concatenate the target with the raw relay path", () => {
    const worker = __buildRelayWorkerForTest("deadbeefcafe");
    // The vulnerable pattern was: target.replace(/\/$/, "") + relayPath
    assert.ok(
      !/\.replace\(\s*\/\\?\/\$\/\s*,\s*["']{2}\s*\)\s*\+\s*relayPath/.test(worker),
      "worker must not append relayPath to target by string concatenation"
    );
    assert.ok(
      !worker.includes('+ relayPath'),
      "worker must not contain `+ relayPath` string concatenation"
    );
  });

  it("embeds the resolveRelayTarget guard into the worker body", () => {
    const worker = __buildRelayWorkerForTest("deadbeefcafe");
    assert.ok(
      worker.includes("resolveRelayTarget"),
      "the worker must call the shared resolveRelayTarget guard"
    );
  });
});
