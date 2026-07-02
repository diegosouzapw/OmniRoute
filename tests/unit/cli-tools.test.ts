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

test("Amp CLI was removed from CLI_TOOLS per plan 14 D17 (MITM backlog plan 11)", () => {
  // amp (Sourcegraph) removed from CLI_TOOLS in plan 14 because it has a closed ecosystem
  // and does not support a generic custom base URL. Cross-ref: plan 11 MITM backlog.
  assert.equal((CLI_TOOLS as Record<string, unknown>).amp, undefined);
  // amp may still appear in cliRuntime.ts (runtime detection catalog — separate from UI catalog)
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
  assert.equal((CLI_COMPAT_TOGGLE_IDS as readonly string[]).includes("github"), false);
});

test("CLI fingerprint strips OmniRoute internal body fields before upstream serialization", () => {
  const claude = applyFingerprint(
    "claude",
    { Authorization: "Bearer token" },
    {
      model: "claude-sonnet-4-6",
      messages: [],
      stream: true,
      _claudeCodeRequiresLowercaseToolNames: true,
    }
  );

  const body = JSON.parse(claude.bodyString);
  assert.equal(body._claudeCodeRequiresLowercaseToolNames, undefined);
  assert.deepEqual(Object.keys(body), ["model", "messages", "stream"]);
});

test("CLI fingerprint preserves Codex executor User-Agent and maps legacy Copilot alias", () => {
  const codex = applyFingerprint(
    "codex",
    {
      Authorization: "Bearer token",
      "User-Agent": "codex-cli/0.142.0 (Windows 10.0.26200; x64)",
    },
    { model: "gpt-5.5", messages: [], stream: true }
  );

  assert.equal(codex.headers["User-Agent"], "codex-cli/0.142.0 (Windows 10.0.26200; x64)");
  assert.deepEqual(Object.keys(JSON.parse(codex.bodyString)), ["model", "stream", "messages"]);

  const copilot = applyFingerprint(
    "copilot",
    { Authorization: "Bearer token", Accept: "application/json" },
    { model: "gpt-4o", messages: [] }
  );

  assert.equal(copilot.headers["User-Agent"], "GitHubCopilotChat/0.54.0");
});

test("CLI fingerprint keeps legacy Copilot settings functional without exposing duplicate UI toggles", () => {
  assert.equal(normalizeCliCompatProviderId("copilot"), "github");
  assert.equal(normalizeCliCompatProviderId("GitHub"), "github");

  try {
    setCliCompatProviders(["copilot"]);
    assert.equal(isCliCompatEnabled("github"), true);
    assert.equal(isCliCompatEnabled("copilot"), true);
  } finally {
    setCliCompatProviders([]);
  }
});
