import test from "node:test";
import assert from "node:assert/strict";

const { resolveUsageAccountIdentity } = await import("../../src/lib/usage/accountIdentity.ts");

test("Codex chatgptUserId identity is stable across UUID and label changes", () => {
  const first = resolveUsageAccountIdentity({
    id: "old-uuid",
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    displayName: "Production Codex",
    providerSpecificData: { chatgptUserId: "user-production" },
  });
  const recreated = resolveUsageAccountIdentity({
    id: "new-uuid",
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    name: "member@example.com",
    providerSpecificData: { chatgptUserId: "user-production" },
  });

  const emailChanged = resolveUsageAccountIdentity({
    id: "third-uuid",
    provider: "codex",
    authType: "oauth",
    email: "renamed@example.com",
    providerSpecificData: { chatgptUserId: "user-production" },
  });

  assert.equal(first.accountKey, recreated.accountKey);
  assert.equal(first.accountKey, emailChanged.accountKey);
  assert.equal(first.accountLabel, "Production Codex");
  assert.equal(recreated.accountLabel, "member@example.com");
});
