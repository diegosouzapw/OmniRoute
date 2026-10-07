import { createLogger } from "@/shared/utils/logger.ts";

const log = createLogger("mitm-manager");

export type StopDnsDeps = {
  removeDNSEntry: (sudoPassword: string) => Promise<void>;
  removeDNSEntries: (hosts: string[], sudoPassword: string) => Promise<void>;
  collectManagedHosts: () => string[];
};

/** DNS teardown step of stopMitm() (#1809) — extracted for file-size ratchet. */
export async function removeStopDnsEntries(deps: StopDnsDeps, sudoPassword: string): Promise<void> {
  log.info("Removing DNS entries...");
  await deps.removeDNSEntry(sudoPassword);
  try {
    const managed = deps.collectManagedHosts();
    if (managed.length > 0) {
      await deps.removeDNSEntries(managed, sudoPassword);
    }
  } catch (err) {
    log.error({ err }, "Failed to remove managed DNS entries during stop (continuing)");
  }
}

/**
 * Revert the `/etc/hosts` entries a FAILED start left behind.
 *
 * `startMitmInternal()` provisions DNS entries (step 3) *before* it spawns and
 * verifies the proxy (step 4). When the spawn fails — the port is already taken
 * by another service, `EACCES`, a missing `ROUTER_API_KEY` — the throw skipped
 * every teardown, so the entries survived and kept pointing the AgentBridge
 * target hostnames at `127.0.0.1:<port>`, where the service that *does* own the
 * port answers with a TLS alert. Those hostnames then fail machine-wide, for
 * every client, and `getMitmStatus()` reports the unrecoverable
 * `dnsConfigured && !running` pair.
 *
 * `stopMitm()` already removes exactly this set, so the failure path reuses
 * `removeStopDnsEntries()` rather than inventing a second teardown.
 *
 * Best-effort by design: a teardown failure is logged, never thrown, so it
 * cannot mask the startup error the caller is about to surface.
 */
export async function removeDnsEntriesAfterFailedStart(
  deps: StopDnsDeps,
  sudoPassword: string
): Promise<void> {
  try {
    await removeStopDnsEntries(deps, sudoPassword);
  } catch (err) {
    log.error({ err }, "Failed to revert DNS entries after a failed start (continuing)");
  }
}
