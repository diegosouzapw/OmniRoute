/**
 * `omniroute restart` declared `--port` with a Commander default of "20128", so the
 * `opts.port ?? process.env.PORT` fallback in runServe() never reached PORT: a server
 * started on PORT=3000 (from the shell or <DATA_DIR>/.env) came back on 20128 after a
 * restart. #7049 fixed the same default on `dashboard`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { Command } from "commander";

async function parseRestart(args: string[]) {
  const { registerRestart } = await import("../../bin/cli/commands/restart.mjs");
  const program = new Command().exitOverride();
  registerRestart(program);
  let parsed: Record<string, unknown> | undefined;
  program.commands
    .find((cmd) => cmd.name() === "restart")!
    .action((opts: Record<string, unknown>) => {
      parsed = opts;
    });
  await program.parseAsync(["restart", ...args], { from: "user" });
  return parsed;
}

test("restart without --port leaves the port to runServe's PORT fallback", async () => {
  const opts = await parseRestart([]);
  assert.equal(opts?.port, undefined);
});

test("restart --port still passes the explicit port", async () => {
  const opts = await parseRestart(["--port", "3000"]);
  assert.equal(opts?.port, "3000");
});
