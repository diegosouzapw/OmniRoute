import { test } from "node:test";
import assert from "node:assert/strict";
import {
  deriveLegacyCliToken,
  deriveMachineToken,
  getMachineTokenSync,
} from "../../../src/lib/machineToken.ts";

test("machine-token derivation fails closed for a missing machine ID", () => {
  assert.equal(deriveMachineToken("", "omniroute-cli-auth-v1"), "");
  assert.equal(deriveLegacyCliToken("", "omniroute-cli-auth-v1"), "");
});

test("getMachineTokenSync returns a 64-character hex string (full SHA-256)", () => {
  const token = getMachineTokenSync();
  assert.match(token, /^[0-9a-f]{64}$/, "token must be 64 lowercase hex chars (HMAC-SHA256)");
});

test("getMachineTokenSync is deterministic", () => {
  assert.equal(getMachineTokenSync(), getMachineTokenSync());
});

test("getMachineTokenSync produces different values for different salts", () => {
  const t1 = getMachineTokenSync("salt-a");
  const t2 = getMachineTokenSync("salt-b");
  assert.notEqual(t1, t2);
});

test("getMachineTokenSync with empty string salt does not throw", () => {
  assert.doesNotThrow(() => getMachineTokenSync(""));
});

test("getMachineTokenSync respects OMNIROUTE_CLI_SALT env var", () => {
  const previous = process.env.OMNIROUTE_CLI_SALT;
  try {
    const before = getMachineTokenSync();
    process.env.OMNIROUTE_CLI_SALT = "__test_salt__";
    const withEnv = getMachineTokenSync();
    assert.notEqual(before, withEnv, "env salt must produce a different token");
    assert.match(withEnv, /^[0-9a-f]{64}$/, "env-derived token must still be 64-char hex");
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_CLI_SALT;
    else process.env.OMNIROUTE_CLI_SALT = previous;
  }
});
