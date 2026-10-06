// Regression guards for #15159 M-05: the MCP advanced tools returned the RAW
// upstream body to the client. Each private `apiFetch` throws
// `API [status]: <raw response text>`, and17 catches in advancedTools.ts plus
// 1 in pickFastestModel.ts interpolated `err.message` straight into the
// client-facing tool result (`{ content: [...], isError: true }`) without
// routing through `toSafeMcpErrorMessage` (the M-08 canonical pattern).
//
// These tests drive the real handlers through a mocked failing upstream and
// assert the tool result carries only sanitized text: no upstream credentials,
// no stack frames, no absolute paths.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Hermetic DATA_DIR before any transitive DB import — logToolCall resolves
// DATA_DIR lazily, so pointing it at a temp dir keeps audit rows out of the
// real install (see account-fallback-service.test.ts for the same pattern).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mcp-m05-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleSyncPricing, handleTestCombo } =
  await import("../../open-sse/mcp-server/tools/advancedTools.ts");
const { handlePickFastestModel } =
  await import("../../open-sse/mcp-server/tools/pickFastestModel.ts");
// The handlers call logToolCall(), which opens the MCP audit DB (and the app DB
// singleton) under DATA_DIR. Both handles must be released before the temp dir can
// be removed — on Windows an open handle makes rmSync fail with EPERM.
const { closeAuditDb } = await import("../../open-sse/mcp-server/audit.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const SECRET = "sk-live-SECRET123";
const STACK_PATH = "/srv/app/dist/index.js";
const RAW_BODY = `upstream exploded api_key=${SECRET} at Object.<anonymous> (${STACK_PATH}:10:5)`;

const realFetch = globalThis.fetch;

type ToolResult = { content: Array<{ text: string }>; isError?: boolean };

function failWithRawBody(): void {
  globalThis.fetch = (async () => new Response(RAW_BODY, { status: 500 })) as typeof fetch;
}

function restoreFetch(): void {
  globalThis.fetch = realFetch;
}

function assertSanitized(result: ToolResult): void {
  const text = result.content[0]?.text ?? "";
  assert.ok(!text.includes(SECRET), `leaked upstream credential: ${text}`);
  assert.ok(!text.includes(STACK_PATH), `leaked absolute path: ${text}`);
}

test.after(() => {
  restoreFetch();
  // Release the SQLite handles opened during the handlers' audit writes before
  // removing the temp DATA_DIR (see AGENTS.md "Database Handles in Tests").
  closeAuditDb();
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("M-05: handleSyncPricing returns a sanitized error, not the raw upstream body", async () => {
  failWithRawBody();
  try {
    const result = (await handleSyncPricing({ sources: ["openai"], dryRun: false })) as ToolResult;
    assert.equal(result.isError, true, "expected an isError tool result");
    const text = result.content[0]?.text ?? "";
    assert.ok(text.startsWith("Error: API [500]"), `unexpected result shape: ${text}`);
    assertSanitized(result);
  } finally {
    restoreFetch();
  }
});

test("M-05: handleTestCombo per-provider error field is sanitized", async () => {
  const combos = [
    { id: "c1", name: "fast", enabled: true, models: [{ provider: "openai", model: "gpt-4o" }] },
  ];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (init?.method !== "PUT" && url.endsWith("/api/combos")) {
      return new Response(JSON.stringify({ combos }), { status: 200 });
    }
    // Every chat-completion probe fails with the raw upstream body.
    return new Response(RAW_BODY, { status: 500 });
  }) as typeof fetch;
  try {
    const result = (await handleTestCombo({ comboId: "c1", testPrompt: "hi" })) as ToolResult;
    assertSanitized(result);
    const text = result.content[0]?.text ?? "";
    // JSON.stringify adds a space after colon: "success": false
    assert.ok(text.includes('"success": false'), `expected a failed provider probe: ${text}`);
  } finally {
    restoreFetch();
  }
});

test("M-05: handlePickFastestModel sanitizes an upstream failure while applying the winner", async () => {
  const combos = [
    { id: "c1", name: "fast", enabled: true, models: [{ provider: "openai", model: "gpt-4o" }] },
  ];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (init?.method !== "PUT" && url.endsWith("/api/combos")) {
      return new Response(JSON.stringify({ combos }), { status: 200 });
    }
    if (init?.method === "PUT") {
      // applyWinnerToCombo's PUT fails with the raw upstream body.
      return new Response(RAW_BODY, { status: 500 });
    }
    // Telemetry endpoints fail too — fetchTelemetrySources absorbs those.
    return new Response(RAW_BODY, { status: 500 });
  }) as typeof fetch;
  try {
    const result = (await handlePickFastestModel({
      comboId: "c1",
      applyToCombo: true,
      limit: 1,
    })) as ToolResult;
    assert.equal(result.isError, true, "expected an isError tool result");
    const text = result.content[0]?.text ?? "";
    assert.ok(text.startsWith("Error: API [500]"), `unexpected result shape: ${text}`);
    assertSanitized(result);
  } finally {
    restoreFetch();
  }
});
