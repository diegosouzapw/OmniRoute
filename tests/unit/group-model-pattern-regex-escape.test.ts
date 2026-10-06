// A group model pattern is operator text, but `matchesModelPattern()` compiled
// it into a RegExp with only `*` substituted, so every other metacharacter kept
// its regex meaning. Measured on the pre-fix build, through the real
// `checkKeyModelAccess()` (deny rule, key in the group):
//
//   "gpt-4.1*"   vs "gpt-4o1-preview" -> DENIED   ('.' matched 'o')
//   "gpt-4(*"    vs "gpt-4o"          -> THROW SyntaxError: Unterminated group
//   "claude-3[*" vs "claude-3-opus"   -> THROW SyntaxError: Unterminated character class
//   "*+*"        vs "anything"        -> THROW SyntaxError: Nothing to repeat
//
// The throw is not contained: `isModelAllowedForKey()` calls this helper with no
// try/catch, and that runs on the completion path (`src/sse/handlers/chat.ts`)
// and on the /v1/models catalog, so one malformed pattern breaks every request
// for keys in that group.
import test from "node:test";
import assert from "node:assert/strict";

process.env.API_KEY_SECRET = "test-secret-key-for-unit-tests-123456789";

import * as apiKeys from "../../src/lib/db/apiKeys";
import * as apiKeyGroups from "../../src/lib/db/apiKeyGroups";

let counter = 0;

/**
 * A fresh key in a fresh group carrying the rule under test.
 *
 * A deny rule is paired with `allow *`, because group membership alone is
 * deny-by-default: with no matching allow rule `checkKeyModelAccess()` returns
 * false for everything, which would hide whether the deny pattern matched.
 */
async function keyWithRule(pattern: string, accessType: "allow" | "deny"): Promise<string> {
  const label = `pattern-escape-${counter++}`;
  const key = await apiKeys.createApiKey(label, `machine-${label}`);
  assert.ok(key, "test key must be created");
  const group = apiKeyGroups.createKeyGroup(label);
  apiKeyGroups.addKeyToGroup(key.id, group.id);
  apiKeyGroups.addGroupPermission(group.id, pattern, accessType);
  if (accessType === "deny") {
    apiKeyGroups.addGroupPermission(group.id, "*", "allow");
  }
  return key.id;
}

test("a deny pattern's '.' is a literal, not any-character", async () => {
  const keyId = await keyWithRule("gpt-4.1*", "deny");

  assert.equal(
    apiKeyGroups.checkKeyModelAccess(keyId, "gpt-4.1-mini").allowed,
    false,
    "the model the operator meant to deny must still be denied"
  );
  assert.equal(
    apiKeyGroups.checkKeyModelAccess(keyId, "gpt-4o1-preview").allowed,
    true,
    "'.' must not match 'o' — an unrelated model was being denied"
  );
});

test("an allow pattern's '.' does not widen the grant", async () => {
  // Same defect in the direction that matters more: an allow rule that matches
  // more models than it names hands out access the operator never granted.
  const keyId = await keyWithRule("claude-3.5*", "allow");

  assert.equal(
    apiKeyGroups.checkKeyModelAccess(keyId, "claude-3.5-sonnet").allowed,
    true,
    "the model the operator meant to allow must still be allowed"
  );
  assert.equal(
    apiKeyGroups.checkKeyModelAccess(keyId, "claude-3x5-internal").allowed,
    false,
    "'.' must not match 'x' — an unnamed model was being granted"
  );
});

test("patterns that are not valid regexes no longer throw", async () => {
  // Each of these threw SyntaxError out of the request path before the fix.
  for (const pattern of ["gpt-4(*", "claude-3[*", "*+*", "a{2*", "gpt-4\\*"]) {
    const keyId = await keyWithRule(pattern, "deny");
    assert.doesNotThrow(
      () => apiKeyGroups.checkKeyModelAccess(keyId, "gpt-4o"),
      `pattern ${JSON.stringify(pattern)} must not throw`
    );
  }
});

test("the throw also escaped through isModelAllowedForKey", async () => {
  // The end-to-end path: this is the helper the completion handler and the
  // /v1/models catalog call, and it has no try/catch around the group check.
  const label = `pattern-escape-e2e-${counter++}`;
  const key = await apiKeys.createApiKey(label, `machine-${label}`);
  assert.ok(key);
  const group = apiKeyGroups.createKeyGroup(label);
  apiKeyGroups.addKeyToGroup(key.id, group.id);
  apiKeyGroups.addGroupPermission(group.id, "gpt-4(*", "deny");
  apiKeyGroups.addGroupPermission(group.id, "*", "allow");

  const allowed = await apiKeys.isModelAllowedForKey(key.key, "openai/gpt-4o");
  assert.equal(
    allowed,
    true,
    "a malformed pattern must not deny — and must not throw — on the request path"
  );
});

test("literal metacharacters in a pattern match themselves", async () => {
  // Model ids do carry dots and plus signs, so the escape has to make the
  // literal reading work, not merely stop the throw.
  const keyId = await keyWithRule("qwen2.5+vl*", "deny");

  assert.equal(
    apiKeyGroups.checkKeyModelAccess(keyId, "qwen2.5+vl-7b").allowed,
    false,
    "the literal pattern must match the literal model id"
  );
  assert.equal(
    apiKeyGroups.checkKeyModelAccess(keyId, "qwen2X5vvl-7b").allowed,
    true,
    "and must not match the regex reading of itself"
  );
});

test("plain wildcard semantics are unchanged", async () => {
  const keyId = await keyWithRule("gpt-4*", "deny");

  for (const model of ["gpt-4", "gpt-4o", "gpt-4-turbo"]) {
    assert.equal(
      apiKeyGroups.checkKeyModelAccess(keyId, model).allowed,
      false,
      `${model} must still be denied by gpt-4*`
    );
  }
  assert.equal(
    apiKeyGroups.checkKeyModelAccess(keyId, "gpt-3.5-turbo").allowed,
    true,
    "an unrelated model must still be allowed"
  );
});

test("'*' and exact matches keep their fast paths", async () => {
  const denyAll = await keyWithRule("*", "deny");
  assert.equal(apiKeyGroups.checkKeyModelAccess(denyAll, "anything/at-all").allowed, false);

  const exact = await keyWithRule("gpt-4.1-mini", "deny");
  assert.equal(
    apiKeyGroups.checkKeyModelAccess(exact, "gpt-4.1-mini").allowed,
    false,
    "an exact pattern still matches exactly"
  );
  assert.equal(
    apiKeyGroups.checkKeyModelAccess(exact, "gpt-4X1-mini").allowed,
    true,
    "an exact pattern was never a regex and must stay literal"
  );
});
