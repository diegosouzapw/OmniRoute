---
title: "Traffic Inspector"
version: 3.8.31
lastUpdated: 2026-06-20
---

# Traffic Inspector

Traffic Inspector is OmniRoute's built-in HTTPS traffic debugger — a Charles Proxy / mitmweb / HTTP Toolkit-like tool that is **LLM-aware** and **agent-aware**. It lives at `/dashboard/tools/traffic-inspector` and receives live traffic from up to 5 simultaneous capture sources.

**Dashboard location:** `/dashboard/tools/traffic-inspector`
**Sidebar group:** Tools (after AgentBridge)
**See also:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge is capture mode 1.

---

## §1 Overview

### What makes Traffic Inspector unique

| Feature | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
|---------|:-------:|:-------:|:-------:|:-------------------------------:|
| Web-based | ✓ | ✗ | ✗ | ✓ |
| Open-source | ✓ | ✗ | partial | ✓ |
| **Agent-aware** (knows if request is from Antigravity/Copilot/etc.) | ✗ | ✗ | ✗ | ✓ |
| **LLM-aware** (parses OpenAI/Anthropic/Gemini shape, tokens, model) | ✗ | ✗ | ✗ | ✓ |
| **Model mapping visible** (gemini-3-flash → claude-sonnet-4.7) | ✗ | ✗ | ✗ | ✓ |
| **Proxy/upstream latency split** | partial | ✗ | ✗ | ✓ |
| **Integrated with OmniRoute** routing, fallback, cost | ✗ | ✗ | ✗ | ✓ |
| **System-wide proxy debug** (any app on the machine) | ✓ | ✓ | ✓ | ✓ |
| **Custom host capture** (per-host DNS redirect) | ✓ | ✓ | ✓ | ✓ |
| **HTTP_PROXY env mode** | ✓ | ✓ | ✓ | ✓ |
| **Conversation view** (multi-turn bubbles, tool_use/tool_result) | ✗ | ✗ | ✗ | ✓ |
| **SSE stream merger** (reconstruct from delta events) | ✗ | ✗ | ✗ | ✓ |
| **Session recording** (named, exportable .har/.jsonl) | ✗ | ✓ | ✓ | ✓ |

### Architecture in one paragraph

The `TrafficBuffer` (`src/mitm/inspector/buffer.ts`) is a shared in-memory ring buffer (default 1000 entries, configurable via `INSPECTOR_BUFFER_SIZE`). All capture sources write to it via `push()`. The buffer classifies each entry using `kindDetector.ts` (determines if it's an LLM request), computes a `contextKey` (SHA-256 fingerprint of the system prompt), and broadcasts to all WebSocket subscribers via `globalTrafficBuffer.subscribe()`. The dashboard connects via `GET /api/tools/traffic-inspector/ws` and receives a snapshot on connect, followed by `new`/`update`/`clear` events.

---

## §2 Capture modes

Traffic Inspector supports **5 simultaneous capture sources**. Each is independently toggleable. The `source` field on every `InterceptedRequest` (`src/mitm/inspector/types.ts`) is one of `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"`, or `"tproxy"`.

### Mode 1 — AgentBridge (default, always on)

**Source:** AgentBridge handlers (`src/mitm/handlers/base.ts`)
**Mechanism:** Every `intercept()` call in `MitmHandlerBase` calls `hookBufferStart()` before forwarding and `hookBufferUpdate()` on completion. Zero extra config — works as soon as AgentBridge is running.
**Reach:** The 9 IDE agents configured in AgentBridge
**Note:** `source` field in `InterceptedRequest` = `"agent-bridge"`

### Mode 2 — Custom Hosts (DNS redirect)

**Source:** User-defined host list (`inspector_custom_hosts` table)
**Mechanism:** Adding a host via the UI adds `127.0.0.1 <host>` to `/etc/hosts` (requires sudo). The existing AgentBridge MITM server (port 443) generates a SNI cert dynamically for the new host.
**Reach:** Any application using the added host — no app config change needed
**Note:** `source` = `"custom-host"`

Example use cases:
- Monitor `api.openai.com` from Python scripts
- Debug `my-internal-llm.company.com`
- Capture traffic from mobile devices on the same network (via ARP spoofing — advanced)

### Mode 3 — HTTP_PROXY listener (port 8080)

**Source:** Applications using `HTTP_PROXY`/`HTTPS_PROXY` environment variables
**Mechanism:** Secondary listener at port 8080 (`src/mitm/inspector/httpProxyServer.ts`) that acts as a standard explicit HTTP/HTTPS proxy. Accepts `CONNECT` tunnels (HTTPS) and direct HTTP requests.
**Reach:** Any application that respects `HTTP_PROXY` env — no DNS change, no sudo
**Note:** `source` = `"http-proxy"`

```bash
# Quick capture for a single command:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Persistent capture in a shell session:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**TLS limitation:** HTTPS `CONNECT` tunnels are captured as metadata only (host, port, timing) — TLS body is not decrypted by default. Enable "Decrypt HTTPS in proxy mode" toggle (opt-in, requires AgentBridge cert to be trusted) for full body inspection.

**Port conflict:** If port 8080 is in use, AgentBridge returns a 409 with a structured error. Change the port via `INSPECTOR_HTTP_PROXY_PORT` env var.

### Mode 4 — System-wide proxy (advanced, opt-in)

**Source:** OS-level proxy settings (applies to all apps on the machine)
**Mechanism:** Uses OS APIs to redirect all HTTP/HTTPS traffic through the HTTP_PROXY listener:
- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
**Reach:** Every application on the machine that respects system proxy settings
**Note:** `source` = `"system-proxy"`

**Safety mechanisms:**
- Auto-disable timer (default 30 min, configurable via `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Previous system proxy state is saved in DB and restored on revert
- Dashboard shows "Reverting system proxy" prompt if user navigates away while active
- UI shows `⚠ Advanced` badge + explicit confirmation checkbox

### Mode 5 — TPROXY transparent decrypt (Linux, root, opt-in)

**Source:** Kernel TPROXY + policy routing (`src/mitm/tproxy/`)
**Mechanism:** Marks new local outbound TCP connections to a target port (default `443`) in `mangle OUTPUT`, an `ip rule` reroutes the marked packets to local delivery, and `mangle PREROUTING`'s `TPROXY` target hands them to a transparent (**IP_TRANSPARENT**) listener (default port `8443`). The listener terminates TLS with a leaf certificate issued **per SNI hostname on demand** by a dynamic CA, captures the decrypted exchange, and forwards the request re-encrypted to the original destination.
**Reach:** **Arbitrary** destination hosts on the target port — no `/etc/hosts` spoof, no `HTTP_PROXY` env, no system-wide proxy mutation. The intercepted process needs no config change, but must trust the dynamic CA.
**Note:** `source` = `"tproxy"`

**Requirements:** Linux only (**IP_TRANSPARENT** is Linux-only), the **CAP_NET_ADMIN** capability (root), and a native N-API addon that must be built with a C toolchain (`npm run build:native:tproxy`). When unavailable, the dashboard toggle is disabled with the tooltip "TPROXY decrypt requires Linux + root + the native addon". The firewall rules apply/revert transactionally (a crash never leaves a `mangle` rule behind) and flush on reboot. An SO_MARK-based anti-loop keeps the proxy's own re-encrypted forward from being re-intercepted.

This is a substantial subsystem with its own dedicated operator guide — see **[`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md)** for the full firewall recipe, the per-SNI dynamic CA + trust-store installer, the local-only route, anti-loop details, and the configuration schema. The toggle is driven by `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (note: the route lives under the AgentBridge prefix, not the Traffic Inspector prefix).

### Capture mode comparison

| Mode | Setup | Sudo? | Reach | Notes |
|------|-------|:-----:|-------|-------|
| 1. AgentBridge | Automatic | Once (cert+hosts) | 9 IDE agents | Default on |
| 2. Custom Hosts | Per-host input | Yes (hosts file) | Any app using that host | Persisted in DB |
| 3. HTTP_PROXY | `export HTTPS_PROXY=...` | No | Apps respecting env | Port 8080, no TLS decrypt by default |
| 4. System-wide | Toggle + confirm | Yes | All apps on machine | Auto-disable in 30 min |
| 5. TPROXY decrypt | Toggle (Linux + native addon) | Yes (root + CA install) | Any host on the target port | Decrypts arbitrary hosts; off by default — see [MITM-TPROXY-DECRYPT.md](../security/MITM-TPROXY-DECRYPT.md) |

---

## §3 UI

### 3.1 Layout

```
┌─ Traffic Inspector ─────────────────────────────────────────────────────┐
│ ┌─ Capture sources toolbar ─────────────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ Custom hosts (3)]  [○ HTTP_PROXY]  [○ System]│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Filter/control bar ──────────────────────────────────────────────┐   │
│ │ Profile: (●) LLM only  (○) Custom  (○) All                        │   │
│ │ [⎉ Pause] [🗑 Clear] [⬇ .har] [● REC session]    ● live 482/1k  │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ REQUEST LIST (resizable)         ║ DETAIL PANE                         ▲ │
│ ────────────────────────────── │ ║ [Conversation][Headers][Request]    │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Response][Timing][LLM][Stats]      │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 custom ║                                       │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Request list (left panel)

- **Virtualized** (`useVirtualList` + `ResizeObserver`): handles 1000 items without freezing
- **Auto-scroll** with toggle to pause while inspecting
- **Color-coded status**: green (2xx), yellow (3xx), red (4xx/5xx), gray (in-flight)
- **Agent emoji**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 custom host
- **Context color bar**: 1px left border colored by `contextKey` (SHA-256 of system prompt) — visually groups related conversations
- **Lazy body**: only the selected request's body is materialized in the detail tabs (avoids rendering 1000 × 1MB bodies)

### 3.3 Detail pane — 7 tabs

| Tab | Content | Notes |
|-----|---------|-------|
| **Conversation** | Multi-turn chat bubbles (system/user/assistant + tool_use/tool_result) | Normalized from any provider format; only shown for `detectedKind === "llm"` |
| **Headers** | Request + response header tables | Sensitive headers (Authorization, Cookie, api-key) masked by default; "Show secrets" toggle |
| **Request** | Raw body, JSON tree view, model field badge | Pretty-printed JSON or raw text |
| **Response** | Raw body or SSE event list; toggle "Raw ↔ Merged" | SSE merger reconstructs final message from delta events |
| **Timing** | Waterfall: proxy overhead vs upstream latency | Total, TTFB, and size |
| **LLM Details** | Provider, model, messages count, tokens in/out, cost estimate, mapped target | Only shown for LLM requests |
| **Stats** | Recharts: latency timeline, token bar chart, tool call scatter | Only shown when a recorded session is loaded |

### 3.4 Toolbar controls

| Control | Action |
|---------|--------|
| ⎉ Pause | Stops rendering new requests; "X new" badge accumulates |
| 🗑 Clear | Clears the UI list (server buffer is not affected) |
| ⬇ Export .har | Downloads current filtered list as HAR file |
| ● Record session | Starts a named recording session |
| Profile selector | LLM only / Custom hosts / All |
| Host filter | Substring match on `host` field |
| Agent filter | Dropdown: All / per-agent |
| Status filter | All / 2xx / 3xx / 4xx / 5xx / error |
| Source filter | All / agent-bridge / custom-host / http-proxy / system-proxy / tproxy |
| **Live** filter | Show only in-flight (open) requests — `liveOnly` toggle (see §4.6) |

### 3.5 Resizable panels

- List and detail pane separated by a drag handle
- List width: min 280px, max 720px, persisted in `localStorage` (`inspector.listWidth`)
- Collapsible to a 48px rail (icon-only); click a row in the rail to expand

---

## §4 LLM-aware features

### 4.1 Kind detector (`src/mitm/inspector/kindDetector.ts`)

Classifies each request as `"llm"`, `"app"`, or `"unknown"` using 4 signals:

1. **Host registry** — ~18 known LLM API hostnames (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot, etc.)
2. **Path patterns** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses`, etc.
3. **Body shape** — detects `messages[]` (OpenAI/Claude), `contents[]` (Gemini), `prompt`, `input` fields
4. **User-agent hints** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` in UA string

Custom hosts added via Mode 2 inherit their `kind` from the form input (defaults to `"custom"`).

### 4.2 SSE merger (`src/mitm/inspector/sseMerger.ts`)

**MIT port from [chouzz/llm-interceptor](https://github.com/chouzz/llm-interceptor)**

Reconstructs the final assistant message from raw SSE delta events:

- **Anthropic**: accumulates `content_block_delta` by index; handles `text_delta`, `input_json_delta` (tool calls), `thinking_delta`
- **OpenAI**: accumulates `choices[i].delta.content` and `tool_calls` by index
- **Gemini**: accumulates `candidates[i].content.parts`
- **Unknown**: returns raw events as-is

The Response tab shows a toggle: **"Raw events ↔ Merged"**.

### 4.3 Conversation normalizer (`src/mitm/inspector/conversationNormalizer.ts`)

**MIT port from [chouzz/llm-interceptor](https://github.com/chouzz/llm-interceptor)**

Converts OpenAI, Anthropic, and Gemini message formats to a single `NormalizedConversation` before rendering:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[];    // messages / contents / prompt from request body
  response: NormalizedTurn[];   // assistant response (merged via sseMerger)
  contextKey: string | null;    // SHA-256 system-prompt fingerprint
}
```

Block types: `text`, `tool_use`, `tool_result`. The Conversation tab uses this shape regardless of provider.

### 4.4 Context key colorization (`src/mitm/inspector/contextKey.ts`)

- Computes `SHA-256` of the system prompt (first `role:system` message, or `system` field, or Gemini `systemInstruction`)
- Returns a 12-character hex prefix (`"a3f9c2..."`)
- Frontend maps the key to a deterministic HSL color for the left-border bar
- **Filtro "same context"**: clicking the `ctx #a3f` chip adds a filter to show only requests with the same fingerprint

This makes it easy to visually distinguish different "personas" or tasks running in the same agent session.

### 4.5 LLM metadata extraction

For LLM requests, the LLM Details tab extracts:

```ts
interface LlmMetadata {
  provider: string | null;        // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null;         // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null;           // from request body or response
  messages: number;               // turn count
  tokensIn: number | null;        // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null;       // usage.completion_tokens / usage.output_tokens
  streamed: boolean;              // true if SSE response
  mappedTo: string | null;        // x-omniroute-mapped header
  costEstimateUsd: number | null; // estimated cost based on OmniRoute pricing
}
```

### 4.6 Live in-flight request filter

The request `status` field is `number | "in-flight" | "error"` — an entry is
pushed as `"in-flight"` the moment the request starts and **updated in place**
when the response (or error) arrives. The toolbar's **"Live"** toggle
(`liveOnly`, i18n key `trafficInspector.liveOnly`) restricts the list to entries
whose `status === "in-flight"`, letting you watch open connections in real time.

The filter is a pure, client-side predicate in
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

The toggle state lives in `useTrafficFilters` (the inspector dashboard hooks) and
combines with the other filters (profile, host, agent, source, status, context).

### 4.7 Process attribution (Linux)

On Linux, each intercepted request can be attributed to the **originating local
process**. Two optional fields are added to `InterceptedRequest`:

```ts
pid?: number;          // originating process id (Linux only)
processName?: string;  // originating process name (Linux only)
```

`src/mitm/inspector/processAttribution.ts` maps the connection's *client*
ephemeral port to a PID + name by:

1. Reading `/proc/net/tcp` and `/proc/net/tcp6` to find the socket inode for the
   port (`parseProcNetTcpForInode`, a pure fixture-testable parser).
2. Scanning `/proc/<pid>/fd/` for a symlink to `socket:[<inode>]`.
3. Reading the process name from `/proc/<pid>/comm`.

A 1-second TTL cache bounds the procfs scan cost under load. Attribution is
**best-effort** — any failure resolves to `null` and never blocks capture. On
macOS/Windows the function returns `null` (stub; `lsof`/`GetExtendedTcpTable`
support is a follow-up).

---

## §5 Sessions

### 5.1 Recording a session

1. Click **"● Record session"** in the toolbar → enter a name (optional)
2. Live tail continues normally; a red pulsing indicator shows `◉ REC · <name> · 00:42 · 23 reqs`
3. Click **"⏹ Stop"** → the session snapshot is saved to `inspector_sessions` + `inspector_session_requests`

### 5.2 Viewing a recorded session

The **Sessions** dropdown in the toolbar lists saved sessions. Selecting one:
- Loads the session's snapshot (frozen state)
- A banner shows: `Viewing recorded session "<name>" — [Back to live]`
- The Stats tab becomes available with Recharts aggregates

### 5.3 Export formats

Each session can be exported as:

| Format | Use |
|--------|-----|
| **HAR** (HTTP Archive 1.2) | Compatible with Chrome DevTools, Charles, Fiddler — import for offline analysis |
| **JSONL** | One `InterceptedRequest` per line — compatible with `llm-interceptor` format |

Export via `GET /api/tools/traffic-inspector/sessions/{id}/export.har` or the ⬇ button in the Sessions dropdown.

---

## §6 Security

Traffic Inspector shows **all intercepted HTTPS traffic**, including authorization headers and request bodies. The following controls are in place:

| Control | Details |
|---------|---------|
| **LOCAL_ONLY** | All routes and the WebSocket endpoint are loopback-only (enforced in `routeGuard.ts` before auth) |
| **Secret masking** | `maskSecrets()` applied to all headers and bodies before `TrafficBuffer.push()` — enabled by default (`INSPECTOR_MASK_SECRETS=true`) |
| **Body size cap** | Bodies > `INSPECTOR_MAX_BODY_KB` (default 1024 KB) are truncated with `"(truncated for performance)"` notice |
| **Sensitive header masking** | `authorization`, `cookie`, `api-key`, `x-api-key`, `proxy-authorization` → `Bearer ***` in Headers tab; "Show secrets" toggle |
| **CSP** | Strict Content Security Policy on Traffic Inspector pages to prevent XSS via injected response bodies |
| **No persistence by default** | The `TrafficBuffer` is in-memory and lost on server restart. Sessions are persisted only when explicitly recorded |

### Hard Rules applied

| Rule | Application |
|------|-------------|
| **#12** `sanitizeErrorMessage` | All HTTP error responses from Traffic Inspector routes are sanitized |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` is LOCAL_ONLY + SPAWN_CAPABLE (system proxy commands) |

### Known limitations

- **System-wide proxy mode** affects all applications on the machine, including VPN clients and SSO. Always use with the auto-disable timer. Do not use on shared machines.
- **CONNECT tunnel HTTPS**: Mode 3 (HTTP_PROXY) captures only tunnel metadata for HTTPS destinations unless TLS interception is enabled. This is by design — transparent capture without the AgentBridge cert being trusted would break TLS verification for those apps.
- **Hardcoded strings in some components**: Some UI components (F7/F8) have a small number of hardcoded strings not yet covered by i18n keys. These are documented as a Known Limitation in the i18n gap report; they will be migrated in a follow-up pass. Affected strings are UI decorative labels that don't require translation for functional use.

---

## §7 Troubleshooting

### WebSocket disconnection

If the live tail shows "Disconnected":
1. Check the server is still running: `GET /api/tools/traffic-inspector/capture-modes`
2. Reload the page — the WebSocket reconnects and receives a fresh snapshot
3. If the server was restarted, the in-memory buffer was cleared — old entries are gone unless a session was recorded

### Port 8080 conflict

If HTTP_PROXY mode fails to start:
```bash
lsof -i :8080    # find the process
```

Change the port:
```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### System proxy not reverted

If OmniRoute crashes while system-wide proxy mode is active:

**macOS:**
```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux (GNOME):**
```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows:**
```cmd
netsh winhttp reset proxy
```

The dashboard will also offer "Revert system proxy" on next load if it detects the DB state indicates proxy was active.

### Buffer full

When the buffer reaches `INSPECTOR_BUFFER_SIZE` (default 1000), new entries rotate out the oldest. If important requests are being lost:
- Increase `INSPECTOR_BUFFER_SIZE` (e.g., 5000) — trades memory for retention
- Record a session to persist the relevant window to DB

---

## §8 API reference

All routes are `LOCAL_ONLY` (loopback-only) and `SPAWN_CAPABLE` (system proxy commands). See `src/server/authz/routeGuard.ts`.

Base path: `/api/tools/traffic-inspector/`

### Request management

| Method | Path | Description |
|--------|------|-------------|
| GET | `/requests` | List requests (filterable: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET | `/requests/{id}` | Single request details |
| DELETE | `/requests` | Clear the in-memory buffer |
| POST | `/requests/{id}/replay` | Re-execute the same request through OmniRoute router |
| PUT | `/requests/{id}/annotation` | Save or update a note on a request |

### WebSocket

| Method | Path | Description |
|--------|------|-------------|
| GET | `/ws` | Live WebSocket stream. Sends `snapshot` on connect, then `new`/`update`/`clear` events |

### Export

| Method | Path | Description |
|--------|------|-------------|
| GET | `/export.har` | Export current filtered list as HAR 1.2 |

### Custom hosts

| Method | Path | Description |
|--------|------|-------------|
| GET | `/hosts` | List custom hosts |
| POST | `/hosts` | Add host (auto-edits `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Remove host |
| PATCH | `/hosts/{host}` | Toggle `enabled` |

### Capture modes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/capture-modes` | State of the AgentBridge / custom-hosts / HTTP_PROXY / system-proxy modes + the `tls-intercept` toggle |
| POST | `/capture-modes/http-proxy` | Start/stop HTTP_PROXY listener (`{action: "start"\|"stop"}`) |
| POST | `/capture-modes/system-proxy` | Apply/revert system-wide proxy (`{action: "apply"\|"revert"}`) |
| POST | `/capture-modes/tls-intercept` | Toggle HTTPS body decryption in proxy mode (`{enabled: boolean}`) |

> **TPROXY decrypt** (capture mode 5) is driven by a **separate** route under the
> AgentBridge prefix — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — not
> under `/api/tools/traffic-inspector/`. See
> [`docs/security/MITM-TPROXY-DECRYPT.md`](../security/MITM-TPROXY-DECRYPT.md).

### Sessions

| Method | Path | Description |
|--------|------|-------------|
| POST | `/sessions` | Start recording (`{name?: string}`) |
| PATCH | `/sessions/{id}` | Stop or rename (`{action: "stop"\|"rename", name?: string}`) |
| GET | `/sessions` | List all saved sessions |
| GET | `/sessions/{id}` | Session snapshot (all requests) |
| DELETE | `/sessions/{id}` | Delete session |
| GET | `/sessions/{id}/export.har` | Export session as HAR 1.2 |

### Internal ingest (D4 fallback)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/internal/ingest` | Accepts intercepted request from `server.cjs` passthrough path; requires `INSPECTOR_INTERNAL_INGEST_TOKEN` header |

Full OpenAPI schemas: `docs/reference/openapi.yaml` → tag `Traffic Inspector`.
