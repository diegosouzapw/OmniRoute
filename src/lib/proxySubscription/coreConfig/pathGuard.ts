/**
 * Path guards for the subscription's proxy-core configuration.
 *
 * Pure and dependency-free: no disk access here. The sync step pre-checks
 * the target directory separately (best-effort) and never creates it; the
 * executable bit of the binary is checked in `apply.ts`, not here.
 *
 * The allow-list of binary names is derived from `CORE_CHECK_ARGS` so adding
 * a new core means adding one table entry, no code change. The validated
 * absolute binary path is passed as-is to `execFile` (never re-resolved).
 */
import path from "node:path";

export type CoreConfigPathReason =
  "empty" | "too_long" | "nul_byte" | "not_absolute" | "dotdot_segment" | "bad_extension";

export interface CoreConfigPathVerdict {
  allowed: boolean;
  reason?: CoreConfigPathReason;
}

const MAX_PATH_LENGTH = 1024;

/**
 * Whether `p` is an acceptable adopted core-config path: non-empty,
 * at most 1024 chars, no NUL byte, absolute, no `..` segment, `.json`
 * extension (case-sensitive). Never throws.
 */
export function isCoreConfigPathAllowed(p: string): CoreConfigPathVerdict {
  try {
    if (typeof p !== "string" || p.length === 0) return { allowed: false, reason: "empty" };
    if (p.length > MAX_PATH_LENGTH) return { allowed: false, reason: "too_long" };
    if (p.includes("\0")) return { allowed: false, reason: "nul_byte" };
    if (!path.isAbsolute(p)) return { allowed: false, reason: "not_absolute" };
    if (p.split("/").includes("..") || p.split(path.sep).includes("..")) {
      return { allowed: false, reason: "dotdot_segment" };
    }
    if (!p.endsWith(".json")) return { allowed: false, reason: "bad_extension" };
    return { allowed: true };
  } catch {
    return { allowed: false, reason: "empty" };
  }
}

export type CoreBinaryGuardReason =
  "empty" | "too_long" | "nul_byte" | "not_absolute" | "dotdot_segment" | "not_allowlisted";

export interface CoreBinaryGuardVerdict {
  allowed: boolean;
  reason?: CoreBinaryGuardReason;
}

/**
 * Native check command per supported core binary, keyed by file name.
 * The checker runs `checkArgs + [candidateFile]` via `execFile` (no shell).
 * Adding a core = one table entry.
 */
export const CORE_CHECK_ARGS: Record<string, readonly string[]> = {
  "sing-box": ["check", "-c"],
};

/** Check arguments for a binary file name, or null when not allow-listed. */
export function checkArgsFor(binaryName: string): readonly string[] | null {
  return CORE_CHECK_ARGS[binaryName] ?? null;
}

const MAX_BINARY_PATH_LENGTH = 1024;

/** Structural check for a core binary path (no disk access). */
export function isCoreBinaryPathAllowed(p: string): CoreBinaryGuardVerdict {
  if (typeof p !== "string" || !p.trim()) return { allowed: false, reason: "empty" };
  if (p.length > MAX_BINARY_PATH_LENGTH) return { allowed: false, reason: "too_long" };
  if (p.includes("\0")) return { allowed: false, reason: "nul_byte" };
  if (!path.isAbsolute(p)) return { allowed: false, reason: "not_absolute" };
  if (p.split("/").includes("..") || p.split(path.sep).includes("..")) {
    return { allowed: false, reason: "dotdot_segment" };
  }
  if (!checkArgsFor(path.basename(p))) return { allowed: false, reason: "not_allowlisted" };
  return { allowed: true };
}
