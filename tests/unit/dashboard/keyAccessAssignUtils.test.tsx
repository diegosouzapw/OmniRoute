import { describe, expect, it } from "vitest";
import {
  applyAssignResult,
  applyOptimisticAccess,
  assignRunToastType,
  buildAssignRequestBody,
  classifyAssignResponse,
  countKeysAllowing,
  filterAccessKeys,
  findStillAllowedPatterns,
  getComboAccess,
  getKeyState,
  getModelAccess,
  isComboAllowed,
  isKeyAssignableModel,
  isKeyUsable,
  isModelAllowed,
  keyAllowsAll,
  networkErrorOutcome,
  parseAccessKeysPage,
  planKeyAssignment,
  revertOptimisticAccess,
  summarizeKeyAccess,
  type AccessKey,
} from "@/app/(dashboard)/dashboard/models/keyAccessAssignUtils";
import * as sharedCandidates from "@/shared/utils/modelPermissionCandidates";
import * as serverPermissions from "@/lib/db/apiKeys/modelPermissions";

function key(overrides: Partial<AccessKey> & { id: string }): AccessKey {
  return {
    name: overrides.id,
    modelAccessMode: "restricted",
    allowedModels: [],
    blockedModels: [],
    allowedCombos: [],
    ...overrides,
  };
}

const NOW = Date.parse("2026-06-01T00:00:00Z");
const allKey = key({ id: "k-all", modelAccessMode: "all", allowedCombos: ["combo/*"] });
const exactKey = key({
  id: "k-exact",
  allowedModels: ["alpha/chat", "beta/coder"],
  allowedCombos: ["combo/fast", "slow"],
});
const wildcardKey = key({ id: "k-wild", allowedModels: ["cc/*"], allowedCombos: [] });
const denyAllKey = key({ id: "k-deny", modelAccessMode: "restricted", allowedModels: [] });

describe("parseAccessKeysPage", () => {
  it("reads keys and total and derives the access mode like the server parser", () => {
    const page = parseAccessKeysPage({
      total: 6,
      keys: [
        { id: "a", name: "key-alice", modelAccessMode: "all", allowedModels: [] },
        // A legacy key with a non-empty list and no explicit mode stays restricted.
        { id: "b", name: "key-bob", allowedModels: ["alpha/chat"], allowedCombos: ["x"] },
        // Explicit restricted with an empty list is deny-all, never allow-all.
        { id: "c", name: "key-carol", modelAccessMode: "restricted", allowedModels: [] },
        { id: "", name: "missing id is dropped" },
        { id: "d", modelAccessMode: "all", allowedCombos: null, isBanned: true },
        // The server parser keeps a non-empty list restrictive even beside "all".
        { id: "e", name: "key-erin", modelAccessMode: "all", allowedModels: ["alpha/chat"] },
      ],
    });

    expect(page.total).toBe(6);
    expect(page.rawCount).toBe(6);
    expect(page.keys.map((entry) => entry.id)).toEqual(["a", "b", "c", "d", "e"]);
    expect(page.keys[0].modelAccessMode).toBe("all");
    expect(page.keys[1].modelAccessMode).toBe("restricted");
    expect(page.keys[2].modelAccessMode).toBe("restricted");
    // A missing combo list is the legacy allow-all, as the server row parser treats it.
    expect(page.keys[3].allowedCombos).toEqual(["combo/*"]);
    expect(page.keys[3].name).toBe("d");
    expect(page.keys[3].isBanned).toBe(true);
    expect(page.keys[4].modelAccessMode).toBe("restricted");
  });

  it("parses blocked models and the revocation and expiry timestamps", () => {
    const page = parseAccessKeysPage({
      keys: [
        {
          id: "a",
          name: "key-alice",
          blockedModels: ["cx/*", 7],
          revokedAt: "2026-05-01T00:00:00Z",
          expiresAt: null,
        },
        { id: "b", name: "key-bob", expiresAt: "2026-05-02T00:00:00Z" },
      ],
    });
    expect(page.keys[0]).toMatchObject({
      blockedModels: ["cx/*"],
      revokedAt: "2026-05-01T00:00:00Z",
      expiresAt: null,
    });
    expect(page.keys[1]).toMatchObject({
      blockedModels: [],
      revokedAt: null,
      expiresAt: "2026-05-02T00:00:00Z",
    });
  });

  it("returns an empty page for malformed payloads", () => {
    expect(parseAccessKeysPage(null)).toEqual({ keys: [], total: null, rawCount: 0 });
    expect(parseAccessKeysPage({ keys: "nope" })).toEqual({ keys: [], total: null, rawCount: 0 });
  });
});

describe("key state", () => {
  it("reports revoked, expired, banned, inactive and active keys", () => {
    expect(getKeyState(key({ id: "r", revokedAt: "2026-01-01T00:00:00Z" }), NOW)).toBe("revoked");
    expect(getKeyState(key({ id: "x", expiresAt: "2026-05-31T23:59:59Z" }), NOW)).toBe("expired");
    expect(getKeyState(key({ id: "f", expiresAt: "2026-06-02T00:00:00Z" }), NOW)).toBe("active");
    expect(getKeyState(key({ id: "b", isBanned: true }), NOW)).toBe("banned");
    expect(getKeyState(key({ id: "i", isActive: false }), NOW)).toBe("inactive");
    expect(getKeyState(key({ id: "a", revokedAt: " ", expiresAt: "not a date" }), NOW)).toBe(
      "active"
    );
  });

  it("treats only revoked and expired keys as unusable", () => {
    expect(isKeyUsable(key({ id: "r", revokedAt: "2026-01-01T00:00:00Z" }), NOW)).toBe(false);
    expect(isKeyUsable(key({ id: "x", expiresAt: "2026-05-01T00:00:00Z" }), NOW)).toBe(false);
    expect(isKeyUsable(key({ id: "b", isBanned: true }), NOW)).toBe(true);
  });
});

describe("isKeyAssignableModel", () => {
  it("rejects combo and auto rows that the catalog lists beside models", () => {
    expect(isKeyAssignableModel({ id: "my-combo", providerId: "combo" })).toBe(false);
    expect(isKeyAssignableModel({ id: "auto/coding", providerId: "combo" })).toBe(false);
    expect(isKeyAssignableModel({ id: "auto/fast", providerId: "auto" })).toBe(false);
    expect(isKeyAssignableModel({ id: "cx/gpt-5", providerId: "codex" })).toBe(true);
  });
});

describe("model access checks", () => {
  it("treats all-mode keys as allowing every model", () => {
    expect(getModelAccess(allKey, "anything/model")).toEqual({ allowed: true, via: "all" });
    expect(keyAllowsAll(allKey, "models")).toBe(true);
  });

  it("matches exact ids before wildcard patterns", () => {
    expect(getModelAccess(exactKey, "alpha/chat")).toEqual({ allowed: true, via: "exact" });
    expect(getModelAccess(exactKey, "alpha/chat-mini")).toEqual({ allowed: false });
  });

  it("names the wildcard that covers a model", () => {
    expect(getModelAccess(wildcardKey, "cc/claude-sonnet")).toEqual({
      allowed: true,
      via: "pattern",
      pattern: "cc/*",
    });
    expect(isModelAllowed(wildcardKey, "openai/gpt")).toBe(false);
  });

  it("keeps an explicit restricted key with an empty list as deny-all", () => {
    expect(keyAllowsAll(denyAllKey, "models")).toBe(false);
    expect(isModelAllowed(denyAllKey, "alpha/chat")).toBe(false);
  });

  it("allows a provider-alias row through a canonical wildcard, like the server", () => {
    const canonical = key({ id: "k-codex", allowedModels: ["codex/*"] });
    expect(getModelAccess(canonical, "cx/gpt-5", "codex")).toEqual({
      allowed: true,
      via: "pattern",
      pattern: "codex/*",
    });
    const alias = key({ id: "k-cx", allowedModels: ["cx/*"] });
    expect(getModelAccess(alias, "codex/gpt-5", "codex")).toEqual({
      allowed: true,
      via: "pattern",
      pattern: "cx/*",
    });
    // The row's own provider id counts even when the alias is unknown to the registry.
    const scoped = key({ id: "k-node", allowedModels: ["node-a/*"] });
    expect(isModelAllowed(scoped, "na/llama", "node-a")).toBe(true);
  });

  it("strips the extended-context suffix before matching", () => {
    expect(getModelAccess(exactKey, "alpha/chat[1m]")).toEqual({
      allowed: true,
      via: "pattern",
      pattern: "alpha/chat",
    });
  });

  it("does not widen a bare id with its provider, because the server does not either", () => {
    const canonical = key({ id: "k-codex", allowedModels: ["codex/*"] });
    expect(isModelAllowed(canonical, "gpt-5", "codex")).toBe(false);
  });

  it("checks blocked models first, even on all-mode keys", () => {
    const blockedAll = key({ id: "k-block", modelAccessMode: "all", blockedModels: ["cx/*"] });
    expect(getModelAccess(blockedAll, "codex/gpt-5", "codex")).toEqual({
      allowed: false,
      via: "blocked",
      pattern: "cx/*",
    });
    const blockedExact = key({
      id: "k-block-exact",
      allowedModels: ["alpha/chat"],
      blockedModels: ["alpha/chat"],
    });
    expect(getModelAccess(blockedExact, "alpha/chat")).toEqual({
      allowed: false,
      via: "blocked",
      pattern: "alpha/chat",
    });
    expect(countKeysAllowing([blockedAll, allKey], "models", "cx/gpt-5", "codex", NOW)).toBe(1);
  });

  it("reuses the server's pure candidate helpers instead of a copy", () => {
    expect(serverPermissions.addModelCandidate).toBe(sharedCandidates.addModelCandidate);
    expect(serverPermissions.stripExtendedContextSuffix).toBe(
      sharedCandidates.stripExtendedContextSuffix
    );
    expect(serverPermissions.addProviderAliasScopedCandidates).toBe(
      sharedCandidates.addProviderAliasScopedCandidates
    );
    expect(serverPermissions.CLAUDE_CODE_PROVIDER_PREFIXES).toBe(
      sharedCandidates.CLAUDE_CODE_PROVIDER_PREFIXES
    );
  });
});

describe("combo access checks", () => {
  it("compares normalised names in both directions", () => {
    expect(getComboAccess(exactKey, "fast")).toEqual({ allowed: true, via: "exact" });
    expect(getComboAccess(exactKey, "combo/slow")).toEqual({ allowed: true, via: "exact" });
    expect(isComboAllowed(exactKey, "other")).toBe(false);
  });

  it("treats combo/* as allow-all", () => {
    expect(getComboAccess(allKey, "whatever")).toEqual({ allowed: true, via: "all" });
    expect(keyAllowsAll(allKey, "combos")).toBe(true);
    expect(keyAllowsAll(exactKey, "combos")).toBe(false);
  });

  it("admits nothing for an empty combo list", () => {
    expect(isComboAllowed(wildcardKey, "fast")).toBe(false);
  });
});

describe("countKeysAllowing and summarizeKeyAccess", () => {
  const keys = [allKey, exactKey, wildcardKey, denyAllKey];

  it("counts keys through the same matcher", () => {
    expect(countKeysAllowing(keys, "models", "alpha/chat")).toBe(2);
    expect(countKeysAllowing(keys, "models", "cc/claude-sonnet")).toBe(2);
    expect(countKeysAllowing(keys, "combos", "fast")).toBe(2);
    expect(countKeysAllowing(keys, "combos", "unknown")).toBe(1);
  });

  it("leaves revoked and expired keys out of the count", () => {
    const revoked = key({ id: "k-rev", modelAccessMode: "all", revokedAt: "2026-01-01" });
    const expired = key({ id: "k-exp", modelAccessMode: "all", expiresAt: "2026-05-01" });
    expect(countKeysAllowing([allKey, revoked, expired], "models", "alpha/chat", "", NOW)).toBe(1);
  });

  it("summarises the current access of a key", () => {
    expect(summarizeKeyAccess(allKey)).toEqual({
      allModels: true,
      modelCount: 0,
      allCombos: true,
      comboCount: 0,
    });
    expect(summarizeKeyAccess(exactKey)).toEqual({
      allModels: false,
      modelCount: 2,
      allCombos: false,
      comboCount: 2,
    });
  });
});

describe("buildAssignRequestBody and planKeyAssignment", () => {
  it("builds add and remove bodies with deduplicated items", () => {
    expect(
      buildAssignRequestBody({
        kind: "models",
        action: "add",
        items: ["alpha/chat", "alpha/chat", " ", "beta/coder"],
      })
    ).toEqual({ add: { models: ["alpha/chat", "beta/coder"] } });
    expect(buildAssignRequestBody({ kind: "combos", action: "remove", items: ["fast"] })).toEqual({
      remove: { combos: ["fast"] },
    });
  });

  it("only sends switchToRestricted for an opted-in add", () => {
    expect(
      buildAssignRequestBody({
        kind: "models",
        action: "add",
        items: ["alpha/chat"],
        switchToRestricted: true,
      })
    ).toEqual({ add: { models: ["alpha/chat"] }, switchToRestricted: true });
    expect(
      buildAssignRequestBody({
        kind: "models",
        action: "remove",
        items: ["alpha/chat"],
        switchToRestricted: true,
      })
    ).toEqual({ remove: { models: ["alpha/chat"] } });
  });

  it("skips allow-all keys on add unless the admin opted in", () => {
    const items = ["alpha/chat"];
    expect(
      planKeyAssignment({ key: allKey, kind: "models", action: "add", items, switchOptIn: false })
    ).toEqual({ type: "skip", reason: "needs_opt_in" });
    expect(
      planKeyAssignment({ key: allKey, kind: "models", action: "add", items, switchOptIn: true })
    ).toEqual({
      type: "send",
      body: { add: { models: items }, switchToRestricted: true },
    });
  });

  it("never sends switchToRestricted for restricted keys even when a stale opt-in exists", () => {
    expect(
      planKeyAssignment({
        key: exactKey,
        kind: "models",
        action: "add",
        items: ["gamma/x"],
        switchOptIn: true,
      })
    ).toEqual({ type: "send", body: { add: { models: ["gamma/x"] } } });
  });

  it("still sends removals to allow-all keys so the server reports no change", () => {
    expect(
      planKeyAssignment({
        key: allKey,
        kind: "combos",
        action: "remove",
        items: ["fast"],
        switchOptIn: false,
      })
    ).toEqual({ type: "send", body: { remove: { combos: ["fast"] } } });
  });

  it("refuses a removal that would leave a restricted key with no models", () => {
    expect(
      planKeyAssignment({
        key: exactKey,
        kind: "models",
        action: "remove",
        items: ["alpha/chat", "beta/coder"],
        switchOptIn: false,
      })
    ).toEqual({ type: "skip", reason: "would_empty" });
    expect(
      planKeyAssignment({
        key: exactKey,
        kind: "models",
        action: "remove",
        items: ["alpha/chat"],
        switchOptIn: false,
      })
    ).toEqual({ type: "send", body: { remove: { models: ["alpha/chat"] } } });
  });

  it("compares normalised combo names when checking for an empty list", () => {
    expect(
      planKeyAssignment({
        key: exactKey,
        kind: "combos",
        action: "remove",
        items: ["fast", "combo/slow"],
        switchOptIn: false,
      })
    ).toEqual({ type: "skip", reason: "would_empty" });
  });

  it("lets a no-op removal through when the list is already empty", () => {
    expect(
      planKeyAssignment({
        key: denyAllKey,
        kind: "models",
        action: "remove",
        items: ["alpha/chat"],
        switchOptIn: false,
      })
    ).toEqual({ type: "send", body: { remove: { models: ["alpha/chat"] } } });
  });
});

describe("findStillAllowedPatterns", () => {
  it("names the wildcards that keep a removed model allowed", () => {
    const mixed = key({ id: "k-mixed", allowedModels: ["cc/*", "cc/claude-sonnet", "alpha/chat"] });
    expect(
      findStillAllowedPatterns(mixed, [
        { id: "cc/claude-sonnet", providerId: "claude" },
        { id: "alpha/chat", providerId: "alpha" },
      ])
    ).toEqual(["cc/*"]);
    expect(findStillAllowedPatterns(exactKey, [{ id: "alpha/chat" }])).toEqual([]);
    expect(findStillAllowedPatterns(allKey, [{ id: "alpha/chat" }])).toEqual([]);
  });
});

describe("classifyAssignResponse and assignRunToastType", () => {
  const okBody = {
    id: "k-exact",
    modelAccessMode: "restricted",
    allowedModels: ["alpha/chat"],
    allowedCombos: ["fast"],
    changed: true,
  };

  it("classifies 200 responses as changed or unchanged and keeps the result", () => {
    const changed = classifyAssignResponse(200, okBody);
    expect(changed.status).toBe("changed");
    expect(changed.result?.allowedModels).toEqual(["alpha/chat"]);
    expect(classifyAssignResponse(200, { ...okBody, changed: false }).status).toBe("unchanged");
  });

  it("classifies a 409 as needing the restricted switch", () => {
    const outcome = classifyAssignResponse(409, {
      error: { code: "key_allows_all_models", message: "API key allows all models." },
    });
    expect(outcome).toEqual({
      status: "needs_switch",
      httpStatus: 409,
      message: "API key allows all models.",
    });
  });

  it("surfaces the API message for 400 and 404 errors", () => {
    expect(
      classifyAssignResponse(400, { error: { message: "Allowed models list exceeds maximum" } })
    ).toEqual({ status: "error", httpStatus: 400, message: "Allowed models list exceeds maximum" });
    expect(classifyAssignResponse(404, { error: "Key not found" })).toEqual({
      status: "error",
      httpStatus: 404,
      message: "Key not found",
    });
  });

  it("treats a malformed 200 body as an error", () => {
    expect(classifyAssignResponse(200, { changed: true }).status).toBe("error");
  });

  it("reports network failures without a message", () => {
    expect(networkErrorOutcome()).toEqual({ status: "error" });
  });

  it("picks success only when a key changed, error on any failure and info otherwise", () => {
    expect(assignRunToastType([{ status: "changed" }, { status: "unchanged" }])).toBe("success");
    expect(assignRunToastType([{ status: "changed" }, { status: "needs_switch" }])).toBe("error");
    expect(assignRunToastType([{ status: "error" }])).toBe("error");
    expect(
      assignRunToastType([
        { status: "unchanged" },
        { status: "skipped" },
        { status: "would_empty" },
      ])
    ).toBe("info");
    expect(assignRunToastType([])).toBe("info");
  });
});

describe("applyAssignResult, optimistic updates and filterAccessKeys", () => {
  it("merges a 200 response back into the key list", () => {
    const blocked = key({ id: "k-all", modelAccessMode: "all", blockedModels: ["cx/*"] });
    const merged = applyAssignResult([blocked, exactKey], {
      id: "k-all",
      modelAccessMode: "restricted",
      allowedModels: ["alpha/chat"],
      allowedCombos: ["combo/*"],
      changed: true,
    });
    expect(merged[0]).toEqual({
      ...blocked,
      modelAccessMode: "restricted",
      allowedModels: ["alpha/chat"],
      allowedCombos: ["combo/*"],
    });
    expect(merged[1]).toBe(exactKey);
  });

  it("toggles models and combos optimistically with normalised combo removal", () => {
    const added = applyOptimisticAccess(denyAllKey, "models", "alpha/chat", true);
    expect(added.allowedModels).toEqual(["alpha/chat"]);
    expect(added.modelAccessMode).toBe("restricted");
    expect(applyOptimisticAccess(exactKey, "models", "alpha/chat", false).allowedModels).toEqual([
      "beta/coder",
    ]);
    expect(applyOptimisticAccess(exactKey, "combos", "fast", false).allowedCombos).toEqual([
      "slow",
    ]);
    expect(applyOptimisticAccess(wildcardKey, "combos", "fast", true).allowedCombos).toEqual([
      "fast",
    ]);
  });

  it("rolls back only the optimistic addition and keeps newer data", () => {
    const newer = key({ id: "k-wild", allowedModels: ["cc/*", "alpha/embed", "alpha/chat"] });
    expect(
      revertOptimisticAccess(newer, wildcardKey, "models", "alpha/chat", true).allowedModels
    ).toEqual(["cc/*", "alpha/embed"]);
    const without = key({ id: "k-wild", allowedModels: ["cc/*", "alpha/embed"] });
    expect(revertOptimisticAccess(without, wildcardKey, "models", "alpha/chat", true)).toBe(
      without
    );
  });

  it("restores only the optimistically removed entries that are still missing", () => {
    const newer = key({ id: "k-exact", allowedModels: ["beta/coder", "gamma/x"] });
    expect(
      revertOptimisticAccess(newer, exactKey, "models", "alpha/chat", false).allowedModels
    ).toEqual(["beta/coder", "gamma/x", "alpha/chat"]);
    const refreshed = key({ id: "k-exact", allowedModels: ["alpha/chat", "beta/coder"] });
    expect(revertOptimisticAccess(refreshed, exactKey, "models", "alpha/chat", false)).toBe(
      refreshed
    );
    const combos = key({ id: "k-exact", allowedCombos: ["slow"] });
    expect(revertOptimisticAccess(combos, exactKey, "combos", "fast", false).allowedCombos).toEqual(
      ["slow", "combo/fast"]
    );
  });

  it("filters keys by name", () => {
    const keys = [key({ id: "1", name: "key-alice" }), key({ id: "2", name: "key-bob" })];
    expect(filterAccessKeys(keys, "ALI").map((entry) => entry.id)).toEqual(["1"]);
    expect(filterAccessKeys(keys, "").length).toBe(2);
  });
});
