import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  describeUpstreamFailure,
  extractErrorMessage,
} from "../../src/shared/utils/upstreamError.ts";

// `markAccountUnavailable` stored the upstream reason only when it was already a
// string — everything else collapsed to the literal "Provider error", which is
// what the dashboard shows as `lastError` and what the console line prints.
//
// The case that matters most is not a string: a failed fetch arrives as
// `TypeError: fetch failed` with the actionable part on `error.cause.code`, so a
// wrong port, a firewall and a blocked proxy were indistinguishable.

/** The shape Node produces for a refused connection. */
function fetchFailed(code: string): Error {
  const error = new TypeError("fetch failed");
  (error as Error & { cause?: unknown }).cause = Object.assign(
    new Error(`connect ${code} 127.0.0.1:11434`),
    { code }
  );
  return error;
}

test("a string reason is unchanged and still clamped", () => {
  assert.equal(describeUpstreamFailure("upstream said no"), "upstream said no");
  assert.equal(describeUpstreamFailure("x".repeat(200)), "x".repeat(100));
});

test("the transport code behind `fetch failed` survives", () => {
  assert.equal(describeUpstreamFailure(fetchFailed("ECONNREFUSED")), "fetch failed (ECONNREFUSED)");
  assert.equal(describeUpstreamFailure(fetchFailed("ENOTFOUND")), "fetch failed (ENOTFOUND)");
});

test("a code already named in the message is not repeated", () => {
  const error = Object.assign(new Error("connect ETIMEDOUT 10.0.0.5:443"), { code: "ETIMEDOUT" });
  assert.equal(describeUpstreamFailure(error), "connect ETIMEDOUT 10.0.0.5:443");
});

test("the usual provider JSON shapes are read", () => {
  assert.equal(
    describeUpstreamFailure({ error: { message: "model not found" } }),
    "model not found"
  );
  assert.equal(describeUpstreamFailure({ message: "quota exceeded" }), "quota exceeded");
  assert.equal(describeUpstreamFailure({ error: "invalid api key" }), "invalid api key");
  assert.equal(describeUpstreamFailure({ detail: "no such deployment" }), "no such deployment");
  assert.equal(describeUpstreamFailure({ errors: [{ message: "a" }, { message: "b" }] }), "a, b");
});

test("a bare code is better than nothing", () => {
  assert.equal(describeUpstreamFailure({ code: "EAI_AGAIN" }), "Provider error (EAI_AGAIN)");
});

test("nothing to say still yields the fallback", () => {
  assert.equal(describeUpstreamFailure({}), "Provider error");
  assert.equal(describeUpstreamFailure(null), "Provider error");
  assert.equal(describeUpstreamFailure(undefined), "Provider error");
  assert.equal(describeUpstreamFailure(42), "Provider error");
  assert.equal(describeUpstreamFailure({}, "Upstream down"), "Upstream down");
});

test("the error object is never serialized wholesale", () => {
  const withPayload = {
    code: "EPIPE",
    request: { headers: { authorization: "Bearer sk-do-not-store" } },
  };
  const reason = describeUpstreamFailure(withPayload);
  assert.equal(reason, "Provider error (EPIPE)");
  assert.ok(!reason.includes("sk-do-not-store"));
  assert.ok(!reason.includes("authorization"));
});

test("newlines are collapsed so the dashboard row stays one line", () => {
  assert.equal(describeUpstreamFailure({ message: "line one\nline two" }), "line one line two");
});

test("extractErrorMessage stays available to toJsonErrorPayload's callers", () => {
  assert.equal(extractErrorMessage({ message: "hi" }), "hi");
  assert.equal(extractErrorMessage("hi"), null);
});

test("markAccountUnavailable routes lastError through the helper", () => {
  const src = fs.readFileSync(new URL("../../src/sse/services/auth.ts", import.meta.url), "utf8");
  assert.ok(
    src.includes("describeUpstreamFailure(errorText)"),
    "auth.ts must describe the failure instead of discarding non-string errors"
  );
  assert.equal(
    /typeof errorText === "string" \? errorText\.slice\(0, 100\) : "Provider error"/.test(src),
    false,
    "the string-only collapse must be gone"
  );
});
