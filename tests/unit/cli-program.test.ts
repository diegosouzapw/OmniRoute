import test from "node:test";
import assert from "node:assert/strict";

import { createProgram } from "../../bin/cli/program.mjs";

// ─── program structure ────────────────────────────────────────────────────────

test("createProgram returns a Command instance", () => {
  const program = createProgram();
  assert.ok(program, "program is defined");
  assert.equal(typeof program.parseAsync, "function", "has parseAsync");
  assert.equal(typeof program.commands, "object", "has commands array");
});

test("program name is 'omniroute'", () => {
  const program = createProgram();
  assert.equal(program.name(), "omniroute");
});

test("program description is non-empty", () => {
  const program = createProgram();
  const desc = program.description();
  assert.ok(desc && desc.length > 0, `description is non-empty, got: ${desc}`);
});

test("program version is non-empty semver", () => {
  const program = createProgram();
  const ver = program.version();
  assert.ok(ver && /^\d+\.\d+\.\d+/.test(ver), `version is semver, got: ${ver}`);
});

// ─── global options ───────────────────────────────────────────────────────────

test("program has --output option with choices", () => {
  const program = createProgram();
  const opt = program.options.find((o) => o.long === "--output");
  assert.ok(opt, "--output option exists");
  assert.deepEqual(opt.argChoices, ["table", "json", "jsonl", "csv"]);
});

test("program has --quiet / -q option", () => {
  const program = createProgram();
  const opt = program.options.find((o) => o.long === "--quiet");
  assert.ok(opt, "--quiet option exists");
  assert.equal(opt.short, "-q");
});

test("program has --timeout option", () => {
  const program = createProgram();
  const opt = program.options.find((o) => o.long === "--timeout");
  assert.ok(opt, "--timeout option exists");
});

test("program has --api-key option bound to env", () => {
  const program = createProgram();
  const opt = program.options.find((o) => o.long === "--api-key");
  assert.ok(opt, "--api-key option exists");
  assert.equal(opt.envVar, "OMNIROUTE_API_KEY");
});

test("program has --base-url option bound to env", () => {
  const program = createProgram();
  const opt = program.options.find((o) => o.long === "--base-url");
  assert.ok(opt, "--base-url option exists");
  assert.equal(opt.envVar, "OMNIROUTE_BASE_URL");
});

// ─── registered commands ──────────────────────────────────────────────────────

test("program registers 'serve' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "serve");
  assert.ok(cmd, "serve command exists");
});

test("serve command is the default command", () => {
  const program = createProgram();
  assert.equal(
    (program as any)._defaultCommandName,
    "serve",
    "program._defaultCommandName is 'serve'"
  );
});

test("program registers 'doctor' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "doctor");
  assert.ok(cmd, "doctor command exists");
});

test("program registers 'setup' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "setup");
  assert.ok(cmd, "setup command exists");
});

test("program registers 'providers' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "providers");
  assert.ok(cmd, "providers command exists");
});

test("program registers 'config' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "config");
  assert.ok(cmd, "config command exists");
});

test("program registers 'status' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "status");
  assert.ok(cmd, "status command exists");
});

test("program registers 'logs' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "logs");
  assert.ok(cmd, "logs command exists");
});

test("program registers 'update' command", () => {
  const program = createProgram();
  const cmd = program.commands.find((c) => c.name() === "update");
  assert.ok(cmd, "update command exists");
});

// ─── exitOverride / --help via Commander ─────────────────────────────────────

test("--help throws CommanderError with exit code 0", async () => {
  const program = createProgram();
  try {
    await program.parseAsync(["node", "omniroute", "--help"]);
    assert.fail("expected error to be thrown");
  } catch (err: any) {
    assert.equal(err.exitCode, 0, `expected exitCode 0, got: ${err.exitCode}`);
    assert.equal(err.code, "commander.helpDisplayed");
  }
});

test("--version throws CommanderError with exit code 0", async () => {
  const program = createProgram();
  try {
    await program.parseAsync(["node", "omniroute", "--version"]);
    assert.fail("expected error to be thrown");
  } catch (err: any) {
    assert.equal(err.exitCode, 0, `expected exitCode 0, got: ${err.exitCode}`);
  }
});

test("unknown global flag throws CommanderError with exit code 1", async () => {
  const program = createProgram();
  try {
    await program.parseAsync(["node", "omniroute", "--definitely-not-a-flag"]);
    assert.fail("expected error to be thrown");
  } catch (err: any) {
    assert.ok(err.exitCode !== undefined, "error has exitCode");
    assert.ok(err.exitCode !== 0, "exit code is non-zero for invalid flag");
  }
});
