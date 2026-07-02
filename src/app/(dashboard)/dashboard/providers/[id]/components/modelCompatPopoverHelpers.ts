import { useCallback, useEffect, useRef } from "react";
import type { ProviderModelCapabilities } from "@/shared/types/modelConfig";
import type { HeaderDraftRow } from "../providerPageHelpers";

export type BooleanCapabilityKey =
  | "supportsVision"
  | "supportsTools"
  | "supportsReasoning"
  | "supportsXHighEffort"
  | "supportsMaxEffort";

export function recordToHeaderRows(
  rec: Record<string, string>,
  genId: () => string
): HeaderDraftRow[] {
  const entries = Object.entries(rec).filter(([k]) => k.trim());
  if (entries.length === 0) return [{ id: genId(), name: "", value: "" }];
  return entries.map(([name, value]) => ({ id: genId(), name, value }));
}

export function readCapabilityBoolean(
  capabilities: ProviderModelCapabilities | undefined,
  key: BooleanCapabilityKey
): boolean | undefined {
  if (!capabilities) return undefined;
  const record = capabilities as Record<string, unknown>;
  const value = record[key];
  return typeof value === "boolean" ? value : undefined;
}

export function readConfiguredCapabilityBoolean(
  capabilities: ProviderModelCapabilities | undefined,
  key: BooleanCapabilityKey
): boolean | null | undefined {
  if (!capabilities) return undefined;
  const record = capabilities as Record<string, unknown>;
  if (Object.prototype.hasOwnProperty.call(record, key)) {
    const value = record[key];
    return typeof value === "boolean" || value === null ? value : undefined;
  }
  return undefined;
}

export function readCapabilityNumber(
  capabilities: ProviderModelCapabilities | undefined,
  keys: readonly (keyof ProviderModelCapabilities)[],
  options?: { allowZero?: boolean }
): number | undefined {
  if (!capabilities) return undefined;
  const record = capabilities as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (
      typeof value === "number" &&
      Number.isFinite(value) &&
      (value > 0 || (options?.allowZero === true && value === 0))
    ) {
      return value;
    }
  }
  return undefined;
}

export function stableHeaderRecordSignature(record: Record<string, string>): string {
  return JSON.stringify(
    Object.entries(record).sort(([left], [right]) => left.localeCompare(right))
  );
}

export function useResetDraftCommitGuard() {
  const resetDraftCommitGuardRef = useRef(false);
  const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const beginResetDraftGuard = useCallback(() => {
    resetDraftCommitGuardRef.current = true;
    if (releaseTimerRef.current) {
      clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }
  }, []);
  const releaseResetDraftGuardSoon = useCallback(() => {
    if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = setTimeout(() => {
      resetDraftCommitGuardRef.current = false;
      releaseTimerRef.current = null;
    }, 0);
  }, []);
  useEffect(
    () => () => {
      if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current);
    },
    []
  );
  return { resetDraftCommitGuardRef, beginResetDraftGuard, releaseResetDraftGuardSoon };
}
