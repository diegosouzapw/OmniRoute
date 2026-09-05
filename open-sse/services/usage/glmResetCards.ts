import { buildGlmResetCardFetch, type GlmResetCardAction } from "../../config/glmProvider.ts";
import { toNumber, toRecord } from "./scalars.ts";

type JsonRecord = Record<string, unknown>;

export const GLM_RESET_CARD_TARGET_TYPE = "PERSONAL";

const GLM_RESET_CARD_TIMEOUT_MS = 15_000;
const ZAI_TIMESTAMP_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/;

export type GlmResetWindow = "FIVE_HOUR" | "WEEK";

const GLM_RESET_CARD_BUCKETS: ReadonlyArray<{ key: string; resetType: GlmResetWindow }> = [
  { key: "fiveHourResets", resetType: "FIVE_HOUR" },
  { key: "weekResets", resetType: "WEEK" },
];

export interface GlmResetCard {
  id: string;
  resetType: GlmResetWindow;
  expiresAt?: string | null;
  title?: string;
}

export interface GlmResetCardList {
  cards: GlmResetCard[];
  availableCount: number;
  lastFiveHourResetAt: string | null;
  lastWeekResetAt: string | null;
}

function firstString(record: JsonRecord, keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return null;
}

function normalizeStatus(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  return normalized || null;
}

function isUnavailableCard(record: JsonRecord): boolean {
  const status = normalizeStatus(
    record.status ?? record.state ?? record.outcome ?? record.result ?? record.code
  );
  if (
    status &&
    ["consumed", "redeeming", "redeemed", "used", "expired", "unavailable"].includes(status)
  ) {
    return true;
  }
  return record.available === false || record.consumed === true || record.redeemed === true;
}

/** Parse z.ai's timezone-less dashboard timestamp as UTC, while retaining normal ISO support. */
export function parseGlmResetCardTimestamp(value: string): number | null {
  const trimmed = value.trim();
  const zaiMatch = ZAI_TIMESTAMP_PATTERN.exec(trimmed);
  if (zaiMatch) {
    const [, year, month, day, hour, minute, second, fraction = "0"] = zaiMatch;
    const parts = [year, month, day, hour, minute, second].map(Number);
    const milliseconds = Number(fraction.padEnd(3, "0"));
    const timestamp = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
    const date = new Date(timestamp);
    if (
      date.getUTCFullYear() !== parts[0] ||
      date.getUTCMonth() + 1 !== parts[1] ||
      date.getUTCDate() !== parts[2] ||
      date.getUTCHours() !== parts[3] ||
      date.getUTCMinutes() !== parts[4] ||
      date.getUTCSeconds() !== parts[5]
    ) {
      return null;
    }
    return timestamp + milliseconds;
  }

  const timestamp = Date.parse(trimmed);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function parseResetWindow(value: unknown, fallback: GlmResetWindow): GlmResetWindow {
  const normalized = typeof value === "string" ? value.trim().toUpperCase() : "";
  if (normalized === "WEEK" || normalized === "FIVE_HOUR") return normalized;
  return fallback;
}

function parseResetCard(value: unknown, fallbackType: GlmResetWindow): GlmResetCard | null {
  const record = toRecord(value);
  if (Object.keys(record).length === 0 || isUnavailableCard(record)) return null;

  const id = firstString(record, ["recordId", "id", "packageResetId", "resetId"]);
  if (!id) return null;

  const expiresAt = firstString(record, ["expireTime", "expiredTime", "expiresAt", "endTime"]);
  if (expiresAt) {
    const expiresAtMs = parseGlmResetCardTimestamp(expiresAt);
    if (expiresAtMs !== null && expiresAtMs <= Date.now()) return null;
  }
  const title = firstString(record, ["packageName", "name", "title"]);

  return {
    id,
    resetType: parseResetWindow(record.resetType ?? record.type, fallbackType),
    ...(expiresAt ? { expiresAt } : {}),
    ...(title ? { title } : {}),
  };
}

function getExpirySortValue(card: GlmResetCard): number {
  if (!card.expiresAt) return Number.POSITIVE_INFINITY;
  return parseGlmResetCardTimestamp(card.expiresAt) ?? Number.POSITIVE_INFINITY;
}

export function parseGlmResetCards(payload: unknown): GlmResetCardList {
  const data = toRecord(toRecord(payload).data);
  const parsed: Array<{ card: GlmResetCard; index: number }> = [];

  for (const bucket of GLM_RESET_CARD_BUCKETS) {
    const entries = data[bucket.key];
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      const card = parseResetCard(entry, bucket.resetType);
      if (card) parsed.push({ card, index: parsed.length });
    }
  }

  const cards = parsed
    .sort((a, b) => getExpirySortValue(a.card) - getExpirySortValue(b.card) || a.index - b.index)
    .map(({ card }) => card);

  return {
    cards,
    availableCount: cards.length,
    lastFiveHourResetAt: firstString(data, ["lastFiveHourResetTime"]),
    lastWeekResetAt: firstString(data, ["lastWeekResetTime"]),
  };
}

/** HTTP success alone is insufficient: require z.ai's complete application envelope. */
export function isGlmResetCardEnvelopeOk(payload: unknown): boolean {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return false;
  const record = payload as JsonRecord;
  if (record.success !== true || typeof record.code !== "number" || !Number.isFinite(record.code)) {
    return false;
  }
  return record.code === 0 || record.code === 200;
}

export function getGlmResetCardEnvelopeStatus(payload: unknown, httpStatus: number): number {
  const code = toNumber(toRecord(payload).code, 0);
  if (code === 401 || code === 403 || code === 404 || code === 429) return code;
  if (code === 1001) return 401;
  return httpStatus;
}

export function getGlmResetCardEnvelopeMessage(payload: unknown): string | null {
  const record = toRecord(payload);
  const message = record.msg ?? record.message;
  return typeof message === "string" && message.trim() ? message.trim() : null;
}

async function requestGlmResetCards(
  apiKey: string,
  providerSpecificData: unknown,
  action: GlmResetCardAction,
  body?: JsonRecord
): Promise<{ response: Response; payload: unknown }> {
  const { url, headers } = buildGlmResetCardFetch(apiKey, providerSpecificData, action);
  const response = await fetch(url, {
    method: action === "use" ? "POST" : "GET",
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(GLM_RESET_CARD_TIMEOUT_MS),
  });

  const text = await response.text();
  let payload: unknown = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  return { response, payload };
}

export function fetchGlmResetCardList(
  apiKey: string,
  providerSpecificData?: unknown
): Promise<{ response: Response; payload: unknown }> {
  return requestGlmResetCards(apiKey, providerSpecificData, "list");
}

export function redeemGlmResetCard(
  apiKey: string,
  providerSpecificData: unknown,
  card: { id: string; resetType: GlmResetWindow },
  requestId: string
): Promise<{ response: Response; payload: unknown }> {
  const numericId = Number(card.id);
  return requestGlmResetCards(apiKey, providerSpecificData, "use", {
    targetType: GLM_RESET_CARD_TARGET_TYPE,
    resetType: card.resetType,
    recordId: Number.isFinite(numericId) ? numericId : card.id,
    requestId,
  });
}

/** Null means the auxiliary request failed; zero is an authoritative empty list. */
export async function fetchGlmResetCardCount(
  apiKey: string,
  providerSpecificData?: unknown
): Promise<number | null> {
  if (!apiKey) return 0;
  try {
    const { response, payload } = await fetchGlmResetCardList(apiKey, providerSpecificData);
    if (!response.ok || !isGlmResetCardEnvelopeOk(payload)) return null;
    return parseGlmResetCards(payload).availableCount;
  } catch {
    return null;
  }
}
