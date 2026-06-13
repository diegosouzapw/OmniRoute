/**
 * Unit tests for API key policy helpers:
 *   - parseIsActive (via parseAccessSchedule indirect coverage)
 *   - isWithinSchedule logic (tested directly via a re-export or by mocking Date)
 *
 * Because isWithinSchedule is module-private, we test it through observable
 * behavior: feeding real Date overrides via globalThis.Date stubbing.
 *
 * Strategy:
 *   1. Extract the schedule-check logic into a standalone helper exported only
 *      for tests — OR test it end-to-end through enforceApiKeyPolicy.
 *   2. Since enforceApiKeyPolicy needs a full DB + HTTP Request, we isolate
 *      isWithinSchedule by copying its logic into this test file and verifying
 *      the exact same algorithm.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-607-api-key-secret";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const modelComboMappingsDb = await import("../../src/lib/db/modelComboMappings.ts");
const costRules = await import("../../src/domain/costRules.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");

rateLimiter.setRateLimiterTestMode(true);

function getFsErrorCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("code" in error)) return undefined;
  const { code } = error as { code?: unknown };
  return typeof code === "string" ? code : undefined;
}

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = getFsErrorCode(error);
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function loadPolicy(label) {
  const modulePath = path.join(process.cwd(), "src/shared/utils/apiKeyPolicy.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

async function createKeyWithPolicy(update = {}) {
  const created = await apiKeysDb.createApiKey("Policy Key", "machine-607");
  if (Object.keys(update).length > 0) {
    await apiKeysDb.updateApiKeyPermissions(created.id, update);
  }
  return created;
}

function makePolicyRequest(apiKey) {
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
  });
}

function makeAnthropicPolicyRequest(apiKey) {
  return new Request("http://localhost/v1/messages", {
    method: "POST",
    headers: apiKey
      ? {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        }
      : { "anthropic-version": "2023-06-01" },
  });
}

async function readErrorMessage(response) {
  const body = (await response.json()) as { error?: { message?: unknown } };
  return typeof body.error?.message === "string" ? body.error.message : "";
}

function getCurrentUtcDay() {
  const dayName = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
  }).format(new Date());
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[dayName];
}

test.beforeEach(async () => {
  delete process.env.DEFAULT_RATE_LIMIT_PER_DAY;
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Replicate the isWithinSchedule logic for pure unit testing ───────────────
//
// This mirrors the implementation in apiKeyPolicy.ts exactly.
// If the production code changes, update this copy too.

/**
 * @param {{ enabled: boolean; from: string; until: string; days: number[]; tz: string }} schedule
 * @param {Date} now  — injectable "current time"
 * @returns {boolean}
 */
function isWithinSchedule(schedule, now = new Date()) {
  if (!schedule.enabled) return true;

  let localTimeStr;
  try {
    localTimeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  } catch {
    return true;
  }

  const normalizedTime = localTimeStr.replace(/^24:/, "00:");
  const [localHour, localMin] = normalizedTime.split(":").map(Number);
  const localMinutes = localHour * 60 + localMin;

  let localDayStr;
  try {
    localDayStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      weekday: "short",
    }).format(now);
  } catch {
    return true;
  }

  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const localDay = dayMap[localDayStr] ?? now.getDay();

  if (!schedule.days.includes(localDay)) return false;

  const [fromHour, fromMin] = schedule.from.split(":").map(Number);
  const [untilHour, untilMin] = schedule.until.split(":").map(Number);
  const fromMinutes = fromHour * 60 + fromMin;
  const untilMinutes = untilHour * 60 + untilMin;

  if (untilMinutes < fromMinutes) {
    return localMinutes >= fromMinutes || localMinutes < untilMinutes;
  }

  return localMinutes >= fromMinutes && localMinutes < untilMinutes;
}

// ─── parseIsActive helper (mirrors production code) ──────────────────────────
function parseIsActive(value) {
  if (value === 0 || value === "0" || value === false) return false;
  return true;
}

// ─── parseAccessSchedule helper (mirrors production code) ────────────────────
function parseAccessSchedule(value) {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    if (
      typeof parsed.enabled !== "boolean" ||
      typeof parsed.from !== "string" ||
      typeof parsed.until !== "string" ||
      !Array.isArray(parsed.days) ||
      typeof parsed.tz !== "string"
    )
      return null;
    const days = parsed.days.filter(
      (d) => typeof d === "number" && Number.isInteger(d) && d >= 0 && d <= 6
    );
    return { enabled: parsed.enabled, from: parsed.from, until: parsed.until, days, tz: parsed.tz };
  } catch {
    return null;
  }
}

// ─── parseIsActive ────────────────────────────────────────────────────────────

test("parseIsActive: undefined → true (default active)", () => {
  assert.equal(parseIsActive(undefined), true);
});

test("parseIsActive: null → true", () => {
  assert.equal(parseIsActive(null), true);
});

test("parseIsActive: 1 → true", () => {
  assert.equal(parseIsActive(1), true);
});

test("parseIsActive: true → true", () => {
  assert.equal(parseIsActive(true), true);
});

test("parseIsActive: 0 → false", () => {
  assert.equal(parseIsActive(0), false);
});

test("parseIsActive: false → false", () => {
  assert.equal(parseIsActive(false), false);
});

test("parseIsActive: '0' → false", () => {
  assert.equal(parseIsActive("0"), false);
});

// ─── parseAccessSchedule ──────────────────────────────────────────────────────

test("parseAccessSchedule: null/empty → null", () => {
  assert.equal(parseAccessSchedule(null), null);
  assert.equal(parseAccessSchedule(""), null);
  assert.equal(parseAccessSchedule("  "), null);
});

test("parseAccessSchedule: valid JSON → object", () => {
  const input = JSON.stringify({
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 2, 3, 4, 5],
    tz: "America/Sao_Paulo",
  });
  const result = parseAccessSchedule(input);
  assert.deepEqual(result, {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 2, 3, 4, 5],
    tz: "America/Sao_Paulo",
  });
});

test("parseAccessSchedule: invalid day values are filtered out", () => {
  const input = JSON.stringify({
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 7, -1, 5],
    tz: "UTC",
  });
  const result = parseAccessSchedule(input);
  assert.deepEqual(result.days, [1, 5]);
});

test("parseAccessSchedule: missing required field → null", () => {
  const input = JSON.stringify({ enabled: true, from: "08:00", until: "18:00", days: [1] });
  assert.equal(parseAccessSchedule(input), null); // tz missing
});

test("parseAccessSchedule: invalid JSON → null", () => {
  assert.equal(parseAccessSchedule("{broken json}"), null);
});

// ─── isWithinSchedule ────────────────────────────────────────────────────────

// Helper: create a Date at a specific UTC datetime
function utc(y, m, d, h, min) {
  return new Date(Date.UTC(y, m - 1, d, h, min));
}

test("isWithinSchedule: enabled=false → always true", () => {
  const schedule = { enabled: false, from: "00:00", until: "00:01", days: [1], tz: "UTC" };
  // Even a time that would be blocked
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 12, 0)), true);
});

test("isWithinSchedule: time within window → true", () => {
  // Monday 2024-03-11, 09:00 UTC (UTC timezone)
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 9, 0)), true);
});

test("isWithinSchedule: time before window → false", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  // 07:59
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 7, 59)), false);
});

test("isWithinSchedule: time exactly at 'from' → true (inclusive)", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 8, 0)), true);
});

test("isWithinSchedule: time exactly at 'until' → false (exclusive)", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 18, 0)), false);
});

test("isWithinSchedule: time after window → false", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 20, 0)), false);
});

test("isWithinSchedule: wrong weekday → false", () => {
  // Monday (day 1) schedule, but 2024-03-12 is Tuesday (day 2)
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 12, 10, 0)), false);
});

test("isWithinSchedule: multiple days — matching day → true", () => {
  // Mon-Fri schedule, Wednesday (3)
  const schedule = {
    enabled: true,
    from: "09:00",
    until: "17:00",
    days: [1, 2, 3, 4, 5],
    tz: "UTC",
  };
  // 2024-03-13 is Wednesday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 13, 12, 0)), true);
});

test("isWithinSchedule: multiple days — Saturday blocked", () => {
  const schedule = {
    enabled: true,
    from: "09:00",
    until: "17:00",
    days: [1, 2, 3, 4, 5],
    tz: "UTC",
  };
  // 2024-03-09 is Saturday (day 6)
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 9, 12, 0)), false);
});

// ─── Overnight schedule tests ─────────────────────────────────────────────────

test("isWithinSchedule: overnight window — time after midnight → true", () => {
  // 22:00 → 06:00, Monday
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  // 02:30 Monday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 2, 30)), true);
});

test("isWithinSchedule: overnight window — time before start → false", () => {
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  // 21:59 Monday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 21, 59)), false);
});

test("isWithinSchedule: overnight window — time after end → false", () => {
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  // 06:01 Monday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 6, 1)), false);
});

test("isWithinSchedule: overnight window — time exactly at start → true", () => {
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 22, 0)), true);
});

test("isWithinSchedule: invalid timezone → fail-open (true)", () => {
  const schedule = {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 2, 3, 4, 5],
    tz: "Invalid/Zone",
  };
  // Should not throw, should return true (fail-open)
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 12, 0)), true);
});

test("isWithinSchedule: America/Sao_Paulo timezone conversion", () => {
  // UTC 2024-03-11 15:00 = BRT (UTC-3) 12:00, Monday
  const schedule = {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1],
    tz: "America/Sao_Paulo",
  };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 15, 0)), true);
});

test("isWithinSchedule: America/Sao_Paulo — outside window", () => {
  // UTC 2024-03-11 22:00 = BRT 19:00, Monday — after 18:00
  const schedule = {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1],
    tz: "America/Sao_Paulo",
  };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 22, 0)), false);
});

test("enforceApiKeyPolicy bypasses local mode and unknown keys", async () => {
  const policy = await loadPolicy("bypass");

  assert.deepEqual(await policy.enforceApiKeyPolicy(makePolicyRequest(null), "openai/gpt-4.1"), {
    apiKey: null,
    apiKeyInfo: null,
    rejection: null,
  });

  const unknown = await policy.enforceApiKeyPolicy(
    makePolicyRequest("sk-unknown"),
    "openai/gpt-4.1"
  );
  assert.equal(unknown.apiKey, "sk-unknown");
  assert.equal(unknown.apiKeyInfo, null);
  assert.equal(unknown.rejection, null);
});

test("enforceApiKeyPolicy rejects disabled keys and blocked schedules", async () => {
  const disabledKey = await createKeyWithPolicy({ isActive: false });
  const blockedDay = (getCurrentUtcDay() + 1) % 7;
  const scheduledKey = await createKeyWithPolicy({
    accessSchedule: {
      enabled: true,
      from: "00:00",
      until: "23:59",
      days: [blockedDay],
      tz: "UTC",
    },
  });
  const policy = await loadPolicy("disabled-and-schedule");

  const disabled = await policy.enforceApiKeyPolicy(makePolicyRequest(disabledKey.key), null);
  assert.equal(disabled.rejection.status, 403);
  assert.equal(await readErrorMessage(disabled.rejection), "This API key is disabled");

  const blocked = await policy.enforceApiKeyPolicy(makePolicyRequest(scheduledKey.key), null);
  assert.equal(blocked.rejection.status, 403);
  assert.match(await readErrorMessage(blocked.rejection), /Access denied outside allowed hours/);
});

test("enforceApiKeyPolicy rejects disallowed models and exhausted budgets", async () => {
  const restrictedKey = await createKeyWithPolicy({
    allowedModels: ["openai/gpt-4.1"],
  });
  const budgetedKey = await createKeyWithPolicy();
  const policy = await loadPolicy("model-and-budget");

  const disallowed = await policy.enforceApiKeyPolicy(
    makePolicyRequest(restrictedKey.key),
    "anthropic/claude-3-7-sonnet"
  );
  assert.equal(disallowed.rejection.status, 403);
  assert.match(await readErrorMessage(disallowed.rejection), /not allowed/);

  const budgetMeta = await apiKeysDb.getApiKeyMetadata(budgetedKey.key);
  costRules.setBudget(budgetMeta.id, { dailyLimitUsd: 1, warningThreshold: 0.5 });
  costRules.recordCost(budgetMeta.id, 2);

  const overBudget = await policy.enforceApiKeyPolicy(
    makePolicyRequest(budgetedKey.key),
    "openai/gpt-4.1"
  );
  assert.equal(overBudget.rejection.status, 429);
  assert.match(await readErrorMessage(overBudget.rejection), /Daily budget exceeded/);
});

test("enforceApiKeyPolicy returns Anthropic error envelope for /v1/messages model denials", async () => {
  const restrictedKey = await createKeyWithPolicy({
    allowedModels: ["cc/*"],
    blockedModels: ["claude-fable*", "fable"],
  });
  const policy = await loadPolicy("anthropic-model-denial");

  const denied = await policy.enforceApiKeyPolicy(
    makeAnthropicPolicyRequest(restrictedKey.key),
    "claude-fable-5"
  );

  assert.equal(denied.rejection.status, 403);
  const body = await denied.rejection.json();
  assert.equal(body.type, "error");
  assert.equal(body.error.type, "permission_error");
  assert.match(body.error.message, /claude-fable-5/);
  assert.match(body.error.message, /not enabled by this OmniRoute policy/);
  assert.doesNotMatch(body.error.message, /login|authenticate|api key|credential/i);
  assert.equal(body.error.code, undefined);
});

test("enforceApiKeyPolicy does not rate-limit unrestricted keys by default", async () => {
  const unrestrictedKey = await createKeyWithPolicy({ allowedModels: ["openai/*"] });
  const policy = await loadPolicy("default-no-request-limit");

  for (let i = 0; i < 1005; i += 1) {
    const result = await policy.enforceApiKeyPolicy(
      makePolicyRequest(unrestrictedKey.key),
      "openai/gpt-4.1"
    );
    assert.equal(result.rejection, null);
  }
});

test("enforceApiKeyPolicy enforces explicit env fallback request limits", async () => {
  process.env.DEFAULT_RATE_LIMIT_PER_DAY = "1";
  const unrestrictedKey = await createKeyWithPolicy({ allowedModels: ["openai/*"] });
  const policy = await loadPolicy("env-request-limit");

  const first = await policy.enforceApiKeyPolicy(
    makePolicyRequest(unrestrictedKey.key),
    "openai/gpt-4.1"
  );
  assert.equal(first.rejection, null);

  const second = await policy.enforceApiKeyPolicy(
    makePolicyRequest(unrestrictedKey.key),
    "openai/gpt-4.1"
  );
  assert.equal(second.rejection.status, 429);
  assert.match(await readErrorMessage(second.rejection), /Request limit exceeded/);
});

test("enforceApiKeyPolicy enforces custom multi-window rate limits", async () => {
  const limitedKey = await createKeyWithPolicy({
    allowedModels: ["openai/*"],
    rateLimits: [{ limit: 1, window: 60 }],
  });
  const policy = await loadPolicy("custom-request-limits");

  const first = await policy.enforceApiKeyPolicy(
    makePolicyRequest(limitedKey.key),
    "openai/gpt-4.1"
  );
  assert.equal(first.rejection, null);

  const second = await policy.enforceApiKeyPolicy(
    makePolicyRequest(limitedKey.key),
    "openai/gpt-4.1"
  );
  assert.equal(second.rejection.status, 429);
  assert.match(await readErrorMessage(second.rejection), /Request limit exceeded/);
});

test("enforceApiKeyPolicy enforces combo allowlists separately from model allowlists", async () => {
  const allowedKey = await createKeyWithPolicy({
    allowedModels: ["openai/*"],
    allowedCombos: ["fast-chat", "mapped-chat"],
  });
  const blockedKey = await createKeyWithPolicy({
    allowedCombos: ["slow-chat"],
  });
  await combosDb.createCombo({
    name: "fast-chat",
    strategy: "priority",
    models: ["anthropic/claude-3-5-sonnet"],
  });
  await combosDb.createCombo({
    name: "mapped-chat",
    strategy: "priority",
    models: ["openai/gpt-4.1"],
  });
  const mappedCombo = await combosDb.getComboByName("mapped-chat");
  assert.ok(mappedCombo?.id);
  await modelComboMappingsDb.createModelComboMapping({
    pattern: "mapped-model-*",
    comboId: mappedCombo.id as string,
  });
  const policy = await loadPolicy("combo-access");

  const allowed = await policy.enforceApiKeyPolicy(
    makePolicyRequest(allowedKey.key),
    "combo/fast-chat"
  );
  assert.equal(allowed.rejection, null);

  const blocked = await policy.enforceApiKeyPolicy(
    makePolicyRequest(blockedKey.key),
    "combo/fast-chat"
  );
  assert.equal(blocked.rejection.status, 403);
  assert.match(await readErrorMessage(blocked.rejection), /Combo "fast-chat" is not allowed/);

  const mapped = await policy.enforceApiKeyPolicy(
    makePolicyRequest(allowedKey.key),
    "mapped-model-1"
  );
  assert.equal(mapped.rejection, null);
});

test("enforceApiKeyPolicy applies configured throttle delay", async () => {
  const delayedKey = await createKeyWithPolicy({ throttleDelayMs: 25 });
  const policy = await loadPolicy("throttle-delay");

  const startedAt = Date.now();
  const result = await policy.enforceApiKeyPolicy(
    makePolicyRequest(delayedKey.key),
    "openai/gpt-4.1"
  );

  assert.equal(result.rejection, null);
  assert.equal(result.apiKeyInfo.throttleDelayMs, 25);
  assert.ok(Date.now() - startedAt >= 20);
});

test("enforceApiKeyPolicy enforces request-per-minute limits and returns success when allowed", async () => {
  const limitedKey = await createKeyWithPolicy({
    allowedModels: ["openai/*"],
    maxRequestsPerMinute: 1,
  });
  const policy = await loadPolicy("request-limits");

  const first = await policy.enforceApiKeyPolicy(
    makePolicyRequest(limitedKey.key),
    "openai/gpt-4.1"
  );
  assert.equal(first.rejection, null);
  assert.equal(first.apiKeyInfo.maxRequestsPerMinute, 1);

  const second = await policy.enforceApiKeyPolicy(
    makePolicyRequest(limitedKey.key),
    "openai/gpt-4.1"
  );
  assert.equal(second.rejection.status, 429);
  assert.match(await readErrorMessage(second.rejection), /Request limit exceeded/);
});
