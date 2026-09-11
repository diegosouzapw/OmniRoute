import { createHash } from "node:crypto";
import { buildErrorBody } from "../../utils/error.ts";
import { isModelLocked, hasPerModelQuota } from "../accountFallback.ts";
import { isProviderInCooldown } from "../providerCooldownTracker.ts";
import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker.ts";
import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import { checkCredentialGate } from "../credentialGate.ts";
import { canAffordRequest } from "../../../src/lib/quota/quotaScheduler.ts";
import { resolveQuotaExhaustionCutoffForTarget } from "./quotaExhaustionCutoff.ts";
import type { ResetWindowConfig } from "./quotaScoring.ts";
import { parseModel } from "../model.ts";
import type { ComboLogger, IsModelAvailable } from "./types.ts";

import type { ResolvedComboTarget } from "./types.ts";

export type NativeTurnPin = {
  comboName: string;
  modelStr: string;
  provider: string;
  connectionId: string;
  createdAt: number;
  expiresAt: number;
  generation?: number;
};

export interface NativeCodexTurnRecord {
  comboName: string;
  threadId: string;
  turnId: string;
  activeGeneration: number;
  pins: Map<number, NativeTurnPin>;
  createdAt: number;
  expiresAt: number;
}

export const MAX_AUTORESUMES_PER_TURN = 1;
const TTL_MS = 45 * 60_000;
const MAX_PINS = 1_000;
const turns = new Map<string, NativeCodexTurnRecord>();

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function turnMetadata(body: Record<string, unknown>): Record<string, unknown> | undefined {
  const metadata = record(body.client_metadata);
  const raw = metadata?.["x-codex-turn-metadata"];
  if (typeof raw === "string") {
    try {
      return record(JSON.parse(raw));
    } catch {
      return undefined;
    }
  }
  return record(raw);
}

export function nativeCodexTurnKey(
  body: Record<string, unknown>,
  comboName: string
): string | null {
  const metadata = turnMetadata(body);
  const threadId = typeof metadata?.thread_id === "string" ? metadata.thread_id : "";
  const turnId = typeof metadata?.turn_id === "string" ? metadata.turn_id : "";
  if (!threadId || !turnId) return null;
  return createHash("sha256").update(JSON.stringify({ comboName, threadId, turnId })).digest("hex");
}

function prune(now = Date.now()): void {
  for (const [key, rec] of turns) if (rec.expiresAt <= now) turns.delete(key);
  while (turns.size > MAX_PINS) {
    const oldest = turns.keys().next().value as string | undefined;
    if (!oldest) break;
    turns.delete(oldest);
  }
}

export function getNativeCodexTurnPin(
  body: Record<string, unknown>,
  comboName: string,
  generation?: number
): NativeTurnPin | null {
  prune();
  const key = nativeCodexTurnKey(body, comboName);
  if (!key) return null;
  const rec = turns.get(key);
  if (!rec) return null;
  const gen = generation !== undefined ? generation : rec.activeGeneration;
  return rec.pins.get(gen) ?? null;
}

export function getNativeCodexTurnActiveGeneration(
  body: Record<string, unknown>,
  comboName: string
): number {
  prune();
  const key = nativeCodexTurnKey(body, comboName);
  if (!key) return 0;
  return turns.get(key)?.activeGeneration ?? 0;
}

export function advanceNativeCodexTurnGeneration(
  body: Record<string, unknown>,
  comboName: string
): number | null {
  prune();
  const key = nativeCodexTurnKey(body, comboName);
  if (!key) return null;
  const rec = turns.get(key);
  if (!rec) return null;
  rec.activeGeneration += 1;
  const now = Date.now();
  rec.expiresAt = now + TTL_MS;
  return rec.activeGeneration;
}

export function pinNativeCodexTurn(args: {
  body: Record<string, unknown>;
  comboName: string;
  target: ResolvedComboTarget;
  connectionId: string;
  generation?: number;
}): void {
  const key = nativeCodexTurnKey(args.body, args.comboName);
  if (!key || !args.connectionId) return;
  let rec = turns.get(key);
  const now = Date.now();
  if (!rec) {
    const metadata = turnMetadata(args.body);
    rec = {
      comboName: args.comboName,
      threadId: typeof metadata?.thread_id === "string" ? metadata.thread_id : "",
      turnId: typeof metadata?.turn_id === "string" ? metadata.turn_id : "",
      activeGeneration: 0,
      pins: new Map(),
      createdAt: now,
      expiresAt: now + TTL_MS,
    };
    turns.set(key, rec);
  }
  const gen = args.generation !== undefined ? args.generation : rec.activeGeneration;
  const existing = rec.pins.get(gen);
  if (
    existing &&
    (existing.modelStr !== args.target.modelStr || existing.provider !== args.target.provider)
  ) {
    throw new Error("Native Codex turn target changed after output was emitted");
  }
  // ConnectionId changes are allowed (failover to sibling connection)
  // as long as provider + model stay the same.
  rec.pins.set(gen, {
    comboName: args.comboName,
    modelStr: args.target.modelStr,
    provider: args.target.provider,
    connectionId: args.connectionId,
    createdAt: existing?.createdAt ?? now,
    expiresAt: now + TTL_MS,
    generation: gen,
  });
  rec.expiresAt = now + TTL_MS;
  prune(now);
}

/**
 * Apply a native Codex turn pin to the target list.
 *
 * Returns all compatible targets (same provider + model) with the pinned
 * connection preferred first. This allows fill-first failover: if the
 * pinned connection is rejected by a pre-dispatch gate, the combo engine
 * tries the next compatible connection instead of returning 503.
 *
 * Provider + model remain locked for the turn — only the connection
 * can fall over.
 */
export function applyNativeCodexTurnPin(
  targets: ResolvedComboTarget[],
  pin: NativeTurnPin
): ResolvedComboTarget[] {
  const compatible = targets.filter(
    (candidate) => candidate.modelStr === pin.modelStr && candidate.provider === pin.provider
  );
  if (compatible.length === 0) return [];

  let pinnedIndex = compatible.findIndex((t) => t.connectionId === pin.connectionId);
  // No candidate already carries the pinned connectionId (e.g. the caller
  // resolved the target before a connection was assigned) — assign the pin
  // onto the first compatible candidate so dispatch targets it directly.
  if (pinnedIndex < 0) pinnedIndex = 0;

  // Resolve the pinned slot's connectionId in ORIGINAL order first, so
  // allowedConnectionIds reflects the same set/order regardless of which
  // candidate ends up first in the returned (pinned-first) array.
  const resolved = compatible.map((t, i) =>
    i === pinnedIndex ? { ...t, connectionId: pin.connectionId } : t
  );
  const allowedConnectionIds = resolved
    .map((t) => t.connectionId)
    .filter((id): id is string => id !== null);

  // Pinned connection first, then same-provider/model siblings as fallback
  const pinned = resolved[pinnedIndex];
  const siblings = resolved.filter((_, i) => i !== pinnedIndex);
  const ordered = [pinned, ...siblings];

  return ordered.map((target) => ({
    ...target,
    // Allow only connections for the pinned provider+model
    allowedConnectionIds,
  }));
}

export function revokeNativeCodexTurnPinsForConnection(connectionId: string): number {
  let revoked = 0;
  for (const [key, rec] of turns) {
    for (const [gen, pin] of rec.pins) {
      if (pin.connectionId === connectionId) {
        rec.pins.delete(gen);
        revoked += 1;
      }
    }
    if (rec.pins.size === 0) {
      turns.delete(key);
    }
  }
  return revoked;
}

export const NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE = "NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE";
export const NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_MESSAGE =
  "The model handling this native Codex turn is no longer available. This turn cannot switch providers or models after output has been emitted. Start a new turn to allow Combo routing to select another model.";

export function createPinnedModelUnavailableResponse(): Response {
  const body = buildErrorBody(400, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_MESSAGE, undefined, {
    code: NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE,
    type: "invalid_request_error",
  });
  return new Response(JSON.stringify(body), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export interface CheckPinnedTargetsModelScopedUnusableOptions {
  pinnedTargets: ResolvedComboTarget[];
  resilienceSettings?: ResilienceSettings | null;
  quotaCutoffResetWindowConfig?: ResetWindowConfig;
  comboName: string;
  body: Record<string, unknown>;
  log?: ComboLogger;
  isModelAvailable?: IsModelAvailable;
}

export async function isPinnedTargetModelScopedUnusable(args: {
  target: ResolvedComboTarget;
  resilienceSettings?: ResilienceSettings | null;
  quotaCutoffResetWindowConfig?: ResetWindowConfig;
  comboName: string;
  body: Record<string, unknown>;
  log?: ComboLogger;
  isModelAvailable?: IsModelAvailable;
}): Promise<boolean> {
  const {
    target,
    resilienceSettings,
    quotaCutoffResetWindowConfig,
    comboName,
    body,
    log,
    isModelAvailable,
  } = args;
  const provider = target.provider;
  const connectionId = target.connectionId || "";
  const rawModel = parseModel(target.modelStr).model || target.modelStr;

  if (provider && provider !== "unknown") {
    const cb = getCircuitBreaker(provider);
    if (cb.getStatus().state === "OPEN") return false;
    if (
      resilienceSettings?.providerCooldown?.enabled &&
      (isProviderInCooldown(provider, connectionId || undefined, resilienceSettings) ||
        isProviderInCooldown(provider, undefined, resilienceSettings))
    ) {
      return false;
    }
  }

  if (
    connectionId &&
    checkCredentialGate(connectionId, provider, target.modelStr).allowed === false
  ) {
    return false;
  }

  if (provider && rawModel && isModelLocked(provider, connectionId, rawModel)) return true;

  if (
    process.env.OMNIROUTE_QUOTA_AWARE_ROUTING === "1" &&
    provider &&
    connectionId &&
    !canAffordRequest(connectionId, target.modelStr, body).affordable
  ) {
    return true;
  }

  if (provider && connectionId && quotaCutoffResetWindowConfig) {
    const cutoff = await resolveQuotaExhaustionCutoffForTarget(
      provider,
      connectionId,
      resilienceSettings,
      quotaCutoffResetWindowConfig,
      comboName,
      log ?? { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
      target.modelStr
    );
    if (cutoff.blocked) return true;
  }

  if (isModelAvailable) {
    const available = await Promise.resolve(isModelAvailable(target.modelStr, target)).catch(
      () => true
    );
    if (
      !available &&
      provider &&
      rawModel &&
      (isModelLocked(provider, connectionId, rawModel) || hasPerModelQuota(provider, rawModel))
    ) {
      return true;
    }
  }

  return false;
}

export async function areAllPinnedTargetsModelScopedUnusable(
  options: CheckPinnedTargetsModelScopedUnusableOptions
): Promise<boolean> {
  if (!options.pinnedTargets?.length) return false;
  for (const target of options.pinnedTargets) {
    if (!(await isPinnedTargetModelScopedUnusable({ target, ...options }))) {
      return false;
    }
  }
  return true;
}

export function clearNativeCodexTurnPinsForTests(): void {
  turns.clear();
}

export function hasUnresolvedToolCalls(body: Record<string, unknown>): boolean {
  const input: unknown[] = Array.isArray(body.input)
    ? body.input
    : Array.isArray(body.messages)
      ? body.messages
      : [];
  if (input.length === 0) return false;

  const callCounts = new Map<string, number>();
  const outputCounts = new Map<string, number>();

  const processPart = (part: unknown): boolean => {
    if (!part || typeof part !== "object") return true;
    const rec = part as Record<string, unknown>;
    const type = typeof rec.type === "string" ? rec.type : "";

    if (type === "function_call" || type === "custom_tool_call") {
      const callId =
        (typeof rec.call_id === "string" && rec.call_id.trim() ? rec.call_id.trim() : "") ||
        (typeof rec.id === "string" && rec.id.trim() ? rec.id.trim() : "");
      if (!callId) return false;
      callCounts.set(callId, (callCounts.get(callId) ?? 0) + 1);
    } else if (type === "function_call_output" || type === "custom_tool_call_output") {
      const callId =
        (typeof rec.call_id === "string" && rec.call_id.trim() ? rec.call_id.trim() : "") ||
        (typeof rec.id === "string" && rec.id.trim() ? rec.id.trim() : "");
      if (!callId) return false;
      outputCounts.set(callId, (outputCounts.get(callId) ?? 0) + 1);
    } else if (type === "tool_use") {
      const callId = typeof rec.id === "string" && rec.id.trim() ? rec.id.trim() : "";
      if (!callId) return false;
      callCounts.set(callId, (callCounts.get(callId) ?? 0) + 1);
    } else if (type === "tool_result") {
      const callId =
        (typeof rec.tool_use_id === "string" && rec.tool_use_id.trim()
          ? rec.tool_use_id.trim()
          : "") || (typeof rec.id === "string" && rec.id.trim() ? rec.id.trim() : "");
      if (!callId) return false;
      outputCounts.set(callId, (outputCounts.get(callId) ?? 0) + 1);
    }
    return true;
  };

  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const role = typeof rec.role === "string" ? rec.role : "";

    if (rec.function_call && typeof rec.function_call === "object" && role === "assistant") {
      return true;
    }
    if (role === "function") {
      return true;
    }

    if (!processPart(rec)) return true;

    if (role === "assistant" && Array.isArray(rec.tool_calls)) {
      for (const tc of rec.tool_calls) {
        if (!tc || typeof tc !== "object") return true;
        const id =
          typeof (tc as Record<string, unknown>).id === "string"
            ? ((tc as Record<string, unknown>).id as string).trim()
            : "";
        if (!id) return true;
        callCounts.set(id, (callCounts.get(id) ?? 0) + 1);
      }
    } else if (role === "tool") {
      const toolCallId =
        (typeof rec.tool_call_id === "string" && rec.tool_call_id.trim()
          ? rec.tool_call_id.trim()
          : "") ||
        (typeof rec.call_id === "string" && rec.call_id.trim() ? rec.call_id.trim() : "") ||
        (typeof rec.id === "string" && rec.id.trim() ? rec.id.trim() : "");
      if (!toolCallId) return true;
      outputCounts.set(toolCallId, (outputCounts.get(toolCallId) ?? 0) + 1);
    }

    if (Array.isArray(rec.content)) {
      for (const part of rec.content) {
        if (!processPart(part)) return true;
      }
    }
    if (Array.isArray(rec.output)) {
      for (const part of rec.output) {
        if (!processPart(part)) return true;
      }
    }
  }

  if (callCounts.size === 0 && outputCounts.size === 0) return false;
  if (callCounts.size !== outputCounts.size) return true;
  for (const [id, count] of callCounts) {
    if (count !== 1) return true;
    if (outputCounts.get(id) !== 1) return true;
  }
  for (const [id, count] of outputCounts) {
    if (count !== 1) return true;
    if (!callCounts.has(id)) return true;
  }

  return false;
}

function isUnsafeItemOrPart(rec: Record<string, unknown>): boolean {
  const type = typeof rec.type === "string" ? rec.type : "";
  if (type === "item_reference" || type === "redacted_thinking") return true;
  if (type === "encrypted_content") return true;
  if (typeof rec.previous_response_id === "string" && rec.previous_response_id.trim() !== "")
    return true;
  if (typeof rec.previousResponseId === "string" && rec.previousResponseId.trim() !== "")
    return true;
  if (typeof rec.continuation_token === "string" && rec.continuation_token.trim() !== "")
    return true;
  if (typeof rec.continuationToken === "string" && rec.continuationToken.trim() !== "") return true;
  if (typeof rec.encrypted_content === "string" && rec.encrypted_content.trim() !== "") return true;
  if (typeof rec.encryptedContent === "string" && rec.encryptedContent.trim() !== "") return true;
  if (typeof rec.encrypted_reasoning === "string" && rec.encrypted_reasoning.trim() !== "")
    return true;
  if (typeof rec.encryptedReasoning === "string" && rec.encryptedReasoning.trim() !== "")
    return true;
  if (typeof rec.thought_signature === "string" && rec.thought_signature.trim() !== "") return true;
  if (typeof rec.thoughtSignature === "string" && rec.thoughtSignature.trim() !== "") return true;
  if (typeof rec.signature === "string" && rec.signature.trim() !== "") return true;
  if (
    rec.provider_metadata &&
    typeof rec.provider_metadata === "object" &&
    Object.keys(rec.provider_metadata as object).length > 0
  ) {
    return true;
  }
  if (
    rec.providerMetadata &&
    typeof rec.providerMetadata === "object" &&
    Object.keys(rec.providerMetadata as object).length > 0
  ) {
    return true;
  }
  if (
    rec.provider_data &&
    typeof rec.provider_data === "object" &&
    Object.keys(rec.provider_data as object).length > 0
  ) {
    return true;
  }
  if (
    rec.providerData &&
    typeof rec.providerData === "object" &&
    Object.keys(rec.providerData as object).length > 0
  ) {
    return true;
  }
  return false;
}

export function hasProviderSpecificUnsafeContinuationState(
  body: Record<string, unknown>,
  _activePin?: NativeTurnPin
): boolean {
  if (typeof body.previous_response_id === "string" && body.previous_response_id.trim() !== "") {
    return true;
  }
  if (typeof body.previousResponseId === "string" && body.previousResponseId.trim() !== "") {
    return true;
  }
  if (typeof body.continuation_token === "string" && body.continuation_token.trim() !== "") {
    return true;
  }
  if (typeof body.continuationToken === "string" && body.continuationToken.trim() !== "") {
    return true;
  }
  if (typeof body.response_id === "string" && body.response_id.trim() !== "") {
    return true;
  }
  if (typeof body.responseId === "string" && body.responseId.trim() !== "") {
    return true;
  }
  if (typeof body.parent_response_id === "string" && body.parent_response_id.trim() !== "") {
    return true;
  }
  if (typeof body.parentResponseId === "string" && body.parentResponseId.trim() !== "") {
    return true;
  }
  if (typeof body.thought_signature === "string" && body.thought_signature.trim() !== "") {
    return true;
  }
  if (typeof body.thoughtSignature === "string" && body.thoughtSignature.trim() !== "") {
    return true;
  }
  if (typeof body.signature === "string" && body.signature.trim() !== "") {
    return true;
  }
  if (typeof body.conversation_id === "string" && body.conversation_id.trim() !== "") {
    return true;
  }
  if (typeof body.conversationId === "string" && body.conversationId.trim() !== "") {
    return true;
  }
  if (
    body.conversation &&
    typeof body.conversation === "object" &&
    Object.keys(body.conversation as object).length > 0
  ) {
    return true;
  }
  if (
    body.provider_metadata &&
    typeof body.provider_metadata === "object" &&
    Object.keys(body.provider_metadata as object).length > 0
  ) {
    return true;
  }
  if (
    body.providerMetadata &&
    typeof body.providerMetadata === "object" &&
    Object.keys(body.providerMetadata as object).length > 0
  ) {
    return true;
  }
  if (
    body.provider_data &&
    typeof body.provider_data === "object" &&
    Object.keys(body.provider_data as object).length > 0
  ) {
    return true;
  }
  if (
    body.providerData &&
    typeof body.providerData === "object" &&
    Object.keys(body.providerData as object).length > 0
  ) {
    return true;
  }

  const input: unknown[] = Array.isArray(body.input)
    ? body.input
    : Array.isArray(body.messages)
      ? body.messages
      : [];

  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    if (isUnsafeItemOrPart(rec)) return true;

    if (Array.isArray(rec.content)) {
      for (const part of rec.content) {
        if (
          part &&
          typeof part === "object" &&
          isUnsafeItemOrPart(part as Record<string, unknown>)
        ) {
          return true;
        }
      }
    }
    if (Array.isArray(rec.output)) {
      for (const outItem of rec.output) {
        if (
          outItem &&
          typeof outItem === "object" &&
          isUnsafeItemOrPart(outItem as Record<string, unknown>)
        ) {
          return true;
        }
      }
    }
    if (Array.isArray(rec.summary)) {
      for (const sumItem of rec.summary) {
        if (
          sumItem &&
          typeof sumItem === "object" &&
          isUnsafeItemOrPart(sumItem as Record<string, unknown>)
        ) {
          return true;
        }
      }
    }
    if (Array.isArray(rec.tool_calls)) {
      for (const tc of rec.tool_calls) {
        if (tc && typeof tc === "object" && isUnsafeItemOrPart(tc as Record<string, unknown>)) {
          return true;
        }
      }
    }
  }

  return false;
}

export interface CanAutoResumeNativeCodexTurnOptions {
  body: Record<string, unknown>;
  comboName: string;
  activePin: NativeTurnPin;
  allTargets: ResolvedComboTarget[];
  resilienceSettings?: ResilienceSettings | null;
  quotaCutoffResetWindowConfig?: ResetWindowConfig;
  isModelAvailable?: IsModelAvailable;
  log?: ComboLogger;
}

export type AutoResumeDecision =
  | {
      eligible: true;
      nextGeneration: number;
      previousPin: NativeTurnPin;
      selectedTarget: ResolvedComboTarget;
    }
  | {
      eligible: false;
      reason: string;
      details?: Record<string, unknown>;
    };

export async function canAutoResumeNativeCodexTurn(
  options: CanAutoResumeNativeCodexTurnOptions
): Promise<AutoResumeDecision> {
  const {
    body,
    comboName,
    activePin,
    allTargets,
    resilienceSettings,
    quotaCutoffResetWindowConfig,
    isModelAvailable,
  } = options;

  const key = nativeCodexTurnKey(body, comboName);
  if (!key) return { eligible: false, reason: "invalid_turn_key" };

  const rec = turns.get(key);
  const currentGen = rec?.activeGeneration ?? 0;
  if (currentGen >= MAX_AUTORESUMES_PER_TURN) {
    return { eligible: false, reason: "max_resumes_exceeded" };
  }

  const inputList = Array.isArray(body.input)
    ? body.input
    : Array.isArray(body.messages)
      ? body.messages
      : null;
  if (!inputList || inputList.length === 0) {
    return { eligible: false, reason: "missing_or_empty_input" };
  }

  if (hasUnresolvedToolCalls(body)) {
    return { eligible: false, reason: "pending_tool_call" };
  }

  if (hasProviderSpecificUnsafeContinuationState(body, activePin)) {
    return { eligible: false, reason: "unsafe_provider_state" };
  }

  const alternateTargets = allTargets.filter(
    (t) => t.modelStr !== activePin.modelStr || t.provider !== activePin.provider
  );
  if (alternateTargets.length === 0) {
    return { eligible: false, reason: "no_alternate_target" };
  }

  let selectedTarget: ResolvedComboTarget | null = null;
  for (const alt of alternateTargets) {
    if (alt.provider && alt.provider !== "unknown") {
      const cb = getCircuitBreaker(alt.provider);
      if (cb.getStatus().state === "OPEN") continue;
    }
    if (
      resilienceSettings?.providerCooldown?.enabled &&
      (isProviderInCooldown(alt.provider, alt.connectionId || undefined, resilienceSettings) ||
        isProviderInCooldown(alt.provider, undefined, resilienceSettings))
    ) {
      continue;
    }
    const unusable = await isPinnedTargetModelScopedUnusable({
      target: alt,
      resilienceSettings,
      quotaCutoffResetWindowConfig,
      comboName,
      body,
      isModelAvailable,
    });
    if (!unusable) {
      selectedTarget = alt;
      break;
    }
  }

  if (!selectedTarget) {
    return { eligible: false, reason: "no_healthy_alternate_target" };
  }

  return {
    eligible: true,
    nextGeneration: currentGen + 1,
    previousPin: activePin,
    selectedTarget,
  };
}
