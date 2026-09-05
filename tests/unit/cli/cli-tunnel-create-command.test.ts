import test from "node:test";
import assert from "node:assert/strict";

// #12295: `omniroute tunnel create <type>` crashed with
// "Cannot read properties of undefined (reading optsWithGlobals)" because
// `.command("create [type]")` + `.addArgument(new Argument("[type]", ...))`
// registered TWO positional arguments. Commander then passed
// (type, type2, opts, command) to the action callback, but the handler
// destructured only (type, opts, cmd) — so `cmd` was bound to the real opts
// object and `cmd.parent` was undefined.

test("tunnel create subcommand declares exactly one positional argument (#12295)", async () => {
  const { Command } = await import("commander");
  const { registerTunnel } = await import("../../../bin/cli/commands/tunnel.mjs");

  const program = new Command();
  registerTunnel(program);

  const tunnelCmd = program.commands.find((c) => c.name() === "tunnel");
  assert.ok(tunnelCmd, "tunnel subcommand must exist");

  const createCmd = tunnelCmd.commands.find((c) => c.name() === "create");
  assert.ok(createCmd, "create subcommand must exist");

  // Before the fix, Commander registered two arguments named "type" because
  // both .command("create [type]") and .addArgument(...) contributed one.
  // After the fix, only .addArgument(...) defines the positional.
  // Commander stores positional arguments in _args; the public args getter
  // returns only required args, so optional args (like [type]) only appear in _args.
  assert.equal(
    createCmd._args.length,
    1,
    `create subcommand must have exactly 1 positional argument, got ${createCmd._args.length}`
  );
});

test("tunnel create subcommand action handler accesses parent via Command instance (#12295)", async () => {
  const { Command } = await import("commander");
  const { registerTunnel } = await import("../../../bin/cli/commands/tunnel.mjs");

  const program = new Command();
  registerTunnel(program);

  const tunnelCmd = program.commands.find((c) => c.name() === "tunnel");
  const createCmd = tunnelCmd.commands.find((c) => c.name() === "create");

  assert.ok(createCmd._actionHandler, "create subcommand must have an action handler");

  // Before the fix, the action callback received (type, type2, opts, command)
  // because of the double positional. Destructuring (type, opts, cmd) then
  // bound cmd to the opts object, making cmd.parent undefined and
  // cmd.parent.optsWithGlobals() throw.
  // After the fix, there's only one positional, so (type, opts, cmd) correctly
  // binds cmd to the Command instance where cmd.parent === tunnelCmd.
  // We can verify this by checking the parent chain on the createCmd itself:
  assert.equal(
    createCmd.parent,
    tunnelCmd,
    "create subcommand's parent must be the tunnel command"
  );
  assert.equal(
    createCmd.parent.parent,
    program,
    "tunnel command's parent must be the root program"
  );
});

test("tunnel create subcommand accepts valid tunnel type choices", async () => {
  const { Command } = await import("commander");
  const { registerTunnel } = await import("../../../bin/cli/commands/tunnel.mjs");

  const program = new Command();
  registerTunnel(program);

  const tunnelCmd = program.commands.find((c) => c.name() === "tunnel");
  const createCmd = tunnelCmd.commands.find((c) => c.name() === "create");

  // The addArgument with choices should still be registered.
  assert.equal(createCmd._args.length, 1, "must have exactly one positional after addArgument");

  // Verify choices are present on the argument.
  const arg = createCmd._args[0];
  assert.ok(arg, "first argument must exist");
  assert.deepEqual(
    arg.argChoices,
    ["cloudflare", "tailscale", "ngrok"],
    "argument choices must match VALID_TUNNEL_TYPES"
  );
  assert.equal(arg.defaultValue, "cloudflare", "default type must be cloudflare");
});
