---
title: "MITM TPROXY Transparent Decrypt"
version: 3.8.31
lastUpdated: 2026-06-20
---

# MITM TPROXY Transparent Decrypt

TPROXY transparent decrypt is OmniRoute's **5th capture mode** for the
[Traffic Inspector](../frameworks/TRAFFIC_INSPECTOR.md) / [AgentBridge](../frameworks/AGENTBRIDGE.md)
MITM stack. It intercepts and **decrypts** local outbound HTTPS traffic on Linux
using kernel TPROXY + policy routing — **without** spoofing `/etc/hosts` and
**without** mutating OS-wide system-proxy settings. It is headless-friendly
(no DNS edits to clean up) and the firewall rules auto-flush on reboot.

Unlike the other capture modes, TPROXY needs no per-host setup: it transparently
intercepts **arbitrary** destination hosts on a target port, terminates TLS with
a leaf certificate it issues on the fly per SNI hostname, captures the decrypted
exchange, and re-encrypts the request to the original destination.

> **Linux-only, root-only, opt-in.** This mode requires Linux, a native addon
> built with a C toolchain, and the **CAP_NET_ADMIN** capability (typically root). It is gated
> behind the loopback-only AgentBridge API and disabled by default. A trusted
> MITM CA that can sign any host is a powerful capability — see [§6 Security](#6-security).

**Source:** `src/mitm/tproxy/`
**API route:** `GET / POST / DELETE /api/tools/agent-bridge/tproxy`
**Dashboard toggle:** Traffic Inspector → capture-modes toolbar → **"TPROXY Decrypt"** ⚠
**See also:** [`docs/frameworks/TRAFFIC_INSPECTOR.md`](../frameworks/TRAFFIC_INSPECTOR.md),
[`docs/frameworks/AGENTBRIDGE.md`](../frameworks/AGENTBRIDGE.md)

---

## §1 What it is and when to use it

The other four capture modes each have a limitation:

| Mode | How traffic is steered | Limitation |
|------|------------------------|------------|
| AgentBridge | `/etc/hosts` DNS spoof of a fixed host set | only the registered IDE-agent hosts |
| Custom Hosts | `/etc/hosts` DNS spoof per host | one entry per host; sudo to edit hosts |
| HTTP_PROXY | `HTTP_PROXY`/`HTTPS_PROXY` env | only apps that honor the env var |
| System-wide proxy | OS proxy settings | mutates global state; needs revert |

TPROXY transparent decrypt steers traffic at the **kernel** layer instead. It
marks new local outbound TCP connections to a target port (default `443`) in the
`mangle OUTPUT` chain, an `ip rule` reroutes the marked packets to local delivery,
and on re-entry the `mangle PREROUTING` `TPROXY` target hands them to an
**IP_TRANSPARENT** listener — which then terminates TLS and captures the plaintext.

Use it when you want to capture and decrypt traffic from a process that:

- talks to a host AgentBridge does not register, and
- does not honor `HTTP_PROXY`, and
- you do not want to disturb with a system-wide proxy change.

Because interception happens in the kernel, the originating process needs **no
configuration change** — but the process must trust the dynamic CA OmniRoute
installs (see [§4](#4-the-per-sni-dynamic-ca-and-trust-store-installer)).

---

## §2 Requirements

| Requirement | Detail |
|-------------|--------|
| **OS** | Linux only — **IP_TRANSPARENT** is a Linux-only socket option. The loader returns "unavailable" on every other platform. |
| **Privilege** | The **CAP_NET_ADMIN** capability to create the transparent socket and apply `iptables`/`ip` rules — in practice, run as root. |
| **Native addon** | A tiny N-API addon (`src/mitm/tproxy/native/transparent.c`) must be built or shipped as a prebuild. See [§3](#3-the-native-ip_transparent-addon). |
| **Kernel modules** | `iptables` with the `TPROXY`, `mangle`, and `mark` match support (validated against kernel 6.8.0). |

**Graceful degradation:** if any requirement is missing (non-Linux, no toolchain,
addon not built), the addon loader (`src/mitm/tproxy/transparentSocket.ts::loadTransparentAddon`)
returns `null` rather than throwing. The capture-mode status then reports
`available: false`, the dashboard toggle is **disabled** with the tooltip
"TPROXY decrypt requires Linux + root + the native addon", and the rest of
OmniRoute keeps working.

---

## §3 The native IP_TRANSPARENT addon

Node's `net` module cannot `setsockopt(IP_TRANSPARENT)` *before* `bind()`, which
TPROXY requires (otherwise the kernel drops the redirected packets). The addon
(`src/mitm/tproxy/native/transparent.c`, built via `binding.gyp`) is a small N-API
module exposing three functions, consumed through `transparentSocket.ts`:

| Addon function | Socket work | Used for |
|----------------|-------------|----------|
| `createTransparentListener(ip, port)` | `socket()` + **SO_REUSEADDR** + **IP_TRANSPARENT** + `bind()` + `listen()`, returns the raw fd | the transparent capture listener (Node adopts the fd via `server.listen({ fd })`) |
| `setSocketMark(fd, mark)` | `setsockopt` **SO_MARK** on an existing fd | anti-loop (mark the proxy's own sockets) |
| `connectMarked(ip, port, mark)` | `socket()` + **SO_MARK** **before** a non-blocking `connect()`, returns fd | the re-encrypted upstream forward (the SYN carries the mark) |

The original destination is read from `socket.localAddress`/`localPort` — TPROXY
preserves it, so there is no **SO_ORIGINAL_DST**/NAT lookup.

### Building the addon

```bash
npm run build:native:tproxy      # cd src/mitm/tproxy/native && node-gyp rebuild
                                 # -> native/build/Release/transparent.node
```

- During `npm run build`, `scripts/build/build-tproxy-native.mjs` runs `node-gyp
  rebuild`. It is **Linux-only and non-fatal** — a missing toolchain just leaves
  the capture mode unavailable.
- `assembleStandalone.mjs` copies `build/Release/transparent.node` into the
  standalone bundle; `transparentSocket.ts` resolves it both module-relative and
  cwd-relative (`<cwd>/src/mitm/tproxy/native/...`).
- `build/` and `prebuilds/` are git-ignored — the binary is **built, never
  committed**.

The loader probes, in priority order:
`native/build/Release/transparent.node`, then `native/prebuilds/transparent.node`
(both module-relative and under `<cwd>/src/mitm/tproxy/`).

---

## §4 The per-SNI dynamic CA and trust-store installer

The static AgentBridge MITM cert works only because AgentBridge DNS-spoofs a
**fixed** host set. TPROXY intercepts **arbitrary** hosts, so the listener must
present a valid leaf for whatever SNI the client requests.

### Dynamic CA (`src/mitm/tproxy/dynamicCert.ts`)

`DynamicCertStore` runs a local CA (built on the `selfsigned` dependency) that:

- Generates a long-lived CA via `generateMitmCa()` (CN `"OmniRoute MITM CA"`,
  10-year validity, `basicConstraints CA=true` + `keyUsage keyCertSign,cRLSign`,
  2048-bit RSA / SHA-256).
- Issues a **leaf per SNI hostname on demand** via `issueLeafCert()` (1-year
  validity, `subjectAltName` = the SNI host) and caches one `tls.SecureContext`
  per hostname.
- Exposes `createSNICallback()` for the TLS-terminating server (see [§5](#5-how-decrypt-and-capture-work)).
- Can be constructed with an `existingCa` to keep the CA stable across restarts
  (so the trust store does not need re-installing).

The CA private key **never leaves the machine**.

### Trust-store installer (`src/mitm/tproxy/caTrust.ts`)

The intercepted client must trust the dynamic CA, so starting the capture mode
installs the CA cert into the OS trust store under a **dedicated slot** —
`omniroute-tproxy-ca.crt` (constant `TPROXY_CA_CERT_NAME`) — kept separate from
the static MITM cert's slot (`omniroute-mitm.crt`) so the two never clobber each
other.

`installTproxyCa(caPem, sudoPassword?)` detects the distro's anchor directory
(in order: Debian-style first) and runs the matching refresh command:

| Anchor directory | Refresh command |
|------------------|-----------------|
| `/usr/local/share/ca-certificates` | `update-ca-certificates` |
| `/etc/ca-certificates/trust-source/anchors` | `update-ca-trust` |
| `/etc/pki/ca-trust/source/anchors` | `update-ca-trust` |
| `/etc/pki/trust/anchors` | `update-ca-certificates` |

Install stages the PEM to a temp file, then (privileged) `mkdir -p` the anchor
dir, `cp` the staged file into it, and runs the refresh command. `uninstallTproxyCa()`
removes the dedicated slot only (leaving the static MITM cert untouched) and
refreshes — a no-op on non-Linux.

All privileged commands run via `execFileWithPassword` (`src/mitm/systemCommands.ts`)
— `spawn` with **arg arrays, no shell, no string interpolation** (Hard Rule #13).
When the process is root (e.g. the VPS) the target runs directly and no password
is needed; on a non-root desktop the `sudoPassword` is passed via `sudo -S` on stdin.

> The desktop's `sudoPassword` is supplied in the POST body to authorize the
> trust-store install; it is ignored entirely when the process is root.

---

## §5 How decrypt and capture work

The pipeline (all under `src/mitm/tproxy/`):

```
local app  ──TCP/443──▶  mangle OUTPUT marks the conn (fwmark)
                          ip rule → local route table → lo
                          mangle PREROUTING TPROXY → IP_TRANSPARENT listener (port 8443)
                              │  captureMode.ts: reads orig dest from socket.localAddress
                              ▼
                          tlsCapture.ts:
                            1. TLS-terminate the CLIENT with a per-SNI leaf (dynamicCert)
                            2. internal http.Server parses the decrypted plaintext
                            3. capture → globalTrafficBuffer.push() with source: "tproxy"
                               (sanitizeHeaders + maskSecret applied)
                            4. forward RE-encrypted to the original destination
                               over a bypass-marked socket (connectMarked, anti-loop)
                              │
                              ▼
                          original upstream (api.example.com)
```

- **TLS termination** (`createTlsCaptureServer`): wraps the raw intercepted
  socket in a server-side `tls.TLSSocket` using the dynamic CA's SNI callback,
  then hands the decrypted stream to an internal `http.Server` (the standard MITM
  termination trick). Socket lifetimes are bounded by `MITM_IDLE_TIMEOUT_MS` so a
  hung tunnel cannot exhaust file descriptors.
- **Capture** (`handleDecryptedRequest`): pushes an `InterceptedRequest` with
  `source: "tproxy"`, status starting `"in-flight"`, headers run through
  `sanitizeHeaders()` and bodies through `maskSecret()` before they enter the
  buffer. The entry is then updated with the response, sizes, and latency.
- **Re-encrypted forward** (`createForward` / `realForward`): re-encrypts to the
  original destination. `rejectUnauthorized` defaults to **`true`** (secure by
  default) — the upstream cert is verified against the SNI/Host the client
  requested, so the proxy rejects exactly what the original client would.

### Anti-loop (SO_MARK)

Because the rules mark new local outbound connections, the proxy's **own**
re-encrypted forward would normally be re-intercepted — an infinite loop. The
forward path defends against this with a bypass socket mark (**SO_MARK**):

- `realForward` opens its upstream socket via `connectMarked(ip, port, DEFAULT_BYPASS_MARK)`
  — `DEFAULT_BYPASS_MARK = 0x539` — which sets the **SO_MARK** **before** `connect()`,
  so the forward's SYN carries the bypass mark.
- The `mangle OUTPUT` rule excludes connections already carrying the bypass mark
  (`-m mark ! --mark <bypassMark>`), so the proxy's forward is **not** re-marked
  and does not re-enter TPROXY.

> Implementation note: the bypass-marked socket must be installed on the agent's
> `createConnection` (`https.request({ createConnection })` is silently ignored
> when an agent is present), or the forward would open an unmarked socket and the
> loop would return. This was the e2e-validated anti-loop fix.

---

## §6 Security

| Control | Detail |
|---------|--------|
| **Loopback-only API** | `/api/tools/agent-bridge/tproxy` is covered by the `/api/tools/agent-bridge/` prefix in `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`). Loopback enforcement runs **before** auth (Hard Rules #15 + #17) — a leaked JWT over a tunnel cannot start TPROXY capture, which applies `iptables` rules and installs a trust-store CA via child processes. |
| **Dedicated CA slot** | The dynamic CA installs to `omniroute-tproxy-ca.crt`, never clobbering the static MITM cert. |
| **CA key never leaves the host** | `DynamicCertStore` holds the CA key in memory; it is not exported. |
| **Secret masking** | `maskSecret()` on request/response bodies and `sanitizeHeaders()` on headers run **before** `globalTrafficBuffer.push()`. |
| **No shell interpolation** | All `iptables`/`ip`/trust-store commands run via `execFile`/`execFileWithPassword` with arg arrays (Hard Rule #13). |
| **Upstream cert verification** | The re-encrypted forward verifies the upstream cert by default (`rejectUnauthorized: true`). |
| **Error sanitization** | The route's error responses go through `sanitizeErrorMessage()` (Hard Rule #12). |

**The MITM CA is a powerful capability.** A CA trusted by the OS that can sign any
host means anything OmniRoute intercepts can be decrypted. It is gated behind the
explicit, local-only TPROXY capture mode, off by default, and the trust-store
entry is removed when you stop the mode.

---

## §7 Transactional firewall apply / revert

A crash must never leave a `mangle` rule or stale route behind. The command builder
(`src/mitm/tproxy/commands.ts`) and runner (`src/mitm/tproxy/setup.ts`) guarantee
**revert is the exact inverse of apply, in reverse order**.

`applyTproxy(cfg)` runs the apply commands in order; on **any** failure it runs a
best-effort full `revertTproxy(cfg)` and rethrows — so the firewall is either
fully applied or fully reverted, never half-applied. `revertTproxy(cfg)` runs the
inverse commands in reverse order and swallows failures (idempotent — safe to call
unconditionally, e.g. from the AgentBridge `repairMitm()` cleanup).

`validateTproxyConfig(cfg)` runs before any command: ports must be `1–65535`,
`mark`/`routeTable`/`bypassMark` must be positive integers, and `bypassMark` must
differ from `mark` (anti-loop).

### Apply commands (in order)

```bash
ip rule add fwmark <mark> lookup <routeTable>
ip route add local 0.0.0.0/0 dev lo table <routeTable>
iptables -t mangle -A OUTPUT -p tcp --dport <dport> -m mark ! --mark <bypassMark> -j MARK --set-mark <mark>
iptables -t mangle -A PREROUTING -p tcp --dport <dport> -m mark --mark <mark> -j TPROXY --on-port <onPort> --tproxy-mark <mark>
```

Revert deletes them in reverse: `PREROUTING -D`, `OUTPUT -D`, `ip route del`, `ip rule del`.

> The recipe is **OUTPUT-based** because the MITM use case is *local* outbound
> traffic (apps on the same host), which TPROXY in `PREROUTING` alone does not
> see — `PREROUTING` only sees forwarded traffic. The `OUTPUT` chain marks new
> local connections, the `ip rule` reroutes them to local delivery (`lo`), and
> `PREROUTING` then assigns them to the transparent listener.

---

## §8 Configuration

The start request (`POST /api/tools/agent-bridge/tproxy`) accepts the following
fields, validated by `StartTproxyBodySchema` (`tproxy/route.ts`). All are optional
and fall back to their defaults:

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| **dport** | int (1–65535) | `443` | Destination TCP port to transparently intercept |
| **mark** | int (≥1) | `0x2333` | Firewall mark set on `OUTPUT`, matched by the `ip rule` + `PREROUTING` |
| **onPort** | int (1–65535) | `8443` | Port the transparent (**IP_TRANSPARENT**) listener binds |
| **routeTable** | int (≥1) | `233` | Policy-routing table id holding the `local 0.0.0.0/0` route |
| **bypassMark** | int (≥1, ≠ `mark`) | `0x539` | The bypass socket mark (**SO_MARK**) the proxy sets on its own upstream conns; excluded in `OUTPUT` (anti-loop) |
| **sudoPassword** | string | — | Non-root desktops only: authorizes the trust-store install; ignored when root |

There are **no environment variables** for TPROXY — all configuration is via the
POST body or the defaults above.

---

## §9 Enabling from the Traffic Inspector

1. Open the **Traffic Inspector** (`/dashboard/tools/traffic-inspector`).
2. In the capture-modes toolbar, find the **"TPROXY Decrypt"** ⚠ button
   (`src/app/(dashboard)/dashboard/tools/traffic-inspector/components/CaptureModesToolbar.tsx`).
   - If it is **disabled** with the tooltip "TPROXY decrypt requires Linux + root +
     the native addon", the native addon is unavailable on this host (non-Linux,
     no toolchain, or addon not built). See [§2](#2-requirements) and [§3](#3-the-native-ip_transparent-addon).
3. Click the button. It calls `POST /api/tools/agent-bridge/tproxy` via
   `startTproxyCaptureMode()` (`src/lib/inspector/tproxyCaptureApi.ts`), which:
   builds the dynamic CA, opens the transparent listener, applies the firewall
   rules, and installs the CA in the OS trust store.
4. When running, the toggle turns amber and shows the live intercept count
   (`· <interceptCount>`). Intercepted requests appear in the request list with
   `source: "tproxy"`.
5. Click again to stop — `DELETE /api/tools/agent-bridge/tproxy` via
   `stopTproxyCaptureMode()` closes the listener, uninstalls the CA, and reverts
   the firewall rules.

The capture-mode status (running / available / intercept count / listener port) comes
from `GET /api/tools/agent-bridge/tproxy` (`getCaptureStatus()` in
`src/mitm/tproxy/captureManager.ts`). Only **one** TPROXY session runs at a time —
starting a second rejects with "TPROXY capture mode is already running".

---

## §10 Troubleshooting

### Toggle is disabled

The native addon is not loadable. Confirm: you are on Linux, you built the addon
(`npm run build:native:tproxy`), and the process can load `transparent.node`.
`isTransparentSocketAvailable()` gates the toggle; `GET /api/tools/agent-bridge/tproxy`
returns `available: false` when the addon is missing.

### Nothing is captured

- Confirm the intercepted process actually connects to the configured `dport`
  (default `443`).
- Confirm the process trusts the dynamic CA. The CA is installed under
  `omniroute-tproxy-ca.crt`; apps with their own trust store (Firefox/Chrome NSS)
  may need the cert added there too.
- Run the AgentBridge **Diagnose** self-test (see
  [`AGENTBRIDGE.md`](../frameworks/AGENTBRIDGE.md)) for cert-trusted / server
  health checks.

### Stale firewall rules after a crash

`revertTproxy()` is the exact inverse of apply and is idempotent. Stopping the
mode reverts the rules; if OmniRoute was killed mid-session, use the AgentBridge
**Repair** action (`POST /api/tools/agent-bridge/repair`) to undo orphaned system
state (DNS spoof, root CA, system proxy). The TPROXY `mangle` rules and route also
flush automatically on reboot.

### Infinite loop / the proxy intercepts its own forward

This is the anti-loop case. Confirm `bypassMark` differs from `mark` (validation
enforces this) and that the forward uses `connectMarked` (it does in `realForward`).
See [§5 Anti-loop](#anti-loop-so_mark).

---

## §11 Source map

| File | Responsibility |
|------|----------------|
| `src/mitm/tproxy/commands.ts` | Pure `iptables`/`ip` apply + revert command builder; `validateTproxyConfig` |
| `src/mitm/tproxy/setup.ts` | Transactional `applyTproxy` / `revertTproxy` runner (rollback on failure) |
| `src/mitm/tproxy/transparentSocket.ts` | Native-addon loader (`loadTransparentAddon`), `createTransparentListenerFd`, `connectMarked`, `setSocketMark`, `isTransparentSocketAvailable` |
| `src/mitm/tproxy/native/transparent.c` | N-API addon: `createTransparentListener` (IP_TRANSPARENT), `setSocketMark`, `connectMarked` |
| `src/mitm/tproxy/native/binding.gyp` | node-gyp build manifest |
| `src/mitm/tproxy/dynamicCert.ts` | `DynamicCertStore` — per-SNI dynamic CA + leaf cache |
| `src/mitm/tproxy/caTrust.ts` | OS trust-store install/uninstall (`installTproxyCa` / `uninstallTproxyCa`, dedicated slot) |
| `src/mitm/tproxy/tlsCapture.ts` | TLS-terminating decrypt engine + re-encrypted anti-loop forward |
| `src/mitm/tproxy/captureMode.ts` | Transparent-listener orchestration; reads orig dest from `socket.localAddress` |
| `src/mitm/tproxy/captureManager.ts` | Singleton lifecycle: `startCaptureMode` / `stopCaptureMode` / `getCaptureStatus` |
| `src/app/api/tools/agent-bridge/tproxy/route.ts` | `GET` / `POST` / `DELETE` route (LOCAL_ONLY) |
| `src/lib/inspector/tproxyCaptureApi.ts` | Client fetch helpers (`fetchTproxyStatus` / `startTproxyCaptureMode` / `stopTproxyCaptureMode`) |
