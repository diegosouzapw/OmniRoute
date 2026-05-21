import { writeFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function fmtMetric(v) {
  if (v == null) return "-";
  if (typeof v === "number") {
    if (v > 1e9) return `${(v / 1e9).toFixed(2)}B`;
    if (v > 1e6) return `${(v / 1e6).toFixed(2)}M`;
    if (v > 1e3) return `${(v / 1e3).toFixed(2)}K`;
    return Number.isInteger(v) ? v.toLocaleString() : v.toFixed(2);
  }
  return String(v);
}

function fmtDelta(v) {
  if (v == null) return "-";
  const arrow = v > 0 ? "↑" : v < 0 ? "↓" : "→";
  const sign = v > 0 ? "+" : "";
  return `${arrow} ${sign}${(v * 100).toFixed(1)}%`;
}

const telemetrySchema = [
  { key: "metric", header: "Metric", width: 36 },
  { key: "value", header: "Value", formatter: fmtMetric },
  { key: "delta", header: "Δ vs prev", formatter: fmtDelta },
  { key: "trend", header: "Trend" },
];

export function registerTelemetry(program) {
  const tel = program.command("telemetry").description(t("telemetry.description"));

  tel
    .command("summary")
    .description(t("telemetry.summary.description"))
    .option("--period <p>", t("telemetry.summary.period"), "24h")
    .option("--compare-to <p>", t("telemetry.summary.compareTo"))
    .action(async (opts, cmd) => {
      const params = new URLSearchParams({ period: opts.period });
      if (opts.compareTo) params.set("compareTo", opts.compareTo);
      const res = await apiFetch(`/api/telemetry/summary?${params}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      const rows = Object.entries(data.metrics ?? data).map(([metric, info]) => ({
        metric,
        value: info?.value ?? info,
        delta: info?.delta,
        trend: info?.trend,
      }));
      emit(rows, cmd.optsWithGlobals(), telemetrySchema);
    });

  tel
    .command("export")
    .description(t("telemetry.export.description"))
    .option("--out <path>", t("telemetry.export.out"), "telemetry.jsonl")
    .option("--period <p>", t("telemetry.export.period"), "7d")
    .action(async (opts, cmd) => {
      const res = await apiFetch(`/api/telemetry/summary?format=jsonl&period=${opts.period}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      const items = data.events ?? data.items ?? [];
      const lines = items.map((e) => JSON.stringify(e)).join("\n");
      writeFileSync(opts.out, lines);
      process.stdout.write(`Exported ${items.length} events to ${opts.out}\n`);
    });
}
