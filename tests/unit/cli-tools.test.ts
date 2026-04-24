import test from "node:test";
import assert from "node:assert/strict";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
const { CLI_COMPAT_PROVIDER_IDS } =
  await import("../../src/shared/constants/cliCompatProviders.ts");
const { CLI_TOOL_IDS } = await import("../../src/shared/services/cliRuntime.ts");

test("Amp CLI is registered as a guide-based CLI tool with shorthand mapping guidance", () => {
  const amp = CLI_TOOLS.amp;
  assert.ok(amp);
  assert.equal(amp.configType, "guide");
  assert.equal(amp.defaultCommand, "amp");
  assert.deepEqual(amp.modelAliases, ["g25p", "g25f", "cs45", "g54"]);

  const notesText = (amp.notes || [])
    .map((note) => note?.text || "")
    .join(" ")
    .toLowerCase();

  assert.match(notesText, /shorthand/);
  assert.match(notesText, /g25p/);
  assert.match(notesText, /claude-sonnet-4-5-20250929/);
});

test("Amp CLI is discoverable in runtime tooling but excluded from provider fingerprint toggles", () => {
  assert.ok(CLI_TOOL_IDS.includes("amp"));
  assert.equal(CLI_COMPAT_PROVIDER_IDS.includes("amp"), false);
});

test("Hermes quick-config is registered as a guide-based CLI tool", () => {
  const hermes = CLI_TOOLS.hermes;
  assert.ok(hermes);
  assert.equal(hermes.configType, "guide");
  assert.equal(hermes.defaultCommand, "hermes");
  assert.ok(Array.isArray(hermes.guideSteps));
  assert.ok(String(hermes.codeBlock?.code || "").includes('"baseURL": "{{baseUrl}}"'));
  assert.ok(CLI_TOOL_IDS.includes("hermes"));
});
