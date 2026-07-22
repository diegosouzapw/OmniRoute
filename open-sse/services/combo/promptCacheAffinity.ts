import { createHash } from "node:crypto";
import {
  analyzePrefix,
  generatePromptCacheKey,
} from "../../../src/lib/promptCache/prefixAnalyzer.ts";
import { getCachedProviderConnections } from "../../../src/lib/db/readCache";
import { parseModel } from "../model.ts";
import type { ResolvedComboTarget } from "./types.ts";

interface PromptCacheAffinityTarget {
  executionKey: string;
  connectionId?: string | null;
}

export type PromptCacheAffinitySource = "explicit" | "prefix";

export interface PromptCacheAffinityResolution {
  key: string;
  source: PromptCacheAffinitySource;
  fingerprint: string;
}

export interface PromptCacheAffinityResult {
  targets: ResolvedComboTarget[];
  applied: boolean;
  source: PromptCacheAffinitySource | null;
  fingerprint: string | null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function normalizeMessageContent(value: unknown): string | unknown[] {
  if (typeof value === "string" || Array.isArray(value)) return value;
  try {
    return JSON.stringify(value) || "";
  } catch {
    return "";
  }
}

function normalizeResponsesInput(body: Record<string, unknown>): Array<{
  role: string;
  content: string | unknown[];
}> | null {
  if (Array.isArray(body.messages) && body.messages.length > 0) {
    return body.messages
      .map((item) => {
        const record = asRecord(item);
        return record && typeof record.role === "string"
          ? { role: record.role, content: normalizeMessageContent(record.content) }
          : null;
      })
      .filter((item): item is { role: string; content: string | unknown[] } => item !== null);
  }

  if (typeof body.input === "string" && body.input.length > 0) {
    return [{ role: "user", content: body.input }];
  }

  if (Array.isArray(body.input) && body.input.length > 0) {
    return body.input
      .map((item) => {
        if (typeof item === "string") return { role: "user", content: item };
        const record = asRecord(item);
        return record && typeof record.role === "string"
          ? { role: record.role, content: normalizeMessageContent(record.content) }
          : null;
      })
      .filter((item): item is { role: string; content: string | unknown[] } => item !== null);
  }

  return null;
}

function readExplicitPromptCacheKey(body: Record<string, unknown>): string | null {
  const metadata = asRecord(body.metadata);
  for (const value of [body.prompt_cache_key, metadata?.prompt_cache_key]) {
    if (typeof value !== "string") continue;
    const normalized = value.trim();
    if (normalized.length > 0 && normalized.length <= 4096) return normalized;
  }
  return null;
}

/**
 * Resolve a cache affinity key without exposing the key itself to callers that
 * only need diagnostics. Explicit provider keys win; otherwise the existing
 * prompt-prefix analyzer supplies a safe deterministic fallback.
 */
export function resolvePromptCacheAffinityKey(
  body: Record<string, unknown> | null | undefined
): PromptCacheAffinityResolution | null {
  if (!body) return null;

  const explicit = readExplicitPromptCacheKey(body);
  const messages = normalizeResponsesInput(body);
  const prefixAnalysis = messages ? analyzePrefix(messages) : null;
  // The analyzer intentionally returns a legacy empty-content hash for callers
  // that need that historical value. Affinity must not use it: a request with
  // only a first user turn has no reusable prompt prefix and would collapse
  // otherwise distinct conversations onto one account.
  const prefixKey =
    prefixAnalysis && prefixAnalysis.prefixEndIdx >= 0
      ? generatePromptCacheKey(messages || [])
      : "";
  const key = explicit ?? prefixKey;
  if (!key) return null;

  const source: PromptCacheAffinitySource = explicit ? "explicit" : "prefix";
  const fingerprint = createHash("sha256").update(key).digest("hex").slice(0, 12);
  return { key, source, fingerprint };
}

export function promptCacheTargetIdentity(target: PromptCacheAffinityTarget): string {
  const connectionId = typeof target.connectionId === "string" ? target.connectionId.trim() : "";
  if (connectionId) return `connection:${connectionId}`;
  return `execution:${target.executionKey}`;
}

function rendezvousScore(key: string, identity: string): bigint {
  const digest = createHash("sha256").update(key).update("\0").update(identity).digest("hex");
  return BigInt(`0x${digest.slice(0, 32)}`);
}

/**
 * Return a normalized cache-locality score for auto-combo scoring. The target
 * selected by rendezvous hashing receives 1; all other accounts receive 0.
 * Reusing the same prompt key therefore keeps selecting the same account.
 */
export function calculatePromptCacheAffinityScores(
  targets: PromptCacheAffinityTarget[],
  body: Record<string, unknown> | null | undefined
): Map<string, number> {
  const resolution = resolvePromptCacheAffinityKey(body);
  if (!resolution || targets.length === 0) return new Map();
  let winnerIdentity = "";
  let winnerScore = -1n;
  for (const target of targets) {
    const identity = promptCacheTargetIdentity(target);
    const score = rendezvousScore(resolution.key, identity);
    if (score > winnerScore || (score === winnerScore && identity < winnerIdentity)) {
      winnerIdentity = identity;
      winnerScore = score;
    }
  }
  return new Map(
    targets.map((target) => {
      const identity = promptCacheTargetIdentity(target);
      return [identity, identity === winnerIdentity ? 1 : 0];
    })
  );
}

/**
 * Bind unscoped combo targets to concrete active provider accounts before
 * rendezvous hashing. This keeps the selected cache identity identical to the
 * account that credential resolution will execute, while preserving the
 * original target as a fail-open fallback when no eligible account is known.
 */
export async function expandPromptCacheAffinityTargets(
  targets: ResolvedComboTarget[]
): Promise<ResolvedComboTarget[]> {
  const providers = Array.from(
    new Set(
      targets
        .filter((target) => !target.connectionId)
        .map(
          (target) =>
            target.provider ||
            parseModel(target.modelStr).provider ||
            parseModel(target.modelStr).providerAlias ||
            "unknown"
        )
    )
  );
  const connectionsByProvider = new Map<string, Array<Record<string, unknown>>>();
  await Promise.all(
    providers.map(async (provider) => {
      try {
        const connections = (await getCachedProviderConnections({
          provider,
          isActive: true,
        })) as Array<Record<string, unknown>>;
        connectionsByProvider.set(provider, Array.isArray(connections) ? connections : []);
      } catch {
        connectionsByProvider.set(provider, []);
      }
    })
  );
  return expandPromptCacheAffinityTargetsFromConnections(targets, connectionsByProvider);
}

export function expandPromptCacheAffinityTargetsFromConnections(
  targets: ResolvedComboTarget[],
  connectionsByProvider: Map<string, Array<Record<string, unknown>>>
): ResolvedComboTarget[] {
  const expandedTargets: ResolvedComboTarget[] = [];
  for (const target of targets) {
    if (target.connectionId) {
      expandedTargets.push(target);
      continue;
    }
    const parsed = parseModel(target.modelStr);
    const provider = target.provider || parsed.provider || parsed.providerAlias || "unknown";
    const connectionIds = (connectionsByProvider.get(provider) || [])
      .map((connection) =>
        connection && typeof connection.id === "string" ? connection.id.trim() : ""
      )
      .filter((connectionId) => connectionId.length > 0);
    const allowedConnectionIds = Array.isArray(target.allowedConnectionIds)
      ? new Set(
          target.allowedConnectionIds.filter(
            (connectionId): connectionId is string =>
              typeof connectionId === "string" && connectionId.trim().length > 0
          )
        )
      : null;
    const scopedConnectionIds = allowedConnectionIds
      ? connectionIds.filter((connectionId) => allowedConnectionIds.has(connectionId))
      : connectionIds;
    if (scopedConnectionIds.length === 0) {
      expandedTargets.push(target);
      continue;
    }
    for (const connectionId of scopedConnectionIds) {
      expandedTargets.push({
        ...target,
        connectionId,
        executionKey: `${target.executionKey}@${connectionId}`,
      });
    }
  }
  return expandedTargets;
}

/**
 * Order eligible targets using rendezvous hashing. The original order is used
 * as the final tie-breaker, so targets sharing one account identity remain
 * stable without using modelStr as the affinity identity.
 */
export function applyPromptCacheAffinity(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown> | null | undefined,
  enabled: boolean = true
): PromptCacheAffinityResult {
  const resolution = enabled ? resolvePromptCacheAffinityKey(body) : null;
  if (!resolution || targets.length <= 1) {
    return {
      targets,
      applied: false,
      source: resolution?.source ?? null,
      fingerprint: resolution?.fingerprint ?? null,
    };
  }

  const ranked = targets.map((target, index) => ({
    target,
    index,
    identity: promptCacheTargetIdentity(target),
    score: rendezvousScore(resolution.key, promptCacheTargetIdentity(target)),
  }));

  ranked.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    const identityOrder = a.identity.localeCompare(b.identity);
    return identityOrder !== 0 ? identityOrder : a.index - b.index;
  });

  return {
    targets: ranked.map((entry) => entry.target),
    applied: true,
    source: resolution.source,
    fingerprint: resolution.fingerprint,
  };
}
