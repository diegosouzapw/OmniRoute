---
title: ACP registry and registered CLI launchers
version: 3.8.51
lastUpdated: 2026-09-21
---

# ACP registry and registered CLI launchers

OmniRoute separates **CLI discovery**, **native Agent Client Protocol**, and
**legacy stdio adapters**. Finding an installed binary does not prove its
authentication, model compatibility, or readiness to handle a prompt.

The dashboard uses `GET /api/acp/agents` and `POST /api/acp/agents` for inventory
and custom-agent registration. These are local-only management routes, not a
public API for spawning processes or submitting prompts. The internal
`AcpManager` does not automatically become an HTTP provider fallback.

## Registered contracts

`config/cli-tools-manifest.json` is the source of truth for built-in launch
binaries, arguments, and backend modes. The registry derives its definitions
from that manifest. Detection is cached for 60 seconds.

- `acp`: the Gemini contract launches `gemini --experimental-acp` and speaks
  newline-delimited ACP JSON-RPC through the official TypeScript SDK.
- `stdio-adapter`: other registered contracts retain the legacy newline-input,
  stdout-output adapter. A two-second output idle period ends its response.
  This adapter does **not** certify native ACP support for those CLIs.

Gemini documents the launch flag in its [CLI reference](https://geminicli.com/docs/cli/cli-reference/).
The client uses the [official ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
for initialization, session creation, prompt requests, notifications, and cancellation.

Custom-agent definitions remain administrator-controlled launch contracts.
Registering a binary and arguments grants that process the server user's local
execution privileges; registration is not a sandbox. Version probes accept
only the registered executable and a recognized version flag.

## Internal launch API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Pass only the provider variables deliberately assigned to this agent.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Consume response in the calling application.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` resolves the executable and arguments from the
registered definition. The only caller options are `cwd` and `env`; the old
`spawn(agentId, binary, args, env)` signature and executable overrides are
rejected. HTTP launch contracts are not supported by this manager.

The child inherits the same operating-system, terminal, locale, and certificate
allowlist as the CLI launchers. Server/provider secrets are not copied from the
parent environment. Credentials needed by the chosen CLI must be passed
explicitly or supplied through that CLI's own local authentication. The child
still has the local user's filesystem permissions and may read its own config.

## Native lifecycle and limits

1. Spawn the registered binary, initialize ACP, and create a session rooted at
   the selected working directory. Initialization has a ten-second limit.
2. Submit a prompt and collect text notifications for that session only.
   Completion is the prompt RPC response, not a period of stdout silence.
3. Use one prompt deadline, including any unfinished initialization; the default
   is 120 seconds. Concurrent prompts in the same process are rejected.
4. On native timeout, attempt `session/cancel` and terminate the process. A
   bounded 100 ms window lets the notification flush before termination.
5. Close transport state and remove the session when initialization fails, the
   connection closes, the process exits, or the caller kills it.

Tool permission requests are denied. No filesystem or terminal client
capabilities are advertised. These restrictions do not sandbox the child binary
itself or replace a CLI's own authorization settings.

Both native text and legacy stdout/stderr retain at most 1 MiB of characters,
keeping the newest output with a truncation notice. An individual native wire
frame is limited to 2 MiB of bytes before SDK parsing. Buffers reset per prompt.

`kill(sessionId)` sends SIGTERM, then SIGKILL after five seconds if the process
has not exited. Legacy prompt timeouts release listeners and timers but leave
the session available for another prompt; callers remain responsible for
`kill()` or `killAll()` when finished.

## Events and inspection

The manager emits `stdout`, `stderr`, and `exit`, each with `sessionId`.
`sessionError` reports a sanitized transport error. The compatibility `error`
event is emitted only when it has a subscriber, so a missing binary cannot
cause an unhandled EventEmitter error.

- `getSession(sessionId)` returns a managed session or `undefined`.
- `getActiveSessions()` excludes stopped or stopping sessions.
- `sendInput(sessionId, input)` is available only for a live legacy adapter;
  native ACP rejects raw input to protect its JSON-RPC stream.
- `killAll()` terminates every session managed by that instance.

## Validation boundaries

Deterministic fixtures cover the native handshake, text output, denied
permissions, cancellation, concurrent prompts, failed initialization, process
exit, output limits, and secret isolation. Existing legacy buffer/listener
regressions remain covered. These tests do not demonstrate a live Gemini login
or successful provider inference; those require a separately authorized smoke
test in the target environment.

## Related documentation

- [Agent protocols](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI launch contracts](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI tools](../reference/CLI-TOOLS.md)
- [A2A server](./A2A-SERVER.md)
- [Cloud agents](./CLOUD_AGENT.md)
