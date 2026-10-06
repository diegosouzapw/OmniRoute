import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-completed-detail-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { writeCallArtifact } = await import("../../src/lib/usage/callLogArtifacts.ts");
const { maybeEnrichCompletedDetail } = await import(
  "../../src/lib/usage/completedRequestDetails.ts"
);

type PipelinePayloads = { providerResponse?: unknown; clientResponse?: unknown };

function seedRow(id: string, connectionId: string, pipeline: PipelinePayloads | undefined) {
  const relativePath = `precedence/${id}.json`;
  const written = writeCallArtifact(
    {
      schemaVersion: 5,
      summary: { id, timestamp: new Date().toISOString(), model: "openai/gpt-4.1" },
      requestBody: { payload: "request" },
      responseBody: { from: "responseBody" },
      error: null,
      ...(pipeline ? { pipeline } : {}),
    } as never,
    relativePath
  );
  assert.ok(written, "artifact should be written");

  core
    .getDbInstance()
    .prepare(
      `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, connection_id, detail_state, artifact_relpath)
       VALUES (@id, @timestamp, 'POST', '/v1/chat/completions', 200, 'openai/gpt-4.1', 'openai', @connectionId, 'ready', @artifact)`
    )
    .run({ id, timestamp: new Date().toISOString(), connectionId, artifact: relativePath });
}

// maybeEnrichCompletedDetail is fire-and-forget (`void (async () => …)`), so the
// assertion waits on the mutation instead of on a returned promise.
async function enrich(id: string, connectionId: string) {
  const detail = {
    id,
    model: "openai/gpt-4.1",
    provider: "openai",
    connectionId,
    startedAt: Date.now(),
    providerResponse: null,
    clientResponse: null,
  };
  maybeEnrichCompletedDetail(detail as never, connectionId);
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline && detail.providerResponse === null) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  return detail;
}

test("completed-detail enrichment prefers the pipeline over the body", async (t) => {
  await t.test("a body does not overwrite a payload the pipeline already supplied", async () => {
    // pipeline.* is the translated, per-side payload; responseBody is one coarse
    // value assigned to BOTH sides. Reading the pipeline first and then letting
    // the body overwrite it handed the panel the wrong side of the exchange --
    // a provider payload shown as the client response, and vice versa.
    const providerResponse = { from: "pipeline.providerResponse" };
    const clientResponse = { from: "pipeline.clientResponse" };
    seedRow("precedence-both", "conn-both", { providerResponse, clientResponse });

    const detail = await enrich("precedence-both", "conn-both");

    assert.deepEqual(detail.providerResponse, providerResponse);
    assert.deepEqual(detail.clientResponse, clientResponse);
  });

  await t.test("the body still fills a side the pipeline left empty", async () => {
    // The fallback itself must survive: with no pipeline at all, responseBody is
    // the only payload the artifact carries and both sides take it.
    seedRow("precedence-body-only", "conn-body-only", undefined);

    const detail = await enrich("precedence-body-only", "conn-body-only");

    assert.deepEqual(detail.providerResponse, { from: "responseBody" });
    assert.deepEqual(detail.clientResponse, { from: "responseBody" });
  });

  await t.test("a half-filled pipeline keeps its side and the body fills the other", async () => {
    seedRow("precedence-half", "conn-half", { providerResponse: { from: "pipeline.provider" } });

    const detail = await enrich("precedence-half", "conn-half");

    assert.deepEqual(detail.providerResponse, { from: "pipeline.provider" });
    assert.deepEqual(detail.clientResponse, { from: "responseBody" });
  });
});
