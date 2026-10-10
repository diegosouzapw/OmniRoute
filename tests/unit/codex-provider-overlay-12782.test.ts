import test, { after, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "smol-toml";

const root = mkdtempSync(join(tmpdir(), "omni-codex-overlay-12782-"));
process.env.DATA_DIR = join(root, "data");
process.env.OMNIROUTE_PLUGIN_DIR = join(root, "plugins");
process.env.NODE_ENV = "test";
const { runSetupCodexCommand, syncCodexProfilesFromModels } =
  await import("../../bin/cli/commands/setup-codex.mjs");
const originalFetch = globalThis.fetch;
const originalLog = console.log;
const originalKey = process.env.OMNIROUTE_API_KEY;
const catalog = { data: [{ id: "auto/best-coding", context_length: 128000 }] };
const baseConfig =
  'model = "gpt-5.6-sol"\nmodel_reasoning_effort = "low"\n[windows]\nsandbox = "elevated"\n';
let output: string[] = [];

function fixture(base?: string) {
  const codexHome = mkdtempSync(join(root, "profiles-"));
  if (base !== undefined) writeFileSync(join(codexHome, "config.toml"), base);
  globalThis.fetch = async () => Response.json(catalog);
  console.log = (...args: unknown[]) => output.push(args.join(" "));
  delete process.env.OMNIROUTE_API_KEY;
  return codexHome;
}
function overlay(codexHome: string) {
  return parse(readFileSync(join(codexHome, "auto-best-coding.config.toml"), "utf8"));
}
afterEach(() => {
  globalThis.fetch = originalFetch;
  console.log = originalLog;
  output = [];
  if (originalKey === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = originalKey;
});
after(() => rmSync(root, { recursive: true, force: true }));

test("setup defines its missing provider in the overlay and preserves the base config", async () => {
  const codexHome = fixture(baseConfig);
  assert.equal(
    await runSetupCodexCommand({
      codexHome,
      remote: "https://proxy.example/v1",
      allowContainerWrite: true,
    }),
    0
  );
  const profile = overlay(codexHome);
  assert.equal(profile.model, "auto/best-coding");
  assert.equal(profile.model_provider, "omniroute");
  assert.deepEqual(profile.model_providers, {
    omniroute: {
      name: "OmniRoute",
      base_url: "https://proxy.example/v1",
      wire_api: "responses",
      requires_openai_auth: false,
    },
  });
  assert.equal(readFileSync(join(codexHome, "config.toml"), "utf8"), baseConfig);
});

test("fresh local setup needs no base config and uses the selected port", async () => {
  const codexHome = fixture();
  assert.equal(
    await runSetupCodexCommand({ codexHome, port: "21456", allowContainerWrite: true }),
    0
  );
  const profile = overlay(codexHome);
  assert.deepEqual(profile.model_providers, {
    omniroute: {
      name: "OmniRoute",
      base_url: "http://localhost:21456/v1",
      wire_api: "responses",
      requires_openai_auth: false,
    },
  });
  assert.equal(existsSync(join(codexHome, "config.toml")), false);
});

test("authenticated setup refers to an env key without persisting or printing the key", async () => {
  const codexHome = fixture(baseConfig);
  const key = "synthetic-codex-overlay-secret";
  assert.equal(
    await runSetupCodexCommand({ codexHome, apiKey: key, allowContainerWrite: true }),
    0
  );
  const profile = overlay(codexHome);
  const providers = profile.model_providers as Record<string, Record<string, unknown>>;
  assert.equal(providers?.omniroute?.env_key, "OMNIROUTE_API_KEY");
  assert.ok(!readFileSync(join(codexHome, "auto-best-coding.config.toml"), "utf8").includes(key));
  assert.ok(!output.join("\n").includes(key));
  assert.match(output.join("\n"), /OMNIROUTE_API_KEY/);
});

test("an existing provider keeps its endpoint and command-backed auth through inheritance", async () => {
  const base = `${baseConfig}\n[model_providers.omniroute]\nname = "Custom route"\nbase_url = "https://existing.example/v1"\n[model_providers.omniroute.auth]\ncommand = "get-local-token"\n`;
  const codexHome = fixture(base);
  assert.equal(await runSetupCodexCommand({ codexHome, allowContainerWrite: true }), 0);
  assert.equal(overlay(codexHome).model_providers, undefined);
  assert.equal(readFileSync(join(codexHome, "config.toml"), "utf8"), base);
});

test("dry run includes the missing provider but writes no profiles or secrets", async () => {
  const codexHome = fixture(baseConfig);
  assert.equal(
    await runSetupCodexCommand({ codexHome, apiKey: "synthetic-preview-secret", dryRun: true }),
    0
  );
  assert.match(output.join("\n"), /\[model_providers.omniroute\]/);
  assert.ok(!output.join("\n").includes("synthetic-preview-secret"));
  assert.equal(existsSync(join(codexHome, "auto-best-coding.config.toml")), false);
  assert.equal(readFileSync(join(codexHome, "config.toml"), "utf8"), baseConfig);
});

test("invalid base TOML aborts before any profile write", async () => {
  const codexHome = fixture('model = "unterminated');
  assert.equal(await runSetupCodexCommand({ codexHome, allowContainerWrite: true }), 1);
  assert.equal(existsSync(join(codexHome, "auto-best-coding.config.toml")), false);
});

test("catalog-only auto-sync preserves its existing provider-selection contract", async () => {
  const codexHome = fixture(baseConfig);
  await syncCodexProfilesFromModels(catalog.data, { codexHome });
  assert.equal(overlay(codexHome).model_providers, undefined);
  assert.equal(readFileSync(join(codexHome, "config.toml"), "utf8"), baseConfig);
});

test("later catalog sync preserves the provider bootstrapped by explicit setup", async () => {
  const codexHome = fixture(baseConfig);
  await runSetupCodexCommand({
    codexHome,
    apiKey: "synthetic-bootstrap-key",
    allowContainerWrite: true,
  });
  const providerBefore = overlay(codexHome).model_providers;
  await syncCodexProfilesFromModels(catalog.data, { codexHome });
  assert.deepEqual(overlay(codexHome).model_providers, providerBefore);
});

test("catalog sync preserves custom overlay auth without exposing it in a preview", async () => {
  const codexHome = fixture(baseConfig);
  const file = join(codexHome, "auto-best-coding.config.toml");
  writeFileSync(
    file,
    'model = "auto/best-coding"\n[model_providers.omniroute]\nbase_url = "https://custom.example/v1"\nexperimental_bearer_token = "synthetic-existing-overlay-secret"\n'
  );
  const providerBefore = overlay(codexHome).model_providers;
  await syncCodexProfilesFromModels(catalog.data, { codexHome, dryRun: true });
  assert.ok(!output.join("\n").includes("synthetic-existing-overlay-secret"));
  await syncCodexProfilesFromModels(catalog.data, { codexHome });
  assert.deepEqual(overlay(codexHome).model_providers, providerBefore);
});

test("explicit setup preserves provider tables already stored in an overlay", async () => {
  const codexHome = fixture(baseConfig);
  const file = join(codexHome, "auto-best-coding.config.toml");
  writeFileSync(
    file,
    'model = "auto/best-coding"\n[model_providers.omniroute]\nbase_url = "https://custom.example/v1"\n[model_providers.omniroute.auth]\ncommand = "get-local-token"\n[model_providers.other]\nbase_url = "https://other.example/v1"\n'
  );
  const before = overlay(codexHome).model_providers;
  await runSetupCodexCommand({ codexHome, allowContainerWrite: true });
  assert.deepEqual(overlay(codexHome).model_providers, before);
});
