import { EVENT_DESCRIPTIONS } from "./eventDescriptions";
import type { EventDescription, WebhookEvent } from "./eventDescriptions";

const UNKNOWN_EVENT_DESCRIPTION: EventDescription = {
  label: "Webhook Event",
  description: "An OmniRoute webhook event was received.",
  emoji: "🔔",
  exampleData: {},
};

export function resolveEventDescription(event: WebhookEvent): EventDescription {
  return Object.hasOwn(EVENT_DESCRIPTIONS, event)
    ? EVENT_DESCRIPTIONS[event]
    : UNKNOWN_EVENT_DESCRIPTION;
}
