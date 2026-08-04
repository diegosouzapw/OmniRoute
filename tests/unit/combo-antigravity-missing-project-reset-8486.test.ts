import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-8486-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-8486-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

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

test("#8486 Part B: combo unavailableResponse must not attach an unrelated target's long retryAfter to the antigravity missing-projectId 422", async () => {
  const { result, modelsCalled } = await runScenario([
    "antigravity/account-a-model",
    "antigravity/account-b-model",
  ]);

  assert.ok(
    modelsCalled.some((m) => m.includes("account-a")) &&
      modelsCalled.some((m) => m.includes("account-b")),
    `expected both targets to be tried, got: ${JSON.stringify(modelsCalled)}`
  );

  const text = await result.clone().text();

  assert.ok(
    !/reset after/i.test(text) || !/missing google projectid/i.test(text),
    "a config-class antigravity error (missing_project_id, no retryAfter of its own) " +
      "must not be decorated with an unrelated target's long retry-after window — " +
      `got body: ${text}`
  );
});

test("#8486 Part B (reverse order): the config-class 422 must not swallow a genuinely rate-limited sibling's message either", async () => {
  const { result, modelsCalled } = await runScenario([
    "antigravity/account-b-model",
    "antigravity/account-a-model",
  ]);

  assert.ok(
    modelsCalled.some((m) => m.includes("account-a")) &&
      modelsCalled.some((m) => m.includes("account-b")),
    `expected both targets to be tried, got: ${JSON.stringify(modelsCalled)}`
  );

  const text = await result.clone().text();

  // The surfaced status/message pair must always originate from the SAME
  // (last-attempted) target: here that's account-a (429, real retryAfter),
  // so the response must carry ITS message and MAY carry its own retry-after
  // — but must never resurrect the unrelated account-b 422 text alongside it.
  assert.ok(
    !/missing google projectid/i.test(text),
    `expected the last target's (account-a, 429) own message, not the unrelated account-b 422 text — got body: ${text}`
  );
});
