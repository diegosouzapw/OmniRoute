import { sanitizeErrorMessage } from "../../utils/errorSanitization.ts";
import { notifyCompressionFailOpen } from "./failOpenNotifier.ts";

/**
 * Report a compression-worker fault and decide whether retrying the pipeline on
 * the main thread is safe. Worker timeouts opt out because they already spent
 * the full CPU budget; fast faults and pre-pool failures may retry in-process.
 */
export function shouldRetryCompressionInProcess(error: unknown): boolean {
  const retryInProcess = (error as { retryInProcess?: boolean } | null)?.retryInProcess !== false;
  logCompressionWorkerFault(error, retryInProcess);

  // A non-pool failure (for example, the dynamic import itself failing with
  // Turbopack's MODULE_NOT_FOUND) never reaches the pool's notification point.
  // Pool errors carry retryInProcess and were already reported before rejection.
  if ((error as { retryInProcess?: boolean } | null)?.retryInProcess === undefined) {
    notifyCompressionFailOpen(sanitizeErrorMessage(error instanceof Error ? error.message : error));
  }
  return retryInProcess;
}

/** Keep logging lazy: a static logger import would pull it into the worker bundle. */
function logCompressionWorkerFault(error: unknown, retryInProcess: boolean): void {
  void (async () => {
    try {
      const { log } = await import("../../utils/logger.ts");
      log.warn(
        "COMPRESSION",
        `Compression worker failed (${
          retryInProcess ? "falling back to in-process compression" : "sending uncompressed"
        }): ${error instanceof Error ? error.message : String(error)}`
      );
    } catch {
      /* logging is best-effort — never let it affect the compression path */
    }
  })();
}
