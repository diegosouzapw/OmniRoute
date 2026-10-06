import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-log-export-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "log-export-routes-test-key";

const coreDb = await import("../../src/lib/db/core.ts");
const destinationsRoute = await import("../../src/app/api/log-export/destinations/route.ts");
const destinationRoute = await import("../../src/app/api/log-export/destinations/[id]/route.ts");
const typesRoute = await import("../../src/app/api/log-export/types/route.ts");
const statusRoute = await import("../../src/app/api/log-export/status/route.ts");

const SERVICE_ACCOUNT_JSON = JSON.stringify({
  type: "service_account",
  project_id: "test-project",
  client_email: "exporter@test-project.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\\nstub\\n-----END PRIVATE KEY-----\\n",
});

const VALID_CONFIG = {
  projectId: "test-project",
  datasetId: "omniroute_test",
  tableId: "call_logs",
  location: "EU",
  serviceAccountJson: SERVICE_ACCOUNT_JSON,
  autoCreate: true,
};

interface ValidationDetail {
  field: string;
  message: string;
}

interface DestinationView {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  pending: number;
  config: Record<string, unknown>;
}

interface ApiBody {
  destination?: DestinationView;
  destinations?: DestinationView[];
  types?: Array<{ id: string; fields: Array<Record<string, unknown>> }>;
  maxCallLogRowId?: number;
  error?: string | { message: string; details: ValidationDetail[] };
}

function asError(body: ApiBody): { message: string; details: ValidationDetail[] } {
  if (!body.error || typeof body.error === "string") {
    throw new Error(`expected a structured error, got ${String(body.error)}`);
  }
  return body.error;
}

function jsonRequest(url: string, method: string, body?: unknown): Request {
  return new Request(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function createDestination(overrides: Record<string, unknown> = {}) {
  const response = await destinationsRoute.POST(
    jsonRequest("http://localhost/api/log-export/destinations", "POST", {
      name: "Prod BigQuery",
      type: "bigquery",
      config: VALID_CONFIG,
      ...overrides,
    })
  );
  return { response, body: (await response.json()) as ApiBody };
}

test.beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET_types_ReturnsRenderableFieldDescriptorsForEveryDestination", async () => {
  const response = await typesRoute.GET(new Request("http://localhost/api/log-export/types"));
  const body = (await response.json()) as ApiBody;

  assert.equal(response.status, 200);
  const bigqueryType = (body.types ?? []).find((type) => type.id === "bigquery");
  assert.ok(bigqueryType, "bigquery must be registered");
  assert.ok(Array.isArray(bigqueryType.fields) && bigqueryType.fields.length > 0);

  const secretField = bigqueryType.fields.find(
    (field) => field.key === "serviceAccountJson"
  ) as Record<string, unknown>;
  assert.equal(secretField.secret, true);
  assert.equal(secretField.type, "textarea");
});

test("POST_destinations_ValidPayload_CreatesItAndNeverEchoesTheServiceAccount", async () => {
  const { response, body } = await createDestination();

  assert.equal(response.status, 201);
  assert.equal(body.destination.name, "Prod BigQuery");
  assert.equal(body.destination.type, "bigquery");
  assert.equal(body.destination.config.projectId, "test-project");
  assert.equal(body.destination.config.serviceAccountJson, "__stored__");

  const serialized = JSON.stringify(body);
  assert.equal(serialized.includes("BEGIN PRIVATE KEY"), false);
  assert.equal(serialized.includes("enc:v1:"), false);
});

test("POST_destinations_UnknownType_IsRejected", async () => {
  const { response, body } = await createDestination({ type: "datadog" });
  assert.equal(response.status, 400);
  assert.match(String(body.error), /Unknown log export destination type/);
});

test("POST_destinations_MissingRequiredConfigKey_ReturnsFieldLevelErrors", async () => {
  const { response, body } = await createDestination({
    config: { datasetId: "omniroute_test", tableId: "call_logs" },
  });

  assert.equal(response.status, 400);
  assert.equal(asError(body).message, "Invalid destination configuration");
  const fields = asError(body).details.map((detail) => detail.field);
  assert.ok(fields.includes("projectId"));
  assert.ok(fields.includes("serviceAccountJson"));
});

test("POST_destinations_InvalidDatasetName_IsRejectedByTheTypeSchema", async () => {
  const { response, body } = await createDestination({
    config: { ...VALID_CONFIG, datasetId: "bad-dataset-name" },
  });

  assert.equal(response.status, 400);
  assert.ok(
    asError(body).details.some((detail) => detail.field === "datasetId"),
    "dataset id must be validated"
  );
});

test("GET_destinations_ListsThemWithSecretsRedacted", async () => {
  await createDestination();
  const response = await destinationsRoute.GET(
    new Request("http://localhost/api/log-export/destinations")
  );
  const body = (await response.json()) as ApiBody;

  assert.equal(body.destinations.length, 1);
  assert.equal(body.destinations[0].config.serviceAccountJson, "__stored__");
  assert.equal(body.destinations[0].pending, 0);
  assert.equal(JSON.stringify(body).includes("BEGIN PRIVATE KEY"), false);
});

test("PUT_destination_PlaceholderSecret_KeepsTheStoredCredential", async () => {
  const { body: created } = await createDestination();
  const id = created.destination.id;

  const response = await destinationRoute.PUT(
    jsonRequest(`http://localhost/api/log-export/destinations/${id}`, "PUT", {
      name: "Renamed",
      config: { ...VALID_CONFIG, serviceAccountJson: "__stored__", projectId: "other-project" },
    }),
    { params: Promise.resolve({ id }) }
  );
  const body = (await response.json()) as ApiBody;

  assert.equal(response.status, 200);
  assert.equal(body.destination.name, "Renamed");
  assert.equal(body.destination.config.projectId, "other-project");
  assert.equal(body.destination.config.serviceAccountJson, "__stored__");

  const secrets = await import("../../src/lib/logExport/secrets.ts");
  const destinationsDb = await import("../../src/lib/db/logExportDestinations.ts");
  const stored = destinationsDb.getLogExportDestination(id)!;
  assert.equal(
    secrets.decryptDestinationConfig("bigquery", stored.config).serviceAccountJson,
    SERVICE_ACCOUNT_JSON
  );
});

test("PUT_destination_EnabledToggle_PersistsWithoutTouchingTheConfig", async () => {
  const { body: created } = await createDestination();
  const id = created.destination.id;

  const response = await destinationRoute.PUT(
    jsonRequest(`http://localhost/api/log-export/destinations/${id}`, "PUT", { enabled: true }),
    { params: Promise.resolve({ id }) }
  );
  const body = (await response.json()) as ApiBody;

  assert.equal(body.destination.enabled, true);
  assert.equal(body.destination.config.serviceAccountJson, "__stored__");
});

test("GET_destination_UnknownId_Returns404", async () => {
  const response = await destinationRoute.GET(
    new Request("http://localhost/api/log-export/destinations/missing"),
    { params: Promise.resolve({ id: "missing" }) }
  );
  const body = (await response.json()) as ApiBody;

  assert.equal(response.status, 404);
  assert.equal(body.error, "Log export destination not found");
  assert.equal(String(body.error).includes("at /"), false);
});

test("DELETE_destination_RemovesItAndIsIdempotentlySafe", async () => {
  const { body: created } = await createDestination();
  const id = created.destination.id;

  const first = await destinationRoute.DELETE(
    new Request("http://localhost/api/log-export/destinations/" + id, { method: "DELETE" }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(first.status, 200);

  const second = await destinationRoute.DELETE(
    new Request("http://localhost/api/log-export/destinations/" + id, { method: "DELETE" }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(second.status, 404);
});

test("GET_status_ReportsTheHourlyScheduleAndBacklog", async () => {
  await createDestination();
  const response = await statusRoute.GET(new Request("http://localhost/api/log-export/status"));
  const body = (await response.json()) as ApiBody;

  assert.equal(response.status, 200);
  assert.equal(typeof body.maxCallLogRowId, "number");
  assert.equal(body.destinations.length, 1);
  assert.equal(JSON.stringify(body).includes("BEGIN PRIVATE KEY"), false);
});

test("POST_destinations_EncryptionDisabled_RefusesToStoreTheCredentialInPlaintext", async () => {
  const previousKey = process.env.STORAGE_ENCRYPTION_KEY;
  delete process.env.STORAGE_ENCRYPTION_KEY;
  const encryption = await import("../../src/lib/db/encryption.ts");
  assert.equal(encryption.isEncryptionEnabled(), false, "guard precondition");

  try {
    const { response, body } = await createDestination({ name: "No key configured" });
    assert.equal(response.status, 400);
    assert.match(String(body.error), /STORAGE_ENCRYPTION_KEY/);

    const list = await destinationsRoute.GET(
      new Request("http://localhost/api/log-export/destinations")
    );
    const listed = (await list.json()) as ApiBody;
    assert.equal(listed.destinations.length, 0, "nothing is persisted when the guard fires");
  } finally {
    if (previousKey !== undefined) process.env.STORAGE_ENCRYPTION_KEY = previousKey;
  }
});
