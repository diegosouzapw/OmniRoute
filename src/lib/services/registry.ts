/** Singleton registry of ServiceSupervisor instances. */

import type { ServiceSupervisor } from "./ServiceSupervisor";

const supervisors = new Map<string, ServiceSupervisor>();

export function registerSupervisor(supervisor: ServiceSupervisor): void {
  supervisors.set(supervisor.getStatus().tool, supervisor);
}

export function getSupervisor(tool: string): ServiceSupervisor | null {
  return supervisors.get(tool) ?? null;
}

export function listSupervisors(): ServiceSupervisor[] {
  return Array.from(supervisors.values());
}

/** Remove a supervisor by tool name. Intended for use in tests. */
export function unregisterSupervisor(tool: string): void {
  supervisors.delete(tool);
}

function stopAll(): void {
  for (const supervisor of supervisors.values()) {
    supervisor.stop().catch(() => {});
  }
}

process.once("SIGINT", stopAll);
process.once("SIGTERM", stopAll);
