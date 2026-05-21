import { createReadStream, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename } from "node:path";
import { createInterface } from "node:readline";
import { apiFetch, getBaseUrl } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function fmtTs(v) {
  if (!v) return "-";
  return new Date(typeof v === "number" ? v * 1000 : v).toLocaleString();
}

function fmtBytes(n) {
  if (n == null) return "-";
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
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

const fileSchema = [
  { key: "id", header: "File ID", width: 30 },
  { key: "filename", header: "Filename", width: 35 },
  { key: "purpose", header: "Purpose", width: 14 },
  { key: "bytes", header: "Bytes", formatter: fmtBytes },
  { key: "created_at", header: "Created", formatter: fmtTs },
  { key: "status", header: "Status" },
];

export function registerFiles(program) {
  const files = program.command("files").description(t("files.description"));

  files
    .command("list")
    .option("--purpose <p>", t("files.list.purpose"))
    .option("--limit <n>", t("files.list.limit"), parseInt, 100)
    .action(async (opts, cmd) => {
      const params = new URLSearchParams({ limit: String(opts.limit) });
      if (opts.purpose) params.set("purpose", opts.purpose);
      const res = await apiFetch(`/v1/files?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.data ?? data.items ?? data, cmd.optsWithGlobals(), fileSchema);
    });

  files
    .command("get <fileId>")
    .description(t("files.get.description"))
    .action(async (id, opts, cmd) => {
      const res = await apiFetch(`/v1/files/${id}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  files
    .command("upload <path>")
    .description(t("files.upload.description"))
    .requiredOption("--purpose <p>", t("files.upload.purpose"))
    .action(async (filePath, opts, cmd) => {
      const stat = statSync(filePath);
      if (stat.size > 100 * 1024 * 1024) {
        process.stderr.write(
          `Warning: file is ${fmtBytes(stat.size)} (${stat.size > 500e6 ? "very " : ""}large)\n`
        );
      }
      const globalOpts = cmd.optsWithGlobals();
      const form = new FormData();
      form.append("purpose", opts.purpose);
      form.append("file", new Blob([readFileSync(filePath)]), basename(filePath));

      const res = await fetch(`${getBaseUrl(globalOpts)}/v1/files`, {
        method: "POST",
        headers: authHeaders(globalOpts),
        body: form,
      });
      if (!res.ok) {
        process.stderr.write(`Upload failed: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), globalOpts);
    });

  files
    .command("content <fileId>")
    .description(t("files.content.description"))
    .option("--out <path>", t("files.content.out"))
    .action(async (id, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const res = await fetch(`${getBaseUrl(globalOpts)}/v1/files/${id}/content`, {
        headers: authHeaders(globalOpts),
      });
      if (!res.ok) {
        process.stderr.write(`HTTP ${res.status}\n`);
        process.exit(1);
      }
      if (opts.out) {
        const buf = Buffer.from(await res.arrayBuffer());
        writeFileSync(opts.out, buf);
        process.stdout.write(`Saved ${buf.length} bytes to ${opts.out}\n`);
      } else {
        process.stdout.write(await res.text());
      }
    });

  files
    .command("delete <fileId>")
    .option("--yes", t("files.delete.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Delete file ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/v1/files/${id}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Deleted\n");
    });
}

export { fmtBytes };
