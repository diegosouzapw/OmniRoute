/**
 * Fase 3 / Epic A — TPROXY setup layer: transactional apply/revert.
 *
 * Wraps the pure command builder (commands.ts) with an execFile runner and the
 * crash-safe invariant: a partial apply never leaves firewall/routing state
 * behind. The builder's output was validated against a real kernel on the VPS
 * (apply/revert accepted, exact-inverse, zero impact on non-targeted traffic —
 * PR #4139). The runner is injectable so the orchestration is unit-testable
 * without root; the default runner uses `execFile` with an args array (Hard
 * Rule #13 — never a shell string).
 *
 * NOT in this layer (gated on a live intercept, needs CAP_NET_ADMIN + traffic):
 * the IP_TRANSPARENT listener (`listener.cjs`), the capture-mode route, and the
 * UI tab. `repairMitm()` should also call `revertTproxy()` once a config is
 * persisted, so a crash flushes the mangle rules too.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  buildTproxyApplyCommands,
  buildTproxyRevertCommands,
  validateTproxyConfig,
  type TproxyConfig,
} from "./commands";

const execFileAsync = promisify(execFile);

/** Runs a single command. Injected in tests; defaults to execFile (no shell). */
export type CommandRunner = (bin: string, args: string[]) => Promise<void>;

const defaultRunner: CommandRunner = async (bin, args) => {
  await execFileAsync(bin, args);
};

/**
 * Enable TPROXY interception. Runs the apply commands in order; if any step
 * fails, runs a best-effort full revert (so a half-applied rule set never
 * lingers) and rethrows the original error.
 */
export async function applyTproxy(cfg: TproxyConfig, run: CommandRunner = defaultRunner): Promise<void> {
  const invalid = validateTproxyConfig(cfg);
  if (invalid) throw new Error(invalid);

  try {
    for (const cmd of buildTproxyApplyCommands(cfg)) {
      await run(cmd.bin, cmd.args);
    }
  } catch (err) {
    await revertTproxy(cfg, run); // best-effort cleanup of whatever was applied
    throw err instanceof Error ? err : new Error(String(err));
  }
}

/**
 * Disable TPROXY interception. Best-effort and idempotent: each revert command
 * may fail if its rule isn't present (e.g. only a partial apply happened, or a
 * prior crash) — those failures are swallowed so a clean teardown always runs
 * to completion. Safe for `repairMitm()` to call unconditionally.
 */
export async function revertTproxy(cfg: TproxyConfig, run: CommandRunner = defaultRunner): Promise<void> {
  for (const cmd of buildTproxyRevertCommands(cfg)) {
    try {
      await run(cmd.bin, cmd.args);
    } catch {
      // idempotent: rule/route/rule-entry may not exist — keep going.
    }
  }
}
