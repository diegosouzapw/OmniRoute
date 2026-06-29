/**
 * Issue #3061 — No-auth providers (opencode / opencode-zen) infinite
 * account-fallback loop on a persistent upstream error → unbounded DB growth /
 * disk exhaustion.
 *
 * For a no-auth provider, getProviderCredentials early-returns synthetic
 * credentials with connectionId "noauth" BEFORE honoring the exclusion set
 * (src/sse/services/auth.ts: the NOAUTH_PROVIDERS block and the opencode-zen
 * keyless fallback). So when the chat fallback loop marks the failed "noauth"
 * connection and excludes it, the selector hands "noauth" right back → it loops
 * forever, writing key-health + request logs every iteration until the disk
 * fills (see @paraflu's "failure #320" trace in discussion #3038).
 *
 * Loop-breaking invariant under test: once "noauth" is in excludeConnectionIds,
 * the selector MUST return null (no remaining candidate) so the chat handler
 * stops after a single attempt instead of re-selecting the same synthetic
 * connection. The happy-path (nothing excluded → synthetic noauth) must stay
 * intact so keyless access still works.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-noauth-loop-3061-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Happy path preserved: first selection (nothing excluded) still works ──

test("#3061 opencode no-auth: first selection returns synthetic noauth (happy path preserved)", async () => {
  const creds = await getProviderCredentials("opencode", null, null, "minimax-m2.5-free");
  assert.ok(creds, "opencode must resolve to synthetic no-auth credentials on first selection");
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  assert.equal((creds as { apiKey?: unknown }).apiKey, null);
});

test("#3061 opencode-zen no-auth: first selection returns synthetic noauth (happy path preserved)", async () => {
  const creds = await getProviderCredentials("opencode-zen");
  assert.ok(creds, "opencode-zen must resolve to synthetic no-auth credentials on first selection");
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
});

test("#3061 mimocode no-auth: first selection returns synthetic noauth (happy path preserved)", async () => {
  const creds = await getProviderCredentials("mimocode", null, null, "mimo-auto");
  assert.ok(creds, "mimocode must resolve to synthetic no-auth credentials on first selection");
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  assert.equal((creds as { apiKey?: unknown }).apiKey, null);
});

// ── The fix: once "noauth" is excluded, selection MUST stop (return null) ──

test("#3061 opencode no-auth: excluding 'noauth' returns null (breaks the fallback loop)", async () => {
  const creds = await getProviderCredentials("opencode", null, null, "minimax-m2.5-free", {
    excludeConnectionIds: ["noauth"],
  });
  assert.equal(
    creds,
    null,
    "after the synthetic noauth connection failed and was excluded, the selector must return " +
      "null instead of handing back 'noauth' (which would loop forever and fill the disk)"
  );
});

test("#3061 opencode-zen no-auth: excluding 'noauth' returns null (breaks the fallback loop)", async () => {
  const creds = await getProviderCredentials("opencode-zen", null, null, null, {
    excludeConnectionIds: ["noauth"],
  });
  assert.equal(
    creds,
    null,
    "excluded synthetic noauth must not be re-selected for the opencode-zen keyless path"
  );
});

test("#3061 mimocode no-auth: excluding 'noauth' returns null (breaks the fallback loop)", async () => {
  const creds = await getProviderCredentials("mimocode", null, null, "mimo-auto", {
    excludeConnectionIds: ["noauth"],
  });
  assert.equal(
    creds,
    null,
    "excluded synthetic noauth must not be re-selected for the mimocode keyless path"
  );
});
