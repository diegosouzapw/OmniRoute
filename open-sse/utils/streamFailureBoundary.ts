import { buildErrorBody } from "./error.ts";
import type { StreamFailurePayload } from "./streamErrorFormat.ts";
import type { StreamTiming } from "./streamTiming.ts";

type CompletePayload = {
  status: number;
  usage: unknown;
  responseBody: unknown;
  providerPayload: unknown;
  clientPayload: unknown;
  error: string;
  errorCode?: string;
  ttft: number | null;
  itlMs: number | null;
  interrupted: boolean;
};

type AborterContext = {
  onFailure?: ((payload: StreamFailurePayload) => boolean | void | Promise<void>) | null;
  onComplete?: ((payload: CompletePayload) => void) | null;
  getUsage: () => unknown;
  timing: StreamTiming;
  buildProviderPayload: () => unknown;
  buildClientPayload: (body: unknown) => unknown;
  clearIdleTimer: () => void;
  clearPendingRequest: () => void;
  markPendingRequestCleared: (error: Error) => Error;
  model?: string | null;
};

export function createStreamFailureAborter(context: AborterContext) {
  return (
    controller: TransformStreamDefaultController<Uint8Array>,
    failure: StreamFailurePayload,
    publicMessage: string,
    options: { notifyComplete?: boolean } = {}
  ): void => {
    let handled = false;
    context.timing.markInterrupted();
    if (context.onFailure) {
      try {
        handled = context.onFailure(failure) === true;
      } catch (error) {
        console.debug("[STREAM] onFailure callback error:", error);
      }
    }
    let safeMessage = publicMessage || "Upstream failure";
    if (options.notifyComplete && context.onComplete) {
      const body = buildErrorBody(failure.status, failure.message);
      safeMessage = body.error.message;
      try {
        context.onComplete({
          status: failure.status,
          usage: context.getUsage(),
          responseBody: body,
          ttft: context.timing.ttftMs(),
          itlMs: context.timing.avgItlMs(),
          interrupted: context.timing.interrupted,
          error: safeMessage,
          errorCode: failure.code,
          providerPayload: context.buildProviderPayload(),
          clientPayload: context.buildClientPayload(body),
        });
        handled = true;
      } catch (error) {
        console.debug(
          `[STREAM] onComplete callback error in error path (${context.model || "unknown"}):`,
          error
        );
      }
    }
    context.clearIdleTimer();
    if (!handled) context.clearPendingRequest();
    controller.error(context.markPendingRequestCleared(new Error(safeMessage)));
  };
}
