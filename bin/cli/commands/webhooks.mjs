import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const EVENT_TYPES = [
  "request.completed",
  "request.failed",
  "rate_limit.exceeded",
  "budget.exceeded",
  "quota.reset",
  "provider.down",
  "provider.up",
  "combo.switched",
  "circuit.opened",
  "circuit.closed",
  "skill.executed",
  "memory.added",
  "audit.created",
];

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

function maskSecret(v) {
  if (!v) return "-";
  return "***";
}

const webhookSchema = [
  { key: "id", header: "ID", width: 22 },
  { key: "url", header: "URL", width: 40, formatter: truncate },
  {
    key: "events",
    header: "Events",
    formatter: (v) => (Array.isArray(v) ? v.join(", ") : String(v ?? "-")),
  },
  { key: "enabled", header: "Enabled", formatter: (v) => (v ? "✓" : "✗") },
  { key: "secret", header: "Secret", formatter: maskSecret },
  { key: "lastDelivery", header: "Last Delivery", formatter: fmtTs },
  { key: "lastStatus", header: "Last Status", width: 10 },
];

function parseHeader(kv) {
  const eq = kv.indexOf("=");
  if (eq === -1) return { name: kv, value: "" };
  return { name: kv.slice(0, eq), value: kv.slice(eq + 1) };
}

async function confirm(q) {
  return new Promise((resolve) => {
    process.stdout.write(`${q} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (c) => resolve(c.toString().trim().toLowerCase().startsWith("y")));
  });
}

export async function runWebhooksList(opts, cmd) {
  const res = await apiFetch("/api/webhooks");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, cmd.optsWithGlobals(), webhookSchema);
}

export async function runWebhooksGet(id, opts, cmd) {
  const res = await apiFetch(`/api/webhooks/${id}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals(), webhookSchema);
}

export async function runWebhooksAdd(opts, cmd) {
  const body = {
    url: opts.url,
    events: opts.events,
    ...(opts.secret ? { secret: opts.secret } : {}),
    headers: opts.header ?? [],
    enabled: opts.enabled !== false,
  };
  const res = await apiFetch("/api/webhooks", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals(), webhookSchema);
}

export async function runWebhooksUpdate(id, opts, cmd) {
  const body = {};
  if (opts.url !== undefined) body.url = opts.url;
  if (opts.events !== undefined) body.events = opts.events;
  if (opts.secret !== undefined) body.secret = opts.secret;
  if (opts.enabled !== undefined) body.enabled = opts.enabled;
  if (opts.header?.length) body.headers = opts.header.map(parseHeader);
  const res = await apiFetch(`/api/webhooks/${id}`, { method: "PUT", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals(), webhookSchema);
}

export async function runWebhooksRemove(id, opts, cmd) {
  if (!opts.yes) {
    const ok = await confirm(`Delete webhook ${id}?`);
    if (!ok) return;
  }
  const res = await apiFetch(`/api/webhooks/${id}`, { method: "DELETE" });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write("Removed\n");
}

export async function runWebhooksTest(id, opts, cmd) {
  const body = { event: opts.event ?? "request.completed" };
  const res = await apiFetch(`/api/webhooks/${id}/test`, { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, cmd.optsWithGlobals());
}

export function registerWebhooks(program) {
  const webhooks = program.command("webhooks").description(t("webhooks.description"));

  webhooks
    .command("events")
    .description(t("webhooks.events.description"))
    .action(async (opts, cmd) => {
      emit(
        EVENT_TYPES.map((e) => ({ event: e })),
        cmd.optsWithGlobals()
      );
    });

  webhooks.command("list").description(t("webhooks.list.description")).action(runWebhooksList);

  webhooks.command("get <id>").description(t("webhooks.get.description")).action(runWebhooksGet);

  webhooks
    .command("add")
    .description(t("webhooks.add.description"))
    .requiredOption("--url <url>", t("webhooks.add.url"))
    .requiredOption("--events <list>", t("webhooks.add.events"), (v) => v.split(","))
    .option("--secret <s>", t("webhooks.add.secret"))
    .option(
      "--header <kv>",
      t("webhooks.add.header"),
      (v, prev) => [...(prev ?? []), parseHeader(v)],
      []
    )
    .option("--no-enabled", t("webhooks.add.no_enabled"))
    .action(runWebhooksAdd);

  webhooks
    .command("update <id>")
    .description(t("webhooks.update.description"))
    .option("--url <url>", t("webhooks.add.url"))
    .option("--events <list>", t("webhooks.add.events"), (v) => v.split(","))
    .option("--secret <s>", t("webhooks.add.secret"))
    .option("--header <kv>", t("webhooks.add.header"), (v, prev) => [...(prev ?? []), v], [])
    .option("--enabled <bool>", t("webhooks.update.enabled"), (v) => v === "true")
    .action(runWebhooksUpdate);

  webhooks
    .command("remove <id>")
    .description(t("webhooks.remove.description"))
    .option("--yes", t("webhooks.remove.yes"))
    .action(runWebhooksRemove);

  webhooks
    .command("test <id>")
    .description(t("webhooks.test.description"))
    .option("--event <e>", t("webhooks.test.event"), "request.completed")
    .action(runWebhooksTest);
}
