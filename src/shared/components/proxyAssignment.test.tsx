import { describe, it, expect } from "vitest";
import { selectScopeAssignment } from "./proxyAssignment";

// Regression guard for the escalated bug "when I create a new provider it already
// comes with a proxy I never configured". The proxy assignments list is global, so
// its first entry belongs to some other scope. selectScopeAssignment must return null
// when the current scope has no assignment of its own — never fall back to items[0],
// which used to pre-fill freshly created providers/keys with an unrelated proxy.
const ASSIGNMENTS = [
  { proxyId: "socks5-acct", scope: "key", scopeId: "3c0031c1-existing-account" },
  { proxyId: "http-claude", scope: "provider", scopeId: "claude" },
];

describe("selectScopeAssignment", () => {
  it("returns null (not items[0]) for a scope with no assignment of its own", () => {
    // A brand-new provider with no proxy assignment.
    const result = selectScopeAssignment(ASSIGNMENTS, "provider", "newprovider");
    expect(result).toBeNull();
  });

  it("returns null for a new account/key scope even when other proxies exist", () => {
    const result = selectScopeAssignment(ASSIGNMENTS, "key", "brand-new-key");
    expect(result).toBeNull();
  });

  it("returns the matching assignment when the scope owns one", () => {
    const result = selectScopeAssignment(ASSIGNMENTS, "provider", "claude");
    expect(result?.proxyId).toBe("http-claude");
  });

  it("treats the global scope (null scopeId) distinctly", () => {
    const withGlobal = [{ proxyId: "g", scope: "global", scopeId: null }, ...ASSIGNMENTS];
    expect(selectScopeAssignment(withGlobal, "global", null)?.proxyId).toBe("g");
    // a provider scope still must not borrow the global assignment
    expect(selectScopeAssignment(withGlobal, "provider", "unconfigured")).toBeNull();
  });

  it("returns null for an empty assignments list", () => {
    expect(selectScopeAssignment([], "provider", "anything")).toBeNull();
  });
});
