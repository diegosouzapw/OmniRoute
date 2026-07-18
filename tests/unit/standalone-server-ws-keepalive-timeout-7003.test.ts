import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// #7003 — the RED/GREEN spec in main-server-keepalive-timeout-7003.test.ts proves
// getMainServerTimeoutConfig() raises keepAliveTimeout/headersTimeout above Node's
// unconfigured 5_000ms default, and that the original fix wired it into
// scripts/dev/run-next.mjs. But run-next.mjs only runs `npm run dev`/`npm start`
// from a source checkout. The server real end users run — `omniroute serve`
// (npm-installed CLI), Docker, and Electron — spawns the standalone Next build's
// server.js via scripts/dev/run-standalone.mjs, which prefers server-ws.mjs
// (built from scripts/dev/standalone-server-ws.mjs, copied byte-for-byte into
// dist/server-ws.mjs by scripts/build/assembleStandalone.mjs) over the bare
// server.js specifically because it wraps `http.createServer` with production
// behavior the bare server lacks (peer-IP stamping, method/HEAD guards, WS
// proxying, TLS). Before this fix, that wrapper left Node's http.Server
// keepAliveTimeout/headersTimeout at their unconfigured defaults, so the
// JetBrains AI Assistant reconnect bug reproduced by main-server-keepalive-timeout
// -7003.test.ts still hit the production entry point every real user runs.
//
// standalone-server-ws.mjs has top-level side effects (monkeypatches
// http.createServer, generates a random UUID, and unconditionally
// `await import("./server.js")` — a file that only exists in the assembled
// standalone output, not in the source tree) so it cannot be imported
// in-process. Guard the fix by inspecting the source, mirroring the pattern
// used for run-next.mjs in run-next-node-env.test.ts.
const here = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(
  path.resolve(here, "../../scripts/dev/standalone-server-ws.mjs"),
  "utf8"
);

test("standalone-server-ws.mjs imports getMainServerTimeoutConfig", () => {
  // The wrapper must import the SIBLING ./main-server-timeouts.mjs — a
  // ../../src/... import escapes the package after the dist-root copy and
  // crashed every packed boot (2026-07-15, #7065 class). Parity with the
  // canonical runtimeTimeouts.ts is guarded by main-server-timeouts-parity.test.ts.
  assert.match(
    source,
    /import\s*\{\s*getMainServerTimeoutConfig\s*\}\s*from\s*["']\.\/main-server-timeouts\.mjs["']/,
    "expected the production server wrapper to import getMainServerTimeoutConfig " +
      "from its shipped sibling module (./main-server-timeouts.mjs)"
  );
});

test("standalone-server-ws.mjs applies keepAliveTimeout/headersTimeout to the wrapped server", () => {
  assert.match(
    source,
    /server\.keepAliveTimeout\s*=\s*\w*[Tt]imeouts?\.keepAliveTimeoutMs/,
    "expected the wrapped server object to have keepAliveTimeout set from getMainServerTimeoutConfig()"
  );
  assert.match(
    source,
    /server\.headersTimeout\s*=\s*\w*[Tt]imeouts?\.headersTimeoutMs/,
    "expected the wrapped server object to have headersTimeout set from getMainServerTimeoutConfig()"
  );
});

test("keepAliveTimeout/headersTimeout are applied inside createServerWithResponsesWs, before the server is returned", () => {
  const factoryIdx = source.search(/function createServerWithResponsesWs/);
  const keepAliveIdx = source.search(/server\.keepAliveTimeout\s*=/);
  const returnIdx = source.search(/return server;/);

  assert.ok(factoryIdx !== -1, "expected createServerWithResponsesWs to exist");
  assert.ok(keepAliveIdx !== -1, "expected a server.keepAliveTimeout assignment to exist");
  assert.ok(returnIdx !== -1, "expected the wrapped server to be returned");
  assert.ok(
    keepAliveIdx > factoryIdx,
    "timeout wiring must happen inside createServerWithResponsesWs"
  );
  assert.ok(
    keepAliveIdx < returnIdx,
    "timeout wiring must happen before the server object is returned to the caller"
  );
});
