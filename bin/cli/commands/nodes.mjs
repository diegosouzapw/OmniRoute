import { createInterface } from "node:readline";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function fmtTs(v) {
  if (!v) return "-";
  return new Date(typeof v === "number" ? v * 1000 : v).toLocaleString();
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

function parseHeader(kv) {
  const eq = kv.indexOf("=");
  if (eq < 0) return { name: kv, value: "" };
  return { name: kv.slice(0, eq), value: kv.slice(eq + 1) };
}

const nodeSchema = [
  { key: "id", header: "Node ID", width: 22 },
  { key: "provider", header: "Provider", width: 16 },
  { key: "name", header: "Name", width: 24 },
  { key: "baseUrl", header: "Base URL", width: 38 },
  { key: "region", header: "Region", width: 14 },
  { key: "weight", header: "Weight" },
  { key: "enabled", header: "Enabled", formatter: (v) => (v ? "✓" : "✗") },
  { key: "lastLatencyMs", header: "Latency", formatter: (v) => (v ? `${v}ms` : "-") },
];

export function registerNodes(program) {
  const nodes = program
    .command("nodes")
    .alias("provider-nodes")
    .description(t("nodes.description"));

  nodes
    .command("list")
    .option("--provider <p>", t("nodes.list.provider"))
    .option("--enabled", t("nodes.list.enabled"))
    .action(async (opts, cmd) => {
      const params = new URLSearchParams();
      if (opts.provider) params.set("provider", opts.provider);
      if (opts.enabled) params.set("enabled", "true");
      const res = await apiFetch(`/api/provider-nodes?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.items ?? data, cmd.optsWithGlobals(), nodeSchema);
    });

  nodes.command("get <nodeId>").action(async (id, opts, cmd) => {
    const res = await apiFetch(`/api/provider-nodes/${id}`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  nodes
    .command("add")
    .requiredOption("--provider <p>", t("nodes.add.provider"))
    .requiredOption("--base-url <url>", t("nodes.add.baseUrl"))
    .option("--name <n>", t("nodes.add.name"))
    .option("--weight <w>", t("nodes.add.weight"), parseInt, 100)
    .option("--region <r>", t("nodes.add.region"))
    .option(
      "--auth-header <kv>",
      t("nodes.add.authHeader"),
      (v, prev = []) => [...prev, parseHeader(v)],
      []
    )
    .action(async (opts, cmd) => {
      const body = {
        provider: opts.provider,
        baseUrl: opts.baseUrl,
        name: opts.name,
        weight: opts.weight,
        region: opts.region,
        enabled: true,
        headers: opts.authHeader?.length ? opts.authHeader : undefined,
      };
      const res = await apiFetch("/api/provider-nodes", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  nodes
    .command("update <nodeId>")
    .option("--base-url <url>", t("nodes.update.baseUrl"))
    .option("--name <n>", t("nodes.update.name"))
    .option("--weight <w>", t("nodes.update.weight"), parseInt)
    .option("--region <r>", t("nodes.update.region"))
    .option("--enabled <b>", t("nodes.update.enabled"), (v) => v === "true")
    .action(async (id, opts, cmd) => {
      const body = {};
      for (const k of ["baseUrl", "name", "weight", "region", "enabled"]) {
        if (opts[k] !== undefined) body[k] = opts[k];
      }
      const res = await apiFetch(`/api/provider-nodes/${id}`, { method: "PUT", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  nodes
    .command("remove <nodeId>")
    .option("--yes", t("nodes.remove.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Remove node ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/provider-nodes/${id}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Removed\n");
    });

  nodes
    .command("validate")
    .requiredOption("--base-url <url>", t("nodes.validate.baseUrl"))
    .requiredOption("--provider <p>", t("nodes.validate.provider"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/provider-nodes/validate", {
        method: "POST",
        body: { baseUrl: opts.baseUrl, provider: opts.provider },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  nodes
    .command("test <nodeId>")
    .description(t("nodes.test.description"))
    .action(async (id, opts, cmd) => {
      const res = await apiFetch(`/api/provider-nodes/${id}?test=true`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  nodes
    .command("metrics <nodeId>")
    .description(t("nodes.metrics.description"))
    .option("--period <p>", t("nodes.metrics.period"), "24h")
    .action(async (id, opts, cmd) => {
      const res = await apiFetch(`/api/provider-nodes/${id}?metrics=true&period=${opts.period}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });
}
