// WhyCodes runtime-detection metadata extracted from cliRuntime.ts to keep that
// frozen file under its file-size ratchet cap (config/quality/file-size-baseline.json).
// Untyped on purpose, like cliRuntimeGrokBuild.ts (matches CLI_TOOLS' `Record<string, any>`).

import { getWhyCodesConfigPath } from "@/lib/cli-helper/config-generator/whycodesHome";

/**
 * WhyCodes: honour WHYCODES_HOME / ~/.whycodes instead of a $HOME-relative join.
 * `paths.config` is a getter so the env is read per call (tests set/unset it), and
 * getCliConfigPaths() passes the absolute path through unchanged (#14096).
 */
export const WHYCODES_RUNTIME_ENTRY = {
  defaultCommand: "whycodes",
  envBinKey: "CLI_WHYCODES_BIN",
  requiresBinary: true,
  healthcheckTimeoutMs: 8000,
  paths: {
    get config() {
      return getWhyCodesConfigPath();
    },
  },
};
