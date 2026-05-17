import { readFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const VALID_TYPES = ["user", "feedback", "project", "reference"];

function truncate(v, len = 60) {
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

const memorySchema = [
  { key: "id", header: "ID", width: 14 },
  { key: "type", header: "Type", width: 12 },
  { key: "content", header: "Content", width: 60, formatter: truncate },
  { key: "score", header: "Score", formatter: (v) => (v != null ? v.toFixed(3) : "-") },
  { key: "createdAt", header: "Created", formatter: fmtTs },
];

function parseDuration(s) {
  const m = String(s).match(/^(\d+)(d|m|y)$/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  const now = Date.now();
  if (unit === "d") return new Date(now - n * 86400000).toISOString();
  if (unit === "m") return new Date(now - n * 30 * 86400000).toISOString();
  if (unit === "y") return new Date(now - n * 365 * 86400000).toISOString();
  return null;
}

async function confirm(question) {
  return new Promise((resolve) => {
    process.stdout.write(`${question} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (chunk) => {
      resolve(chunk.toString().trim().toLowerCase().startsWith("y"));
    });
  });
}

export async function runMemorySearch(query, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const params = new URLSearchParams({ q: query, limit: String(opts.limit ?? 20) });
  if (opts.type) params.set("type", opts.type);
  if (opts.apiKey) params.set("apiKey", opts.apiKey);
  if (opts.tokenBudget) params.set("tokenBudget", String(opts.tokenBudget));
  const res = await apiFetch(`/api/memory?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, globalOpts, memorySchema);
}

export async function runMemoryAdd(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const content = opts.content ?? (opts.file ? readFileSync(opts.file, "utf8") : null);
  if (!content) {
    process.stderr.write("--content or --file required\n");
    process.exit(2);
  }
  const body = {
    content,
    type: opts.type ?? "user",
    ...(opts.metadata ? { metadata: JSON.parse(opts.metadata) } : {}),
    ...(opts.apiKey ? { apiKey: opts.apiKey } : {}),
  };
  const res = await apiFetch("/api/memory", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const created = await res.json();
  emit(created, globalOpts, memorySchema);
}

export async function runMemoryClear(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  if (!opts.yes) {
    const ok = await confirm("This will delete memories. Continue?");
    if (!ok) process.exit(0);
  }
  const params = new URLSearchParams();
  if (opts.type) params.set("type", opts.type);
  if (opts.olderThan) {
    const iso = parseDuration(opts.olderThan);
    if (!iso) {
      process.stderr.write(`Invalid --older-than value: ${opts.olderThan}\n`);
      process.exit(2);
    }
    params.set("olderThan", iso);
  }
  if (opts.apiKey) params.set("apiKey", opts.apiKey);
  const res = await apiFetch(`/api/memory?${params}`, { method: "DELETE" });
  const data = await res.json();
  emit(data, globalOpts);
}

export async function runMemoryList(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const params = new URLSearchParams({ limit: String(opts.limit ?? 100) });
  if (opts.type) params.set("type", opts.type);
  if (opts.apiKey) params.set("apiKey", opts.apiKey);
  const res = await apiFetch(`/api/memory?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, globalOpts, memorySchema);
}

export async function runMemoryGet(id, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch(`/api/memory/${id}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts, memorySchema);
}

export async function runMemoryDelete(id, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  if (!opts.yes) {
    const ok = await confirm(`Delete memory ${id}?`);
    if (!ok) process.exit(0);
  }
  const res = await apiFetch(`/api/memory/${id}`, { method: "DELETE" });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write(`Deleted: ${id}\n`);
}

export async function runMemoryHealth(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch("/api/memory/health");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts);
}

export function registerMemory(program) {
  const memory = program.command("memory").description(t("memory.description"));

  memory
    .command("search <query>")
    .description(t("memory.search.description"))
    .option("--type <type>", t("memory.search.type"))
    .option("--limit <n>", t("memory.search.limit"), parseInt, 20)
    .option("--api-key <key>", t("memory.search.api_key"))
    .option("--token-budget <n>", t("memory.search.token_budget"), parseInt)
    .action(runMemorySearch);

  memory
    .command("add")
    .description(t("memory.add.description"))
    .option("--content <text>", t("memory.add.content"))
    .option("--file <path>", t("memory.add.file"))
    .option("--type <type>", t("memory.add.type"))
    .option("--metadata <json>", t("memory.add.metadata"))
    .option("--api-key <key>", t("memory.add.api_key"))
    .action(runMemoryAdd);

  memory
    .command("clear")
    .description(t("memory.clear.description"))
    .option("--type <type>", t("memory.clear.type"))
    .option("--older-than <duration>", t("memory.clear.older"))
    .option("--api-key <key>", t("memory.clear.api_key"))
    .option("--yes", t("memory.clear.yes"))
    .action(runMemoryClear);

  memory
    .command("list")
    .description(t("memory.list.description"))
    .option("--type <type>", t("memory.list.type"))
    .option("--limit <n>", t("memory.list.limit"), parseInt, 100)
    .option("--api-key <key>", t("memory.list.api_key"))
    .action(runMemoryList);

  memory.command("get <id>").description(t("memory.get.description")).action(runMemoryGet);

  memory
    .command("delete <id>")
    .description(t("memory.delete.description"))
    .option("--yes", t("memory.delete.yes"))
    .action(runMemoryDelete);

  memory.command("health").description(t("memory.health.description")).action(runMemoryHealth);
}
