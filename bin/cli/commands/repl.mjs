import { t } from "../i18n.mjs";

export function registerRepl(program) {
  program
    .command("repl")
    .description(t("repl.description"))
    .option("-m, --model <id>", t("repl.model"))
    .option("--combo <name>", t("repl.combo"))
    .option("-s, --system <prompt>", t("repl.system"))
    .option("--resume <session>", t("repl.resume"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const port = globalOpts.port ? parseInt(String(globalOpts.port), 10) : 20128;
      const baseUrl = globalOpts.baseUrl ?? `http://localhost:${port}`;
      const apiKey = globalOpts.apiKey ?? null;
      const { runRepl } = await import("../tui/Repl.jsx");
      await runRepl({ ...opts, baseUrl, apiKey, port });
    });
}
