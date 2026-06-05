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

async function stopAll(): Promise<void> {
  // Drive every supervisor stop to completion before the process exits so the
  // DB status writes inside ServiceSupervisor.stop() flush. Otherwise the
  // event loop drains immediately on SIGTERM and rows are stuck in "running"
  // or "starting" until the next boot.
  await Promise.allSettled(Array.from(supervisors.values()).map((supervisor) => supervisor.stop()));
}

function handleShutdownSignal(signal: NodeJS.Signals): void {
  stopAll()
    .catch(() => {
      /* never throw out of a signal handler */
    })
    .finally(() => {
      // Re-raise the signal with the default disposition so the process exit
      // status reflects the original signal (128 + signal number) rather than
      // a synthetic process.exit() code.
      process.kill(process.pid, signal);
    });
}

process.once("SIGINT", () => handleShutdownSignal("SIGINT"));
process.once("SIGTERM", () => handleShutdownSignal("SIGTERM"));
