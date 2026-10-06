import { apiFetch } from "../api.mjs";
import { t } from "../i18n.mjs";
import { emit } from "../output.mjs";

const statusSchema = [
  { key: "feed", header: "Feed" },
  { key: "available", header: "Available" },
  { key: "version", header: "Version" },
  { key: "tier", header: "Tier" },
  { key: "fetchedAt", header: "Fetched" },
];

const syncSchema = [
  { key: "feed", header: "Feed" },
  { key: "status", header: "Status" },
  { key: "version", header: "Version" },
  { key: "reason", header: "Reason" },
];

function exitCodeFor(response) {
  return Number.isInteger(response.exitCode) ? response.exitCode : response.status === 401 ? 4 : 1;
}

export async function runRadarStatusCommand(opts = {}) {
  const response = await apiFetch("/api/radar/status", { acceptNotOk: true });
  if (!response.ok) return exitCodeFor(response);
  const data = await response.json();
  if (opts.output === "json") {
    emit(data, opts);
    return 0;
  }
  const rows = Object.entries(data.feeds ?? {}).map(([feed, value]) => ({
    feed,
    ...(value && typeof value === "object" ? value : { available: false }),
  }));
  emit(rows, opts, statusSchema);
  return 0;
}

export async function runRadarSyncCommand(opts = {}) {
  const response = await apiFetch("/api/radar/sync-all", {
    method: "POST",
    body: {},
    acceptNotOk: true,
  });
  if (!response.ok) return exitCodeFor(response);
  const data = await response.json();
  if (opts.output === "json") {
    emit(data, opts);
    return 0;
  }
  const rows = Object.entries(data).map(([feed, value]) => ({
    feed,
    ...(value && typeof value === "object" ? value : { status: "error" }),
  }));
  emit(rows, opts, syncSchema);
  return 0;
}

export function registerRadar(program) {
  const radar = program.command("radar").description(t("radar.description"));
  radar
    .command("status")
    .description(t("radar.status"))
    .action(async (_opts, command) => {
      const code = await runRadarStatusCommand(command.optsWithGlobals());
      if (code !== 0) process.exitCode = code;
    });
  radar
    .command("sync")
    .description(t("radar.sync"))
    .action(async (_opts, command) => {
      const code = await runRadarSyncCommand(command.optsWithGlobals());
      if (code !== 0) process.exitCode = code;
    });
}
