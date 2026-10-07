/**
 * Proves the log-export pipeline is destination-agnostic: a fake destination registered
 * through the public registry API drives the whole runner, and no BigQuery vocabulary
 * leaks into the runner, the REST layer, the persistence module or the dashboard.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-log-export-ext-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "log-export-extensibility-test-key";

const REPO_ROOT = path.resolve(import.meta.dirname, "..", "..");

const coreDb = await import("../../src/lib/db/core.ts");
const destinationsDb = await import("../../src/lib/db/logExportDestinations.ts");
const registry = await import("../../src/lib/logExport/registry.ts");
const secrets = await import("../../src/lib/logExport/secrets.ts");
const runner = await import("../../src/lib/logExport/runner.ts");
const presenter = await import("../../src/lib/logExport/presenter.ts");

/** A minimal third-party destination, the shape a Datadog or Grafana plugin would take. */
const sent: unknown[][] = [];
let prepareCalls = 0;

const fakeDestination = {
  id: "unit-test-sink",
  labelFallback: "Unit Test Sink",
  descriptionFallback: "In-memory destination used to prove the pipeline is generic.",
  secretFields: ["apiToken"] as const,
  fields: [
    { key: "endpoint", labelFallback: "Endpoint", type: "text" as const, required: true },
    {
      key: "apiToken",
      labelFallback: "API token",
      type: "password" as const,
      required: true,
      secret: true,
    },
  ],
  configSchema: z.object({ endpoint: z.string().min(1), apiToken: z.string().min(1) }),
  createClient(config: { endpoint: string; apiToken: string }) {
    return {
      async test() {
        return { ok: true, detail: `reachable at ${config.endpoint}` };
      },
      async prepare() {
        prepareCalls += 1;
      },
      async send(records: readonly unknown[]) {
        sent.push([...records]);
      },
    };
  },
};

function insertCallLogs(count: number) {
  const db = coreDb.getDbInstance();
  const statement = db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, duration,
                            tokens_in, tokens_out)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'claude-opus-5', 'anthropic', 10, 1, 2)`
  );
  for (let i = 0; i < count; i++) {
    statement.run(`ext-log-${i}`, new Date(Date.UTC(2026, 7, 28, 12, 0, i)).toISOString());
  }
}

test.beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  sent.length = 0;
  prepareCalls = 0;
  registry.__registerLogExportDestinationTypeForTest(fakeDestination as never);
});

test.afterEach(() => {
  registry.__resetLogExportDestinationTypesForTest();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("runner_ThirdPartyDestination_DrivesTheWholePipelineWithNoBigQueryCode", async () => {
  insertCallLogs(5);
  const destination = destinationsDb.createLogExportDestination({
    name: "Fake sink",
    type: "unit-test-sink",
    enabled: true,
    batchSize: 2,
    maxRowsPerRun: 1000,
    config: secrets.encryptDestinationConfig("unit-test-sink", {
      endpoint: "https://sink.example.com",
      apiToken: "super-secret-token",
    }),
  });

  const result = await runner.runDestinationExport(destination);

  assert.equal(result.success, true, result.error ?? "");
  assert.equal(result.exported, 5);
  assert.equal(prepareCalls, 1, "prepare runs once per drain");
  assert.deepEqual(
    sent.map((batch) => batch.length),
    [2, 2, 1]
  );
  assert.equal(destinationsDb.getLogExportDestination(destination.id)?.exportedTotal, 5);
});

test("secrets_ThirdPartyDestination_EncryptsAndRedactsItsOwnDeclaredSecretFields", () => {
  const stored = secrets.encryptDestinationConfig("unit-test-sink", {
    endpoint: "https://sink.example.com",
    apiToken: "super-secret-token",
  });
  assert.match(String(stored.apiToken), /^enc:v1:/);
  assert.equal(stored.endpoint, "https://sink.example.com");

  const redacted = secrets.redactDestinationConfig("unit-test-sink", stored);
  assert.equal(redacted.apiToken, secrets.SECRET_PLACEHOLDER);
  assert.equal(JSON.stringify(redacted).includes("super-secret-token"), false);
});

test("registry_ThirdPartyDestination_IsRenderableByTheDashboardWithoutUiChanges", () => {
  const descriptors = registry.describeLogExportDestinationTypes();
  const fake = descriptors.find((entry) => entry.id === "unit-test-sink");
  assert.ok(fake, "a registered destination must be described to the UI");
  assert.deepEqual(
    fake.fields.map((field) => field.key),
    ["endpoint", "apiToken"]
  );
});

test("presenter_ThirdPartyDestination_ProjectsWithoutKnowingTheType", () => {
  const destination = destinationsDb.createLogExportDestination({
    name: "Fake sink",
    type: "unit-test-sink",
    enabled: false,
    config: secrets.encryptDestinationConfig("unit-test-sink", {
      endpoint: "https://sink.example.com",
      apiToken: "super-secret-token",
    }),
  });
  const view = presenter.toDestinationView(destination);
  assert.equal(view.typeAvailable, true);
  assert.equal(view.typeLabel, "Unit Test Sink");
  assert.equal(view.config.apiToken, secrets.SECRET_PLACEHOLDER);
});

test("presenter_UnregisteredType_DegradesInsteadOfCrashing", () => {
  const destination = destinationsDb.createLogExportDestination({
    name: "Removed plugin",
    type: "some-removed-plugin",
    enabled: true,
    config: { anything: "value" },
  });
  const view = presenter.toDestinationView(destination);
  assert.equal(view.typeAvailable, false);
  assert.equal(view.typeLabel, "some-removed-plugin");
});

test("pipeline_GenericLayers_CarryNoBigQueryVocabulary", () => {
  const genericFiles = [
    "src/lib/logExport/runner.ts",
    "src/lib/logExport/secrets.ts",
    "src/lib/logExport/presenter.ts",
    "src/lib/logExport/types.ts",
    "src/lib/db/logExportDestinations.ts",
    "src/lib/usage/callLogExportSource.ts",
    "src/lib/jobs/logExportJob.ts",
    "src/app/api/log-export/types/route.ts",
    "src/app/api/log-export/status/route.ts",
    "src/app/api/log-export/destinations/route.ts",
    "src/app/api/log-export/destinations/[id]/route.ts",
    "src/app/api/log-export/destinations/[id]/run/route.ts",
    "src/app/api/log-export/destinations/[id]/test/route.ts",
    "src/app/(dashboard)/dashboard/log-export/LogExportPageClient.tsx",
    "src/app/(dashboard)/dashboard/log-export/components/DestinationCard.tsx",
    "src/app/(dashboard)/dashboard/log-export/components/DestinationFormModal.tsx",
    "src/app/(dashboard)/dashboard/log-export/types.ts",
  ];

  const forbidden = /bigquery|projectId|datasetId|serviceAccountJson|insertAll/i;
  const offenders: string[] = [];
  for (const relative of genericFiles) {
    const source = fs.readFileSync(path.join(REPO_ROOT, relative), "utf8");
    for (const [index, line] of source.split("\n").entries()) {
      // The runner's file header cites BigQuery once as an example of insertId dedup.
      if (line.trim().startsWith("*") || line.trim().startsWith("//")) continue;
      if (forbidden.test(line)) offenders.push(`${relative}:${index + 1}: ${line.trim()}`);
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `destination-specific vocabulary leaked into generic layers:\n${offenders.join("\n")}`
  );
});
