---
title: "AgentBridge"
version: 3.8.40
lastUpdated: 2026-06-28
---

# AgentBridge

AgentBridge is OmniRoute's MITM (Man-in-the-Middle) proxy that intercepts HTTPS traffic from IDE AI agents and reroutes it through OmniRoute's unified routing engine. It supports **9 IDE agents** — Antigravity, Kiro, GitHub Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code, and Trae (investigating) — making OmniRoute the broadest-coverage MITM proxy for AI coding assistants on the market.

**Dashboard location:** `/dashboard/tools/agent-bridge`
**Sidebar group:** Tools (after Cloud Agents)
**See also:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — monitor all intercepted traffic in real-time; [`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md) — the Linux TPROXY transparent-decrypt capture mode driven by the `/api/tools/agent-bridge/tproxy` route.

---

## §1 Overview

### What is AgentBridge?

When an IDE agent (e.g., GitHub Copilot, Cursor, Claude Code) makes an API call, it connects directly to the upstream AI provider (OpenAI, Anthropic, etc.). AgentBridge intercepts that connection transparently at the TLS level — without requiring any agent configuration change — and rewrites the request through OmniRoute.

This means you can:

- **Reroute any agent to any provider**: Copilot talking to OpenAI? Redirect it to Anthropic Claude, Gemini, or any of OmniRoute's 226+ providers.
- **Apply model mappings**: `gemini-3-flash` → `claude-sonnet-4.7` transparently at the handler level.
- **Observe all agent traffic**: every intercepted request is published to the [Traffic Inspector](./TRAFFIC_INSPECTOR.md).
- **Apply OmniRoute resilience**: combo routing, circuit breakers, fallbacks, and cost tracking work for IDE agent traffic too.

### Positioning vs. the market

| Feature           | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| ----------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity       |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot    |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)        |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex      |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE        |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries    |    —    |    ✓     |        —        |             ✓             |
| Claude Code       |    —    |    —     |        ✓        |             ✓             |
| Open Code         |    —    |    —     |        ✓        |             ✓             |
| Trae              |    —    |    —     |        —        |     🔍 Investigating      |
| Dashboard UI      |    ✓    |    ✗     |        ✗        |             ✓             |
| Traffic Inspector |    ✗    |    ✗     |        ✓        |             ✓             |
| OmniRoute routing |    ✗    |    ✗     |        ✗        |             ✓             |
| Model mapping UI  |    ✗    |    ✗     |        ✗        |             ✓             |
| Bypass list       |    ✗    |    ✗     |        ✓        |             ✓             |
| Upstream CA cert  |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Architecture

### 2.1 Components overview

```
IDE Agent (VS Code / Cursor / etc.)
    │  HTTPS (port 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← DNS redirect
    │
    ▼
src/mitm/server.cjs  (port 443, CJS child process)
    │  resolves target by Host header SNI
    │  generates per-SNI TLS cert signed by AgentBridge CA
    ├── Bypass list match? → TCP passthrough (no decrypt)
    ├── Target match? → fetch → OmniRoute router (port 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() on request body/headers
    │               ├── TrafficBuffer.push() — publishes to Traffic Inspector
    │               └── fetchRouter() → /v1/chat/completions
    └── No match? → TCP passthrough (no decrypt)
```

### 2.2 MITM server (`src/mitm/server.cjs`)

The core MITM server runs as a Node.js CJS child process (to avoid rewriting the existing CJS codebase). It:

- Listens on port 443 (requires privilege or `authbind`/`setcap`)
- Receives CONNECT tunnels from the OS (via `/etc/hosts` DNS redirect)
- Generates per-SNI TLS certificates signed by the AgentBridge CA (`DATA_DIR/mitm/ca.crt`)
- Resolves the target agent by Host header via `targets/index.ts` registry
- Dispatches to the TypeScript handler layer via HTTP to `http://127.0.0.1:20128`

`TARGET_HOSTS` is loaded from `DATA_DIR/mitm/targets.json` (written by `targets/index.ts` at boot), allowing dynamic updates without restarting the CJS server.

### 2.3 Handler base (`src/mitm/handlers/base.ts`)

All agent handlers extend `MitmHandlerBase`:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Protected helpers: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Each handler calls `hookBufferStart()` before proxying and `hookBufferUpdate()` when complete. These push `InterceptedRequest` entries into `globalTrafficBuffer` (see [Traffic Inspector](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Targets registry (`src/mitm/targets/`)

Each agent has a declarative target file:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

The registry (`targets/index.ts`) exports `ALL_TARGETS` and emits `DATA_DIR/mitm/targets.json` on boot.

### 2.5 Passthrough and bypass list (`src/mitm/passthrough.ts`)

**Bypass list** (checked first, with precedence over target match):

- Default patterns: banking hosts, `.gov.`, OAuth/SSO providers (Okta, Auth0), etc.
- User patterns: stored in DB table `agent_bridge_bypass`
- Bypassed hosts receive a transparent TCP tunnel — TLS is **never decrypted**

**Passthrough default** (no target match and not in bypass):

- Also receives a TCP tunnel — connections are never broken
- Prevents the AgentBridge from disrupting general system HTTPS traffic

Routing precedence:

```
bypass list → target match → passthrough
```

### 2.6 Upstream CA cert (`src/mitm/upstreamTrust.ts`)

For corporate network environments with a custom CA:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

When set, configures `undici`'s global dispatcher with the extra CA cert, allowing AgentBridge to reach upstream providers through corporate TLS termination proxies.

### 2.7 Secret masking (`src/mitm/maskSecrets.ts`)

Applied to all request bodies and headers **before** they enter the Traffic Inspector buffer or any log:

- `sk-` / `ak-` / `pk-` prefixed tokens (OpenAI/Anthropic-style)
- `Authorization: Bearer <token>` headers
- Generic long tokens (≥40 chars)

---

## §3 Setup

### 3.1 Start/stop the MITM server

Use the AgentBridge Server Card at `/dashboard/tools/agent-bridge`:

| Action          | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| Start Server    | Spawns `src/mitm/server.cjs` on port 443                                |
| Stop Server     | Gracefully shuts down the child process                                 |
| Restart Server  | Stop + start (picks up target changes)                                  |
| Trust Cert      | Installs `DATA_DIR/mitm/ca.crt` into OS trust store                     |
| Download Cert   | Downloads `ca.crt` for manual installation                              |
| Regenerate Cert | Creates a new CA keypair (all existing per-agent certs are invalidated) |

### 3.2 Trust the certificate

The AgentBridge CA certificate must be trusted by the OS before IDEs will accept the MITM connection.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Keychain):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Or use the "Trust Cert" button in the dashboard (runs the appropriate command for your OS, with sudo prompt if needed).

#### Electron-based IDEs ignore the OS trust store (`NODE_EXTRA_CA_CERTS`)

Some IDEs — notably **Antigravity IDE**, and other Electron / VS Code-derived apps — bundle
their own Node.js runtime that **does not consult the OS trust store** for outbound
`fetch`/HTTPS. Trusting the CA at the OS/NSS level is enough for the IDE's native **backend**
(e.g. a Go language server, which uses the OS CA bundle), but the **Electron frontend** will
still fail TLS — it surfaces as the app being _logged out_ or showing a _"connection error"_
even though the MITM log shows the backend's bootstrap calls returning `200`. Two steps are
required, and both matter:

1. Point the runtime at the CA explicitly:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Launch the IDE from that shell.** Starting it from the desktop icon / Dock / Start menu
   does **not** inherit shell exports, and `~/.config/environment.d/*.conf` only applies after
   a fresh graphical login. Fully quit the IDE first — Electron's singleton lock means a second
   launch just focuses the existing process and the new environment is ignored.

The OS-trust + NSS step above remains necessary (the Chromium network stack used by some auth
flows reads the per-user NSS store, and has its own static pins for `*.googleapis.com` that a
locally-trusted CA overrides). `NODE_EXTRA_CA_CERTS` covers the Node `fetch` path on top of it.

### 3.3 DNS routing

For each agent you want to intercept, its API host(s) must resolve to `127.0.0.1`. AgentBridge manages `/etc/hosts` entries automatically when you toggle DNS for an agent in the Setup Wizard.

Example `/etc/hosts` entries for GitHub Copilot:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Model mapping

Use the Model Mapping Table in each agent card to define source → target mappings:

| Source model (agent native) | Target model (OmniRoute) |
| --------------------------- | ------------------------ |
| `gpt-4o`                    | `claude-sonnet-4.7`      |
| `*` (wildcard)              | `claude-haiku-4.7`       |

Wildcard `*` maps any unrecognized model to the specified target. Persisted in `agent_bridge_mappings` table.

> **Tip — discover the agent's real model IDs.** An IDE may send model names that differ from
> its UI labels and that change between major versions. For example **Antigravity 2** sends
> `gemini-3.1-pro-low`, `gemini-pro-agent`, and `gemini-3.1-flash-lite` over the wire — not the
> `gemini-2.5-pro` shown in older docs. Send one chat with no matching mapping in place: the MITM
> logs the exact incoming `model:` and passes the request through. Map that literal value, then
> the next request is intercepted and routed to your target.

### 3.5 Risk notice

AgentBridge intercepts credentials (OAuth tokens, API keys) that the IDE uses to authenticate with upstream providers. These are **masked before logging** (see §2.7) but are visible to OmniRoute's MITM layer. First activation of each agent shows a dismissible risk notice modal.

### 3.6 Maintenance & Diagnostics

The dashboard exposes a **Maintenance & Diagnostics** card (`AgentBridgeMaintenanceCard`, in `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`) that surfaces operational MITM routes which previously had no UI. Its subtitle: _"Self-test the capture pipeline, undo leftover system state, and move your setup between machines."_ The card client helpers live in `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Button            | Route                                  | What it does                                                                                                                                                                     |
| ----------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnose**      | `GET /api/tools/agent-bridge/diagnose` | Runs the capture-pipeline self-test and shows a per-check report (✓/✗ + remediation hint).                                                                                       |
| **Repair**        | `POST /api/tools/agent-bridge/repair`  | Undoes orphaned MITM system state (DNS spoof entries, root CA, system proxy) left behind by a crash or SIGKILL. Idempotent — reports "Nothing to repair" when state is clean.    |
| **Remove CA**     | `DELETE /api/tools/agent-bridge/cert`  | Untrusts and removes the MITM root CA from the OS trust store (explicit, idempotent). Shown only when the CA is currently trusted; requires an inline "Remove CA?" confirmation. |
| **Export config** | `GET /api/tools/agent-bridge/config`   | Downloads the portable config JSON (see §3.7).                                                                                                                                   |
| **Import config** | `POST /api/tools/agent-bridge/config`  | Uploads a previously-exported config JSON (see §3.7).                                                                                                                            |

**Diagnostics checks** (`summarizeDiagnostics()` in `src/mitm/inspector/diagnostics.ts`). The route runs the effectful probe for each and feeds the booleans into the pure summarizer; a single `healthy` verdict plus a per-failure hint is returned:

| Check name         | What it verifies                                            | Hint on failure                                                                                                                        |
| ------------------ | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`   | The MITM server process is active                           | "The MITM server is not running. Start it from the AgentBridge tab."                                                                   |
| `server-reachable` | The MITM server accepts connections on its port (TCP probe) | "The MITM server is not accepting connections on its port. Check that the port is free and that you have privileges to bind it."       |
| `cert-exists`      | The MITM certificate has been generated on disk             | "No MITM certificate has been generated yet. Generate one from the AgentBridge tab."                                                   |
| `cert-trusted`     | The MITM root CA is in the OS trust store                   | "The MITM root CA is not trusted by the OS store, so TLS interception will fail. Trust the certificate from the AgentBridge tab."      |
| `dns-configured`   | Target hostnames are spoofed in `/etc/hosts`                | "Target hostnames are not spoofed in /etc/hosts, so traffic never reaches the proxy. Enable DNS for the agent(s) you want to capture." |

**Orphaned-state banner:** when the page detects state left behind by a crash (DNS spoof / CA / system proxy), the card shows an amber banner — _"A previous session left system state behind (DNS spoof, CA, or system proxy). Run Repair to clean it up."_ — and highlights the **Repair** button. `Repair` is the application-layer analogue of ProxyBridge's `--cleanup` flag (it delegates to `repairMitm()` in `src/mitm/manager.ts`).

> The MITM root CA is kept installed across stop/start to avoid repeated sudo
> prompts (the same behavior as mitmproxy/Charles), so removing it is an explicit
> **Remove CA** action rather than something that happens automatically on stop.

### 3.7 Portable config import/export

AgentBridge can serialize the **operator-tunable** state into a versioned JSON blob so a setup can be replicated across machines. The serializer is `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), validated by `AgentBridgeConfigSchema`.

The export includes exactly three pieces (built-in defaults are intentionally **NOT** exported, so importing never duplicates or fights them):

| Field            | Source                                                    | Notes                                                                   |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| `bypassPatterns` | user-defined bypass patterns (`agent_bridge_bypass`)      | default bank/gov/okta patterns are excluded                             |
| `customHosts`    | Traffic Inspector custom hosts (`inspector_custom_hosts`) | each: `{ host, kind: "llm"\|"app"\|"custom", label? }`                  |
| `agentMappings`  | per-agent model mappings (`agent_bridge_mappings`)        | `{ [agentId]: [{ source, target }] }` for every agent that has mappings |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": { "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }] },
}
```

**Import behavior** (`POST /api/tools/agent-bridge/config`): bypass patterns and per-agent mappings **replace wholesale**; custom hosts are added **idempotently** (`INSERT OR IGNORE`). The response reports how many of each were applied:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

What is **NOT** in the config: server running state, cert paths, per-agent DNS state, upstream CA path, and TPROXY settings — those are host/runtime state, not portable preferences.

---

## §4 Per-agent reference

| #   | Agent              | Status           | Hosts intercepted                                                  | Auth type      |
| --- | ------------------ | ---------------- | ------------------------------------------------------------------ | -------------- |
| 1   | **Antigravity**    | ✅ Supported     | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth |
| 2   | **Kiro (AWS)**     | ✅ Supported     | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4      |
| 3   | **GitHub Copilot** | ✅ Supported     | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth   |
| 4   | **OpenAI Codex**   | ✅ Supported     | `api.openai.com` (Codex paths), `chatgpt.com`                      | OpenAI key     |
| 5   | **Cursor IDE**     | ✅ Supported     | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth   |
| 6   | **Zed Industries** | ✅ Supported     | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth      |
| 7   | **Claude Code**    | ✅ Supported     | `api.anthropic.com` (opt-in)                                       | Anthropic key  |
| 8   | **Open Code**      | ✅ Supported     | `openrouter.ai`, `api.openai.com` (zen paths)                      | API key        |
| 9   | **Trae**           | 🔍 Investigating | TBD — see §8                                                       | TBD            |

### Setup wizard steps (per agent)

Each agent card has a 3-step setup wizard:

1. **Verify prerequisites** — Server running? Cert trusted? IDE installed (auto-detected)?
2. **Enable DNS** — Adds `/etc/hosts` entries (requires sudo). Shows exactly which lines will be added.
3. **Map models** — Optional model mapping table. Wildcards accepted.

### Agent detection

For agents 1–8, AgentBridge attempts to auto-detect IDE installation:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Returns: { installed: boolean, version?: string, path?: string }
```

Detection uses OS-specific paths and binary checks (e.g., `code --list-extensions | grep github.copilot` for Copilot, `~/.config/antigravity/` for Antigravity).

---

## §5 Security

### Hard Rules applied

| Rule                              | Application                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | All handler errors are sanitized before response or buffer entry                         |
| **#13** Shell env-passing         | `/etc/hosts` edits use `env` option — no string interpolation of paths                   |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/agent-bridge/` is LOCAL_ONLY + SPAWN_CAPABLE — loopback enforced before auth |

### Bypass list for sensitive hosts

The bypass list ensures that financial institutions, OAuth/SSO providers, and other sensitive hosts are **never decrypted**. Their TLS traffic passes through as a transparent TCP tunnel — OmniRoute never sees the plaintext.

Default bypass patterns include:

- `*.bank.*`, `*.gov.*` (financial/government)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/identity)
- `*.apple.com`, `*.icloud.com` (Apple system services)

User-added bypass patterns are stored in `agent_bridge_bypass` table and take precedence over everything.

### Secret masking

`maskSecrets()` from `src/mitm/maskSecrets.ts` is applied:

- On every request body before `TrafficBuffer.push()`
- On every header before logging or broadcasting

Patterns: `sk-`/`ak-`/`pk-` prefix tokens, `Bearer` tokens, and generic tokens ≥40 characters.

### Upstream CA cert

When `AGENTBRIDGE_UPSTREAM_CA_CERT` is set, the file is read at startup. If the path exists but the file is unreadable, AgentBridge logs a clear error and refuses to start (prevents silent TLS failures in corporate environments).

### Known limitations

- **Port 443 requires privilege**: On Linux, AgentBridge needs `setcap 'cap_net_bind_service=+ep'` on the Node binary, or run via `authbind`. The Setup Wizard displays OS-specific instructions.
- **IDE restart required**: After DNS redirect, the IDE must be restarted for the new host resolution to take effect.
- **Hardcoded OAuth tokens**: Some agents (Kiro, Antigravity) store OAuth refresh tokens locally. These are transparent to AgentBridge — it sees the Bearer token in each request, which is masked before logging.
- **Electron frontends need `NODE_EXTRA_CA_CERTS`**: IDEs whose frontend runs on a bundled Node/Electron runtime ignore the OS/NSS trust store and must be launched from a shell with `NODE_EXTRA_CA_CERTS` set (see §3.2). Symptom when missing: the IDE backend authenticates (MITM shows `200`s) but the UI stays logged out.
- **Multiple installs of the same IDE are independent**: a system install (e.g. `/usr/share/antigravity/antigravity`) and a user-local "Full" install (e.g. `~/AntigravityIDE_Full/antigravity-ide`) are separate processes with their own runtimes — each must be relaunched with the CA injected. Identify which one is running by its binary path before relaunching.
- **Identity is set by the agent's system prompt, not the routed model**: when you remap an agent's model to a different provider, the reply still claims the agent's native identity (e.g. Antigravity answers "I am powered by Gemini") because the IDE injects that into the system prompt. Confirm the real backend in `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), not by asking the model who it is.

---

## §6 Troubleshooting

### Port 443 conflict

If another process is already listening on port 443 (web server, VPN, etc.):

```bash
lsof -i :443          # find the process
sudo fuser -k 443/tcp  # force-kill (use with care)
```

Alternatively, configure a non-privileged port in AgentBridge settings and set up `iptables` / `pf` redirect rules.

### Certificate not trusted

If the IDE shows TLS errors after starting AgentBridge:

1. Verify the cert was installed: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) or `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Some apps maintain their own trust store (Firefox, Chrome on Linux). Run "Trust Cert" again and check the NSS/Firefox-specific cert store.
3. Restart the IDE after trusting — in-flight TLS sessions use the old trust state.

### IDE logged out / "connection error" despite a trusted CA

Symptom: after redirecting DNS and trusting the CA, an Electron-based IDE (e.g. Antigravity)
opens **logged out** or shows an authentication/connection error, yet the MITM log shows the
bootstrap calls (`loadCodeAssist`, `fetchAvailableModels`, …) returning `200`.

Cause: the IDE's **bundled Node/Electron runtime ignores the OS trust store**. The native
backend (a Go language server) trusts the OS CA and authenticates, but the Electron frontend
does not — so the UI believes it is offline.

Fix (both steps): export `NODE_EXTRA_CA_CERTS=<ca.crt>` **and relaunch the IDE from that
shell**, not from the desktop icon. Fully quit the IDE first — Electron's singleton lock means
a second launch just focuses the existing process and the new environment is ignored. See §3.2.
This mirrors an open upstream report where a standalone agent works through a MITM but the IDE
variant fails under the same setup.

### DNS not propagated

Check that `/etc/hosts` was updated:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Flush DNS cache:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE not detected

Auto-detection uses common installation paths. If detection fails but the IDE is installed:

- Check if the IDE binary is in a non-standard location
- The Setup Wizard still works — detection failure just means the badge won't show the install path

### Handler errors (upstream fetch fails)

If AgentBridge intercepts but all requests fail:

1. Verify at least one provider is connected at `/dashboard/providers`
2. Check OmniRoute server logs: `APP_LOG_LEVEL=debug` in `.env`
3. Verify `OMNIROUTE_BASE_URL` points to the correct router endpoint (default: `http://127.0.0.1:20128`)

---

## §7 API reference

All routes are `LOCAL_ONLY` (loopback-only, enforced before auth) and `SPAWN_CAPABLE`. See `src/server/authz/routeGuard.ts`.

Base path: `/api/tools/agent-bridge/`

| Method              | Path                                           | Description                                                                                                                |
| ------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | Global server state + per-agent detection/status                                                                           |
| GET                 | `/api/tools/agent-bridge/agents`               | List registered agents (id, name, hosts, viability, state)                                                                 |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | State of one agent (target config + detection + stored state)                                                              |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Update `setup_completed` for agent                                                                                         |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Run detection probe for agent (`installed`, `version?`, `path?`)                                                           |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Enable/disable DNS for agent (`{enabled: boolean}`)                                                                        |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Model mappings for agent                                                                                                   |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Replace model mappings                                                                                                     |
| POST                | `/api/tools/agent-bridge/server`               | Start/stop/restart server (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                          |
| GET                 | `/api/tools/agent-bridge/cert`                 | Cert status (`exists`, `trusted`, `path`)                                                                                  |
| POST                | `/api/tools/agent-bridge/cert`                 | Trust (install) the MITM root CA                                                                                           |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Untrust (remove) the MITM root CA — idempotent (see §3.6)                                                                  |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Regenerate the self-signed MITM cert                                                                                       |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Stream the PEM cert for download                                                                                           |
| GET                 | `/api/tools/agent-bridge/bypass`               | List bypass patterns (`default` + `user`)                                                                                  |
| POST                | `/api/tools/agent-bridge/bypass`               | Replace user-defined bypass patterns wholesale                                                                             |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Remove a single user-defined bypass pattern                                                                                |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Capture-pipeline self-test (see §3.6)                                                                                      |
| POST                | `/api/tools/agent-bridge/repair`               | Undo orphaned MITM system state (see §3.6)                                                                                 |
| GET                 | `/api/tools/agent-bridge/config`               | Export portable config JSON (see §3.7)                                                                                     |
| POST                | `/api/tools/agent-bridge/config`               | Import portable config JSON (see §3.7)                                                                                     |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Get configured upstream CA path                                                                                            |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Validate + persist upstream CA path                                                                                        |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Validate-only (dry-run) an upstream CA path — does not persist                                                             |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | TPROXY transparent-decrypt capture mode — see [`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md) |

Full OpenAPI schemas: `docs/openapi.yaml` → tag `AgentBridge`.

---

## §8 Roadmap

### Trae investigation

Trae is a relatively new AI coding assistant. Before implementing a handler:

1. Identify the binary/extension in VS Code / JetBrains marketplaces or as a standalone app
2. Capture traffic with mitmproxy to discover API hosts and endpoint shapes
3. Determine authentication mechanism
4. Assess go/no-go based on TOS and API discoverability

Until investigation completes, the Trae card in the dashboard shows a "Investigating" badge with a "Report viability" link. The handler stub at `src/mitm/handlers/trae.ts` throws a structured `Not yet implemented` error.

### Backlog agents (MITM required — no custom base URL support)

The following tools do not support custom base URLs in their current versions, making MITM the only interception path. Viability assessment is pending:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — separate from Kiro IDE)
- **Cowork** (Anthropic desktop)

Note: GitHub Copilot CLI ≥v1.0.19 supports `COPILOT_PROVIDER_BASE_URL` — use direct config instead of MITM for that tool.
