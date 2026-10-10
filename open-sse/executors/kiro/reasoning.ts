/** Native reasoning text, or an empty delta for opaque reasoning activity. */
export function readKiroReasoningText(
  eventType: string,
  payload: Record<string, unknown> | undefined
): string | undefined {
  const reasoningText = payload?.reasoningText;
  let text = "";
  if (reasoningText && typeof reasoningText === "object") {
    const value = reasoningText as { text?: unknown; Text?: unknown };
    text =
      typeof value.text === "string"
        ? value.text
        : typeof value.Text === "string"
          ? value.Text
          : "";
  } else if (typeof reasoningText === "string") {
    text = reasoningText;
  } else if (typeof payload?.text === "string") {
    text = payload.text;
  }
  if (text) return text;
  // Preserve liveness without exposing signatures or claiming visible content.
  if (
    eventType === "reasoningContentEvent" &&
    typeof payload?.signature === "string" &&
    payload.signature.trim().length > 0
  ) {
    return "";
  }
  return undefined;
}
