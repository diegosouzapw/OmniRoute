const MAX_TRANSLATION_EVENTS = 200;
const DEFAULT_TRANSLATION_EVENT_LIMIT = 50;

function ensureEventsBuffer() {
  if (!globalThis.__translatorEvents) {
    globalThis.__translatorEvents = [];
  }
  return globalThis.__translatorEvents;
}

export function logTranslationEvent(event) {
  if (!event || typeof event !== "object") return;

  const events = ensureEventsBuffer();
  events.unshift({
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...event,
  });

  if (events.length > MAX_TRANSLATION_EVENTS) {
    events.length = MAX_TRANSLATION_EVENTS;
  }
}

export function getTranslationEvents(limit = DEFAULT_TRANSLATION_EVENT_LIMIT) {
  const numericLimit = Number(limit);
  const boundedLimit =
    Number.isFinite(numericLimit) && numericLimit > 0
      ? Math.min(Math.floor(numericLimit), MAX_TRANSLATION_EVENTS)
      : DEFAULT_TRANSLATION_EVENT_LIMIT;

  const events = ensureEventsBuffer();
  return {
    events: events.slice(0, boundedLimit),
    total: events.length,
  };
}

export { MAX_TRANSLATION_EVENTS };
