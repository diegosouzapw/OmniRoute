import { runDoctorCommand } from "./commands/doctor.mjs";
import { runProvidersCommand } from "./commands/providers.mjs";
import { runSetupCommand } from "./commands/setup.mjs";

export async function runCliCommand(command, argv, context = {}) {
  if (command === "doctor") {
    return runDoctorCommand(argv, context);
  }

  if (command === "providers") {
    return runProvidersCommand(argv, context);
  }

  if (command === "setup") {
    return runSetupCommand(argv, context);
  }

  throw new Error(`Unknown CLI command: ${command}`);
}
