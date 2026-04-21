import test from "node:test";
import assert from "node:assert/strict";

import { extractZedAccountFromSecurityText } from "../../src/lib/oauth/services/zedLocal.ts";

test("Zed Keychain parser extracts the account id from security output", () => {
  const account = extractZedAccountFromSecurityText(`
keychain: "/Users/dev/Library/Keychains/login.keychain-db"
class: "inet"
attributes:
    "acct"<blob>="user-123"
    "srvr"<blob>="https://zed.dev"
`);

  assert.equal(account, "user-123");
});

test("Zed Keychain parser returns null when the account marker is missing", () => {
  const account = extractZedAccountFromSecurityText(`
keychain: "/Users/dev/Library/Keychains/login.keychain-db"
class: "inet"
attributes:
    "srvr"<blob>="https://zed.dev"
`);

  assert.equal(account, null);
});
