import test from "node:test";
import assert from "node:assert/strict";

import {
  CLI_TARGET_MANIFEST,
  listManifestTargets,
  manifestModelArgs,
  manifestRequiresModel,
  resolveManifestTarget,
} from "../../../bin/cli/cli-manifest.mjs";
import { listRunTargets, resolveRunTarget } from "../../../bin/cli/commands/run.mjs";
import { listConfigureTargets, SETUP_MODULES } from "../../../bin/cli/commands/configure.mjs";
import { runCompletionCommand } from "../../../bin/cli/commands/completion.mjs";
import {
  CLI_TOOL_IDS,
  CLI_TOOL_ALIASES,
  normalizeCliToolId,
  getCliToolCommandCandidates,
  getCliConfigPaths,
  getCliPrimaryConfigPath,
} from "../../../src/shared/services/cliRuntime";
import { getCliTool, listCliTools } from "../../../src/shared/constants/cliTools";
import {
  CLI_INTEGRATION_MANIFEST,
  CLI_INTEGRATION_PLATFORMS,
  getCliDeclaredPrimaryConfigPaths,
  getCliProviderAlias,
  listCliIntegrationIds,
} from "../../../src/shared/constants/cliIntegrationManifest";
import { BUILT_IN_AGENT_IDS } from "../../../src/lib/acp/registry";
import { CONFIG_GENERATOR_IDS } from "../../../src/lib/cli-helper/config-generator";

/**
 * Drift guard for the executable manifest (`bin/cli/cli-manifest.mjs`).
 *
 * The manifest is the single declaration of which targets `omniroute run` /
 * `omniroute configure` / shell completion expose. These assertions fail as
 * soon as any consumer surface — or the server-side runtime catalog — starts
 * disagreeing with it silently.
 */

const manifestIds = Object.keys(CLI_TARGET_MANIFEST);

test("neutral manifest is the exact union of every CLI integration surface", () => {
  const observed = new Set([
    ...CLI_TOOL_IDS,
    ...listCliTools().map((tool) => tool.id),
    ...BUILT_IN_AGENT_IDS,
  ]);
  assert.deepEqual([...observed].sort(), Object.keys(CLI_INTEGRATION_MANIFEST).sort());
  assert.deepEqual(manifestIds.sort(), Object.keys(CLI_INTEGRATION_MANIFEST).sort());
});

test("each consumer derives its exact capability set from the neutral manifest", () => {
  assert.deepEqual([...CLI_TOOL_IDS].sort(), listCliIntegrationIds("detect").sort());
  assert.deepEqual(
    listCliTools()
      .map((tool) => tool.id)
      .sort(),
    listCliIntegrationIds("catalog").sort()
  );
  assert.deepEqual([...CONFIG_GENERATOR_IDS].sort(), listCliIntegrationIds("generate").sort());
  assert.deepEqual([...BUILT_IN_AGENT_IDS].sort(), listCliIntegrationIds("agentBackend").sort());
});

test("aliases, binary candidates and ACP badges cannot drift from the neutral manifest", () => {
  const expectedAliases: Record<string, string> = {};
  for (const [id, entry] of Object.entries(CLI_INTEGRATION_MANIFEST)) {
    for (const alias of entry.aliases) expectedAliases[alias] = id;
    if (entry.surfaces.detect) {
      assert.deepEqual(getCliToolCommandCandidates(id), entry.binaries, `${id} binaries`);
    }
    const catalogEntry = getCliTool(id);
    if (catalogEntry) {
      assert.equal(
        catalogEntry.acpSpawnable,
        Boolean(entry.agentBackend),
        `${id} ACP badge must match the executable backend registry`
      );
    }
  }
  assert.deepEqual(CLI_TOOL_ALIASES, expectedAliases);
});

test("platforms, provider aliases, and primary config paths are manifest-owned contracts", () => {
  assert.deepEqual(CLI_INTEGRATION_PLATFORMS, ["linux", "darwin", "win32"]);

  for (const [id, entry] of Object.entries(CLI_TARGET_MANIFEST)) {
    assert.deepEqual(entry.platforms, CLI_INTEGRATION_PLATFORMS, `${id} platforms`);
    assert.equal(entry.providerAlias, getCliProviderAlias(id), `${id} provider alias`);

    if (!CLI_INTEGRATION_MANIFEST[id].surfaces.detect) continue;
    const declared = getCliDeclaredPrimaryConfigPaths(id);
    assert.deepEqual(entry.primaryConfigPaths, declared, `${id} config contract`);
    const actual = getCliPrimaryConfigPath(id);
    if (declared.length === 0) {
      assert.equal(actual, null, `${id} must not invent a primary config path`);
      continue;
    }
    assert.ok(actual, `${id} must resolve a primary config path`);
    const normalizedActual = String(actual).replaceAll("\\", "/");
    assert.ok(
      declared.some((suffix) => normalizedActual.endsWith(suffix.replaceAll("\\", "/"))),
      `${id} primary config path '${normalizedActual}' is outside its manifest contract`
    );
  }
});

test("ZCode's framed app-server is not advertised as an ACP or line-stdio backend", () => {
  assert.equal(CLI_INTEGRATION_MANIFEST.zcode.agentBackend, undefined);
  assert.equal(getCliTool("zcode")?.acpSpawnable, false);
});

test("every manifest target is canonical and each claimed surface is physically backed", () => {
  for (const [id] of Object.entries(CLI_TARGET_MANIFEST)) {
    assert.equal(normalizeCliToolId(id), id, `${id} must be canonical (not an alias)`);
    const contract = CLI_INTEGRATION_MANIFEST[id];
    if (contract.surfaces.detect) {
      assert.ok(CLI_TOOL_IDS.includes(id), `${id} must exist in cliRuntime CLI_TOOLS`);
      assert.ok(getCliConfigPaths(id), `${id} must resolve config paths in the runtime`);
    }
    // Configure targets surface in the dashboard picker flows, so they must be
    // cataloged for the UI. Run-only targets (e.g. gemini) may stay CLI-only.
    if (contract.surfaces.catalog) {
      assert.ok(getCliTool(id), `${id} must exist in the UI catalog (cliTools.ts)`);
    }
  }
});

test("manifest aliases never conflict with runtime aliases", () => {
  for (const [id, entry] of Object.entries(CLI_TARGET_MANIFEST)) {
    for (const alias of entry.aliases) {
      const runtimeTarget = CLI_TOOL_ALIASES[alias];
      if (runtimeTarget !== undefined) {
        assert.equal(
          runtimeTarget,
          id,
          `alias '${alias}' maps to '${id}' in the manifest but '${runtimeTarget}' in cliRuntime`
        );
      }
    }
  }
});

test("kilocode variants stay a single canonical target in both worlds", () => {
  for (const legacy of ["kilocode", "kilo-code", "kilo_cli"]) {
    assert.equal(resolveManifestTarget(legacy, "configure"), "kilo");
    assert.equal(normalizeCliToolId(legacy), "kilo");
  }
});

test("run command derives targets and aliases from the manifest", () => {
  assert.deepEqual(listRunTargets(), listManifestTargets("run"));
  for (const [id, entry] of Object.entries(CLI_TARGET_MANIFEST)) {
    const expected = entry.run ? id : undefined;
    assert.equal(resolveRunTarget(id), expected, `resolveRunTarget(${id})`);
    for (const alias of entry.aliases) {
      assert.equal(resolveRunTarget(alias), expected, `resolveRunTarget(${alias})`);
    }
  }
  assert.equal(resolveRunTarget("definitely-not-a-cli"), undefined);
});

test("configure command derives targets from the manifest and has a recipe per target", () => {
  assert.deepEqual(listConfigureTargets(), listManifestTargets("configure"));
  for (const id of listManifestTargets("configure")) {
    const hasRecipe = id === "codex" || Boolean(SETUP_MODULES[id]);
    assert.ok(hasRecipe, `configure target '${id}' has no setup recipe`);
  }
  for (const id of Object.keys(SETUP_MODULES)) {
    assert.ok(
      listManifestTargets("configure").includes(id),
      `setup recipe '${id}' is not a manifest configure target`
    );
  }
});

test("completion scripts embed the manifest-derived target lists", async () => {
  const runWords = listManifestTargets("run").join(" ");
  const configureWords = listManifestTargets("configure").join(" ");

  for (const shell of ["bash", "zsh", "fish"] as const) {
    const chunks: string[] = [];
    const originalWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = ((chunk: unknown) => {
      if (typeof chunk === "string") chunks.push(chunk);
      return true;
    }) as typeof process.stdout.write;
    try {
      assert.equal(await runCompletionCommand(shell), 0);
    } finally {
      process.stdout.write = originalWrite;
    }
    const output = chunks.join("");
    assert.ok(output.includes(runWords), `${shell} completion must list run targets`);
    assert.ok(output.includes(configureWords), `${shell} completion must list configure targets`);
  }
});

test("model-flag wiring stays declared in the manifest", () => {
  assert.deepEqual(manifestModelArgs("aider", "glm/glm-5.2"), ["--model", "openai/glm/glm-5.2"]);
  assert.deepEqual(manifestModelArgs("opencode", "glm/glm-5.2"), [
    "--model",
    "omniroute/glm/glm-5.2",
  ]);
  assert.deepEqual(manifestModelArgs("qwen", "glm/glm-5.2"), ["--model", "glm/glm-5.2"]);
  assert.deepEqual(manifestModelArgs("claude", "glm/glm-5.2"), []);
  assert.deepEqual(manifestModelArgs("codex", "glm/glm-5.2"), []);
  assert.equal(manifestRequiresModel("qwen"), true);
  assert.equal(manifestRequiresModel("aider"), false);
});
