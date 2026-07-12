// open-sse/utils/responsesCommentaryDrop.ts
//
// #6199 / #6561 — statefully decide whether a Responses SSE event belongs to
// an internal "commentary" phase item and must be dropped from the
// passthrough stream. The `response.output_item.added` event announces the
// phase; the follow-up delta/done events only carry `item_id`/`output_index`,
// so we key off those (tracked across calls in the two Sets the caller owns).
//
// Extracted out of `stream.ts` (a frozen file — see
// config/quality/file-size-baseline.json) so the #6561 fix (clearing the
// buffered `event:` line alongside every drop) does not grow that file.
import { isResponsesCommentaryMessageItem } from "../handlers/responseSanitizer.ts";
import { FORMATS } from "../translator/formats.ts";

type JsonRecord = Record<string, unknown>;

function extractEventItem(parsed: JsonRecord): JsonRecord | null {
  return parsed.item && typeof parsed.item === "object" && !Array.isArray(parsed.item)
    ? (parsed.item as JsonRecord)
    : null;
}

function extractEventItemId(parsed: JsonRecord, eventItem: JsonRecord | null): string | null {
  if (typeof parsed.item_id === "string") return parsed.item_id;
  if (eventItem && typeof eventItem.id === "string") return eventItem.id;
  return null;
}

function extractEventOutputIndex(parsed: JsonRecord): number | null {
  return typeof parsed.output_index === "number" ? parsed.output_index : null;
}

// The `response.output_item.added` event that announces a new commentary-phase
// item. Records its identifiers so follow-up delta/done events are recognized.
function isCommentaryStart(
  eventType: string,
  parsed: JsonRecord,
  eventItemId: string | null,
  eventOutputIndex: number | null,
  commentaryItemIds: Set<string>,
  commentaryIndexes: Set<number>
): boolean {
  const isAddedEvent = eventType === "response.output_item.added";
  if (!isAddedEvent || !isResponsesCommentaryMessageItem(parsed.item)) return false;

  if (eventItemId) commentaryItemIds.add(eventItemId);
  if (eventOutputIndex !== null) commentaryIndexes.add(eventOutputIndex);
  return true;
}

// A follow-up delta/done event for an item already tracked as commentary.
// Untracks the item once its `output_item.done` event is seen.
function isCommentaryContinuation(
  eventType: string,
  eventItemId: string | null,
  eventOutputIndex: number | null,
  commentaryItemIds: Set<string>,
  commentaryIndexes: Set<number>
): boolean {
  const belongsToCommentary =
    (eventItemId !== null && commentaryItemIds.has(eventItemId)) ||
    (eventOutputIndex !== null && commentaryIndexes.has(eventOutputIndex));
  if (!belongsToCommentary) return false;

  if (eventType === "response.output_item.done") {
    if (eventItemId) commentaryItemIds.delete(eventItemId);
    if (eventOutputIndex !== null) commentaryIndexes.delete(eventOutputIndex);
  }
  return true;
}

export function shouldDropResponsesCommentaryEvent(
  parsed: JsonRecord,
  commentaryItemIds: Set<string>,
  commentaryIndexes: Set<number>
): boolean {
  const eventType = parsed.type as string;
  const eventItem = extractEventItem(parsed);
  const eventItemId = extractEventItemId(parsed, eventItem);
  const eventOutputIndex = extractEventOutputIndex(parsed);

  return (
    isCommentaryStart(
      eventType,
      parsed,
      eventItemId,
      eventOutputIndex,
      commentaryItemIds,
      commentaryIndexes
    ) ||
    isCommentaryContinuation(
      eventType,
      eventItemId,
      eventOutputIndex,
      commentaryItemIds,
      commentaryIndexes
    )
  );
}

// #6952 — TRANSLATE-mode chunk loop was missing this filter (only PASSTHROUGH
// had it wired), so commentary-phase text leaked into the client. Own Sets +
// the `targetFormat` gate, closed over so stream.ts (frozen) stays a one-liner.
export function createTranslateCommentaryFilter(targetFormat: string | undefined) {
  const commentaryItemIds = new Set<string>();
  const commentaryIndexes = new Set<number>();
  const applies = targetFormat === FORMATS.OPENAI_RESPONSES;
  return (parsed: JsonRecord): boolean =>
    applies && shouldDropResponsesCommentaryEvent(parsed, commentaryItemIds, commentaryIndexes);
}
