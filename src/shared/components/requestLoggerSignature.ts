/**
 * Pure helpers extracted from RequestLoggerV2 so the polling + change-detection
 * logic introduced in #3109 (browser-freeze / network-saturation fix) is unit
 * testable without rendering the full dashboard component.
 */

/**
 * Initial tab-visibility for the polling guard. SSR-safe: when `document` is
 * unavailable (server render) we assume visible so the first client poll runs.
 * A component mounted in an already-hidden tab must NOT poll until it becomes
 * visible — hence we read the real `visibilityState` when it exists.
 */
export function resolveInitialVisibility(): boolean {
  return typeof document === "undefined" || document.visibilityState === "visible";
}

/**
 * Whether auto-refresh polling should be scheduled at all. We only poll while
 * recording AND the user is still on the first page (`limit <= pageSize`); once
 * they "load more" / scroll into history, polling pauses so the payload size
 * does not escalate (the original browser-freeze cause).
 */
export function shouldAutoRefresh(recording: boolean, limit: number, pageSize: number): boolean {
  return recording && limit <= pageSize;
}

/**
 * Change-detection signature over the log rows. Captures id + status + duration
 * + tokens_out so in-progress updates (a request finishing, duration/token
 * growth) still trigger a re-render, while an identical snapshot is skipped
 * (#1369 GPU perf). Non-array input collapses to an empty signature.
 */
export function computeLogsSignature(data: unknown): string {
  const arr = Array.isArray(data) ? data : [];
  return arr
    .map((l: any) => l.id + ":" + l.status + ":" + l.duration + ":" + (l.tokens?.out || 0))
    .join("|");
}
