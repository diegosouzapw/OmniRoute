/**
 * opencodeTransientFailure.ts — retriable-upstream predicate for the opencode
 * executor loop.
 *
 * Leaf module: one internal import only (isEmptyUpstreamRejection, same
 * executors layer — no registry, no DB). 5xx short-circuits on status alone;
 * the 400 arm delegates to the existing empty-rejection classifier.
 */

import { isEmptyUpstreamRejection } from "./accountRotation.ts";

export function isRetriableUpstreamFailure(status: number, bodyText?: string): boolean {
  if (status >= 500 && status < 600) return true;
  if (status !== 400) return false;
  if (typeof bodyText !== "string" || bodyText === "") return false;
  return isEmptyUpstreamRejection(status, bodyText);
}
