import { t } from "../i18n.mjs";
import { runStopCommand } from "./stop.mjs";
import { sleep } from "../utils/pid.mjs";

export function registerRestart(program) {
  program
    .command("restart")
    .description(t("restart.description"))
    // No Commander default: runServe() falls back to PORT, then 20128 (#7049).
    .option("--port <port>", t("serve.port"))
    .action(async (opts) => {
      const exitCode = await runRestartCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runRestartCommand(opts = {}) {
  console.log(t("restart.restarting"));

  await runStopCommand(opts);
  await sleep(1000);

  const { runServe } = await import("./serve.mjs");
  await runServe(opts);
  return 0;
}
