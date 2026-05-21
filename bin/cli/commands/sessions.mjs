import { createInterface } from "node:readline";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function fmtTs(v) {
  if (!v) return "-";
  return new Date(typeof v === "number" ? v * 1000 : v).toLocaleString();
}

function truncate(v, max = 30) {
  if (!v) return "-";
  const s = String(v);
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

async function confirm(q) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${q} [y/N] `, (a) => {
      rl.close();
      resolve(a.trim().toLowerCase() === "y");
    });
  });
}

const sessionSchema = [
  { key: "id", header: "Session ID", width: 28 },
  { key: "user", header: "User", width: 22 },
  { key: "kind", header: "Kind", width: 14 },
  { key: "createdAt", header: "Created", formatter: fmtTs },
  { key: "expiresAt", header: "Expires", formatter: fmtTs },
  { key: "lastSeen", header: "Last Seen", formatter: fmtTs },
  { key: "ip", header: "IP" },
  { key: "userAgent", header: "User Agent", width: 30, formatter: (v) => truncate(v, 30) },
];

export function registerSessions(program) {
  const s = program.command("sessions").description(t("sessions.description"));

  s.command("list")
    .option("--user <u>", t("sessions.list.user"))
    .option("--kind <k>", t("sessions.list.kind"))
    .option("--active", t("sessions.list.active"))
    .option("--limit <n>", t("sessions.list.limit"), parseInt, 100)
    .action(async (opts, cmd) => {
      const params = new URLSearchParams({ limit: String(opts.limit) });
      if (opts.user) params.set("user", opts.user);
      if (opts.kind) params.set("kind", opts.kind);
      if (opts.active) params.set("active", "true");
      const res = await apiFetch(`/api/sessions?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.items ?? data, cmd.optsWithGlobals(), sessionSchema);
    });

  s.command("show <sessionId>").action(async (id, opts, cmd) => {
    const res = await apiFetch(`/api/sessions?id=${id}`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  s.command("expire <sessionId>")
    .option("--yes", t("sessions.expire.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Expire session ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/sessions?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Expired\n");
    });

  s.command("expire-all")
    .requiredOption("--user <u>", t("sessions.expireAll.user"))
    .option("--yes", t("sessions.expireAll.yes"))
    .action(async (opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Expire ALL sessions for ${opts.user}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/sessions?user=${opts.user}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Expired all\n");
    });

  s.command("current").action(async (opts, cmd) => {
    const res = await apiFetch("/api/sessions?current=true");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });
}
