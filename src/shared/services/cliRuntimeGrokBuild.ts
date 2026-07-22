// Runtime-detection metadata entries extracted from cliRuntime.ts to keep that
// frozen file under its file-size ratchet cap (config/quality/file-size-baseline.json).
// Deliberately untyped (matches cliRuntime.ts's own `Record<string, any>` CLI_TOOLS
// shape) and has NO import of the CliCatalogEntry schema — keep it that way, so this
// module never drags src/shared/schemas/cliCatalog.ts into the typecheck-core
// transitive graph (that file is not on typecheck:core's curated allowlist).

/** Grok Build runtime-detection metadata (binary lookup + healthcheck). */
export const GROK_BUILD_RUNTIME_ENTRY = {
  defaultCommand: "grok",
  envBinKey: "CLI_GROK_BUILD_BIN",
  requiresBinary: true,
  healthcheckTimeoutMs: 8000,
  paths: {
    config: ".grok/config.toml",
  },
};

/** Amp runtime-detection metadata (extracted alongside grok-build for file-size headroom). */
export const AMP_RUNTIME_ENTRY = {
  defaultCommand: "amp",
  envBinKey: "CLI_AMP_BIN",
  requiresBinary: true,
  healthcheckTimeoutMs: 12000,
  paths: {},
};
