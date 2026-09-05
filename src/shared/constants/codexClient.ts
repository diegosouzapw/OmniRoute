// Codex's OAuth backend gates newer models by client version: Astra rejects
// 0.149.0 with "requires a newer version of Codex". Keep the shared inference
// and discovery identity current with verified upstream releases.
// https://github.com/openai/codex/releases/tag/rust-v0.153.4
// Overridable per-deployment via the CODEX_CLIENT_VERSION env.
export const DEFAULT_CODEX_CLIENT_VERSION = "0.153.4";
export const CODEX_CLI_RS_ORIGINATOR = "codex_cli_rs";

export function getCodexCliRsHeaders(
  version = DEFAULT_CODEX_CLIENT_VERSION
): Record<string, string> {
  return {
    "User-Agent": `${CODEX_CLI_RS_ORIGINATOR}/${version}`,
    originator: CODEX_CLI_RS_ORIGINATOR,
  };
}
