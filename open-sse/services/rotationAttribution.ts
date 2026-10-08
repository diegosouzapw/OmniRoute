/**
 * Rotation attribution snapshots — service boundary for the per-account
 * rotation state recorded by rotation executors.
 *
 * Lives in services (not executors/) so loopback-gated read routes can consume
 * snapshots without importing executor implementations (boundary rule: App
 * routes must delegate through handlers or services). The store itself is a
 * synchronous in-memory map — no I/O, reads without side effects.
 */
import {
  type RotationAccountSnapshot,
  readRotationSnapshot as readExecutorSnapshot,
} from "../executors/accountRotation.ts";

export type { RotationAccountSnapshot };

/** Read the last recorded rotation state (no side effects — never clears). */
export function readRotationSnapshot(connectionKey: string): RotationAccountSnapshot[] | null {
  return readExecutorSnapshot(connectionKey);
}
