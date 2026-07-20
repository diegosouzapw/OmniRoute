import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

test("Dockerfile's --ignore-scripts npm ci is compensated for tls-client-node's native binary, same as it is for wreq-js and better-sqlite3 (#7802)", () => {
  const dockerfile = readFileSync(join(ROOT, "Dockerfile"), "utf8");
  const postinstall = readFileSync(join(ROOT, "scripts/build/postinstall.mjs"), "utf8");

  assert.match(
    dockerfile,
    /npm ci --no-audit --no-fund --legacy-peer-deps --ignore-scripts/,
    "expected the builder stage to install with --ignore-scripts (precondition of #7802)"
  );

  assert.match(
    dockerfile,
    /better-sqlite3[\s\S]*node-gyp\.js rebuild/,
    "expected an explicit better-sqlite3 rebuild step after --ignore-scripts"
  );

  assert.match(
    postinstall,
    /fixWreqJsBinary/,
    "expected postinstall.mjs to repair wreq-js's native binary"
  );

  const dockerfileHandlesIt = /tls-client-node[\s\S]{0,200}(postinstall|rebuild|download)/i.test(
    dockerfile
  );
  const postinstallHandlesIt = /tls-client-node/i.test(postinstall);

  assert.ok(
    dockerfileHandlesIt || postinstallHandlesIt,
    "tls-client-node has no --ignore-scripts compensation in Dockerfile or " +
      "scripts/build/postinstall.mjs (unlike better-sqlite3 and wreq-js) — " +
      "node_modules/tls-client-node/bin/ is never populated in the official " +
      "Docker image, so chatgpt-web/claude-web/grok-web/lmarena/perplexity-web " +
      "all fail with TlsClientUnavailableError at first request (#7802)"
  );
});
