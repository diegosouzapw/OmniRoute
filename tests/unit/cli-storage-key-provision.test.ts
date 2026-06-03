import test from "node:test";
import assert from "node:assert/strict";
import { shouldProvisionStorageKey } from "../../bin/cli/utils/storageKeyProvision.mjs";

// argv shape is [node, script, ...args]
const argv = (...args: string[]) => ["node", "omniroute", ...args];

test("storage key: informational commands do NOT provision a key", () => {
  assert.equal(shouldProvisionStorageKey(argv()), false); // bare omniroute → help
  assert.equal(shouldProvisionStorageKey(argv("--version")), false);
  assert.equal(shouldProvisionStorageKey(argv("-V")), false);
  assert.equal(shouldProvisionStorageKey(argv("--help")), false);
  assert.equal(shouldProvisionStorageKey(argv("-h")), false);
  assert.equal(shouldProvisionStorageKey(argv("help")), false);
  assert.equal(shouldProvisionStorageKey(argv("completion")), false);
});

test("storage key: --help/--version anywhere in the args still skips", () => {
  assert.equal(shouldProvisionStorageKey(argv("serve", "--help")), false);
  assert.equal(shouldProvisionStorageKey(argv("keys", "list", "-h")), false);
  assert.equal(shouldProvisionStorageKey(argv("--lang", "en", "--version")), false);
});

test("storage key: real commands DO provision (preserves #1622 persistence)", () => {
  assert.equal(shouldProvisionStorageKey(argv("serve")), true);
  assert.equal(shouldProvisionStorageKey(argv("keys", "list")), true);
  assert.equal(shouldProvisionStorageKey(argv("providers")), true);
  assert.equal(shouldProvisionStorageKey(argv("serve", "--port", "20128")), true);
  // global --lang option before a real command must not suppress provisioning
  assert.equal(shouldProvisionStorageKey(argv("--lang", "en", "serve")), true);
});

test("storage key: defensive on non-array input", () => {
  // @ts-expect-error intentional bad input
  assert.equal(shouldProvisionStorageKey(undefined), false);
});
