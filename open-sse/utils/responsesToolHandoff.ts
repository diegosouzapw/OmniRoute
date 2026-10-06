type CompletedToolItem = {
  keys: string[];
  type: "function_call" | "custom_tool_call";
  value: string;
};

function getResponsesEventKeys(
  payload: Record<string, unknown>,
  item?: Record<string, unknown>
): string[] {
  const keys = new Set<string>();
  const addStringKey = (prefix: string, value: unknown) => {
    if (typeof value === "string" && value.trim()) keys.add(`${prefix}:${value.trim()}`);
  };
  const addIndexKey = (value: unknown) => {
    if (typeof value === "number" && Number.isInteger(value) && value >= 0) {
      keys.add(`index:${value}`);
    }
  };

  addStringKey("item", payload.item_id);
  addStringKey("call", payload.call_id);
  addIndexKey(payload.output_index);
  if (item) {
    addStringKey("item", item.id);
    addStringKey("call", item.call_id);
  }
  return [...keys];
}

/**
 * Codex can start its next turn as soon as it receives a complete client-side
 * tool call, closing the current HTTP response before response.completed. This
 * watcher accepts only a matching done-payload plus a completed tool item;
 * ordinary message/reasoning items and partial calls never qualify.
 */
export function createCompletedResponsesToolHandoffWatcher() {
  let buffer = "";
  let completed = false;
  const functionArgumentsDone = new Map<string, string>();
  const customToolInputDone = new Map<string, string>();
  const completedToolItems: CompletedToolItem[] = [];

  const matchesDonePayload = (item: CompletedToolItem): boolean => {
    const doneValues = item.type === "function_call" ? functionArgumentsDone : customToolInputDone;
    return item.keys.some((key) => doneValues.get(key) === item.value);
  };

  const evaluate = () => {
    completed = completed || completedToolItems.some(matchesDonePayload);
  };

  const notePayload = (payload: Record<string, unknown>, eventType: string) => {
    if (
      eventType === "response.function_call_arguments.done" &&
      typeof payload.arguments === "string"
    ) {
      for (const key of getResponsesEventKeys(payload)) {
        functionArgumentsDone.set(key, payload.arguments);
      }
      evaluate();
      return;
    }

    if (eventType === "response.custom_tool_call_input.done" && typeof payload.input === "string") {
      for (const key of getResponsesEventKeys(payload)) {
        customToolInputDone.set(key, payload.input);
      }
      evaluate();
      return;
    }

    if (eventType !== "response.output_item.done") return;
    const item =
      payload.item && typeof payload.item === "object" && !Array.isArray(payload.item)
        ? (payload.item as Record<string, unknown>)
        : null;
    if (!item) return;
    if (item.type !== "function_call" && item.type !== "custom_tool_call") return;
    if (typeof item.call_id !== "string" || !item.call_id.trim()) return;
    if (typeof item.name !== "string" || !item.name.trim()) return;
    if (item.status !== undefined && item.status !== "completed") return;

    const valueKey = item.type === "function_call" ? "arguments" : "input";
    const value = item[valueKey];
    if (typeof value !== "string") return;
    const keys = getResponsesEventKeys(payload, item);
    if (keys.length === 0) return;

    completedToolItems.push({ keys, type: item.type, value });
    if (completedToolItems.length > 32) completedToolItems.shift();
    evaluate();
  };

  const noteFrame = (frame: string) => {
    let eventType = "";
    const dataLines: string[] = [];
    for (const rawLine of frame.split(/\r?\n/)) {
      const line = rawLine.trimStart();
      if (line.startsWith("event:")) {
        eventType = line.slice("event:".length).trim();
      } else if (line.startsWith("data:")) {
        dataLines.push(line.slice("data:".length).trimStart());
      }
    }
    if (dataLines.length === 0) return;

    try {
      const parsed = JSON.parse(dataLines.join("\n"));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
      const payload = parsed as Record<string, unknown>;
      notePayload(payload, typeof payload.type === "string" ? payload.type : eventType);
    } catch {
      // A partial/malformed frame is not evidence of a completed tool handoff.
    }
  };

  return {
    note(text: string): boolean {
      if (completed) return true;
      buffer += text;
      let boundary = /\r?\n\r?\n/.exec(buffer);
      while (boundary) {
        noteFrame(buffer.slice(0, boundary.index));
        buffer = buffer.slice(boundary.index + boundary[0].length);
        boundary = /\r?\n\r?\n/.exec(buffer);
      }
      if (buffer.length > 65_536) buffer = buffer.slice(-65_536);
      return completed;
    },
  };
}
