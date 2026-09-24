import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";

import { CLI_TOOLS, getCliTool } from "../../src/shared/constants/cliTools.ts";
import {
  CLI_TOOL_IDS,
  getCliConfigPaths,
  normalizeCliToolId,
} from "../../src/shared/services/cliRuntime.ts";
import { getWhyCodesConfigPath } from "../../src/lib/cli-helper/config-generator/whycodesHome.ts";

test("CLI_TOOLS.whycodes is an agent with full base URL and no ACP spawn", () => {
  const tool = getCliTool("whycodes");
  assert.ok(tool, "catalog must include tool id whycodes");
  assert.equal(tool?.id, "whycodes");
  assert.equal(tool?.category, "agent");
  assert.equal(tool?.baseUrlSupport, "full");
  assert.equal(tool?.acpSpawnable, false);
  assert.equal(tool?.defaultCommand, "whycodes");
  assert.equal(tool?.configType, "custom");
  assert.equal(
    Object.values(CLI_TOOLS).some((entry) => entry.id === "whycodes" && entry.category === "code"),
    false,
    "WhyCodes must not appear as a CLI Code entry"
  );
});

test("runtime catalog detects whycodes and honours WHYCODES_HOME", () => {
  assert.ok(CLI_TOOL_IDS.includes("whycodes"));
  assert.equal(normalizeCliToolId("why-codes"), "whycodes");
  assert.equal(normalizeCliToolId("why"), "whycodes");
  const previous = process.env.WHYCODES_HOME;
  const home = path.join(os.tmpdir(), "omniroute-whycodes-paths");
  process.env.WHYCODES_HOME = home;
  try {
    const paths = getCliConfigPaths("whycodes");
    assert.equal(paths?.config, getWhyCodesConfigPath());
    assert.equal(paths?.config, path.join(home, "config.toml"));
  } finally {
    if (previous === undefined) delete process.env.WHYCODES_HOME;
    else process.env.WHYCODES_HOME = previous;
  }
});
