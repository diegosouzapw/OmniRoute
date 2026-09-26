import { describe, expect, it } from "vitest";
import {
  applyAssignResult,
  applyOptimisticAccess,
  buildAssignRequestBody,
  classifyAssignResponse,
  countKeysAllowing,
  filterAccessKeys,
  getComboAccess,
  getModelAccess,
  isComboAllowed,
  isModelAllowed,
  keyAllowsAll,
  networkErrorOutcome,
  parseAccessKeysPage,
  planKeyAssignment,
  summarizeKeyAccess,
  summarizeOutcomes,
  type AccessKey,
} from "@/app/(dashboard)/dashboard/models/keyAccessAssignUtils";

function key(overrides: Partial<AccessKey> & { id: string }): AccessKey {
  return {
    name: overrides.id,
    modelAccessMode: "restricted",
    allowedModels: [],
    allowedCombos: [],
    ...overrides,
  };
}

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
      total: 4,
      keys: [
        { id: "a", name: "key-alice", modelAccessMode: "all", allowedModels: [] },
        // A legacy key with a non-empty list and no explicit mode stays restricted.
        { id: "b", name: "key-bob", allowedModels: ["alpha/chat"], allowedCombos: ["x"] },
        // Explicit restricted with an empty list is deny-all, never allow-all.
        { id: "c", name: "key-carol", modelAccessMode: "restricted", allowedModels: [] },
        { id: "", name: "missing id is dropped" },
        { id: "d", modelAccessMode: "all", allowedCombos: null, isBanned: true },
      ],
    });

    expect(page.total).toBe(4);
    expect(page.keys.map((entry) => entry.id)).toEqual(["a", "b", "c", "d"]);
    expect(page.keys[0].modelAccessMode).toBe("all");
    expect(page.keys[1].modelAccessMode).toBe("restricted");
    expect(page.keys[2].modelAccessMode).toBe("restricted");
    // A missing combo list is the legacy allow-all, as the server row parser treats it.
    expect(page.keys[3].allowedCombos).toEqual(["combo/*"]);
    expect(page.keys[3].name).toBe("d");
    expect(page.keys[3].isBanned).toBe(true);
  });

  it("returns an empty page for malformed payloads", () => {
    expect(parseAccessKeysPage(null)).toEqual({ keys: [], total: null });
    expect(parseAccessKeysPage({ keys: "nope" })).toEqual({ keys: [], total: null });
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
    ).toEqual({ type: "skip" });
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
});

describe("classifyAssignResponse", () => {
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

  it("summarises outcomes", () => {
    expect(
      summarizeOutcomes([
        { status: "changed" },
        { status: "unchanged" },
        { status: "skipped" },
        { status: "needs_switch" },
        { status: "error" },
      ])
    ).toEqual({ total: 5, changed: 1, unchanged: 1, skipped: 1, needsSwitch: 1, failed: 1 });
  });
});

describe("applyAssignResult, applyOptimisticAccess and filterAccessKeys", () => {
  it("merges a 200 response back into the key list", () => {
    const merged = applyAssignResult([allKey, exactKey], {
      id: "k-all",
      modelAccessMode: "restricted",
      allowedModels: ["alpha/chat"],
      allowedCombos: ["combo/*"],
      changed: true,
    });
    expect(merged[0]).toMatchObject({
      id: "k-all",
      name: "k-all",
      modelAccessMode: "restricted",
      allowedModels: ["alpha/chat"],
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

  it("filters keys by name", () => {
    const keys = [key({ id: "1", name: "key-alice" }), key({ id: "2", name: "key-bob" })];
    expect(filterAccessKeys(keys, "ALI").map((entry) => entry.id)).toEqual(["1"]);
    expect(filterAccessKeys(keys, "").length).toBe(2);
  });
});
