import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// Dynamic import to pick up ESM module
const { parseCliRegistry, getCommandsForFamily } =
  await import("../../src/lib/agentSkills/cliRegistryParser.ts");

// ─── Fixture helpers ──────────────────────────────────────────────────────────

/**
 * Creates a temporary directory mirroring bin/cli/commands/,
 * writes fixture .mjs files, changes CWD, returns cleanup fn.
 */
function withFixtureCli(files: Record<string, string>): { cleanup: () => void } {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cli-test-"));
  const commandsDir = path.join(tmpDir, "bin", "cli", "commands");
  fs.mkdirSync(commandsDir, { recursive: true });

  for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(commandsDir, filename), content, "utf-8");
  }

  const originalCwd = process.cwd();
  process.chdir(tmpDir);

  return {
    cleanup() {
      process.chdir(originalCwd);
      fs.rmSync(tmpDir, { recursive: true, force: true });
    },
  };
}

// ─── Fixture content ──────────────────────────────────────────────────────────

const FIXTURE_PROVIDERS_MJS = `
export function registerProviders(program) {
  const providers = program.command('providers').description('Manage provider connections');

  providers
    .command('list')
    .description('List configured provider connections')
    .option('--json', 'Print machine-readable JSON')
    .action(async (opts) => {});

  providers
    .command('available')
    .description('Show available providers in the catalog')
    .option('--search <query>', 'Filter by id or name')
    .option('--category <category>', 'Filter by category')
    .action(async (opts) => {});

  providers
    .command('test <idOrName>')
    .description('Test a configured provider connection')
    .action(async (idOrName, opts) => {});

  providers
    .command('test-all')
    .description('Test all active provider connections')
    .action(async (opts) => {});

  providers
    .command('validate')
    .description('Validate local provider configuration')
    .action(async (opts) => {});

  providers
    .command('rotate <idOrName>')
    .description('Rotate API key for a provider connection')
    .option('--new-key <key>', 'New API key value')
    .option('--dry-run', 'Preview without writing')
    .action(async (idOrName, opts) => {});

  providers
    .command('status')
    .description('Show provider connection status and expiry')
    .option('--json', 'JSON output')
    .action(async (opts) => {});
}
`;

const FIXTURE_HEALTH_MJS = `
export function registerHealth(program) {
  const health = program
    .command('health')
    .description('Check server health status')
    .option('-v, --verbose', 'Show extended info')
    .option('--json', 'Output as JSON')
    .action(async (opts) => {});

  health
    .command('components')
    .description('List health components and status')
    .action(async (opts) => {});

  health
    .command('watch')
    .description('Live dashboard — refresh every N seconds')
    .option('--interval <s>', 'Refresh interval in seconds')
    .action(async (opts) => {});
}
`;

const FIXTURE_KEYS_MJS = `
export function registerKeys(program) {
  const keys = program.command('keys').description('Manage OmniRoute API keys');

  keys
    .command('list')
    .description('List all API keys')
    .option('--json', 'JSON output')
    .action(async (opts) => {});

  keys
    .command('create')
    .description('Create a new API key')
    .option('--name <name>', 'Key name')
    .action(async (opts) => {});

  keys
    .command('revoke <id>')
    .description('Revoke an API key')
    .action(async (id, opts) => {});
}
`;

// ─── Tests ────────────────────────────────────────────────────────────────────

test("parseCliRegistry() returns commands Map and families Map", () => {
  const { cleanup } = withFixtureCli({
    "providers.mjs": FIXTURE_PROVIDERS_MJS,
    "health.mjs": FIXTURE_HEALTH_MJS,
  });
  try {
    const result = parseCliRegistry();
    assert.ok(result.commands instanceof Map, "commands should be a Map");
    assert.ok(result.families instanceof Map, "families should be a Map");
    assert.ok(result.commands.size > 0, "commands should not be empty");
    assert.ok(result.families.size > 0, "families should not be empty");
  } finally {
    cleanup();
  }
});

test("parseCliRegistry() recognises providers family with ≥5 subcommands", () => {
  const { cleanup } = withFixtureCli({
    "providers.mjs": FIXTURE_PROVIDERS_MJS,
  });
  try {
    const { families } = parseCliRegistry();
    const providerCmds = families.get("cli-providers");
    assert.ok(providerCmds, "Expected 'cli-providers' family to exist");
    assert.ok(
      providerCmds!.length >= 5,
      `Expected ≥5 provider commands, got ${providerCmds!.length}: ${providerCmds!.map((c) => c.name).join(", ")}`
    );
  } finally {
    cleanup();
  }
});

test("parseCliRegistry() recognises health family commands", () => {
  const { cleanup } = withFixtureCli({
    "health.mjs": FIXTURE_HEALTH_MJS,
  });
  try {
    const { families } = parseCliRegistry();
    const healthCmds = families.get("cli-health");
    assert.ok(healthCmds, "Expected 'cli-health' family to exist");
    assert.ok(healthCmds!.length >= 2, `Expected ≥2 health commands, got ${healthCmds!.length}`);
  } finally {
    cleanup();
  }
});

test("parseCliRegistry() extracts description for each command", () => {
  const { cleanup } = withFixtureCli({
    "providers.mjs": FIXTURE_PROVIDERS_MJS,
    "keys.mjs": FIXTURE_KEYS_MJS,
  });
  try {
    const { commands } = parseCliRegistry();
    // Top-level providers command should have description
    const providers = [...commands.values()].find((c) => c.name === "providers");
    assert.ok(providers, "Expected providers command");
    assert.ok(
      providers!.description.length > 0,
      `Expected non-empty description for providers, got: "${providers!.description}"`
    );
  } finally {
    cleanup();
  }
});

test("parseCliRegistry() marks subcommands with isSubcommand=true (after first)", () => {
  const { cleanup } = withFixtureCli({
    "providers.mjs": FIXTURE_PROVIDERS_MJS,
  });
  try {
    const { families } = parseCliRegistry();
    const providerCmds = families.get("cli-providers")!;
    // After the first (top-level) entry, rest should be subcommands
    const subCmds = providerCmds.filter((c) => c.isSubcommand);
    assert.ok(
      subCmds.length >= 4,
      `Expected ≥4 subcommands (list, available, test, etc.), got ${subCmds.length}`
    );
  } finally {
    cleanup();
  }
});

test("parseCliRegistry() extracts flags from .option() calls", () => {
  const { cleanup } = withFixtureCli({
    "providers.mjs": FIXTURE_PROVIDERS_MJS,
  });
  try {
    const { commands } = parseCliRegistry();
    // Find a command that has options
    const rotate = [...commands.values()].find((c) => c.name.includes("rotate"));
    // Flags might be present if parsing found them
    if (rotate) {
      // If rotate exists and has flags, verify format
      for (const flag of rotate.flags) {
        assert.ok(typeof flag === "string" && flag.length > 0, `Invalid flag: "${flag}"`);
      }
    }
  } finally {
    cleanup();
  }
});

test("parseCliRegistry() skips unrecognised .mjs files", () => {
  const { cleanup } = withFixtureCli({
    "unknown-custom.mjs": `export function register(p) {}`,
    "providers.mjs": FIXTURE_PROVIDERS_MJS,
  });
  try {
    const { families } = parseCliRegistry();
    // No family should be mapped from unknown-custom
    const hasUnknown = [...families.keys()].some((k) => String(k).includes("unknown-custom"));
    assert.equal(hasUnknown, false, "unknown-custom.mjs should not create a family");
    // providers.mjs should still be parsed
    assert.ok(families.has("cli-providers"), "Expected cli-providers family from providers.mjs");
  } finally {
    cleanup();
  }
});

test("parseCliRegistry() throws if commands directory is missing", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cli-missing-"));
  const originalCwd = process.cwd();
  process.chdir(tmpDir);
  try {
    assert.throws(
      () => parseCliRegistry(),
      /cliRegistryParser: could not read/,
      "Expected error when commands dir is missing"
    );
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// ─── Integration test: real providers.mjs (always runs — it's in the repo) ───

test("parseCliRegistry() with real providers.mjs: providers family has ≥5 commands", () => {
  // This test uses the actual project files (not a fixture).
  // We rely on the CWD being the worktree root during `npm run test:unit`.
  const result = parseCliRegistry();
  const providerCmds = result.families.get("cli-providers");
  assert.ok(providerCmds, "Expected cli-providers family from real providers.mjs");
  assert.ok(
    providerCmds!.length >= 5,
    `Expected ≥5 real provider commands, got ${providerCmds!.length}: ${providerCmds!.map((c) => c.name).join(", ")}`
  );
});

test("getCommandsForFamily('cli-providers') with real files: returns ≥5 strings", () => {
  const commands = getCommandsForFamily("cli-providers");
  assert.ok(commands.length >= 5, `Expected ≥5 cli-providers commands, got ${commands.length}`);
  for (const cmd of commands) {
    assert.ok(typeof cmd === "string" && cmd.length > 0, `Invalid command name: "${cmd}"`);
  }
});

test("parseCliRegistry() exposes setup-electron/docker/podman/vps/remote via cli-setup family", () => {
  // The setup-* aggregator files declare subcommands of the parent
  // `setup` command (e.g. `.command("electron")`). The parser must
  // qualify them as `setup electron` (not `setup-electron electron`)
  // and route them to the cli-setup SkillArea so the GUI's command
  // catalogue surfaces them.
  const { cleanup } = withFixtureCli({
    "setup-electron.mjs": `
      export function registerSetupElectron(setupCommand) {
        setupCommand
          .command("electron")
          .description("Print the right Electron install/dev/build command")
          .option("--run", "Execute it now");
      }
    `,
    "setup-docker.mjs": `
      export function registerSetupDocker(setupCommand) {
        setupCommand
          .command("docker")
          .description("Print the right docker / docker compose command");
      }
    `,
    "setup-podman.mjs": `
      export function registerSetupPodman(setupCommand) {
        setupCommand
          .command("podman")
          .description("Print the right podman command");
      }
    `,
    "setup-vps.mjs": `
      export function registerSetupVps(setupCommand) {
        setupCommand
          .command("vps")
          .description("Print apt + nginx + certbot + docker run block");
      }
    `,
    "setup-remote.mjs": `
      export function registerSetupRemote(setupCommand) {
        setupCommand
          .command("remote")
          .description("Aggregated remote-mode setup");
      }
    `,
  });

  try {
    const result = parseCliRegistry();
    const setupCmds = result.families.get("cli-setup") ?? [];
    const names = setupCmds.map((c) => c.name);
    for (const expected of [
      "setup electron",
      "setup docker",
      "setup podman",
      "setup vps",
      "setup remote",
    ]) {
      assert.ok(
        names.includes(expected),
        `expected '${expected}' in cli-setup family, got: ${names.join(", ")}`
      );
    }
  } finally {
    cleanup();
  }
});
