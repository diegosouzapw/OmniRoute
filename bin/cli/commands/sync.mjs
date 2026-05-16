import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { apiFetch, getBaseUrl } from "../api.mjs";
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

function authHeaders(opts) {
  const h = { accept: "application/json" };
  if (opts.apiKey) h["Authorization"] = `Bearer ${opts.apiKey}`;
  return h;
}

const BUNDLE_PARTS = ["settings", "combos", "keys", "providers", "policies", "skills", "memory"];

const syncTokenSchema = [
  { key: "id", header: "Token ID", width: 16 },
  { key: "name", header: "Name", width: 24 },
  { key: "scope", header: "Scope", width: 22 },
  { key: "createdAt", header: "Created", formatter: fmtTs },
  { key: "expiresAt", header: "Expires", formatter: fmtTs },
  { key: "lastUsed", header: "Last Used", formatter: fmtTs },
];

export function registerSync(program) {
  const sync = program.command("sync").description(t("sync.description"));

  sync
    .command("push")
    .description(t("sync.push.description"))
    .option("--target <t>", t("sync.push.target"), "cloud")
    .option("--bundle <list>", t("sync.push.bundle"), (v) => v.split(","), BUNDLE_PARTS)
    .option("--dry-run", t("sync.push.dryRun"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/sync/cloud", {
        method: "POST",
        body: { parts: opts.bundle, dryRun: !!opts.dryRun, target: opts.target },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  sync
    .command("pull")
    .description(t("sync.pull.description"))
    .option("--source <s>", t("sync.pull.source"), "cloud")
    .option("--merge", t("sync.pull.merge"))
    .option("--replace", t("sync.pull.replace"))
    .option("--dry-run", t("sync.pull.dryRun"))
    .action(async (opts, cmd) => {
      if (opts.merge && opts.replace) {
        process.stderr.write("--merge and --replace are mutually exclusive\n");
        process.exit(2);
      }
      const res = await apiFetch("/api/db-backups/exportAll", {
        method: "POST",
        body: {
          source: opts.source,
          strategy: opts.replace ? "replace" : "merge",
          dryRun: !!opts.dryRun,
        },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  sync
    .command("diff")
    .option("--source <s>", t("sync.diff.source"))
    .option("--target <t>", t("sync.diff.target"))
    .action(async (opts, cmd) => {
      const src = opts.source ?? "local";
      const tgt = opts.target ?? "cloud";
      const res = await apiFetch(`/api/sync/cloud?op=diff&source=${src}&target=${tgt}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  sync
    .command("bundle <outPath>")
    .description(t("sync.bundle.description"))
    .option("--include <list>", t("sync.bundle.include"), (v) => v.split(","), BUNDLE_PARTS)
    .action(async (outPath, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const res = await fetch(
        `${getBaseUrl(globalOpts)}/api/sync/bundle?parts=${opts.include.join(",")}`,
        { headers: authHeaders(globalOpts) }
      );
      if (!res.ok) {
        process.stderr.write(`HTTP ${res.status}\n`);
        process.exit(1);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      writeFileSync(outPath, buf);
      process.stdout.write(`Saved ${buf.length} bytes to ${outPath}\n`);
    });

  sync
    .command("import <bundlePath>")
    .description(t("sync.import.description"))
    .option("--dry-run", t("sync.import.dryRun"))
    .action(async (bundlePath, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const body = readFileSync(bundlePath);
      const res = await fetch(
        `${getBaseUrl(globalOpts)}/api/db-backups/import?dryRun=${opts.dryRun ? "true" : "false"}`,
        {
          method: "POST",
          headers: {
            ...authHeaders(globalOpts),
            "Content-Type": "application/octet-stream",
          },
          body,
        }
      );
      if (!res.ok) {
        process.stderr.write(`HTTP ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), globalOpts);
    });

  sync
    .command("initialize")
    .option("--from-cloud", t("sync.initialize.fromCloud"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/sync/initialize", {
        method: "POST",
        body: { fromCloud: !!opts.fromCloud },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  const tokens = sync.command("tokens").description(t("sync.tokens.description"));

  tokens.command("list").action(async (opts, cmd) => {
    const res = await apiFetch("/api/sync/tokens");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals(), syncTokenSchema);
  });

  tokens
    .command("create")
    .option("--name <n>", t("sync.tokens.create.name"))
    .option("--scope <s>", t("sync.tokens.create.scope"))
    .option("--ttl <duration>", t("sync.tokens.create.ttl"), "30d")
    .action(async (opts, cmd) => {
      const body = { name: opts.name, scope: opts.scope, ttl: opts.ttl };
      const res = await apiFetch("/api/sync/tokens", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  tokens
    .command("revoke <id>")
    .option("--yes", t("sync.tokens.revoke.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Revoke ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/sync/tokens/${id}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Revoked\n");
    });

  sync.command("status").action(async (opts, cmd) => {
    const res = await apiFetch("/api/sync/cloud?op=status");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  sync
    .command("resolve")
    .description(t("sync.resolve.description"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/sync/cloud?op=conflicts");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const conflicts = await res.json();
      for (const c of conflicts.items ?? []) {
        const choice = await confirm(`Conflict on ${c.path} — keep local?`);
        await apiFetch("/api/sync/cloud", {
          method: "POST",
          body: { op: "resolve", path: c.path, choice: choice ? "local" : "remote" },
        });
      }
    });
}
