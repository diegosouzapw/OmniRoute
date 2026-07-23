import test from "node:test";
import assert from "node:assert/strict";
import { configureUpstreamCa } from "../../src/mitm/upstreamTrust.ts";

test("configureUpstreamCa — no-op when pemPath is undefined", () => {
  assert.doesNotThrow(() => configureUpstreamCa(undefined));
});

test("configureUpstreamCa — no-op when pemPath is empty string", () => {
  assert.doesNotThrow(() => configureUpstreamCa(""));
});

test("configureUpstreamCa — throws structured error for non-existent path", () => {
  const fakePath = "/nonexistent/path/that/does/not/exist/ca.pem";
  try {
    configureUpstreamCa(fakePath);
    assert.fail("Should have thrown");
  } catch (err) {
    assert.ok(err instanceof Error);
    assert.ok(!err.message.includes(" at /"), `Error message should not contain stack trace: ${err.message}`);
    assert.ok(err.message.includes(fakePath));
  }
});

test("configureUpstreamCa — error message contains AGENTBRIDGE_UPSTREAM_CA_CERT label", () => {
  const fakePath = "/no/such/file.pem";
  try {
    configureUpstreamCa(fakePath);
    assert.fail("Should have thrown");
  } catch (err) {
    assert.ok(err instanceof Error);
    assert.ok(err.message.includes("AGENTBRIDGE_UPSTREAM_CA_CERT"));
  }
});

test("configureUpstreamCa — error does not embed multiline stack trace in message", () => {
  try {
    configureUpstreamCa("/definitely/does/not/exist.pem");
  } catch (err) {
    assert.ok(err instanceof Error);
    assert.ok(!err.message.includes("\n    at "));
  }
});
