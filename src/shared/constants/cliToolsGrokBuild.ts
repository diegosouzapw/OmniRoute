// Grok Build CLI tool registry entry — extracted from cliTools.ts to keep the
// frozen registry file under its file-size ratchet cap (config/quality/file-size-baseline.json).
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";

/** xAI Grok Build TUI coding agent — custom provider via ~/.grok/config.toml */
export const GROK_BUILD_CLI_TOOL: CliCatalogEntry = {
  id: "grok-build",
  name: "Grok Build",
  icon: "terminal",
  color: "#1DA1F2",
  description: "xAI Grok Build TUI coding agent — custom provider via ~/.grok/config.toml",
  docsUrl: "https://x.ai/cli",
  configType: "custom",
  category: "code",
  vendor: "xAI",
  acpSpawnable: false,
  baseUrlSupport: "full",
  defaultCommand: "grok",
};
