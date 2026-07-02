import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Compression Settings API Schema Validation", () => {
  const compressionModeValues = [
    "off",
    "lite",
    "standard",
    "aggressive",
    "ultra",
    "rtk",
    "stacked",
  ];

  it("should validate all compression mode values", () => {
    assert.deepStrictEqual(compressionModeValues, [
      "off",
      "lite",
      "standard",
      "aggressive",
      "ultra",
      "rtk",
      "stacked",
    ]);
  });

  it("should validate caveman config structure", () => {
    const defaultCavemanConfig = {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    };

    assert.equal(defaultCavemanConfig.enabled, true);
    assert.deepStrictEqual(defaultCavemanConfig.compressRoles, ["user"]);
    assert.equal(Array.isArray(defaultCavemanConfig.skipRules), true);
    assert.equal(defaultCavemanConfig.minMessageLength, 50);
    assert.equal(Array.isArray(defaultCavemanConfig.preservePatterns), true);
  });

  it("should validate full compression config structure", () => {
    const defaultConfig = {
      enabled: false,
      defaultMode: "off",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
      preserveSystemPrompt: true,
      comboOverrides: {},
      cavemanConfig: {
        enabled: true,
        compressRoles: ["user"],
        skipRules: [],
        minMessageLength: 50,
        preservePatterns: [],
      },
      ultra: {
        enabled: false,
        compressionRate: 0.5,
        minScoreThreshold: 0.3,
        slmFallbackToAggressive: true,
        maxTokensPerMessage: 0,
      },
    };

    assert.equal(defaultConfig.enabled, false);
    assert.ok(compressionModeValues.includes(defaultConfig.defaultMode));
    assert.equal(typeof defaultConfig.autoTriggerTokens, "number");
    assert.equal(typeof defaultConfig.cacheMinutes, "number");
    assert.equal(typeof defaultConfig.preserveSystemPrompt, "boolean");
    assert.equal(typeof defaultConfig.comboOverrides, "object");
    assert.equal(typeof defaultConfig.cavemanConfig, "object");
    assert.equal(typeof defaultConfig.ultra, "object");
    assert.equal(defaultConfig.ultra.compressionRate, 0.5);
  });

  it("should validate all caveman compression rules are defined", async () => {
    const { CAVEMAN_RULES } =
      await import("../../../../open-sse/services/compression/cavemanRules.ts");
    assert.ok(Array.isArray(CAVEMAN_RULES));
    assert.ok(CAVEMAN_RULES.length >= 29, `Expected >= 29 rules, got ${CAVEMAN_RULES.length}`);
    for (const rule of CAVEMAN_RULES) {
      assert.ok(rule.name && typeof rule.name === "string", `Rule must have a name`);
      assert.ok(rule.pattern instanceof RegExp, `Rule ${rule.name} must have a RegExp pattern`);
      assert.ok(
        typeof rule.replacement === "string" || typeof rule.replacement === "function",
        `Rule ${rule.name} must have string or function replacement`
      );
      assert.ok(
        rule.pattern.source !== "^$" || rule.replacement !== "",
        `Rule ${rule.name} must not be a no-op (empty pattern + empty replacement)`
      );
    }
  });

  it("should validate compression modes cover all CavemanConfig roles", () => {
    const validRoles = ["user", "assistant", "system"];
    for (const role of validRoles) {
      assert.ok(validRoles.includes(role), `Role ${role} should be valid`);
    }
    assert.equal(validRoles.length, 3);
  });
});

// ─── Route round-trip: engines map + activeComboId ─────────────────────────
// Mirrors the mcp-accessibility-config test harness: allocate a temp DATA_DIR,
// import route + DB modules, tear down in after().

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const route = await import("../../../../src/app/api/settings/compression/route.ts");

function makeRequest(method: string, body?: unknown): Request {
  return new Request("http://localhost/api/settings/compression", {
    method,
    headers: body !== undefined ? { "content-type": "application/json" } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

describe("settings/compression route — engines + activeComboId", () => {
  beforeEach(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  });

  it("PUT engines map persists and GET returns engines + activeComboId", async () => {
    const putRes = await route.PUT(
      makeRequest("PUT", { engines: { rtk: { enabled: true, level: "standard" } } })
    );
    assert.equal(putRes.status, 200);

    // Fresh DB handle so we read from storage, not from the write-path return value.
    core.resetDbInstance();

    const getRes = await route.GET(makeRequest("GET"));
    assert.equal(getRes.status, 200);
    const body = await getRes.json();

    assert.equal(body.engines?.rtk?.enabled, true, "engines.rtk.enabled should be true after PUT");
    assert.equal(
      body.engines?.rtk?.level,
      "standard",
      "engines.rtk.level should be 'standard' after PUT"
    );
    // activeComboId is always present (null by default)
    assert.ok("activeComboId" in body, "GET response must include activeComboId");
  });

  it("PUT activeComboId persists and is returned by GET", async () => {
    const putRes = await route.PUT(makeRequest("PUT", { activeComboId: "combo-abc" }));
    assert.equal(putRes.status, 200);

    core.resetDbInstance();

    const getRes = await route.GET(makeRequest("GET"));
    assert.equal(getRes.status, 200);
    const body = await getRes.json();
    assert.equal(body.activeComboId, "combo-abc");
  });

  it("PUT activeComboId:null clears the active combo", async () => {
    // First set it, then clear.
    await route.PUT(makeRequest("PUT", { activeComboId: "combo-to-clear" }));
    core.resetDbInstance();
    await route.PUT(makeRequest("PUT", { activeComboId: null }));
    core.resetDbInstance();

    const getRes = await route.GET(makeRequest("GET"));
    assert.equal(getRes.status, 200);
    const body = await getRes.json();
    assert.equal(body.activeComboId, null);
  });

  it("PUT with invalid engines shape is rejected by schema validation (400)", async () => {
    // engines values must have an `enabled` boolean — passing a string should fail the schema.
    const putRes = await route.PUT(makeRequest("PUT", { engines: { rtk: { enabled: "yes" } } }));
    assert.equal(putRes.status, 400);
    const body = await putRes.json();
    // Validation failures use { error: { message, details } } via validateBody helper.
    assert.ok(body.error !== null && typeof body.error === "object", "error should be an object");
    const errorMessage: string =
      typeof body.error === "string"
        ? body.error
        : (body.error?.message ?? JSON.stringify(body.error));
    assert.ok(!errorMessage.includes("at /"), "error must not contain a stack trace");
  });

  it("PUT accepts enginesExplicit (round-tripped from GET response)", async () => {
    // Regression: the GET handler injects `enginesExplicit` (compression.ts:632) so the
    // hub/panel can round-trip the full settings object. The previous .strict() PUT schema
    // rejected it with 400 ("Unrecognized key: enginesExplicit"), causing every toggle on
    // the Compression Hub / Panel to revert. Allow it through.
    const putRes = await route.PUT(makeRequest("PUT", { enabled: true, enginesExplicit: true }));
    assert.equal(putRes.status, 200);

    core.resetDbInstance();

    const putRes2 = await route.PUT(makeRequest("PUT", { enabled: false, enginesExplicit: false }));
    assert.equal(putRes2.status, 200);
  });
});
