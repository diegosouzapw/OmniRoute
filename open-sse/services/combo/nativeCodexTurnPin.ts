import { createHash } from "node:crypto";

import type { ResolvedComboTarget } from "./types.ts";

type NativeTurnPin = {
  comboName: string;
  modelStr: string;
  provider: string;
  connectionId: string;
  createdAt: number;
  expiresAt: number;
};

const TTL_MS = 45 * 60_000;
const MAX_PINS = 1_000;
const pins = new Map<string, NativeTurnPin>();

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
  for (const [key, pin] of pins) if (pin.expiresAt <= now) pins.delete(key);
  while (pins.size > MAX_PINS) {
    const oldest = pins.keys().next().value as string | undefined;
    if (!oldest) break;
    pins.delete(oldest);
  }
}

export function getNativeCodexTurnPin(
  body: Record<string, unknown>,
  comboName: string
): NativeTurnPin | null {
  prune();
  const key = nativeCodexTurnKey(body, comboName);
  return key ? (pins.get(key) ?? null) : null;
}

export function pinNativeCodexTurn(args: {
  body: Record<string, unknown>;
  comboName: string;
  target: ResolvedComboTarget;
  connectionId: string;
}): void {
  const key = nativeCodexTurnKey(args.body, args.comboName);
  if (!key || !args.connectionId) return;
  const existing = pins.get(key);
  if (
    existing &&
    (existing.modelStr !== args.target.modelStr ||
      existing.provider !== args.target.provider ||
      existing.connectionId !== args.connectionId)
  ) {
    throw new Error("Native Codex turn target changed after output was emitted");
  }
  const now = Date.now();
  pins.set(key, {
    comboName: args.comboName,
    modelStr: args.target.modelStr,
    provider: args.target.provider,
    connectionId: args.connectionId,
    createdAt: existing?.createdAt ?? now,
    expiresAt: now + TTL_MS,
  });
  prune(now);
}

export function applyNativeCodexTurnPin(
  targets: ResolvedComboTarget[],
  pin: NativeTurnPin
): ResolvedComboTarget[] {
  const target = targets.find(
    (candidate) => candidate.modelStr === pin.modelStr && candidate.provider === pin.provider
  );
  if (!target) return [];
  return [
    {
      ...target,
      connectionId: pin.connectionId,
      allowedConnectionIds: [pin.connectionId],
    },
  ];
}

export function revokeNativeCodexTurnPinsForConnection(connectionId: string): number {
  let revoked = 0;
  for (const [key, pin] of pins) {
    if (pin.connectionId !== connectionId) continue;
    pins.delete(key);
    revoked += 1;
  }
  return revoked;
}

export function clearNativeCodexTurnPinsForTests(): void {
  pins.clear();
}
