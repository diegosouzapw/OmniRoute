import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function fmtTs(v) {
  if (!v) return "-";
  return new Date(typeof v === "number" ? v * 1000 : v).toLocaleString();
}

function fmtPrice(v) {
  if (v == null) return "-";
  return `$${Number(v).toFixed(2)}`;
}

const pricingSchema = [
  { key: "model", header: "Model", width: 32 },
  { key: "provider", header: "Provider", width: 16 },
  { key: "inputPer1M", header: "Input/$1M", formatter: fmtPrice },
  { key: "outputPer1M", header: "Output/$1M", formatter: fmtPrice },
  { key: "cacheReadPer1M", header: "Cache R", formatter: fmtPrice },
  { key: "cacheWritePer1M", header: "Cache W", formatter: fmtPrice },
  { key: "source", header: "Source" },
  { key: "updatedAt", header: "Updated", formatter: fmtTs },
];

export async function runPricingSync(opts, cmd) {
  const res = await apiFetch("/api/pricing/sync", {
    method: "POST",
    body: { provider: opts.provider, force: !!opts.force },
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals());
}

export async function runPricingList(opts, cmd) {
  const params = new URLSearchParams({ limit: String(opts.limit ?? 200) });
  if (opts.provider) params.set("provider", opts.provider);
  if (opts.model) params.set("model", opts.model);
  const res = await apiFetch(`/api/pricing?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, cmd.optsWithGlobals(), pricingSchema);
}

export function registerPricing(program) {
  const pricing = program.command("pricing").description(t("pricing.description"));

  pricing
    .command("sync")
    .description(t("pricing.sync.description"))
    .option("--provider <p>", t("pricing.sync.provider"))
    .option("--force", t("pricing.sync.force"))
    .action(runPricingSync);

  pricing
    .command("list")
    .option("--provider <p>", t("pricing.list.provider"))
    .option("--model <m>", t("pricing.list.model"))
    .option("--limit <n>", t("pricing.list.limit"), parseInt, 200)
    .action(runPricingList);

  pricing.command("get <model>").action(async (model, opts, cmd) => {
    const res = await apiFetch(`/api/pricing?model=${encodeURIComponent(model)}`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  const defaults = pricing.command("defaults").description(t("pricing.defaults.description"));

  defaults.command("show").action(async (opts, cmd) => {
    const res = await apiFetch("/api/pricing/defaults");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  defaults
    .command("set")
    .option("--input <p>", t("pricing.defaults.input"), parseFloat)
    .option("--output <p>", t("pricing.defaults.output"), parseFloat)
    .option("--cache-read <p>", t("pricing.defaults.cacheRead"), parseFloat)
    .option("--cache-write <p>", t("pricing.defaults.cacheWrite"), parseFloat)
    .action(async (opts, cmd) => {
      const body = {};
      if (opts.input != null) body.inputPer1M = opts.input;
      if (opts.output != null) body.outputPer1M = opts.output;
      if (opts.cacheRead != null) body.cacheReadPer1M = opts.cacheRead;
      if (opts.cacheWrite != null) body.cacheWritePer1M = opts.cacheWrite;
      const res = await apiFetch("/api/pricing/defaults", { method: "PUT", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  pricing
    .command("diff")
    .description(t("pricing.diff.description"))
    .option("--model <m>", t("pricing.diff.model"))
    .action(async (opts, cmd) => {
      const params = new URLSearchParams({ diff: "true" });
      if (opts.model) params.set("model", opts.model);
      const res = await apiFetch(`/api/pricing?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.diff ?? data, cmd.optsWithGlobals());
    });
}
