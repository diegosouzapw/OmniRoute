import { describe, it, expect } from "vitest";
import { applyComboTargetExhaustion, type ComboExhaustionSets } from "../targetExhaustion.ts";
import type { ResolvedComboTarget, ComboLogger } from "../types.ts";

function makeTarget(overrides: Partial<ResolvedComboTarget> = {}): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "step-1",
    executionKey: "key-1",
    modelStr: "gpt-4",
    provider: "openai",
    providerId: "p1",
    connectionId: "c1",
    allowedConnectionIds: null,
    weight: 1,
    label: null,
    failoverBeforeRetry: undefined,
    ...overrides,
  };
}

function makeLogger(): ComboLogger {
  const msgs: string[] = [];
  return {
    info: (...args: unknown[]) => { msgs.push(args.join(" ")); },
    warn: (...args: unknown[]) => { msgs.push(args.join(" ")); },
    error: (...args: unknown[]) => { msgs.push(args.join(" ")); },
    debug: (...args: unknown[]) => { msgs.push(args.join(" ")); },
    _msgs: msgs,
  } as ComboLogger & { _msgs: string[] };
}

function makeSets(): ComboExhaustionSets {
  return {
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  };
}

describe("applyComboTargetExhaustion", () => {
  it("marks provider exhausted when isProviderExhaustedReason is true (quota)", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 429 },
      fallbackResult: { error: { code: "quota_exhausted" } },
      errorText: "",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(true);
    expect(sets.exhaustedProviders.has("openai")).toBe(true);
    expect(sets.exhaustedProviders.size).toBe(1);
    expect(sets.transientRateLimitedProviders.has("openai")).toBe(false);
  });

  it("marks provider exhausted when classifyErrorText returns QUOTA_EXHAUSTED", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 429 },
      fallbackResult: {} as any,
      errorText: "You have exhausted your quota. Please retry later.",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(true);
    expect(sets.exhaustedProviders.has("openai")).toBe(true);
  });

  it("marks provider exhausted when allAccountsRateLimited is true", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 503 },
      fallbackResult: {} as any,
      errorText: "Service temporarily unavailable",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: true,
      sets,
      log,
      tag: "COMBO-RR",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(true);
    expect(sets.exhaustedProviders.has("openai")).toBe(true);
  });

  it("does NOT mark provider exhausted for per-model-quota providers (different model)", () => {
    const sets = makeSets();
    const log = makeLogger();
    const target = makeTarget({ provider: "openai" });
    const exhausted = applyComboTargetExhaustion(target, {
      result: { status: 429 },
      fallbackResult: { error: { code: "quota_exhausted" } },
      errorText: "quota exceeded for model gpt-4",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
    expect(sets.exhaustedProviders.has("openai")).toBe(false);
    expect(sets.transientRateLimitedProviders.has("openai")).toBe(true);
  });

  it("does NOT mark provider exhausted for unknown providers", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget({ provider: "unknown" }), {
      result: { status: 503 },
      fallbackResult: { error: { code: "quota_exhausted" } },
      errorText: "quota exhausted",
      rawModel: "unknown-model",
      isTokenLimitBreach: false,
      allAccountsRateLimited: true,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
  });

  it("does NOT mark provider exhausted for empty provider strings", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget({ provider: "" }), {
      result: { status: 503 },
      fallbackResult: { error: { code: "quota_exhausted" } },
      errorText: "quota exhausted",
      rawModel: "model",
      isTokenLimitBreach: false,
      allAccountsRateLimited: true,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
  });

  it("marks transientRateLimited on 429 when NOT token-limit breach and NOT provider-exhausted", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 429 },
      fallbackResult: {} as any,
      errorText: "Rate limited",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
    expect(sets.transientRateLimitedProviders.has("openai")).toBe(true);
    expect(sets.exhaustedProviders.has("openai")).toBe(false);
  });

  it("does NOT mark transientRateLimited on 429 when isTokenLimitBreach is true", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 429 },
      fallbackResult: {} as any,
      errorText: "Token limit exceeded",
      rawModel: "gpt-4",
      isTokenLimitBreach: true,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
    expect(sets.transientRateLimitedProviders.has("openai")).toBe(false);
    expect(sets.exhaustedProviders.has("openai")).toBe(false);
  });

  it("marks exhaustedConnections on connection-level error status (502) with connectionId", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(
      makeTarget({ provider: "openai", connectionId: "conn-1" }),
      {
        result: { status: 502 },
        fallbackResult: {} as any,
        errorText: "Bad Gateway",
        rawModel: "gpt-4",
        isTokenLimitBreach: false,
        allAccountsRateLimited: false,
        sets,
        log,
        tag: "COMBO",
        exhaustedLogLevel: "info",
      }
    );
    expect(exhausted).toBe(false);
    expect(sets.exhaustedConnections.has("openai:conn-1")).toBe(true);
    expect(sets.exhaustedProviders.has("openai")).toBe(false);
  });

  it("marks exhaustedProviders on connection-level error when NO connectionId", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(
      makeTarget({ provider: "openai", connectionId: null }),
      {
        result: { status: 502 },
        fallbackResult: {} as any,
        errorText: "Bad Gateway",
        rawModel: "gpt-4",
        isTokenLimitBreach: false,
        allAccountsRateLimited: false,
        sets,
        log,
        tag: "COMBO",
        exhaustedLogLevel: "info",
      }
    );
    expect(exhausted).toBe(false);
    expect(sets.exhaustedProviders.has("openai")).toBe(true);
    expect(sets.exhaustedConnections.size).toBe(0);
  });

  it("does NOT mark anything for circuit-open (X-OmniRoute-Provider-Breaker header)", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 503, headers: new Map([["x-omniroute-provider-breaker", "open"]]) as any },
      fallbackResult: {} as any,
      errorText: "",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
    expect(sets.exhaustedProviders.has("openai")).toBe(false);
    expect(sets.exhaustedConnections.has("openai:c1")).toBe(false);
    expect(sets.transientRateLimitedProviders.has("openai")).toBe(false);
  });

  it("does NOT mark exhaustion for non-connection-level status codes (400)", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 400 },
      fallbackResult: {} as any,
      errorText: "Bad Request",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
    expect(sets.exhaustedConnections.size).toBe(0);
    expect(sets.exhaustedProviders.size).toBe(0);
    expect(sets.transientRateLimitedProviders.size).toBe(0);
  });

  it("does NOT mark anything for 200 (success)", () => {
    const sets = makeSets();
    const log = makeLogger();
    const exhausted = applyComboTargetExhaustion(makeTarget(), {
      result: { status: 200 },
      fallbackResult: {} as any,
      errorText: "",
      rawModel: "gpt-4",
      isTokenLimitBreach: false,
      allAccountsRateLimited: false,
      sets,
      log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
    });
    expect(exhausted).toBe(false);
    expect(sets.exhaustedProviders.size).toBe(0);
    expect(sets.exhaustedConnections.size).toBe(0);
    expect(sets.transientRateLimitedProviders.size).toBe(0);
  });
});
