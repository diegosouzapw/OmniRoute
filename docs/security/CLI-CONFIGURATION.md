---
title: "CLI configuration previews and writes"
---

# CLI configuration previews and writes

The authenticated `/api/cli-tools/config` and `/api/cli-tools/apply` routes return
non-cacheable, redacted previews. They preserve the existing authentication and
authorization checks. Request bodies reject unknown fields. An explicit base URL
must use HTTP(S) without embedded username/password credentials; when omitted,
the server's configured base URL is used.

For a batch preview, `GET /api/cli-tools/config` accepts an optional `baseUrl` query
parameter and takes the configuration credential from the
`x-omniroute-config-api-key` header. Credentials in the query string are rejected.
`POST /api/cli-tools/config` accepts `toolId`, `baseUrl`, `apiKey` and optional
`model` in its JSON body. Responses use `Cache-Control: no-store` on both success
and error paths. Preview text is not a usable credential-bearing configuration.

Preview projection redacts serialized caller credentials and credential fields
already present in merged JSONC, TOML or YAML profiles. The apply route writes the
original configuration; preview redaction does not alter the on-disk values.
Malformed JSON is rejected with 400. Public error responses use the standard
sanitized error envelope.

Applying a configuration uses a private temporary file in the destination
directory, flushes it, and atomically renames it into place. Files and backups use
mode `0600`; permissions are set on the owned descriptor before rename. Final
destination symlinks and non-regular files are refused. Codex and OpenCode reads
also refuse final-path symlinks before merging existing TOML/JSONC. This does not
claim protection against an adversary who controls the parent directory.

The container write guard remains active: an unsafe ephemeral destination returns
422 and directs the operator to the host-side setup command. A dry run remains
available and does not write files. See [CLI integrations](../guides/CLI-INTEGRATIONS.md)
for the supported host-side setup commands and
[error sanitization](./ERROR_SANITIZATION.md) for the public error contract.
