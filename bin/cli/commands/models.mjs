import { apiFetch, isServerUp } from "../api.mjs";
import { emit } from "../output.mjs";
import { modelListSchema } from "../schemas/output-schemas.mjs";
import { t } from "../i18n.mjs";

export function registerModels(program) {
  program
    .command("models [provider]")
    .description(t("models.description"))
    .option("--search <query>", t("models.search"))
    .option("--json", "Output as JSON")
    .action(async (provider, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runModelsCommand(provider, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runModelsCommand(provider, opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("models.noServer"));
    return 1;
  }

  let models = [];

  try {
    const res = await apiFetch("/api/models", { retry: false, timeout: 5000, acceptNotOk: true });
    if (res.ok) {
      const data = await res.json();
      models = Array.isArray(data) ? data : data.models || [];
    }
  } catch {}

  if (models.length === 0) {
    try {
      const res = await apiFetch("/api/v1/models", {
        retry: false,
        timeout: 5000,
        acceptNotOk: true,
      });
      if (res.ok) {
        const data = await res.json();
        models = Array.isArray(data) ? data : data.data || [];
      }
    } catch {}
  }

  if (provider) {
    const filter = provider.toLowerCase();
    models = models.filter(
      (m) =>
        (m.provider && m.provider.toLowerCase().includes(filter)) ||
        (m.id && m.id.toLowerCase().startsWith(filter)) ||
        (m.name && m.name.toLowerCase().includes(filter))
    );
  }

  if (opts.search) {
    const search = opts.search.toLowerCase();
    models = models.filter(
      (m) =>
        (m.id && m.id.toLowerCase().includes(search)) ||
        (m.name && m.name.toLowerCase().includes(search)) ||
        (m.provider && m.provider.toLowerCase().includes(search)) ||
        (m.description && m.description.toLowerCase().includes(search))
    );
  }

  if (models.length === 0) {
    console.log(t("models.noModels"));
    return 0;
  }

  const normalized = models.map((m) => ({
    id: m.id || m.name || "unknown",
    provider: m.provider || "unknown",
    contextWindow: String(m.context_length || m.max_tokens || m.contextWindow || "-"),
  }));

  const display = normalized.slice(0, 50);
  emit(display, opts, modelListSchema);

  if (models.length > 50) {
    console.log(
      `\x1b[2m  ... and ${models.length - 50} more. Use --output json for full list.\x1b[0m`
    );
  }

  return 0;
}
