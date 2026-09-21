import { updateProviderConnection } from "@/lib/db/providers";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";

type Patch = {
  testStatus: string;
  isActive?: boolean;
  lastError?: string | null;
  errorCode?: string | null;
  lastErrorType?: string | null;
  lastErrorAt?: string | null;
};
const TERMINAL = new Set(["banned", "expired", "deactivated", "credits_exhausted"]);

export async function writeTerminalStatus(
  connectionId: string,
  patch: Patch,
  origin: "probe" | "production"
): Promise<void> {
  const isTerminal = TERMINAL.has(patch.testStatus.toLowerCase());
  const persistedLastError =
    patch.lastError == null
      ? null
      : sanitizeErrorMessage(patch.lastError) || "Provider request failed";
  // Double gate: AsyncLocalStorage probe + explicit origin "probe" — fail-safe ON
  const probeIsolated = await shouldIsolateProbeFailures();
  if ((origin === "probe" || probeIsolated) && isTerminal) {
    // record-only: never remove from pool
    await updateProviderConnection(connectionId, {
      lastError: persistedLastError,
      lastErrorAt: new Date().toISOString(),
      lastErrorType: patch.lastErrorType ?? null,
      errorCode: patch.errorCode ?? null,
    });
    return;
  }
  await updateProviderConnection(connectionId, {
    isActive: patch.isActive ?? (isTerminal ? false : undefined),
    testStatus: patch.testStatus,
    lastError: persistedLastError,
    lastErrorAt: new Date().toISOString(),
    lastErrorType: patch.lastErrorType ?? null,
    errorCode: patch.errorCode ?? null,
  });
}
