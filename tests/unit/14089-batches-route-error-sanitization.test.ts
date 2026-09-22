/**
 * #14089 (diegosouzapw, good first issue): `POST /api/v1/batches` returned the
 * raw `error.message` from its catch block verbatim, contrary to Hard Rule #12
 * (AGENTS.md) — every HTTP / SSE / executor error response must go through
 * `buildErrorBody()` or `sanitizeErrorMessage()` from `open-sse/utils/error.ts`.
 *
 * An `Error` thrown out of the DB layer can carry file paths, SQL fragments, or
 * internal identifiers; the old handler sent all of it to the client. This drives
 * the REAL `POST` handler with a REAL API key and a REAL seeded input file, and
 * makes the batch INSERT throw a path-and-stack-laden SQLite error through the
 * repo's own `setDbInstance` DI seam (no module mocking — the handler, auth,
 * Zod validation, ownership check and DB layer all run for real). Then it asserts
 * the 400 body no longer leaks the path/stack.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
 * module loads, so this file never touches ~/.omniroute.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/14089-batches-route-error-sanitization.test.ts
 */
import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "batches-14089-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "batches-14089-api-secret";

const core = await import("../../src/lib/db/core.ts");
const singleton = await import("../../src/lib/db/singleton.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { createFile } = await import("../../src/lib/db/files.ts");
const batchesRoute = await import("../../src/app/api/v1/batches/route.ts");
type SqliteAdapter = import("../../src/lib/db/adapters/types.ts").SqliteAdapter;

type ErrorBody = { error?: { message?: string; type?: string } };

// The DB file path a real SQLITE_CANTOPEN would name, plus a stack tail. None of
// it may reach the client (Hard Rule #12).
const LEAKY_DB_PATH = path.join(TEST_DATA_DIR, "storage.sqlite");
const LEAKY_MESSAGE = `SQLITE_CANTOPEN: unable to open database file ${LEAKY_DB_PATH}`;

/**
 * Wrap the live adapter so every read (auth lookup, file ownership, validation)
 * runs for real, but the batch INSERT throws the leaky SQLite error. The thrown
 * error carries the real DB path in both its message and a stack frame, exactly
 * like a genuine SQLITE_CANTOPEN from the driver.
 */
function installThrowingInsertAdapter(): SqliteAdapter {
  const real = core.getDbInstance() as SqliteAdapter;
  const wrapper: SqliteAdapter = {
    ...real,
    prepare(sql: string) {
      const stmt = real.prepare(sql);
      if (/\bINSERT\s+INTO\s+batches\b/i.test(sql)) {
        return {
          run() {
            const err = new Error(LEAKY_MESSAGE);
            err.stack = `Error: ${LEAKY_MESSAGE}\n    at createBatch (${LEAKY_DB_PATH}:42:11)`;
            throw err;
          },
          get: stmt.get.bind(stmt),
          all: stmt.all.bind(stmt),
        };
      }
      return stmt;
    },
  };
  singleton.setDbInstance(wrapper);
  return real;
}

async function postBatch(apiKey: string, inputFileId: string) {
  const res = await batchesRoute.POST(
    new Request("http://localhost/api/v1/batches", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        input_file_id: inputFileId,
        endpoint: "/v1/chat/completions",
        completion_window: "24h",
      }),
    })
  );
  return { res, body: (await res.json()) as ErrorBody };
}

function seedOwnedInputFile(apiKeyId: string, label: string) {
  return createFile({
    bytes: 10,
    filename: `${label}.jsonl`,
    purpose: "batch",
    content: Buffer.from("{}"),
    mimeType: "application/jsonl",
    apiKeyId,
  });
}

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("#14089 POST /api/v1/batches error sanitization", () => {
  it("does not leak a DB-layer error's path or stack in the 400 body", async () => {
    const key = await createApiKey("batches-14089", "machine-14089-a", []);
    // The input file is owned by this key so the ownership check passes and
    // execution reaches the batch INSERT (the catch block under test).
    const ownedFile = seedOwnedInputFile(key.id, "batches-14089-owned");
    const real = installThrowingInsertAdapter();

    const { res, body } = await postBatch(key.key, ownedFile.id);
    singleton.setDbInstance(real);

    assert.equal(res.status, 400);
    const message = body.error?.message ?? "";
    // The leak the issue is about: raw path / SQL / stack reaching the client.
    assert.ok(!message.includes(LEAKY_DB_PATH), `response leaked the DB path: ${message}`);
    assert.ok(!message.includes("storage.sqlite"), `response leaked the DB filename: ${message}`);
    assert.ok(!message.includes("\n    at "), `response leaked a stack frame: ${message}`);
    assert.equal(body.error?.type, "invalid_request_error");
  });

  it("keeps a clean, non-sensitive error message intact after sanitization", async () => {
    const key = await createApiKey("batches-14089-clean", "machine-14089-b", []);
    const ownedFile = seedOwnedInputFile(key.id, "batches-14089-clean");
    // A genuinely non-sensitive failure message must survive sanitization rather
    // than being blanked — the fix must not turn every error into "[REDACTED]".
    const real = core.getDbInstance() as SqliteAdapter;
    const wrapper: SqliteAdapter = {
      ...real,
      prepare(sql: string) {
        const stmt = real.prepare(sql);
        if (/\bINSERT\s+INTO\s+batches\b/i.test(sql)) {
          return {
            run() {
              throw new Error("Batch endpoint is not enabled on this instance");
            },
            get: stmt.get.bind(stmt),
            all: stmt.all.bind(stmt),
          };
        }
        return stmt;
      },
    };
    singleton.setDbInstance(wrapper);

    const { res, body } = await postBatch(key.key, ownedFile.id);
    singleton.setDbInstance(real);

    assert.equal(res.status, 400);
    assert.match(body.error?.message ?? "", /not enabled on this instance/);
    assert.equal(body.error?.type, "invalid_request_error");
  });
});
