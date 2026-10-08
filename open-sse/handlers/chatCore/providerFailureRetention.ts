import { sanitizeErrorMessage } from "../../utils/error.ts";

/** Project only the copy retained on a connection; routing still sees the raw failure. */
export function projectRetainedProviderFailureMessage(
  message: string,
  videoTranscriptSensitive: boolean
): string {
  if (videoTranscriptSensitive) return "Provider request failed [omitted: video transcript]";
  return sanitizeErrorMessage(message) || "Provider request failed";
}
