/**
 * R0.1 headless mode (rail 3.8.53): `omniroute serve --headless` must hand the
 * server process `OMNIROUTE_HEADLESS=1`, the same way `--port` reaches it
 * through the child env built in bin/cli/commands/serve.mjs.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Command } from "commander";
import {
  registerServe,
  applyHeadlessServeEnv,
  resolveServeHeadless,
} from "../../bin/cli/commands/serve.mjs";
import { validateTrayOptions } from "../../bin/cli/tray/detachedTray.mjs";

const SERVE_SOURCE = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../bin/cli/commands/serve.mjs"),
  "utf8"
);

test("serve --headless: the option is registered through the CLI i18n catalog", () => {
  const program = new Command();
  registerServe(program);
  const serve = program.commands.find((cmd) => cmd.name() === "serve");
  assert.ok(serve, "serve command must be registered");
  const option = serve.options.find((opt) => opt.long === "--headless");
  assert.ok(option, "--headless must be a serve option");
  assert.match(SERVE_SOURCE, /\.option\("--headless",\s*t\("serve\.headless"\)\)/);
  const en = JSON.parse(
    fs.readFileSync(path.resolve(import.meta.dirname, "../../bin/cli/locales/en.json"), "utf8")
  );
  assert.equal(typeof en.serve.headless, "string");
  assert.match(en.serve.headless, /OMNIROUTE_HEADLESS/);
});

test("serve --headless: commander parses the flag into opts.headless", async () => {
  const program = new Command();
  program.exitOverride();
  registerServe(program);
  const serve = program.commands.find((cmd) => cmd.name() === "serve");
  let captured: Record<string, unknown> | null = null;
  serve.action((opts: Record<string, unknown>) => {
    captured = opts;
  });
  await program.parseAsync(["node", "omniroute", "serve", "--headless"]);
  assert.equal(captured?.headless, true);
});

test("applyHeadlessServeEnv: --headless sets OMNIROUTE_HEADLESS=1 on the child env", () => {
  const env = { PORT: "20128", PATH: "/usr/bin" };
  const out = applyHeadlessServeEnv(env, { headless: true });
  assert.equal(out.OMNIROUTE_HEADLESS, "1");
  assert.equal(out.PORT, "20128");
  assert.equal(env.OMNIROUTE_HEADLESS, undefined, "input env must not be mutated");
});

test("applyHeadlessServeEnv: without --headless the env is passed through unchanged", () => {
  const env = { PORT: "20128" };
  assert.deepEqual(applyHeadlessServeEnv(env, {}), env);
  // An operator-exported OMNIROUTE_HEADLESS still reaches the child untouched.
  assert.equal(
    applyHeadlessServeEnv({ OMNIROUTE_HEADLESS: "true" }, {}).OMNIROUTE_HEADLESS,
    "true"
  );
});

test("runServe builds the child env through applyHeadlessServeEnv", () => {
  assert.match(SERVE_SOURCE, /const env = applyHeadlessServeEnv\(\s*\{/);
});

test("resolveServeHeadless: flag or truthy env var", () => {
  assert.equal(resolveServeHeadless({ headless: true }, {}), true);
  assert.equal(resolveServeHeadless({}, { OMNIROUTE_HEADLESS: "1" }), true);
  assert.equal(resolveServeHeadless({}, { OMNIROUTE_HEADLESS: "on" }), true);
  assert.equal(resolveServeHeadless({}, { OMNIROUTE_HEADLESS: "0" }), false);
  assert.equal(resolveServeHeadless({}, {}), false);
});

test("serve --headless cannot be combined with --tray (the tray opens the dashboard)", () => {
  assert.equal(validateTrayOptions({ tray: true, headless: true }), "--tray cannot use --headless");
  assert.equal(validateTrayOptions({ headless: true }), null);
});
