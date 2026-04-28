import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { syncEnv } = (await import("../../scripts/sync-env.mjs")) as {
  syncEnv: (opts?: { rootDir?: string; quiet?: boolean; scope?: string }) => {
    created: boolean;
    added: number;
  };
};

function createTempRoot(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-env-"));
}

function writeEnvExample(rootDir: string) {
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

function writeOauthEnvExample(rootDir: string) {
  fs.writeFileSync(
    path.join(rootDir, ".env.example"),
    [
      "# ═══════════════════════════════════════════════════",
      "#   OAUTH PROVIDER CREDENTIALS",
      "# ═══════════════════════════════════════════════════",
      "CLAUDE_OAUTH_CLIENT_ID=claude-default",
      "CODEX_OAUTH_CLIENT_ID=codex-default",
      "# ─────────────────────────────────────────────────────────────────────────────",
      "# Provider User-Agent Overrides (optional — customize per-provider UA headers)",
      "# ─────────────────────────────────────────────────────────────────────────────",
      "JWT_SECRET=should-not-be-copied",
      "",
    ].join("\n"),
    "utf8"
  );
}

test("syncEnv creates .env from .env.example and generates blank secrets", () => {
  const rootDir = createTempRoot();

  // Temporarily override DATA_DIR so the encrypted-credentials guard doesn't
  // find the user's real DB at ~/.omniroute/ during tests
  const origDataDir = process.env.DATA_DIR;
  try {
    writeEnvExample(rootDir);

    process.env.DATA_DIR = rootDir;
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
    process.env.DATA_DIR = origDataDir;
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("syncEnv appends only missing keys and preserves existing values", () => {
  const rootDir = createTempRoot();

  const origDataDir = process.env.DATA_DIR;
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

    process.env.DATA_DIR = rootDir;
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
    process.env.DATA_DIR = origDataDir;
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("syncEnv is idempotent when .env is already complete", () => {
  const rootDir = createTempRoot();

  const origDataDir = process.env.DATA_DIR;
  try {
    writeEnvExample(rootDir);
    process.env.DATA_DIR = rootDir;
    syncEnv({ rootDir, quiet: true });

    const before = fs.readFileSync(path.join(rootDir, ".env"), "utf8");
    const result = syncEnv({ rootDir, quiet: true });
    const after = fs.readFileSync(path.join(rootDir, ".env"), "utf8");

    assert.deepEqual(result, { created: false, added: 0 });
    assert.equal(after, before);
  } finally {
    process.env.DATA_DIR = origDataDir;
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("syncEnv oauth scope only copies oauth defaults", () => {
  const rootDir = createTempRoot();

  try {
    writeOauthEnvExample(rootDir);

    const result = syncEnv({ rootDir, quiet: true, scope: "oauth" });
    const envContent = fs.readFileSync(path.join(rootDir, ".env"), "utf8");

    assert.deepEqual(result, { created: true, added: 2 });
    assert.match(envContent, /^CLAUDE_OAUTH_CLIENT_ID=claude-default$/m);
    assert.match(envContent, /^CODEX_OAUTH_CLIENT_ID=codex-default$/m);
    assert.doesNotMatch(envContent, /^JWT_SECRET=/m);
    assert.doesNotMatch(envContent, /^Provider User-Agent Overrides/m);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});
