# 📖 Setup Guide — OmniRoute

> Complete setup reference for OmniRoute. For the quick version, see the [Quick Start in README](../README.md#-quick-start).

## Table of Contents

- [Install Methods](#install-methods)
- [CLI Tool Configuration](#cli-tool-configuration)
- [Protocol Setup (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Timeout Configuration](#timeout-configuration)
- [Split-Port Mode](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Uninstalling](#uninstalling)

---

## Install Methods

### npm (recommended)

```bash
npm install -g omniroute
omniroute
```

Dashboard opens at `http://localhost:20128` and API base URL is `http://localhost:20128/v1`.

### pnpm

```bash
pnpm install -g omniroute
pnpm approve-builds -g   # Select all packages → approve
omniroute
```

> **pnpm users:** `pnpm approve-builds -g` is required to enable native build scripts for `better-sqlite3` and `@swc/core`.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

The [AUR package](https://aur.archlinux.org/packages/omniroute-bin) installs OmniRoute and provides a systemd user service.

### From Source

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

### Docker

See the [Docker Guide](DOCKER_GUIDE.md) for complete Docker setup including Compose profiles and Caddy HTTPS.

### CLI Options

| Command                 | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `omniroute`             | Start server (`PORT=20128`, API and dashboard on same port) |
| `omniroute setup`       | Guided CLI onboarding for password and first provider       |
| `omniroute doctor`      | Run local health checks without starting the server         |
| `omniroute providers`   | Discover, list, validate, and test providers from CLI       |
| `omniroute --port 3000` | Set canonical/API port to 3000                              |
| `omniroute --mcp`       | Start MCP server (stdio transport)                          |
| `omniroute --no-open`   | Don't auto-open browser                                     |
| `omniroute --help`      | Show help                                                   |

Headless setup can be scripted with flags or environment variables:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Run local diagnostics without opening the dashboard:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Manage providers from SSH or scripts without opening the dashboard:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## CLI Tool Configuration

### 1) Connect Providers and Create API Key

1. Open Dashboard → `Providers` and connect at least one provider (OAuth or API key).
2. Open Dashboard → `Endpoints` and create an API key.
3. (Optional) Open Dashboard → `Combos` and set your fallback chain.

### 2) Point Your Coding Tool

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Works with Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode, and OpenAI-compatible SDKs.

For detailed per-tool configuration (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot, and more), see the dedicated **[CLI Tools Guide](CLI-TOOLS.md)**.

---

## Protocol Setup (MCP + A2A)

### MCP Setup (Model Context Protocol)

Start MCP transport in stdio mode:

```bash
omniroute --mcp
```

Recommended validation flow:

```bash
# 1. Start MCP server
omniroute --mcp

# 2. From your MCP client, call:
omniroute_get_health        # Should return system health
omniroute_list_combos       # Should return active combos

# 3. Or run the full E2E suite:
npm run test:protocols:e2e
```

#### MCP Client Configuration

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Add to your MCP settings:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**Full MCP documentation:** [MCP Server README](../open-sse/mcp-server/README.md) — 37 tools, IDE configs, Python/TS/Go clients.

### A2A Setup (Agent-to-Agent Protocol)

Verify the Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Send a task:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Full A2A documentation:** [A2A Server README](../src/lib/a2a/README.md) — JSON-RPC 2.0, skills, streaming, task lifecycle.

---

## Timeout Configuration

### Basic Timeouts

For most deployments, you only need these two variables:

| Variable                 | Default                       | Purpose                                                                                                                                      |
| ------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | Shared baseline for upstream response-start timeout, hidden Undici timeouts, TLS fingerprint requests, and API bridge request/proxy timeouts |
| `STREAM_IDLE_TIMEOUT_MS` | inherits `REQUEST_TIMEOUT_MS` | Maximum gap between streaming chunks before OmniRoute aborts the SSE stream                                                                  |

Backward compatibility is preserved: existing `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS`, and other per-layer timeout vars still work and override the shared baseline.

### Provider-Specific Notes

For Claude Code-compatible upstreams (`anthropic-compatible-cc-*`), OmniRoute derives the outbound `X-Stainless-Timeout` header from the resolved fetch timeout so provider-side read timeouts stay aligned with your env configuration.

For third-party Claude Code-compatible reverse proxies, OmniRoute keeps the default `anthropic-beta` set conservative and, when `Client Cache Control` is left on `Auto`, only forwards client-provided `cache_control` markers.

### Advanced Timeout Overrides

| Variable                                 | Default                                    | Purpose                                                              |
| ---------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | inherits `REQUEST_TIMEOUT_MS`              | Upstream response-start timeout used until response headers arrive   |
| `FETCH_HEADERS_TIMEOUT_MS`               | inherits `FETCH_TIMEOUT_MS`                | Undici time limit for receiving upstream response headers            |
| `FETCH_BODY_TIMEOUT_MS`                  | inherits `FETCH_TIMEOUT_MS`                | Undici time limit between upstream body chunks (`0` disables it)     |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP connect timeout                                           |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici idle keep-alive socket timeout                                |
| `TLS_CLIENT_TIMEOUT_MS`                  | inherits `FETCH_TIMEOUT_MS`                | Timeout for TLS fingerprint requests made through `wreq-js`          |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | inherits `REQUEST_TIMEOUT_MS` or `30000`   | Timeout for `/v1` proxy forwarding from API port to dashboard port   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Incoming request timeout on the API bridge server                    |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Incoming header timeout on the API bridge server                     |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Keep-alive timeout on the API bridge server                          |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Socket inactivity timeout on the API bridge server (`0` disables it) |

> **Note:** For streaming requests, `FETCH_TIMEOUT_MS` only covers connection setup / waiting for the first upstream response. Once the stream is active, OmniRoute will only abort on an actual stall (`STREAM_IDLE_TIMEOUT_MS`) or Undici body inactivity (`FETCH_BODY_TIMEOUT_MS`).

### Reverse Proxy Compatibility

If you run OmniRoute behind Nginx, Caddy, Cloudflare, or another reverse proxy, make sure the proxy timeouts are also higher than your OmniRoute stream/fetch timeouts.

---

## Split-Port Mode

Run API and Dashboard on separate ports for advanced scenarios (reverse proxy, container networking):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Void Linux (xbps-src) Template

For Void Linux users, you can build a native package using `xbps-src`. Save this block as `srcpkgs/omniroute/template`:

```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.4.1
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## Uninstalling

| Command                  | Action                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `npm run uninstall`      | Removes the system app but **keeps your DB and configurations** in `~/.omniroute`.  |
| `npm run uninstall:full` | Removes the app AND permanently **erases all configurations, keys, and databases**. |

> For detailed uninstall instructions across all methods, see [UNINSTALL.md](UNINSTALL.md).
