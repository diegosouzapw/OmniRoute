import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const {
  CURSOR_AGENT_CLI_VERSION,
  configureCursorAgentCliVersionForTests,
  detectCursorAgentCliVersionFromFs,
  extractVersionIdFromInstallerScript,
  extractVersionIdFromResolvedPath,
  formatCursorAgentClientVersion,
  getCursorAgentCliVersion,
  newestVersionInDir,
  refreshCursorAgentCliVersionFromInstaller,
  resetCursorAgentCliVersionCache,
  resetCursorAgentCliVersionTestHooks,
} = await import("../../open-sse/utils/cursorAgentCliVersion.ts");

function withEnv(vars: Record<string, string | undefined>, fn: () => void) {
  const saved: Record<string, string | undefined> = {};
  for (const key of Object.keys(vars)) {
    saved[key] = process.env[key];
    const next = vars[key];
    if (next === undefined) delete process.env[key];
    else process.env[key] = next;
  }
  try {
    fn();
  } finally {
    for (const key of Object.keys(saved)) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

test("formatCursorAgentClientVersion prefixes cli-", () => {
  assert.equal(formatCursorAgentClientVersion("2026.07.08-0c04a8a"), "cli-2026.07.08-0c04a8a");
});

test("extractVersionIdFromResolvedPath reads versions/<id>", () => {
  assert.equal(
    extractVersionIdFromResolvedPath(
      "/home/u/.local/share/cursor-agent/versions/2026.07.08-0c04a8a/cursor-agent"
    ),
    "2026.07.08-0c04a8a"
  );
  assert.equal(extractVersionIdFromResolvedPath("/tmp/not-an-agent"), null);
});

test("newestVersionInDir picks lexicographically newest matching child", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-ver-dir-"));
  try {
    fs.mkdirSync(path.join(tmp, "2026.05.24-dda726e"));
    fs.mkdirSync(path.join(tmp, "2026.07.08-0c04a8a"));
    fs.writeFileSync(path.join(tmp, "not-a-version"), "x");
    fs.mkdirSync(path.join(tmp, "3.9.0"));
    assert.equal(newestVersionInDir(tmp), "2026.07.08-0c04a8a");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("detectCursorAgentCliVersionFromFs uses shim realpath under versions/<id>", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-home-shim-"));
  try {
    const id = "2026.06.01-abcdef0";
    const versionDir = path.join(home, ".local", "share", "cursor-agent", "versions", id);
    fs.mkdirSync(versionDir, { recursive: true });
    const binary = path.join(versionDir, "cursor-agent");
    fs.writeFileSync(binary, "#!/bin/sh\n");
    const binDir = path.join(home, ".local", "bin");
    fs.mkdirSync(binDir, { recursive: true });
    fs.symlinkSync(binary, path.join(binDir, "agent"));

    withEnv({ CURSOR_DATA_DIR: undefined, CURSOR_AGENT_CLI_VERSION: undefined }, () => {
      assert.equal(detectCursorAgentCliVersionFromFs(home), id);
    });
  } finally {
    fs.rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("detectCursorAgentCliVersionFromFs uses CURSOR_DATA_DIR versions when no shim", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-home-empty-"));
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-data-"));
  try {
    const id = "2026.04.01-deadbeef";
    fs.mkdirSync(path.join(data, "versions", id), { recursive: true });
    withEnv({ CURSOR_DATA_DIR: data }, () => {
      assert.equal(detectCursorAgentCliVersionFromFs(home), id);
    });
  } finally {
    fs.rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(data, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("getCursorAgentCliVersion env override wins", () => {
  withEnv({ CURSOR_AGENT_CLI_VERSION: "2026.01.02-abc1234" }, () => {
    resetCursorAgentCliVersionCache();
    assert.equal(getCursorAgentCliVersion(), "2026.01.02-abc1234");
  });
  resetCursorAgentCliVersionCache();
});

test("getCursorAgentCliVersion ignores invalid env and uses pin when FS empty", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-home-pin-"));
  try {
    withEnv(
      {
        HOME: home,
        USERPROFILE: home,
        CURSOR_AGENT_CLI_VERSION: "3.9",
        CURSOR_DATA_DIR: undefined,
      },
      () => {
        resetCursorAgentCliVersionCache();
        assert.equal(getCursorAgentCliVersion(), CURSOR_AGENT_CLI_VERSION);
      }
    );
  } finally {
    resetCursorAgentCliVersionCache();
    fs.rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("getCursorAgentCliVersion caches until reset", () => {
  withEnv({ CURSOR_AGENT_CLI_VERSION: "2026.02.03-111aaaa" }, () => {
    resetCursorAgentCliVersionCache();
    assert.equal(getCursorAgentCliVersion(), "2026.02.03-111aaaa");
    process.env.CURSOR_AGENT_CLI_VERSION = "2026.02.03-222bbbb";
    assert.equal(getCursorAgentCliVersion(), "2026.02.03-111aaaa", "cached");
    resetCursorAgentCliVersionCache();
    assert.equal(getCursorAgentCliVersion(), "2026.02.03-222bbbb");
  });
  resetCursorAgentCliVersionCache();
});

test("getCursorAgentCliVersion reads CURSOR_DATA_DIR via isolated HOME", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-home-get-"));
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-data-get-"));
  try {
    const id = "2026.03.15-cafebabe";
    fs.mkdirSync(path.join(data, "versions", id), { recursive: true });
    withEnv(
      {
        HOME: home,
        USERPROFILE: home,
        CURSOR_DATA_DIR: data,
        CURSOR_AGENT_CLI_VERSION: undefined,
      },
      () => {
        resetCursorAgentCliVersionCache();
        assert.equal(getCursorAgentCliVersion(), id);
        assert.equal(formatCursorAgentClientVersion(getCursorAgentCliVersion()), `cli-${id}`);
      }
    );
  } finally {
    resetCursorAgentCliVersionCache();
    fs.rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(data, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("extractVersionIdFromInstallerScript reads downloads.cursor.com/lab/<id>/", () => {
  const script = `
    BASE="https://downloads.cursor.com/lab/2026.08.01-deadbeef/linux/x64"
    echo "$BASE"
  `;
  assert.equal(extractVersionIdFromInstallerScript(script), "2026.08.01-deadbeef");
  assert.equal(extractVersionIdFromInstallerScript("no version here"), null);
});

test("disk cache hit serves immediately without blocking on network", async () => {
  const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-cache-hit-"));
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-home-cache-"));
  let fetchCalls = 0;
  const cachedId = "2026.08.02-aabbcc1";
  try {
    configureCursorAgentCliVersionForTests({
      cacheDir,
      fetchImpl: (async () => {
        fetchCalls += 1;
        return new Response(`https://downloads.cursor.com/lab/2026.08.09-zzzzzzz/linux/x64/`, {
          status: 200,
        });
      }) as typeof fetch,
    });
    fs.writeFileSync(
      path.join(cacheDir, "cursor-agent-cli-version.json"),
      JSON.stringify({ version: cachedId, fetchedAt: Date.now() })
    );
    withEnv(
      {
        HOME: home,
        USERPROFILE: home,
        CURSOR_AGENT_CLI_VERSION: undefined,
        CURSOR_DATA_DIR: undefined,
      },
      () => {
        resetCursorAgentCliVersionCache();
        // Sync path returns disk cache immediately (oakimov SWR may refresh in background).
        assert.equal(getCursorAgentCliVersion(), cachedId);
        assert.equal(fetchCalls, 0, "must not block on network");
      }
    );
  } finally {
    resetCursorAgentCliVersionTestHooks();
    fs.rmSync(cacheDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("refreshCursorAgentCliVersionFromInstaller writes disk cache from HTML", async () => {
  const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-cache-refresh-"));
  const scrapedId = "2026.08.03-1122334";
  try {
    configureCursorAgentCliVersionForTests({
      cacheDir,
      fetchImpl: (async () =>
        new Response(
          `curl -fsSL https://downloads.cursor.com/lab/${scrapedId}/darwin/arm64/agent-cli-package.tar.gz`,
          { status: 200 }
        )) as typeof fetch,
    });
    resetCursorAgentCliVersionCache();
    const id = await refreshCursorAgentCliVersionFromInstaller();
    assert.equal(id, scrapedId);
    const onDisk = JSON.parse(
      fs.readFileSync(path.join(cacheDir, "cursor-agent-cli-version.json"), "utf8")
    ) as { version: string };
    assert.equal(onDisk.version, scrapedId);
  } finally {
    resetCursorAgentCliVersionTestHooks();
    fs.rmSync(cacheDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("invalid installer HTML falls through to pin", async () => {
  const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-cache-invalid-"));
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-cli-home-invalid-"));
  try {
    configureCursorAgentCliVersionForTests({
      cacheDir,
      fetchImpl: (async () =>
        new Response("<html>no lab url</html>", { status: 200 })) as typeof fetch,
    });
    withEnv(
      {
        HOME: home,
        USERPROFILE: home,
        CURSOR_AGENT_CLI_VERSION: undefined,
        CURSOR_DATA_DIR: undefined,
      },
      () => {
        resetCursorAgentCliVersionCache();
        assert.equal(getCursorAgentCliVersion(), CURSOR_AGENT_CLI_VERSION);
      }
    );
    const id = await refreshCursorAgentCliVersionFromInstaller();
    assert.equal(id, null);
  } finally {
    resetCursorAgentCliVersionTestHooks();
    fs.rmSync(cacheDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
