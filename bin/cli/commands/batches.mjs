import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { setTimeout as sleep } from "node:timers/promises";
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

const batchSchema = [
  { key: "id", header: "Batch ID", width: 28 },
  { key: "status", header: "Status", width: 14 },
  { key: "endpoint", header: "Endpoint", width: 26 },
  {
    key: "request_counts",
    header: "Total",
    formatter: (v) => (v?.completed != null ? `${v.completed}/${v.total}` : "-"),
  },
  { key: "created_at", header: "Created", formatter: fmtTs },
];

async function uploadFile(filePath, purpose) {
  const { fmtBytes } = await import("./files.mjs");
  const { statSync, readFileSync: readF } = await import("node:fs");
  const { basename } = await import("node:path");
  const stat = statSync(filePath);
  if (stat.size > 100 * 1024 * 1024) {
    process.stderr.write(`Warning: file is ${fmtBytes(stat.size)} (large)\n`);
  }
  const form = new FormData();
  form.append("purpose", purpose);
  form.append("file", new Blob([readF(filePath)]), basename(filePath));

  const res = await apiFetch("/v1/files", { method: "POST", body: form });
  if (!res.ok) {
    process.stderr.write(`Upload failed: ${res.status}\n`);
    process.exit(1);
  }
  return res.json();
}

async function fetchFile(fileId, globalOpts = {}) {
  const res = await fetch(`${getBaseUrl(globalOpts)}/v1/files/${fileId}/content`, {
    headers: authHeaders(globalOpts),
  });
  if (!res.ok) {
    process.stderr.write(`Error fetching file: ${res.status}\n`);
    process.exit(1);
  }
  return res.text();
}

async function waitBatch(id, opts, timeout = 3600000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const res = await apiFetch(`/v1/batches/${id}`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    const b = await res.json();
    const done = b.request_counts?.completed ?? 0;
    const total = b.request_counts?.total ?? "?";
    process.stderr.write(`[${b.status}] ${done}/${total}\n`);
    if (["completed", "failed", "expired", "cancelled"].includes(b.status)) {
      emit(b, opts);
      return;
    }
    await sleep(5000);
  }
  process.stderr.write("Timeout\n");
  process.exit(124);
}

export function registerBatches(program) {
  const batches = program.command("batches").description(t("batches.description"));

  batches
    .command("list")
    .option("--status <s>", t("batches.list.status"))
    .option("--limit <n>", t("batches.list.limit"), parseInt, 50)
    .action(async (opts, cmd) => {
      const params = new URLSearchParams({ limit: String(opts.limit) });
      if (opts.status) params.set("status", opts.status);
      const res = await apiFetch(`/v1/batches?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.data ?? data.items ?? data, cmd.optsWithGlobals(), batchSchema);
    });

  batches.command("get <batchId>").action(async (id, opts, cmd) => {
    const res = await apiFetch(`/v1/batches/${id}`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  batches
    .command("create")
    .description(t("batches.create.description"))
    .requiredOption("--input-file <fileId>", t("batches.create.inputFile"))
    .option("--endpoint <e>", t("batches.create.endpoint"), "/v1/chat/completions")
    .option("--completion-window <w>", t("batches.create.window"), "24h")
    .option(
      "--metadata <kv>",
      t("batches.create.metadata"),
      (v, prev = {}) => {
        const eq = v.indexOf("=");
        if (eq < 0) return prev;
        const k = v.slice(0, eq);
        const val = v.slice(eq + 1);
        return { ...prev, [k]: val };
      },
      {}
    )
    .action(async (opts, cmd) => {
      const body = {
        input_file_id: opts.inputFile,
        endpoint: opts.endpoint,
        completion_window: opts.completionWindow,
        metadata: Object.keys(opts.metadata).length ? opts.metadata : undefined,
      };
      const res = await apiFetch("/v1/batches", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  batches
    .command("submit")
    .description(t("batches.submit.description"))
    .requiredOption("--jsonl <path>", t("batches.submit.jsonl"))
    .option("--endpoint <e>", t("batches.submit.endpoint"), "/v1/chat/completions")
    .option("--wait", t("batches.submit.wait"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const upload = await uploadFile(opts.jsonl, "batch");
      const res = await apiFetch("/v1/batches", {
        method: "POST",
        body: { input_file_id: upload.id, endpoint: opts.endpoint, completion_window: "24h" },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const batch = await res.json();
      emit(batch, globalOpts);
      if (opts.wait) await waitBatch(batch.id, globalOpts);
    });

  batches
    .command("cancel <batchId>")
    .option("--yes", t("batches.cancel.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Cancel batch ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/v1/batches/${id}/cancel`, { method: "POST" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Cancelled\n");
    });

  batches
    .command("wait <batchId>")
    .option("--timeout <ms>", t("batches.wait.timeout"), parseInt, 3600000)
    .action(async (id, opts, cmd) => waitBatch(id, cmd.optsWithGlobals(), opts.timeout));

  batches
    .command("output <batchId>")
    .option("--out <path>", t("batches.output.out"), "batch-output.jsonl")
    .action(async (id, opts, cmd) => {
      const res = await apiFetch(`/v1/batches/${id}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const batch = await res.json();
      if (!batch.output_file_id) {
        process.stderr.write("Not yet completed\n");
        process.exit(1);
      }
      const content = await fetchFile(batch.output_file_id, cmd.optsWithGlobals());
      writeFileSync(opts.out, content);
      process.stdout.write(`Saved to ${opts.out}\n`);
    });

  batches
    .command("errors <batchId>")
    .option("--out <path>", t("batches.errors.out"), "batch-errors.jsonl")
    .action(async (id, opts, cmd) => {
      const res = await apiFetch(`/v1/batches/${id}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const batch = await res.json();
      if (!batch.error_file_id) {
        process.stdout.write("No errors\n");
        return;
      }
      const content = await fetchFile(batch.error_file_id, cmd.optsWithGlobals());
      writeFileSync(opts.out, content);
      process.stdout.write(`Saved to ${opts.out}\n`);
    });
}
