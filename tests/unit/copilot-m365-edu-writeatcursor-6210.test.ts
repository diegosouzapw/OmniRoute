/**
 * Regression test for #6210 — copilot-m365-web empty response on the M365 Education
 * "Starter / OfficeWebIncludedCopilot" tier.
 *
 * Two independent gaps produced a `200 OK` with `content:null`:
 *
 * 1. Tier config: `buildWsUrl()` hardcoded the individual-consumer scenario
 *    (`OfficeWebPaidConsumerCopilot`, `isEdu=false`). The EDU tier the reporter captured
 *    from the official UI needs `scenario=OfficeWebIncludedCopilot`, `isEdu=true`. Now
 *    opt-in via `providerSpecificData.tier="edu"` so the individual path is unchanged.
 *
 * 2. Frame parsing: the EDU / GPT-5.5 path streams deltas via `arguments[0].writeAtCursor`
 *    (incremental) instead of only `arguments[0].messages[].text` (accumulated snapshot).
 *    `extractBotText()` returned null for those frames, so nothing was emitted. The final
 *    `type:2 item.result.message` is now also honored as a last-resort fallback.
 *
 * The live round-trip against a real M365 EDU tenant is the separate Rule #18 validation;
 * these frame captures come verbatim from the reporter.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  extractWriteAtCursor,
  extractFinalResultMessage,
  accumulateBotContent,
} from "../../open-sse/executors/copilot-m365-frames.ts";
import {
  buildWsUrl,
  resolveConnectionParams,
  M365_INDIVIDUAL_DEFAULTS,
} from "../../open-sse/executors/copilot-m365-connection.ts";

// ── Part 2: writeAtCursor + type:2 fallback ─────────────────────────────────

test("extractWriteAtCursor: reads arguments[0].writeAtCursor delta [#6210]", () => {
  const frame = { type: 1, target: "update", arguments: [{ writeAtCursor: " received", references: {} }] };
  assert.equal(extractWriteAtCursor(frame), " received");
});

test("extractWriteAtCursor: null when absent or not an update frame [#6210]", () => {
  assert.equal(extractWriteAtCursor({ type: 1, target: "update", arguments: [{ messages: [] }] }), null);
  assert.equal(extractWriteAtCursor({ type: 2, item: {} }), null);
  assert.equal(extractWriteAtCursor(null), null);
});

test("extractFinalResultMessage: reads type:2 item.result.message [#6210]", () => {
  const frame = {
    type: 2,
    invocationId: "0",
    item: { turnState: "Completed", result: { value: "Success", message: "Test received — everything's working." } },
  };
  assert.equal(extractFinalResultMessage(frame), "Test received — everything's working.");
  assert.equal(extractFinalResultMessage({ type: 1, target: "update", arguments: [] }), null);
});

test("accumulateBotContent: reproduces the reporter's EDU frame sequence → full answer, not null [#6210]", () => {
  const frames = [
    { type: 1, target: "update", arguments: [{ messages: [{ text: "Test", author: "bot" }] }] },
    { type: 1, target: "update", arguments: [{ writeAtCursor: " received", references: {} }] },
    { type: 1, target: "update", arguments: [{ writeAtCursor: " — everything's working.", references: {} }] },
    {
      type: 1,
      target: "update",
      arguments: [{ messages: [{ text: "Test received — everything's working.", author: "bot" }], isLastUpdate: true }],
    },
  ];

  let previous = "";
  let emitted = "";
  for (const frame of frames) {
    const { delta, next } = accumulateBotContent(previous, frame);
    previous = next;
    emitted += delta;
  }

  assert.equal(previous, "Test received — everything's working.");
  assert.equal(emitted, "Test received — everything's working.");
});

test("accumulateBotContent: writeAtCursor before any snapshot still accumulates [#6210]", () => {
  let previous = "";
  const seq = [
    { type: 1, target: "update", arguments: [{ writeAtCursor: "Hello" }] },
    { type: 1, target: "update", arguments: [{ writeAtCursor: " world" }] },
  ];
  let emitted = "";
  for (const frame of seq) {
    const { delta, next } = accumulateBotContent(previous, frame);
    previous = next;
    emitted += delta;
  }
  assert.equal(previous, "Hello world");
  assert.equal(emitted, "Hello world");
});

test("accumulateBotContent: non-content frame yields empty delta, unchanged state [#6210]", () => {
  const { delta, next } = accumulateBotContent("prev", { type: 3, invocationId: "0" });
  assert.equal(delta, "");
  assert.equal(next, "prev");
});

// ── Part 1: EDU tier config (opt-in) ────────────────────────────────────────

const BASE_PARAMS = {
  host: "substrate.office.com",
  chathubPath: "user-oid@tenant-id",
  accessToken: "tok",
};

test("buildWsUrl: individual (default) tier is unchanged — OfficeWebPaidConsumerCopilot/isEdu=false [#6210]", () => {
  const url = new URL(buildWsUrl(BASE_PARAMS));
  assert.equal(url.searchParams.get("scenario"), M365_INDIVIDUAL_DEFAULTS.scenario);
  assert.equal(url.searchParams.get("isEdu"), "false");
});

test("buildWsUrl: EDU tier emits OfficeWebIncludedCopilot + isEdu=true + Starter license [#6210]", () => {
  const url = new URL(
    buildWsUrl({
      ...BASE_PARAMS,
      scenario: "OfficeWebIncludedCopilot",
      isEdu: "true",
      licenseType: "Starter",
    })
  );
  assert.equal(url.searchParams.get("scenario"), "OfficeWebIncludedCopilot");
  assert.equal(url.searchParams.get("isEdu"), "true");
  assert.equal(url.searchParams.get("licenseType"), "Starter");
});

test("resolveConnectionParams: tier='edu' in providerSpecificData selects the EDU scenario [#6210]", () => {
  const params = resolveConnectionParams({
    apiKey: "access_token=tok",
    providerSpecificData: { chathubPath: "user@tenant", tier: "edu" },
  } as never);
  assert.ok(!("error" in params), "should resolve without error");
  if (!("error" in params)) {
    assert.equal(params.scenario, "OfficeWebIncludedCopilot");
    assert.equal(params.isEdu, "true");
  }
});

test("resolveConnectionParams: no tier keeps the individual defaults [#6210]", () => {
  const params = resolveConnectionParams({
    apiKey: "access_token=tok",
    providerSpecificData: { chathubPath: "user@tenant" },
  } as never);
  assert.ok(!("error" in params));
  if (!("error" in params)) {
    // scenario/isEdu unset → buildWsUrl falls back to individual defaults.
    assert.equal(params.scenario, undefined);
  }
});
