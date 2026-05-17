import { t } from "../i18n.mjs";

export function registerTray(program) {
  const cmd = program
    .command("tray")
    .description(t("tray.description") || "Control the system tray icon");

  cmd
    .command("show")
    .description(t("tray.show") || "Show the tray icon (if server is running with --tray)")
    .action(() => {
      process.stderr.write(
        "The tray is managed by `omniroute serve --tray`. Start the server with --tray to enable it.\n"
      );
    });

  cmd
    .command("hide")
    .description(t("tray.hide") || "Hide the tray icon")
    .action(() => {
      process.stderr.write(
        "Send SIGUSR1 to the serve process to toggle the tray, or restart without --tray.\n"
      );
    });

  cmd
    .command("quit")
    .description(t("tray.quit") || "Quit OmniRoute via tray")
    .action(async () => {
      const { default: pidUtils } = await import("../utils/pid.mjs").catch(() => ({
        default: null,
      }));
      process.stderr.write("Use `omniroute stop` to stop the server.\n");
      process.exit(0);
    });
}
