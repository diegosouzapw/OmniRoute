import { Option } from "commander";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { printHeading } from "../io.mjs";
import { withRuntime } from "../runtime.mjs";
import { t } from "../i18n.mjs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";

const CLI_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

const VALID_STRATEGIES = [
  "priority",
  "weighted",
  "round-robin",
  "p2c",
  "random",
  "auto",
  "lkgp",
  "context-optimized",
  "context-relay",
  "fill-first",
  "cost-optimized",
  "least-used",
  "strict-random",
  "reset-aware",
];

const suggestSchema = [
  { key: "rank", header: "#" },
  { key: "name", header: "Combo", width: 24 },
  { key: "strategy", header: "Strategy", width: 16 },
  { key: "score", header: "Score", formatter: (v) => (v != null ? v.toFixed(3) : "-") },
  { key: "latencyP50Ms", header: "Latency P50", formatter: (v) => (v != null ? `${v}ms` : "-") },
  { key: "costPer1k", header: "Cost/1k", formatter: (v) => (v != null ? `$${v.toFixed(5)}` : "-") },
  {
    key: "rationale",
    header: "Rationale",
    width: 40,
    formatter: (v) => {
      if (!v) return "-";
      const s = String(v);
      return s.length > 40 ? s.slice(0, 39) + "…" : s;
    },
  },
];

export function extendComboSuggest(combo) {
  combo
    .command("suggest")
    .description(t("combo.suggest.description"))
    .requiredOption("--task <description>", t("combo.suggest.task"))
    .option("--max-cost <usd>", t("combo.suggest.maxCost"), parseFloat)
    .option("--max-latency-ms <ms>", t("combo.suggest.maxLatencyMs"), parseInt)
    .option("--weights <json>", t("combo.suggest.weights"))
    .option("--top <n>", t("combo.suggest.top"), parseInt, 5)
    .option("--explain", t("combo.suggest.explain"))
    .option("--switch", t("combo.suggest.switch"))
    .action(async (opts, cmd) => {
      const body = {
        task: opts.task,
        constraints: {
          maxCostUsd: opts.maxCost,
          maxLatencyMs: opts.maxLatencyMs,
        },
        weights: opts.weights ? JSON.parse(opts.weights) : undefined,
        top: opts.top,
      };
      const res = await apiFetch("/api/mcp/tools/call", {
        method: "POST",
        body: { name: "omniroute_best_combo_for_task", arguments: body },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      const candidates = data.candidates ?? data;
      const rows = (Array.isArray(candidates) ? candidates : []).map((c, i) => ({
        rank: i + 1,
        ...c,
      }));
      emit(rows, cmd.optsWithGlobals(), suggestSchema);
      if (opts.explain && !cmd.optsWithGlobals().quiet) {
        process.stderr.write(`\nRationale:\n${data.rationale ?? "(no rationale)"}\n`);
      }
      if (opts.switch && rows[0]) {
        const best = rows[0].name;
        const switchRes = await apiFetch("/api/combos/switch", {
          method: "POST",
          body: { name: best },
        });
        if (!switchRes.ok) {
          process.stderr.write(`Switch failed: ${switchRes.status}\n`);
          process.exit(1);
        }
        process.stderr.write(`\nSwitched to: ${best}\n`);
      }
    });
}

export function registerCombo(program) {
  const combo = program.command("combo").description(t("combo.title"));

  combo
    .command("list")
    .description("List configured routing combos")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboListCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  combo
    .command("switch <name>")
    .description("Activate a routing combo")
    .action(async (name, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboSwitchCommand(name, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  combo
    .command("create <name>")
    .description("Create a new routing combo")
    .addOption(
      new Option("--strategy <strategy>", "Routing strategy")
        .choices(VALID_STRATEGIES)
        .default("priority")
    )
    .action(async (name, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboCreateCommand(name, opts.strategy, {
        ...opts,
        output: globalOpts.output,
      });
      if (exitCode !== 0) process.exit(exitCode);
    });

  combo
    .command("delete <name>")
    .description("Delete a routing combo")
    .option("--yes", "Skip confirmation")
    .action(async (name, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboDeleteCommand(name, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  combo
    .command("health [name]")
    .description("Explain live routing state for a combo (pins, cooldown, warm, scores)")
    .option("--range <range>", "Time range for events/telemetry: 1h|24h|7d|30d", "24h")
    .option("--json", "Output as JSON")
    .action(async (name, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runComboHealthCommand(name, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  extendComboSuggest(combo);
}

const STATE_STYLES = {
  pinned: { icon: "●", color: "\x1b[32m" },
  warm: { icon: "●", color: "\x1b[36m" },
  cooldown: { icon: "●", color: "\x1b[33m" },
  idle: { icon: "○", color: "\x1b[2m" },
};

function bareModel(model) {
  if (!model) return "-";
  const slash = model.lastIndexOf("/");
  return slash >= 0 ? model.slice(slash + 1) : model;
}

function fmtPct(value) {
  if (value == null || !Number.isFinite(value)) return "-";
  return `${(value * 100).toFixed(0)}%`;
}

function fmtMs(value) {
  if (value == null || !Number.isFinite(value) || value <= 0) return "-";
  return `${Math.round(value)}ms`;
}

function fmtTime(ts) {
  if (!ts) return "-";
  const normalized = String(ts).replace("T", " ");
  return normalized.length >= 19 ? normalized.slice(11, 19) : normalized;
}

function renderComboHealth(combo) {
  const dim = (text) => `\x1b[2m${text}\x1b[0m`;
  const { overview, selection, targets, events, pinEffectiveness } = combo;

  console.log(
    `\n  \x1b[1m${combo.comboName}\x1b[0m  ${dim(`strategy: ${combo.strategy} · enabled: ${combo.enabled ? "yes" : "no"}`)}`
  );
  console.log(
    `  ${dim("requests:")} ${overview.totalRequests}  ${dim("success:")} ${fmtPct(
      overview.successRate
    )}  ${dim("avg:")} ${fmtMs(overview.avgLatencyMs)}  ${dim("sessions:")} ${
      overview.activeSessions
    }`
  );

  const methodLabel =
    selection.method === "pinned"
      ? `\x1b[32m● pinned → ${bareModel(selection.pinnedModel)}\x1b[0m`
      : `\x1b[2m○ priority${selection.nextFallback ? ` → ${bareModel(selection.nextFallback)}` : ""}\x1b[0m`;
  console.log(`\n  ${dim("selection:")} ${methodLabel}`);
  for (const note of selection.notes) {
    console.log(`    ${dim("•")} ${note}`);
  }

  if (pinEffectiveness) {
    const lifetime =
      pinEffectiveness.avgLifetimeMs != null && Number.isFinite(pinEffectiveness.avgLifetimeMs)
        ? `${Math.round(pinEffectiveness.avgLifetimeMs / 60000)}m`
        : "-";
    const invalidBadge =
      pinEffectiveness.invalidCount > 0 ? " \x1b[33m(invalidated some)\x1b[0m" : "";
    console.log(
      `\n  ${dim("pin effectiveness:")} kept ${pinEffectiveness.keptCount} · invalid ${
        pinEffectiveness.invalidCount
      } · repinned ${pinEffectiveness.repinnedCount} · avg lifetime ${lifetime}${invalidBadge}`
    );
    if (pinEffectiveness.invalidCount > 0 && pinEffectiveness.lastInvalidReason) {
      console.log(
        `    ${dim(`last invalid (${fmtTime(pinEffectiveness.lastInvalidAt)}): ${pinEffectiveness.lastInvalidReason}`)}`
      );
    }
  }

  console.log("\n  Targets:");
  console.log(
    `    ${"#".padEnd(3)} ${"Model".padEnd(22)} ${"State".padEnd(9)} ${"Pins".padEnd(4)} ${"Req".padEnd(4)} ${"Success".padEnd(8)} ${"Avg".padEnd(8)} ${"Learned".padEnd(7)} Notes`
  );
  for (const target of targets) {
    const style = STATE_STYLES[target.state] ?? STATE_STYLES.idle;
    const cap = target.capability;
    const notes = [];
    if (target.stateReason) notes.push(target.stateReason);
    if (cap) {
      if (!cap.toolCalling) notes.push("tools:no");
      if (cap.supportsVision) notes.push("vision");
      if (cap.contextLength) notes.push(`ctx:${Math.round(cap.contextLength / 1024)}k`);
    }
    const learned =
      target.learnedScore != null && Number.isFinite(target.learnedScore)
        ? target.learnedScore.toFixed(2)
        : "-";
    console.log(
      `    ${style.color}${style.icon}\x1b[0m ${String(target.order).padEnd(2)} ${bareModel(
        target.model
      ).padEnd(22)} ${target.state.padEnd(9)} ${String(target.pinnedSessions).padEnd(4)} ${String(
        target.requests || "-"
      ).padEnd(
        4
      )} ${fmtPct(target.successRate).padEnd(8)} ${fmtMs(target.avgLatencyMs).padEnd(8)} ${learned.padEnd(
        7
      )} ${dim(notes.join(" · "))}`
    );
  }

  if (events.length > 0) {
    console.log(`\n  Recent events:`);
    for (const event of events) {
      const statusColor = event.ok ? "\x1b[32m" : "\x1b[31m";
      const duration = event.durationMs > 0 ? ` ${dim(`(${event.durationMs}ms)`)}` : "";
      const error = event.error ? `  ${dim(event.error)}` : "";
      console.log(
        `    ${dim(fmtTime(event.time))}  ${bareModel(event.model).padEnd(22)} ${statusColor}${event.status}\x1b[0m${duration}${error}`
      );
    }
  }
}

export async function runComboHealthCommand(name, opts = {}) {
  const range = ["1h", "24h", "7d", "30d"].includes(opts.range) ? opts.range : "24h";

  try {
    return await withRuntime(async ({ kind, api }) => {
      let response;

      if (kind === "http") {
        const query = new URLSearchParams({ range });
        if (name) query.set("comboName", name);
        const res = await api(`/api/usage/combo-state?${query}`, {
          retry: false,
          timeout: 15000,
          acceptNotOk: true,
        });
        if (res.status === 404) {
          console.error(`Combo '${name}' not found.`);
          return 1;
        }
        if (!res.ok) {
          console.error(`Failed to fetch combo state (HTTP ${res.status}).`);
          return 1;
        }
        response = await res.json();
      } else {
        const { buildComboStateResponse } = await import(`${CLI_ROOT}/src/lib/usage/comboState.ts`);
        response = await buildComboStateResponse({
          range,
          ...(name ? { comboName: name } : {}),
        });
      }

      if (response.combos.length === 0) {
        if (name) {
          console.error(`Combo '${name}' not found.`);
        } else {
          console.error("No combos configured.");
        }
        return 1;
      }

      if (opts.json || opts.output === "json") {
        console.log(JSON.stringify(response, null, 2));
        return 0;
      }

      printHeading(`Combo health (${range})`);
      for (const combo of response.combos) renderComboHealth(combo);
      if (!response.ollamaReachable) {
        console.log(
          `\n  \x1b[33m⚠\x1b[0m ${"ollama not reachable — warm/loaded state unavailable"}`
        );
      }
      return 0;
    });
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runComboListCommand(opts = {}) {
  try {
    return await withRuntime(async ({ kind, api, db }) => {
      let combos = [];
      let activeCombo = null;

      if (kind === "http") {
        const [listRes, activeRes] = await Promise.all([
          api("/api/combos", { retry: false, timeout: 5000, acceptNotOk: true }),
          api("/api/settings", { retry: false, timeout: 3000, acceptNotOk: true }),
        ]);
        if (listRes.ok) {
          const data = await listRes.json();
          combos = Array.isArray(data) ? data : (data.combos ?? []);
        }
        if (activeRes.ok) {
          const settings = await activeRes.json();
          activeCombo = settings?.activeCombo ?? null;
        }
      } else {
        combos = await db.combos.getCombos();
      }

      if (opts.json || opts.output === "json") {
        console.log(JSON.stringify({ combos, active: activeCombo }, null, 2));
        return 0;
      }

      printHeading(t("combo.title"));
      if (combos.length === 0) {
        console.log(t("combo.noCombos"));
        return 0;
      }

      for (const combo of combos) {
        const comboName = combo.name ?? combo.id ?? "?";
        const isActive = activeCombo && (comboName === activeCombo || combo.id === activeCombo);
        const icon = isActive ? "\x1b[32m●\x1b[0m" : "\x1b[2m○\x1b[0m";
        const enabled = combo.enabled !== false;
        const status = enabled ? "\x1b[32menabled\x1b[0m" : "\x1b[31mdisabled\x1b[0m";
        const strategy = (combo.strategy ?? "priority").padEnd(12);
        console.log(`  ${icon} ${comboName.padEnd(25)} [${strategy}] ${status}`);
      }

      return 0;
    });
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runComboSwitchCommand(name, opts = {}) {
  if (!name) {
    console.error("Combo name is required.");
    return 1;
  }

  try {
    return await withRuntime(async ({ kind, api, db }) => {
      if (kind === "http") {
        const listRes = await api("/api/combos", {
          retry: false,
          timeout: 5000,
          acceptNotOk: true,
        });
        if (!listRes.ok) {
          console.error(`Failed to fetch combo list (HTTP ${listRes.status}).`);
          return 1;
        }
        const data = await listRes.json();
        const combos = Array.isArray(data) ? data : (data.combos ?? []);
        const found = combos.find((c) => c.name === name || c.id === name);
        if (!found) {
          console.error(`Combo '${name}' not found.`);
          return 1;
        }
        const patchRes = await api("/api/settings", {
          method: "PATCH",
          body: { activeCombo: name },
          retry: false,
          acceptNotOk: true,
        });
        if (!patchRes.ok) {
          console.error(`Failed to switch combo (HTTP ${patchRes.status}).`);
          return 1;
        }
      } else {
        const combo = await db.combos.getComboByName(name);
        if (!combo) {
          console.error(`Combo '${name}' not found.`);
          return 1;
        }
        db.combos.setActiveCombo(name);
      }

      console.log(t("combo.switched", { name }));
      return 0;
    });
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runComboCreateCommand(name, strategy = "priority", opts = {}) {
  if (!name) {
    console.error("Combo name is required.");
    return 1;
  }

  if (!VALID_STRATEGIES.includes(strategy)) {
    console.error(`Invalid strategy '${strategy}'. Valid: ${VALID_STRATEGIES.join(", ")}`);
    return 1;
  }

  try {
    return await withRuntime(async ({ kind, api, db }) => {
      if (kind === "http") {
        const res = await api("/api/combos", {
          method: "POST",
          body: { name, strategy, enabled: true, models: [], config: {} },
          retry: false,
          acceptNotOk: true,
        });
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          const msg = body ? ` — ${body}` : "";
          console.error(`Failed to create combo (HTTP ${res.status})${msg}`);
          return 1;
        }
      } else {
        const existing = await db.combos.getComboByName(name);
        if (existing) {
          console.error(`Combo '${name}' already exists. Delete it first.`);
          return 1;
        }
        await db.combos.createCombo({ name, strategy, enabled: true, models: [], config: {} });
      }

      console.log(t("combo.created", { name }));
      return 0;
    });
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runComboDeleteCommand(name, opts = {}) {
  if (!name) {
    console.error("Combo name is required.");
    return 1;
  }

  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(t("combo.confirmDelete", { name }) + " [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  try {
    return await withRuntime(async ({ kind, api, db }) => {
      if (kind === "http") {
        const listRes = await api("/api/combos", {
          retry: false,
          timeout: 5000,
          acceptNotOk: true,
        });
        if (!listRes.ok) {
          console.error(`Failed to fetch combo list (HTTP ${listRes.status}).`);
          return 1;
        }
        const data = await listRes.json();
        const combos = Array.isArray(data) ? data : (data.combos ?? []);
        const found = combos.find((c) => c.name === name || c.id === name);
        if (!found) {
          console.error(`Combo '${name}' not found.`);
          return 1;
        }
        const delRes = await api(`/api/combos/${encodeURIComponent(found.id)}`, {
          method: "DELETE",
          retry: false,
          acceptNotOk: true,
        });
        if (!delRes.ok) {
          console.error(`Failed to delete combo (HTTP ${delRes.status}).`);
          return 1;
        }
      } else {
        const deleted = await db.combos.deleteComboByName(name);
        if (!deleted) {
          console.error(`Combo '${name}' not found.`);
          return 1;
        }
      }

      console.log(t("combo.deleted", { name }));
      return 0;
    });
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
