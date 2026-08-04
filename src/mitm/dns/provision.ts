/**
 * AgentBridge DNS provisioning — best-effort, extracted from manager.ts so each step
 * is guarded and unit-testable without spawning the MITM server (#6127 / #6198).
 */

import { addDNSEntry, addDNSEntries, isSudoAvailable } from "./dnsConfig.ts";
import { isRoot } from "../systemCommands.ts";
import { ALL_TARGETS } from "../targets/index.ts";
import { getAllAgentBridgeStates } from "@/lib/db/agentBridgeState.ts";
import { listCustomHosts } from "@/lib/db/inspectorCustomHosts.ts";
import { getGheCopilotHosts } from "@/lib/db/providers.ts";
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
  /** Return true if privileged host-file writes are possible (sudo or root). */
  canElevate?: () => boolean;
  logger?: DnsProvisionLogger;
}

/** Fully-resolved dependency set used by the per-step provisioning helpers below. */
type ResolvedDnsProvisionDeps = {
  addDefaultDns: (sudoPassword: string) => Promise<void>;
  addHostsDns: (hosts: string[], sudoPassword: string) => Promise<void>;
  getAgentStates: () => ReturnType<typeof getAllAgentBridgeStates>;
  listEnabledCustomHosts: () => ReturnType<typeof listCustomHosts>;
  logger: DnsProvisionLogger;
};

/** Antigravity default hosts — best-effort, never throws. */
async function provisionDefaultDns(
  sudoPassword: string,
  deps: ResolvedDnsProvisionDeps
): Promise<void> {
  try {
    await deps.addDefaultDns(sudoPassword);
  } catch (err) {
    deps.logger.error({ err }, "Failed to add default DNS entries (continuing)");
  }
}

/** Hosts for agents with `dns_enabled=true` in the DB — best-effort, never throws. */
async function provisionAgentDns(
  sudoPassword: string,
  deps: ResolvedDnsProvisionDeps
): Promise<void> {
  try {
    const agentStates = deps.getAgentStates();
    const agentHostsToAdd: string[] = [];
    for (const state of agentStates) {
      if (!state.dns_enabled) continue;
      const target = ALL_TARGETS.find((t) => t.id === state.agent_id);
      if (target) {
        agentHostsToAdd.push(...target.hosts);
      }
    }
    if (agentHostsToAdd.length > 0) {
      deps.logger.info({ count: agentHostsToAdd.length }, "Adding DNS for agent host(s)...");
      await deps.addHostsDns(agentHostsToAdd, sudoPassword);
    }
  } catch (err) {
    deps.logger.error({ err }, "Failed to add agent DNS entries (continuing)");
  }
}

/** Enabled custom hosts — best-effort, never throws. */
async function provisionCustomHostsDns(
  sudoPassword: string,
  deps: ResolvedDnsProvisionDeps
): Promise<void> {
  try {
    const customHosts = deps.listEnabledCustomHosts();
    const customHostNames = customHosts.map((h) => h.host);
    if (customHostNames.length > 0) {
      deps.logger.info({ count: customHostNames.length }, "Adding DNS for custom host(s)...");
      await deps.addHostsDns(customHostNames, sudoPassword);
    }
  } catch (err) {
    deps.logger.error({ err }, "Failed to add custom host DNS entries (continuing)");
  }
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
  const canElevate = deps.canElevate ?? (() => isSudoAvailable() || isRoot());
  const logger = deps.logger ?? defaultLog;

  // Explicit opt-out: skip all DNS modification when the env var is set.
  if (process.env.SKIP_ANTIGRAVITY_DNS === "true") {
    logger.info("Skipping DNS entries - SKIP_ANTIGRAVITY_DNS=true");
    return;
  }

  // In containers (USER node, no sudo installed, not root) we cannot write
  // to /etc/hosts. Rather than attempting sudo and swallowing the error,
  // detect the condition up-front and bail out with a clear message.
  if (!canElevate()) {
    logger.info(
      "Skipping DNS entries - sudo not available and not running as root (likely a container)"
    );
    return;
  }

  const resolvedDeps: ResolvedDnsProvisionDeps = {
    addDefaultDns: deps.addDefaultDns ?? addDNSEntry,
    addHostsDns: deps.addHostsDns ?? addDNSEntries,
    getAgentStates: deps.getAgentStates ?? getAllAgentBridgeStates,
    listEnabledCustomHosts:
      deps.listEnabledCustomHosts ?? (() => listCustomHosts({ enabledOnly: true })),
    logger,
  };

  await provisionDefaultDns(sudoPassword, resolvedDeps);
  await provisionAgentDns(sudoPassword, resolvedDeps);
  await provisionCustomHostsDns(sudoPassword, resolvedDeps);
}
