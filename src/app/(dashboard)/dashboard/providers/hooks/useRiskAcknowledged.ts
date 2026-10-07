"use client";

import { useCallback, useSyncExternalStore } from "react";

export const RISK_ACKNOWLEDGED_STORAGE_KEY = "omniroute-risk-acknowledged";

export type RiskAcknowledgedMap = Record<string, true>;

function getLocalStorage(): Storage | null {
  try {
    if (typeof globalThis.localStorage === "undefined") return null;
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

export function readRiskAcknowledgedMap(): RiskAcknowledgedMap {
  const storage = getLocalStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(RISK_ACKNOWLEDGED_STORAGE_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const acknowledged: RiskAcknowledgedMap = {};
    for (const [providerId, value] of Object.entries(parsed)) {
      if (value === true) {
        acknowledged[providerId] = true;
      }
    }
    return acknowledged;
  } catch {
    return {};
  }
}

export function writeRiskAcknowledgedMap(map: RiskAcknowledgedMap): void {
  const storage = getLocalStorage();
  if (!storage) return;

  try {
    storage.setItem(RISK_ACKNOWLEDGED_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage may be unavailable in private mode or locked-down embedded browsers.
  }
}

export function isRiskAcknowledged(providerId: string): boolean {
  return readRiskAcknowledgedMap()[providerId] === true;
}

// localStorage is a mutable external store, so the hook below subscribes to it
// through useSyncExternalStore instead of mirroring it into component state
// with an effect (which required a synchronous setState on providerId change).
const riskAcknowledgedListeners = new Set<() => void>();

function subscribeToRiskAcknowledged(listener: () => void): () => void {
  riskAcknowledgedListeners.add(listener);
  return () => {
    riskAcknowledgedListeners.delete(listener);
  };
}

function emitRiskAcknowledgedChange(): void {
  for (const listener of riskAcknowledgedListeners) listener();
}

export function acknowledgeProviderRisk(providerId: string): void {
  const map = readRiskAcknowledgedMap();
  map[providerId] = true;
  writeRiskAcknowledgedMap(map);
  emitRiskAcknowledgedChange();
}

export function useRiskAcknowledged(providerId: string) {
  const acknowledged = useSyncExternalStore(
    subscribeToRiskAcknowledged,
    () => isRiskAcknowledged(providerId),
    () => false
  );

  const acknowledge = useCallback(() => {
    acknowledgeProviderRisk(providerId);
  }, [providerId]);

  return { acknowledged, acknowledge };
}
