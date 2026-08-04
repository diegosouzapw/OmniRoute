/**
 * Regression test for #3331 — autostart could only be toggled from the tray
 * (`serve --tray`) or the Electron Appearance tab; a plain `omniroute serve`
 * user had no way to enable it. The `autostart` command now exposes the
 * shorthand the reporter asked for (`omniroute autostart on` / `... true`) via
 * aliases on the enable/disable subcommands, plus a `toggle` subcommand and a
 * default `status`. This guards that command wiring (introspected, no platform
 * side effects).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { Command } from "commander";
import { registerAutostart } from "../../bin/cli/commands/autostart.mjs";

function buildAutostartCommand() {
  const program = new Command();
  registerAutostart(program);
  const autostart = program.commands.find((c) => c.name() === "autostart");
  assert.ok(autostart, "autostart command should be registered");
  return autostart;
}

test("registers enable/disable/toggle/status subcommands", () => {
  const names = buildAutostartCommand()
    .commands.map((c) => c.name())
    .sort();
  assert.deepEqual(names, ["disable", "enable", "status", "toggle"]);
});

test("enable accepts the on/true shorthand aliases (reporter asked for `autostart true`)", () => {
  const enable = buildAutostartCommand().commands.find((c) => c.name() === "enable");
  assert.ok(enable.aliases().includes("on"), "`autostart on` should enable");
  assert.ok(enable.aliases().includes("true"), "`autostart true` should enable");
});

test("disable accepts the off/false shorthand aliases", () => {
  const disable = buildAutostartCommand().commands.find((c) => c.name() === "disable");
  assert.ok(disable.aliases().includes("off"), "`autostart off` should disable");
  assert.ok(disable.aliases().includes("false"), "`autostart false` should disable");
});

test("status is the default action (bare `omniroute autostart` is a safe read-only)", () => {
  const status = buildAutostartCommand().commands.find((c) => c.name() === "status");
  // Commander marks the default subcommand with `_defaultCommandName`.
  assert.equal(buildAutostartCommand()._defaultCommandName, "status");
  assert.ok(status, "status subcommand exists");
});
