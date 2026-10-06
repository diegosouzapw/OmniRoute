import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import * as toolDetector from "../../../src/lib/cli-helper/tool-detector.ts";

test("detectTool reports an existing opencode.jsonc as the real config path (#10227)", async () => {
  const xdgRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-detector-jsonc-"));
  const configDir = path.join(xdgRoot, "opencode");
  const configPath = path.join(configDir, "opencode.jsonc");
  const previousXdg = process.env.XDG_CONFIG_HOME;

  toolDetector.__setExecFileImpl(async () => ({ stdout: "v1.0.0\n", stderr: "" }));

  try {
    fs.mkdirSync(configDir, { recursive: true });
    fs.writeFileSync(
      configPath,
      `{
  // OpenCode accepts JSONC
  "provider": {
    "omniroute": { "options": { "baseURL": "http://localhost:20128/v1" } },
  },
}\n`
    );
    process.env.XDG_CONFIG_HOME = xdgRoot;

    const result = await toolDetector.detectTool("opencode");

    assert.ok(result !== null);
    assert.equal(result.configPath, configPath);
    assert.equal(result.configured, true);
    assert.match(result.configContents || "", /OpenCode accepts JSONC/);
  } finally {
    if (previousXdg === undefined) delete process.env.XDG_CONFIG_HOME;
    else process.env.XDG_CONFIG_HOME = previousXdg;
    fs.rmSync(xdgRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
