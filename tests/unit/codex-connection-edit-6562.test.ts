// Regression guard for #6562 — editing any existing OpenAI Codex provider
// connection returned "Invalid request" on save.
//
// Root cause: `createProviderConnection()` (src/lib/db/providers.ts) auto-
// increments a new connection's `priority` to `MAX(priority)+1` per provider,
// with NO upper bound — and OAuth-imported connections (Codex `codex-auth/
// import` and `import-bulk`, up to 50 accounts per call, callable repeatedly)
// never go through `createProviderSchema`'s Zod validation at all, so nothing
// ever capped that value at creation time. Codex's own bulk-account-rotation
// workflow (a common Codex workaround for per-account rate limits) routinely
// pushes a user well past 100 same-provider connections. `EditConnectionModal`
// always round-trips the connection's current `priority` unchanged on save
// (src/app/.../modals/EditConnectionModal.tsx `handleSubmit` — `priority:
// formData.priority` is unconditional), so the *existing, already-valid*
// priority gets resent as-is. `updateProviderConnectionSchema` capped
// `priority`/`globalPriority` at `max(100)` — a UI-only ceiling nothing on the
// create path ever enforced — so any connection whose priority had already
// grown past 100 failed re-validation on every single edit with "Invalid
// request", regardless of which field the user changed.
//
// Fix: raise the schema ceiling to `max(100_000)` — still bounded (a
// genuinely out-of-range value is rejected, see the control test below), just
// wide enough to accept priorities the app itself already produces.
//
// This test drives the real PUT handler with a realistic Codex OAuth edit
// payload (as EditConnectionModal.tsx actually builds it) against a
// connection whose priority already exceeds the old 100 cap, and asserts it
// validates + persists instead of 400ing with "Invalid request".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-edit-6562-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-codex-edit-6562";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } = await import(
  "../../src/lib/db/providers.ts"
);
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function createCodexConnection(priority: number) {
  // Mirrors createConnectionFromAuthFile()'s real Codex-import shape
  // (src/lib/oauth/utils/codexAuthImport.ts) — an OAuth connection whose
  // providerSpecificData already carries a normalized `requestDefaults`
  // (e.g. from a prior edit) alongside the workspaceId/chatgptUserId/importedAt
  // fields the importer writes. `priority` is passed explicitly here to
  // simulate the auto-increment (`MAX(priority)+1`, unbounded) a real user's
  // Nth bulk-imported Codex account would already carry.
  return createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex (imported)",
    email: "user@example.com",
    priority,
    accessToken: "access-token-value",
    refreshToken: "refresh-token-value",
    idToken: "id-token-value",
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      workspaceId: "workspace-abc",
      chatgptUserId: "user-123",
      importedAt: new Date().toISOString(),
      requestDefaults: { reasoningEffort: "medium", serviceTier: "fast" },
    },
  });
}

// Builds the exact `updates` body EditConnectionModal.tsx's handleSubmit()
// constructs for a Codex OAuth connection edit (isOAuth branch + isCodex
// block) — `priority` is always resent unchanged (line: `priority:
// formData.priority`), which is exactly what round-trips the pre-existing,
// already-persisted value that triggers #6562.
function buildCodexEditPayload(connection: Record<string, unknown>) {
  return {
    name: connection.name,
    priority: connection.priority,
    maxConcurrent: null,
    healthCheckInterval: connection.healthCheckInterval ?? 60,
    rateLimitOverrides: null,
    providerSpecificData: {
      ...((connection.providerSpecificData as Record<string, unknown>) || {}),
      tag: undefined,
      tags: undefined,
      excludedModels: undefined,
      requestDefaults: { reasoningEffort: "high" },
      openaiStoreEnabled: false,
      disableCooling: undefined,
    },
  };
}

test("PUT /api/providers/[id] persists a Codex OAuth edit when priority already exceeds the old 100 cap (#6562 RED->GREEN)", async () => {
  // Simulates the Nth connection from a Codex bulk-account-rotation user —
  // auto-incremented priority with no upstream cap.
  const connection = (await createCodexConnection(142)) as Record<string, unknown>;
  assert.equal(connection.provider, "codex");
  assert.equal(connection.authType, "oauth");
  assert.equal(connection.priority, 142);

  const payload = buildCodexEditPayload(connection);

  const request = await makeManagementSessionRequest(
    `http://localhost/api/providers/${connection.id}`,
    { method: "PUT", body: payload }
  );

  const response = await providerByIdRoute.PUT(request, {
    params: Promise.resolve({ id: connection.id as string }),
  });
  const body = await response.json();

  assert.equal(
    response.status,
    200,
    `expected the Codex edit to validate + persist, got ${response.status}: ${JSON.stringify(body)}`
  );
  assert.notEqual(body?.error?.message, "Invalid request");

  const persisted = (await getProviderConnectionById(connection.id as string)) as Record<
    string,
    unknown
  >;
  // `updateProviderConnection` renormalizes every same-provider connection's
  // priority to a dense 1..N sequence whenever `priority` is part of the
  // update (`_reorderConnections`, src/lib/db/providers.ts) — this is the
  // connection's first successful edit, so it lands at rank 1 (only Codex
  // connection in this test). The point of this assertion is that the save
  // *persisted* at all instead of 400ing before ever reaching that step.
  assert.equal(persisted.priority, 1);
  const persistedPsd = persisted.providerSpecificData as Record<string, unknown>;
  assert.deepEqual(persistedPsd.requestDefaults, { reasoningEffort: "high" });
});

test("PUT /api/providers/[id] still rejects a genuinely invalid priority (control)", async () => {
  const connection = (await createCodexConnection(5)) as Record<string, unknown>;

  const payload = { ...buildCodexEditPayload(connection), priority: 500_000 };

  const request = await makeManagementSessionRequest(
    `http://localhost/api/providers/${connection.id}`,
    { method: "PUT", body: payload }
  );

  const response = await providerByIdRoute.PUT(request, {
    params: Promise.resolve({ id: connection.id as string }),
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body?.error?.message, "Invalid request");
});
