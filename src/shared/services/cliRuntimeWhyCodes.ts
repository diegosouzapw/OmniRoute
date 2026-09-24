// WhyCodes runtime-detection metadata extracted from cliRuntime.ts to keep that
// frozen file under its file-size ratchet cap (config/quality/file-size-baseline.json).
// Untyped on purpose, like cliRuntimeGrokBuild.ts (matches CLI_TOOLS' `Record<string, any>`).

/**
 * WhyCodes: honour WHYCODES_HOME (or the platform project config dir) instead of a
 * $HOME-relative join. The relative path is documentation only.
 */
export const WHYCODES_RUNTIME_ENTRY = {
  defaultCommand: "whycodes",
  envBinKey: "CLI_WHYCODES_BIN",
  requiresBinary: true,
  healthcheckTimeoutMs: 8000,
  paths: {
    config: "config.toml",
  },
};
