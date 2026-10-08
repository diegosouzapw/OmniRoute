import { normalizeOutputIndex } from "./pureHelpers.ts";

interface Fragment {
  text: string;
  order: number;
}
interface TextPart {
  fragments: Fragment[];
  length: number;
}
interface TextItem {
  id?: string;
  parts: Map<number | null, TextPart>;
}
interface TextTracker {
  closed: boolean;
  sequence: number;
  items: Set<TextItem>;
  byId: Map<string, TextItem>;
  byIndex: Map<number, TextItem>;
  anonymous?: TextItem;
}
interface TextState {
  responsesTextSnapshots?: TextTracker;
  chatId?: string;
  created?: number;
  model?: string;
}
interface Identity {
  item_id?: unknown;
  output_index?: unknown;
  content_index?: unknown;
}
type Snapshot = Record<string, unknown>;

function tracker(state: TextState): TextTracker {
  return (state.responsesTextSnapshots ??= {
    closed: false,
    sequence: 0,
    items: new Set(),
    byId: new Map(),
    byIndex: new Map(),
  });
}
function object(value: unknown): Snapshot | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Snapshot) : null;
}
function index(value: unknown): number | undefined {
  if (typeof value !== "number" && (typeof value !== "string" || !value.trim())) return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? normalizeOutputIndex(value) : undefined;
}
function mergeParts(target: TextPart, source: TextPart): void {
  // Fragments from aliases may interleave before an item event links their IDs.
  for (const fragment of source.fragments) target.fragments.push(fragment);
  target.fragments.sort((a, b) => a.order - b.order);
  target.length += source.length;
}
function mergeItems(t: TextTracker, target: TextItem, source: TextItem): void {
  for (const [key, part] of source.parts) {
    const existing = target.parts.get(key);
    if (existing) mergeParts(existing, part);
    else target.parts.set(key, part);
  }
  for (const [key, item] of t.byIndex) if (item === source) t.byIndex.set(key, target);
  for (const [key, item] of t.byId) if (item === source) t.byId.set(key, target);
  if (t.anonymous === source) t.anonymous = undefined;
  t.items.delete(source);
}
function resolveItem(t: TextTracker, identity: Identity, allowAnonymous = true): TextItem {
  const id =
    typeof identity.item_id === "string" && identity.item_id ? identity.item_id : undefined;
  const outputIndex = index(identity.output_index);
  if (!id && outputIndex === undefined) {
    if (t.items.size === 1) return t.items.values().next().value!;
    if (t.anonymous) return t.anonymous;
  }
  const byId = id ? t.byId.get(id) : undefined;
  const byIndex = outputIndex !== undefined ? t.byIndex.get(outputIndex) : undefined;
  // Explicit IDs are authoritative; a malformed reused output index must not merge them.
  const compatibleIndex =
    byIndex && (!id || !byIndex.id || byIndex.id === id) ? byIndex : undefined;
  let item = byId ?? compatibleIndex;
  if (byId && compatibleIndex && byId !== compatibleIndex) mergeItems(t, byId, compatibleIndex);
  if (!item && allowAnonymous && t.anonymous && t.items.size === 1) {
    item = t.anonymous;
    t.anonymous = undefined;
  }
  if (!item) {
    item = { parts: new Map() };
    t.items.add(item);
  }
  if (id) {
    item.id = id;
    t.byId.set(id, item);
  }
  if (outputIndex !== undefined) t.byIndex.set(outputIndex, item);
  if (!id && outputIndex === undefined) t.anonymous = item;
  return item;
}
function resolvePart(
  item: TextItem,
  contentIndex: unknown,
  allowAnonymous: boolean
): TextPart | null {
  const key = index(contentIndex) ?? null;
  if (key === null && item.parts.size === 1) return item.parts.values().next().value!;
  const anonymous = item.parts.get(null);
  if (key !== null && anonymous) {
    const existing = item.parts.get(key);
    if (!allowAnonymous || item.parts.size > (existing ? 2 : 1)) return null;
    if (existing) mergeParts(existing, anonymous);
    item.parts.delete(null);
    if (!existing) item.parts.set(key, anonymous);
  }
  let part = item.parts.get(key);
  if (!part) {
    part = { fragments: [], length: 0 };
    item.parts.set(key, part);
  }
  return part;
}
function reconcile(t: TextTracker, part: TextPart, snapshot: string): string {
  if (snapshot.length < part.length) return "";
  let offset = 0;
  for (const fragment of part.fragments) {
    if (!snapshot.startsWith(fragment.text, offset)) return "";
    offset += fragment.text.length;
  }
  const suffix = snapshot.slice(part.length);
  // Compact only at a snapshot, never on each streamed delta (linear retained text).
  part.fragments = snapshot ? [{ text: snapshot, order: t.sequence++ }] : [];
  part.length = snapshot.length;
  return suffix;
}
export function buildTextSnapshotChunk(state: TextState, text: string): Record<string, unknown> {
  return {
    id: state.chatId,
    object: "chat.completion.chunk",
    created: state.created,
    model: state.model || "gpt-4",
    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
  };
}
export function recordResponsesTextDelta(state: TextState, identity: Identity, text: string): void {
  const t = tracker(state);
  if (t.closed) return;
  const part = resolvePart(resolveItem(t, identity), identity.content_index, true);
  if (part) {
    part.fragments.push({ text, order: t.sequence++ });
    part.length += text.length;
  }
}
export function reconcileResponsesTextDone(
  state: TextState,
  identity: Identity,
  text: unknown
): string {
  const t = tracker(state);
  if (t.closed || typeof text !== "string" || !text) return "";
  const item = resolveItem(t, identity);
  if (t.anonymous && t.items.size > 1) return "";
  if (index(identity.content_index) === undefined && item.parts.size > 1) return "";
  const part = resolvePart(item, identity.content_index, true);
  return part ? reconcile(t, part, text) : "";
}
export function bindResponsesTextItem(
  state: TextState,
  value: unknown,
  outputIndex: unknown
): void {
  const item = object(value);
  if (item?.type === "message" && item.role === "assistant") {
    resolveItem(tracker(state), { item_id: item.id, output_index: outputIndex });
  }
}
function recoverItem(t: TextTracker, item: TextItem, snapshot: Snapshot): string[] {
  if (!Array.isArray(snapshot.content)) return [];
  const parts = snapshot.content
    .map((part, contentIndex) => ({ part: object(part), contentIndex }))
    .filter(({ part }) => part?.type === "output_text" && typeof part.text === "string");
  const recovered: string[] = [];
  for (const { part, contentIndex } of parts) {
    const tracked = resolvePart(item, contentIndex, parts.length === 1);
    if (!tracked) continue;
    const suffix = reconcile(t, tracked, part.text as string);
    if (suffix) recovered.push(suffix);
  }
  return recovered;
}
export function synthesizeTextItemSnapshot(
  state: TextState,
  value: unknown,
  outputIndex: unknown
): Record<string, unknown>[] {
  const t = tracker(state);
  const snapshot = object(value);
  if (t.closed || snapshot?.type !== "message" || snapshot.role !== "assistant") return [];
  const item = resolveItem(t, { item_id: snapshot.id, output_index: outputIndex });
  if (t.anonymous && t.items.size > 1) return [];
  return recoverItem(t, item, snapshot).map((text) => buildTextSnapshotChunk(state, text));
}
export function synthesizeTextSnapshots(
  state: TextState,
  output: unknown
): Record<string, unknown>[] {
  const t = tracker(state);
  if (t.closed) return [];
  const items = (Array.isArray(output) ? output : [])
    .map((value, position) => ({
      snapshot: object(value),
      outputIndex: position,
    }))
    .filter(({ snapshot }) => snapshot?.type === "message" && snapshot.role === "assistant");
  // Bind all identities before recovering anything: an anonymous prefix cannot be
  // assigned to the first of multiple messages merely because it was visited first.
  const resolved = items.map(({ snapshot, outputIndex: position }) => ({
    snapshot,
    item: resolveItem(t, { item_id: snapshot.id, output_index: position }, items.length === 1),
  }));
  if (t.anonymous && t.items.size > 1) return [];
  return resolved.flatMap(({ snapshot, item }) =>
    recoverItem(t, item, snapshot).map((text) => buildTextSnapshotChunk(state, text))
  );
}
export function closeResponsesTextSnapshots(state: TextState): void {
  const t = tracker(state);
  t.closed = true;
  t.items.clear();
  t.byId.clear();
  t.byIndex.clear();
  t.anonymous = undefined;
}
