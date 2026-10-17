// PUT /api/providers/[id] validates providerSpecificData.githubCreditLimit
// (finite, >= 0, or null to disable) and never leaks a stack trace on reject.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gh-credit-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-gh-credit-limit";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");
const { updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas/provider.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createGithubConnection() {
  return (await createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "Copilot",
    accessToken: "gho_access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { copilotToken: "tid=abc" },
  })) as Record<string, unknown>;
}

async function putPsd(id: string, providerSpecificData: Record<string, unknown>) {
  const request = await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
    method: "PUT",
    body: { providerSpecificData },
  });
  return providerByIdRoute.PUT(request, { params: Promise.resolve({ id }) });
}

test("schema rejects negative, non-finite and non-numeric credit limits", () => {
  for (const bad of [-1, "40", Number.NaN, Number.POSITIVE_INFINITY]) {
    const result = updateProviderConnectionSchema.safeParse({
      providerSpecificData: { githubCreditLimit: bad },
    });
    assert.equal(result.success, false, `githubCreditLimit=${String(bad)}`);
  }
  for (const ok of [0, 40, 12.5, null]) {
    const result = updateProviderConnectionSchema.safeParse({
      providerSpecificData: { githubCreditLimit: ok },
    });
    assert.equal(result.success, true, `githubCreditLimit=${String(ok)}`);
  }
});

test("PUT rejects a negative credit limit with 400 and no stack trace", async () => {
  const connection = await createGithubConnection();
  const response = await putPsd(connection.id as string, { githubCreditLimit: -5 });
  assert.equal(response.status, 400);
  const body = await response.json();
  const message = JSON.stringify(body);
  assert.ok(!message.includes("at /"), "error body must not leak a stack trace");
  assert.match(message, /githubCreditLimit/);
});

test("PUT persists a valid credit limit and clears it with null", async () => {
  const connection = await createGithubConnection();
  const id = connection.id as string;

  const saved = await putPsd(id, { githubCreditLimit: 40 });
  assert.equal(saved.status, 200);
  let persisted = (await getProviderConnectionById(id)) as {
    providerSpecificData: Record<string, unknown>;
  };
  assert.equal(persisted.providerSpecificData.githubCreditLimit, 40);
  assert.equal(persisted.providerSpecificData.copilotToken, "tid=abc");

  const cleared = await putPsd(id, { githubCreditLimit: null });
  assert.equal(cleared.status, 200);
  persisted = (await getProviderConnectionById(id)) as {
    providerSpecificData: Record<string, unknown>;
  };
  assert.equal(persisted.providerSpecificData.githubCreditLimit ?? null, null);
});
