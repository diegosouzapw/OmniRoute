import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";
import { randomUUID } from "node:crypto";

describe("Provider-scoped aliases (#9068)", () => {
  const providerId = `test-9068-${randomUUID().slice(0, 8)}`;

  it("getProviderAliases returns empty map for new provider", async () => {
    const { getProviderAliases } = await import("@/lib/db/models/aliases");
    const aliases = getProviderAliases(providerId);
    equal(typeof aliases, "object");
    equal(Object.keys(aliases).length, 0);
  });

  it("setProviderAlias stores and retrieves an alias", async () => {
    const { setProviderAlias, getProviderAliases } = await import("@/lib/db/models/aliases");
    setProviderAlias(providerId, "fast", "gpt-4o-mini");
    const aliases = getProviderAliases(providerId);
    equal(aliases["fast"], "gpt-4o-mini");
  });

  it("removeProviderAlias removes a specific alias", async () => {
    const { removeProviderAlias, getProviderAliases } = await import("@/lib/db/models/aliases");
    removeProviderAlias(providerId, "fast");
    const aliases = getProviderAliases(providerId);
    equal(Object.keys(aliases).length, 0);
  });

  it("setProviderAlias with multiple aliases works", async () => {
    const { setProviderAlias, getProviderAliases, removeProviderAlias } = await import(
      "@/lib/db/models/aliases"
    );
    setProviderAlias(providerId, "fast", "gpt-4o-mini");
    setProviderAlias(providerId, "best", "gpt-4o");
    setProviderAlias(providerId, "cheap", "gpt-4o-mini");
    const aliases = getProviderAliases(providerId);
    equal(aliases["fast"], "gpt-4o-mini");
    equal(aliases["best"], "gpt-4o");
    equal(aliases["cheap"], "gpt-4o-mini");
    // Cleanup
    removeProviderAlias(providerId, "fast");
    removeProviderAlias(providerId, "best");
    removeProviderAlias(providerId, "cheap");
  });
});
