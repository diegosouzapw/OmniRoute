# Devin Claude Bridge Design

## Baseline

- Branch: `release/v3.8.49`
- HEAD: `ed7db3ee5f89a144b2d931d8605534522f83de30`
- Package version: `3.8.49`
- Node: `v26.0.0`
- npm: `11.12.1`
- Pre-existing worktree state: `.tug/` untracked
- Dependency state: `node_modules` is absent; the first focused test run failed before loading tests because `tsx` was not installed.
- Tugline state: `tug` exists, but `tug search` failed with MCP connection closed and `tug doctor` hung; it was interrupted.
- Upstream check: `git ls-remote` failed because GitHub DNS was unavailable. Web search of the public repository showed the existing `devin-cli` summarizer provider, but no evidence of `devin-cli-agentic`.

## Source Anchors

- `/v1/messages`: `src/app/api/v1/messages/route.ts`
- Existing Devin provider: `open-sse/config/providers/registry/devin-cli/index.ts`
- Existing Devin executor: `open-sse/executors/devin-cli.ts`
- Executor registry: `open-sse/executors/index.ts`
- Provider registry: `open-sse/config/providers/index.ts`
- Format detection: `open-sse/services/provider.ts`
- Claude non-streaming response conversion: `open-sse/handlers/responseTranslator.ts`
- Existing Devin ACP unit test: `tests/unit/executor-devin-cli-acp-protocol-8406.test.ts`

## Findings

The existing `devin-cli` provider is intentionally OpenAI-format and summarizer-oriented. Its executor spawns `devin acp --agent-type summarizer`, flattens the message history into a single text prompt, and emits OpenAI SSE text chunks. It does not preserve Anthropic `tool_use` and `tool_result` blocks.

The safest implementation is a new provider id, `devin-cli-agentic`, with a separate executor. This leaves `devin-cli`, Anthropic OAuth, Claude OAuth, Claude Web, and all host Claude configuration code untouched. The new provider is fail-closed: it only resolves to `devin://acp/stdio`, uses the official Devin CLI ACP stdio path, and has no fallback provider.

## Architecture

Claude Code sends Anthropic Messages requests to local OmniRoute. OmniRoute resolves model ids prefixed with `devin-cli-agentic/` to a new Claude-format provider. The new executor translates the complete Anthropic request into an explicit text prompt for Devin ACP, including system text, structured message history, tool schemas, and prior tool results.

Devin remains a model backend. The executor starts the official fixed no-tools summarizer
role with `devin acp --agent-type summarizer` and frames the serialized request as an
execution trace. Devin must request client-owned tool execution by emitting a strict
XML-wrapped JSON block:

```xml
<tool>
{"name":"Read","arguments":{"file_path":"src/index.ts"}}
</tool>
```

The bridge parses exactly one tool request per model turn, validates that the tool name was supplied in the incoming request, validates arguments against a minimal JSON Schema validator, generates a stable `tool_devin_...` id, and returns a native Anthropic `tool_use` block. If no valid tool request is present, the bridge returns text with `stop_reason: "end_turn"`.

## Error And Safety Rules

- Unsupported Anthropic content blocks fail explicitly; images are rejected.
- Unknown tools fail explicitly.
- Invalid tool arguments fail explicitly.
- Invalid tool XML/JSON fails explicitly.
- Narrative claims that a tool was executed are returned as text, not actions.
- ACP spawn, timeout, early exit, and stderr-only failures return explicit Devin errors.
- The executor never reads `~/.claude`, `~/.claude.json`, macOS Keychain paths, or host Claude config.
- Live Devin is outside normal tests and remains opt-in via `ENABLE_LIVE_DEVIN_TESTS=1`.

## Test Strategy

Focused unit tests cover serialization, tool parsing, validation, Anthropic JSON, Anthropic SSE, malformed tool output, unknown tools, invalid arguments, image rejection, timeout, and spawn failure. Environment scripts provide an offline isolation verifier without reading host Claude credentials.

## Mandatory Runtime Isolation

The bridge runs only through `docker/devin-bridge/compose.yml`. The runtime image is non-root, uses a private `/home/bridge`, and mounts only disposable workspaces, evidence, and bridge harness files. Application source is copied into the image. It never mounts the host home, Docker socket, SSH, cloud credentials, or global Claude configuration. The container receives an explicit environment allowlist; the executor also constructs an allowlisted child environment instead of copying `process.env`.

Build-time network access installs Claude Code `2.1.220` and Devin CLI `3000.2.17` with pinned integrity/checksum. Runtime profiles are separate: `offline` uses only an internal Compose network; `live-devin` exposes egress only through a proxy guard whose allowlist contains Devin/Cognition suffixes and whose default is denial. Devin authentication lives only in the named `devin-auth` volume. Claude configuration lives in a different named volume and is initialized empty.

## Fail-Closed Routing

`devin-cli-agentic` accepts only the synthetic `devin://acp/stdio` target and an explicit Devin binary path inside the container. It cannot use provider combos, auto routing, account fallback, fallback URLs, or an HTTP upstream. Model aliases resolve only to models returned by the Devin catalog or explicitly configured Devin model ids. An ACP failure, timeout, cancellation, invalid frame, unavailable model, or stopped sidecar becomes an Anthropic-shaped error response; no secondary provider is attempted.

## Agentic Contract

The serializer preserves request order, `system`, `tool_choice`, exact tool schemas, `text`, `tool_use`, `tool_result`, `thinking`, and `redacted_thinking`. It rejects unsupported blocks and caps large tool results with an explicit truncation marker and original size. The parser accepts exactly one standalone `<tool>` envelope, validates with Zod/JSON Schema infrastructure already present in OmniRoute, rejects unknown tools and mixed narrative/action output, and performs at most one bounded repair prompt. Tool ids combine a per-request nonce with canonical arguments so repeated identical calls remain unique while their association is stable within the turn.

## Required Proof

The offline profile must prove the ACP lifecycle, fragmented frames, stderr, early exit, hang/cancel, Anthropic JSON/SSE order, no fallback, and a real pinned Claude Code run that reads, edits, runs tests, observes `CLAUDE.md`, loads a skill and command, fires a hook, and completes at least one `tool_use -> tool_result -> continuation` loop. The isolation verifier checks env, mounts, UID, config paths, DNS/connection logs, local inference destination, selected provider, and fail-closed behavior. Live Devin is proved only by official in-container login and three isolated agentic scenarios.

## Safety Incident During Baseline

The first focused test was run without `DATA_DIR` isolation and initialized `/Users/lucasisrael/.omniroute/storage.sqlite`; logs reported schema-column additions. No Anthropic data was accessed. The external database will not be touched again or destructively rolled back. Every bridge command and test now must set `HOME`, `DATA_DIR`, `SQLITE_FILE`, and temporary directories inside `.sandbox`, and an automated guard must reject paths outside the task workspace.

## Live Completion Repair

The first authenticated live attempt disproved four assumptions in the initial container
design. The official CLI reports a valid login even when its server-status request fails;
that request uses the exact hosts `server.codeium.com` and `unleash.codeium.com`, which the
guard denied. The OmniRoute executor also built a fresh allowlisted child environment that
omitted the proxy, so `devin acp` could not leave the internal network. Model discovery emits
family identifiers such as `swe-1.7`, while the OmniRoute catalog uses canonical ids such as
`swe-1-7`. Finally, browser login redirects to a loopback listener inside the one-off
container, which is not reachable from the host browser.

The repair keeps the fully containerized architecture and does not weaken the deny-by-default
network. The guard gains an exact-host allowlist for the two Codeium control-plane hosts while
retaining suffix-based access only for Devin and Cognition; telemetry destinations such as
Sentry remain denied. Compose supplies `DEVIN_BRIDGE_PROXY_URL` with the single accepted value
`http://network-guard:8080`, and the executor derives `HTTP_PROXY` and `HTTPS_PROXY` from that
explicit bridge setting instead of inheriting arbitrary host proxy variables. Claude services
mount only the Claude config volume, and only the OmniRoute live service mounts the Devin auth
volume.

Fresh login uses the official `devin auth login --force-manual-token-flow`, which is intended
for remote environments where localhost redirects cannot work. The credential is pasted only
into the interactive CLI terminal and never appears in arguments, logs, evidence, or Git.
Authentication validation requires both the logged-in marker and the absence of a server-fetch
failure. Model discovery accepts the real `family_uid`/`model_uid` fields, maps punctuation to a
catalog id only after an exact normalized match, and prefers the already-proved lightning model
when available.

Tests first prove the trusted proxy boundary, exact host policy, volume separation, strict auth
status gate, and catalog normalization. The live gate then runs three real Claude Code scenarios
through the authenticated in-container Devin CLI and requires local Read/Edit/Bash activity,
passing fixture tests, Devin-only routing, no allowed non-Devin egress, and an explicit error
when the Devin backend is stopped.

## Final Live Result

The default-agent design was rejected after live evidence showed that `ask` mode can still
emit Devin-owned ACP tool calls. The pinned CLI does not apply its top-level agent
configuration to `devin acp`, so an `allowed-tools: []` configuration could not create a
neutral backend. The fixed summarizer role is the only official ACP role in this version that
is structurally no-tools.

The execution-trace adaptation passed the authenticated live gate with
`swe-1-7-lightning`. Three Claude Code processes completed analysis, edit/test, and local
command/skill scenarios. Structured evidence proved that Claude Code issued `Read`, `Edit`,
and `Bash` tool calls; two client-owned `npm test` calls succeeded. The guard audit proved
Devin-only outbound access and zero Claude egress. Intermediate summary-shaped responses and
transient ACP timeouts remain explicit failure modes; the adapter performs one bounded repair
and the harness spaces scenarios to avoid bursty session creation.
