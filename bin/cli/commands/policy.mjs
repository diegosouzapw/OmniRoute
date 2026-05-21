import { readFileSync, writeFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function fmtTs(v) {
  if (!v) return "-";
  try {
    return new Date(v).toLocaleString();
  } catch {
    return String(v);
  }
}

async function confirm(q) {
  return new Promise((resolve) => {
    process.stdout.write(`${q} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (c) => resolve(c.toString().trim().toLowerCase().startsWith("y")));
  });
}

const policySchema = [
  { key: "id", header: "Policy ID", width: 22 },
  { key: "name", header: "Name", width: 30 },
  { key: "kind", header: "Kind", width: 14 },
  { key: "scope", header: "Scope", width: 16 },
  { key: "enabled", header: "Enabled", formatter: (v) => (v ? "✓" : "✗") },
  { key: "priority", header: "Prio", width: 6 },
  { key: "updatedAt", header: "Updated", formatter: fmtTs },
];

export async function runPolicyList(opts, cmd) {
  const params = new URLSearchParams();
  if (opts.kind) params.set("kind", opts.kind);
  if (opts.scope) params.set("scope", opts.scope);
  const res = await apiFetch(`/api/policies?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, cmd.optsWithGlobals(), policySchema);
}

export async function runPolicyGet(id, opts, cmd) {
  const res = await apiFetch(`/api/policies/${id}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals());
}

export async function runPolicyCreate(opts, cmd) {
  const body = JSON.parse(readFileSync(opts.file, "utf8"));
  const res = await apiFetch("/api/policies", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals(), policySchema);
}

export async function runPolicyUpdate(id, opts, cmd) {
  const body = JSON.parse(readFileSync(opts.file, "utf8"));
  const res = await apiFetch(`/api/policies/${id}`, { method: "PUT", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals(), policySchema);
}

export async function runPolicyDelete(id, opts, cmd) {
  if (!opts.yes) {
    const ok = await confirm(`Delete policy ${id}?`);
    if (!ok) return;
  }
  const res = await apiFetch(`/api/policies/${id}`, { method: "DELETE" });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write("Deleted\n");
}

export async function runPolicyEvaluate(opts, cmd) {
  const body = {
    apiKey: opts.apiKey,
    action: opts.action,
    ...(opts.resource ? { resource: opts.resource } : {}),
    ...(opts.context ? { context: JSON.parse(opts.context) } : {}),
  };
  const res = await apiFetch("/api/policies/evaluate", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, cmd.optsWithGlobals());
  process.exit(data.allowed ? 0 : 4);
}

export async function runPolicyExport(file, opts, cmd) {
  const res = await apiFetch("/api/policies?export=true");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  writeFileSync(file, JSON.stringify(data, null, 2));
  process.stdout.write(`Exported ${data.items?.length ?? 0} policies to ${file}\n`);
}

export async function runPolicyImport(file, opts, cmd) {
  const body = JSON.parse(readFileSync(file, "utf8"));
  const overwrite = opts.overwrite ? "true" : "false";
  const res = await apiFetch(`/api/policies?import=true&overwrite=${overwrite}`, {
    method: "POST",
    body,
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals());
}

export function registerPolicy(program) {
  const policy = program.command("policy").description(t("policy.description"));

  policy
    .command("list")
    .description(t("policy.list.description"))
    .option("--kind <k>", t("policy.list.kind"))
    .option("--scope <s>", t("policy.list.scope"))
    .action(runPolicyList);

  policy.command("get <id>").description(t("policy.get.description")).action(runPolicyGet);

  policy
    .command("create")
    .description(t("policy.create.description"))
    .requiredOption("--file <path>", t("policy.create.file"))
    .action(runPolicyCreate);

  policy
    .command("update <id>")
    .description(t("policy.update.description"))
    .requiredOption("--file <path>", t("policy.update.file"))
    .action(runPolicyUpdate);

  policy
    .command("delete <id>")
    .description(t("policy.delete.description"))
    .option("--yes", t("policy.delete.yes"))
    .action(runPolicyDelete);

  policy
    .command("evaluate")
    .description(t("policy.evaluate.description"))
    .requiredOption("--api-key <k>", t("policy.evaluate.api_key"))
    .requiredOption("--action <a>", t("policy.evaluate.action"))
    .option("--resource <r>", t("policy.evaluate.resource"))
    .option("--context <json>", t("policy.evaluate.context"))
    .action(runPolicyEvaluate);

  policy
    .command("export <file>")
    .description(t("policy.export.description"))
    .action(runPolicyExport);

  policy
    .command("import <file>")
    .description(t("policy.import.description"))
    .option("--overwrite", t("policy.import.overwrite"))
    .action(runPolicyImport);
}
