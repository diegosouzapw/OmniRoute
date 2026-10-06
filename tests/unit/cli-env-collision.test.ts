import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BIN = path.join(ROOT, "bin", "omniroute.mjs");

function layout() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-env-collision-"));
  const home = path.join(tmp, "home");
  const dataDir = path.join(tmp, "data");
  const cwd = path.join(tmp, "cwd");
  const appDataDir =
    process.platform === "win32"
      ? path.join(tmp, "appdata", "omniroute")
      : path.join(home, ".omniroute");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(appDataDir, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });
  return { tmp, home, dataDir, cwd };
}

function runCli(
  { tmp, home, dataDir, cwd }: ReturnType<typeof layout>,
  extraEnv: Record<string, string> = {}
) {
  const cleanEnv = { ...process.env };
  for (const key of ["OMNIROUTE_BASE_URL", "PORT", "STORAGE_ENCRYPTION_KEY"]) {
    delete cleanEnv[key];
  }
  return spawnSync("node", [BIN, "env", "show", "--json"], {
    cwd,
    env: {
      ...cleanEnv,
      DATA_DIR: dataDir,
      HOME: home,
      USERPROFILE: home,
      APPDATA: path.join(tmp, "appdata"),
      CI: "1",
      OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
      OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
      ...extraEnv,
    },
    encoding: "utf-8",
    timeout: 60_000,
  });
}

test("a key masked by an earlier .env is named, with both files and without its value", () => {
  const dirs = layout();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      "OMNIROUTE_BASE_URL=https://data.example/v1\n"
    );
    fs.writeFileSync(path.join(dirs.cwd, ".env"), "OMNIROUTE_BASE_URL=https://cwd.example/v1\n");

    const stderr = runCli(dirs).stderr ?? "";

    assert.match(stderr, /OMNIROUTE_BASE_URL/);
    assert.ok(stderr.includes(path.join(dirs.cwd, ".env")), `ignored file named: ${stderr}`);
    assert.ok(stderr.includes(path.join(dirs.dataDir, ".env")), `winning file named: ${stderr}`);
    assert.ok(!stderr.includes("cwd.example"), "the ignored value must never be printed");
    assert.ok(!stderr.includes("data.example"), "the winning value must never be printed");
  } finally {
    fs.rmSync(dirs.tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("a key each file declares once says nothing", () => {
  const dirs = layout();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      "OMNIROUTE_BASE_URL=https://data.example/v1\n"
    );
    fs.writeFileSync(path.join(dirs.cwd, ".env"), "PORT=34567\n");

    const stderr = runCli(dirs).stderr ?? "";
    assert.ok(!/OMNIROUTE_BASE_URL|PORT/.test(stderr), `nothing to report: ${stderr}`);
  } finally {
    fs.rmSync(dirs.tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("a key the environment already set is reported too — that is #6194", () => {
  const dirs = layout();
  try {
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      "OMNIROUTE_BASE_URL=https://data.example/v1\n"
    );

    const stderr = runCli(dirs, { OMNIROUTE_BASE_URL: "https://shell.example/v1" }).stderr ?? "";

    assert.match(stderr, /OMNIROUTE_BASE_URL/);
    assert.ok(stderr.includes(path.join(dirs.dataDir, ".env")), `inert file named: ${stderr}`);
    assert.match(stderr, /environment/);
    assert.ok(!stderr.includes("shell.example"), "the winning value must never be printed");
    assert.ok(!stderr.includes("data.example"), "the ignored value must never be printed");
  } finally {
    fs.rmSync(dirs.tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("an unreadable .env is reported instead of being swallowed", () => {
  const dirs = layout();
  try {
    // A directory named `.env` passes existsSync and makes readFileSync throw
    // EISDIR for any user, root included — unlike chmod 000.
    fs.mkdirSync(path.join(dirs.cwd, ".env"), { recursive: true });
    fs.writeFileSync(
      path.join(dirs.dataDir, ".env"),
      "OMNIROUTE_BASE_URL=https://data.example/v1\n"
    );

    const result = runCli(dirs);
    assert.equal(result.status, 0, "an unreadable .env must stay non-fatal");
    assert.ok(
      (result.stderr ?? "").includes(path.join(dirs.cwd, ".env")),
      `the unreadable file should be named: ${result.stderr}`
    );
  } finally {
    fs.rmSync(dirs.tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
