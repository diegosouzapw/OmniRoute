import { readFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const VALID_ENGINES = ["caveman", "rtk", "hybrid", "none"];

async function mcpCall(name, args) {
  const res = await apiFetch("/api/mcp/tools/call", {
    method: "POST",
    body: { name, arguments: args },
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  return res.json();
}

async function confirm(q) {
  return new Promise((resolve) => {
    process.stdout.write(`${q} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (c) => resolve(c.toString().trim().toLowerCase().startsWith("y")));
  });
}

export async function runCompressionStatus(opts, cmd) {
  const data = await mcpCall("omniroute_compression_status", {});
  emit(data, cmd.optsWithGlobals());
}

export async function runCompressionConfigure(opts, cmd) {
  const config = {};
  if (opts.engine) config.engine = opts.engine;
  if (opts.cavemanAggressiveness !== undefined)
    config.caveman = { aggressiveness: opts.cavemanAggressiveness };
  if (opts.rtkBudget !== undefined) config.rtk = { tokenBudget: opts.rtkBudget };
  if (opts.languagePack) config.languagePack = opts.languagePack;
  const data = await mcpCall("omniroute_compression_configure", config);
  emit(data, cmd.optsWithGlobals());
}

export async function runCompressionEngineSet(name, opts, cmd) {
  if (!VALID_ENGINES.includes(name)) {
    process.stderr.write(`Unknown engine: ${name}. Valid: ${VALID_ENGINES.join(", ")}\n`);
    process.exit(2);
  }
  await mcpCall("omniroute_set_compression_engine", { engine: name });
  process.stdout.write(`Engine: ${name}\n`);
}

export async function runCompressionPreview(opts, cmd) {
  const body = JSON.parse(readFileSync(opts.file, "utf8"));
  const res = await apiFetch("/api/compression/preview", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data, cmd.optsWithGlobals());
  if (cmd.optsWithGlobals().output !== "json") {
    process.stderr.write(
      `\nOriginal: ${data.beforeTokens ?? "?"} tok → After: ${data.afterTokens ?? "?"} tok (${data.savingsPct ?? "?"}%)\n`
    );
  }
}

export function registerCompression(program) {
  const cmp = program.command("compression").description(t("compression.description"));

  cmp
    .command("status")
    .description(t("compression.status.description"))
    .action(runCompressionStatus);

  cmp
    .command("configure")
    .description(t("compression.configure.description"))
    .option("--engine <e>", t("compression.configure.engine"))
    .option("--caveman-aggressiveness <n>", t("compression.configure.caveman_agg"), parseFloat)
    .option("--rtk-budget <n>", t("compression.configure.rtk_budget"), parseInt)
    .option("--language-pack <p>", t("compression.configure.language_pack"))
    .action(runCompressionConfigure);

  const engine = cmp.command("engine").description(t("compression.engine.description"));
  engine.command("set <name>").action(runCompressionEngineSet);
  engine.command("get").action(async (opts, cmd) => {
    const data = await mcpCall("omniroute_compression_status", {});
    process.stdout.write(`${data.engine ?? "(default)"}\n`);
  });

  const combos = cmp.command("combos").description(t("compression.combos.description"));
  combos.command("list").action(async (opts, cmd) => {
    const data = await mcpCall("omniroute_list_compression_combos", {});
    emit(data.combos ?? data, cmd.optsWithGlobals());
  });
  combos
    .command("stats")
    .option("--period <p>", null, "7d")
    .action(async (opts, cmd) => {
      const data = await mcpCall("omniroute_compression_combo_stats", {
        period: opts.period ?? "7d",
      });
      emit(data, cmd.optsWithGlobals());
    });

  const rules = cmp.command("rules").description(t("compression.rules.description"));
  rules.command("list").action(async (opts, cmd) => {
    const res = await apiFetch("/api/compression/rules");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });
  rules
    .command("add")
    .requiredOption("--pattern <p>", t("compression.rules.add.pattern"))
    .requiredOption("--action <a>", t("compression.rules.add.action"))
    .option("--replacement <r>")
    .action(async (opts, cmd) => {
      const body = { pattern: opts.pattern, action: opts.action };
      if (opts.replacement) body.replacement = opts.replacement;
      const res = await apiFetch("/api/compression/rules", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });
  rules
    .command("remove <id>")
    .option("--yes")
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Remove rule ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/compression/rules?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Removed\n");
    });

  cmp
    .command("language-packs")
    .description(t("compression.language_packs.description"))
    .action(async (opts, cmd) => {
      const res = await apiFetch("/api/compression/language-packs");
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  cmp
    .command("preview")
    .description(t("compression.preview.description"))
    .requiredOption("--file <path>", t("compression.preview.file"))
    .action(runCompressionPreview);
}
