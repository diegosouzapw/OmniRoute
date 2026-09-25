---
title: "Shared CLI launch and configuration contracts"
version: 3.8.51
lastUpdated: 2026-09-21
---

# Shared CLI launch and configuration contracts

The neutral `config/cli-tools-manifest.json` contract declares canonical IDs,
aliases, binary candidates, setup recipes, model arguments and capabilities.
The plain Node adapter in `bin/cli/cli-manifest.mjs` and the TypeScript adapter
in `src/shared/constants/cliIntegrationManifest.ts` read the same file.
Runtime, catalog, configure, completion, generators and backend registration
are checked together by `tests/unit/cli/cli-manifest-drift.test.ts`.
Being cataloged does not mean that a tool can be launched or configured.
In particular, 5dive remains configure-only.

## Child environment and lifecycle

`omniroute run`, `omniroute launch` and `omniroute launch-codex` inherit an
OS/terminal compatibility allowlist and inject the selected target's credentials.
Unrelated provider and database secrets are not inherited by default.
`--inherit-env` explicitly restores full parent-environment inheritance; only
use it when the selected third-party process should receive those values.
This is environment filtering, not an OS sandbox: the process still runs with
the caller's filesystem permissions.

Interrupt and termination signals are forwarded to the child. The launcher
waits for the child's close event before removing temporary configuration.
`OMNIROUTE_CHILD_SIGNAL_TIMEOUT_MS` controls the grace period before forced
termination (default 5000 milliseconds).

## Gemini persistent setup

```bash
omniroute setup-gemini --remote https://omni.example --model provider/model --yes
omniroute configure gemini --model provider/model --yes
omniroute run gemini --model provider/model --dry-run --json
```

The first two commands configure this machine for the selected local or remote
server. Setup preserves unrelated JSON settings, selects Gemini API-key auth,
and writes the endpoint and credential to a private `.gemini/.env` file.
It refuses invalid JSON rather than overwriting it. Endpoint URLs must be
HTTP(S), without embedded credentials, query parameters or fragments.
Dry-run prints paths, not credential values.

`GEMINI_CLI_HOME` or `--gemini-home` selects the persistent home root.
An actual `run gemini` creates and later removes its own temporary home.
Neither mode bypasses Gemini's workspace-trust checks.

## Codex profiles

`configure codex` writes a private `<name>.config.toml` with a model and its
OmniRoute provider endpoint. Credentials are referenced through
`OMNIROUTE_API_KEY`, never embedded. The launch command sets the selected
model at the top-level `model` key, not inside `model_providers`.

Separate profile files are the current documented Codex contract; they overlay
the user configuration when selected with `codex --profile <name>`.
See [the official profile reference](https://learn.chatgpt.com/docs/config-file/config-advanced#profiles)
and [the OmniRoute Codex guide](./CODEX-CLI-CONFIGURATION.md).

## Hermetic command execution

With an explicit `DATA_DIR`, setting
`OMNIROUTE_CLI_SKIP_DEFAULT_DATA_ENV=1` prevents startup from falling through
to the default user data directory's credential environment. This is useful for
isolated tests. It does not disable other explicitly selected environment files.
