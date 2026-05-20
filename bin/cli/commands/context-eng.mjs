import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

async function confirm(q) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${q} [y/N] `, (a) => {
      rl.close();
      resolve(a.trim().toLowerCase() === "y");
    });
  });
}

export function registerContextEng(program) {
  const ctx = program.command("context-eng").alias("ctx").description(t("context.description"));

  ctx
    .command("analytics")
    .option("--period <p>", t("context.analytics.period"), "7d")
    .action(async (opts, cmd) => {
      const res = await apiFetch(`/api/context/analytics?period=${opts.period}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  const caveman = ctx.command("caveman").description(t("context.caveman.description"));
  const cmCfg = caveman.command("config").description(t("context.caveman.config.description"));

  cmCfg.command("show").action(async (opts, cmd) => {
    const res = await apiFetch("/api/context/caveman/config");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  cmCfg
    .command("set")
    .option("--aggressiveness <n>", t("context.caveman.config.aggressiveness"), parseFloat)
    .option("--max-shrink-pct <n>", t("context.caveman.config.maxShrinkPct"), parseInt)
    .option("--preserve-tags <list>", t("context.caveman.config.preserveTags"), (v) => v.split(","))
    .action(async (opts, cmd) => {
      const body = {};
      if (opts.aggressiveness !== undefined) body.aggressiveness = opts.aggressiveness;
      if (opts.maxShrinkPct !== undefined) body.maxShrinkPct = opts.maxShrinkPct;
      if (opts.preserveTags) body.preserveTags = opts.preserveTags;
      const res = await apiFetch("/api/context/caveman/config", { method: "PUT", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  const rtk = ctx.command("rtk").description(t("context.rtk.description"));
  const rtkCfg = rtk.command("config").description(t("context.rtk.config.description"));

  rtkCfg.command("show").action(async (opts, cmd) => {
    const res = await apiFetch("/api/context/rtk/config");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  rtkCfg
    .command("set")
    .option("--token-budget <n>", t("context.rtk.config.tokenBudget"), parseInt)
    .option("--reserve-pct <n>", t("context.rtk.config.reservePct"), parseInt)
    .action(async (opts, cmd) => {
      const body = {};
      if (opts.tokenBudget) body.tokenBudget = opts.tokenBudget;
      if (opts.reservePct) body.reservePct = opts.reservePct;
      const res = await apiFetch("/api/context/rtk/config", { method: "PUT", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  const filters = rtk.command("filters").description(t("context.rtk.filters.description"));

  filters.command("list").action(async (opts, cmd) => {
    const res = await apiFetch("/api/context/rtk/filters");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  filters
    .command("add")
    .requiredOption("--pattern <p>", t("context.rtk.filters.pattern"))
    .option("--priority <n>", t("context.rtk.filters.priority"), parseInt, 100)
    .option("--action <a>", t("context.rtk.filters.action"), "drop")
    .action(async (opts, cmd) => {
      const body = { pattern: opts.pattern, priority: opts.priority, action: opts.action };
      const res = await apiFetch("/api/context/rtk/filters", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  filters
    .command("remove <id>")
    .option("--yes", t("context.rtk.filters.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Remove filter ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/context/rtk/filters/${id}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Removed\n");
    });

  rtk
    .command("test")
    .requiredOption("--file <path>", t("context.rtk.test.file"))
    .action(async (opts, cmd) => {
      const body = JSON.parse(readFileSync(opts.file, "utf8"));
      const res = await apiFetch("/api/context/rtk/test", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  rtk.command("raw-output <id>").action(async (id, opts, cmd) => {
    const res = await apiFetch(`/api/context/rtk/raw-output/${id}`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  const combos = ctx.command("combos").description(t("context.combos.description"));

  combos.command("list").action(async (opts, cmd) => {
    const res = await apiFetch("/api/context/combos");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  combos.command("get <id>").action(async (id, opts, cmd) => {
    const res = await apiFetch(`/api/context/combos/${id}`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });

  combos.command("assignments <id>").action(async (id, opts, cmd) => {
    const res = await apiFetch(`/api/context/combos/${id}/assignments`);
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });
}
