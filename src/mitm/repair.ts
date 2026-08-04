import path from "path";
import fs from "fs";
import { resolveMitmDataDir } from "./dataDir.ts";
import { removeDNSEntry, removeDNSEntries } from "./dns/dnsConfig.ts";
import { uninstallCert } from "./cert/install.ts";
import { ALL_TARGETS } from "./targets/index.ts";
import { listCustomHosts } from "@/lib/db/inspectorCustomHosts.ts";
import { getGheCopilotHosts } from "@/lib/db/providers.ts";
import { createLogger } from "@/shared/utils/logger.ts";

const log = createLogger("mitm-repair");

/**
 * Enumerate every hostname OmniRoute may have written to /etc/hosts during
 * startMitm(): the full agent-target registry plus all custom hosts. Removal
 * via removeDNSEntries() is idempotent (absent entries are skipped), so this
 * set is intentionally over-inclusive — a host that was never spoofed costs
 * nothing to "remove", but a host we forget to list leaks machine-wide.
 * (Gap 8 — clean-stop DNS leak.)
 */
export function collectManagedHosts(): string[] {
  const hosts = new Set<string>();
  for (const target of ALL_TARGETS) {
    for (const h of target.hosts) hosts.add(h);
    if (target.id === "ghe-copilot") {
      for (const h of getGheCopilotHosts()) hosts.add(h);
    }
  }
  try {
    for (const ch of listCustomHosts()) hosts.add(ch.host);
  } catch (err) {
    log.error({ err }, "collectManagedHosts: failed to read custom hosts (continuing)");
  }
  return [...hosts];
}

export interface RepairPlan {
  dnsHostsToRemove: string[];
  removeCert: boolean;
  revertSystemProxy: boolean;
}

/**
 * Pure description of what a repair must undo. Separated from repairMitm() so
 * the enumeration is unit-testable without touching the OS or requiring sudo.
 * (Gap 7.)
 */
export function buildRepairPlan(): RepairPlan {
  return {
    dnsHostsToRemove: collectManagedHosts(),
    removeCert: true,
    revertSystemProxy: true,
  };
}

/**
 * Best-effort revert of an applied system proxy. The applied state lives
 * in-memory (captureState), so this only succeeds within the same process that
 * applied it; after a crash the previousState is gone and this is a no-op. DNS
 * + cert teardown are always reversible because they read on-disk state.
 */
async function revertSystemProxyIfApplied(): Promise<boolean> {
  try {
    const { getSystemProxyState, clearSystemProxy } = await import("@/lib/inspector/captureState");
    const state = getSystemProxyState();
    if (!state.applied || !state.previousState) return false;
    const { revert } = await import("./inspector/systemProxyConfig.ts");
    await revert(state.previousState);
    clearSystemProxy();
    return true;
  } catch (err) {
    log.error({ err }, "revertSystemProxyIfApplied failed (continuing)");
    return false;
  }
}

/**
 * Run the DNS/cert/system-proxy teardown steps of a repair, WITHOUT touching
 * any of `manager.ts`'s in-memory session state (cached password, orphaned
 * flag, PID file) — that bookkeeping stays in `manager.ts::repairMitm()`,
 * which calls this as its first step. Split out purely to keep
 * `src/mitm/manager.ts` under the repo's file-size cap; behavior is
 * unchanged from the original inline implementation. (Gap 7.)
 */
export async function performRepairSteps(sudoPassword: string): Promise<string[]> {
  const plan = buildRepairPlan();
  const repaired: string[] = [];

  // 1. DNS — remove every host we may have spoofed (idempotent, reads /etc/hosts).
  try {
    await removeDNSEntry(sudoPassword);
    if (plan.dnsHostsToRemove.length > 0) {
      await removeDNSEntries(plan.dnsHostsToRemove, sudoPassword);
    }
    repaired.push("dns");
  } catch (err) {
    log.error({ err }, "repairMitm: DNS cleanup failed (continuing)");
  }

  // 2. Certificate — uninstall the MITM root CA from the trust store.
  if (plan.removeCert) {
    try {
      const certPath = path.join(resolveMitmDataDir(), "mitm", "server.crt");
      if (fs.existsSync(certPath)) {
        await uninstallCert(sudoPassword, certPath);
        repaired.push("cert");
      }
    } catch (err) {
      log.error({ err }, "repairMitm: cert removal failed (continuing)");
    }
  }

  // 3. System proxy — best-effort revert if applied in this process.
  if (plan.revertSystemProxy) {
    if (await revertSystemProxyIfApplied()) repaired.push("system-proxy");
  }

  return repaired;
}
