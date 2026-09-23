import { Command } from "commander";
import { registerModels } from "../../../bin/cli/commands/models.mjs";
import { registerModelValidation } from "../../../bin/cli/commands/model-validation.mjs";

const program = new Command();
program.option("--api-key <key>").option("--base-url <url>").option("--output <format>");
registerModels(program);
registerModelValidation(program);
await program.parseAsync(process.argv);
