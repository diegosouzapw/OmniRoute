import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { mcpAccessibilityConfigSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";

// mcpAccessibility tunes how the MCP server filters oversized tool outputs: server.ts reads the
// `compression/mcpAccessibility` DB key on every tool call (readMcpAccessibilityConfig). The
// #4206 numeric bounds existed but were unreachable in production — no write route, and the
// settings PUT schema (.strict()) rejected the key, so get/setMcpAccessibilityConfig had no
// callers. This proves the new schema + dedicated sub-route + DB round-trip make the config
// settable end to end, with clampMcpAccessibilityConfig owning the numeric floors.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mcpaccess-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const { getMcpAccessibilityConfig, setMcpAccessibilityConfig } =
  await import("../../../src/lib/db/compression.ts");
const route = await import("../../../src/app/api/settings/compression/mcp-accessibility/route.ts");

async function resetDir() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ requireLogin: false });
}

describe("mcpAccessibility config reachability", () => {
  beforeEach(resetDir);
  afterEach(() => core.resetDbInstance());
  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
    if (ORIGINAL_INITIAL_PASSWORD === undefined) {
      delete process.env.INITIAL_PASSWORD;
    } else {
      process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
    }
    if (ORIGINAL_JWT_SECRET === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
    }
  });

  it("validates partial updates and rejects unknown / invalid fields", () => {
    assert.equal(
      mcpAccessibilityConfigSchema.safeParse({ enabled: false, maxTextChars: 8000 }).success,
      true
    );
    // unknown key rejected (.strict)
    assert.equal(mcpAccessibilityConfigSchema.safeParse({ bogus: 1 }).success, false);
    // non-positive maxTextChars rejected at the schema boundary
    assert.equal(mcpAccessibilityConfigSchema.safeParse({ maxTextChars: -5 }).success, false);
    assert.equal(mcpAccessibilityConfigSchema.safeParse({ collapseThreshold: 0 }).success, false);
  });

  it("persists a partial update through set/getMcpAccessibilityConfig (clamp owns floors)", async () => {
    await setMcpAccessibilityConfig({ maxTextChars: 8000, collapseThreshold: 12 });
    let cfg = await getMcpAccessibilityConfig();
    assert.equal(cfg.maxTextChars, 8000);
    assert.equal(cfg.collapseThreshold, 12);

    // below the engine floor (MCP_ACCESSIBILITY_MIN_MAX_TEXT_CHARS) → clamp reverts to the
    // default, the documented "misconfiguration falls back to the default" behavior.
    await setMcpAccessibilityConfig({ maxTextChars: 100 });
    cfg = await getMcpAccessibilityConfig();
    assert.equal(cfg.maxTextChars, 50000);
  });

  it("PUT + GET round-trip through the dedicated sub-route persists the config", async () => {
    const putRes = await route.PUT(
      new Request("http://localhost/api/settings/compression/mcp-accessibility", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ maxTextChars: 12000, minLengthToProcess: 500 }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
    assert.equal(putRes.status, 200);
    const putBody = await putRes.json();
    assert.equal(putBody.maxTextChars, 12000);
    assert.equal(putBody.minLengthToProcess, 500);

    // Survives a fresh read from a new DB handle (not just the write-path return value).
    core.resetDbInstance();
    const getRes = await route.GET(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Request("http://localhost/api/settings/compression/mcp-accessibility") as any
    );
    assert.equal(getRes.status, 200);
    const getBody = await getRes.json();
    assert.equal(getBody.maxTextChars, 12000);
    assert.equal(getBody.minLengthToProcess, 500);
  });

  it("PUT merges over the current config (does not reset untouched fields)", async () => {
    await setMcpAccessibilityConfig({ maxTextChars: 12000, collapseThreshold: 9 });

    const putRes = await route.PUT(
      new Request("http://localhost/api/settings/compression/mcp-accessibility", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enabled: false }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
    assert.equal(putRes.status, 200);
    const body = await putRes.json();
    assert.equal(body.enabled, false);
    // untouched fields preserved (partial-merge-over-current, not over the defaults)
    assert.equal(body.maxTextChars, 12000);
    assert.equal(body.collapseThreshold, 9);
  });
});
