export const meta = {
  name: "hello",
  version: "0.1.0",
  description: "Example OmniRoute plugin — greets the user and shows server health",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("hello")
    .description(meta.description)
    .option("-n, --name <name>", "Name to greet", "World")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      process.stdout.write(`Hello, ${opts.name}! 👋\n`);

      try {
        const res = await ctx.apiFetch("/api/health", {
          baseUrl: gOpts.baseUrl,
          apiKey: gOpts.apiKey,
        });
        const health = await res.json();
        ctx.emit({ greeting: `Hello, ${opts.name}!`, health }, gOpts);
      } catch {
        ctx.emit({ greeting: `Hello, ${opts.name}!`, health: "unavailable" }, gOpts);
      }
    });
}
