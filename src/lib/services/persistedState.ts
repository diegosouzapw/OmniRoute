import { updateVersionManagerTool } from "@/lib/db/versionManager";

const SUPERVISED_STATES = new Set(["starting", "running", "stopping"]);

/**
 * A volatile persisted state cannot be trusted after the in-memory supervisor
 * disappears (for example, after an OmniRoute process restart).
 */
export function projectStateWithoutSupervisor(status: string | null | undefined): string {
  if (SUPERVISED_STATES.has(status ?? "")) return "stopped";
  return status ?? "unknown";
}

/** Persist the terminal state used by idempotent stop routes. */
export async function persistStoppedWithoutSupervisor(tool: string): Promise<void> {
  await updateVersionManagerTool(tool, {
    status: "stopped",
    pid: null,
    healthStatus: "unknown",
    errorMessage: null,
  });
}
