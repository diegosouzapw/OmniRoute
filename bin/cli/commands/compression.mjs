import { readFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

// #2688 — CLI no longer assumes MCP is enabled. Engine names are normalized
// to the current core set; legacy aliases continue to work.
const VALID_ENGINES = ["off", "caveman", "rtk", "stacked"];
const ENGINE_ALIASES = { none: "off", hybrid: "stacked" };

function normalizeEngine(name) {
  return ENGINE_ALIASES[name] ?? name;
}

// Direct REST fallbacks used when the MCP tool surface is not mounted (404).
// Keeps every subcommand working on minimal builds.
async function restCompressionStatus() {
  const [settingsRes, combosRes, analyticsRes] = await Promise.all([
    apiFetch("/api/settings/compression"),
    apiFetch("/api/context/combos"),
    apiFetch("/api/context/analytics?period=7d").catch(() => null),
  ]);
  const settings = settingsRes.ok ? await settingsRes.json() : {};
  const combosBody = combosRes.ok ? await combosRes.json() : { combos: [] };
  const analytics = analyticsRes && analyticsRes.ok ? await analyticsRes.json() : null;
  return {
    engine: settings.engine ?? null,
    settings,
    combos: combosBody.combos ?? combosBody,
    analytics,
  };
}

async function restCompressionConfigure(config) {
  const body = { ...config };
  if (body.engine) body.engine = normalizeEngine(body.engine);
  const res = await apiFetch("/api/settings/compression", { method: "PUT", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  return res.json();
}

async function restSetEngine(name) {
  const res = await apiFetch("/api/settings/compression", {
    method: "PUT",
    body: { engine: normalizeEngine(name) },
  });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  return res.json();
}

async function restListCombos() {
  const res = await apiFetch("/api/context/combos");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const body = await res.json();
  return body.combos ?? body;
}

async function restComboStats(period) {
  const res = await apiFetch(`/api/context/analytics?period=${encodeURIComponent(period ?? "7d")}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  return res.json();
}

async function mcpCall(name, args, restFallback) {
  const res = await apiFetch("/api/mcp/tools/call", {
    method: "POST",
    body: { name, arguments: args },
  });
  if (res.ok) return res.json();
  // 404 = MCP tool surface not mounted on this build; 501 = not implemented.
  // Anything else is a genuine error and we surface it.
  if ((res.status === 404 || res.status === 501) && typeof restFallback === "function") {
    return restFallback();
  }
  process.stderr.write(`Error: ${res.status}\n`);
  process.exit(1);
}

async function confirm(q) {
  return new Promise((resolve) => {
    process.stdout.write(`${q} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (c) => resolve(c.toString().trim().toLowerCase().startsWith("y")));
  });
}

export async function runCompressionStatus(opts, cmd) {
  const data = await mcpCall("omniroute_compression_status", {}, restCompressionStatus);
  emit(data, cmd.optsWithGlobals());
}

export async function runCompressionConfigure(opts, cmd) {
  const config = {};
  if (opts.engine) config.engine = opts.engine;
  if (opts.cavemanAggressiveness !== undefined)
    config.caveman = { aggressiveness: opts.cavemanAggressiveness };
  if (opts.rtkBudget !== undefined) config.rtk = { tokenBudget: opts.rtkBudget };
  if (opts.languagePack) config.languagePack = opts.languagePack;
  const data = await mcpCall("omniroute_compression_configure", config, () =>
    restCompressionConfigure(config)
  );
  emit(data, cmd.optsWithGlobals());
}

export async function runCompressionEngineSet(name, opts, cmd) {
  const normalized = normalizeEngine(name);
  if (!VALID_ENGINES.includes(normalized)) {
    process.stderr.write(`Unknown engine: ${name}. Valid: ${VALID_ENGINES.join(", ")}\n`);
    process.exit(2);
  }
  await mcpCall("omniroute_set_compression_engine", { engine: normalized }, () =>
    restSetEngine(normalized)
  );
  process.stdout.write(`Engine: ${normalized}\n`);
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
    const data = await mcpCall("omniroute_compression_status", {}, restCompressionStatus);
    process.stdout.write(`${data.engine ?? "(default)"}\n`);
  });

  const combos = cmp.command("combos").description(t("compression.combos.description"));
  combos.command("list").action(async (opts, cmd) => {
    const data = await mcpCall("omniroute_list_compression_combos", {}, async () => ({
      combos: await restListCombos(),
    }));
    emit(data.combos ?? data, cmd.optsWithGlobals());
  });
  combos
    .command("stats")
    .option("--period <p>", null, "7d")
    .action(async (opts, cmd) => {
      const data = await mcpCall(
        "omniroute_compression_combo_stats",
        { period: opts.period ?? "7d" },
        () => restComboStats(opts.period)
      );
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
