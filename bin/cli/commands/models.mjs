import { emit } from "../output.mjs";
import { modelListSchema } from "../schemas/output-schemas.mjs";
import { t } from "../i18n.mjs";
import { loadModelCatalog } from "./model-api.mjs";
import { manualListAction, modelMutationAction } from "./model-crud.mjs";

export function registerModels(program) {
  const models = program
    .command("models [provider]")
    .description(t("models.description"))
    .option("--search <query>", t("models.search"))
    .option("--json", "Output as JSON")
    .action(async (provider, opts, cmd) => {
      process.exitCode = await runModelsCommand(provider, { ...cmd.optsWithGlobals(), ...opts });
    });
  models
    .command("manual <provider>")
    .description("List manual model metadata from the selected server")
    .action(manualListAction);
  models
    .command("add <provider> <model-id>")
    .description("Add an unverified manual model, then verify persistence")
    .option("--name <name>", "Display name")
    .option("--api-format <format>", "API format, e.g. chat-completions or responses")
    .option("--context-window <tokens>", "Positive integer input/context limit")
    .option("--max-output-tokens <tokens>", "Positive integer output limit")
    .option("--dry-run", "Preview without writing or inference")
    .action(modelMutationAction("add"));
  models
    .command("edit <provider> <model-id>")
    .description("Edit manual model metadata, then verify persistence")
    .option("--name <name>", "Display name")
    .option("--api-format <format>", "API format, e.g. chat-completions or responses")
    .option("--context-window <tokens>", "Positive integer context override")
    .option("--clear-context-window", "Clear the manual context-window override")
    .option("--dry-run", "Preview without writing or inference")
    .action(modelMutationAction("edit"));
  models
    .command("remove <provider> <model-id>")
    .description("Remove only a manual model override, then verify persistence")
    .option("--yes", "Confirm removal of the manual override only")
    .option("--dry-run", "Preview without writing or inference")
    .action(modelMutationAction("remove"));
}

export async function runModelsCommand(provider, opts = {}) {
  try {
    let models = await loadModelCatalog(opts);
    if (provider) {
      const filter = provider.toLowerCase();
      models = models.filter(
        (model) =>
          model.provider.toLowerCase().includes(filter) || model.id.toLowerCase().startsWith(filter)
      );
    }
    if (opts.search) {
      const search = opts.search.toLowerCase();
      models = models.filter((model) =>
        [model.id, model.name, model.provider, model.description].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(search)
        )
      );
    }
    const table = opts.output === "table" || (!opts.output && !opts.json && process.stdout.isTTY);
    emit(table ? models.slice(0, 50) : models, opts, modelListSchema);
    if (table && models.length > 50)
      console.log(`... and ${models.length - 50} more. Use --output json for the full list.`);
    return 0;
  } catch (error) {
    console.error(error.exitCode ? error.message : "Unable to read the model catalog.");
    return error.exitCode || 1;
  }
}
