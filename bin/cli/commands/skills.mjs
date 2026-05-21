import { readFileSync } from "node:fs";
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

async function confirm(question) {
  return new Promise((resolve) => {
    process.stdout.write(`${question} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (chunk) => {
      resolve(chunk.toString().trim().toLowerCase().startsWith("y"));
    });
  });
}

const skillSchema = [
  { key: "id", header: "ID", width: 22 },
  { key: "name", header: "Name", width: 28 },
  { key: "type", header: "Type", width: 12 },
  { key: "version", header: "Ver", width: 8 },
  { key: "enabled", header: "Enabled", formatter: (v) => (v ? "✓" : "✗") },
  { key: "lastRun", header: "Last Run", formatter: fmtTs },
];

const executionSchema = [
  { key: "id", header: "Exec ID", width: 22 },
  { key: "skillId", header: "Skill", width: 22 },
  { key: "status", header: "Status", width: 12 },
  { key: "startedAt", header: "Started", formatter: fmtTs },
  { key: "duration", header: "Duration", formatter: (v) => (v != null ? `${v}ms` : "-") },
  { key: "error", header: "Error", formatter: truncate },
];

const marketplaceSchema = [
  { key: "id", header: "Package ID", width: 22 },
  { key: "name", header: "Name", width: 28 },
  { key: "category", header: "Category", width: 14 },
  { key: "version", header: "Latest", width: 10 },
  { key: "downloads", header: "DLs", formatter: (v) => (v != null ? v.toLocaleString() : "0") },
  { key: "rating", header: "★", formatter: (v) => (v ? "★".repeat(Math.round(v)) : "-") },
  { key: "author", header: "Author", width: 18 },
];

export async function runSkillsList(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const params = new URLSearchParams();
  if (opts.type) params.set("type", opts.type);
  if (opts.enabled) params.set("enabled", "true");
  if (opts.disabled) params.set("enabled", "false");
  if (opts.apiKey) params.set("apiKey", opts.apiKey);
  const res = await apiFetch(`/api/skills?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, globalOpts, skillSchema);
}

export async function runSkillsGet(id, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch(`/api/skills/${id}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts, skillSchema);
}

export async function runSkillsInstall(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  let body = {};
  if (opts.fromFile) {
    body = JSON.parse(readFileSync(opts.fromFile, "utf8"));
  } else if (opts.fromUrl) {
    body = { url: opts.fromUrl };
  } else {
    process.stderr.write("--from-file or --from-url required\n");
    process.exit(2);
  }
  if (opts.type) body.type = opts.type;
  if (opts.enable) body.enabled = true;
  const res = await apiFetch("/api/skills/install", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts, skillSchema);
}

export async function runSkillsEnable(id, opts, cmd) {
  const res = await apiFetch("/api/mcp/tools/call", {
    method: "POST",
    body: { name: "omniroute_skills_enable", arguments: { skillId: id, enabled: true } },
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write(`Enabled: ${id}\n`);
}

export async function runSkillsDisable(id, opts, cmd) {
  if (!opts.yes) {
    const ok = await confirm(`Disable ${id}?`);
    if (!ok) return;
  }
  const res = await apiFetch("/api/mcp/tools/call", {
    method: "POST",
    body: { name: "omniroute_skills_enable", arguments: { skillId: id, enabled: false } },
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write(`Disabled: ${id}\n`);
}

export async function runSkillsDelete(id, opts, cmd) {
  if (!opts.yes) {
    const ok = await confirm(`Delete skill ${id}?`);
    if (!ok) return;
  }
  const res = await apiFetch(`/api/skills/${id}`, { method: "DELETE" });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write(`Deleted: ${id}\n`);
}

export async function runSkillsExecute(id, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const input = opts.input
    ? JSON.parse(opts.input)
    : opts.inputFile
      ? JSON.parse(readFileSync(opts.inputFile, "utf8"))
      : {};
  const res = await apiFetch("/api/mcp/tools/call", {
    method: "POST",
    body: { name: "omniroute_skills_execute", arguments: { skillId: id, input } },
    timeout: opts.timeout ?? 30000,
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts);
}

export async function runSkillsExecutions(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const params = new URLSearchParams({ limit: String(opts.limit ?? 50) });
  if (opts.skill) params.set("skillId", opts.skill);
  if (opts.status) params.set("status", opts.status);
  const res = await apiFetch(`/api/skills/executions?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, globalOpts, executionSchema);
}

export async function runSkillsshList(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch("/api/skills/skillssh");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, globalOpts, skillSchema);
}

export async function runSkillsshInstall(url, opts, cmd) {
  const res = await apiFetch("/api/skills/skillssh/install", {
    method: "POST",
    body: { url },
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  process.stdout.write(`Installed: ${data.skillId ?? url}\n`);
}

export async function runMarketplaceSearch(query, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const params = new URLSearchParams({ limit: String(opts.limit ?? 30) });
  if (query) params.set("q", query);
  if (opts.category) params.set("category", opts.category);
  if (opts.tag) params.set("tag", opts.tag);
  if (opts.sort) params.set("sort", opts.sort);
  const res = await apiFetch(`/api/skills/marketplace?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, globalOpts, marketplaceSchema);
}

export async function runMarketplaceInfo(packageId, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch(`/api/skills/marketplace?id=${packageId}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${packageId}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, globalOpts, marketplaceSchema);
  if (globalOpts.output !== "json" && globalOpts.output !== "jsonl") {
    process.stdout.write("\nReadme:\n");
    process.stdout.write(data.readme ?? "(no readme)");
    process.stdout.write("\n");
  }
}

export async function runMarketplaceInstall(packageId, opts, cmd) {
  if (!opts.yes) {
    const infoRes = await apiFetch(`/api/skills/marketplace?id=${packageId}`);
    if (infoRes.ok) {
      const info = await infoRes.json();
      process.stdout.write(`Installing: ${info.name ?? packageId} v${info.version ?? "?"}\n`);
      process.stdout.write(`Permissions: ${(info.permissions ?? []).join(", ") || "(none)"}\n`);
    }
    const ok = await confirm("Continue?");
    if (!ok) process.exit(0);
  }
  const res = await apiFetch("/api/skills/marketplace/install", {
    method: "POST",
    body: { packageId, version: opts.version ?? "latest", enable: !!opts.enable },
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  process.stdout.write(`Installed: ${data.skillId ?? packageId}\n`);
}

export async function runMarketplaceCategories(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch("/api/skills/marketplace?facets=categories");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.categories ?? data, globalOpts);
}

export async function runMarketplaceFeatured(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch("/api/skills/marketplace?featured=true");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, globalOpts, marketplaceSchema);
}

function registerSkillsMarketplace(skills) {
  const mp = skills.command("marketplace").description(t("skills.marketplace.description"));

  mp.command("search [query]")
    .description(t("skills.mp.search.description"))
    .option("--category <c>", t("skills.mp.search.category"))
    .option("--tag <t>", t("skills.mp.search.tag"))
    .option("--limit <n>", t("skills.mp.search.limit"), parseInt, 30)
    .option("--sort <s>", t("skills.mp.search.sort"))
    .action(runMarketplaceSearch);

  mp.command("info <packageId>")
    .description(t("skills.mp.info.description"))
    .action(runMarketplaceInfo);

  mp.command("install <packageId>")
    .description(t("skills.mp.install.description"))
    .option("--version <v>", t("skills.mp.install.version"), "latest")
    .option("--enable", t("skills.mp.install.enable"))
    .option("--yes", t("skills.mp.install.yes"))
    .action(runMarketplaceInstall);

  mp.command("categories")
    .description(t("skills.mp.categories.description"))
    .action(runMarketplaceCategories);

  mp.command("featured")
    .description(t("skills.mp.featured.description"))
    .action(runMarketplaceFeatured);
}

export function registerSkills(program) {
  const skills = program.command("skills").description(t("skills.description"));

  skills
    .command("list")
    .description(t("skills.list.description"))
    .option("--type <type>", t("skills.list.type"))
    .option("--enabled", t("skills.list.enabled"))
    .option("--disabled", t("skills.list.disabled"))
    .option("--api-key <key>", t("skills.list.api_key"))
    .action(runSkillsList);

  skills.command("get <id>").description(t("skills.get.description")).action(runSkillsGet);

  skills
    .command("install")
    .description(t("skills.install.description"))
    .option("--from-file <path>", t("skills.install.from_file"))
    .option("--from-url <url>", t("skills.install.from_url"))
    .option("--type <type>", t("skills.install.type"))
    .option("--enable", t("skills.install.enable"))
    .action(runSkillsInstall);

  skills.command("enable <id>").description(t("skills.enable.description")).action(runSkillsEnable);

  skills
    .command("disable <id>")
    .description(t("skills.disable.description"))
    .option("--yes", t("skills.disable.yes"))
    .action(runSkillsDisable);

  skills
    .command("delete <id>")
    .description(t("skills.delete.description"))
    .option("--yes", t("skills.delete.yes"))
    .action(runSkillsDelete);

  skills
    .command("execute <id>")
    .description(t("skills.execute.description"))
    .option("--input <json>", t("skills.execute.input"))
    .option("--input-file <path>", t("skills.execute.input_file"))
    .option("--timeout <ms>", t("skills.execute.timeout"), parseInt, 30000)
    .action(runSkillsExecute);

  skills
    .command("executions")
    .description(t("skills.executions.description"))
    .option("--skill <id>", t("skills.executions.skill"))
    .option("--limit <n>", t("skills.executions.limit"), parseInt, 50)
    .option("--status <s>", t("skills.executions.status"))
    .action(runSkillsExecutions);

  const skillssh = skills.command("skillssh").description(t("skills.skillssh.description"));
  skillssh.command("list").action(runSkillsshList);
  skillssh.command("install <url>").action(runSkillsshInstall);

  registerSkillsMarketplace(skills);
}
