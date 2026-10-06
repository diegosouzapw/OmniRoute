import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const CACHE_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-swr-cache-8728-"));
process.env.DATA_DIR = CACHE_DATA_DIR;

const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const BLOCK_MS = 300;

function listen(server: http.Server, socketPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(socketPath, resolve);
  });
}

function close(server: http.Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

function fetchFromExternalClient(
  socketPath: string
): Promise<{ body: string; receivedAt: number }> {
  const script = [
    'import http from "node:http";',
    "const chunks = [];",
    "const request = http.request({ socketPath: process.argv[1], path: '/v1/models' }, (response) => {",
    "  response.on('data', (chunk) => chunks.push(chunk));",
    "  response.on('end', () => {",
    "    const body = Buffer.concat(chunks).toString('utf8');",
    "    process.stdout.write(JSON.stringify({ body, receivedAt: Date.now() }));",
    "  });",
    "});",
    "request.on('error', (error) => { throw error; });",
    "request.end();",
  ].join("\n");
  const child = spawn(process.execPath, ["--input-type=module", "-e", script, socketPath], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`external fetch exited ${code}: ${stderr}`));
        return;
      }
      resolve(JSON.parse(stdout));
    });
  });
}

function productionShapedSynchronousRefresh() {
  const models = Array.from({ length: 4_000 }, (_, index) => ({
    id: `provider/model-${index}`,
    object: "model",
    owned_by: "provider",
    display_name: `Model ${index}`,
  }));
  const startedAt = Date.now();
  do {
    JSON.stringify({ object: "list", data: models });
  } while (Date.now() - startedAt < BLOCK_MS);
}

test.after(() => {
  fs.rmSync(CACHE_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the /v1/models route wires Next after() as its response-flush-safe scheduler", () => {
  const routeSource = fs.readFileSync(
    path.join(REPO_ROOT, "src/app/api/v1/models/route.ts"),
    "utf8"
  );
  const cacheSource = fs.readFileSync(
    path.join(REPO_ROOT, "src/app/api/v1/models/catalogCache.ts"),
    "utf8"
  );
  assert.match(routeSource, /import\s+\{\s*after\s*\}\s+from\s+["']next\/server["']/);
  assert.match(routeSource, /scheduleBackgroundRefresh:\s*\(task\)\s*=>\s*after\(task\)/);
  assert.match(cacheSource, /import\s+\{\s*after\s*\}\s+from\s+["']next\/server["']/);
  assert.match(cacheSource, /function defaultBackgroundRefreshScheduler[\s\S]*?after\(task\)/);
});

test("an external client receives the stale body before synchronous refresh finishes blocking", async (t) => {
  catalogCache.__resetCatalogBuilderRunsForTest();
  const socketDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-swr-http-8728-"));
  const socketPath = path.join(socketDir, "catalog.sock");

  let buildCount = 0;
  let responseFinishedAt = 0;
  let refreshStartedAt = 0;
  let refreshFinishedAt = 0;
  let scheduledCount = 0;

  const server = http.createServer(async (incoming, outgoing) => {
    const url = `http://127.0.0.1${incoming.url || "/"}`;
    const response = await catalogCache.resolveCachedCatalogResponse(
      new Request(url),
      { corsHeaders: {}, diagnosticHeaders: {} },
      async () => {
        buildCount++;
        if (buildCount > 1) {
          refreshStartedAt = Date.now();
          productionShapedSynchronousRefresh();
          refreshFinishedAt = Date.now();
        }
        return {
          body: buildCount > 1 ? "new" : "old",
          headers: { "content-type": "text/plain" },
          status: 200,
          cacheTTL: 60_000,
        };
      },
      {
        getStaleWhileRevalidateMs: () => Number.POSITIVE_INFINITY,
        scheduleBackgroundRefresh: (task) => {
          scheduledCount++;
          outgoing.once("finish", () => {
            responseFinishedAt = Date.now();
            setImmediate(() => {
              void task();
            });
          });
        },
      }
    );

    outgoing.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    outgoing.end(await response.text());
  });

  try {
    await listen(server, socketPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EPERM") {
      t.skip("sandbox does not permit opening HTTP listener sockets");
      fs.rmSync(socketDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      return;
    }
    throw error;
  }
  try {
    assert.equal((await fetchFromExternalClient(socketPath)).body, "old");
    catalogCache.__expireCatalogCacheForTest();

    const stale = await fetchFromExternalClient(socketPath);
    await catalogCache.__flushCatalogBackgroundRefreshForTest();

    assert.equal(stale.body, "old");
    assert.equal(scheduledCount, 1);
    assert.ok(refreshStartedAt >= responseFinishedAt, "refresh must start after response finish");
    assert.ok(
      stale.receivedAt < refreshFinishedAt,
      `external client received stale body at ${stale.receivedAt}, after refresh finished at ${refreshFinishedAt}`
    );
    assert.ok(
      refreshFinishedAt - refreshStartedAt >= BLOCK_MS,
      "refresh did not exercise the synchronous blocking window"
    );
  } finally {
    await close(server);
    fs.rmSync(socketDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    catalogCache.__resetCatalogBuilderRunsForTest();
  }
});
