# Devin Claude Bridge

`devin-cli-agentic` lets the real Claude Code runtime use OmniRoute's local Anthropic
Messages endpoint while the official Devin CLI supplies model responses over ACP stdio. It
does not modify the existing Anthropic, Claude OAuth, Claude Web, or `devin-cli` providers.

> **Current status: offline and live validated.** The pinned Claude Code `2.1.220` completed
> three isolated scenarios through Devin CLI `3000.2.17` and model
> `swe-1-7-lightning`. The final live run proved client-owned `Read`, `Edit`, and `Bash`
> turns, successful `npm test` results, project command and skill discovery, Devin-only
> routing, and zero Claude egress.

## Architecture

```text
Claude Code 2.1.220 (isolated non-root Linux container)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (Claude-format, no-auth provider)
  -> devin acp --agent-type summarizer (official ACP stdio, no Devin tools)
  -> Devin account in the dedicated devin-auth volume
```

The official CLI's default ACP agent can execute its own tools, so this bridge does not use
it. It starts the fixed `summarizer` ACP agent, whose official CLI mode has no tools, and
frames the serialized Anthropic request as an execution trace. When another Claude-owned
action is needed, the response must contain exactly one client tool envelope. Any ACP
`tool_call` or `tool_call_update` is rejected before a response can be reported as
successful.

The serializer in `open-sse/executors/devin-agentic/serializer.ts` preserves `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice`, and the
tools supplied by Claude Code. Images and unknown blocks fail explicitly. Large tool results
use a visible truncation marker.

The parser accepts one standalone `<tool>{...}</tool>` envelope per model turn. It checks
the name against the request's tool list, validates arguments against that tool's JSON
Schema, rejects mixed narrative/actions, and permits one bounded repair. Claude Code then
executes the resulting Anthropic `tool_use` locally and sends the `tool_result` back through
OmniRoute.

## Isolation and threat model

The host's Claude installation, account, and configuration are out of scope and treated as
forbidden. The Compose services:

- run as UID/GID `10001:10001`, with a read-only root filesystem, dropped capabilities, and
  `no-new-privileges`;
- use a private `/home/bridge`, a dedicated Claude config volume, isolated OmniRoute data,
  and a separate `devin-auth` volume;
- mount only disposable `.sandbox` workspaces/evidence;
- do not mount the host home, Keychain, SSH, cloud credentials, or Docker socket;
- construct explicit environments and remove Anthropic API/OAuth/routing variables;
- direct Claude Code inference only to `http://omniroute:20128` with a local-only key.

The offline profile uses an internal network. In the live profile, OmniRoute reaches the
official Devin endpoints only through `network-guard`; unrelated destinations are denied.
Claude Code has a separate deny-all egress guard and can reach only the local OmniRoute
service through `NO_PROXY`. Guard audit files are mounted only by their guard process. The
scripts verify file ownership, mode, link count, and every decision before exporting
token-free evidence.

Run the isolation proof independently:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

It validates topology, named mounts, non-root/read-only settings, explicit local routing,
absence of sensitive environment variables, absence of the Docker socket, blocked access to
`api.anthropic.com` and `claude.ai`, Devin-only provider selection, and explicit failure when
the ACP backend is unavailable.

## First-time setup and normal use

Build the pinned image:

```bash
./scripts/devin-bridge/build
```

Authenticate only the isolated Devin volume:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

The login command uses the official manual-token flow intended for remote/container
environments. The value is entered directly into the CLI prompt; it is not passed as a
process argument, written to Git, or copied from the host.

Launch the isolated Claude Code runtime:

```bash
./scripts/devin-bridge/launch
```

`launch` rechecks isolation, Devin authentication, and model discovery before starting the
containerized Claude Code. It never runs the host's Claude executable. Model aliases can be
set in `.env.devin-bridge`; every configured value must keep the
`devin-cli-agentic/` prefix.

## Validation commands

The reproducible offline path requires no Devin account and has no runtime Internet:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

The authenticated opt-in live path is:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

The live runner waits between scenarios to avoid opening ACP sessions in a burst and
validates structured Claude stream events instead of trusting textual claims. Its three
scenarios prove:

1. direct project reads and defect analysis;
2. a real `Edit`, a client-owned `Bash` `npm test`, and a terminal result;
3. `/bridge-check` plus `bridge-proof` discovery, project reads, another successful
   client-owned `npm test`, and completion without pending work.

The final gate also checks the Devin network audit and requires the Claude egress audit to
remain empty.

## Updating pinned tools

The image pins Node, Claude Code, and Devin CLI in
`docker/devin-bridge/Dockerfile`. To update:

1. change the explicit versions;
2. replace both architecture-specific Devin archive checksums with values for the official
   artifact;
3. rebuild and run every offline validation command;
4. confirm the versions inside the image;
5. rerun the authenticated three-scenario live suite.

Do not install either CLI globally on the host or replace checksum verification with an
unverified download.

## Diagnosis and cleanup

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  shows local routing and sanitized executor errors.
- `.sandbox/evidence/mock-acp.jsonl` records deterministic mock ACP actions.
- `.sandbox/evidence/claude-stream.jsonl` records the real Claude Code offline run.
- `.sandbox/evidence/live-*.jsonl` records the three validated live streams.
- `.sandbox/evidence/egress.jsonl` and `.sandbox/evidence/claude-egress.jsonl` are validated,
  token-free copies of the guard audits.

Stop owned containers and networks while preserving login/config volumes:

```bash
./scripts/devin-bridge/clean
```

Remove the complete bridge-owned environment, including named volumes:

```bash
./scripts/devin-bridge/clean --all
```

## Limits

- The bridge relies on the fixed no-tools `summarizer` role because Devin CLI `3000.2.17`
  does not expose a neutral no-tools ACP agent. The adapter compensates for summary-shaped
  intermediate responses, but one bounded repair can still fail explicitly.
- Live ACP calls can return transient `502`/`504` responses. The harness spaces scenarios;
  persistent failure remains fail-closed and never selects another provider.
- ACP context is reconstructed from each Anthropic request; there is no process/session
  affinity.
- One tool call is supported per model response; parallel calls are rejected.
- Images are explicitly unsupported. Vision, thinking output, effort controls, and a 1M
  context window are not advertised.
- SSE uses valid Anthropic lifecycle events but is emitted after the bounded ACP turn is
  collected; ACP chunks are not forwarded incrementally.
