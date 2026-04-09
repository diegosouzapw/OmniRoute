import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { syncEnv } = await import("../../scripts/sync-env.mjs");

function createTempRoot() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-env-"));
}

function writeEnvExample(rootDir) {
  fs.writeFileSync(
    path.join(rootDir, ".env.example"),
    [
      "JWT_SECRET=",
      "API_KEY_SECRET=",
      "STORAGE_ENCRYPTION_KEY=",
      "MACHINE_ID_SALT=",
      "CLAUDE_OAUTH_CLIENT_ID=claude-default",
      "CODEX_OAUTH_CLIENT_ID=codex-default",
      "# COMMENTED_KEY=skip-me",
      "",
    ].join("\n"),
    "utf8"
  );
}

test("syncEnv creates .env from .env.example and generates blank secrets", () => {
  const rootDir = createTempRoot();

  try {
    writeEnvExample(rootDir);

    const result = syncEnv({ rootDir, quiet: true });
    const envContent = fs.readFileSync(path.join(rootDir, ".env"), "utf8");

    assert.deepEqual(result, { created: true, added: 6 });
    assert.match(envContent, /^JWT_SECRET=.{32,}$/m);
    assert.match(envContent, /^API_KEY_SECRET=.{32,}$/m);
    assert.match(envContent, /^STORAGE_ENCRYPTION_KEY=.{32,}$/m);
    assert.match(envContent, /^MACHINE_ID_SALT=omniroute-/m);
    assert.match(envContent, /^CLAUDE_OAUTH_CLIENT_ID=claude-default$/m);
    assert.match(envContent, /^CODEX_OAUTH_CLIENT_ID=codex-default$/m);
    assert.doesNotMatch(envContent, /^COMMENTED_KEY=/m);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("syncEnv appends only missing keys and preserves existing values", () => {
  const rootDir = createTempRoot();

  try {
    writeEnvExample(rootDir);
    fs.writeFileSync(
      path.join(rootDir, ".env"),
      [
        "JWT_SECRET=my-custom-secret-that-should-stay",
        "CLAUDE_OAUTH_CLIENT_ID=custom-claude",
        "",
      ].join("\n"),
      "utf8"
    );

    const result = syncEnv({ rootDir, quiet: true });
    const envContent = fs.readFileSync(path.join(rootDir, ".env"), "utf8");

    assert.deepEqual(result, { created: false, added: 4 });
    assert.match(envContent, /^JWT_SECRET=my-custom-secret-that-should-stay$/m);
    assert.match(envContent, /^CLAUDE_OAUTH_CLIENT_ID=custom-claude$/m);
    assert.match(envContent, /^API_KEY_SECRET=.{32,}$/m);
    assert.match(envContent, /^STORAGE_ENCRYPTION_KEY=.{32,}$/m);
    assert.match(envContent, /^MACHINE_ID_SALT=omniroute-/m);
    assert.match(envContent, /^CODEX_OAUTH_CLIENT_ID=codex-default$/m);
    assert.match(envContent, /Auto-added by sync-env/);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("syncEnv is idempotent when .env is already complete", () => {
  const rootDir = createTempRoot();

  try {
    writeEnvExample(rootDir);
    syncEnv({ rootDir, quiet: true });

    const before = fs.readFileSync(path.join(rootDir, ".env"), "utf8");
    const result = syncEnv({ rootDir, quiet: true });
    const after = fs.readFileSync(path.join(rootDir, ".env"), "utf8");

    assert.deepEqual(result, { created: false, added: 0 });
    assert.equal(after, before);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});
