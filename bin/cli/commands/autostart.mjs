import { t } from "../i18n.mjs";
import { emit } from "../output.mjs";

export function registerAutostart(program) {
  const cmd = program
    .command("autostart")
    .description(t("autostart.description") || "Manage OmniRoute autostart at login");

  cmd
    .command("enable")
    .description(t("autostart.enable") || "Enable autostart at login")
    .action(async (opts, c) => {
      const globalOpts = c.optsWithGlobals();
      const { enable } = await import("../tray/autostart.mjs");
      const ok = enable();
      emit({ enabled: ok }, globalOpts);
      if (!ok) process.exit(1);
    });

  cmd
    .command("disable")
    .description(t("autostart.disable") || "Disable autostart at login")
    .action(async (opts, c) => {
      const globalOpts = c.optsWithGlobals();
      const { disable } = await import("../tray/autostart.mjs");
      const ok = disable();
      emit({ disabled: ok }, globalOpts);
      if (!ok) process.exit(1);
    });

  cmd
    .command("status")
    .description(t("autostart.status") || "Show autostart status")
    .action(async (opts, c) => {
      const globalOpts = c.optsWithGlobals();
      const { isAutostartEnabled } = await import("../tray/autostart.mjs");
      emit({ enabled: isAutostartEnabled() }, globalOpts);
    });
}
