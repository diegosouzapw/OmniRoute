# 📖 Setup Guide — OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute 的完整设置参考。有关快速版本，请参阅 [README 中的快速入门](../README.md#-quick-start)。

## 目录

- [安装方式](#install-methods)
- [CLI 工具配置](#cli-tool-configuration)
- [协议设置（MCP + A2A）](#protocol-setup-mcp--a2a)
- [超时配置](#timeout-configuration)
- [分端口模式](#split-port-mode)
- [Void Linux（xbps-src）](#void-linux-xbps-src-template)
- [卸载](#uninstalling)

---

## 安装方式

### npm（推荐）

```bash
npm install -g omniroute
omniroute
```

仪表板将在 `http://localhost:20128` 打开，API 基础 URL 为 `http://localhost:20128/v1`。

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm 用户：**必须使用 `--allow-build` 标志，以启用 `better-sqlite3` 和 `@swc/core` 的原生构建脚本。pnpm v11 不支持对全局安装使用 `pnpm approve-builds -g` 命令。

### Arch Linux（AUR）

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR 软件包](https://aur.archlinux.org/packages/omniroute-bin)会安装 OmniRoute，并提供 systemd 用户服务。

### 从源代码安装

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows 注意事项：**默认情况下，如果旧版 `%USERPROFILE%\.omniroute` 目录不存在，OmniRoute 将使用 `%APPDATA%\omniroute`。可设置 `DATA_DIR` 以选择其他数据目录位置。

> **注意：**首次运行时，`npm install` 会根据 `.env.example` 自动生成 `.env`。后续安装不会覆盖现有的 `.env`，因此自定义设置会被保留。如需重新生成，请先删除 `.env`，然后再次运行。

### Docker

有关完整的 Docker 设置（包括 Compose 配置文件和 Caddy HTTPS），请参阅 [Docker 指南](./DOCKER_GUIDE.md)。

### 桌面应用（Electron）

OmniRoute 提供了一个基于 Electron 41 + electron-builder 26.10 构建的桌面封装程序。可用脚本（工作区根目录）：

```bash
npm run electron:dev          # 运行支持热重载的桌面应用
npm run electron:build        # 为当前操作系统构建（自动检测）
npm run electron:build:win    # Windows 安装程序（NSIS + 便携版）
npm run electron:build:mac    # macOS（dmg + zip，arm64+x64）
npm run electron:build:linux  # Linux（AppImage + deb + rpm）
npm run electron:smoke:packaged  # 对打包后的构建执行冒烟测试
```

桌面安装程序的发行版本会附加到 GitHub Releases 中。有关 Electron 的完整深入指南（签名、IPC 桥接、发行版），请参阅 [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _（在后续阶段创建）_。

### 无头服务器（CI/自动化）

对于无人值守设置（Docker、Kubernetes、CI），请使用：

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

与环境变量（`INITIAL_PASSWORD`、`OMNIROUTE_WS_BRIDGE_SECRET` 等）结合使用，可通过脚本完整启动 OmniRoute 实例。

### CLI 选项

| 命令                    | 说明                                                   |
| ----------------------- | ------------------------------------------------------ |
| `omniroute`             | 启动服务器（`PORT=20128`，API 和仪表板使用同一端口）   |
| `omniroute setup`       | 通过 CLI 引导设置密码和首个提供者                      |
| `omniroute doctor`      | 在不启动服务器的情况下运行本地健康检查                 |
| `omniroute providers`   | 通过 CLI 发现、列出、验证和测试提供者                  |
| `omniroute config`      | CLI 工具配置——列出、获取、设置和验证配置               |
| `omniroute status`      | 离线状态仪表板——版本、数据库、工具和配置               |
| `omniroute logs`        | 从 API 流式获取使用日志（支持 `--follow`）             |
| `omniroute update`      | 检查或应用 OmniRoute 更新                              |
| `omniroute provider`    | 管理提供者连接——添加、列出、移除、测试和设置默认提供者 |
| `omniroute --port 3000` | 将规范/API 端口设置为 3000                             |
| `omniroute --mcp`       | 启动 MCP 服务器（stdio 传输）                          |
| `omniroute --no-open`   | 不自动打开浏览器                                       |
| `omniroute --help`      | 显示帮助                                               |

无头设置可使用标志或环境变量编写脚本：

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

无需打开仪表板即可运行本地诊断：

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

无需打开仪表板，即可通过 SSH 或脚本管理提供者：

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

## CLI 工具配置

### 1) 连接提供者并创建 API 密钥

1. 打开控制面板 → `Providers`，并连接至少一个提供者（OAuth 或 API 密钥）。
2. 打开控制面板 → `Endpoints`，并创建一个 API 密钥。
3. （可选）打开控制面板 → `Combos`，并设置你的回退链。

```txt
基础 URL：http://localhost:20128/v1
API 密钥：[从 Endpoint 页面复制]
模型：    if/qwen3.8-max-preview（或任意提供者/模型前缀）
```

如果你的编辑器无法发送 `Authorization: Bearer ...`，请改用包含令牌的兼容基础地址：

```txt
基础 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/
模型 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/models
聊天 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama 标签 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

适用于 Claude Code、Codex CLI、Cursor、Cline、OpenClaw、OpenCode 以及兼容 OpenAI 的 SDK。

#### 使用 `setup-*` 自动配置

无需手动粘贴基础 URL 和密钥，让 OmniRoute 根据实时模型目录写入各工具自己的配置。每个工具对应一条命令：

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml 配置文件
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json（兼容 openai）
omniroute setup-cline        # Cline CLI + VS Code 扩展设置
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml（Continue / cn）
omniroute setup-cursor       # 输出 Cursor 的应用内操作步骤
omniroute setup-roo          # Roo Code 导入 + autoImport 指针
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

每条命令都接受 `--remote <url> --api-key <key>`，用于配置本地工具连接**远程** OmniRoute；也接受 `--dry-run` 以预览配置。若要在注入正确环境变量的情况下启动 CLI，并且完全不写入任何配置，请使用通用启动器 `omniroute run <target>`（claude、codex、aider、goose、opencode、qwen、gemini）；旧版的单工具启动器 `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex）仍然可用。

有关完整表格（每条命令写入的内容、所有标志、本地与远程模式，以及基础 URL 的 `/v1` 约定），请参阅 **[CLI 集成](./CLI-INTEGRATIONS.md)**。

有关各工具的详细配置（Claude Code、Codex CLI、Cursor、Cline、OpenClaw、Kilo Code、Copilot 等），请参阅专门的 **[CLI 工具指南](../reference/CLI-TOOLS.md)**。

---

## 协议设置（MCP + A2A）

### MCP 设置（模型上下文协议）

以 stdio 模式启动 MCP 传输：

```bash
omniroute --mcp
```

建议的验证流程：

```bash
# 1. 启动 MCP 服务器
omniroute --mcp

# 2. 从你的 MCP 客户端调用：
omniroute_get_health        # 应返回系统健康状态
omniroute_list_combos       # 应返回活动组合

# 3. 或运行完整的 E2E 测试套件：
npm run test:protocols:e2e
```

#### MCP 客户端配置

**Claude Code：**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline：**

添加到你的 MCP 设置中：

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

**完整 MCP 文档：** [MCP 服务器 README](../../open-sse/mcp-server/README.md) — 110 个工具、IDE 配置，以及 Python/TS/Go 客户端。

### A2A 设置（智能体间协议）

验证智能体卡片：

```bash
curl http://localhost:20128/.well-known/agent.json
```

发送任务：

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**完整 A2A 文档：** [A2A 服务器 README](../../src/lib/a2a/README.md) — JSON-RPC 2.0、技能、流式传输和任务生命周期。

---

## 超时配置

### 基本超时设置

对于大多数部署，只需使用以下两个变量：

| 变量                     | 默认值                    | 用途                                                                                         |
| ------------------------ | ------------------------- | -------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                  | 用作上游响应开始超时、隐藏的 Undici 超时、TLS 指纹请求以及 API 桥接请求/代理超时的共享基准值 |
| `STREAM_IDLE_TIMEOUT_MS` | 继承 `REQUEST_TIMEOUT_MS` | 在 OmniRoute 中止 SSE 流之前，流式数据块之间允许的最大时间间隔                               |

保留了向后兼容性：现有的 `FETCH_TIMEOUT_MS`、`API_BRIDGE_PROXY_TIMEOUT_MS` 和其他各层超时变量仍然有效，并会覆盖共享基准值。

### 提供者特定说明

对于兼容 Claude Code 的上游（`anthropic-compatible-cc-*`），OmniRoute 会根据解析后的 fetch 超时值生成出站 `X-Stainless-Timeout` 标头，使提供者侧的读取超时与你的环境配置保持一致。

对于兼容 Claude Code 的第三方反向代理，OmniRoute 会将默认的 `anthropic-beta` 设置保持在保守范围；当 `Client Cache Control` 保持为 `Auto` 时，仅转发客户端提供的 `cache_control` 标记。仅当上游明确要求经过删减的 Claude 思维流时，才启用每个连接的“Enable redact-thinking beta”开关。

### 高级超时覆盖

| 变量                                     | 默认值                                     | 用途                                                    |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | 继承 `REQUEST_TIMEOUT_MS`                  | 在收到响应标头之前使用的上游响应开始超时                |
| `FETCH_HEADERS_TIMEOUT_MS`               | 继承 `FETCH_TIMEOUT_MS`                    | Undici 接收上游响应标头的时间限制                       |
| `FETCH_BODY_TIMEOUT_MS`                  | 继承 `FETCH_TIMEOUT_MS`                    | Undici 接收上游正文数据块的间隔时间限制（`0` 表示禁用） |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP 连接超时                                     |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici 空闲 keep-alive 套接字超时                       |
| `TLS_CLIENT_TIMEOUT_MS`                  | 继承 `FETCH_TIMEOUT_MS`                    | 通过 `wreq-js` 发出的 TLS 指纹请求的超时                |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | 继承 `REQUEST_TIMEOUT_MS` 或 `600000`      | 从 API 端口向仪表板端口转发 `/v1` 代理请求的超时        |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | API 桥接服务器上的传入请求超时                          |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | API 桥接服务器上的传入标头超时                          |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | API 桥接服务器上的 keep-alive 超时                      |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | API 桥接服务器上的套接字不活动超时（`0` 表示禁用）      |

> **注意：** 对于流式请求，`FETCH_TIMEOUT_MS` 仅涵盖连接建立/等待第一个上游响应的时间。流开始活动后，OmniRoute 只会在实际停滞（`STREAM_IDLE_TIMEOUT_MS`）或 Undici 正文不活动（`FETCH_BODY_TIMEOUT_MS`）时中止流。

### 反向代理兼容性

如果你在 Nginx、Caddy、Cloudflare 或其他反向代理后运行 OmniRoute，请确保代理超时也高于 OmniRoute 的流式处理/fetch 超时。

---

## 分离端口模式

在不同端口上运行 API 和 Dashboard，以支持高级场景（反向代理、容器网络）：

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API：      http://localhost:20128/v1
# Dashboard：http://localhost:20129
```

---

## Void Linux (xbps-src) 模板

Void Linux 用户可以使用 `xbps-src` 构建原生软件包。将以下代码块保存为 `srcpkgs/omniroute/template`：

```bash
# 'omniroute' 的模板文件
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# 每次发布时使用以下命令重新生成校验和：
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
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

## 卸载

| 命令                     | 操作                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `npm run uninstall`      | 移除系统应用，但会在 `~/.omniroute` 中**保留数据库和配置**。 |
| `npm run uninstall:full` | 移除应用，并永久**清除所有配置、密钥和数据库**。             |

> 有关所有安装方式的详细卸载说明，请参阅 [UNINSTALL.md](./UNINSTALL.md)。
