---
title: Isolated CLI smoke tests
description: Validate installed CLI protocol contracts with disposable local responses.
version: "3.8.51"
lastUpdated: "2026-09-22"
---

# Isolated CLI smoke tests

Run the optional harness against already installed Aider, Goose, OpenCode, Qwen Code,
or Codex binaries:

```bash
node scripts/cli/smoke-cli-integrations.mjs --targets qwen,codex --json
```

`--bin-dir /absolute/path` prepends an existing binary directory. The harness does
not install tools. Missing executables produce `HOLD-missing-binary`; a timeout
produces `HOLD-timeout`. Any FAIL makes the process exit with code 1; HOLD makes
it exit with code 2. All targets must PASS for exit code 0.

Each target runs through `omniroute run` against a disposable HTTP server bound to
`127.0.0.1`, using a fixed, non-secret sentinel credential. HOME, XDG directories,
CLI configuration homes, and the OmniRoute data directory are temporary. Provider
credentials, proxy variables, runtime-loader flags, and existing configurations
are not inherited. No real upstream credentials are required or accepted.

The explicit `--inherit-isolated-env` harness option forwards `--inherit-env` to
`omniroute run`, allowing harness-controlled metadata/update suppression flags to
reach the third-party child. It is off by default and still rebuilds the outer
environment from the same narrow allowlist: it never inherits the caller's secrets,
`NODE_OPTIONS`, `NODE_PATH`, `LD_PRELOAD`, `PYTHONPATH`, or proxy settings. Storage
encryption uses a non-secret sentinel only inside the disposable data directory.
The harness also selects LiteLLM's packaged model metadata and unbuffered Python
output; these are fixed test controls, not caller-supplied environment values.
This option requires a CLI implementing `run --inherit-env`; unsupported launchers
fail normally and must not be counted as a successful smoke.

A PASS requires a successful child exit, the expected protocol path and model,
the sentinel authorization header, a completed HTTP response, and an unpredictable
server-generated response marker in stdout. The marker does not appear in the
prompt, so printing the prompt or a diagnostic cannot satisfy the test. This proves
the installed binary's transport/response contract, not real provider authentication,
tool execution, a production deployment, or every CLI version.

The runner bounds captured output and execution time. On POSIX it creates a dedicated
process group and terminates remaining members of that group at teardown; Windows currently returns
`HOLD-process-isolation` because equivalent descendant cleanup is not implemented.
Temporary files and server sockets are closed after each target. This is configuration
and process isolation, **not an operating-system network sandbox**: third-party binaries
may attempt their own metadata or update requests. Run only trusted installed binaries
and use an externally restricted environment if zero non-loopback traffic is required.

Run the harness's deterministic tests without third-party binaries:

```bash
node --import tsx/esm --test tests/unit/cli/real-cli-smoke-harness.test.ts tests/unit/cli/real-cli-smoke-safety.test.ts
```

The mock supports OpenAI Chat Completions and Responses API JSON/SSE. It never
forwards requests to a provider. Credential-dependent upstream tests remain a
separate opt-in validation and must not be reported as covered by this harness.
