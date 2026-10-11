import { errorMessageFromBody } from "@/shared/utils/fetchError";

// ResilienceTab is frozen, so the failed-save throw lives here. The PATCH body
// is already parsed; do not read the response a second time.
export function throwIfResilienceSaveFailed(
  responseOk: boolean,
  json: unknown,
  fallback: string
): void {
  if (!responseOk) {
    throw new Error(errorMessageFromBody(json, fallback));
  }
}
