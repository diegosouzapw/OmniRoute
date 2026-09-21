/**
 * Regression guard for #12822: the LLMLingua worker must actually spawn on Node.
 *
 * Root cause: `new Worker(pathToFileURL(file).href, ...)` passes a STRING. Node treats a
 * string argument as a filesystem path (it must start with ./ or ../), so a "file://..."
 * string is looked up literally and throws ERR_WORKER_PATH. Only a URL INSTANCE is
 * interpreted as a file: URL.
 *
 * Why it was invisible: pump() wraps ensureWorker() in `catch {}` and fails open, so the
 * spawn crash silently degraded every compression call to a passthrough instead of erroring.
 *
 * This test asserts the Node contract directly against a real Worker, so it fails on the
 * old `.href` spelling and passes on the URL object.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const WORKER_SRC = path.resolve(
  here,
  "../../../open-sse/services/compression/engines/llmlingua/worker.ts"
);

function spawnWith(arg: string | URL): Promise<void> {
  return new Promise((resolve, reject) => {
    let w: Worker;
    try {
      w = new Worker(arg, {});
    } catch (err) {
      reject(err);
      return;
    }
    w.on("error", reject);
    w.on("exit", () => resolve());
  });
}

test("a file: URL STRING is rejected by node:worker_threads (the #12822 crash)", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-worker-"));
  const child = path.join(dir, "child.mjs");
  fs.writeFileSync(child, "process.exit(0);\n");

  await assert.rejects(
    () => spawnWith(pathToFileURL(child).href),
    (err: NodeJS.ErrnoException) => err.code === "ERR_WORKER_PATH",
    "passing .href must fail — this is exactly what shipped and was swallowed by the fail-open catch"
  );

  fs.rmSync(dir, { recursive: true, force: true });
});

test("a file: URL OBJECT spawns cleanly", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-worker-"));
  const child = path.join(dir, "child.mjs");
  fs.writeFileSync(child, "process.exit(0);\n");

  await spawnWith(pathToFileURL(child));

  fs.rmSync(dir, { recursive: true, force: true });
});

test("worker.ts passes the URL object, not .href", () => {
  const code = fs.readFileSync(WORKER_SRC, "utf8");
  assert.ok(
    /new Worker\(\s*pathToFileURL\([A-Za-z0-9_]+\)\s*,/.test(code),
    "ensureWorker must pass the URL instance to new Worker()"
  );
  assert.ok(
    !/new Worker\(\s*pathToFileURL\([A-Za-z0-9_]+\)\.href/.test(code),
    "ensureWorker must not pass pathToFileURL(...).href — that throws ERR_WORKER_PATH"
  );
});
