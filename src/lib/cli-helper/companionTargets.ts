import "server-only";
import { CLI_TARGET_MANIFEST } from "../../../bin/cli/cli-manifest.mjs";
import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { projectCompanionTargets } from "@/shared/utils/cliCompanion";

/** Keep Node-backed executable manifests behind the server component boundary. */
export function getCompanionTargets() {
  return projectCompanionTargets(CLI_TARGET_MANIFEST, CLI_TOOLS);
}
