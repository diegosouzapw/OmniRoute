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
import fs from "node:fs";
import { getSupervisor } from "@/lib/services/registry";
import { generateDefaultSingboxConfig, getConfigPath } from "@/lib/services/installers/singbox";
import { createLogger } from "@/shared/utils/logger.ts";
import {
  buildTproxyApplyCommands,
  buildTproxyRevertCommands,
  validateTproxyConfig,
  type TproxyConfig,
} from "./commands";

const execFileAsync = promisify(execFile);
const log = createLogger("mitm-tproxy-singbox");

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
export async function applyTproxy(
  cfg: TproxyConfig,
  run: CommandRunner = defaultRunner
): Promise<void> {
  const invalid = validateTproxyConfig(cfg);
  if (invalid) throw new Error(invalid);

  await ensureSingboxTproxy(cfg.onPort, cfg.dport);

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
export async function revertTproxy(
  cfg: TproxyConfig,
  run: CommandRunner = defaultRunner
): Promise<void> {
  for (const cmd of buildTproxyRevertCommands(cfg)) {
    try {
      await run(cmd.bin, cmd.args);
    } catch {
      // idempotent: rule/route/rule-entry may not exist — keep going.
    }
  }
}

/**
 * Starts (or confirms) the sing-box supervisor before TPROXY rules are applied.
 * Never throws — `applyTproxy()` always proceeds to install the firewall rules
 * regardless of the outcome (pre-existing behavior, `tests/unit/tproxy-setup.test.ts`
 * exercises `applyTproxy()` with no sing-box supervisor registered at all) — but
 * every failure path now logs at error level instead of being swallowed by a bare
 * `.catch(() => false)`, so an operator has a visible signal that TPROXY rules were
 * installed without a working sing-box listener behind them.
 */
export async function ensureSingboxTproxy(
  tproxyPort: number,
  targetPort: number
): Promise<boolean> {
  const supervisor = getSupervisor("singbox");
  if (!supervisor) {
    log.error(
      "sing-box supervisor is not registered — TPROXY rules will be applied with no proxy " +
        "listening behind them; traffic will NOT actually be intercepted"
    );
    return false;
  }

  const cfgPath = getConfigPath();
  const cfgContent = JSON.stringify(generateDefaultSingboxConfig(tproxyPort, targetPort), null, 2);
  fs.writeFileSync(cfgPath, cfgContent, "utf8");

  if (supervisor.getStatus().state !== "running") {
    try {
      await supervisor.start();
    } catch (err) {
      log.error(
        { err: err instanceof Error ? err.message : String(err) },
        "sing-box failed to start — TPROXY rules will be applied with no proxy listening " +
          "behind them; traffic will NOT actually be intercepted"
      );
      return false;
    }
  }

  const running = supervisor.getStatus().state === "running";
  if (!running) {
    log.error(
      { state: supervisor.getStatus().state },
      "sing-box did not reach the running state after start() — TPROXY rules will be applied " +
        "with no proxy listening behind them; traffic will NOT actually be intercepted"
    );
  }
  return running;
}
