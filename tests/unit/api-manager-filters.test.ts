import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isKeyActive,
  isExpired,
  isRestricted,
  classifyKeyStatus,
  classifyKeyType,
  computeApiKeyCounts,
} from "../../src/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils.js";
import type { ApiKeyShape } from "../../src/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const futureDate = new Date(Date.now() + 86_400_000).toISOString(); // +1 day
const pastDate = new Date(Date.now() - 86_400_000).toISOString(); // -1 day

function makeKey(overrides: Partial<ApiKeyShape> = {}): ApiKeyShape {
  return {
    isActive: true,
    isBanned: false,
    expiresAt: null,
    scopes: [],
    allowedModels: null,
    allowedConnections: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Scenario 1 — isKeyActive
// ---------------------------------------------------------------------------
describe("isKeyActive", () => {
  it("returns true for a fully active key", () => {
    assert.equal(isKeyActive(makeKey()), true);
  });

  it("returns false when isBanned is true", () => {
    assert.equal(isKeyActive(makeKey({ isBanned: true })), false);
  });

  it("returns false when isActive is false", () => {
    assert.equal(isKeyActive(makeKey({ isActive: false })), false);
  });

  it("returns false when expiresAt is in the past", () => {
    assert.equal(isKeyActive(makeKey({ expiresAt: pastDate })), false);
  });

  it("returns true when expiresAt is in the future", () => {
    assert.equal(isKeyActive(makeKey({ expiresAt: futureDate })), true);
  });

  it("returns false when banned even if isActive true and not expired", () => {
    assert.equal(
      isKeyActive(makeKey({ isBanned: true, isActive: true, expiresAt: futureDate })),
      false
    );
  });
});

// ---------------------------------------------------------------------------
// Scenario 2 — isExpired
// ---------------------------------------------------------------------------
describe("isExpired", () => {
  it("returns false when expiresAt is null", () => {
    assert.equal(isExpired(makeKey({ expiresAt: null })), false);
  });

  it("returns false when expiresAt is in the future", () => {
    assert.equal(isExpired(makeKey({ expiresAt: futureDate })), false);
  });

  it("returns true when expiresAt is in the past", () => {
    assert.equal(isExpired(makeKey({ expiresAt: pastDate })), true);
  });

  it("returns false for an invalid date string (NaN)", () => {
    assert.equal(isExpired(makeKey({ expiresAt: "not-a-date" })), false);
  });
});

// ---------------------------------------------------------------------------
// Scenario 3 — isRestricted
// ---------------------------------------------------------------------------
describe("isRestricted", () => {
  it("returns false when both allowedModels and allowedConnections are null", () => {
    assert.equal(isRestricted(makeKey()), false);
  });

  it("returns false when allowedModels is an empty array", () => {
    assert.equal(isRestricted(makeKey({ allowedModels: [] })), false);
  });

  it("returns true when allowedModels has entries", () => {
    assert.equal(isRestricted(makeKey({ allowedModels: ["gpt-4"] })), true);
  });

  it("returns true when allowedConnections has entries", () => {
    assert.equal(isRestricted(makeKey({ allowedConnections: ["conn-1"] })), true);
  });

  it("returns true when both have entries", () => {
    assert.equal(
      isRestricted(makeKey({ allowedModels: ["gpt-4"], allowedConnections: ["conn-1"] })),
      true
    );
  });
});

// ---------------------------------------------------------------------------
// Scenario 4 — classifyKeyStatus (banned takes highest priority)
// ---------------------------------------------------------------------------
describe("classifyKeyStatus", () => {
  it("returns 'banned' for a banned key (highest priority)", () => {
    assert.equal(classifyKeyStatus(makeKey({ isBanned: true })), "banned");
  });

  it("returns 'banned' even if also expired", () => {
    assert.equal(classifyKeyStatus(makeKey({ isBanned: true, expiresAt: pastDate })), "banned");
  });

  it("returns 'expired' before 'disabled' when key has past expiry and isActive false", () => {
    // expiresAt in the past AND isActive false — expired is checked before disabled
    assert.equal(classifyKeyStatus(makeKey({ expiresAt: pastDate, isActive: false })), "expired");
  });

  it("returns 'expired' for a non-banned, expired key", () => {
    assert.equal(classifyKeyStatus(makeKey({ expiresAt: pastDate })), "expired");
  });

  it("returns 'disabled' when isActive false and not expired/banned", () => {
    assert.equal(classifyKeyStatus(makeKey({ isActive: false })), "disabled");
  });

  it("returns 'active' for a healthy key", () => {
    assert.equal(classifyKeyStatus(makeKey()), "active");
  });

  it("returns 'active' for key with future expiry and no bans", () => {
    assert.equal(classifyKeyStatus(makeKey({ expiresAt: futureDate })), "active");
  });
});

// ---------------------------------------------------------------------------
// Scenario 4 continued — classifyKeyType
// ---------------------------------------------------------------------------
describe("classifyKeyType", () => {
  it("returns 'standard' for a plain key", () => {
    assert.equal(classifyKeyType(makeKey()), "standard");
  });

  it("returns 'manage' when scopes includes manage", () => {
    assert.equal(classifyKeyType(makeKey({ scopes: ["manage"] })), "manage");
  });

  it("returns 'manage' even if also restricted (manage takes priority)", () => {
    assert.equal(
      classifyKeyType(makeKey({ scopes: ["manage"], allowedModels: ["gpt-4"] })),
      "manage"
    );
  });

  it("returns 'restricted' when has allowedModels and no manage scope", () => {
    assert.equal(classifyKeyType(makeKey({ allowedModels: ["gpt-4"] })), "restricted");
  });

  it("returns 'restricted' when has allowedConnections and no manage scope", () => {
    assert.equal(classifyKeyType(makeKey({ allowedConnections: ["c1"] })), "restricted");
  });
});

// ---------------------------------------------------------------------------
// Scenario 5 — computeApiKeyCounts with 10 varied keys
// ---------------------------------------------------------------------------
describe("computeApiKeyCounts", () => {
  it("returns all zeros for empty array (edge case)", () => {
    const counts = computeApiKeyCounts([]);
    assert.equal(counts.total, 0);
    assert.equal(counts.active, 0);
    assert.equal(counts.banned, 0);
    assert.equal(counts.expired, 0);
    assert.equal(counts.disabled, 0);
    assert.equal(counts.standard, 0);
    assert.equal(counts.manage, 0);
    assert.equal(counts.restricted, 0);
  });

  it("correctly tallies 10 mixed keys", () => {
    const keys: ApiKeyShape[] = [
      makeKey(), // active + standard
      makeKey({ expiresAt: futureDate }), // active + standard
      makeKey({ scopes: ["manage"] }), // active + manage
      makeKey({ allowedModels: ["gpt-4"] }), // active + restricted
      makeKey({ isActive: false }), // disabled + standard
      makeKey({ isBanned: true }), // banned + standard
      makeKey({ expiresAt: pastDate }), // expired + standard
      makeKey({ expiresAt: pastDate, allowedModels: ["gpt-4"] }), // expired + restricted (type=restricted)
      makeKey({ scopes: ["manage"], allowedConnections: ["c1"] }), // active + manage (manage priority)
      makeKey({ allowedConnections: ["c1"] }), // active + restricted
    ];

    const counts = computeApiKeyCounts(keys);

    assert.equal(counts.total, 10);
    // statuses: active(6: keys 1,2,3,4,9,10), disabled(1), banned(1), expired(2)
    assert.equal(counts.active, 6);
    assert.equal(counts.disabled, 1);
    assert.equal(counts.banned, 1);
    assert.equal(counts.expired, 2);
    // types: manage(2), restricted(3), standard(5 — active×2, disabled, banned, expired×1)
    assert.equal(counts.manage, 2);
    assert.equal(counts.restricted, 3);
    assert.equal(counts.standard, 5);
  });
});

// ---------------------------------------------------------------------------
// Scenario 6 — filteredKeys logic (inline simulation of useMemo)
// ---------------------------------------------------------------------------
function applyFilters(
  keys: ApiKeyShape[],
  opts: {
    activeOnly?: boolean;
    statusFilter?: string | null;
    typeFilter?: string | null;
    searchQuery?: string;
  }
): ApiKeyShape[] {
  let list = keys;
  if (opts.activeOnly) list = list.filter(isKeyActive);
  if (opts.statusFilter === "active") list = list.filter(isKeyActive);
  else if (opts.statusFilter === "disabled") list = list.filter((k) => k.isActive === false);
  else if (opts.statusFilter === "banned") list = list.filter((k) => k.isBanned === true);
  else if (opts.statusFilter === "expired") list = list.filter(isExpired);
  if (opts.typeFilter === "manage") list = list.filter((k) => k.scopes?.includes("manage"));
  else if (opts.typeFilter === "restricted") list = list.filter(isRestricted);
  else if (opts.typeFilter === "standard")
    list = list.filter((k) => !k.scopes?.includes("manage") && !isRestricted(k));
  if (opts.searchQuery?.trim()) {
    const q = opts.searchQuery.toLowerCase();
    // We cast to any to allow name/key fields for the filter simulation
    list = list.filter(
      (k) =>
        ((k as Record<string, unknown>)["name"] as string | undefined)?.toLowerCase().includes(q) ||
        ((k as Record<string, unknown>)["key"] as string | undefined)?.toLowerCase().includes(q)
    );
  }
  return list;
}

interface TestApiKey extends ApiKeyShape {
  name: string;
  key: string;
}

function makeTestKey(name: string, key: string, overrides: Partial<ApiKeyShape> = {}): TestApiKey {
  return { ...makeKey(overrides), name, key };
}

describe("filter composition", () => {
  const testKeys: TestApiKey[] = [
    makeTestKey("Alpha", "sk-alpha", {}),
    makeTestKey("Beta", "sk-beta", { isBanned: true }),
    makeTestKey("Gamma", "sk-gamma", { isActive: false }),
    makeTestKey("Delta", "sk-delta", { expiresAt: pastDate }),
    makeTestKey("Epsilon", "sk-epsilon", { scopes: ["manage"] }),
  ];

  it("activeOnly=true excludes banned and inactive keys", () => {
    const result = applyFilters(testKeys, { activeOnly: true });
    const names = result.map((k) => (k as TestApiKey).name);
    assert.ok(names.includes("Alpha"), "Active key should be included");
    assert.ok(names.includes("Epsilon"), "Manage key should be included");
    assert.ok(!names.includes("Beta"), "Banned should be excluded");
    assert.ok(!names.includes("Gamma"), "Disabled should be excluded");
    assert.ok(!names.includes("Delta"), "Expired should be excluded");
  });

  it("statusFilter='banned' returns only banned keys", () => {
    const result = applyFilters(testKeys, { statusFilter: "banned" });
    assert.equal(result.length, 1);
    assert.equal((result[0] as TestApiKey).name, "Beta");
  });

  it("statusFilter='disabled' returns only disabled keys", () => {
    const result = applyFilters(testKeys, { statusFilter: "disabled" });
    assert.equal(result.length, 1);
    assert.equal((result[0] as TestApiKey).name, "Gamma");
  });

  it("typeFilter='manage' returns only manage-scoped keys", () => {
    const result = applyFilters(testKeys, { typeFilter: "manage" });
    assert.equal(result.length, 1);
    assert.equal((result[0] as TestApiKey).name, "Epsilon");
  });
});

// ---------------------------------------------------------------------------
// Scenario 7 — searchQuery filters by name case-insensitively
// ---------------------------------------------------------------------------
describe("searchQuery filtering", () => {
  const testKeys: TestApiKey[] = [
    makeTestKey("Production Key", "sk-prod-abc123", {}),
    makeTestKey("Development Key", "sk-dev-xyz789", {}),
    makeTestKey("Staging", "sk-stg-qwerty", {}),
  ];

  it("matches by name case-insensitively", () => {
    const result = applyFilters(testKeys, { searchQuery: "production" });
    assert.equal(result.length, 1);
    assert.equal((result[0] as TestApiKey).name, "Production Key");
  });

  it("matches by key prefix case-insensitively", () => {
    const result = applyFilters(testKeys, { searchQuery: "SK-DEV" });
    assert.equal(result.length, 1);
    assert.equal((result[0] as TestApiKey).name, "Development Key");
  });

  it("returns all keys when searchQuery is empty", () => {
    const result = applyFilters(testKeys, { searchQuery: "" });
    assert.equal(result.length, 3);
  });

  it("returns empty when no key matches", () => {
    const result = applyFilters(testKeys, { searchQuery: "zzznomatch" });
    assert.equal(result.length, 0);
  });

  it("matches multiple keys with partial substring", () => {
    const result = applyFilters(testKeys, { searchQuery: "key" });
    assert.equal(result.length, 2);
  });
});
