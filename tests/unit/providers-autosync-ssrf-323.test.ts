/**
 * Regression guard — CodeQL js/request-forgery alert #323 (v3.8.13).
 *
 * POST /api/providers fires a non-blocking self-fetch to the connection's
 * /sync-models route, forwarding the management cookie + internal sync auth
 * headers. #3267 built that self-fetch origin from `new URL(request.url).origin`
 * — i.e. the client-controlled Host header — so a caller could redirect the
 * credential-bearing internal request to an arbitrary host (SSRF + internal
 * auth-header exfiltration).
 *
 * The origin must come from the trusted loopback/env-pinned base URL
 * (`getModelSyncInternalBaseUrl()`), never from the incoming request.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const routeSrc = readFileSync(
  join(import.meta.dirname, "../../src/app/api/providers/route.ts"),
  "utf8"
);
const syncInitializeRouteSrc = readFileSync(
  join(import.meta.dirname, "../../src/app/api/sync/initialize/route.ts"),
  "utf8"
);
const syncModelsRouteSrc = readFileSync(
  join(import.meta.dirname, "../../src/app/api/providers/[id]/sync-models/route.ts"),
  "utf8"
);
const codexProfileSyncSrc = readFileSync(
  join(import.meta.dirname, "../../src/lib/cli-helper/codexProfileAutoSync.ts"),
  "utf8"
);
const claudeProfileSyncSrc = readFileSync(
  join(import.meta.dirname, "../../src/lib/cli-helper/claudeProfileAutoSync.ts"),
  "utf8"
);

test("POST /api/providers auto-sync uses the trusted internal origin (not request.url) — #323", () => {
  assert.ok(
    routeSrc.includes("getModelSyncInternalBaseUrl()"),
    "auto-sync self-fetch must derive its origin from getModelSyncInternalBaseUrl()"
  );
  assert.doesNotMatch(
    routeSrc,
    /const\s+internalOrigin\s*=\s*new URL\(request\.url\)\.origin/,
    "auto-sync origin must NOT be derived from the client-controlled request.url/Host (SSRF, CodeQL js/request-forgery #323)"
  );
  assert.match(
    routeSrc,
    /fetchModelSyncInternal\(syncUrl,\s*\{[^}]*redirect:\s*["']error["']/s,
    "credential-bearing auto-sync self-fetch must reject redirects"
  );
});

test("POST /api/sync/initialize never forwards the client Origin to model sync", () => {
  assert.doesNotMatch(
    syncInitializeRouteSrc,
    /request\.headers\.get\(["']origin["']\)/,
    "client-controlled Origin must not become the credential-bearing model-sync base URL"
  );
  assert.doesNotMatch(
    syncInitializeRouteSrc,
    /startModelSyncScheduler\(origin\)/,
    "model-sync scheduler must resolve its own trusted loopback origin"
  );
});

test("credential-forwarding CLI profile self-fetches reject redirects", () => {
  for (const source of [codexProfileSyncSrc, claudeProfileSyncSrc]) {
    assert.match(source, /redirect:\s*["']error["']/);
  }
});

test("nested model-sync self-fetches use the shared dashboard resolver and reject redirects", () => {
  assert.ok(
    syncModelsRouteSrc.match(/getModelSyncInternalBaseUrl\(\)/g)?.length >= 2,
    "readiness and nested model discovery must share the trusted dashboard resolver"
  );
  assert.match(syncModelsRouteSrc, /fetchModelSyncInternal\(/);
  assert.doesNotMatch(syncModelsRouteSrc, /const\s+(?:incomingUrl|loopbackPort)\s*=/);
  assert.match(syncModelsRouteSrc, /redirect:\s*["']error["']/);
});
