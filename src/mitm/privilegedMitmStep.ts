import { createLogger } from "@/shared/utils/logger.ts";
import { canRunPrivilegedMitmSteps } from "./sudoGate.ts";

const log = createLogger("mitm-manager");

/** Run a privileged MITM step when sudo is available; log and skip otherwise (#7938). */
export async function runPrivilegedMitmStep(
  sudoPassword: string,
  skipLog: string,
  step: () => Promise<void>
): Promise<void> {
  if (!canRunPrivilegedMitmSteps(sudoPassword)) {
    log.info(skipLog);
    return;
  }
  await step();
}
