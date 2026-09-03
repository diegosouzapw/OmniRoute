import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-8486-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-8486-test-secret";

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function makeCombo(models: string[]) {
  return {
    name: "test-combo-8486",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
  };
}

async function runScenario(models: string[]) {
  const longRetryAfterMs = (21 * 3600 + 47 * 60 + 32) * 1000;
  const longRetryAfterIso = new Date(Date.now() + longRetryAfterMs).toISOString();

  const missingProjectBody = {
    error: {
      message:
        "Missing Google projectId for Antigravity account. Auto-discovery via loadCodeAssist " +
        "found no Cloud Code project. Please reconnect OAuth in Providers → Antigravity (and " +
        "ensure the Google account has completed Gemini Code Assist onboarding).",
      type: "oauth_missing_project_id",
      code: "missing_project_id",
    },
  };

  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    if (modelStr.includes("account-a")) {
      return new Response(
        JSON.stringify({
          error: { message: "Your quota will reset after 21h47m32s." },
          retryAfter: longRetryAfterIso,
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify(missingProjectBody), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(models),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  return { result, modelsCalled };
}

// #10314/#10501 superseded the original "one target's message wins, silently
// drops the sibling's reason" contract these two tests pinned: combo terminal
// aggregation now DELIBERATELY lists every distinct per-target reason (#10314)
// and normalizes a heterogeneous failure mix to a 5xx-class status instead of a
// bare `lastStatus` (#10501 — see comboErrorAggregation.ts::resolveComboTerminalStatus).
// The underlying #8486 concern — a config-class error getting the WRONG target's
// long retry-after window stitched onto it — is still the thing under test, just
// verified against the new contract: the response's `Retry-After` HEADER (the
// actual out-of-band decoration #8486 was about) must never carry the unrelated
// 21h47m window, in EITHER attempt order, regardless of which reasons appear in
// the (now intentionally multi-reason) message body.
test("#8486 Part B: heterogeneous rate_limit+config-class antigravity failure never attaches the unrelated 21h47m retryAfter as a response header", async () => {
  const { result, modelsCalled } = await runScenario([
    "antigravity/account-a-model",
    "antigravity/account-b-model",
  ]);

  assert.ok(
    modelsCalled.some((m) => m.includes("account-a")) &&
      modelsCalled.some((m) => m.includes("account-b")),
    `expected both targets to be tried, got: ${JSON.stringify(modelsCalled)}`
  );

  // #10501: neither target's failure alone proves the CLIENT's request was
  // invalid (one is a rate limit, the other a config/auth problem) — the
  // heterogeneous mix must normalize to a 5xx infra/provider status.
  assert.equal(result.status, 502);
  assert.equal(
    result.headers.get("Retry-After"),
    null,
    "the config-class 422 (no retryAfter of its own) must never end up decorated " +
      "with account-a's unrelated 21h47m retry-after header"
  );

  // #10314: both distinct reasons are now surfaced (never silently dropped).
  const text = await result.clone().text();
  assert.match(text, /reset after 21h47m32s/i);
  assert.match(text, /missing google projectid/i);
});

test("#8486 Part B (reverse order): same result independent of which target failed first — both reasons present, no bogus Retry-After header", async () => {
  const { result, modelsCalled } = await runScenario([
    "antigravity/account-b-model",
    "antigravity/account-a-model",
  ]);

  assert.ok(
    modelsCalled.some((m) => m.includes("account-a")) &&
      modelsCalled.some((m) => m.includes("account-b")),
    `expected both targets to be tried, got: ${JSON.stringify(modelsCalled)}`
  );

  assert.equal(result.status, 502, "attempt order must not change the terminal status");
  assert.equal(result.headers.get("Retry-After"), null);

  const text = await result.clone().text();
  assert.match(text, /reset after 21h47m32s/i);
  assert.match(text, /missing google projectid/i);
});
