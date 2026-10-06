/**
 * tests/unit/usage-devin-cli.test.ts
 *
 * Devin CLI (devin-cli) exposes no REST usage endpoint — the official CLI reads
 * account quota from the Codeium seat-management Connect API
 * (exa.seat_management_pb.SeatManagementService/GetUserStatus, protobuf over
 * POST with a raw `Basic <token>-<token>` auth header). These tests cover the
 * minimal protobuf wire helpers (encoder round-trip + malformed-input
 * rejection), the GetUserStatus response parser against a wire-format fixture
 * matching the live API shape, and the dispatcher wiring.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { decodeProtoFields, parseDevinUserStatus } =
  await import("../../open-sse/services/usage/devinCli.ts");

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

function lenField(field: number, payload: number[]): number[] {
  return [...encodeVarint((field << 3) | 2), ...encodeVarint(payload.length), ...payload];
}

function varintField(field: number, value: number): number[] {
  return [...encodeVarint((field << 3) | 0), ...encodeVarint(value)];
}

function strField(field: number, text: string): number[] {
  const bytes = Array.from(new TextEncoder().encode(text));
  return [...encodeVarint((field << 3) | 2), ...encodeVarint(bytes.length), ...bytes];
}

describe("devin-cli protobuf wire helpers", () => {
  it("decodes varint and length-delimited fields", () => {
    const wire = new Uint8Array([...varintField(14, 90), ...lenField(2, [0x50, 0x72, 0x6f])]);
    const fields = decodeProtoFields(wire);
    assert.ok(fields);
    assert.equal(fields.length, 2);
    assert.equal(fields[0].field, 14);
    assert.equal(fields[0].varint, 90);
    assert.equal(fields[1].field, 2);
    assert.ok(fields[1].bytes);
    assert.equal(new TextDecoder().decode(fields[1].bytes!), "Pro");
  });

  it("returns null on malformed input (truncated length-delimited field)", () => {
    // Field 1, wire 2, length 200 — but only 3 bytes follow.
    const malformed = new Uint8Array([0x0a, 0xc8, 0x01, 0x01, 0x02, 0x03]);
    assert.equal(decodeProtoFields(malformed), null);
  });
});

describe("parseDevinUserStatus", () => {
  it("parses a GetUserStatus fixture into the quota snapshot", () => {
    const dailyResetUnix = 1788249600;
    const weeklyResetAtUnix = 1788681600;
    const planInfo = [...strField(2, "Pro")];
    const planStatus = [
      ...lenField(1, planInfo),
      ...varintField(14, 90),
      ...varintField(15, 95),
      ...varintField(17, dailyResetUnix),
      ...varintField(18, weeklyResetAtUnix),
    ];
    const userStatus = [...lenField(13, planStatus)];
    const response = new Uint8Array([...lenField(1, userStatus)]);

    const snapshot = parseDevinUserStatus(response);
    assert.ok(snapshot);
    assert.equal(snapshot.plan, "Pro");
    assert.equal(snapshot.dailyRemainingPercent, 90);
    assert.equal(snapshot.weeklyRemainingPercent, 95);
    assert.equal(snapshot.dailyResetAtUnix, dailyResetUnix);
    assert.equal(snapshot.weeklyResetAtUnix, weeklyResetAtUnix);
  });

  it("returns null when plan_status is absent", () => {
    const userStatus = [...strField(2, "no-plan-status-here")];
    const response = new Uint8Array([...lenField(1, userStatus)]);
    assert.equal(parseDevinUserStatus(response), null);
  });
});

describe("devin-cli dispatcher wiring", () => {
  it("is registered in USAGE_FETCHER_PROVIDERS alongside openrouter", async () => {
    const { USAGE_FETCHER_PROVIDERS } = await import("../../open-sse/services/usage.ts");
    assert.ok(USAGE_FETCHER_PROVIDERS.includes("devin-cli"));
    assert.ok(USAGE_FETCHER_PROVIDERS.includes("openrouter"));
  });

  it("getDevinCliUsage returns a graceful message without a token", async () => {
    const { getDevinCliUsage } = await import("../../open-sse/services/usage/devinCli.ts");
    const result = (await getDevinCliUsage("")) as { message?: string; quotas?: unknown };
    assert.ok(result.message);
    assert.equal(result.quotas, undefined);
  });

  it("dispatcher routes devin-cli to the seat-management fetcher", async () => {
    const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
    const result = (await getUsageForProvider({
      id: "conn-d",
      provider: "devin-cli",
      accessToken: undefined,
      apiKey: undefined,
    })) as { message?: string; quotas?: unknown };
    assert.ok(result.message && !("quotas" in result));
  });
});
