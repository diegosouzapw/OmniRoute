import { describe, expect, it } from "vitest";
import {
  mapBatchResponse,
  mapComboResponse,
  mapRequestFailure,
  mapSingleModelResponse,
} from "@/app/(dashboard)/dashboard/models/catalogTestResponses";

const OK = { ok: true, status: 200 };
const TESTED_AT = 1_000;

describe("mapBatchResponse", () => {
  const batch = { providerId: "alpha", modelIds: ["a", "b", "c"] };

  it.each([{ status: "slow" }, { status: "error", isTimeout: true }])(
    "classifies a batch timeout as an error: %j",
    (timeout) => {
      const error = "No model output within 30s";
      const [bulk] = mapBatchResponse(
        { providerId: "alpha", modelIds: ["chat"] },
        OK,
        { results: { chat: { ...timeout, latencyMs: 30_000, error } } },
        TESTED_AT
      );
      const single = mapSingleModelResponse(
        "alpha",
        "chat",
        { ok: false, status: 504 },
        { status: "error", latencyMs: 30_000, error },
        TESTED_AT
      );
      expect(bulk).toMatchObject({
        status: single.status,
        errorClass: single.errorClass,
        error,
      });
      expect(bulk.status).toBe("error");
      expect(bulk.errorClass).toBe("timeout");
    }
  );

  it("stores only the models the server reported when it stopped early", () => {
    const results = mapBatchResponse(
      batch,
      OK,
      {
        results: {
          a: { status: "ok", latencyMs: 120 },
          b: { status: "error", latencyMs: 30, rateLimited: true, statusCode: 429 },
        },
        stoppedEarly: true,
        stopReason: "consecutive_rate_limits",
      },
      TESTED_AT
    );

    expect(results.map((result) => [result.modelId, result.status, result.errorClass])).toEqual([
      ["a", "ok", undefined],
      ["b", "error", "rate-limited"],
    ]);
    expect(results.some((result) => result.modelId === "c")).toBe(false);
  });

  it("marks every model as failed with the API error text when the request fails", () => {
    const results = mapBatchResponse(
      batch,
      { ok: false, status: 400 },
      { error: { message: "Invalid request" } },
      TESTED_AT
    );
    expect(results).toHaveLength(3);
    expect(results[0]).toMatchObject({
      id: "model:alpha:a",
      status: "error",
      error: "Invalid request",
      errorClass: "other",
      statusCode: 400,
      testedAt: TESTED_AT,
    });
  });

  it("stores no English fallback text when a failed request has no error message", () => {
    const [first] = mapBatchResponse(batch, { ok: false, status: 503 }, {}, TESTED_AT);
    expect(first.error).toBeUndefined();
    expect(first.statusCode).toBe(503);
    expect(first.errorClass).toBe("other");
  });
});

describe("mapSingleModelResponse", () => {
  it("maps ok and slow results without an error class", () => {
    expect(
      mapSingleModelResponse("alpha", "chat", OK, { status: "ok", latencyMs: 90 }, TESTED_AT)
    ).toMatchObject({ status: "ok", latencyMs: 90, errorClass: undefined, statusCode: 200 });
    expect(
      mapSingleModelResponse("alpha", "chat", OK, { status: "ok", latencyMs: 6_000 }, TESTED_AT)
        .status
    ).toBe("slow");
  });

  it("classifies failures and keeps the sanitized API error", () => {
    expect(
      mapSingleModelResponse(
        "alpha",
        "chat",
        { ok: false, status: 429 },
        { status: "error", error: "Too many requests", rateLimited: true },
        TESTED_AT
      )
    ).toMatchObject({
      status: "error",
      error: "Too many requests",
      errorClass: "rate-limited",
      statusCode: 429,
    });
  });
});

describe("mapComboResponse", () => {
  it("maps a resolved combo to ok with the resolving target latency", () => {
    expect(
      mapComboResponse(
        "fast",
        OK,
        {
          resolvedBy: "alpha/chat",
          results: [
            { model: "beta/x", status: "error", error: "Timeout", latencyMs: 10 },
            { model: "alpha/chat", status: "ok", latencyMs: 210, statusCode: 200 },
          ],
        },
        TESTED_AT
      )
    ).toMatchObject({
      id: "combo:fast",
      targetType: "combo",
      status: "ok",
      latencyMs: 210,
      errorClass: undefined,
    });
  });

  it("maps a failed combo without inventing English error text", () => {
    const result = mapComboResponse(
      "fast",
      OK,
      { resolvedBy: null, results: [{ model: "alpha/chat", status: "error", statusCode: 500 }] },
      TESTED_AT
    );
    expect(result.status).toBe("error");
    expect(result.error).toBeUndefined();
    expect(result.errorClass).toBe("other");
    expect(result.statusCode).toBe(500);
  });

  it("keeps the API error text when the combo request fails", () => {
    const result = mapComboResponse(
      "fast",
      { ok: false, status: 404 },
      { error: "Combo not found" },
      TESTED_AT
    );
    expect(result).toMatchObject({ status: "error", error: "Combo not found", statusCode: 404 });
  });
});

describe("mapRequestFailure", () => {
  it("records a network failure for a model or combo target", () => {
    expect(
      mapRequestFailure(
        { targetType: "model", providerId: "alpha", modelId: "chat" },
        new TypeError("Failed to fetch"),
        TESTED_AT
      )
    ).toMatchObject({
      id: "model:alpha:chat",
      status: "error",
      error: "Failed to fetch",
      errorClass: "other",
    });
    expect(
      mapRequestFailure({ targetType: "combo", comboName: "fast" }, "boom", TESTED_AT)
    ).toMatchObject({ id: "combo:fast", targetType: "combo", error: "boom" });
  });
});
