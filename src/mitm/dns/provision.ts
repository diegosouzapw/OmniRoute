/**
 * AgentBridge DNS provisioning — best-effort, extracted from manager.ts so each step
 * is guarded and unit-testable without spawning the MITM server (#6127 / #6198).
 */

import { addDNSEntry, addDNSEntries } from "./dnsConfig.ts";
import { ALL_TARGETS } from "../targets/index.ts";
import { getAllAgentBridgeStates } from "@/lib/db/agentBridgeState.ts";
import { listCustomHosts } from "@/lib/db/inspectorCustomHosts.ts";
import { createLogger } from "@/shared/utils/logger.ts";

const defaultLog = createLogger("mitm-dns-provision");

/** Minimal logger shape used by {@link provisionDnsEntries} (injectable for tests). */
interface DnsProvisionLogger {
  error: (payload: unknown, msg: string) => void;
  info: (payload: unknown, msg?: string) => void;
}

/** Injectable dependencies for {@link provisionDnsEntries} (all default to the real ones). */
export interface DnsProvisionDeps {
  addDefaultDns?: (sudoPassword: string) => Promise<void>;
  addHostsDns?: (hosts: string[], sudoPassword: string) => Promise<void>;
  getAgentStates?: () => ReturnType<typeof getAllAgentBridgeStates>;
  listEnabledCustomHosts?: () => ReturnType<typeof listCustomHosts>;
  logger?: DnsProvisionLogger;
}

/**
 * Provision every AgentBridge DNS entry (Antigravity defaults + agents with
 * `dns_enabled=true` + enabled custom hosts). **Every step is best-effort**: a failure
 * is logged with the full `err` — which carries the privileged command's stderr
 * (`systemCommands.ts` folds stderr into the Error message) — and never aborts the
 * bridge start.
 *
 * Previously the default step (`addDNSEntry`) was called unguarded while the two
 * sibling steps and cert install were wrapped, so in containers/headless (Docker
 * `USER node`, no `sudo`, read-only /etc/hosts) it threw out of `startMitmInternal`
 * and killed the whole start (#6127); its stderr also never reached app.log — only a
 * bare exit code hit the toast (#6198). Extracting + guarding all three steps here
 * restores the symmetry and makes the behavior unit-testable without spawning the
 * MITM server.
 */
export async function provisionDnsEntries(
  sudoPassword: string,
  deps: DnsProvisionDeps = {}
): Promise<void> {
  const addDefaultDns = deps.addDefaultDns ?? addDNSEntry;
  const addHostsDns = deps.addHostsDns ?? addDNSEntries;
  const getAgentStates = deps.getAgentStates ?? getAllAgentBridgeStates;
  const listEnabledCustomHosts =
    deps.listEnabledCustomHosts ?? (() => listCustomHosts({ enabledOnly: true }));
  const logger = deps.logger ?? defaultLog;

  // Antigravity default hosts.
  try {
    await addDefaultDns(sudoPassword);
  } catch (err) {
    logger.error({ err }, "Failed to add default DNS entries (continuing)");
  }

  // Collect hosts from agents that have dns_enabled=true in the DB.
  try {
    const agentStates = getAgentStates();
    const agentHostsToAdd: string[] = [];
    for (const state of agentStates) {
      if (!state.dns_enabled) continue;
      const target = ALL_TARGETS.find((t) => t.id === state.agent_id);
      if (target) {
        agentHostsToAdd.push(...target.hosts);
      }
    }
    if (agentHostsToAdd.length > 0) {
      logger.info({ count: agentHostsToAdd.length }, "Adding DNS for agent host(s)...");
      await addHostsDns(agentHostsToAdd, sudoPassword);
    }
  } catch (err) {
    logger.error({ err }, "Failed to add agent DNS entries (continuing)");
  }

  // Collect enabled custom hosts.
  try {
    const customHosts = listEnabledCustomHosts();
    const customHostNames = customHosts.map((h) => h.host);
    if (customHostNames.length > 0) {
      logger.info({ count: customHostNames.length }, "Adding DNS for custom host(s)...");
      await addHostsDns(customHostNames, sudoPassword);
    }
  } catch (err) {
    logger.error({ err }, "Failed to add custom host DNS entries (continuing)");
  }
}
