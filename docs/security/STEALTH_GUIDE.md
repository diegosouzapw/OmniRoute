---
title: "Stealth Guide"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Stealth Guide

> **Source of truth:** `open-sse/utils/tlsClient.ts`, `open-sse/services/{chatgptTlsClient,claudeCodeCCH,claudeCodeFingerprint,claudeCodeObfuscation,claudeCodeCompatible,antigravityObfuscation}.ts`, `open-sse/config/cliFingerprints.ts`, `src/mitm/`
> **Last updated:** 2026-05-13 — v3.8.0
> **Audience:** Engineers maintaining provider-specific stealth integrations.

OmniRoute integrates with providers whose edges actively fingerprint non-official clients (TLS JA3/JA4, header ordering, JSON body shape, integrity tokens). This page documents the stealth surfaces OmniRoute exposes and where they are implemented.

## Legal and Ethical Notice

Stealth features exist so OmniRoute can act as a compatibility layer between user-owned official accounts (Claude Code CLI, ChatGPT Desktop/Web, Antigravity, Cursor, etc.) and OmniRoute's unified API. They are **not** for evading fraud detection, sharing credentials, or violating provider Terms of Service. The maintainers expect operators to comply with the upstream ToS they signed when creating accounts.

---

## TLS Fingerprinting Layer

### `open-sse/utils/tlsClient.ts` — wreq-js (Chrome 124)

Lazy-loaded `wreq-js` session that impersonates **Chrome 124 on macOS**. Used as a generic JA3/JA4 wrapper for upstreams behind Cloudflare. Falls back to native fetch when `wreq-js` is not installed (`available = false`).

- Singleton session: `browser: "chrome_124", os: "macos"`
- Proxy resolution (priority): `HTTPS_PROXY` → `HTTP_PROXY` → `ALL_PROXY` (also lower-case)
- Timeout: `TLS_CLIENT_TIMEOUT_MS` (inherits from `FETCH_TIMEOUT_MS`, default 600000)
- `wreq-js` Response is fetch-compatible (`headers`, `text()`, `json()`, `clone()`, `body`).

### `open-sse/services/chatgptTlsClient.ts` — tls-client-node (Firefox 148)

Dedicated TLS impersonator for `chatgpt.com`. ChatGPT's Cloudflare config pins `cf_clearance` to JA3/JA4 + HTTP/2 SETTINGS frame ordering — undici's handshake gets `cf-mitigated: challenge` even with valid cookies.

- Profile: `firefox_148` (must match the Firefox 148 `User-Agent` sent)
- Mode: `runtimeMode: "native"` (koffi-loaded shared library; avoids managed sidecar HTTP)
- `withRandomTLSExtensionOrder: true`
- `tlsFetchChatGpt(url, options)` supports streaming (writes body to temp file, tailed as `ReadableStream`)
- Hang detection: `raceWithTimeout` + `TlsClientHangError` triggers `resetClientCache()` so the next call respawns the binding
- Proxy resolution (priority): per-call `proxyUrl` → `OMNIROUTE_TLS_PROXY_URL` → `HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY` (the native binding does **not** read these envs itself; it must be threaded through)
- Errors: `TlsClientUnavailableError` (binary missing), `TlsClientHangError` (binding deadlocked)

---

## Claude Code Stealth Bundle

When `cliCompatMode` is on, OmniRoute reshapes outgoing Claude requests so they are indistinguishable from `claude-cli` traffic. Three modules collaborate:

### `claudeCodeFingerprint.ts`

Computes the 3-char `cc_version` fingerprint embedded in the billing header:

```
SHA256(SALT + msg[4] + msg[7] + msg[20] + version)[:3]
```

- `FINGERPRINT_SALT = "59cf53e54c78"` (hardcoded; matches official client)
- Inputs: chars at index 4, 7, 20 of the first user message text + version string
- Output: 3-char hex prefix

### `claudeCodeCCH.ts` (Client Content Hash)

Server-side integrity check the official Claude Code CLI computes via Bun/Zig. OmniRoute reimplements with `xxhash-wasm`:

1. Serialize body with `cch=00000;` placeholder
2. `xxhash64(bytes, seed) & 0xFFFFF`
3. Zero-padded 5-char lowercase hex
4. Replace `cch=00000;` with the computed token

Constants:

- Seed: `0x6e52736ac806831e`
- Pattern: `/\bcch=([0-9a-f]{5});/`

### `claudeCodeObfuscation.ts`

Inserts a Unicode **zero-width joiner** (`U+200D`) after the first character of "sensitive" client names so upstream filters cannot grep them. Default word list:

```
opencode, open-code, cline, roo-cline, roo_cline, cursor, windsurf,
aider, continue.dev, copilot, avante, codecompanion
```

Applied to: `system` blocks, all `messages[].content`, and `tools[].description` / `tools[].function.description`. Operator-overridable via `setSensitiveWords()`.

### `claudeCodeCompatible.ts` — `anthropic-compatible-cc-*` providers

For third-party Anthropic relays that only accept "real Claude Code" traffic:

- `CLAUDE_CODE_COMPATIBLE_USER_AGENT = "claude-cli/2.1.137 (external, sdk-cli)"`
- `CLAUDE_CODE_COMPATIBLE_STAINLESS_PACKAGE_VERSION = "0.81.0"`
- `CLAUDE_CODE_COMPATIBLE_STAINLESS_RUNTIME_VERSION = "v24.3.0"`
- `anthropic-beta = "claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24"`
- `CONTEXT_1M_BETA_HEADER = "context-1m-2025-08-07"` (Opus/Sonnet 4.x family)
- Default path: `/v1/messages?beta=true`

Sister modules in the same bundle:

- `claudeCodeConstraints.ts` — temperature + cache-control rules
- `claudeCodeToolRemapper.ts` — tool-name remapping
- `claudeCodeExtraRemap.ts` — extra payload normalization

---

## Antigravity Stealth

### `antigravityObfuscation.ts`

Same zero-width-joiner trick as Claude Code, but with an expanded word list that also masks: `claude code`, `claude-code`, `kilo code`, `kilocode`, **`omniroute`**. Mirrors ZeroGravity's `ZEROGRAVITY_SENSITIVE_WORDS` and CLIProxyAPI's cloak system.

### `antigravityHeaderScrub.ts`

Strips Stainless SDK markers (`x-stainless-lang`, `x-stainless-package-version`, `x-stainless-os`, `x-stainless-arch`, `x-stainless-runtime`, `x-stainless-runtime-version`, `x-stainless-timeout`, `x-stainless-retry-count`, `x-stainless-helper-method`) before forwarding.

### ⚠️ Risk: `ANTIGRAVITY_CREDITS=always` (account-ban hot spot)

`ANTIGRAVITY_CREDITS=always` (consumed by `open-sse/executors/antigravity.ts`) routes **every** request through Antigravity AI Credit Overages (paid Google credits) instead of letting Google's free-tier quota gate things. This is documented as a feature, but it is **the single most common ToS-violation report we see** — multiple Google Ultra accounts have been banned with `403 / "service disabled for ToS violation" / insufficient_quota` after running for a few hours with `=always`.

The upstream enforcement is on **Google's side**, not anything OmniRoute can prevent. The env var name and the existing docs make it sound like a safe knob to flip; it isn't.

**Why this draws abuse detection more aggressively than free-tier-only usage:**

- Sustained automated spend on a single Google account flags differently than free-tier hits-quota-and-stops.
- Credit overages have no rate ceiling, so a misconfigured client can burn through several hundred USD in minutes and look like API-key resale or bot traffic.
- Multiple OmniRoute users hitting overage credits in parallel from the same external IP compounds the signal.

**Recommended posture:**

1. **Default to `ANTIGRAVITY_CREDITS=retry`** — overages are used only when free-tier returns 429, not on every request. This is the safer of the two non-zero modes.
2. **Spread load across providers via Auto-Combo** (`model: "auto"` or `kr/glm/etc`-combo) instead of saturating a single Antigravity account.
3. **Set per-connection RPM limits** in the Antigravity provider's edit page (Dashboard → Providers → Antigravity → connection → rate limit). 30–60 RPM is a defensible upper bound for sustained use.
4. **Use distinct upstream IPs** per Antigravity account when possible (residential proxies aimed at the same account from many users compounds the abuse signal).
5. **If banned**: appeal via `support.google.com` → "Restore Workspace/Account access" with the exact `quota_exceeded` / `service disabled` response body Google sent. Restoration is not guaranteed.

This warning is also surfaced inline in the dashboard near the Antigravity provider edit screen when `ANTIGRAVITY_CREDITS` is set to `always` (or will be in v3.8.0; tracked separately).

Touch points:

- `open-sse/executors/antigravity.ts` — reads `process.env.ANTIGRAVITY_CREDITS`
- `src/lib/oauth/providers/antigravity.ts` — credential plumbing
- Original incident report: Discussion [#1183](https://github.com/diegosouzapw/OmniRoute/discussions/1183)

---

## CLI Fingerprint Registry — `open-sse/config/cliFingerprints.ts`

Per-provider table that pins **exact** header ordering and JSON body field ordering captured from mitmproxy traces of the official CLIs. Currently registered: `codex`, `claude`, plus runtime-derived profiles in `providerHeaderProfiles.ts` for `antigravity`, `qwen`, `github`.

```ts
interface CliFingerprint {
  headerOrder: string[]; // case-sensitive
  bodyFieldOrder: string[]; // top-level JSON keys
  userAgent?: string | (() => string);
  extraHeaders?: Record<string, string>;
}
```

Toggle per provider via env (see below). When disabled, headers/body keys appear in whatever order Node/JSON gave them — easy to fingerprint.

---

## MITM Proxy (Antigravity, Linux/macOS/Windows)

For CLIs whose binaries cannot be redirected via `OPENAI_BASE_URL`, OmniRoute runs a local TLS-terminating proxy. Endpoints live under `src/app/api/cli-tools/antigravity-mitm/`.

| Method | Endpoint                                | Purpose                                          |
| ------ | --------------------------------------- | ------------------------------------------------ |
| GET    | `/api/cli-tools/antigravity-mitm`       | Status — running, pid, dnsConfigured, certExists |
| POST   | `/api/cli-tools/antigravity-mitm`       | Start MITM (requires `apiKey` + `sudoPassword`)  |
| DELETE | `/api/cli-tools/antigravity-mitm`       | Stop MITM                                        |
| GET    | `/api/cli-tools/antigravity-mitm/alias` | List model aliases                               |
| PUT    | `/api/cli-tools/antigravity-mitm/alias` | Save model aliases for a tool                    |

Target intercepted host: **`daily-cloudcode-pa.googleapis.com`** (Antigravity's upstream).

### Start sequence (`src/mitm/manager.ts::startMitm`)

1. Generate self-signed cert via `selfsigned` (RSA-2048, SHA-256, 1y) — `cert/generate.ts`
2. Install cert to system trust store — `cert/install.ts`
3. Add hosts entry `127.0.0.1 daily-cloudcode-pa.googleapis.com` — `dns/dnsConfig.ts`
4. Spawn `src/mitm/server.cjs` with `ROUTER_API_KEY` + `MITM_LOCAL_PORT` (default `443`)
5. Persist PID to `<DATA_DIR>/mitm/.mitm.pid`

### Linux dynamic trust-store detection — `cert/install.ts`

`getLinuxCertConfig()` walks a priority list and picks the first existing directory:

| Distro family            | Directory                                   | Update command           |
| ------------------------ | ------------------------------------------- | ------------------------ |
| Debian / Ubuntu          | `/usr/local/share/ca-certificates`          | `update-ca-certificates` |
| Arch / CachyOS / Manjaro | `/etc/ca-certificates/trust-source/anchors` | `update-ca-trust`        |
| Fedora / RHEL / CentOS   | `/etc/pki/ca-trust/source/anchors`          | `update-ca-trust`        |
| openSUSE                 | `/etc/pki/trust/anchors`                    | `update-ca-certificates` |

Cert filename: `omniroute-mitm.crt`. Fingerprint match via `getCertFingerprint()` (SHA-1 of DER).

Additionally, `updateNssDatabases()` installs into per-user NSS DBs when `certutil` is available: `~/.pki/nssdb`, `~/snap/chromium/.../nssdb`, all Firefox profiles (including snap), under the nickname **`OmniRoute MITM Root CA`**.

### macOS / Windows

- **macOS:** `security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain`
- **Windows:** elevated PowerShell → `certutil -addstore Root`

### Auth

All MITM endpoints require management auth (`requireCliToolsAuth`). The sudo password is cached in module scope (never `globalThis`) and cleared on `stopMitm()`.

---

## User-Agent Overrides — env vars (`.env.example` section 12)

| Variable                 | Default                                       |
| ------------------------ | --------------------------------------------- |
| `CLAUDE_USER_AGENT`      | `claude-cli/2.1.137 (external, cli)`          |
| `CODEX_USER_AGENT`       | `codex-cli/0.130.0 (Windows 10.0.26200; x64)` |
| `GITHUB_USER_AGENT`      | `GitHubCopilotChat/0.45.1`                    |
| `ANTIGRAVITY_USER_AGENT` | `antigravity/1.23.2 darwin/arm64`             |
| `KIRO_USER_AGENT`        | `AWS-SDK-JS/3.0.0 kiro-ide/1.0.0`             |
| `QODER_USER_AGENT`       | `Qoder-Cli`                                   |
| `QWEN_USER_AGENT`        | `QwenCode/0.15.9 (linux; x64)`                |
| `CURSOR_USER_AGENT`      | `Cursor/3.3`                                  |
| `GEMINI_CLI_USER_AGENT`  | `google-api-nodejs-client/10.3.0`             |

Consumed by `open-sse/executors/base.ts::buildHeaders()` via dynamic lookup. **Bump these when providers release new CLI versions** — stale UA strings start getting rejected as outdated clients.

## CLI Compatibility Mode Toggles (`.env.example` section 13)

| Variable                   | Effect                          |
| -------------------------- | ------------------------------- |
| `CLI_COMPAT_CODEX=1`       | Codex fingerprint               |
| `CLI_COMPAT_CLAUDE=1`      | claude-cli fingerprint          |
| `CLI_COMPAT_GITHUB=1`      | GitHub Copilot Chat fingerprint |
| `CLI_COMPAT_ANTIGRAVITY=1` | Antigravity fingerprint         |
| `CLI_COMPAT_KIRO=1`        | Kiro                            |
| `CLI_COMPAT_CURSOR=1`      | Cursor                          |
| `CLI_COMPAT_KIMI_CODING=1` | Kimi Coding                     |
| `CLI_COMPAT_KILOCODE=1`    | KiloCode                        |
| `CLI_COMPAT_CLINE=1`       | Cline                           |
| `CLI_COMPAT_QWEN=1`        | Qwen Code                       |
| `CLI_COMPAT_ALL=1`         | Enable all of the above         |

The provider IP is **always preserved** — the toggle only reshapes the request wire image, it does not switch IP egress.

---

## Inbound Header Sanitization

OmniRoute scrubs inbound client headers before forwarding so a request that arrives from Cursor doesn't leak `User-Agent: Cursor/X.Y.Z` to a Claude upstream. See `src/shared/constants/upstreamHeaders.ts` for the denylist, kept in lockstep with the Zod schemas and unit tests.

---

## Updating Fingerprints When a Provider Rotates

1. Capture official CLI traffic with `mitmproxy` (TLS interception + dump)
2. Extract JA3/JA4 and the literal header order
3. Update the relevant `CLI_FINGERPRINTS[...]` entry
4. Bump matching `*_USER_AGENT` default in `.env.example`
5. If TLS handshake itself changed: update `chatgptTlsClient.ts::CHATGPT_PROFILE` or wreq-js `browser:` option
6. Run `chatgptTlsClient.test.ts` and a manual canary against the live provider
7. Ship in a patch release; document in `CHANGELOG.md`

---

## Tests

- `open-sse/services/__tests__/chatgptTlsClient.test.ts` — proxy resolution priority, abort handling, hang recovery
- `tests/unit/anthropic-cache-fingerprint.test.ts` — fingerprint determinism
- `tests/unit/chatgpt-web.test.ts` — end-to-end stealth path for ChatGPT

---

## See Also

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — what happens when a stealth path gets a `403`
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md)
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — full env reference
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — operator view of the MITM workflow
