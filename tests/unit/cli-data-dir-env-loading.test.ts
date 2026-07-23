import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BIN = path.join(ROOT, "bin", "omniroute.mjs");
const DATA_DIR_MODULE = path.join(ROOT, "bin", "cli", "data-dir.mjs");

async function withEnv<T>(
  updates: Record<string, string | undefined>,
  fn: () => Promise<T>
): Promise<T> {
  const original = new Map<string, string | undefined>();
  for (const key of Object.keys(updates)) {
    original.set(key, process.env[key]);
    if (updates[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = updates[key];
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of original) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

function readCliEnvShow(env: NodeJS.ProcessEnv, cwd: string): Record<string, string> {
  const result = spawnSync("node", [BIN, "env", "show", "--json"], {
    cwd,
    env,
    encoding: "utf-8",
    timeout: 60_000,
  });

  assert.equal(
    result.status,
    0,
    `omniroute env show failed\nstdout=${result.stdout}\nstderr=${result.stderr}`
  );

  const stdout = result.stdout ?? "";
  const jsonStart = stdout.indexOf("{");
  assert.ok(jsonStart >= 0, `expected JSON in stdout: ${stdout}`);
  const parsed = JSON.parse(stdout.slice(jsonStart)) as { current: Record<string, string> };
  return parsed.current;
}

test("CLI data-dir resolver preserves an existing legacy ~/.omniroute before XDG/app data", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-data-dir-"));
  const home = path.join(tmp, "home");
  const legacyDir = path.join(home, ".omniroute");
  const appData = path.join(tmp, "appdata");
  const xdgConfigHome = path.join(tmp, "xdg");

  try {
    fs.mkdirSync(legacyDir, { recursive: true });

    await withEnv(
      {
        DATA_DIR: undefined,
        HOME: home,
        USERPROFILE: home,
        APPDATA: appData,
        XDG_CONFIG_HOME: xdgConfigHome,
      },
      async () => {
        const { resolveDataDir: cliResolveDataDir } = await import(
          `${pathToFileURL(DATA_DIR_MODULE).href}?t=${Date.now()}`
        );
        const { resolveDataDir: runtimeResolveDataDir } = await import(
          `../../src/lib/dataPaths.ts?t=${Date.now()}`
        );

        assert.equal(cliResolveDataDir(), legacyDir);
        assert.equal(cliResolveDataDir(), runtimeResolveDataDir());
      }
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("CLI startup loads later non-conflicting .env files without overriding earlier values", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-env-layers-"));
  const home = path.join(tmp, "home");
  const dataDir = path.join(tmp, "data");
  const cwd = path.join(tmp, "cwd");
  const appDataDir =
    process.platform === "win32"
      ? path.join(tmp, "appdata", "omniroute")
      : path.join(home, ".omniroute");

  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.mkdirSync(appDataDir, { recursive: true });
    fs.mkdirSync(cwd, { recursive: true });

    fs.writeFileSync(
      path.join(dataDir, ".env"),
      "OMNIROUTE_BASE_URL=https://data.example/v1\n",
      "utf-8"
    );
    fs.writeFileSync(
      path.join(appDataDir, ".env"),
      ["OMNIROUTE_BASE_URL=https://appdata.example/v1", "OMNIROUTE_HTTP_TIMEOUT_MS=1234", ""].join(
        "\n"
      ),
      "utf-8"
    );
    fs.writeFileSync(
      path.join(cwd, ".env"),
      ["OMNIROUTE_BASE_URL=https://cwd.example/v1", "PORT=34567", ""].join("\n"),
      "utf-8"
    );

    const cleanEnv = { ...process.env };
    for (const key of [
      "OMNIROUTE_BASE_URL",
      "OMNIROUTE_HTTP_TIMEOUT_MS",
      "PORT",
      "STORAGE_ENCRYPTION_KEY",
    ]) {
      delete cleanEnv[key];
    }

    const env = {
      ...cleanEnv,
      DATA_DIR: dataDir,
      HOME: home,
      USERPROFILE: home,
      APPDATA: path.join(tmp, "appdata"),
      CI: "1",
      OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
      OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
    };

    const current = readCliEnvShow(env, cwd);
    assert.equal(current.OMNIROUTE_BASE_URL, "https://data.example/v1");
    assert.equal(current.OMNIROUTE_HTTP_TIMEOUT_MS, "1234");
    assert.equal(current.PORT, "34567");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
