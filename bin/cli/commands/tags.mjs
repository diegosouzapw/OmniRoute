import { createInterface } from "node:readline";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function truncate(v, max = 40) {
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

const tagSchema = [
  { key: "id", header: "ID", width: 14 },
  { key: "name", header: "Name", width: 25 },
  { key: "color", header: "Color" },
  { key: "description", header: "Description", width: 40, formatter: (v) => truncate(v, 40) },
  { key: "resourceCount", header: "Resources" },
];

export function registerTags(program) {
  const tags = program.command("tags").description(t("tags.description"));

  tags.command("list").action(async (opts, cmd) => {
    const res = await apiFetch("/api/tags");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    const data = await res.json();
    emit(data.items ?? data, cmd.optsWithGlobals(), tagSchema);
  });

  tags
    .command("add <name>")
    .option("--color <c>", t("tags.add.color"))
    .option("--description <d>", t("tags.add.description"))
    .action(async (name, opts, cmd) => {
      const body = { name, color: opts.color, description: opts.description };
      const res = await apiFetch("/api/tags", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  tags
    .command("remove <id>")
    .option("--yes", t("tags.remove.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Delete tag ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/tags?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Removed\n");
    });

  tags
    .command("assign")
    .requiredOption("--tag <name>", t("tags.assign.tag"))
    .requiredOption("--to <resource>", t("tags.assign.to"))
    .action(async (opts, cmd) => {
      const [resourceType, resourceId] = opts.to.split(":");
      const res = await apiFetch("/api/tags?op=assign", {
        method: "POST",
        body: { tag: opts.tag, resourceType, resourceId },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write(`Tag '${opts.tag}' → ${opts.to}\n`);
    });

  tags
    .command("unassign")
    .requiredOption("--tag <name>", t("tags.unassign.tag"))
    .requiredOption("--from <resource>", t("tags.unassign.from"))
    .action(async (opts, cmd) => {
      const [resourceType, resourceId] = opts.from.split(":");
      const res = await apiFetch("/api/tags?op=unassign", {
        method: "POST",
        body: { tag: opts.tag, resourceType, resourceId },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write(`Removed tag '${opts.tag}' from ${opts.from}\n`);
    });

  tags.command("resources <tagName>").action(async (tagName, opts, cmd) => {
    const res = await apiFetch(`/api/tags?name=${encodeURIComponent(tagName)}&resources=true`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    const data = await res.json();
    emit(data.resources ?? data, cmd.optsWithGlobals());
  });
}
