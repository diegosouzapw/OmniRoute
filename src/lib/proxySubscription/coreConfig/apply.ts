/**
 * Verified apply step for a rendered proxy-core configuration.
 *
 * The rendered candidate is checked with the native core binary
 * (`<binary> check -c <candidate>`) before it may replace the adopted file.
 * Anything else writes beside the adopted file and reports a reason — the
 * adopted file is never replaced without a passing check.
 *
 * This module owns process execution and adopted-file replacement. It never
 * throws: every failure returns an explicit outcome and logs a server-side
 * warning carrying the subscription id (no secret, no file content).
 */

import { execFile } from "node:child_process";
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { readPrivateConfigFile, writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import { checkArgsFor } from "./pathGuard";

export type ApplyBesideReason =
  "no_binary" | "binary_missing" | "check_failed" | "write_failed" | "unchanged_skip";

export interface ApplyOutcome {
  status: "replaced" | "beside";
  beside?: ApplyBesideReason;
}

/** Native check runner. The validated path travels as a single argument. */
export type RunCheck = (
  binaryPath: string,
  args: string[],
  opts: { timeoutMs: number; maxBuffer: number }
) => Promise<{ stdout: string; stderr: string }>;

export interface ApplyRenderedOptions {
  adoptedPath: string;
  binaryPath: string;
  renderedText: string;
  subscriptionId: string;
  runCheck?: RunCheck;
  timeoutMs?: number;
  /** Filesystem hooks, injectable so tests can fault renames without chmod. */
  fsHooks?: {
    renameSync?: (from: string, to: string) => void;
    unlinkSync?: (p: string) => void;
    chmodSync?: (p: string, mode: number) => void;
  };
}

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_BUFFER = 65_536;
const STDERR_HEAD_LENGTH = 500;

const execFileAsync = promisify(execFile);

/** Default check: `execFile` with an argument array, never a shell string. */
async function defaultRunCheck(
  binaryPath: string,
  args: string[],
  opts: { timeoutMs: number; maxBuffer: number }
): Promise<{ stdout: string; stderr: string }> {
  const result = await execFileAsync(binaryPath, args, {
    timeout: opts.timeoutMs,
    maxBuffer: opts.maxBuffer,
    shell: false,
  });
  return { stdout: result.stdout, stderr: result.stderr };
}

function warn(subscriptionId: string, message: string): void {
  console.warn(`[ProxySubscription] core apply ${subscriptionId}: ${message}`);
}

function stderrHead(stderr: unknown): string {
  return typeof stderr === "string" ? stderr.slice(0, STDERR_HEAD_LENGTH) : "";
}

/**
 * Apply rendered text to the adopted path. Returns `replaced` only after a
 * passing native check; every other outcome leaves the adopted file in place
 * (or, when the adopted file is absent and every rename succeeds, creates
 * it directly from a checked candidate).
 */
export async function applyRendered(opts: ApplyRenderedOptions): Promise<ApplyOutcome> {
  const deps = resolveDeps(opts);
  // (a) no binary configured: nothing to verify against, so write beside only.
  if (!opts.binaryPath || !opts.binaryPath.trim()) {
    return { status: "beside", beside: "no_binary" };
  }
  // (b) already current: skip before any write or fork, so mtime is intact.
  const current = readAdopted(opts);
  if (current.failed) return { status: "beside", beside: "write_failed" };
  if (current.text === opts.renderedText) {
    return { status: "beside", beside: "unchanged_skip" };
  }
  // (c) candidate in the adopted directory: same filesystem, so the final
  // rename is atomic. The random suffix keeps concurrent subscriptions on a
  // shared path from colliding (per-id sync dedup does not cover cross-id).
  const candidate = `${opts.adoptedPath}.check.${process.pid}.${randomBytes(8).toString("hex")}`;
  if (!writeCandidate(opts, candidate)) {
    return { status: "beside", beside: "write_failed" };
  }
  try {
    const checked = await runNativeCheck(opts, opts.binaryPath, candidate, deps);
    if (!checked.ok) return (checked as { ok: false; outcome: ApplyOutcome }).outcome;
    return swapCandidate(opts, candidate, current, deps);
  } finally {
    try {
      deps.unlinkSync(candidate);
    } catch {
      // The candidate is already gone on the success path.
    }
  }
}

interface ResolvedDeps extends CheckDeps, SwapDeps {}

function resolveDeps(opts: ApplyRenderedOptions): ResolvedDeps {
  return {
    timeoutMs: opts.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    runCheck: opts.runCheck ?? defaultRunCheck,
    renameSync: opts.fsHooks?.renameSync ?? fs.renameSync,
    unlinkSync: opts.fsHooks?.unlinkSync ?? fs.unlinkSync,
    chmodSync: opts.fsHooks?.chmodSync ?? fs.chmodSync,
  };
}

/** Write the candidate file; false means the apply already warned. */
function writeCandidate(opts: ApplyRenderedOptions, candidate: string): boolean {
  try {
    writePrivateConfigFile(candidate, opts.renderedText);
    return true;
  } catch (error) {
    warn(opts.subscriptionId, `cannot write candidate (${(error as Error).message})`);
    return false;
  }
}

interface AdoptedState {
  text: string | null;
  mode: number | null;
  failed: boolean;
}

/** Read the adopted file and its mode. A symlink or IO error fails the apply. */
function readAdopted(opts: ApplyRenderedOptions): AdoptedState {
  try {
    const text = readPrivateConfigFile(opts.adoptedPath);
    let mode: number | null = null;
    try {
      mode = fs.statSync(opts.adoptedPath).mode & 0o777;
    } catch {
      mode = null;
    }
    return { text, mode, failed: false };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { text: null, mode: null, failed: false };
    }
    warn(opts.subscriptionId, `cannot read adopted file (${(error as Error).message})`);
    return { text: null, mode: null, failed: true };
  }
}

interface CheckDeps {
  timeoutMs: number;
  runCheck: RunCheck;
}

/**
 * Run the native check on the candidate alone, never on the adopted file.
 * The absolute path travels as-is (no re-resolution); the X_OK probe is
 * a fail-fast usability check, not an integrity guarantee.
 */
async function runNativeCheck(
  opts: ApplyRenderedOptions,
  binaryPath: string,
  candidate: string,
  deps: CheckDeps
): Promise<{ ok: true } | { ok: false; outcome: ApplyOutcome }> {
  let executable = false;
  try {
    fs.accessSync(binaryPath, fs.constants.X_OK);
    executable = true;
  } catch {
    executable = false;
  }
  const checkArgs = checkArgsFor(path.basename(binaryPath));
  if (!executable || !checkArgs) {
    return { ok: false, outcome: { status: "beside", beside: "binary_missing" } };
  }
  try {
    await deps.runCheck(binaryPath, [...checkArgs, candidate], {
      timeoutMs: deps.timeoutMs,
      maxBuffer: DEFAULT_MAX_BUFFER,
    });
  } catch (error) {
    // Server log only: the UI shows the reason enum, never raw output.
    warn(
      opts.subscriptionId,
      `native check failed (${stderrHead((error as { stderr?: unknown }).stderr) || (error as Error).message})`
    );
    return { ok: false, outcome: { status: "beside", beside: "check_failed" } };
  }
  return { ok: true };
}

interface SwapDeps {
  renameSync: (from: string, to: string) => void;
  unlinkSync: (p: string) => void;
  chmodSync: (p: string, mode: number) => void;
}

/**
 * Swap a checked candidate into place: align its mode with the adopted file
 * (chmod the candidate, never the target), keep one backup, then rename.
 * Sync rename is intentional here (same-filesystem metadata move).
 */
function swapCandidate(
  opts: ApplyRenderedOptions,
  candidate: string,
  current: AdoptedState,
  deps: SwapDeps
): ApplyOutcome {
  const previous = `${opts.adoptedPath}.prev`;
  try {
    if (current.text !== null && current.mode !== null) {
      try {
        deps.chmodSync(candidate, current.mode);
      } catch (error) {
        warn(opts.subscriptionId, `cannot align candidate mode (${(error as Error).message})`);
        return { status: "beside", beside: "write_failed" };
      }
    }
    if (current.text !== null) {
      deps.renameSync(opts.adoptedPath, previous);
    }
    deps.renameSync(candidate, opts.adoptedPath);
  } catch (error) {
    restoreBackup(opts, current.text !== null, previous, deps.renameSync);
    warn(opts.subscriptionId, `replace failed (${(error as Error).message})`);
    return { status: "beside", beside: "write_failed" };
  }
  // The beside copy from earlier runs is stale once replaced.
  removeSideFile(deps, `${opts.adoptedPath}.generated`, opts.subscriptionId);
  return { status: "replaced" };
}

/**
 * Best-effort removal of the beside copy a deleted subscription owned. The
 * adopted file itself is the operator's live core configuration and is never
 * removed here. The caller passes the already-read adopted path (the row is
 * gone by the time this runs). Missing or locked files must not fail the
 * delete. Never throws.
 */
export function removeSubscriptionSideFiles(
  deps: { unlinkSync: (p: string) => void },
  adoptedPath: string | null | undefined,
  subscriptionId: string
): void {
  if (typeof adoptedPath !== "string" || !adoptedPath.trim()) return;
  removeSideFile(deps, `${adoptedPath.trim()}.generated`, subscriptionId);
}

/**
 * Best-effort removal of one side file: missing or locked must never fail
 * the caller (the row is gone or the replace already succeeded — the file
 * is the operator's). Never throws.
 */
export function removeSideFile(
  deps: { unlinkSync: (p: string) => void },
  filePath: string,
  subscriptionId: string
): void {
  try {
    deps.unlinkSync(filePath);
  } catch {
    warn(subscriptionId, "cannot remove stale beside copy");
  }
}

/** Best-effort restore of the backup; a double fault is logged, never thrown. */
function restoreBackup(
  opts: ApplyRenderedOptions,
  hadAdopted: boolean,
  previous: string,
  renameSync: (from: string, to: string) => void
): void {
  if (!hadAdopted) return;
  try {
    renameSync(previous, opts.adoptedPath);
  } catch (restoreError) {
    warn(
      opts.subscriptionId,
      `replace failed and restore failed (${(restoreError as Error).message})`
    );
  }
}
