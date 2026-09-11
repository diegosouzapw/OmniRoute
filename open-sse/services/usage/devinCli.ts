/**
 * usage/devinCli.ts — Devin CLI (devin-cli / devin-cli-agentic) usage fetcher.
 *
 * Devin exposes no REST usage endpoint; the official CLI reads account quota from
 * the Codeium seat-management Connect API:
 *
 *   POST {api}/exa.seat_management_pb.SeatManagementService/GetUserStatus
 *   Content-Type: application/proto
 *   Connect-Protocol-Version: 1
 *   Authorization: Basic <token>-<token>   (raw, non-base64 — Codeium convention)
 *
 * Request body (protobuf):
 *   GetUserStatusRequest { 1: Metadata { 1: ide_name, 2: extension_version,
 *                                        3: api_key, 4: locale, 5: platform } }
 *
 * Response (protobuf) — the fields surfaced here, read off the live wire format:
 *   GetUserStatusResponse { 1: user_status { 13: plan_status {
 *     1: plan_info { 2: plan_name }              → "Pro" | "Teams" | …
 *     14: daily_quota_remaining_percent          → 0..100
 *     15: weekly_quota_remaining_percent         → 0..100
 *     17: daily_quota_reset_at_unix              → epoch seconds
 *     18: weekly_quota_reset_at_unix             → epoch seconds
 *   } } }
 *
 * Surfaces `daily` / `weekly` percent-based quotas (used/total expressed in
 * percent, matching the percent-quota style used by the Claude family leaves)
 * for Provider Limits and genericQuotaFetcher preflight. Graceful `{ message }`
 * on any failure — quota tracking must never block routing.
 */

import { parseResetTime, type UsageQuota } from "./quota.ts";

const SEAT_MANAGEMENT_API_BASE =
  process.env.DEVIN_SEAT_API_URL?.trim() || "https://server.codeium.com";
const GET_USER_STATUS_PATH = "/exa.seat_management_pb.SeatManagementService/GetUserStatus";
const FETCH_TIMEOUT_MS = 10_000;
const CONNECT_PROTOCOL_VERSION = "1";

// ─── Minimal protobuf wire helpers ───────────────────────────────────────────

function encodeVarint(value: number): number[] {
  const bytes: number[] = [];
  let v = value;
  while (v > 0x7f) {
    bytes.push((v & 0x7f) | 0x80);
    v = Math.floor(v / 128);
  }
  bytes.push(v);
  return bytes;
}

function encodeStringField(field: number, text: string): number[] {
  const bytes = Array.from(new TextEncoder().encode(text));
  return [(field << 3) | 2, ...encodeVarint(bytes.length), ...bytes];
}

function buildGetUserStatusRequest(token: string): Uint8Array {
  const metadata = [
    ...encodeStringField(1, "chisel"), // ide_name
    ...encodeStringField(2, "0.0.0-dev"), // extension_version
    ...encodeStringField(3, token), // api_key
    ...encodeStringField(4, "en"), // locale
    ...encodeStringField(5, "linux"), // platform
    ...encodeStringField(7, "0.0.0-dev"), // ide_version — required by the endpoint
  ];
  return new Uint8Array([
    ...encodeVarint((1 << 3) | 2),
    ...encodeVarint(metadata.length),
    ...metadata,
  ]);
}

interface ProtoField {
  field: number;
  varint: number | null;
  bytes: Uint8Array | null;
}

function readVarint(buf: Uint8Array, start: number): { value: number; next: number } | null {
  let result = 0;
  let shift = 0;
  let i = start;
  for (;;) {
    if (i >= buf.length) return null;
    const byte = buf[i++];
    result += (byte & 0x7f) * Math.pow(2, shift);
    if ((byte & 0x80) === 0) return { value: result, next: i };
    shift += 7;
    if (shift > 63) return null;
  }
}

function advancePastFixed(buf: Uint8Array, i: number, size: number): number | null {
  return i + size > buf.length ? null : i + size;
}

/** Decode one protobuf field; `{ field: null }` skips fixed64/fixed32 payloads. */
function decodeOneField(
  buf: Uint8Array,
  start: number
): { field: ProtoField | null; next: number } | null {
  const tag = readVarint(buf, start);
  if (!tag) return null;
  const field = tag.value >>> 3;
  const wire = tag.value & 7;
  if (wire === 0) {
    const v = readVarint(buf, tag.next);
    if (!v) return null;
    return { field: { field, varint: v.value, bytes: null }, next: v.next };
  }
  if (wire === 2) {
    const len = readVarint(buf, tag.next);
    if (!len || len.value > buf.length - len.next) return null;
    return {
      field: { field, varint: null, bytes: buf.subarray(len.next, len.next + len.value) },
      next: len.next + len.value,
    };
  }
  if (wire === 1) {
    const next = advancePastFixed(buf, tag.next, 8);
    return next === null ? null : { field: null, next };
  }
  if (wire === 5) {
    const next = advancePastFixed(buf, tag.next, 4);
    return next === null ? null : { field: null, next };
  }
  return null;
}

/** Walk one protobuf message into (field, value) triples; null on malformed input. */
export function decodeProtoFields(buf: Uint8Array): ProtoField[] | null {
  const out: ProtoField[] = [];
  let i = 0;
  while (i < buf.length) {
    const step = decodeOneField(buf, i);
    if (!step) return null;
    if (step.field) out.push(step.field);
    i = step.next;
  }
  return out;
}

function fieldBytes(fields: ProtoField[] | null, field: number): Uint8Array | null {
  return fields?.find((f) => f.field === field && f.bytes !== null)?.bytes ?? null;
}

function fieldVarint(fields: ProtoField[] | null, field: number): number | null {
  const hit = fields?.find((f) => f.field === field && f.varint !== null);
  return hit ? (hit.varint as number) : null;
}

function fieldString(fields: ProtoField[] | null, field: number): string | null {
  const hit = fields?.find((f) => f.field === field && f.bytes !== null);
  if (!hit?.bytes) return null;
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(hit.bytes);
  } catch {
    return null;
  }
}

// ─── Response parsing ────────────────────────────────────────────────────────

export interface DevinQuotaSnapshot {
  plan: string | null;
  dailyRemainingPercent: number | null;
  weeklyRemainingPercent: number | null;
  dailyResetAtUnix: number | null;
  weeklyResetAtUnix: number | null;
}

/** Parse a GetUserStatus protobuf response into the quota snapshot. */
export function parseDevinUserStatus(buf: Uint8Array): DevinQuotaSnapshot | null {
  const userStatus = fieldBytes(decodeProtoFields(buf), 1);
  if (!userStatus) return null;

  const planStatus = fieldBytes(decodeProtoFields(userStatus), 13);
  if (!planStatus) return null;

  const status = decodeProtoFields(planStatus);
  if (!status) return null;

  const planInfoBytes = fieldBytes(status, 1);
  const planName = planInfoBytes ? fieldString(decodeProtoFields(planInfoBytes), 2) : null;

  return {
    plan: planName,
    dailyRemainingPercent: fieldVarint(status, 14),
    weeklyRemainingPercent: fieldVarint(status, 15),
    dailyResetAtUnix: fieldVarint(status, 17),
    weeklyResetAtUnix: fieldVarint(status, 18),
  };
}

function percentQuota(
  remainingPercent: number,
  resetAtUnix: number | null,
  displayName: string
): UsageQuota {
  const clamped = Math.min(Math.max(remainingPercent, 0), 100);
  return {
    used: 100 - clamped,
    total: 100,
    remaining: clamped,
    remainingPercentage: clamped,
    resetAt: parseResetTime(resetAtUnix),
    unlimited: false,
    displayName,
  };
}

// ─── Fetcher ─────────────────────────────────────────────────────────────────

export async function getDevinCliUsage(token: string | null | undefined) {
  if (!token?.trim()) {
    return { message: "Devin token not available. Import a Devin token to view usage." };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(`${SEAT_MANAGEMENT_API_BASE}${GET_USER_STATUS_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/proto",
        "Connect-Protocol-Version": CONNECT_PROTOCOL_VERSION,
        Authorization: `Basic ${token}-${token}`,
      },
      body: new Uint8Array(buildGetUserStatusRequest(token.trim())),
      signal: controller.signal,
    });
  } catch (error) {
    return { message: `Devin usage error: ${(error as Error).message}` };
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    return { message: `Devin GetUserStatus failed (${response.status})` };
  }

  const snapshot = parseDevinUserStatus(new Uint8Array(await response.arrayBuffer()));
  if (!snapshot) {
    return { message: "Devin quota response could not be parsed." };
  }

  const quotas: Record<string, UsageQuota> = {};
  if (snapshot.dailyRemainingPercent !== null) {
    quotas.daily = percentQuota(
      snapshot.dailyRemainingPercent,
      snapshot.dailyResetAtUnix,
      "Daily Agentic Quota"
    );
  }
  if (snapshot.weeklyRemainingPercent !== null) {
    quotas.weekly = percentQuota(
      snapshot.weeklyRemainingPercent,
      snapshot.weeklyResetAtUnix,
      "Weekly Agentic Quota"
    );
  }

  if (Object.keys(quotas).length === 0) {
    return { message: "Devin quota fields not present in GetUserStatus response." };
  }

  return { plan: snapshot.plan ?? "Devin", quotas };
}
