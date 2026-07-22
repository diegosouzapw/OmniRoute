/**
 * Conductor bridge boot — production wiring for `createConductorBridge`.
 *
 * Opt-in: only starts when `CONDUCTOR_HUB_URL` is set. Called from
 * `instrumentation-node.ts` (same non-fatal pattern as the other daemons).
 * No graceful-shutdown registration needed: the cursor is persisted after each
 * event, so an abrupt exit loses nothing — the hub replay converges the mirror.
 */

import { getTaskManager } from "@/lib/a2a/taskManager";
import { getConductorCursor, setConductorCursor } from "@/lib/db/conductorBridge";

import { createConductorBridge, type ConductorBridge, type ConductorBridgeOptions } from "./bridge";

let bridge: ConductorBridge | null = null;

/** Starts the bridge once (idempotent). Returns null when CONDUCTOR_HUB_URL is unset. */
export function initConductorBridge(overrides: Partial<ConductorBridgeOptions> = {}): ConductorBridge | null {
  const hubUrl = process.env.CONDUCTOR_HUB_URL?.trim();
  if (!hubUrl) return null;
  if (bridge) return bridge;
  bridge = createConductorBridge({
    hubUrl,
    token: process.env.CONDUCTOR_HUB_TOKEN?.trim() ?? "",
    tm: getTaskManager(),
    cursor: { get: getConductorCursor, set: setConductorCursor },
    ...overrides,
  });
  bridge.start();
  return bridge;
}

export function stopConductorBridge(): void {
  bridge?.stop();
  bridge = null;
}
