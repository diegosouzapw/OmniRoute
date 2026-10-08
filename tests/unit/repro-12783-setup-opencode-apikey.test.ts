import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { resolveOpencodeTarget } from "../../bin/cli/commands/setup-opencode.mjs";

/** Point OMNIROUTE_CONTEXT config resolution at an isolated, throwaway DATA_DIR. */
function withIsolatedContext(contextConfig, fn) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-setup-opencode-test-"));
  const originalDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = dir;
  writeFileSync(
    join(dir, "config.json"),
    JSON.stringify({
      version: 1,
      currentContext: "remote",
      contexts: { remote: contextConfig },
    })
  );
  try {
    return fn();
  } finally {
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    rmSync(dir, { recursive: true, force: true });
  }
}

function withEnvApiKey(value, fn) {
  const original = process.env.OMNIROUTE_API_KEY;
  if (value === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = value;
  try {
    return fn();
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = original;
  }
}

test("setup-opencode: --api-key typed AFTER the subcommand name is not stolen by the parent program's global option", async () => {
  const { createProgram } = await import("../../bin/cli/program.mjs");
  const program = createProgram();
  const setupOpencode = program.commands.find((c) => c.name() === "setup-opencode");
  assert.ok(setupOpencode, "setup-opencode subcommand must be registered");

  let capturedApiKey;
  setupOpencode._actionHandler = null; // avoid the real network-calling action
  setupOpencode.action((opts, cmd) => {
    capturedApiKey = cmd.optsWithGlobals().apiKey ?? opts.apiKey;
  });

  await program.parseAsync(
    [
      "node",
      "omniroute",
      "setup-opencode",
      "--remote",
      "http://100.64.0.1:20128",
      "--api-key",
      "sk-TESTKEY123",
    ],
    { from: "node" }
  );

  assert.equal(
    capturedApiKey,
    "sk-TESTKEY123",
    "the CLI-supplied --api-key value must reach the setup-opencode action handler"
  );
});

test("resolveOpencodeTarget: (a) explicit --api-key flag wins over an active context's management token", () => {
  withEnvApiKey(undefined, () => {
    withIsolatedContext(
      { baseUrl: "http://100.64.0.1:20128", accessToken: "oma_live_CONTEXT_TOKEN" },
      () => {
        const { apiKey } = resolveOpencodeTarget({ apiKey: "sk-FLAG", context: "remote" });
        assert.equal(apiKey, "sk-FLAG");
      }
    );
  });
});

test("resolveOpencodeTarget: (b) OMNIROUTE_API_KEY env wins over an active context's management token when no flag is passed", () => {
  withEnvApiKey("sk-ENVKEY", () => {
    withIsolatedContext(
      { baseUrl: "http://100.64.0.1:20128", accessToken: "oma_live_CONTEXT_TOKEN" },
      () => {
        const { apiKey } = resolveOpencodeTarget({ context: "remote" });
        assert.equal(apiKey, "sk-ENVKEY");
      }
    );
  });
});

test("resolveOpencodeTarget: (c) the context's token is used only when neither a flag nor the env var is set", () => {
  withEnvApiKey(undefined, () => {
    withIsolatedContext(
      { baseUrl: "http://100.64.0.1:20128", accessToken: "oma_live_CONTEXT_TOKEN" },
      () => {
        const { apiKey } = resolveOpencodeTarget({ context: "remote" });
        assert.equal(apiKey, "oma_live_CONTEXT_TOKEN");
      }
    );
  });
});

test("resolveOpencodeTarget: falls back to '' when neither a flag, env var, nor a resolvable context is present", () => {
  withEnvApiKey(undefined, () => {
    withIsolatedContext({ baseUrl: "http://100.64.0.1:20128" }, () => {
      const { apiKey } = resolveOpencodeTarget({
        remote: "http://100.64.0.1:20128",
        context: "__no-such-context__",
      });
      assert.equal(apiKey, "");
    });
  });
});
