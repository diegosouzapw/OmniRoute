import { t } from "../i18n.mjs";
import { emit } from "../output.mjs";

export function registerAutostart(program) {
  const cmd = program
    .command("autostart")
    .description(t("autostart.description") || "Manage OmniRoute autostart at login");

  // #3331 — autostart could previously only be toggled from the tray
  // (`serve --tray`) or the Electron Appearance tab; a plain `omniroute serve`
  // user had no path. These subcommands (with `on`/`off`/`true`/`false`
  // aliases, e.g. `omniroute autostart on`) make it a first-class CLI action.
  cmd
    .command("enable")
    .aliases(["on", "true"])
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
    .aliases(["off", "false"])
    .description(t("autostart.disable") || "Disable autostart at login")
    .action(async (opts, c) => {
      const globalOpts = c.optsWithGlobals();
      const { disable } = await import("../tray/autostart.mjs");
      const ok = disable();
      emit({ disabled: ok }, globalOpts);
      if (!ok) process.exit(1);
    });

  cmd
    .command("toggle")
    .description(t("autostart.toggle") || "Toggle autostart at login")
    .action(async (opts, c) => {
      const globalOpts = c.optsWithGlobals();
      const { enable, disable, isAutostartEnabled } = await import("../tray/autostart.mjs");
      const next = !isAutostartEnabled();
      const ok = next ? enable() : disable();
      emit(next ? { enabled: ok } : { disabled: ok }, globalOpts);
      if (!ok) process.exit(1);
    });

  cmd
    .command("status", { isDefault: true })
    .description(t("autostart.status") || "Show autostart status")
    .action(async (opts, c) => {
      const globalOpts = c.optsWithGlobals();
      const { getAutostartStatus } = await import("../tray/autostart.mjs");
      emit(getAutostartStatus(), globalOpts);
    });
}
