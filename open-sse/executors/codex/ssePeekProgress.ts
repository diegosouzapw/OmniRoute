function isOutputProgressEvent(event: Record<string, unknown>): boolean {
  if (typeof event.type !== "string" || event.error) return false;
  if (event.type === "response.completed") return true;
  // Responses text, reasoning, and tool argument/input deltas all carry a
  // non-empty string delta. Lifecycle/heartbeat/empty frames are not output.
  return (
    event.type.startsWith("response.") &&
    event.type.endsWith(".delta") &&
    typeof event.delta === "string" &&
    event.delta.length > 0
  );
}

function hasOutputProgress(data: string): boolean {
  try {
    const payload: unknown = JSON.parse(data);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return false;
    return isOutputProgressEvent(payload as Record<string, unknown>);
  } catch {
    return false;
  }
}

/** Release the pre-read on complete output frames, not merely response.created.
 * Lifecycle-only handoff would lose created -> overload fallback across chunks.
 * Parse SSE/JSON rather than depending on compact JSON substring formatting.
 */
export function hasCodexSsePeekProgress(text: string): boolean {
  // The final split member is an unfinished frame (or empty after a separator).
  const frames = text.split(/\r?\n\r?\n/).slice(0, -1);
  return frames.some((frame) => {
    const data = frame
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    return hasOutputProgress(data);
  });
}

function completeFrameEvents(text: string): Record<string, unknown>[] {
  const events: Record<string, unknown>[] = [];
  for (const frame of text.split(/\r?\n\r?\n/).slice(0, -1)) {
    const data = frame
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data || data === "[DONE]") continue;
    try {
      const payload: unknown = JSON.parse(data);
      if (payload && typeof payload === "object" && !Array.isArray(payload)) {
        events.push(payload as Record<string, unknown>);
      }
    } catch {
      // Non-JSON data frame — not output text.
    }
  }
  return events;
}

export interface CodexSseOutputTextScan {
  /** Concatenated `response.output_text.delta` deltas from COMPLETE frames. */
  outputText: string;
  /** A complete `response.completed` frame has been received. */
  completed: boolean;
  /** Some other output progress (reasoning / tool-call deltas) was seen. */
  otherProgress: boolean;
}

/** Join the visible output text of the complete SSE frames peeked so far.
 * A half-received frame is never counted — the next read finishes it.
 */
export function scanCodexSseOutputText(text: string): CodexSseOutputTextScan {
  let outputText = "";
  let completed = false;
  let otherProgress = false;
  for (const event of completeFrameEvents(text)) {
    if (event.type === "response.completed") {
      completed = true;
    } else if (event.type === "response.output_text.delta") {
      if (typeof event.delta === "string") outputText += event.delta;
    } else if (isOutputProgressEvent(event)) {
      otherProgress = true;
    }
  }
  return { outputText, completed, otherProgress };
}
