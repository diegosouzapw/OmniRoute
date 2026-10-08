import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { generateCodexConfig } from "../../../src/lib/cli-helper/config-generator/codex.ts";
import { generateOpencodeConfig } from "../../../src/lib/cli-helper/config-generator/opencode.ts";

function symlinkOrSkip(t: test.TestContext, target: string, link: string): boolean {
  try {
    fs.symlinkSync(target, link, "file");
    return true;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EPERM" || code === "EACCES" || code === "ENOTSUP") {
      t.skip(`file symlinks unavailable on this platform (${code})`);
      return false;
    }
    throw error;
  }
}

test("Codex generator refuses to follow an existing config.toml symlink", async (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-symlink-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const target = path.join(directory, "operator.toml");
  const configPath = path.join(directory, "config.toml");
  fs.writeFileSync(target, 'model = "private/operator-model"\n', "utf8");
  if (!symlinkOrSkip(t, target, configPath)) return;

  await assert.rejects(
    generateCodexConfig({
      baseUrl: "http://localhost:20128",
      apiKey: "not-written",
      configPath,
    }),
    /symbolic link|symlink/i
  );
  assert.equal(fs.readFileSync(target, "utf8"), 'model = "private/operator-model"\n');
});

test("OpenCode generator refuses to follow an existing JSONC config symlink", async (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-symlink-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const target = path.join(directory, "operator.jsonc");
  const configPath = path.join(directory, "opencode.jsonc");
  fs.writeFileSync(target, '{ "operatorSecret": "must-not-be-merged" }\n', "utf8");
  if (!symlinkOrSkip(t, target, configPath)) return;

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  await assert.rejects(
    generateOpencodeConfig({
      baseUrl: "http://localhost:20128",
      apiKey: "not-written",
      configPath,
    }),
    /symbolic link|symlink/i
  );
  assert.equal(fs.readFileSync(target, "utf8"), '{ "operatorSecret": "must-not-be-merged" }\n');
});
