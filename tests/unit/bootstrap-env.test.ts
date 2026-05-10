import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

import { bootstrapEnv } from "../../scripts/bootstrap-env.mjs";

function withTempEnv(fn) {
  const originalCwd = process.cwd();
  const originalEnv = { ...process.env };
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bootstrap-test-"));
  const tempCwd = path.join(tempRoot, "cwd");
  const tempHome = path.join(tempRoot, "home");

  fs.mkdirSync(tempCwd, { recursive: true });
  fs.mkdirSync(tempHome, { recursive: true });

  delete process.env.DATA_DIR;
  delete process.env.XDG_CONFIG_HOME;
  delete process.env.APPDATA;
  delete process.env.JWT_SECRET;
  delete process.env.STORAGE_ENCRYPTION_KEY;
  delete process.env.STORAGE_ENCRYPTION_KEY_VERSION;
  delete process.env.API_KEY_SECRET;
  delete process.env.INITIAL_PASSWORD;
  process.env.HOME = tempHome;
  process.chdir(tempCwd);

  try {
    fn({ tempRoot, tempCwd, tempHome, dataDir: path.join(tempHome, ".omniroute") });
  } finally {
    process.chdir(originalCwd);
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) delete process.env[key];
    }
    for (const [key, value] of Object.entries(originalEnv)) {
      process.env[key] = value;
    }
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

test("bootstrapEnv prefers ~/.omniroute/.env over server.env", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, ".env"),
      "STORAGE_ENCRYPTION_KEY=from-dot-env\nJWT_SECRET=jwt-from-dot-env\n",
      "utf8"
    );
    fs.writeFileSync(
      path.join(dataDir, "server.env"),
      "STORAGE_ENCRYPTION_KEY=from-server-env\nJWT_SECRET=jwt-from-server-env\n",
      "utf8"
    );

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.STORAGE_ENCRYPTION_KEY, "from-dot-env");
    assert.equal(env.JWT_SECRET, "jwt-from-dot-env");
  });
});

test("bootstrapEnv strips matching quotes from env values", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, "server.env"),
      'JWT_SECRET="jwt-from-server-env"\nCLAUDE_USER_AGENT="claude-cli/2.1.137 (external, cli)"\n',
      "utf8"
    );

    const env = bootstrapEnv({ quiet: true });

    assert.equal(env.JWT_SECRET, "jwt-from-server-env");
    assert.equal(env.CLAUDE_USER_AGENT, "claude-cli/2.1.137 (external, cli)");
  });
});

test("bootstrapEnv refuses to generate a new key over encrypted data", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    fs.mkdirSync(dataDir, { recursive: true });
    const db = new Database(path.join(dataDir, "storage.sqlite"));
    try {
      db.exec(`
        CREATE TABLE provider_connections (
          id TEXT PRIMARY KEY,
          access_token TEXT,
          refresh_token TEXT,
          api_key TEXT,
          id_token TEXT
        );
      `);
      db.prepare("INSERT INTO provider_connections (id, access_token) VALUES (?, ?)").run(
        "conn-1",
        "enc:v1:deadbeef:feedface:cafebabe"
      );
    } finally {
      db.close();
    }

    assert.throws(
      () => bootstrapEnv({ quiet: true }),
      /Refusing to auto-generate STORAGE_ENCRYPTION_KEY/
    );
  });
});

test("bootstrapEnv fails closed when existing database cannot be inspected", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    fs.mkdirSync(path.join(dataDir, "storage.sqlite"), { recursive: true });

    assert.throws(() => bootstrapEnv({ quiet: true }), /Unable to inspect existing database/);
  });
});

test("bootstrapEnv ignores blank dataDirOverride values", () => {
  withTempEnv(({ dataDir }) => {
    process.env.DATA_DIR = dataDir;
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, ".env"), "JWT_SECRET=jwt-from-dot-env\n", "utf8");

    const env = bootstrapEnv({ dataDirOverride: "   ", quiet: true });

    assert.equal(env.JWT_SECRET, "jwt-from-dot-env");
  });
});
