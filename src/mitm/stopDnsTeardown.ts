import { createLogger } from "@/shared/utils/logger.ts";

const log = createLogger("mitm-manager");

export type StopDnsDeps = {
  removeDNSEntry: (sudoPassword: string) => Promise<void>;
  removeDNSEntries: (hosts: string[], sudoPassword: string) => Promise<void>;
  collectManagedHosts: () => string[];
};

/** DNS teardown step of stopMitm() (#1809) — extracted for file-size ratchet. */
export async function removeStopDnsEntries(
  deps: StopDnsDeps,
  sudoPassword: string
): Promise<void> {
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
