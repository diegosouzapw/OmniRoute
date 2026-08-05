import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-image-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-image-route-test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");

const originalFetch = globalThis.fetch;

interface ImageResponseBody {
  data: Array<{ b64_json?: string; url?: string }>;
}

interface ErrorResponseBody {
  error: { message: string; code?: string };
}

interface ImageCallLogRow {
  account: string | null;
  connection_id: string | null;
  model: string;
  status: number;
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  accountFallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCodexConnection(overrides: {
  apiKey: string;
  name?: string;
  priority?: number;
  providerSpecificData?: Record<string, unknown>;
}) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: overrides.name ?? `codex-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    isActive: true,
    priority: overrides.priority,
    testStatus: "active",
    providerSpecificData: overrides.providerSpecificData ?? {},
  });
}

function codexImageSuccessResponse(result = "Y29kZXgtaW1hZ2U="): Response {
  const event = {
    type: "response.output_item.done",
    item: {
      type: "image_generation_call",
      id: "ig_route_test",
      status: "completed",
      result,
    },
  };
  return new Response(`data: ${JSON.stringify(event)}\n\ndata: [DONE]\n\n`, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function postCodexImageGeneration(): Promise<Response> {
  return imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "codex/gpt-5.6-sol",
        prompt: "draw a route regression guard",
        response_format: "b64_json",
      }),
    })
  );
}

async function waitForImageCallLogs(
  expectedCount: number,
  connectionIds: string[] = []
): Promise<ImageCallLogRow[]> {
  const db = core.getDbInstance();
  const expectedConnectionIds = new Set(connectionIds);
  const deadline = Date.now() + 2_000;
  let rows: ImageCallLogRow[] = [];
  while (rows.length < expectedCount && Date.now() < deadline) {
    const persistedRows = db
      .prepare(
        "SELECT account, connection_id, model, status FROM call_logs WHERE path = ? ORDER BY timestamp ASC, id ASC"
      )
      .all("/v1/images/generations") as ImageCallLogRow[];
    rows =
      expectedConnectionIds.size > 0
        ? persistedRows.filter(
            (row) => row.connection_id && expectedConnectionIds.has(row.connection_id)
          )
        : persistedRows;
    if (rows.length < expectedCount) {
      await new Promise<void>((resolve) => setTimeout(resolve, 10));
    }
  }
  return rows;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  accountFallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("skips Codex accounts that exclude the requested image model", async () => {
  await seedCodexConnection({
    apiKey: "excluded-token",
    priority: 1,
    providerSpecificData: { excludedModels: ["gpt-5.6-sol"] },
  });
  await seedCodexConnection({ apiKey: "eligible-token", priority: 2 });

  const authorizations: string[] = [];
  globalThis.fetch = async (_url, options: RequestInit = {}) => {
    const headers = options.headers as Record<string, string>;
    authorizations.push(headers.Authorization);
    return codexImageSuccessResponse();
  };

  const response = await postCodexImageGeneration();

  assert.equal(response.status, 200);
  assert.deepEqual(authorizations, ["Bearer eligible-token"]);
});

test("retries one Codex sibling for the ChatGPT account model-access error", async () => {
  const unsupportedConnection = await seedCodexConnection({
    apiKey: "unsupported-token",
    name: "codex-unsupported-account",
    priority: 1,
  });
  const supportedConnection = await seedCodexConnection({
    apiKey: "supported-token",
    name: "codex-supported-account",
    priority: 2,
  });

  const authorizations: string[] = [];
  globalThis.fetch = async (_url, options: RequestInit = {}) => {
    const headers = options.headers as Record<string, string>;
    authorizations.push(headers.Authorization);
    if (headers.Authorization === "Bearer unsupported-token") {
      return new Response(
        JSON.stringify({
          detail:
            "The 'gpt-5.6-sol' model is not supported when using Codex with a ChatGPT account.",
        }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }
    return codexImageSuccessResponse("ZmFsbGJhY2staW1hZ2U=");
  };

  const response = await postCodexImageGeneration();
  const body = (await response.json()) as ImageResponseBody;

  assert.equal(response.status, 200);
  assert.equal(body.data[0].b64_json, "ZmFsbGJhY2staW1hZ2U=");
  assert.deepEqual(authorizations, ["Bearer unsupported-token", "Bearer supported-token"]);

  const callLogs = await waitForImageCallLogs(2, [
    unsupportedConnection.id,
    supportedConnection.id,
  ]);
  assert.deepEqual(
    callLogs.map((row) => ({
      account: row.account,
      connectionId: row.connection_id,
      status: row.status,
    })),
    [
      {
        account: "codex-unsupported-account",
        connectionId: unsupportedConnection.id,
        status: 400,
      },
      {
        account: "codex-supported-account",
        connectionId: supportedConnection.id,
        status: 200,
      },
    ]
  );

  const nextResponse = await postCodexImageGeneration();
  assert.equal(nextResponse.status, 200);
  assert.deepEqual(authorizations, [
    "Bearer unsupported-token",
    "Bearer supported-token",
    "Bearer supported-token",
  ]);
});

test("does not retry ordinary Codex 400 responses", async () => {
  await seedCodexConnection({ apiKey: "invalid-request-token", priority: 1 });
  await seedCodexConnection({ apiKey: "unused-token", priority: 2 });

  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return new Response(JSON.stringify({ detail: "invalid image size" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  };

  const response = await postCodexImageGeneration();
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 400);
  assert.match(body.error.message, /invalid image size/i);
  assert.equal(fetchCount, 1);
});

test("stops after one Codex account fallback", async () => {
  await seedCodexConnection({ apiKey: "unsupported-first-token", priority: 1 });
  await seedCodexConnection({ apiKey: "unsupported-second-token", priority: 2 });

  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return new Response(
      JSON.stringify({
        detail: "The 'gpt-5.6-sol' model is not supported when using Codex with a ChatGPT account.",
      }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  };

  const response = await postCodexImageGeneration();

  assert.equal(response.status, 400);
  assert.equal(fetchCount, 2);
});

test("attributes Codex image call logs to the selected connection", async () => {
  const connection = await seedCodexConnection({
    apiKey: "attributed-token",
    name: "codex-attributed-account",
  });
  globalThis.fetch = async () => codexImageSuccessResponse();

  const response = await postCodexImageGeneration();
  assert.equal(response.status, 200);

  const [row] = await waitForImageCallLogs(1, [connection.id]);

  assert.ok(row);
  assert.equal(row.connection_id, connection.id);
  assert.equal(row.account, "codex-attributed-account");
  assert.equal(row.model, "codex/gpt-5.6-sol");
  assert.equal(row.status, 200);
});
