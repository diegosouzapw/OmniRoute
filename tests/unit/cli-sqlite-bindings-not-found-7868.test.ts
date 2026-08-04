import { test } from "node:test";
import assert from "node:assert/strict";
import { createSqliteNativeError } from "../../bin/cli/sqlite.mjs";

test("#7868: createSqliteNativeError() gives actionable guidance for a missing-bindings-file error", () => {
  const rawBindingsError = new Error(
    "Could not locate the bindings file. Tried:\n" +
      " → /Users/agent_user/.npm/_npx/44b85dff014d9ceb/node_modules/better-sqlite3/build/better_sqlite3.node\n" +
      " → /Users/agent_user/.npm/_npx/44b85dff014d9ceb/node_modules/better-sqlite3/build/Release/better_sqlite3.node\n" +
      " → /Users/agent_user/.npm/_npx/44b85dff014d9ceb/node_modules/better-sqlite3/lib/binding/node-v147-darwin-arm64/better_sqlite3.node"
  );

  const translated = createSqliteNativeError(rawBindingsError);

  assert.notStrictEqual(
    translated.message,
    rawBindingsError.message,
    "createSqliteNativeError() passed the raw 'Could not locate the bindings file' dump through " +
      "unchanged instead of translating it into actionable guidance (#7868)"
  );
  assert.match(
    translated.message,
    /runtime repair/i,
    "translated error should point the user at the existing self-heal command " +
      "(`omniroute runtime repair`), same as the ABI-mismatch branch already does"
  );
  assert.ok(
    !translated.message.includes("Tried:"),
    "a raw path dump reaching the user is itself a signal the fix regressed"
  );
});
