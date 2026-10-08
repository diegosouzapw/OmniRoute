---
title: "CLI Companion — copy-only terminal guidance"
version: 3.8.51
lastUpdated: 2026-09-22
---

# CLI Companion

The CLI Code dashboard includes a copy-only companion for the executable CLI
targets supported by this OmniRoute version. It does not start a process, write
configuration, test inference or send credentials to the clipboard.

## Server detection is not browser detection

Detection, runtime and configuration status describe the machine running the
OmniRoute server. If you open a remote dashboard from your laptop, a missing CLI
on that server says nothing about the CLI installed on your laptop. Unknown and
failed detection remain explicit; they are not treated as “not installed”. Raw
diagnostic errors and configuration endpoints are not shown in this panel.

Copy commands into the terminal of the machine where you want to use the CLI.
The companion does not block local instructions when server detection fails.

## Local or remote contexts

Start by inspecting the contexts already configured in your terminal:

```sh
omniroute contexts list
omniroute contexts current
```

Leave the companion's context field empty to use the CLI's active context, or
enter an existing context name. A named context may point to a local or remote
server. The dashboard does not read your terminal's context store, create a
context or copy its credentials. For example, if `office` already exists:

```sh
omniroute configure claude --context office
omniroute run claude --context office --dry-run
```

`configure` is interactive and writes configuration on the machine where you
execute it. `run --dry-run` displays the launch plan without starting the target;
it does not establish that upstream inference works. Authenticate the terminal
using the existing CLI context workflow before running these commands.

Only capabilities declared by the executable manifest are offered. If a target
requires a model, its launch command remains unavailable until you supply a real
model identifier. Context/model fields accept a restricted literal character
set; shell operators, whitespace and leading option syntax are rejected.

If clipboard access fails, the panel reports the failure and leaves the command
visible for manual selection. Copying never executes it.

## Implementation boundary

The server-only loader in `src/lib/cli-helper/companionTargets.ts` projects the
executable manifest into public descriptors. The browser receives only target
IDs, display names and capability flags, not Node modules or runtime secrets.
Command validation and status mapping live in `src/shared/utils/cliCompanion.ts`.
The panel reuses the dashboard's existing batch-status request; it introduces no
execution API or additional status polling.
