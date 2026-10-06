/**
 * Compose process-wide chat admission in front of a route handler.
 *
 * Uses the shipped `admitChatRequest` budget/fairness controller — it does not
 * introduce a second admission path. Call this *outside* `withInjectionGuard`
 * so a large `/v1/responses` or `/v1/messages` body is reserved (or 503-shed)
 * before `request.clone()` / `.json()`.
 */
import {
  admitChatRequest,
  CHAT_ADMISSION_QUEUE_MAX_MS,
  releaseChatAdmissionAfterHandler,
  resolveSessionId,
  type ChatAdmissionController,
} from "./chatBodyAdmission";

type RouteHandler = (request: Request, ...args: any[]) => Promise<Response> | Response;

export function withChatAdmission(
  handler: RouteHandler,
  options: {
    controller?: ChatAdmissionController;
    queueMs?: number;
    largeBodyBytes?: number;
    hardMaxBytes?: number;
  } = {}
): RouteHandler {
  return async function admittedHandler(request: Request, ...args: any[]) {
    const sessionId = resolveSessionId(request);
    const admission = await admitChatRequest(request, {
      sessionId,
      queueMs: options.queueMs ?? CHAT_ADMISSION_QUEUE_MAX_MS,
      controller: options.controller,
      largeBodyBytes: options.largeBodyBytes,
      hardMaxBytes: options.hardMaxBytes,
    });
    if (admission.admit === false) return admission.response;
    try {
      return await releaseChatAdmissionAfterHandler(
        Promise.resolve(handler(admission.request, ...args)),
        admission.lease,
        { signal: request.signal }
      );
    } catch (error) {
      admission.lease?.release();
      throw error;
    }
  };
}
