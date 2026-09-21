import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-management-boundary-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;
const ORIGINAL_DISABLE_BACKUP = process.env.DISABLE_SQLITE_AUTO_BACKUP;

fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "1";

const core = await import("../../../src/lib/db/core.ts");
const usageHistory = await import("../../../src/lib/usage/usageHistory.ts");
const logsRoute = await import("../../../src/app/api/logs/[id]/route.ts");
const usageHistoryRoute = await import("../../../src/app/api/usage/history/route.ts");

test.afterEach(() => {
  usageHistory.clearPendingRequests();
});

test.after(() => {
  usageHistory.clearPendingRequests();
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  if (ORIGINAL_DISABLE_BACKUP === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  else process.env.DISABLE_SQLITE_AUTO_BACKUP = ORIGINAL_DISABLE_BACKUP;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const HOSTILE =
  "Bearer management-cache-secret at /srv/private/completed-request.ts:12:3\n" +
  "    at finalize (/srv/private/finalize.ts:4:2)";

async function readManagementDetail(id: string): Promise<Record<string, unknown>> {
  const response = await logsRoute.GET(undefined as unknown as Request, { params: { id } });
  assert.equal(response.status, 200);
  return (await response.json()) as Record<string, unknown>;
}

function serializedDetail(detail: Record<string, unknown>): string {
  return JSON.stringify(detail);
}

test("management detail sanitizes in-flight failure chunks at the endpoint boundary", async () => {
  const requestId = usageHistory.trackPendingRequest("model", "provider", "conn-inflight", true);
  assert.ok(requestId);
  usageHistory.updatePendingRequestStreamChunks("model", "provider", "conn-inflight", {
    provider: [`event: error\ndata: ${HOSTILE}\n\n`],
    openai: [],
    client: [],
  });

  const detail = await readManagementDetail(requestId);
  assert.doesNotMatch(
    serializedDetail(detail),
    /management-cache-secret|srv\/private|completed-request\.ts|\bat finalize\b/i
  );
});

test("management detail sanitizes completed error metadata and cached chunks", async () => {
  const requestId = usageHistory.trackPendingRequest("model", "provider", "conn-completed", true);
  assert.ok(requestId);
  usageHistory.updatePendingRequestStreamChunks("model", "provider", "conn-completed", {
    provider: [`data: ${JSON.stringify({ type: "error", message: HOSTILE })}\n\n`],
    openai: [],
    client: [],
  });
  assert.equal(
    usageHistory.finalizePendingRequestById(requestId, { status: 502, error: HOSTILE }),
    true
  );

  const detail = await readManagementDetail(requestId);
  assert.doesNotMatch(
    serializedDetail(detail),
    /management-cache-secret|srv\/private|completed-request\.ts|\bat finalize\b/i
  );
});

test("usage history endpoint exposes pending counters without raw request details", async () => {
  const requestId = usageHistory.trackPendingRequest("model", "provider", "conn-usage", true);
  assert.ok(requestId);
  usageHistory.updatePendingRequestStreamChunks("model", "provider", "conn-usage", {
    provider: [`event: error\ndata: ${HOSTILE}\n\n`],
    openai: [],
    client: [],
  });

  const response = await usageHistoryRoute.GET(undefined as unknown as Request);
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    pending?: { byModel?: Record<string, number>; details?: unknown };
  };
  assert.equal(body.pending?.byModel?.["model (provider)"], 1);
  assert.equal("details" in (body.pending ?? {}), false);
  assert.doesNotMatch(JSON.stringify(body), /management-cache-secret|srv\/private/i);
});
