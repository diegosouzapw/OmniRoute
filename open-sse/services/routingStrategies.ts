/**
 * Deterministic routing strategies (M2 — RIC-740, D3 可审计路由).
 *
 * The OmniRoute differentiator vs NotDiamond/Martian "predict 黑盒路线": every
 * routing decision is a deterministic, explainable rule — never a learned model.
 * This module is the strategy engine for the self-hosted gateway entry
 * (`selfHostedEntry.ts`, RIC-738): it turns a declarative `strategy:` config
 * into an ordered, auditable candidate list, and tracks the runtime state
 * (cooldown / latency / cost) that the rules read.
 *
 * Design (KISS / RIC-740):
 *  - Config is declarative — one rule per line, no "一体化智能体". The 5 strategy
 *    types are:
 *      1. blacklist / whitelist  — hard filters (forbidden / forced providers).
 *      2. cooldown / breaker      — provider with N consecutive failures is
 *                                   excluded for a window.
 *      3. cost-priority           — among eligible candidates, cheapest first.
 *      4. latency-aware           — among eligible candidates, fastest first.
 *      5. fallback chain          — on primary failure, walk the ordered chain.
 *  - Every candidate carries an `explain` one-liner answering "why this model".
 *  - No predictive / ML dependency. Runtime state is in-memory only and resets
 *    on restart, mirroring `providerCooldownTracker.ts`.
 */

import * as yaml from "js-yaml";
import type { ProviderConfig } from "./providerAdapters.ts";

/** Per-provider unit price, declared in config (never fabricated). */
export interface StrategyProviderConfig extends ProviderConfig {
  /** USD per 1M input tokens; used by cost-priority. Absent = not scored. */
  costPer1MInput?: number;
}

export interface LatencyAwareConfig {
  enabled: boolean;
}

export interface CooldownConfig {
  /** Consecutive failures that trip the breaker. Default 2. */
  consecutiveFailures?: number;
  /** How long a tripped provider stays excluded (ms). Default 30 s. */
  cooldownMs?: number;
}

/** One line per rule — the whole M2 strategy surface. */
export interface StrategyConfig {
  /** Provider ids that must never be used. Empty = none. */
  blacklist?: string[];
  /** Provider ids allowed. Empty = all. A non-empty whitelist wins over nothing. */
  whitelist?: string[];
  /** Sort eligible candidates by `costPer1MInput` ascending. */
  costPriority?: boolean;
  /** Sort eligible candidates by recent average latency ascending. */
  latencyAware?: LatencyAwareConfig;
  /** Circuit breaker: exclude a provider after consecutive failures. */
  cooldown?: CooldownConfig;
  /**
   * Explicit fallback order. When set, this order is authoritative for the
   * non-pinned part of the candidate list (filters still apply). When empty,
   * the declared provider order is used.
   */
  fallbackChain?: string[];
}

const DEFAULT_COOLDOWN_FAILURES = 2;
const DEFAULT_COOLDOWN_MS = 30 * 1000;

interface CooldownState {
  consecutiveFailures: number;
  lastFailureAt: number;
}

interface LatencyState {
  totalMs: number;
  count: number;
}

export interface RouteCandidate {
  provider: StrategyProviderConfig;
  /** One-line answer to "why is this provider at this position". */
  explain: string;
}

export interface CandidatesResult {
  /** Ordered candidate list — the fallback order for the request. */
  candidates: RouteCandidate[];
  /**
   * Providers excluded by a hard filter (blacklist / whitelist / cooldown),
   * each with the one-line reason. Kept for the explainability contract — the
   * route decision must answer "why NOT this provider" too.
   */
  excluded: Array<{ providerId: string; reason: string }>;
  /**
   * Present when a pinned provider (header / model prefix) was rejected by a
   * hard filter. The caller must NOT silently re-route — the pin is explicit.
   */
  pinBlocked?: { providerId: string; reason: string };
}

interface ScoredCandidate {
  provider: StrategyProviderConfig;
  /** "eligible" | reason for exclusion — used to separate allowed vs excluded. */
  status: string;
  /** One-line explain for an allowed candidate (filled by the ordering stage). */
  explain: string;
}

function resolveCooldownFailures(config: CooldownConfig | undefined): number {
  return config?.consecutiveFailures ?? DEFAULT_COOLDOWN_FAILURES;
}

function resolveCooldownMs(config: CooldownConfig | undefined): number {
  return config?.cooldownMs ?? DEFAULT_COOLDOWN_MS;
}

/**
 * Keep at most this many latency samples per provider — a memory bound so the
 * in-memory history cannot grow unbounded on a busy gateway (same policy as
 * `providerCooldownTracker.ts`'s window pruning).
 */
const MAX_LATENCY_SAMPLES_PER_PROVIDER = 200;

/**
 * Deterministic strategy engine. Pure computation + in-memory runtime state.
 * `providers` is the full configured provider list; `config` is the `strategy:`
 * block (may be `null` for "no strategies configured").
 */
export class DeterministicRoutingEngine {
  private readonly providers: Map<string, StrategyProviderConfig>;
  private readonly config: StrategyConfig;
  private readonly cooldown = new Map<string, CooldownState>();
  private readonly latency = new Map<string, LatencyState>();

  constructor(providers: StrategyProviderConfig[], config: StrategyConfig | null) {
    this.providers = new Map(providers.map((p) => [p.id, p]));
    this.config = config ?? {};
  }

  // ── Runtime state ───────────────────────────────────────────────────────────

  recordSuccess(providerId: string): void {
    const state = this.cooldown.get(providerId);
    if (state) {
      state.consecutiveFailures = 0;
    }
  }

  recordFailure(providerId: string, now = Date.now()): void {
    const state = this.cooldown.get(providerId) ?? { consecutiveFailures: 0, lastFailureAt: 0 };
    state.consecutiveFailures += 1;
    state.lastFailureAt = now;
    this.cooldown.set(providerId, state);
  }

  recordLatency(providerId: string, latencyMs: number): void {
    if (!Number.isFinite(latencyMs) || latencyMs < 0) return;
    const state = this.latency.get(providerId) ?? { totalMs: 0, count: 0 };
    state.totalMs += latencyMs;
    state.count += 1;
    if (state.count > MAX_LATENCY_SAMPLES_PER_PROVIDER) {
      // Memory bound: halve the running average's weight so the window slides
      // instead of growing unbounded (same policy as cooldown window pruning).
      state.totalMs /= 2;
      state.count = Math.ceil(MAX_LATENCY_SAMPLES_PER_PROVIDER / 2);
    }
    this.latency.set(providerId, state);
  }

  /** Average latency for the provider; `null` when unsampled. */
  averageLatencyMs(providerId: string): number | null {
    const state = this.latency.get(providerId);
    if (!state || state.count === 0) return null;
    return state.totalMs / state.count;
  }

  coolingRemainingMs(providerId: string, now = Date.now()): number {
    const state = this.cooldown.get(providerId);
    if (!state || state.consecutiveFailures === 0) return 0;
    const threshold = resolveCooldownFailures(this.config.cooldown);
    if (state.consecutiveFailures < threshold) return 0;
    const cooldownMs = resolveCooldownMs(this.config.cooldown);
    const remaining = cooldownMs - (now - state.lastFailureAt);
    return remaining > 0 ? remaining : 0;
  }

  isCooling(providerId: string, now = Date.now()): boolean {
    return this.coolingRemainingMs(providerId, now) > 0;
  }

  // ── Candidate construction (the explainable pipeline) ──────────────────────

  /**
   * Build the ordered candidate list.
   *
   * Precedence:
   *  1. Hard filters — blacklist, then whitelist, then cooldown. Each removal
   *     records an `explain` line.
   *  2. Pinned provider (header / model-prefix) — if it survived the filters it
   *     becomes the first candidate; if a hard filter rejected it, `pinBlocked`
   *     is set and the caller must surface an explicit error.
   *  3. Ordering — explicit `fallbackChain` order wins; otherwise cost-priority
   *     (ascending `costPer1MInput`, missing cost treated as Infinity) then
   *     latency (ascending recent average) when their flags are enabled.
   */
  candidates(pinnedId?: string, now = Date.now()): CandidatesResult {
    const scored = this.scoreAll(now);

    if (pinnedId) {
      const blocked = this.resolvePinBlocked(pinnedId, scored);
      if (blocked) {
        return { candidates: [], excluded: blocked.excluded, pinBlocked: blocked.pinBlocked };
      }
    }

    const excluded = scored
      .filter((s) => s.status !== "eligible")
      .map((s) => ({ providerId: s.provider.id, reason: s.status }));
    const allowed = scored.filter((s) => s.status === "eligible");
    const ordered = this.orderAllowed(allowed);

    return { candidates: this.buildCandidateList(ordered, pinnedId), excluded };
  }

  /**
   * Resolve whether a pinned provider is unknown or was rejected by a hard
   * filter. Returns `null` when the pin is unset or survived the filters.
   */
  private resolvePinBlocked(
    pinnedId: string,
    scored: ScoredCandidate[]
  ): {
    pinBlocked: { providerId: string; reason: string };
    excluded: Array<{ providerId: string; reason: string }>;
  } | null {
    if (!this.providers.has(pinnedId)) {
      return {
        pinBlocked: { providerId: pinnedId, reason: `unknown provider: ${pinnedId}` },
        excluded: [],
      };
    }
    const pinned = scored.find((s) => s.provider.id === pinnedId);
    if (pinned && pinned.status !== "eligible") {
      return {
        pinBlocked: { providerId: pinnedId, reason: pinned.status },
        excluded: scored
          .filter((s) => s.status !== "eligible")
          .map((s) => ({ providerId: s.provider.id, reason: s.status })),
      };
    }
    return null;
  }

  /** Move the pinned provider (if present) to the front of the ordered list. */
  private buildCandidateList(
    ordered: ScoredCandidate[],
    pinnedId?: string
  ): RouteCandidate[] {
    if (!pinnedId) return ordered.map((entry) => entry);
    const pinnedEntry = ordered.find((e) => e.provider.id === pinnedId);
    const candidates: RouteCandidate[] = [];
    if (pinnedEntry) {
      candidates.push({ provider: pinnedEntry.provider, explain: `pinned: ${pinnedId}` });
    }
    for (const entry of ordered) {
      if (entry.provider.id !== pinnedId) candidates.push(entry);
    }
    return candidates;
  }

  /**
   * Human-readable summary of the full decision path for this request: the
   * ordered candidates AND the excluded providers — the "why this, why not
   * that" answer the D3 audit trail requires.
   */
  explainCandidates(
    candidates: RouteCandidate[],
    excluded: Array<{ providerId: string; reason: string }> = []
  ): string {
    const parts: string[] = [];
    if (candidates.length === 0) {
      parts.push("no eligible providers");
    } else {
      parts.push(candidates.map((c) => `${c.provider.id}(${c.explain})`).join(" -> "));
    }
    for (const entry of excluded) {
      parts.push(`${entry.providerId} excluded: ${entry.reason}`);
    }
    return parts.join("; ");
  }

  private scoreAll(now: number): ScoredCandidate[] {
    const result: ScoredCandidate[] = [];
    for (const provider of this.providers.values()) {
      if ((this.config.blacklist ?? []).includes(provider.id)) {
        result.push({
          provider,
          status: `blacklist: ${provider.id} forbidden`,
          explain: "",
        });
        continue;
      }
      const whitelist = this.config.whitelist ?? [];
      if (whitelist.length > 0 && !whitelist.includes(provider.id)) {
        result.push({
          provider,
          status: `whitelist: ${provider.id} not allowed`,
          explain: "",
        });
        continue;
      }
      const cooling = this.coolingRemainingMs(provider.id, now);
      if (cooling > 0) {
        result.push({
          provider,
          status: `cooldown: ${provider.id} cooling for ${cooling}ms`,
          explain: "",
        });
        continue;
      }
      result.push({ provider, status: "eligible", explain: "" });
    }
    return result;
  }

  private orderAllowed(allowed: ScoredCandidate[]): ScoredCandidate[] {
    const chain = this.config.fallbackChain ?? [];
    if (chain.length > 0) {
      return this.orderByFallbackChain(allowed, chain);
    }

    let ordered = allowed.map((e) => ({ ...e, explain: `${e.provider.id} eligible` }));
    ordered = this.applyCostPriority(ordered);
    ordered = this.applyLatencyAware(ordered);
    return ordered;
  }

  /** Explicit `fallbackChain` order; providers outside the chain are appended. */
  private orderByFallbackChain(
    allowed: ScoredCandidate[],
    chain: string[]
  ): ScoredCandidate[] {
    const byChain = new Map(allowed.map((e) => [e.provider.id, e]));
    const ordered: ScoredCandidate[] = [];
    const used = new Set<string>();
    for (const id of chain) {
      const entry = byChain.get(id);
      if (entry && !used.has(id)) {
        ordered.push({ ...entry, explain: `fallback chain: ${id}` });
        used.add(id);
      }
    }
    // Providers not in the chain keep declaration order, appended at the end.
    for (const entry of allowed) {
      if (!used.has(entry.provider.id)) {
        ordered.push({ ...entry, explain: `${entry.provider.id} eligible` });
        used.add(entry.provider.id);
      }
    }
    return ordered;
  }

  /** Sort by ascending `costPer1MInput` when `costPriority` is enabled. */
  private applyCostPriority(ordered: ScoredCandidate[]): ScoredCandidate[] {
    if (!this.config.costPriority) return ordered;
    const sorted = [...ordered].sort(
      (a, b) => this.costScore(a.provider) - this.costScore(b.provider)
    );
    return sorted.map((entry, index) => ({
      ...entry,
      explain: `cost-priority: ${entry.provider.id} #${index + 1}`,
    }));
  }

  /** Sort by ascending average latency when `latencyAware.enabled` and sampled. */
  private applyLatencyAware(ordered: ScoredCandidate[]): ScoredCandidate[] {
    if (!this.config.latencyAware?.enabled) return ordered;
    const scored = ordered.map((entry) => ({
      entry,
      latency: this.averageLatencyMs(entry.provider.id),
    }));
    if (!scored.some((s) => s.latency !== null)) return ordered;
    const sorted = scored.sort(
      (a, b) => this.latencyScore(a.latency) - this.latencyScore(b.latency)
    );
    return sorted.map((s) => ({
      ...s.entry,
      explain:
        s.latency !== null
          ? `latency: ${s.entry.provider.id} avg ${Math.round(s.latency)}ms`
          : `${s.entry.provider.id} unsampled`,
    }));
  }

  private costScore(provider: StrategyProviderConfig): number {
    return typeof provider.costPer1MInput === "number"
      ? provider.costPer1MInput
      : Number.POSITIVE_INFINITY;
  }

  private latencyScore(latency: number | null): number {
    return latency === null ? Number.POSITIVE_INFINITY : latency;
  }
}

// ── Declarative config parsing ──────────────────────────────────────────────
//
// The `strategy:` block lives next to `providers:` in the same YAML document
// (or a separate `OMNIROUTE_SELF_HOSTED_STRATEGY` env). It is pure data —
// one rule per line — so operators express routing policy without code.

function asStringList(value: unknown, field: string): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || !value.every((v) => typeof v === "string")) {
    throw new Error(`strategy.${field} must be a list of provider ids`);
  }
  return value.filter((v) => v.trim().length > 0).map((v) => v.trim());
}

function asBoolean(value: unknown, field: string): boolean | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "boolean") return value;
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  throw new Error(`strategy.${field} must be a boolean`);
}

function asPositiveInt(value: unknown, field: string): number | undefined {
  if (value === undefined || value === null) return undefined;
  const n = typeof value === "number" ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error(`strategy.${field} must be a positive integer`);
  }
  return n;
}

/**
 * Parse a `strategy:` mapping into a `StrategyConfig`. Throws on unknown or
 * malformed fields so a misconfigured strategy never silently becomes a no-op
 * (same contract as `parseProvidersYaml`).
 */
export function parseStrategyConfig(value: unknown): StrategyConfig {
  if (value === undefined || value === null) return {};
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error("strategy must be a mapping");
  }
  const raw = value as Record<string, unknown>;

  const latencyRaw = raw.latencyAware;
  let latencyAware: LatencyAwareConfig | undefined;
  if (latencyRaw !== undefined && latencyRaw !== null) {
    if (typeof latencyRaw === "object" && !Array.isArray(latencyRaw)) {
      latencyAware = {
        enabled:
          asBoolean((latencyRaw as Record<string, unknown>).enabled, "latencyAware.enabled") ??
          true,
      };
    } else if (typeof latencyRaw === "boolean") {
      latencyAware = { enabled: latencyRaw };
    } else {
      throw new Error("strategy.latencyAware must be a boolean or mapping");
    }
  }

  const cooldownRaw = raw.cooldown;
  let cooldown: CooldownConfig | undefined;
  if (cooldownRaw !== undefined && cooldownRaw !== null) {
    if (typeof cooldownRaw === "object" && !Array.isArray(cooldownRaw)) {
      const cd = cooldownRaw as Record<string, unknown>;
      cooldown = {
        consecutiveFailures: asPositiveInt(cd.consecutiveFailures, "cooldown.consecutiveFailures"),
        cooldownMs: asPositiveInt(cd.cooldownMs, "cooldown.cooldownMs"),
      };
    } else {
      throw new Error("strategy.cooldown must be a mapping");
    }
  }

  return {
    blacklist: asStringList(raw.blacklist, "blacklist"),
    whitelist: asStringList(raw.whitelist, "whitelist"),
    costPriority: asBoolean(raw.costPriority, "costPriority"),
    latencyAware,
    cooldown,
    fallbackChain: asStringList(raw.fallbackChain, "fallbackChain"),
  };
}

/** Trim a field down to a non-empty string, or `undefined` when absent/blank. */
function trimmedStringField(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** Validate the optional `costPer1MInput` field for one provider entry. */
function parseProviderCost(item: Record<string, unknown>, id: string): number | undefined {
  if (item.costPer1MInput === undefined || item.costPer1MInput === null) return undefined;
  const cost = Number(item.costPer1MInput);
  if (!Number.isFinite(cost) || cost < 0) {
    throw new Error(`provider ${id} costPer1MInput must be a non-negative number`);
  }
  return cost;
}

/**
 * Parse a provider entry that carries an optional per-provider cost.
 * The base fields (id/kind/baseUrl/model/apiKey) are validated exactly as in
 * `providerAdapters.parseProviderConfig`; the extra `costPer1MInput` is the only
 * strategy-relevant addition, and it stays out of the public/safe projection.
 */
export function toStrategyProviderConfig(item: Record<string, unknown>): StrategyProviderConfig {
  const id = trimmedStringField(item.id);
  const kind = item.kind;
  const baseUrl = trimmedStringField(item.baseUrl);
  const model = trimmedStringField(item.model);
  if (!id || !baseUrl || !model) {
    throw new Error("provider requires id/baseUrl/model");
  }
  if (!(kind === "openai" || kind === "anthropic" || kind === "local")) {
    throw new Error("provider kind must be openai/anthropic/local");
  }
  const provider: StrategyProviderConfig = {
    id,
    kind,
    baseUrl,
    model,
    ...(typeof item.apiKey === "string" && item.apiKey ? { apiKey: item.apiKey } : {}),
  };
  const cost = parseProviderCost(item, id);
  if (cost !== undefined) {
    provider.costPer1MInput = cost;
  }
  return provider;
}

/**
 * Parse the full self-hosted document (`providers:` + optional `strategy:`).
 * Mirrors `providerAdapters.parseProviderConfig` shape but preserves strategy
 * metadata; credentials remain runtime-only (never in the public projection).
 */
export function parseSelfHostedRoutingConfig(source: string): {
  providers: StrategyProviderConfig[];
  strategy: StrategyConfig;
} {
  const document = yaml.load(source) as Record<string, unknown> | undefined;
  if (!document || typeof document !== "object" || Array.isArray(document)) {
    throw new Error("Self-hosted providers config must be a mapping");
  }
  const providers = document.providers;
  if (!Array.isArray(providers)) {
    throw new Error("Self-hosted providers config requires a providers list");
  }
  const parsedProviders = providers.map((value, index) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error(`Self-hosted provider ${index} must be a mapping`);
    }
    return toStrategyProviderConfig(value as Record<string, unknown>);
  });
  return {
    providers: parsedProviders,
    strategy: parseStrategyConfig(document.strategy),
  };
}

/** Env var holding the inline YAML `strategy:` document (runtime-only). */
export const STRATEGY_ENV = "OMNIROUTE_SELF_HOSTED_STRATEGY";
/** Env var pointing at a YAML file with the `strategy:` document. */
export const STRATEGY_FILE_ENV = "OMNIROUTE_SELF_HOSTED_STRATEGY_FILE";

/** Load the strategy config from an optional env block. `null` = none set. */
export function loadStrategyConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env
): StrategyConfig | null {
  const inline = env[STRATEGY_ENV];
  if (inline) {
    return parseStrategyConfig(yaml.load(inline));
  }
  return null;
}
