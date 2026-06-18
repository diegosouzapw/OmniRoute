/**
 * Pure request-list filter for the Traffic Inspector.
 *
 * Extracted from the inline `applyFilter` closure inside the useTrafficStream
 * hook so the filtering rules are unit-testable. Behaviour is identical to the
 * previous inline logic, plus the new `liveOnly` toggle (Gap 5) that keeps only
 * in-flight requests — letting the user watch open connections in real time.
 */
import type { InterceptedRequest, ListFilters } from "@/mitm/inspector/types";

export type TrafficFilters = ListFilters & {
  /** Client-only: restrict the list to the same system-prompt context. */
  sameContextKey?: string;
  /** Client-only: show only in-flight (open) requests (Gap 5). */
  liveOnly?: boolean;
};

export function matchesTrafficFilter(req: InterceptedRequest, f: TrafficFilters): boolean {
  if (f.profile === "llm" && req.detectedKind !== "llm") return false;
  if (f.profile === "custom" && req.source !== "custom-host") return false;
  if (f.host && !req.host.includes(f.host)) return false;
  if (f.agent && req.agent !== f.agent) return false;
  if (f.source && req.source !== f.source) return false;
  if (f.sessionId && req.sessionId !== f.sessionId) return false;
  if (f.sameContextKey && req.contextKey !== f.sameContextKey) return false;
  if (f.liveOnly && req.status !== "in-flight") return false;
  if (f.status) {
    const s = req.status;
    if (typeof s === "number") {
      const cat = `${Math.floor(s / 100)}xx`;
      if (cat !== f.status) return false;
    } else if (f.status === "error" && s !== "error") {
      return false;
    }
  }
  return true;
}
