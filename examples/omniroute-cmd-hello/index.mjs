// Minimal OmniRoute CLI plugin example.
// Usage:
//   1. Copy this folder to ~/.omniroute/plugins/omniroute-cmd-hello/
//   2. Run `omniroute hello`
// See docs/dev/plugins.md for the full plugin contract.

export const meta = {
  name: "omniroute-cmd-hello",
  version: "0.1.0",
  description: "Hello-world OmniRoute CLI plugin example.",
  omnirouteApi: ">=3.0.0",
};

export function register(program, ctx) {
  program
    .command("hello")
    .description(meta.description)
    .option("-n, --name <name>", "name to greet", "world")
    .action(async (opts, _cmd) => {
      ctx.emit({ message: `Hello, ${opts.name}!`, plugin: meta.name }, opts);
    });
}
