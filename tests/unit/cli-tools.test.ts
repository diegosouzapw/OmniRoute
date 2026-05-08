import test from "node:test";
import assert from "node:assert/strict";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
const {
  CLI_COMPAT_PROVIDER_IDS,
  CLI_COMPAT_OMITTED_PROVIDER_IDS,
  CLI_COMPAT_TOGGLE_IDS,
  IMPLEMENTED_CLI_FINGERPRINT_PROVIDER_IDS,
  normalizeCliCompatProviderId,
} = await import("../../src/shared/constants/cliCompatProviders.ts");
const { CLI_TOOL_IDS } = await import("../../src/shared/services/cliRuntime.ts");
const { applyFingerprint, isCliCompatEnabled, setCliCompatProviders } =
  await import("../../open-sse/config/cliFingerprints.ts");

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

test("CLI fingerprint toggles only expose implemented fingerprints and functional legacy aliases", () => {
  const implemented = new Set<string>(IMPLEMENTED_CLI_FINGERPRINT_PROVIDER_IDS);

  for (const providerId of CLI_COMPAT_PROVIDER_IDS) {
    assert.equal(
      implemented.has(providerId),
      true,
      `${providerId} should have an implemented fingerprint`
    );
  }

  for (const toggleId of CLI_COMPAT_TOGGLE_IDS) {
    const providerId = normalizeCliCompatProviderId(toggleId);
    assert.equal(
      implemented.has(providerId),
      true,
      `${toggleId} should map to an implemented fingerprint provider`
    );
  }

  for (const providerId of IMPLEMENTED_CLI_FINGERPRINT_PROVIDER_IDS) {
    assert.equal(CLI_COMPAT_PROVIDER_IDS.includes(providerId), true);
  }

  for (const providerId of CLI_COMPAT_OMITTED_PROVIDER_IDS) {
    assert.equal(CLI_COMPAT_PROVIDER_IDS.includes(providerId), false);
    assert.equal((CLI_COMPAT_TOGGLE_IDS as readonly string[]).includes(providerId), false);
  }

  assert.equal(CLI_COMPAT_TOGGLE_IDS.includes("copilot"), true);
  assert.equal(CLI_COMPAT_TOGGLE_IDS.includes("gemini-cli"), true);
  assert.equal((CLI_COMPAT_TOGGLE_IDS as readonly string[]).includes("github"), false);
});

test("CLI fingerprint preserves Codex executor User-Agent and maps legacy Copilot alias", () => {
  const codex = applyFingerprint(
    "codex",
    {
      Authorization: "Bearer token",
      "User-Agent": "codex-cli/0.125.0 (Windows 10.0.26100; x64)",
    },
    { model: "gpt-5.5", messages: [], stream: true }
  );

  assert.equal(codex.headers["User-Agent"], "codex-cli/0.125.0 (Windows 10.0.26100; x64)");
  assert.deepEqual(Object.keys(JSON.parse(codex.bodyString)), ["model", "stream", "messages"]);

  const copilot = applyFingerprint(
    "copilot",
    { Authorization: "Bearer token", Accept: "application/json" },
    { model: "gpt-4o", messages: [] }
  );

  assert.equal(copilot.headers["User-Agent"], "GitHubCopilotChat/0.45.1");

  const geminiCli = applyFingerprint(
    "gemini-cli",
    {
      Authorization: "Bearer token",
      "Content-Type": "application/json",
      "User-Agent":
        "GeminiCLI/0.40.1/gemini-2.5-flash (linux; arm64; terminal) google-api-nodejs-client/9.15.1",
      "X-Goog-Api-Client": "gl-node/22.22.2",
      Accept: "*/*",
    },
    {
      request: {},
      user_prompt_id: "prompt-id",
      project: "project-id",
      model: "gemini-2.5-flash",
    }
  );

  assert.deepEqual(Object.keys(JSON.parse(geminiCli.bodyString)), [
    "model",
    "project",
    "user_prompt_id",
    "request",
  ]);
  assert.deepEqual(Object.keys(geminiCli.headers), [
    "Content-Type",
    "User-Agent",
    "X-Goog-Api-Client",
    "Accept",
    "Authorization",
  ]);
});

test("CLI fingerprint keeps legacy Copilot settings functional without exposing duplicate UI toggles", () => {
  assert.equal(normalizeCliCompatProviderId("copilot"), "github");
  assert.equal(normalizeCliCompatProviderId("GitHub"), "github");

  try {
    setCliCompatProviders(["copilot"]);
    assert.equal(isCliCompatEnabled("github"), true);
    assert.equal(isCliCompatEnabled("copilot"), true);
    setCliCompatProviders(["gemini-cli"]);
    assert.equal(isCliCompatEnabled("gemini-cli"), true);
    assert.equal(isCliCompatEnabled("gemini"), false);
  } finally {
    setCliCompatProviders([]);
  }
});
