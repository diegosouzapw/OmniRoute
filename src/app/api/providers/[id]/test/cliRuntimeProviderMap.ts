// Maps a provider id to the CLI tool id whose local runtime must be present
// for the connection-test path to authenticate against a local CLI auth file.
// kilocode is intentionally absent: the provider uses OAuth device flow + direct
// HTTPS to api.kilo.ai and never depends on the kilocode CLI binary at runtime
// (#2404). CLI-tools integration for Kilo (configuring the VSCode extension to
// point at OmniRoute) lives in /api/cli-tools/kilo-settings and keeps its own
// runtime check there.
export const CLI_RUNTIME_PROVIDER_MAP: Record<string, string> = {
  cline: "cline",
  qoder: "qoder",
};
