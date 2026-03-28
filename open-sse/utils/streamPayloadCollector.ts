import { cloneLogPayload } from "@/lib/logPayloads";

type StructuredSSEEvent = {
  index: number;
  event?: string;
  data: unknown;
};

type CollectorOptions = {
  maxEvents?: number;
  maxBytes?: number;
  stage?: string;
};

function getEventName(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return undefined;

  if (typeof (payload as { event?: unknown }).event === "string") {
    return (payload as { event: string }).event;
  }
  if (typeof (payload as { type?: unknown }).type === "string") {
    return (payload as { type: string }).type;
  }
  if ((payload as { done?: unknown }).done === true) {
    return "[DONE]";
  }
  return undefined;
}

export function createStructuredSSECollector(options: CollectorOptions = {}) {
  const { maxEvents = 200, maxBytes = 49152, stage } = options;
  const events: StructuredSSEEvent[] = [];
  let usedBytes = 0;
  let droppedEvents = 0;

  return {
    push(payload: unknown, explicitEvent?: string) {
      if (payload === null || payload === undefined) return;

      const event: StructuredSSEEvent = {
        index: events.length + droppedEvents,
        data: cloneLogPayload(payload),
      };

      const eventName = explicitEvent || getEventName(payload);
      if (eventName) {
        event.event = eventName;
      }

      const serializedSize = JSON.stringify(event).length;
      if (events.length >= maxEvents || usedBytes + serializedSize > maxBytes) {
        droppedEvents += 1;
        return;
      }

      usedBytes += serializedSize;
      events.push(event);
    },

    build(summary?: unknown) {
      return {
        _streamed: true,
        _format: "sse-json",
        ...(stage ? { _stage: stage } : {}),
        _eventCount: events.length + droppedEvents,
        ...(droppedEvents > 0 ? { _truncated: true, _droppedEvents: droppedEvents } : {}),
        events,
        ...(summary === undefined ? {} : { summary: cloneLogPayload(summary) }),
      };
    },
  };
}
