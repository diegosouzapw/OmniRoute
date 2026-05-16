export function registerProvider(program) {
  program
    .command("provider [subcommand]")
    .description("Manage provider connections (use 'providers' for the full interface)")
    .allowUnknownOption()
    .allowExcessArguments()
    .action(() => {
      console.log(`
  Use \`omniroute providers\` for the full provider management interface:

    omniroute providers available   — show provider catalog
    omniroute providers list        — list configured connections
    omniroute providers test <name> — test a provider connection
    omniroute providers test-all    — test all active connections
    omniroute providers validate    — validate local configuration
`);
    });
}
