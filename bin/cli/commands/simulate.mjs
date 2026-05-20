import { readFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const simulateSchema = [
  { key: "order", header: "#", width: 4 },
  { key: "provider", header: "Provider", width: 20 },
  { key: "model", header: "Model", width: 35 },
  { key: "probability", header: "Probability", formatter: (v) => `${Math.round(v * 100)}%` },
  { key: "estimatedCost", header: "Est. Cost", formatter: (v) => (v ? `$${v.toFixed(4)}` : "-") },
  { key: "healthStatus", header: "Breaker", width: 10 },
  { key: "quotaAvailable", header: "Quota %", formatter: (v) => `${v}%` },
];

export function registerSimulate(program) {
  program
    .command("simulate [prompt]")
    .description(t("simulate.description"))
    .option("--file <path>", t("simulate.file"))
    .option("-m, --model <id>", t("simulate.model"), "auto")
    .option("--combo <name>", t("simulate.combo"))
    .option("--reasoning-effort <level>", t("simulate.reasoning"))
    .option("--thinking-budget <n>", t("simulate.thinking"), parseInt)
    .option("--explain", t("simulate.explain"))
    .action(runSimulateCommand);
}

export async function runSimulateCommand(promptArg, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();

  let promptTokenEstimate = 100;
  if (opts.file) {
    try {
      const raw = readFileSync(opts.file, "utf8");
      const parsed = JSON.parse(raw);
      const text = JSON.stringify(parsed);
      promptTokenEstimate = Math.ceil(text.length / 4);
    } catch {
      promptTokenEstimate = 100;
    }
  } else if (promptArg) {
    promptTokenEstimate = Math.ceil(promptArg.length / 4);
  }

  const [combosRes, healthRes, quotaRes] = await Promise.allSettled([
    apiFetch("/api/combos", { timeout: globalOpts.timeout }).then((r) => r.json()),
    apiFetch("/api/monitoring/health", { timeout: globalOpts.timeout }).then((r) => r.json()),
    apiFetch("/api/usage/quota", { timeout: globalOpts.timeout }).then((r) => r.json()),
  ]);

  if (combosRes.status === "rejected") {
    process.stderr.write(t("common.serverOffline") + "\n");
    process.exit(3);
  }

  const combos = normalizeCombos(combosRes.value);
  const health = healthRes.status === "fulfilled" ? healthRes.value : {};
  const quota = quotaRes.status === "fulfilled" ? quotaRes.value : {};

  const targetCombo = opts.combo
    ? combos.find((c) => c.id === opts.combo || c.name === opts.combo)
    : combos.find((c) => c.enabled !== false);

  if (!targetCombo) {
    process.stderr.write(t("simulate.noCombo") + "\n");
    process.exit(1);
  }

  const models = getComboModels(targetCombo, opts.model);
  const breakers = toArray(health.circuitBreakers ?? health.breakers);
  const providers = toArray(quota.providers ?? quota.data);

  const simulatedPath = models.map((m, idx) => {
    const cb = breakers.find((b) => String(b.provider) === m.provider);
    const q = providers.find((p) => p.provider === m.provider);
    const inputCost = m.inputCostPer1M ?? 0;
    const estimatedCost = Math.round((promptTokenEstimate / 1_000_000) * inputCost * 10000) / 10000;
    return {
      order: idx + 1,
      provider: m.provider,
      model: m.model || opts.model,
      probability: idx === 0 ? 0.85 : 0.15 / Math.max(models.length - 1, 1),
      estimatedCost,
      healthStatus: String(cb?.state ?? "CLOSED"),
      quotaAvailable: q?.percentRemaining ?? 100,
    };
  });

  emit(simulatedPath, globalOpts, simulateSchema);

  if (opts.explain && !globalOpts.quiet) {
    const primary = simulatedPath[0];
    const fallbacks = simulatedPath.slice(1).map((s) => s.provider);
    process.stderr.write(`\nPrimary: ${primary?.provider} / ${primary?.model}\n`);
    if (fallbacks.length > 0) {
      process.stderr.write(`Fallbacks: ${fallbacks.join(" → ")}\n`);
    }
    const costs = simulatedPath.map((s) => s.estimatedCost);
    process.stderr.write(
      `Est. cost range: $${Math.min(...costs).toFixed(4)} – $${Math.max(...costs).toFixed(4)}\n`
    );
  }
}

function normalizeCombos(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.combos)) return raw.combos;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

function getComboModels(combo, modelFallback) {
  const steps = combo.steps ?? combo.models ?? combo.targets ?? [];
  return steps.map((step) => ({
    provider: step.provider ?? step.providerId ?? "",
    model: step.model ?? step.modelId ?? modelFallback ?? "auto",
    inputCostPer1M: step.inputCostPer1M ?? step.costPer1MInput ?? 0,
  }));
}

function toArray(val) {
  if (Array.isArray(val)) return val;
  return [];
}
