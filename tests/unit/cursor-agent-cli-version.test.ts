import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const {
  CURSOR_AGENT_CLI_VERSION,
  detectCursorAgentCliVersionFromFs,
  extractVersionIdFromResolvedPath,
  formatCursorAgentClientVersion,
  getCursorAgentCliVersion,
  newestVersionInDir,
  resetCursorAgentCliVersionCache,
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
    fs.rmSync(tmp, { recursive: true, force: true });
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
    fs.rmSync(home, { recursive: true, force: true });
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
    fs.rmSync(home, { recursive: true, force: true });
    fs.rmSync(data, { recursive: true, force: true });
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
    fs.rmSync(home, { recursive: true, force: true });
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
        assert.equal(
          formatCursorAgentClientVersion(getCursorAgentCliVersion()),
          `cli-${id}`
        );
      }
    );
  } finally {
    resetCursorAgentCliVersionCache();
    fs.rmSync(home, { recursive: true, force: true });
    fs.rmSync(data, { recursive: true, force: true });
  }
});
