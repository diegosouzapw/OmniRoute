// Kept in lockstep with the `@openai/codex@x.y.z` pin in the root Dockerfile
// (the CLI installed in the OmniRoute image). When that image pin is bumped,
// refresh this so the fingerprint OpenAI sees from the OAuth/Responses face
// matches the real client version. Overridable per-deployment via
// CODEX_CLIENT_VERSION.
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
