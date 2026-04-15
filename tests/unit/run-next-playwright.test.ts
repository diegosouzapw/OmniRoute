import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const playwrightRunner = await import("../../scripts/run-next-playwright.mjs");

test("resolvePlaywrightAppBackupDir uses a per-run backup when a stale backup already exists", () => {
  const cwd = "/tmp/omniroute-playwright-runner";

  assert.equal(
    playwrightRunner.resolvePlaywrightAppBackupDir({
      cwd,
      baseBackupExists: false,
      appDirExists: true,
      pid: 123,
      now: 456,
    }),
    path.join(cwd, "app.__qa_backup")
  );

  assert.equal(
    playwrightRunner.resolvePlaywrightAppBackupDir({
      cwd,
      baseBackupExists: true,
      appDirExists: true,
      pid: 123,
      now: 456,
    }),
    path.join(cwd, "app.__qa_backup.123.456")
  );
});

test("shouldUseWebpackForPlaywrightDev only opts into webpack when turbopack is disabled", () => {
  assert.equal(
    playwrightRunner.shouldUseWebpackForPlaywrightDev({
      mode: "dev",
      env: { OMNIROUTE_USE_TURBOPACK: "1" },
    }),
    false
  );

  assert.equal(
    playwrightRunner.shouldUseWebpackForPlaywrightDev({
      mode: "dev",
      env: { OMNIROUTE_USE_TURBOPACK: "0" },
    }),
    true
  );

  assert.equal(
    playwrightRunner.shouldUseWebpackForPlaywrightDev({
      mode: "start",
      env: { OMNIROUTE_USE_TURBOPACK: "1" },
    }),
    false
  );
});

test("standalone asset helpers detect and rehydrate missing standalone static assets", () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-playwright-assets-"));
  const standaloneServerPath = path.join(tempRoot, ".next", "standalone", "server.js");
  const rootStaticDirPath = path.join(tempRoot, ".next", "static");
  const standaloneStaticDirPath = path.join(tempRoot, ".next", "standalone", ".next", "static");
  const rootPublicDirPath = path.join(tempRoot, "public");
  const standalonePublicDirPath = path.join(tempRoot, ".next", "standalone", "public");

  fs.mkdirSync(path.dirname(standaloneServerPath), { recursive: true });
  fs.writeFileSync(standaloneServerPath, "server");
  fs.mkdirSync(rootStaticDirPath, { recursive: true });
  fs.mkdirSync(rootPublicDirPath, { recursive: true });
  fs.writeFileSync(path.join(rootStaticDirPath, "chunk.js"), "console.log('chunk');");
  fs.writeFileSync(path.join(rootPublicDirPath, "favicon.svg"), "<svg />");

  assert.equal(
    playwrightRunner.standaloneAssetsNeedSync({
      standaloneServerPath,
      rootStaticDirPath,
      standaloneStaticDirPath,
    }),
    true
  );

  const logs = [];
  const changed = playwrightRunner.syncStandaloneRuntimeAssets({
    standaloneServerPath,
    rootStaticDirPath,
    standaloneStaticDirPath,
    rootPublicDirPath,
    standalonePublicDirPath,
    log: {
      log(message) {
        logs.push(message);
      },
    },
  });

  assert.equal(changed, true);
  assert.equal(
    fs.readFileSync(path.join(standaloneStaticDirPath, "chunk.js"), "utf8"),
    "console.log('chunk');"
  );
  assert.equal(
    fs.readFileSync(path.join(standalonePublicDirPath, "favicon.svg"), "utf8"),
    "<svg />"
  );
  assert.equal(
    playwrightRunner.standaloneAssetsNeedSync({
      standaloneServerPath,
      rootStaticDirPath,
      standaloneStaticDirPath,
    }),
    false
  );
  assert.match(logs[0] || "", /Rehydrated standalone static\/public assets/);

  fs.rmSync(tempRoot, { recursive: true, force: true });
});
