import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function truncate(v, len = 40) {
  if (v == null) return "-";
  const s = String(v);
  return s.length > len ? s.slice(0, len - 1) + "…" : s;
}

function fmtTs(v) {
  if (!v) return "-";
  try {
    return new Date(v).toLocaleString();
  } catch {
    return String(v);
  }
}

function maskActor(v) {
  if (!v) return "-";
  const s = String(v);
  if (s.length <= 8) return s;
  return `${s.slice(0, 4)}****${s.slice(-4)}`;
}

const auditSchema = [
  { key: "timestamp", header: "Time", width: 22, formatter: fmtTs },
  { key: "source", header: "Source", width: 10 },
  { key: "actor", header: "Actor", width: 16, formatter: maskActor },
  { key: "action", header: "Action", width: 28 },
  { key: "resource", header: "Resource", width: 32, formatter: truncate },
  { key: "result", header: "Result", formatter: (v) => (v === "success" ? "✓" : "✗") },
  { key: "details", header: "Details", formatter: truncate },
];

function endpointFor(source) {
  return source === "mcp" ? "/api/mcp/audit" : "/api/compliance/audit-log";
}

async function fetchAuditEntries(sources, params) {
  const entries = [];
  for (const src of sources) {
    const endpoint = endpointFor(src);
    const res = await apiFetch(`${endpoint}?${params}`);
    if (!res.ok) continue;
    const data = await res.json();
    for (const e of data.items ?? data) {
      entries.push({ ...e, source: src });
    }
  }
  return entries;
}

function resolveSources(source) {
  if (source === "all") return ["compliance", "mcp"];
  return [source ?? "compliance"];
}

export async function runAuditTail(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const sources = resolveSources(opts.source);
  const params = new URLSearchParams({ limit: String(opts.limit ?? 100) });
  const entries = await fetchAuditEntries(sources, params);
  entries.sort((a, b) => String(b.timestamp ?? "").localeCompare(String(a.timestamp ?? "")));
  emit(entries.slice(0, opts.limit ?? 100), globalOpts, auditSchema);

  if (opts.follow) {
    process.stderr.write("\n[following — Ctrl+C to exit]\n");
    let lastTs = entries[0]?.timestamp ?? new Date().toISOString();
    const loop = async () => {
      while (true) {
        await sleep(2000);
        for (const src of sources) {
          const endpoint = endpointFor(src);
          const res = await apiFetch(`${endpoint}?since=${encodeURIComponent(lastTs)}&limit=50`);
          if (!res.ok) continue;
          const data = await res.json();
          const newEntries = (data.items ?? data)
            .map((e) => ({ ...e, source: src }))
            .filter((e) => String(e.timestamp ?? "") > String(lastTs));
          for (const e of newEntries) {
            if (String(e.timestamp ?? "") > String(lastTs)) lastTs = e.timestamp;
            emit([e], globalOpts, auditSchema);
          }
        }
      }
    };
    process.on("SIGINT", () => process.exit(0));
    await loop();
  }
}

export async function runAuditSearch(query, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const sources = resolveSources(opts.source);
  const params = new URLSearchParams({ q: query, limit: String(opts.limit ?? 200) });
  if (opts.since) params.set("since", opts.since);
  if (opts.until) params.set("until", opts.until);
  if (opts.actor) params.set("actor", opts.actor);
  if (opts.action) params.set("action", opts.action);
  const entries = await fetchAuditEntries(sources, params);
  entries.sort((a, b) => String(b.timestamp ?? "").localeCompare(String(a.timestamp ?? "")));
  emit(entries, globalOpts, auditSchema);
}

export async function runAuditExport(file, opts, cmd) {
  const sources = resolveSources(opts.source === "all" ? "compliance" : opts.source);
  const format = opts.format ?? "jsonl";
  const params = new URLSearchParams({ format });
  if (opts.since) params.set("since", opts.since);
  if (opts.until) params.set("until", opts.until);

  const allLines = [];
  for (const src of sources) {
    const endpoint = endpointFor(src);
    const res = await apiFetch(`${endpoint}?${params}`);
    if (!res.ok) {
      process.stderr.write(`Error fetching ${src}: ${res.status}\n`);
      continue;
    }
    const body = await res.text();
    allLines.push(body);
  }

  const combined = allLines.join("\n");
  writeFileSync(file, combined);
  process.stdout.write(`Exported to ${file} (${combined.length} bytes)\n`);
}

export async function runAuditStats(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const source = opts.source ?? "mcp";
  const params = new URLSearchParams({ period: opts.period ?? "7d" });
  const endpoint = source === "mcp" ? "/api/mcp/audit/stats" : "/api/compliance/audit-log/stats";
  const res = await apiFetch(`${endpoint}?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts);
}

export async function runAuditGet(id, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const source = opts.source ?? "compliance";
  const endpoint = endpointFor(source);
  const res = await apiFetch(`${endpoint}/${id}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts, auditSchema);
}

export function registerAudit(program) {
  const audit = program.command("audit").description(t("audit.description"));

  audit
    .command("tail")
    .description(t("audit.tail.description"))
    .option("--source <s>", t("audit.source"), "all")
    .option("--follow", t("audit.tail.follow"))
    .option("--limit <n>", t("audit.tail.limit"), parseInt, 100)
    .action(runAuditTail);

  audit
    .command("search <query>")
    .description(t("audit.search.description"))
    .option("--source <s>", t("audit.source"), "all")
    .option("--since <ts>", t("audit.since"))
    .option("--until <ts>", t("audit.until"))
    .option("--limit <n>", t("audit.search.limit"), parseInt, 200)
    .option("--actor <id>", t("audit.search.actor"))
    .option("--action <a>", t("audit.search.action"))
    .action(runAuditSearch);

  audit
    .command("export <file>")
    .description(t("audit.export.description"))
    .option("--source <s>", t("audit.source"), "all")
    .option("--format <f>", t("audit.export.format"), "jsonl")
    .option("--since <ts>", t("audit.since"))
    .option("--until <ts>", t("audit.until"))
    .action(runAuditExport);

  audit
    .command("stats")
    .description(t("audit.stats.description"))
    .option("--source <s>", t("audit.source"), "mcp")
    .option("--period <p>", t("audit.stats.period"), "7d")
    .action(runAuditStats);

  audit
    .command("get <id>")
    .description(t("audit.get.description"))
    .option("--source <s>", t("audit.source"), "compliance")
    .action(runAuditGet);
}
