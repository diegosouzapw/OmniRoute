import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Temp dirs ──
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugins-config-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// ── Dynamic imports (after DATA_DIR set) ──
const core = await import("../../src/lib/db/core.ts");
const dbPlugins = await import("../../src/lib/db/plugins.ts");

// ── Extract validation logic for direct testing ──
// We replicate the route's validation logic here since Next.js route handlers
// are hard to test without the full Next.js runtime.

interface ConfigField {
  type: string;
  default?: unknown;
  min?: number;
  max?: number;
  enum?: string[];
  description?: string;
}

function validateConfig(
  config: Record<string, unknown>,
  configSchema: Record<string, ConfigField>
): { valid: true } | { valid: false; error: string } {
  if (!configSchema || typeof configSchema !== "object") return { valid: true };

  const typeChecks: Record<string, (v: unknown) => boolean> = {
    string: (v) => typeof v === "string",
    number: (v) => typeof v === "number",
    boolean: (v) => typeof v === "boolean",
  };

  for (const [key, def] of Object.entries(configSchema)) {
    const val = config[key];
    if (val === undefined) continue;

    const check = typeChecks[def.type];
    if (check && !check(val)) {
      return { valid: false, error: `Config key '${key}' must be a ${def.type}` };
    }
    if (def.enum && !(def.enum as unknown[]).includes(val)) {
      return { valid: false, error: `Config key '${key}' must be one of: ${(def.enum as string[]).join(", ")}` };
    }
    if (def.min !== undefined) {
      const limit = def.min;
      const size = typeof val === "string" ? val.length : typeof val === "number" ? val : undefined;
      if (size !== undefined && size < limit) {
        return { valid: false, error: `Config key '${key}' must be at least ${limit}${typeof val === "string" ? " characters" : ""}` };
      }
    }
    if (def.max !== undefined && typeof val === "number" && val > def.max) {
      return { valid: false, error: `Config key '${key}' must be at most ${def.max}` };
    }
  }
  return { valid: true };
}

// ── Lifecycle ──

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch {}
});

// ── Test schema ──

const testSchema: Record<string, ConfigField> = {
  apiUrl: { type: "string", description: "API endpoint" },
  maxRetries: { type: "number", min: 1, max: 10, default: 3 },
  debug: { type: "boolean", default: false },
  mode: { type: "string", enum: ["fast", "slow", "auto"], default: "auto" },
};

// ── DB operations (same as route GET/PUT) ──

test("GET: returns config and schema for existing plugin", () => {
  dbPlugins.insertPlugin({
    id: "test-1",
    name: "config-get-test",
    version: "1.0.0",
    main: "index.js",
    pluginDir: "/tmp/test",
    manifest: {},
    config: { apiUrl: "https://api.test.com" },
    configSchema: testSchema,
  });

  const plugin = dbPlugins.getPluginByName("config-get-test");
  assert.ok(plugin);

  const config = JSON.parse(plugin!.config || "{}");
  const configSchema = JSON.parse(plugin!.configSchema || "{}");

  assert.equal(config.apiUrl, "https://api.test.com");
  assert.equal(configSchema.apiUrl.type, "string");
  assert.equal(configSchema.maxRetries.min, 1);
});

test("GET: returns null for nonexistent plugin", () => {
  const plugin = dbPlugins.getPluginByName("no-such-plugin");
  assert.equal(plugin, null);
});

test("PUT: updates config via updatePluginConfig", () => {
  dbPlugins.insertPlugin({
    id: "test-2",
    name: "config-put-test",
    version: "1.0.0",
    main: "index.js",
    pluginDir: "/tmp/test",
    manifest: {},
    config: {},
    configSchema: testSchema,
  });

  const success = dbPlugins.updatePluginConfig("config-put-test", { apiUrl: "https://new.api.com" });
  assert.ok(success);

  const plugin = dbPlugins.getPluginByName("config-put-test");
  const config = JSON.parse(plugin!.config);
  assert.equal(config.apiUrl, "https://new.api.com");
});

test("PUT: returns false for nonexistent plugin", () => {
  const success = dbPlugins.updatePluginConfig("ghost", { key: "value" });
  assert.equal(success, false);
});

// ── Validation logic ──

test("validation: accepts valid string config", () => {
  const result = validateConfig({ apiUrl: "https://example.com" }, testSchema);
  assert.equal(result.valid, true);
});

test("validation: rejects non-string for string field", () => {
  const result = validateConfig({ apiUrl: 123 }, testSchema);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.error.includes("must be a string"));
  }
});

test("validation: accepts valid number config", () => {
  const result = validateConfig({ maxRetries: 5 }, testSchema);
  assert.equal(result.valid, true);
});

test("validation: rejects non-number for number field", () => {
  const result = validateConfig({ maxRetries: "five" }, testSchema);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.error.includes("must be a number"));
  }
});

test("validation: accepts valid boolean config", () => {
  const result = validateConfig({ debug: true }, testSchema);
  assert.equal(result.valid, true);
});

test("validation: rejects non-boolean for boolean field", () => {
  const result = validateConfig({ debug: "yes" }, testSchema);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.error.includes("must be a boolean"));
  }
});

test("validation: accepts valid enum value", () => {
  const result = validateConfig({ mode: "fast" }, testSchema);
  assert.equal(result.valid, true);
});

test("validation: rejects invalid enum value", () => {
  const result = validateConfig({ mode: "turbo" }, testSchema);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.error.includes("must be one of: fast, slow, auto"));
  }
});

test("validation: accepts number within min/max range", () => {
  const result = validateConfig({ maxRetries: 5 }, testSchema);
  assert.equal(result.valid, true);
});

test("validation: rejects number below min", () => {
  const result = validateConfig({ maxRetries: 0 }, testSchema);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.error.includes("must be at least 1"));
  }
});

test("validation: rejects number above max", () => {
  const result = validateConfig({ maxRetries: 15 }, testSchema);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.error.includes("must be at most 10"));
  }
});

test("validation: accepts string meeting min length", () => {
  const schema: Record<string, ConfigField> = { name: { type: "string", min: 3 } };
  const result = validateConfig({ name: "abc" }, schema);
  assert.equal(result.valid, true);
});

test("validation: rejects string below min length", () => {
  const schema: Record<string, ConfigField> = { name: { type: "string", min: 3 } };
  const result = validateConfig({ name: "ab" }, schema);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.error.includes("must be at least 3 characters"));
  }
});

test("validation: skips undefined keys", () => {
  const result = validateConfig({}, testSchema);
  assert.equal(result.valid, true);
});

test("validation: passes with empty schema", () => {
  const result = validateConfig({ anything: "goes" }, {});
  assert.equal(result.valid, true);
});

test("validation: passes with null schema", () => {
  const result = validateConfig({ anything: "goes" }, null as any);
  assert.equal(result.valid, true);
});

test("validation: handles multiple field errors (reports first)", () => {
  const result = validateConfig({ apiUrl: 123, debug: "yes" }, testSchema);
  assert.equal(result.valid, false);
  // Should report the first error found
  if (!result.valid) {
    assert.ok(result.error.includes("must be a"));
  }
});
