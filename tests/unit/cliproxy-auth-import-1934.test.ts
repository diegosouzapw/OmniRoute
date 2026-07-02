import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

import {
  CLIPROXY_TYPE_TO_PROVIDER,
  parseCliProxyAuthRecord,
  resolveCliProxyExpiry,
  toConnectionPayload,
  scanCliProxyAuthDir,
} from "../../src/lib/oauth/utils/cliProxyAuthImport.ts";

// #1934: import CLIProxyAPI (~/.cli-proxy-api/) auth files so accounts don't need
// re-login. CLIProxyAPI uses a unified JSON format with a `type` discriminator.

const T0 = 1_700_000_000_000; // fixed "now" for deterministic expiry

test("parseCliProxyAuthRecord maps a claude (anthropic) auth file", () => {
  const parsed = parseCliProxyAuthRecord(
    {
      type: "anthropic",
      email: "a@b.com",
      access_token: "at-1",
      refresh_token: "rt-1",
      expires_in: 3600,
    },
    T0
  );
  assert.deepEqual(parsed, {
    provider: "claude",
    type: "anthropic",
    email: "a@b.com",
    accessToken: "at-1",
    refreshToken: "rt-1",
    expiresAt: new Date(T0 + 3600_000).toISOString(),
    projectId: null,
  });
});

test("parseCliProxyAuthRecord skips discontinued gemini records", () => {
  const parsed = parseCliProxyAuthRecord(
    { type: "gemini", access_token: "at", project_id: "proj-9" },
    T0
  );
  assert.equal(parsed, null);
});

test("parseCliProxyAuthRecord returns null for unknown type or missing access token", () => {
  assert.equal(parseCliProxyAuthRecord({ type: "totally-unknown", access_token: "x" }, T0), null);
  assert.equal(parseCliProxyAuthRecord({ type: "codex" }, T0), null);
  assert.equal(parseCliProxyAuthRecord(null, T0), null);
  assert.equal(parseCliProxyAuthRecord("not-an-object", T0), null);
});

test("every CLIPROXY_TYPE_TO_PROVIDER target is a real OAuth provider id", () => {
  // codex/antigravity/claude/qwen/kimi are all OmniRoute providers
  for (const provider of Object.values(CLIPROXY_TYPE_TO_PROVIDER)) {
    assert.ok(
      ["claude", "codex", "antigravity", "qwen", "kimi"].includes(provider),
      `unexpected provider mapping: ${provider}`
    );
  }
});

test("resolveCliProxyExpiry handles absolute `expired` (string + unix) and relative `expires_in`", () => {
  assert.equal(
    resolveCliProxyExpiry({ expired: "2030-01-01T00:00:00Z" }, T0),
    "2030-01-01T00:00:00.000Z"
  );
  assert.equal(
    resolveCliProxyExpiry({ expired: 1_800_000_000 }, T0),
    new Date(1_800_000_000 * 1000).toISOString()
  );
  assert.equal(resolveCliProxyExpiry({ expires_in: 60 }, T0), new Date(T0 + 60_000).toISOString());
  assert.equal(resolveCliProxyExpiry({}, T0), null);
});

test("toConnectionPayload produces a createProviderConnection-shaped oauth payload", () => {
  const payload = toConnectionPayload({
    provider: "codex",
    type: "codex",
    email: "c@d.com",
    accessToken: "at",
    refreshToken: "rt",
    expiresAt: "2030-01-01T00:00:00.000Z",
    projectId: null,
  });
  assert.equal(payload.provider, "codex");
  assert.equal(payload.authType, "oauth");
  assert.equal(payload.email, "c@d.com");
  assert.equal(payload.accessToken, "at");
  assert.equal(
    (payload.providerSpecificData as Record<string, unknown>).importedFrom,
    "cliproxyapi"
  );
});

test("scanCliProxyAuthDir reads importable files and counts skips", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "cliproxy-1934-"));
  try {
    await fs.writeFile(
      path.join(dir, "acct1.json"),
      JSON.stringify({ type: "antigravity", access_token: "at1", email: "x@y.com" })
    );
    await fs.writeFile(
      path.join(dir, "acct2.json"),
      JSON.stringify({ type: "unknown-thing", access_token: "at2" })
    );
    await fs.writeFile(path.join(dir, "broken.json"), "{ not json");
    await fs.writeFile(path.join(dir, "config.yaml"), "ignored: true");

    const { candidates, skipped, scanned } = await scanCliProxyAuthDir(dir, T0);
    assert.equal(scanned, 3); // 3 .json files (yaml ignored)
    assert.equal(candidates.length, 1);
    assert.equal(candidates[0].provider, "antigravity");
    assert.equal(skipped, 2); // unknown type + broken json
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("scanCliProxyAuthDir returns empty for a missing directory", async () => {
  const { candidates, scanned } = await scanCliProxyAuthDir(
    path.join(os.tmpdir(), "does-not-exist-1934-xyz"),
    T0
  );
  assert.equal(candidates.length, 0);
  assert.equal(scanned, 0);
});
