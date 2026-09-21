import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(import.meta.dirname, "../../..");
const cliPath = path.join(repoRoot, "bin", "omniroute.mjs");

test("#12407: config set claude preserves existing settings and writes Claude Code env keys", async () => {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-claude-config-"));
  try {
    const settingsPath = path.join(home, ".claude", "settings.json");
    await fs.mkdir(path.dirname(settingsPath), { recursive: true });
    await fs.writeFile(
      settingsPath,
      JSON.stringify(
        {
          model: "existing-model",
          effortLevel: "high",
          hooks: { PreToolUse: [{ command: "echo keep" }] },
          statusLine: { type: "command", command: "omniroute status" },
          env: { KEEP_ME: "1", ANTHROPIC_BASE_URL: "http://old" },
        },
        null,
        2
      )
    );

    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [
        cliPath,
        "config",
        "set",
        "claude",
        "--model",
        "claude-fallback",
        "--yes",
        "--non-interactive",
        "--allow-container-write",
      ],
      {
        cwd: repoRoot,
        env: {
          ...process.env,
          HOME: home,
          USERPROFILE: home,
          OMNIROUTE_API_KEY: "sk_test_12407",
          OMNIROUTE_BASE_URL: "http://localhost:20128/v1",
        },
        timeout: 30_000,
      }
    );

    assert.match(stdout + stderr, /Config written/);
    const written = JSON.parse(await fs.readFile(settingsPath, "utf8"));

    assert.equal(written.model, "claude-fallback");
    assert.equal(written.effortLevel, "high");
    assert.deepEqual(written.hooks, { PreToolUse: [{ command: "echo keep" }] });
    assert.deepEqual(written.statusLine, { type: "command", command: "omniroute status" });
    assert.equal(written.env.KEEP_ME, "1");
    assert.equal(written.env.ANTHROPIC_BASE_URL, "http://localhost:20128");
    assert.equal(written.env.ANTHROPIC_AUTH_TOKEN, "sk_test_12407");
    assert.equal(written.env.ANTHROPIC_MODEL, "claude-fallback");
    assert.equal(written.env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
    assert.equal("baseUrl" in written, false);
    assert.equal("authToken" in written, false);
    assert.equal("models" in written, false);
  } finally {
    await fs.rm(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
