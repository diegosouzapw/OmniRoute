# 环境变量参考 (中文 (简体))

---
title: "Environment Variables Reference"
version: 3.8.40
lastUpdated: 2026-06-28
---

🌐 **语言：** 🇺🇸 [English](../../../../docs/reference/ENVIRONMENT.md) · 🇸🇦 [العربية](../../ar/docs/reference/ENVIRONMENT.md) · 🇧🇬 [Български](../../bg/docs/reference/ENVIRONMENT.md) · 🇧🇩 [বাংলা](../../bn/docs/reference/ENVIRONMENT.md) · 🇨🇿 [Čeština](../../cs/docs/reference/ENVIRONMENT.md) · 🇩🇰 [Dansk](../../da/docs/reference/ENVIRONMENT.md) · 🇩🇪 [Deutsch](../../de/docs/reference/ENVIRONMENT.md) · 🇪🇸 [Español](../../es/docs/reference/ENVIRONMENT.md) · 🇮🇷 [فارسی](../../fa/docs/reference/ENVIRONMENT.md) · 🇫🇮 [Suomi](../../fi/docs/reference/ENVIRONMENT.md) · 🇫🇷 [Français](../../fr/docs/reference/ENVIRONMENT.md) · 🇮🇳 [ગુજરાતી](../../gu/docs/reference/ENVIRONMENT.md) · 🇮🇱 [עברית](../../he/docs/reference/ENVIRONMENT.md) · 🇮🇳 [हिन्दी](../../hi/docs/reference/ENVIRONMENT.md) · 🇭🇺 [Magyar](../../hu/docs/reference/ENVIRONMENT.md) · 🇮🇩 [Indonesia](../../id/docs/reference/ENVIRONMENT.md) · 🇮🇹 [Italiano](../../it/docs/reference/ENVIRONMENT.md) · 🇯🇵 [日本語](../../ja/docs/reference/ENVIRONMENT.md) · 🇰🇷 [한국어](../../ko/docs/reference/ENVIRONMENT.md) · 🇮🇳 [मराठी](../../mr/docs/reference/ENVIRONMENT.md) · 🇲🇾 [Bahasa Melayu](../../ms/docs/reference/ENVIRONMENT.md) · 🇳🇱 [Nederlands](../../nl/docs/reference/ENVIRONMENT.md) · 🇳🇴 [Norsk](../../no/docs/reference/ENVIRONMENT.md) · 🇵🇭 [Filipino](../../phi/docs/reference/ENVIRONMENT.md) · 🇵🇱 [Polski](../../pl/docs/reference/ENVIRONMENT.md) · 🇵🇹 [Português](../../pt/docs/reference/ENVIRONMENT.md) · 🇧🇷 [Português Brasileiro](../../pt-BR/docs/reference/ENVIRONMENT.md) · 🇷🇴 [Română](../../ro/docs/reference/ENVIRONMENT.md) · 🇷🇺 [Русский](../../ru/docs/reference/ENVIRONMENT.md) · 🇸🇰 [Slovenčina](../../sk/docs/reference/ENVIRONMENT.md) · 🇸🇪 [Svenska](../../sv/docs/reference/ENVIRONMENT.md) · 🇰🇪 [Kiswahili](../../sw/docs/reference/ENVIRONMENT.md) · 🇮🇳 [தமிழ்](../../ta/docs/reference/ENVIRONMENT.md) · 🇮🇳 [తెలుగు](../../te/docs/reference/ENVIRONMENT.md) · 🇹🇭 [ไทย](../../th/docs/reference/ENVIRONMENT.md) · 🇹🇷 [Türkçe](../../tr/docs/reference/ENVIRONMENT.md) · 🇺🇦 [Українська](../../uk-UA/docs/reference/ENVIRONMENT.md) · 🇵🇰 [اردو](../../ur/docs/reference/ENVIRONMENT.md) · 🇻🇳 [Tiếng Việt](../../vi/docs/reference/ENVIRONMENT.md)

---

> OmniRoute 全部环境变量的完整参考。如需快速上手模板，请参阅 [`.env.example`](../../../.env.example)。

> [!IMPORTANT]
> 本文档中记录的每个变量也必须出现在 `.env.example` 中，
> 反之亦然。`npm run check:env-doc-sync` 将在提交时和 CI 中强制执行此规则。
> 如需有意省略某个变量，请将其添加到 `scripts/check/check-env-doc-sync.mjs`
> 中的 allowlist 内。

---

## 目录

- [1. 必需的密钥](#1-必需的密钥)
- [2. 存储与数据库](#2-存储与数据库)
- [3. 网络与端口](#3-网络与端口)
- [4. 安全与认证](#4-安全与认证)
- [5. 输入净化与 PII 保护](#5-输入净化与-pii-保护)
- [6. 工具与路由策略](#6-工具与路由策略)
- [7. URL 与云同步](#7-url-与云同步)
- [8. 出口代理](#8-出口代理)
- [9. CLI 工具集成](#9-cli-工具集成)
- [10. 内部 Agent 与 MCP 集成](#10-内部-agent-与-mcp-集成)
- [11. OAuth 服务商凭证](#11-oauth-服务商凭证)
- [12. 服务商 User-Agent 覆盖](#12-服务商-user-agent-覆盖)
- [13. CLI 指纹兼容](#13-cli-指纹兼容)
- [14. API Key 服务商](#14-api-key-服务商)
- [15. 超时设置](#15-超时设置)
- [16. 日志](#16-日志)
- [17. 内存优化](#17-内存优化)
- [18. 价格同步](#18-价格同步)
- [19. 模型同步（开发）](#19-模型同步开发)
- [20. 服务商特定设置](#20-服务商特定设置)
- [21. 代理健康](#21-代理健康)
- [22. 调试](#22-调试)
- [23. GitHub 集成](#23-github-集成)
- [24. 技能沙箱（v3.8.0+）](#24-技能沙箱v380)
- [部署场景](#部署场景)
- [审计：已移除/废弃的变量](#审计已移除废弃的变量)

---

## 1. 必需的密钥

这些变量 **必须** 在首次运行前设置。不设置则应用将拒绝启动，或使用不安全的默认值运行。

| 变量 | 必需 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- | --- |
| `JWT_SECRET` | **是** | _(无)_ | `src/lib/auth` | 签名/校验所有 Dashboard 会话 Cookie（JWT）。使用 `openssl rand -base64 48` 生成。 |
| `API_KEY_SECRET` | **是** | _(无)_ | `src/lib/db/apiKeys.ts` | SQLite 中 API key 静态加密的 AES 密钥。使用 `openssl rand -hex 32` 生成。 |
| `INITIAL_PASSWORD` | **是** | `CHANGEME` | 引导脚本 | 设置初始管理员 Dashboard 密码（与 `.env.example` 默认值一致 — 故意保持不安全以强制更换）。**首次使用前请修改。** 登录后，请通过 Dashboard → Settings → Security 修改。 |
| `OMNIROUTE_WS_BRIDGE_SECRET` | **是**（生产环境） | _(未设置)_ | `src/app/api/internal/codex-responses-ws/route.ts` | 内部 Codex Responses WebSocket 桥接的共享密钥。用于认证 Electron/浏览器 WS 中继与 OmniRoute 之间的桥接请求。⚠️ **生产环境必须设置 — 未设置时所有 WS 桥接请求都会被拒绝。** 使用 `openssl rand -base64 32` 生成。 |
| `OMNIROUTE_PEER_STAMP_TOKEN` | 否（自动） | _(每次启动自动生成)_ | `src/server/authz/policies/management.ts` | 每个进程的密钥，用于证明可信的对等 IP 戳记来自 OmniRoute 自身的 HTTP 服务器（`scripts/dev/peer-stamp.mjs`）。authz 中间件仅在戳记携带此 Token 时才信任请求的本地性（对 LOCAL_ONLY 路由进行 loopback/LAN 门控）。每次启动自动生成 — 保持未设置；仅在必须共享戳记的多进程场景下固定此值。 |

### 生成命令

```bash
# 一次性生成全部四个密钥：
echo "JWT_SECRET=$(openssl rand -base64 48)"
echo "API_KEY_SECRET=$(openssl rand -hex 32)"
echo "INITIAL_PASSWORD=$(openssl rand -base64 16)"
echo "OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -base64 32)"
```

> [!CAUTION]
> 切勿将包含真实密钥的 `.env` 文件提交到版本控制。`.gitignore` 已排除 `.env`，但推送前请确认。

---

## 2. 存储与数据库

OmniRoute 使用 **SQLite**（通过 `better-sqlite3`）进行所有持久化存储。以下变量控制数据位置、加密和生命周期。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `DATA_DIR` | `~/.omniroute/` | `src/lib/db/core.ts` | SQLite 数据库、备份和数据文件的根目录。在 Docker 卷或自定义路径中可覆盖。 |
| `STORAGE_ENCRYPTION_KEY` | _(空 = 禁用)_ | `src/lib/db/encryption.ts` | 用于 SQLite 数据库静态全量加密的 AES 密钥。使用 `openssl rand -hex 32` 生成。 |
| `STORAGE_ENCRYPTION_KEY_VERSION` | `v1` | `scripts/build/bootstrap-env.mjs`, `electron/main.js` | 加密密钥的版本标签。进行密钥轮换时递增，以支持解密旧备份。 |
| `DISABLE_SQLITE_AUTO_BACKUP` | `false` | `src/lib/db/backup.ts` | 设为 `true` 时，跳过每次启动前迁移时运行的自动数据库备份。 |
| `OMNIROUTE_CRYPT_KEY` | _(未设置)_ | `src/lib/db/encryption.ts` | `STORAGE_ENCRYPTION_KEY` 的**旧版别名**。主变量缺失时作为回退被接受。 |
| `OMNIROUTE_API_KEY_BASE64` | _(未设置)_ | `src/lib/db/encryption.ts` | **旧版别名**（Base64 编码形式），作为回退被接受。使用前自动解码。 |
| `OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS` | _(未设置)_ | `src/lib/db/core.ts` | 覆盖定期 SQLite 健康检查的间隔（毫秒）。未设置时根据 `NODE_ENV` 推导默认值。 |
| `OMNIROUTE_SKIP_DB_HEALTHCHECK` | `0` | `src/lib/db/core.ts`, `src/lib/db/healthCheck.ts` | 设为 `1` 可在启动时完全跳过数据库健康检查。适用于短生命周期任务和集成测试。 |
| `OMNIROUTE_FORCE_DB_HEALTHCHECK` | `0` | `src/lib/db/core.ts` | 设为 `1` 可强制开启数据库健康检查循环，即使正常会被跳过（如短生命周期任务）。 |
| `OMNIROUTE_SKIP_POSTINSTALL` | `0` | `scripts/postinstall.mjs` | 设为 `1` 可在 `npm install` 期间跳过原生运行时预热。适用于 CI/无头安装，此时 sqlite 已构建好。 |
| `OMNIROUTE_MIGRATIONS_DIR` | _(自动检测)_ | `src/lib/db/migrationRunner.ts` | 覆盖迁移运行器扫描的目录。在自定义构建中打包迁移文件时很有用。 |
| `OMNIROUTE_MAX_PENDING_MIGRATIONS` | `50` | `src/lib/db/migrationRunner.ts` | 大量待处理迁移的安全阈值（#3416）。如果现有数据库上有超过此数量的待处理迁移，启动将中止（防止跟踪表被清空）。恢复旧备份时提高此值；设为 `0` 可禁用检查。 |
| `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | _(代码内默认值)_ | `src/lib/spend/batchWriter.ts` | 批量消费/成本写入器的刷新间隔（毫秒）。值越小写合并越少；值越大数据库争用越少。 |
| `OMNIROUTE_SPEND_MAX_BUFFER_SIZE` | _(代码内默认值)_ | `src/lib/spend/batchWriter.ts` | 强制刷新前的最大缓存消费条目数。在高 QPS 部署中提高；在内存受限场景下降低。 |
| `OMNIROUTE_PROXY_FETCH_DEBUG` | _(未设置)_ | `open-sse/utils/proxyFetch.ts` | 设为 `"true"` 可在 Vercel 中继路径上发出 `[ProxyFetch]` 调试日志。默认关闭以避免泄露路由提示。 |
| `BATCH_RETRY_DURATION_MS` | `86400000`（24小时） | `open-sse/services/batchProcessor.ts` | 单个批次项的最大重试窗口（毫秒）。超过此时间的项被标记为失败。 |
| `BATCH_BACKOFF_BASE_MS` | `5000` | `open-sse/services/batchProcessor.ts` | 批次项重试时指数退避的基础延迟（毫秒）。 |
| `BATCH_BACKOFF_MAX_MS` | `3600000`（1小时） | `open-sse/services/batchProcessor.ts` | 批次项重试时指数退避的上限（毫秒）。 |
| `BATCH_MAX_CONCURRENT` | `1` | `open-sse/services/batchProcessor.ts` | 并发处理的批次最大数量。提高以增加吞吐量；保持低值以避免速率限制风暴。 |

### 场景

| 场景 | 配置 |
| --- | --- |
| **本地开发** | 保留所有默认值。数据库位于 `~/.omniroute/omniroute.db`。 |
| **Docker** | `DATA_DIR=/data` + 挂载卷到 `/data`。 |
| **静态加密** | 设置 `STORAGE_ENCRYPTION_KEY` + 备份密钥！丢失密钥 = 丢失数据。 |
| **CI/测试** | `DATA_DIR=/tmp/omniroute-test` — 临时目录，无需加密。 |

---

## 3. 网络与端口

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `PORT` | `20128` | `src/lib/runtime/ports.ts` | Dashboard UI 和 API 端点共用的主端口（单端口模式）。 |
| `API_PORT` | _(未设置)_ | `src/lib/runtime/ports.ts` | 设置时，在另外的端口上提供 `/v1/*` 代理 API。 |
| `API_HOST` | `0.0.0.0` | `src/lib/runtime/ports.ts` | API 端口的绑定地址。 |
| `DASHBOARD_PORT` | _(未设置)_ | `src/lib/runtime/ports.ts` | 设置时，在另外的端口上提供 Dashboard UI。 |
| `PROD_DASHBOARD_PORT` | `20130` | `docker-compose.prod.yml` | Docker 生产模式下 Dashboard 的主机侧发布端口。 |
| `PROD_API_PORT` | `20131` | `docker-compose.prod.yml` | Docker 生产模式下 API 的主机侧发布端口。 |
| `OMNIROUTE_PORT` | _(未设置)_ | `src/lib/runtime/ports.ts` | 在 Electron 或其他包装器中运行时优先于 `PORT`。 |
| `LIVE_WS_PORT` | `20129` | `src/server/ws/liveServer.ts` | 实时 WebSocket 监控服务器的端口。 |
| `LIVE_WS_HOST` | `127.0.0.1` | `src/server/ws/liveServer.ts` | 实时 WebSocket 服务器的绑定地址。设为 `0.0.0.0` 可暴露到 LAN（还需配置 `LIVE_WS_ALLOWED_ORIGINS`）。 |
| `LIVE_WS_ALLOWED_ORIGINS` | _(未设置)_ | `src/server/ws/liveServer.ts` | 逗号分隔的额外允许打开实时 WebSocket 的源。loopback Dashboard 源已默认允许。 |
| `OMNIROUTE_ENABLE_LIVE_WS` | `true` | `src/server/ws/liveServer.ts` | 设为 `0` 或 `false` 可禁用实时 WebSocket 服务器（默认启用，绑定 loopback）。 |
| `OMNIROUTE_DISABLE_LIVE_WS` | `false` | `scripts/start-ws-server.mjs` | CI/测试工具开关，禁用独立的实时 WebSocket 辅助脚本。 |
| `RELAY_IP_PER_MINUTE` | `30` | `src/app/api/v1/relay/chat/completions/route.ts` | 每个 (Token, IP) 的中继速率限制，请求数/分钟。基于内存，每个实例独立。`0` 或负数可禁用 IP 维度门控（每个 Token 的数据库限制仍然生效）。 |
| `NODE_ENV` | `production` | Next.js 核心 | 控制日志详细程度、缓存、错误详情暴露和 Next.js 优化。 |
| `OMNIROUTE_USE_TURBOPACK` | `1`（`.env.example` 中默认值） | `package.json` / Next.js 16 | 在 `npm run dev` 和 `npm run build` 中切换 Next.js 16 Turbopack 打包器。在 Windows 或遇到原生绑定不兼容时设为 `0`。 |
| `OMNIROUTE_SKIP_DB_HEALTHCHECK` | _(未设置)_ | `src/lib/db/core.ts` / `src/lib/db/healthCheck.ts` | 设为 `1` 可跳过启动时的 SQLite 完整性健康检查。适用于大型数据库需要更快启动时。 |
| `CREDENTIAL_HEALTH_CHECK_INTERVAL` | `300000` | `open-sse/config/constants.ts` / `src/lib/credentialHealth/scheduler.ts` | 后台凭证健康检查调度器的间隔（毫秒）。最低：10000（10 秒）。 |
| `CREDENTIAL_HEALTH_CACHE_TTL` | `300000` | `open-sse/config/constants.ts` / `src/lib/credentialHealth/cache.ts` | 凭证健康状态缓存的 TTL（毫秒）。 |
| `OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK` | `false` | `src/lib/credentialHealth/scheduler.ts` | 设为 `1` 或 `true` 可禁用后台定期服务商连接测试。 |
| `HOST` | `0.0.0.0` | `scripts/dev/run-next.mjs` | Next.js 开发/启动服务器的绑定地址。设置时覆盖默认的 `0.0.0.0`。 |
| `HOSTNAME` | `127.0.0.1` | `scripts/dev/run-next-playwright.mjs` | Playwright 启动 Next.js 时使用的绑定地址。默认为 `127.0.0.1` 以确保测试隔离。 |

### 端口模式

```
┌─────────────────────────── 单端口（默认）──────────────────────────┐
│  PORT=20128                                                         │
│  → Dashboard: http://localhost:20128                                │
│  → API:       http://localhost:20128/v1/chat/completions            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── 分离端口 ────────────────────────────────┐
│  DASHBOARD_PORT=20128                                                │
│  API_PORT=20129                                                      │
│  API_HOST=0.0.0.0                                                    │
│  → Dashboard: http://localhost:20128                                 │
│  → API:       http://0.0.0.0:20129/v1/chat/completions              │
│  用例：将 API 暴露给 LAN，同时限制 Dashboard 仅可本地访问。            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── Docker 生产 ─────────────────────────────┐
│  PROD_DASHBOARD_PORT=443   PROD_API_PORT=8443                       │
│  → 将容器端口映射到 docker-compose.prod.yml 中的主机端口。            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. 安全与认证

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `MACHINE_ID_SALT` | `endpoint-proxy-salt` | `src/lib/auth` | 与硬件标识符组合用于机器指纹的盐值。按部署修改以实现隔离。 |
| `OMNIROUTE_CLI_SALT` | `omniroute-cli-auth-v1` | `src/lib/machineToken.ts` | 用于派生本地 CLI 认证 Token 的 HMAC 盐值。修改此值将轮换机器上的所有 CLI Token。参阅 `docs/security/CLI_TOKEN.md`。 |
| `AUTH_COOKIE_SECURE` | `false` | `src/lib/auth` | 设置会话 Cookie 的 `Secure` 标志。运行在 HTTPS 背后时 **必须设为 `true`**。 |
| `REQUIRE_API_KEY` | `false` | API 中间件 | 设为 `true` 后，所有 `/v1/*` 代理请求必须包含有效的 API key。 |
| `ALLOW_API_KEY_REVEAL` | `false` | `src/shared/constants/featureFlagDefinitions.ts` | 允许在 Dashboard UI 中显示完整 API key 值。可从 Dashboard Feature Flags 配置；共享实例上有安全风险。 |
| `NO_LOG_API_KEY_IDS` | _(空)_ | `src/lib/compliance/index.ts` | 逗号分隔的 API key ID 列表，其请求将绕过日志记录（GDPR 合规）。 |
| `DEFAULT_RATE_LIMIT_PER_DAY` | `1000` | `src/shared/utils/apiKeyPolicy.ts` | 应用于 `rate_limits` 列为 null 的 API key 的回退每日请求预算。默认（未设置/空/格式错误）保持传统的 1000/天、5000/周、20000/月 窗口。显式设为 `0` 可选择退出（无限制）。任意正整数 N 则启用 N/天、5N/周、20N/月。Zod 校验；无效值记录警告并使用传统默认值。 |
| `MAX_BODY_SIZE_BYTES` | `10485760`（10 MB） | `src/shared/middleware/bodySizeGuard.ts` | 允许的最大请求体大小。拒绝超限载荷。 |
| `CORS_ORIGIN` | _(未设置)_ | `src/server/cors/origins.ts` | 旧版单一源 CORS 允许列表。新部署推荐使用 `CORS_ALLOWED_ORIGINS`。CORS 仅用于跨源浏览器 API 客户端；反向代理后的同源 Dashboard 请求使用 `NEXT_PUBLIC_BASE_URL` / 公共源校验。 |
| `CORS_ALLOWED_ORIGINS` | _(未设置)_ | `src/server/cors/origins.ts` | 逗号分隔的 CORS 允许列表。除非显式配置 `CORS_ALLOW_ALL=true`，否则不发送通配符。 |
| `CORS_ALLOW_ALL` | `false` | `src/server/cors/origins.ts` | 仅供开发使用的逃生口，可回显任意浏览器 `Origin`。不要在共享或生产部署中启用。 |
| `OUTBOUND_SSRF_GUARD_ENABLED` | `true` | `src/shared/network/outboundUrlGuard.ts` | 阻止目标为私有/loopback/链路本地 IP 范围的服务商调用。仅在隔离的测试环境中禁用。 |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` | `false` | `src/shared/network/outboundUrlGuard.ts` | 允许指向私有/本地网络（localhost、192.168.x.x、10.x.x.x 等）的服务商 URL。**自托管服务商必需**（LM Studio、Ollama、vLLM、Llamafile、Triton、SearXNG）。设为 `false` 时，Dashboard 拒绝校验本地 URL。 |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS` | `true` | `src/shared/network/outboundUrlGuard.ts` | 允许在本地/私有地址上添加/校验服务商（127.0.0.1、localhost、LAN、私有范围）— 仅影响服务商校验路径。**默认 `true`**（本地优先）；设为 `false` 可强制严格的仅公网阻断。云元数据端点（169.254.169.254, metadata.google.internal）始终被阻断。（#5066） |

### 加固清单

```bash
# 生产环境安全最低要求：
AUTH_COOKIE_SECURE=true        # 需要 HTTPS
REQUIRE_API_KEY=true           # 认证所有代理调用
ALLOW_API_KEY_REVEAL=false     # 绝不在 UI 中暴露密钥
CORS_ALLOWED_ORIGINS=https://your.domain.com
MAX_BODY_SIZE_BYTES=5242880    # 5 MB 限制
```

---

## 5. 输入净化与 PII 保护

OmniRoute 提供两层防护：请求侧的注入扫描和响应侧的 PII 脱敏。

### 请求侧：提示注入安全护栏

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `INPUT_SANITIZER_ENABLED` | `true` | `src/middleware/promptInjectionGuard.ts` | 启用扫描传入消息中的提示注入模式。 |
| `INPUT_SANITIZER_MODE` | `warn` | `src/middleware/promptInjectionGuard.ts` | `warn` = 仅记录日志，`block` = 以 400 拒绝请求，`redact` = 脱敏可疑模式。 |
| `INJECTION_GUARD_MODE` | _(未设置)_ | `src/middleware/promptInjectionGuard.ts` | `INPUT_SANITIZER_MODE` 的旧版别名 — 行为相同。 |
| `PII_REDACTION_ENABLED` | `false` | `src/middleware/promptInjectionGuard.ts` | 检测传入请求中的 PII（邮箱、电话、社会安全号码等）。 |

### 响应侧：PII 脱敏器

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `PII_RESPONSE_SANITIZATION` | `false` | `src/lib/piiSanitizer.ts` | 在返回给客户端之前扫描大语言模型响应中的泄露 PII。 |
| `PII_RESPONSE_SANITIZATION_MODE` | `redact` | `src/lib/piiSanitizer.ts` | `redact` = 脱敏 PII，`warn` = 仅记录日志，`block` = 丢弃整个响应。 |

### VS Code Token 化路由上下文净化器

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_VSCODE_SANITIZE_CONTEXT` | `1` | `src/app/api/v1/vscode/contextSanitizer.ts` | 从 `/v1/vscode/[token]/*` 请求中剥离隐式的活跃编辑器上下文（`editorContext`, `activeEditor`, `currentFile`, `selection`, `openTabs`...），并脱敏显式附加的敏感文件内容。安全默认启用；设为 `0` 可禁用。 |

### 场景

| 场景 | 配置 |
| --- | --- |
| **企业合规** | `INPUT_SANITIZER_ENABLED=true`, `INPUT_SANITIZER_MODE=block`, `PII_REDACTION_ENABLED=true`, `PII_RESPONSE_SANITIZATION=true` |
| **仅监控** | `INPUT_SANITIZER_ENABLED=true`, `INPUT_SANITIZER_MODE=warn` — 记录日志但永不阻断 |
| **个人使用** | 全部禁用 — 零开销 |

---

## 6. 工具与路由策略

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `TOOL_POLICY_MODE` | `disabled` | `src/lib/toolPolicy.ts` | 控制大语言模型的工具/函数调用访问。`allowlist` = 仅允许列表中的工具，`denylist` = 除列表外全部允许，`disabled` = 无限制。 |
| `OMNIROUTE_PAYLOAD_RULES_PATH` | `./config/payloadRules.json` | `open-sse/services/payloadRules.ts` | 载荷操作规则 JSON 文件路径（按模型/协议进行上游调整）。 |
| `OMNIROUTE_PAYLOAD_RULES_RELOAD_MS` | `5000` | `open-sse/services/payloadRules.ts` | 热加载载荷规则文件的重载间隔（毫秒）。最低 `1000`。 |
| `OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS` | `false` | `open-sse/services/model.ts` | 启用后：将来自 Claude Code 客户端的无前缀 `claude-*` 模型 ID 通过 Claude Code OAuth 账户路由，而非要求服务商前缀。显式服务商前缀优先级更高。也可通过 Dashboard 中 Claude 服务商页面的开关配置。 |

---

## 7. URL 与云同步

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `BASE_URL` | `http://localhost:20128` | `src/lib/cloudSync.ts` | 内部同步任务调用 `/api/sync/cloud` 的服务器端 URL。即使应用被公共代理，也保持为 loopback/容器 URL。 |
| `CLOUD_URL` | _(空)_ | `src/lib/cloudSync.ts` | 云中继端点 URL（高级功能）。 |
| `CLOUD_SYNC_TIMEOUT_MS` | `12000` | `src/lib/cloudSync.ts` | 云同步请求的 HTTP 超时。 |
| `OMNIROUTE_BUILD_PROFILE` | `full` | Webpack 构建配置 | 构建时配置文件（设为 `minimal` 可物理排除特权模块不打包）。 |
| `OMNIROUTE_CLOUD_SYNC_SECRET` | _(空)_ | `src/lib/cloudSync.ts` | 用于校验云同步响应 HMAC-SHA256 签名的共享密钥。 |
| `OMNIROUTE_CLOUD_SYNC_SECRETS` | `false` | `src/lib/cloudSync.ts` | 设为 `true` 允许云同步端点覆盖本地凭证。默认 `false`。 |
| `OMNIROUTE_ZED_IMPORT_LEGACY_ONE_STEP` | `false` | `src/app/api/providers/zed/import/route.ts` | 设为 `true` 可回退到 v3.8.5 的一步式"导入全部"行为，无需用户确认。 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | OAuth、Dashboard、同步 | 面向公共的 URL，用于 OAuth redirect_uri、Dashboard 链接、生成的公共 URL 以及同源浏览器变更检查。**在反向代理背后时，必须匹配你的公共 URL。** |
| `NEXT_PUBLIC_CLOUD_URL` | _(空)_ | 客户端侧 | `CLOUD_URL` 的客户端镜像。 |
| `NEXT_PUBLIC_APP_URL` | _(未设置)_ | `src/shared/services/cloudSyncScheduler.ts` | `NEXT_PUBLIC_BASE_URL` 的旧版回退。 |
| `OMNIROUTE_PUBLIC_BASE_URL` | _(未设置)_ | 公共源解析器、图片 URL | 最高优先级的浏览器侧 OmniRoute 源，用于公共 URL 生成和源校验（例如 `/v1/chatgpt-web/image/<id>`）。当 OpenWebUI 或其他中继通过内部 URL 访问 OmniRoute，但用户浏览器必须从 LAN、隧道或公共源获取图片时设置。**不要**包含 `/v1`。 |
| `OMNIROUTE_TRUST_PROXY` | _(未设置)_ | `src/server/origin/publicOrigin.ts` | 可选的转发公共源头信任模式。未设置 = 出于安全考虑不信任 `Forwarded` / `X-Forwarded-*`。`true` / `loopback` 仅信任来自经过 Token 戳记的 loopback 代理的转发 host/proto。`private` / `lan` 还信任私有 LAN 代理对端。生产环境中推荐显式设置 `NEXT_PUBLIC_BASE_URL`。 |
| `OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS` | `180000`（3 分钟） | `open-sse/executors/chatgpt-web.ts` | 等待异步 chatgpt-web 图片通过 Celsius WebSocket 到达的最大时间。在上游排队窗口较长时提高此值。 |
| `OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB` | `256` | `open-sse/services/chatgptImageCache.ts` | 为 `/v1/chatgpt-web/image/<id>` 提供服务的 chatgpt-web 图片缓存的内存预算总额（MB）。在内存受限的主机上降低；图片生成量大且客户端争抢 30 分钟 TTL 时提高。 |
| `OMNIROUTE_CGPT_WEB_PRO_TIMEOUT_MS` | `1200000`（20 分钟） | `open-sse/executors/chatgpt-web.ts` | chatgpt-web GPT-5.5 Pro 后台轮询交接的总体等待预算。Pro 推理在带外完成，OmniRoute 轮询直到结果到达或预算耗尽。如果 Pro 请求完成前超时，请提高此值。 |
| `OMNIROUTE_CGPT_WEB_PRO_POLL_INTERVAL_MS` | `4000`（4 秒） | `open-sse/executors/chatgpt-web.ts` | chatgpt-web GPT-5.5 Pro 后台轮询尝试的间隔。降低可更快完成但增加上游轮询；提高可减少请求量。 |
| `THEOLDLLM_NAV_TIMEOUT_MS` | `30000`（30 秒） | `open-sse/executors/theoldllm.ts` | 浏览器端 Token 捕获（The Old LLM (theoldllm) 免费服务商使用）的 Playwright 导航超时（毫秒）。如果中继页面加载慢，可在慢速网络上提高。 |
| `KIE_CALLBACK_URL` | _(未设置)_ | `open-sse/utils/kieTask.ts` | 异步 kie.ai 任务的公共回调 URL。优先级高于 `OMNIROUTE_KIE_CALLBACK_URL` 和 `OMNIROUTE_PUBLIC_URL`。 |
| `OMNIROUTE_KIE_CALLBACK_URL` | _(未设置)_ | `open-sse/utils/kieTask.ts` | `KIE_CALLBACK_URL` 的替代写法。主变量未设置时的回退。 |
| `OMNIROUTE_PUBLIC_URL` | _(未设置)_ | `open-sse/utils/kieTask.ts` | 用于组合异步回调 URL 的公共源。kie.ai 回调的最低优先级回退；也用作其他中继的通用公共 URL。 |
| `OMNIROUTE_CROF_USAGE_URL` | `https://crof.ai/usage_api/` | `open-sse/services/usage.ts` | Usage 页面使用的 CrofAI 配额查询端点。可覆盖为中继/测试固定件。 |
| `OMNIROUTE_OPENCODE_QUOTA_URL` | `https://opencode.ai/zen/go/v1/quota` | `open-sse/services/opencodeQuotaFetcher.ts` | Usage 页面使用的 OpenCode (zen/go) 配额查询端点。可覆盖为中继/测试固定件。 |
| `OMNIROUTE_OPENCODE_GO_QUOTA_URL` | `https://api.z.ai/api/monitor/usage/quota/limit` | `open-sse/services/usage.ts` | Usage 页面使用的 OpenCode Go 配额查询端点。可覆盖为中继/测试固定件。 |
| `OMNIROUTE_OPENCODE_GO_DASHBOARD_URL` | `https://opencode.ai/workspace` | `open-sse/services/usage.ts` | 配置了 workspace ID 和 auth Cookie 时用于配额抓取的 OpenCode Go Dashboard 基础 URL。可覆盖为中继/测试固定件。 |
| `OPENCODE_GO_WORKSPACE_ID` | _(未设置)_ | `open-sse/services/usage.ts` | 用于 Dashboard 配额抓取的 OpenCode Go workspace ID。配置多个账户时，推荐使用每个连接的 Dashboard 字段。 |
| `OMNIROUTE_OPENCODE_GO_WORKSPACE_ID` | _(未设置)_ | `open-sse/services/usage.ts` | OpenCode Go workspace ID 环境变量的备选名，在较短的别名之前使用。配置多个账户时，推荐使用每个连接的 Dashboard 字段。 |
| `OPENCODE_GO_AUTH_COOKIE` | _(未设置)_ | `open-sse/services/usage.ts` | 用于 Dashboard 配额抓取的 OpenCode Go `auth` Cookie。敏感信息；配置多个账户时，推荐使用每个连接的 Dashboard 字段。 |
| `OMNIROUTE_OPENCODE_GO_AUTH_COOKIE` | _(未设置)_ | `open-sse/services/usage.ts` | OpenCode Go `auth` Cookie 环境变量的备选名，在较短的别名之前使用。敏感信息；配置多个账户时，推荐使用每个连接的 Dashboard 字段。 |
| `OMNIROUTE_OLLAMA_CLOUD_USAGE_URL` | `https://ollama.com/settings` | `open-sse/services/usage.ts` | 用于配额抓取的 Ollama Cloud settings URL。可覆盖为中继/测试固定件。 |
| `OLLAMA_USAGE_COOKIE` | _(未设置)_ | `open-sse/services/usage.ts` | 用于设置页面配额抓取的 Ollama Cloud `__Secure-session` Cookie。敏感信息；配置多个账户时，推荐使用每个连接的 Dashboard 字段。 |
| `OLLAMA_CLOUD_USAGE_COOKIE` | _(未设置)_ | `open-sse/services/usage.ts` | Ollama Cloud `__Secure-session` Cookie 环境变量的备选名。敏感信息；配置多个账户时，推荐使用每个连接的 Dashboard 字段。 |
| `OMNIROUTE_OLLAMA_USAGE_COOKIE` | _(未设置)_ | `open-sse/services/usage.ts` | Ollama Cloud `__Secure-session` Cookie 环境变量的备选名，在较短的别名之前使用。敏感信息；配置多个账户时，推荐使用每个连接的 Dashboard 字段。 |
| `OMNIROUTE_CODEWHISPERER_BASE_URL` | `https://codewhisperer.us-east-1.amazonaws.com` | `open-sse/services/usage.ts` | CodeWhisperer (AWS Kiro) 用量限制端点。可覆盖为中继/测试固定件。 |

> [!IMPORTANT]
> 当部署在反向代理（nginx、Caddy）之后时，**必须**将 `NEXT_PUBLIC_BASE_URL` 设置为你的公共 URL（例如 `https://omniroute.example.com`）。否则 OAuth 回调可能因 redirect_uri 不匹配而失败，生成的公共链接可能指向内部容器源，同源 Dashboard 变更可能被浏览器源检查拒绝。
>
> 对于服务器到服务器的任务，保持 `BASE_URL` 为内部 loopback/容器 URL。不要为携带凭证的内部自调用使用浏览器 `Origin` 或公共主机名。
>
> OmniRoute 集中处理公共源校验：显式的公共 URL 环境变量优先被信任；原始的 `Forwarded` / `X-Forwarded-*` 头默认被忽略，除非启用了 `OMNIROUTE_TRUST_PROXY` 且直接代理对端经过 Token 戳记为可信。不要用 CORS 设置来修复同源 Dashboard 请求；CORS 仅用于跨源浏览器客户端。

---

## 8. 出口代理

将上游大语言模型服务商调用通过 HTTP 或 SOCKS5 代理路由，以实现出口控制、异地路由或 IP 掩码。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `ENABLE_SOCKS5_PROXY` | `true` | `open-sse/executors` | 启用上游调用的 SOCKS5 代理代理。可用 `false` 退出。 |
| `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY` | `true` | 客户端侧 | 客户端对 SOCKS5 可用性的感知。 |
| `HTTP_PROXY` | _(未设置)_ | Node.js 标准 | 上游调用的 HTTP 代理。 |
| `HTTPS_PROXY` | _(未设置)_ | Node.js 标准 | 上游调用的 HTTPS 代理。 |
| `ALL_PROXY` | _(未设置)_ | Node.js 标准 | 通用代理（支持 `socks5://`）。 |
| `NO_PROXY` | _(未设置)_ | Node.js 标准 | 逗号分隔的绕过代理的主机名/IP。 |
| `OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS` | `32` | `open-sse/utils/proxyDispatcher.ts` | 每个缓存的 HTTP/SOCKS 代理调度器的最大并发套接字数。长连接 SSE 流（如 Codex `/v1/responses`）在多个请求共享同一账户级代理时需要不止一个连接。超过 `256` 的值会被截断。 |
| `SOCKS_HANDSHAKE_TIMEOUT_MS` | `10000` | `open-sse/utils/socksConnectorWithFamily.ts` | SOCKS5 握手（连接）超时，毫秒。当单个住宅网关主机高并发（如 100 个并发请求）时提高 — 在池饱和情况下实际握手可能超过 10 秒，即使代理可达，否则会显示为虚假的 `[Proxy Fast-Fail] Proxy unreachable`。上限为 `120000`。 |
| `PROXY_FAIL_OPEN` | `false` | `src/sse/handlers/chatHelpers.ts` | 设为 `false`（默认）时，代理解析失败的请求会被**拒绝（fail-closed）**，而不会回退到直连 — 防止真实 IP 泄露。设为 `true` 可恢复旧版的 DIRECT 回退。 |
| `ENABLE_TLS_FINGERPRINT` | `false` | `open-sse/executors` | 使用 wreq-js 伪装 TLS 指纹（模拟 Chrome 124）。对抗 JA3/JA4 阻断。 |
| `OMNIROUTE_TURNSTILE_IGNORE_TLS_ERRORS` | `false` | `open-sse/services/claudeTurnstileSolver.ts` | 允许 Claude Turnstile 的 Playwright 浏览器上下文忽略 HTTPS 证书错误。 |

### 场景

| 场景 | 配置 |
| --- | --- |
| **通过 SSH 隧道走 SOCKS5** | `ALL_PROXY=socks5://127.0.0.1:7890`, `ENABLE_SOCKS5_PROXY=true` |
| **企业 HTTP 代理** | `HTTP_PROXY=http://proxy.corp.com:3128`, `HTTPS_PROXY=http://proxy.corp.com:3128`, `NO_PROXY=localhost,internal.corp.com` |
| **反指纹** | `ENABLE_TLS_FINGERPRINT=true` — 需要 `wreq-js`（已包含） |
| **出口受控 / 无直连访问** | 保持 `PROXY_FAIL_OPEN=false`（默认）。代理不可用时请求直接失败，不会通过直连泄露。 |
| **旧版/开发 — 允许直连回退** | `PROXY_FAIL_OPEN=true`。恢复加固前行为：代理解析失败时使用直连连接。 |

> **注意（NVIDIA 校验绕过 — #3226）：** NVIDIA 的 API Key 校验端点
> 在通过全局代理/TLS 修补 fetch（undici dispatcher → 504）路由时会卡住。
> `src/lib/providers/validation.ts::directHttpsRequest()` 有意识地绕过该
> 代理修补，使用 `safeOutboundFetch({ bypassProxyPatch: true })` 处理那个单独的校验调用。
> 这是一个有文档记录、范围受限的例外 — 它 **不会** 影响聊天/用量出口。
> 绕过范围由 `tests/unit/proxy-bypass-scope-guard-3226.test.ts` 固定。

---

## 9. CLI 工具集成

控制 OmniRoute 如何发现和启动 CLI sidecar（Claude Code、Codex 等）。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `CLI_MODE` | `auto` | `src/shared/services/cliRuntime.ts` | `auto` = 搜索系统 PATH；`manual` = 仅使用显式路径。 |
| `CLI_EXTRA_PATHS` | _(未设置)_ | `src/shared/services/cliRuntime.ts` | 用于 CLI 二进制文件发现的额外 PATH 条目（冒号分隔）。 |
| `CLI_CONFIG_HOME` | _(未设置)_ | `src/shared/services/cliRuntime.ts` | 覆盖读取 CLI 配置（`~/.claude`、`~/.codex`）的主目录。 |
| `CLI_ALLOW_CONFIG_WRITES` | `false` | `src/shared/services/cliRuntime.ts` | 允许 OmniRoute 写入 CLI 配置文件（Token 刷新、会话数据）。 |
| `CLI_CLAUDE_BIN` | `claude` | `src/shared/services/cliRuntime.ts` | Claude CLI 二进制文件的自定义路径。 |
| `CLI_CODEX_BIN` | `codex` | `src/shared/services/cliRuntime.ts` | Codex CLI 二进制文件的自定义路径。 |
| `CLI_DROID_BIN` | `droid` | `src/shared/services/cliRuntime.ts` | Droid CLI 二进制文件的自定义路径。 |
| `CLI_OPENCLAW_BIN` | `openclaw` | `src/shared/services/cliRuntime.ts` | OpenClaw CLI 二进制文件的自定义路径。 |
| `CLI_CURSOR_BIN` | `agent` | `src/shared/services/cliRuntime.ts` | Cursor agent 二进制文件的自定义路径。 |
| `CLI_CLINE_BIN` | `cline` | `src/shared/services/cliRuntime.ts` | Cline CLI 二进制文件的自定义路径。 |
| `CLI_CONTINUE_BIN` | `cn` | `src/shared/services/cliRuntime.ts` | Continue CLI 二进制文件的自定义路径。 |
| `CLI_QODER_BIN` | `qoder` | `src/shared/services/cliRuntime.ts` | Qoder CLI 二进制文件的自定义路径。 |
| `CLI_QWEN_BIN` | `qwen` | `src/shared/services/cliRuntime.ts` | Qwen Code CLI 二进制文件的自定义路径。 |
| `CLI_DEVIN_BIN` | `devin` | `open-sse/executors/devin-cli.ts` | Devin CLI 二进制文件的自定义路径（v3.8.0）。由 Windsurf/Devin executor 使用。 |
| `HERMES_HOME` | `~/.hermes` | `src/lib/cli-helper/config-generator/hermesHome.ts` | Hermes Agent 主目录，OmniRoute 从此处读取/写入 Hermes CLI 配置。与 Hermes PowerShell 安装程序在 Windows 上设置的环境变量（`%LOCALAPPDATA%\hermes`）一致。 |

### Docker 示例

```bash
# 将主机二进制文件挂载到容器中，并告诉 OmniRoute 它们的位置：
CLI_EXTRA_PATHS=/host-cli/bin
CLI_CONFIG_HOME=/root
CLI_ALLOW_CONFIG_WRITES=true
CLI_CLAUDE_BIN=/host-cli/bin/claude
```

### CLI 二进制文件（`omniroute`）辅助变量

以下变量调优 `omniroute` CLI 二进制文件自身的行为（而非上面的 sidecar 检测）。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_LANG` | _(系统)_ | `bin/cli/i18n.mjs` | 强制 CLI 输出语言。BCP-47 locale（如 `en`、`pt-BR`）。覆盖系统 locale 环境变量（LC_ALL, LC_MESSAGES）。 |
| `OMNIROUTE_SHOW_LOG` | _(未设置)_ | `bin/cli/runtime/processSupervisor.mjs` | 设为 `1` 可在受监管模式下将服务器 stdout/stderr 转发到终端。等同于 `omniroute serve` 的 `--log` 标志。 |
| `OMNIROUTE_CLI_TOKEN` | _(未设置)_ | `bin/cli/api.mjs` | 作为 `x-omniroute-cli-token` 头注入的机器认证 Token。在任务 8.12 中自动生成。 |
| `OMNIROUTE_HTTP_TIMEOUT_MS` | `30000` | `bin/cli/api.mjs` | CLI → 服务器请求的单次尝试 HTTP 超时（毫秒）。 |
| `OMNIROUTE_VERBOSE` | `0` | `bin/cli/api.mjs` | 设为 `1` 可在 CLI 命令期间将重试/退避诊断信息打印到 stderr。 |
| `OMNIROUTE_PLUGIN_PATH` | _(未设置)_ | `bin/cli/plugins.mjs` | CLI 插件发现的自定义目录（`omniroute-cmd-*` 包）。未设置时默认为 `~/.omniroute/plugins/`。 |
| `OMNIROUTE_PLUGINS_ALLOW_EXEC` | `0` | `src/lib/plugins/pluginWorker.ts` | 设为 `1` 允许插件请求 `exec` 权限（从 Worker 沙箱中生成子进程）。仅供本地运维人员。 |

---

## 10. 内部 Agent 与 MCP 集成

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_BASE_URL` | 自动检测 | `open-sse/mcp-server/server.ts` | MCP/A2A 工具访问 OmniRoute 的显式 URL。覆盖 localhost 自动检测。 |
| `OMNIROUTE_API_KEY` | _(未设置)_ | MCP/A2A 模块 | 内部 MCP 工具和 A2A 技能调用的 API key。 |
| `OMNIROUTE_API_KEY_ID` | _(未设置)_ | `open-sse/mcp-server/audit.ts` | 用于 MCP 审计日志归属的 Key ID。 |
| `ROUTER_API_KEY` | _(未设置)_ | 旧版 | `OMNIROUTE_API_KEY` 的旧版别名。 |
| `OMNIROUTE_CONTEXT` | _(活跃上下文)_ | `bin/cli/program.mjs`, `bin/cli/api.mjs` | `omniroute` 命令的 CLI 远程模式上下文/配置文件；覆盖本地上下文存储中的活跃上下文。等同于 `--context <name>`。 |
| `OMNIROUTE_MCP_ENFORCE_SCOPES` | `true` | `open-sse/mcp-server/server.ts` | 对 MCP 工具调用强制执行基于权限域的访问控制。 |
| `OMNIROUTE_MCP_SCOPES` | _(全部)_ | `open-sse/mcp-server/server.ts` | 逗号分隔的权限域：`admin`、`combos`、`health`、`models`、`routing`、`budget`、`metrics`、`pricing`、`memory`、`skills`。 |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS` | `false` | `open-sse/mcp-server/descriptionCompressor.ts` | 在序列化清单之前压缩 MCP 工具描述。启用值：`1`、`true`、`on`。 |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | `rtk` | `open-sse/mcp-server/descriptionCompressor.ts` | 压缩算法/配置文件。禁用值：`0`、`false`、`off`。 |
| `MODEL_SYNC_INTERVAL_HOURS` | `24` | `src/shared/services/modelSyncScheduler.ts` | 模型目錄同步间隔，小时。 |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | `src/server-init.ts` | 服务商速率限制和配额轮询间隔。 |
| `PROVIDER_LIMITS_SYNC_SPACING_MS` | `1500` | `src/lib/usage/providerLimits.ts` | 批量同步中连续 OAuth 配额获取之间的间隔（毫秒）；OAuth 连接逐个获取以避免冲击上游。`0` 表示退出（并发）。 |
| `PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS` | `5000` | `src/lib/usage/providerLimits.ts` | 真实用量事件后刷新服务商限制前的延迟（毫秒），给上游配额 API 时间记录消费。 |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES` | `false` | `src/instrumentation-node.ts` | 禁用所有后台服务（同步、价格、模型刷新）。适用于 CI/测试。 |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | _(未设置)_ | `src/lib/config/runtimeSettings.ts` | 在自动测试检测下强制运行后台任务。设为 `1` 可覆盖测试推断。 |
| `OMNIROUTE_BUDGET_RESET_JOB_INTERVAL_MS` | `600000` | `src/lib/jobs/budgetResetJob.ts` | 预算重置检查频率（毫秒）。最低 `10000`。 |
| `OMNIROUTE_CONNECTION_RECOVERY_INTERVAL_MS` | `60000` | `src/lib/quota/connectionRecovery.ts` | 主动连接冷却恢复频率（毫秒）：对瞬态 `rate_limited_until` 已过期的连接进行重新校验，脱离请求热路径。最低 `5000`。 |
| `OMNIROUTE_DISABLE_CONNECTION_RECOVERY` | `false` | `src/lib/quota/connectionRecovery.ts` | 禁用主动连接冷却恢复调度器（`getProviderCredentials` 中的惰性恢复仍然生效）。 |
| `OMNIROUTE_REASONING_CACHE_CLEANUP_INTERVAL_MS` | `1800000` | `src/lib/jobs/reasoningCacheCleanupJob.ts` | 推理缓存清理频率（毫秒）。最低 `60000`。 |
| `OMNIROUTE_CONFIG_HOT_RELOAD_MS` | `5000` | `src/lib/config/hotReload.ts` | 配置热加载的轮询间隔（毫秒）。低于 `1000` 会被拒绝。 |
| `OMNIROUTE_DISABLE_REDIS_AUTH_CACHE` | _(启用)_ | `src/lib/db/apiKeys.ts` | 设为 `1` 可绕过 Redis 支持的 API Key 认证缓存（强制走数据库读取）。 |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS` | `0` | `open-sse/services/compression/engines/rtk/filterLoader.ts` | 信任用户管理的 RTK 项目过滤器规则，无需严格的签名检查。 |
| `OMNIROUTE_BOOTSTRAPPED` | `false` | `src/app/(dashboard)/dashboard/page.tsx` | 引导脚本在初始设置后设为 `true`。控制设置向导的可见性。 |
| `OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE` | `0` | `open-sse/executors/antigravity.ts` | 逃生口：允许请求体覆盖 Antigravity 项目字段。 |
| `ANTIGRAVITY_CREDITS` | _(未设置)_ | `open-sse/services/antigravityCredits.ts` | 覆盖 Antigravity 的广告剩余积分（测试/强制值）。 |
| `AGY_TOKEN_FILE` | `~/.gemini/antigravity-cli/antigravity-oauth-token` | `src/app/api/providers/agy-auth/apply-local/route.ts` | 覆盖自动检测本地登录导入的 Antigravity CLI (agy) Token 文件路径。 |

### OAuth CLI 桥接（内部）

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_SERVER` | 自动检测 | `src/lib/oauth/config/index.ts` | CLI↔OmniRoute 认证桥接的服务器 URL。 |
| `OMNIROUTE_TOKEN` | _(未设置)_ | `src/lib/oauth/config/index.ts` | CLI 桥接的认证 Token。 |
| `OMNIROUTE_USER_ID` | `cli` | `src/lib/oauth/config/index.ts` | CLI 桥接会话的用户 ID。 |
| `SERVER_URL` | _(未设置)_ | `src/lib/oauth/config/index.ts` | `OMNIROUTE_SERVER` 的旧版别名。 |
| `CLI_TOKEN` | _(未设置)_ | `src/lib/oauth/config/index.ts` | `OMNIROUTE_TOKEN` 的旧版别名。 |
| `CLI_USER_ID` | _(未设置)_ | `src/lib/oauth/config/index.ts` | `OMNIROUTE_USER_ID` 的旧版别名。 |

---

## 11. OAuth 服务商凭证

用于 **localhost 开发** 的内置凭证。对于远程部署，请在各个服务商的开发者控制台中注册你自己的凭证。

| 变量 | 服务商 | 备注 |
| --- | --- | --- |
| `CLAUDE_OAUTH_CLIENT_ID` | Claude Code (Anthropic) | 公共客户端 — 无需 secret。 |
| `CLAUDE_CODE_REDIRECT_URI` | Claude Code | 覆盖重定向 URI。默认值：`https://platform.claude.com/oauth/code/callback` |
| `CODEX_OAUTH_CLIENT_ID` | Codex / OpenAI | 公共客户端。 |
| `GEMINI_OAUTH_CLIENT_ID` | Gemini (Google) | 需要匹配的 `_SECRET`。 |
| `GEMINI_OAUTH_CLIENT_SECRET` | Gemini (Google) | — |
| `QWEN_OAUTH_CLIENT_ID` | Qwen (Alibaba) | 公共客户端。 |
| `KIMI_CODING_OAUTH_CLIENT_ID` | Kimi Coding (Moonshot) | 公共客户端。 |
| `ANTIGRAVITY_OAUTH_CLIENT_ID` | Antigravity (Google) | 需要匹配的 `_SECRET`。 |
| `ANTIGRAVITY_OAUTH_CLIENT_SECRET` | Antigravity (Google) | — |
| `GITHUB_OAUTH_CLIENT_ID` | GitHub Copilot | 公共客户端。 |
| `WINDSURF_FIREBASE_API_KEY` | Windsurf / Devin (v3.8) | Windsurf 安全 Token 服务用于刷新的公共 Firebase Web API key。客户端凭证（非密钥）。长期导入 Token 完全跳过此步骤。来源：从 Devin CLI 二进制文件中提取。 |
| `WINDSURF_API_KEY` | Windsurf / Devin (v3.8) | 无每个连接凭证时 `open-sse/executors/devin-cli.ts` 使用的 API key 回退。可选。 |
| `CLI_DEVIN_BIN` | Devin CLI (v3.8) | Devin CLI 二进制文件（`devin`）的自定义路径。由 `open-sse/executors/devin-cli.ts` 解析。 |
| `GITLAB_DUO_OAUTH_CLIENT_ID` | GitLab Duo (v3.8) | GitLab Duo 的 OAuth client ID。在 `https://gitlab.com/-/profile/applications` 注册应用，redirect URI 为 `<NEXT_PUBLIC_BASE_URL>/callback`，权限域为 `api, read_user, openid, profile, email`。回退到 `GITLAB_OAUTH_CLIENT_ID`。 |
| `GITLAB_DUO_OAUTH_CLIENT_SECRET` | GitLab Duo (v3.8) | GitLab Duo 的 OAuth client secret。可选 — PKCE 流程不需要 secret。回退到 `GITLAB_OAUTH_CLIENT_SECRET`。 |
| `GITLAB_DUO_BASE_URL` | GitLab Duo (v3.8) | 覆盖 GitLab 基础 URL（自托管 GitLab）。默认为 `https://gitlab.com`。回退到 `GITLAB_BASE_URL`。 |
| `GITLAB_BASE_URL` | GitLab Duo (v3.8) | `GITLAB_DUO_BASE_URL` 的旧版回退。在 `_DUO_` 变体未设置时使用。 |
| `GITLAB_OAUTH_CLIENT_ID` | GitLab Duo (v3.8) | `GITLAB_DUO_OAUTH_CLIENT_ID` 的旧版回退，由 `src/lib/oauth/constants/oauth.ts` 使用。 |
| `GITLAB_OAUTH_CLIENT_SECRET` | GitLab Duo (v3.8) | `GITLAB_DUO_OAUTH_CLIENT_SECRET` 的旧版回退，由 `src/lib/oauth/constants/oauth.ts` 使用。 |
| `QODER_OAUTH_CLIENT_SECRET` | Qoder | — |
| `QODER_OAUTH_AUTHORIZE_URL` | Qoder | 设置以启用 Qoder OAuth。 |
| `QODER_OAUTH_TOKEN_URL` | Qoder | — |
| `QODER_OAUTH_USERINFO_URL` | Qoder | — |
| `QODER_OAUTH_CLIENT_ID` | Qoder | — |
| `QODER_PERSONAL_ACCESS_TOKEN` | Qoder | 直接 API key 回退（绕过 OAuth）。 |
| `QODER_CLI_WORKSPACE` | Qoder | Qoder CLI 的 workspace ID。 |
| `OMNIROUTE_QODER_WORKSPACE` | Qoder | `QODER_CLI_WORKSPACE` 的别名。 |
| `BLACKBOX_WEB_VALIDATED_TOKEN` | Blackbox Web | 作为 `validated` 发送到 `/api/chat` 的前端 `tk` Token。当 Blackbox 强制 Token 匹配时必需；否则 OmniRoute 回退到随机 UUID。参阅 issue #2252。 |
| `VISION_BRIDGE_BASE_URL` | Vision Bridge 安全护栏 | 非 Anthropic 视觉桥接调用的 OpenAI 兼容基础 URL。默认为旧版 OpenAI URL 或 api.openai.com。指向 OmniRoute 的 `/v1` 自循环或任意 OpenAI 兼容端点（Gemini OpenAI-compat、OpenRouter）。Issue #2232。 |
| `VISION_BRIDGE_API_KEY` | Vision Bridge 安全护栏 | 上面 URL 的 API key。对于非 Anthropic 视觉桥接调用，覆盖每个服务商的 OpenAI / Google 环境变量。Anthropic 模型保留其专用的 Anthropic key 路径。Issue #2232。 |

> [!WARNING]
>
> 1. 前往 [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
> 2. 创建一个 OAuth 2.0 Client ID（类型："Web application"）
> 3. 将你的服务器 URL 添加为授权的 redirect URI
> 4. 在 `.env` 中替换凭证值。

---

## 12. 服务商 User-Agent 覆盖

覆盖发送到每个上游服务商的 `User-Agent` 头。由 executor 基类在运行时动态解析：

```
process.env[`${PROVIDER_ID}_USER_AGENT`]
```

> **来源：** `open-sse/executors/base.ts` → `buildHeaders()`

| 变量 | 默认值 | 何时更新 |
| --- | --- | --- |
| `CLAUDE_USER_AGENT` | `claude-cli/2.1.195 (external, cli)` | Anthropic 发布新的 CLI 版本时 |
| `CLAUDE_DISABLE_TOOL_NAME_CLOAK` | `false` | `executors/base.ts` + `executors/cliproxyapi.ts` | 设为 `1`/`true` 可将第三方测试工具的工具名称原封不动地转发到 Anthropic 的两条绑定路径上（原生 OAuth 和 CLIProxyAPI）。默认情况下 executor 会将非 Claude Code 的工具名称确定性别名化（Claude Code 存在规范映射的用规范映射，否则用 PascalCase），并通过 `_toolNameMap` 在响应中还原，从而确保带 snake_case 工具的测试工具不会被视为指纹化第三方客户端而被拒绝。仅供调试。 |
| `CODEX_USER_AGENT` | `codex-cli/0.142.0 (Windows 10.0.26200; x64)` | OpenAI 更新 Codex CLI 时 |
| `CODEX_CLIENT_VERSION` | `0.131.0` | 独立于完整 UA 字符串覆盖 Codex 客户端版本 |
| `GITHUB_USER_AGENT` | `GitHubCopilotChat/0.54.0` | GitHub Copilot Chat 更新时 |
| `ANTIGRAVITY_USER_AGENT` | `antigravity/2.0.1 darwin/arm64` | Antigravity IDE 更新时 |
| `KIRO_USER_AGENT` | `AWS-SDK-JS/3.0.0 kiro-ide/1.0.0` | Kiro IDE 更新时 |
| `KIRO_OAUTH_CLIENT_ID` | `kiro-cli` | 覆盖 Kiro social device-code `clientId`（公共 ID） |
| `KIRO_VERIFY_FULL_CRC` | `false` | 启用：在 Kiro 事件流上全帧消息 CRC 校验（调试损坏的流） |
| `QODER_USER_AGENT` | `Qoder-Cli` | Qoder CLI 更新时 |
| `QWEN_USER_AGENT` | `QwenCode/0.19.3 (linux; x64)` | Qwen Code 更新时 |
| `CURSOR_USER_AGENT` | `Cursor/3.3` | Cursor 更新时 |

> [!TIP]
> 你可以通过 `{PROVIDER_ID}_USER_AGENT` 模式为 **任意** 服务商添加 User-Agent 覆盖。Executor 会动态构建环境变量名。

---

## 13. CLI 指纹兼容

启用后，OmniRoute 会重排 HTTP 头和 JSON body 字段以匹配官方 CLI 工具的精确签名。在保留代理 IP 的同时，降低账户被标记的风险。

**来源：** `open-sse/config/cliFingerprints.ts`, `open-sse/executors/base.ts`

### 按服务商

| 变量 | 激活方式 | 效果 |
| --- | --- | --- |
| `CLI_COMPAT_CODEX` | `=1` | 模拟 Codex CLI 请求签名 |
| `CLI_COMPAT_CLAUDE` | `=1` | 模拟 Claude Code 请求签名 |
| `CLI_COMPAT_GITHUB` | `=1` | 模拟 GitHub Copilot 请求签名 |
| `CLI_COMPAT_ANTIGRAVITY` | `=1` | 模拟 Antigravity 请求签名 |
| `CLI_COMPAT_CURSOR` | `=1` | 模拟 Cursor 请求签名 |
| `CLI_COMPAT_KIMI_CODING` | `=1` | 模拟 Kimi Coding 请求签名 |
| `CLI_COMPAT_KILOCODE` | `=1` | 模拟 Kilo Code 请求签名 |
| `CLI_COMPAT_CLINE` | `=1` | 模拟 Cline 请求签名 |
| `CLI_COMPAT_QWEN` | `=1` | 模拟 Qwen Code 请求签名 |

### 全局

| 变量 | 激活方式 | 效果 |
| --- | --- | --- |
| `CLI_COMPAT_ALL` | `=1` | 一次性为**所有**服务商启用指纹兼容。 |

### Kimi Coding CLI 身份标识覆盖

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `KIMI_CLI_VERSION` | `1.36.0` | `src/lib/oauth/providers/kimi-coding.ts` | 覆盖 OAuth/API 调用时发送的 Kimi CLI 版本。 |
| `KIMI_CODING_DEVICE_ID` | _(已捕获的默认值)_ | `src/lib/oauth/providers/kimi-coding.ts` | 覆盖客户端头中使用的已捕获 Kimi 设备 ID。 |

> [!NOTE]
> 此功能与 User-Agent 覆盖（§12）协同工作。指纹系统处理头部排序和 body 字段排序，User-Agent 覆盖处理具体的 UA 字符串。两者可独立启用。

---

## 14. API Key 服务商

使用直接认证的服务商的 API key。**推荐配置方式：** Dashboard → Providers → Add API Key。

通过环境变量设置是 Docker 或无头部署的替代方式。

识别模式：`{PROVIDER_ID}_API_KEY`

| 变量 | 服务商 |
| --- | --- |
| `DEEPSEEK_API_KEY` | DeepSeek |
| `NVIDIA_API_KEY` | NVIDIA NIM |

> [!NOTE]
> 在 v3.8.0 中移除了 Groq、xAI、Mistral、Perplexity、Together AI、Fireworks、Cerebras、Cohere、Nebius 和 Qianfan 的静态 `${PROVIDER}_API_KEY` 条目，因为运行时不再读取它们 — 这些服务商仅通过 Dashboard / `data/provider-credentials.json` / 加密数据库获取凭证。参阅本文档末尾的 _审计：已移除/废弃的变量_ 部分了解迁移路径。

> [!TIP]
> 通过 Dashboard 设置的 Key 会加密存储在 SQLite 中，优先级高于环境变量。

---

## 15. 超时设置

所有值均以 **毫秒** 为单位。集中解析在 `src/shared/utils/runtimeTimeouts.ts`。

### 超时层级

```
REQUEST_TIMEOUT_MS (全局覆盖)
├─→ FETCH_TIMEOUT_MS (上游服务商调用, 默认值: 600000)
│   ├─→ FETCH_HEADERS_TIMEOUT_MS (继承自 FETCH_TIMEOUT_MS)
│   ├─→ FETCH_BODY_TIMEOUT_MS (继承自 FETCH_TIMEOUT_MS)
│   ├─→ TLS_CLIENT_TIMEOUT_MS (继承自 FETCH_TIMEOUT_MS)
│   ├── FETCH_CONNECT_TIMEOUT_MS (独立, 默认值: 30000)
│   └── FETCH_KEEPALIVE_TIMEOUT_MS (独立, 默认值: 4000)
├─→ STREAM_IDLE_TIMEOUT_MS (继承自 REQUEST_TIMEOUT_MS, 默认值: 600000)
├─→ STREAM_READINESS_TIMEOUT_MS (继承自 REQUEST_TIMEOUT_MS, 默认值: 80000)
└─→ API_BRIDGE_PROXY_TIMEOUT_MS (继承自 REQUEST_TIMEOUT_MS, 默认值: 30000)
    ├─→ API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS (派生, 默认值: 300000)
    ├── API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS (默认值: 60000)
    ├── API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS (默认值: 5000)
    └── API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS (默认值: 0 = 禁用)
```

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `REQUEST_TIMEOUT_MS` | _(未设置)_ | 全局快捷方式 — 覆盖 `FETCH_TIMEOUT_MS` 和 `STREAM_IDLE_TIMEOUT_MS` 两者的默认值。 |
| `FETCH_TIMEOUT_MS` | `600000` | 上游服务商调用的 HTTP 请求总超时。 |
| `STREAM_IDLE_TIMEOUT_MS` | `600000` | SSE 块之间的最长静默时间，超时则中止。扩展推理模型很少暂停超过 90 秒。 |
| `STREAM_READINESS_TIMEOUT_MS` | `80000` | 接收第一个非 ping SSE 事件的超时时间。设置时继承 `REQUEST_TIMEOUT_MS`。 |
| `OMNIROUTE_CODEX_DROP_NONSTANDARD_EVENTS` | _(关闭)_ | 剥离会导致 OpenAI SDK 的 `responses.stream()` 以 502 报错的非标准 `codex.*` SSE 事件（如 `codex.rate_limits`）。设为 `true`/`1`/`yes` 可启用。 |
| `FETCH_HEADERS_TIMEOUT_MS` | = `FETCH_TIMEOUT_MS` | 接收响应头的超时时间。 |
| `FETCH_BODY_TIMEOUT_MS` | = `FETCH_TIMEOUT_MS` | 接收完整响应体的超时时间。 |
| `FETCH_CONNECT_TIMEOUT_MS` | `30000` | TCP 连接建立超时。 |
| `FETCH_KEEPALIVE_TIMEOUT_MS` | `4000` | Keep-alive 套接字空闲超时。 |
| `TLS_CLIENT_TIMEOUT_MS` | = `FETCH_TIMEOUT_MS` | TLS 指纹代理（wreq-js）超时。 |
| `API_BRIDGE_PROXY_TIMEOUT_MS` | `30000` | `/v1` 桥接请求的代理跳超时。 |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS` | `300000` | 桥接的服务器请求总超时。 |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS` | `60000` | 通过桥接发送响应头的超时时间。 |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000` | 桥接 keep-alive 空闲超时。 |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS` | `0` | 原始套接字超时（0 = 禁用）。 |
| `SHUTDOWN_TIMEOUT_MS` | `30000` | SIGTERM/SIGINT 后强制退出前的宽限期。 |
| `OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS` | `120000` | `FETCH_TIMEOUT_MS` 未设置时 `src/shared/utils/fetchTimeout.ts` 使用的回退值。 |
| `OMNIROUTE_CHATGPT_TLS_TIMEOUT_MS` | `60000` | bogdanfinn/tls-client koffi 绑定的线路级超时（`chatgptTlsClient.ts`）。 |
| `OMNIROUTE_CHATGPT_TLS_GRACE_MS` | `10000` | 原生绑定卡住时在线路超时之上添加的 JS 侧宽恕时间。 |
| `OMNIROUTE_CHATGPT_STREAM_FIRST_BYTE_TIMEOUT_MS` | `30000`（30 秒） | ChatGPT TLS sidecar（`chatgptTlsClient.ts`）在中止死流前等待第一个流式字节的最大时间。如果上游冷启动超过窗口则提高。 |
| `OMNIROUTE_CLAUDE_TLS_TIMEOUT_MS` | `60000` | bogdanfinn/tls-client koffi 绑定的线路级超时（`claudeTlsClient.ts`）。 |
| `OMNIROUTE_CLAUDE_TLS_GRACE_MS` | `10000` | 原生绑定卡住时在线路超时之上添加的 JS 侧宽恕时间。 |
| `OMNIROUTE_PPLX_TLS_TIMEOUT_MS` | `30000` | bogdanfinn/tls-client koffi 绑定的线路级超时（`perplexityTlsClient.ts`）。 |
| `OMNIROUTE_PPLX_TLS_GRACE_MS` | `10000` | 原生绑定卡住时在线路超时之上添加的 JS 侧宽恕时间。 |
| `OMNIROUTE_GROK_TLS_TIMEOUT_MS` | `60000` | bogdanfinn/tls-client koffi 绑定的线路级超时（`grokTlsClient.ts`）。 |
| `OMNIROUTE_GROK_TLS_GRACE_MS` | `10000` | 原生绑定卡住时在线路超时之上添加的 JS 侧宽恕时间。 |
| `OMNIROUTE_BROWSER_POOL` | `on` | 用于浏览器端 Web Cookie 聊天的共享 Playwright 浏览器池（`browserPool.ts`）；设为 `off` 可禁用。 |
| `WEB_COOKIE_USE_BROWSER` | `0` | 将 Web Cookie 聊天请求选择进入浏览器端路径（`browserBackedChat.ts`）；`1` 启用。 |

Combo 目标尝试继承已解析的上游请求超时（`FETCH_TIMEOUT_MS`，或当它提供 fetch 默认值时的 `REQUEST_TIMEOUT_MS`）。仅在 Combo 中设置 `targetTimeoutMs`、Combo 默认值或服务商覆盖值以加快 Combo 回退；超过当前上游超时的值会被截断到上游超时。

### 熔断器阈值

服务商级熔断器调优。默认值反映了 v3.6 以来用于 500+ 连接的缩放值。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_CIRCUIT_BREAKER_OAUTH_THRESHOLD` | `8` | `open-sse/config/constants.ts` | OAuth 服务商的连续失败阈值，超过则熔断器跳开。 |
| `OMNIROUTE_CIRCUIT_BREAKER_OAUTH_RESET_MS` | `60000` | `open-sse/config/constants.ts` | OAuth 服务商熔断器的重置窗口（毫秒）。 |
| `OMNIROUTE_CIRCUIT_BREAKER_API_KEY_THRESHOLD` | `12` | `open-sse/config/constants.ts` | API-key 服务商的连续失败阈值。 |
| `OMNIROUTE_CIRCUIT_BREAKER_API_KEY_RESET_MS` | `30000` | `open-sse/config/constants.ts` | API-key 服务商熔断器的重置窗口（毫秒）。 |
| `OMNIROUTE_CIRCUIT_BREAKER_LOCAL_THRESHOLD` | `2` | `open-sse/config/constants.ts` | 本地服务商（Ollama、LM Studio 等）的连续失败阈值。 |
| `OMNIROUTE_CIRCUIT_BREAKER_LOCAL_RESET_MS` | `15000` | `open-sse/config/constants.ts` | 本地服务商熔断器的重置窗口（毫秒）。 |
| `PIN_DROP_BACKOFF_LEVEL` | `2` | `open-sse/services/combo.ts` | 退避深度，达到此值后上下文缓存 pin 的服务商被视为持续不健康，pin 被丢弃以进行故障转移。 |
| `PIN_DROP_GRACE_MS` | `20000` | `open-sse/services/combo.ts` | 防抖窗口（毫秒），在丢弃上下文缓存 pin 之前容忍短暂的瞬态冷却。 |

### 场景

| 场景 | 配置 |
| --- | --- |
| **长时间代码生成** | `REQUEST_TIMEOUT_MS=900000`（15 分钟） |
| **生产 API 快速失败** | `API_BRIDGE_PROXY_TIMEOUT_MS=10000` |
| **扩展推理模型** | `STREAM_IDLE_TIMEOUT_MS=300000`（块间 5 分钟） |

---

## 16. 日志

日志系统同时写入 stdout 和轮转日志文件。所有配置由 `src/lib/logEnv.ts` 读取。

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `APP_LOG_LEVEL` | `info` | 最低日志级别：`debug`、`info`、`warn`、`error`。 |
| `APP_LOG_FORMAT` | `text` | 输出格式：`text`（人类可读）或 `json`（结构化）。 |
| `APP_LOG_TO_FILE` | `true` | 同时写入日志文件和 stdout。 |
| `APP_LOG_FILE_PATH` | `logs/application/app.log` | 日志文件路径（相对于项目根目录或 `DATA_DIR`）。 |
| `APP_LOG_MAX_FILE_SIZE` | `50M` | 轮转前的最大文件大小。可接受：`50M`、`1G`、`512K` 或纯字节数。 |
| `APP_LOG_RETENTION_DAYS` | `7` | 保留轮转后应用日志文件的天数。 |
| `APP_LOG_MAX_FILES` | `20` | 最大轮转日志文件备份数。 |
| `CALL_LOG_RETENTION_DAYS` | `7` | 在数据库中保留请求/调用日志条目的天数。 |
| `CALL_LOG_MAX_ENTRIES` | `10000` | 内存缓冲区中最大调用日志条目数。 |
| `CALL_LOGS_TABLE_MAX_ROWS` | `100000` | `call_logs` SQLite 表在清理前的最大行数。 |
| `MAX_PENDING_REQUEST_AGE_MS` | `3600000`（1 小时） | 孤立活跃请求日志条目在内存清理前的最大生存时间。 |
| `CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS` | `true` | 当 `call_log_pipeline_enabled=true` 时在 pipeline artifacts 中存储流块。 |
| `CALL_LOG_PIPELINE_MAX_SIZE_KB` | `512` | 当 `call_log_pipeline_enabled=true` 时的最大 pipeline 调用日志工件大小（KB）。 |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` SQLite 表在清理前的最大行数。 |
| `APP_LOG_ROTATION_CHECK_INTERVAL_MS` | `60000`（1 分钟） | `src/lib/logRotation.ts` 重新检查活跃日志文件大小的频率。 |
| `CHAT_LOG_TEXT_LIMIT` | `65536` | 聊天日志工件中保留的最大字符串长度（默认 64 KB）。 |
| `CHAT_LOG_ARRAY_TAIL_ITEMS` | `24` | 截断聊天日志载荷时从尾部保留的数组项数量。 |
| `CHAT_LOG_MAX_DEPTH` | `6` | 聊天日志载荷被截断前的最大嵌套深度。 |
| `CHAT_DEBUG_FILE` | `false` | 设为 true 时，`serializeArtifactForStorage` 跳过基于大小的截断。仅供调试。 |

---

## 17. 内存优化

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `OMNIROUTE_MEMORY_MB` | _自动_ | 运行时 V8 堆限制（MB）。未设置时动态校准（约 35% 系统内存，限制在 `[512, 4096]`）；`512` 仅是总内存不可读取时的下限。显式设置以覆盖。Docker 独立运行和 `omniroute serve` 用它设置 `--max-old-space-size`。 |
| `PROMPT_CACHE_MAX_SIZE` | `50` | 最大缓存系统提示条目数。 |
| `PROMPT_CACHE_MAX_BYTES` | `2097152`（2 MB） | 最大提示缓存总大小。 |
| `PROMPT_CACHE_TTL_MS` | `300000`（5 分钟） | 提示缓存条目 TTL。 |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | 最大缓存 temperature=0 响应数。 |
| `SEMANTIC_CACHE_MAX_BYTES` | `4194304`（4 MB） | 最大语义缓存总大小。 |
| `SEMANTIC_CACHE_TTL_MS` | `1800000`（30 分钟） | 语义缓存条目 TTL。 |
| `STREAM_HISTORY_MAX` | `50` | Dashboard 实时视图缓冲区中最大近期流事件数。 |
| `CONTEXT_LENGTH_DEFAULT` | `128000` | 没有显式配置的模型的全局回退最大上下文长度。 |
| `USAGE_TOKEN_BUFFER` | `100` | 跟踪用量配额时保留的额外 Token 余量。 |

### 压缩

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS` | 未设置 | 无需 `.rtk/trust.json` 哈希即可信任项目 `.rtk/filters.json`。仅在受控的本地开发中使用。 |

### 记忆引擎（plan 21）

持久记忆子系统（`src/lib/memory/`）的嵌入层、向量存储和重排序开关。

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`（5 分钟） | 内存嵌入缓存（每个源/模型/维度签名）的 TTL。 |
| `MEMORY_EMBEDDING_CACHE_MAX` | `1000` | 嵌入缓存中保留的最大 LRU 条目数。 |
| `MEMORY_TRANSFORMERS_MODEL` | `Xenova/all-MiniLM-L6-v2` | 用于可选的 `@huggingface/transformers` 本地 MiniLM 管线的 HF 仓库 ID（约 23 MB int8，约 400 MB RAM）。 |
| `MEMORY_STATIC_MODEL` | `minishlab/potion-base-8M` | 用于静态 potion/Model2Vec 查找表嵌入器的 HF 仓库 ID。懒加载下载到缓存目录。 |
| `MEMORY_STATIC_CACHE_DIR` | `<DATA_DIR>/embeddings` | 用于缓存静态 potion 模型文件的目录。未设置时默认为 `DATA_DIR` 下。 |
| `MEMORY_VEC_TOP_K` | `20` | `src/lib/memory/vectorStore.ts` 内部 `sqlite-vec` 暴力向量搜索使用的默认 top-K。 |
| `MEMORY_RRF_K` | `60` | FTS5 + 向量混合检索的 Reciprocal Rank Fusion 常数 `k`（sqlite-vec 方案）。 |
| `HF_HUB_ENDPOINT` | `https://huggingface.co` | 覆盖 `staticPotion.ts` 使用的 Hugging Face Hub 基础 URL（如气隙环境下的镜像端点）。 |

### 低内存 Docker 示例

```bash
OMNIROUTE_MEMORY_MB=128
PROMPT_CACHE_MAX_SIZE=20
PROMPT_CACHE_MAX_BYTES=524288        # 512 KB
SEMANTIC_CACHE_MAX_SIZE=25
SEMANTIC_CACHE_MAX_BYTES=1048576     # 1 MB
STREAM_HISTORY_MAX=10
```

---

## 18. 价格同步

从外部源自动同步模型价格数据。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `PRICING_SYNC_ENABLED` | `false` | `src/lib/pricingSync.ts` | 可选的定期价格同步。 |
| `PRICING_SYNC_INTERVAL` | `86400`（24 小时） | `src/lib/pricingSync.ts` | 同步间隔，秒。 |
| `PRICING_SYNC_SOURCES` | `litellm` | `src/lib/pricingSync.ts` | 逗号分隔的数据源。 |

---

## Arena ELO 同步

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `ARENA_ELO_SYNC_ENABLED` | `true` | `src/shared/constants/featureFlagDefinitions.ts` | 定期 Arena AI 排行榜 ELO 同步，可从 Dashboard Feature Flags 配置或设为 `false` 退出。 |
| `ARENA_ELO_SYNC_INTERVAL` | `86400`（24 小时） | `src/lib/arenaEloSync.ts` | 同步间隔，秒。 |

---

## 19. 模型同步（开发）

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`（24 小时） | `src/lib/modelsDevSync.ts` | 开发时的模型目錄同步间隔，秒。 |

---

## 20. 服务商特定设置

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OPENROUTER_CATALOG_TTL_MS` | `86400000`（24 小时） | `src/lib/catalog/openrouterCatalog.ts` | OpenRouter 模型目錄缓存 TTL。 |
| `MODEL_CATALOG_INCLUDE_NAMES` | `true` | `src/shared/constants/featureFlagDefinitions.ts` | 在 `/v1/models` 响应中包含显示友好的 `name` 字段。对于只需要 ID 的客户端可禁用。 |
| `NANOBANANA_POLL_TIMEOUT_MS` | `120000` | `open-sse/handlers/imageGeneration.ts` | NanoBanana 图片生成任务的最大等待时间。 |
| `NANOBANANA_POLL_INTERVAL_MS` | `2500` | `open-sse/handlers/imageGeneration.ts` | NanoBanana 任务轮询频率。 |
| `AWS_REGION` | _(未设置)_ | `src/lib/providers/validation.ts`, `open-sse/handlers/audioSpeech.ts` | 用于构建 AWS Bedrock 端点的区域（Kiro、音频）。 |
| `AWS_DEFAULT_REGION` | _(未设置)_ | `src/lib/providers/validation.ts`, `open-sse/handlers/audioSpeech.ts` | `AWS_REGION` 未设置时的回退。 |
| `CLOUDFLARE_ACCOUNT_ID` | _(未设置)_ | `open-sse/executors/cloudflare-ai.ts` | Cloudflare Workers AI 的 Account ID。 |
| `CLOUDFLARE_API_BASE` | `https://api.cloudflare.com/client/v4` | `src/app/api/settings/proxy/cloudflare-deploy/route.ts` | 覆盖代理池 Workers 中继部署器使用的 Cloudflare REST API 基础 URL（#4640 / 9router#1360）。 |
| `NEXT_PUBLIC_CLOUDFLARE_RELAY_DEFAULT_PROJECT` | `omniroute-relay` | `src/app/(dashboard)/dashboard/settings/components/proxy/CloudflareRelayModal.tsx` | 代理池"Deploy Relay"弹窗中建议的默认 worker 项目名。 |
| `NEXT_PUBLIC_CLOUDFLARE_RELAY_ENABLED` | `true` | `src/app/(dashboard)/dashboard/settings/components/proxy/ProxyPoolTab.tsx` | 设为 `false` 可从 Proxy Pool 选项卡中隐藏 Cloudflare Workers 中继选项。 |
| `CLOUDFLARED_BIN` | 自动检测 | `src/lib/cloudflaredTunnel.ts` | `cloudflared` 二进制文件的自定义路径。 |
| `DENO_DEPLOY_API_BASE` | `https://api.deno.com/v2` | `src/app/api/settings/proxy/deno-deploy/route.ts` | 覆盖代理池中继部署器使用的 Deno Deploy REST API 基础 URL（#4643 / 9router#1437）。 |
| `NEXT_PUBLIC_DENO_RELAY_DEFAULT_PROJECT` | `omniroute-deno-relay` | `src/app/(dashboard)/dashboard/settings/components/proxy/DenoRelayModal.tsx` | 代理池"Deploy Relay"弹窗中建议的默认 Deno Deploy 应用名。 |
| `NEXT_PUBLIC_DENO_RELAY_ENABLED` | `true` | `src/app/(dashboard)/dashboard/settings/components/proxy/ProxyPoolTab.tsx` | 设为 `false` 可从 Proxy Pool 选项卡中隐藏 Deno Deploy 中继选项。 |
| `SEARCH_CACHE_TTL_MS` | `300000`（5 分钟） | `open-sse/services/searchCache.ts` | 搜索 API（Perplexity、Brave 等）响应缓存的 TTL。 |
| `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE` | `false` | `src/app/api/providers/route.ts` | 允许每个 OpenAI 兼容服务商同时建立多个连接。 |
| `ENABLE_CC_COMPATIBLE_PROVIDER` | `false` | `src/shared/utils/featureFlags.ts` | 为仅 Claude Code 中继显示实验性 CC 兼容服务商 UI。 |
| `NINEROUTER_HOST` | `127.0.0.1` | `open-sse/executors/ninerouter.ts` | 覆盖嵌入式 9router 实例监听的主机。 |
| `NINEROUTER_PORT` | `20130` | `open-sse/executors/ninerouter.ts` | 覆盖嵌入式 9router 实例监听的端口。 |
| `EMBED_WS_PROXY_HOST` | `127.0.0.1` | `src/lib/services/embedWsProxy.ts` | 嵌入式服务 WebSocket 代理的绑定主机（默认仅 loopback）。 |
| `EMBED_WS_PROXY_PORT` | `20131` | `src/lib/services/embedWsProxy.ts` | 嵌入式服务 WebSocket 代理服务器的端口。 |
| `CLIPROXYAPI_HOST` | `127.0.0.1` | `open-sse/executors/cliproxyapi.ts` | CLIProxyAPI 桥接主机（旧版集成）。 |
| `CLIPROXYAPI_PORT` | `5544` | `open-sse/executors/cliproxyapi.ts` | CLIProxyAPI 桥接端口。 |
| `CLIPROXYAPI_CONFIG_DIR` | `~/.cli-proxy-api` | `src/lib/versionManager/processManager.ts` | CLIProxyAPI 配置目录。 |
| `LOCAL_HOSTNAMES` | _(空)_ | `open-sse/config/providerRegistry.ts` | 逗号分隔的额外被视为"本地"的主机名（Docker 服务名称等）。 |

`ENABLE_CC_COMPATIBLE_PROVIDER` 仅适用于接受 Claude Code 客户端的第三方中继。
OmniRoute 会重写请求以使这些中继接受。如果你只想使用
Claude Code CLI，或者不确定这些中继是什么，请保持此项禁用并添加一个普通的
Anthropic 兼容服务商。

---

## 21. 代理健康

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000` | `src/lib/proxyHealth.ts` | 快速失败健康检查超时。 |
| `PROXY_HEALTH_CACHE_TTL_MS` | `30000` | `src/lib/proxyHealth.ts` | 健康检查结果缓存 TTL。 |
| `PROXY_HEALTH_UNHEALTHY_CACHE_TTL_MS` | `2000` | `src/lib/proxyHealth.ts` | 代理健康探测失败的缓存 TTL。保持在低于 `PROXY_HEALTH_CACHE_TTL_MS` 的值，以便高并发下的瞬态代理超时能快速重试，同时不会为真正死掉的代理禁用快速失败。 |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | `false` | `src/shared/constants/featureFlagDefinitions.ts` | 允许 OAuth 和服务商校验流程在代理可达性预检失败时绕过固定代理直接连接。有效优先级为 Feature Flags DB 覆盖 > 环境变量 > 默认值。 |
| `RATE_LIMIT_MAX_WAIT_MS` | `120000`（2 分钟） | `open-sse/services/rateLimitManager.ts` | 在请求失败前等待 429 的最长时间。 |
| `RATE_LIMIT_AUTO_ENABLE` | _(未设置)_ | `open-sse/services/rateLimitManager.ts` | 强制打开/关闭自动启用速率限制安全网，不管持久化的 Dashboard 设置。接受 `true`/`1`/`on` 强制开启，`false`/`0`/`off` 强制关闭。 |
| `PROVIDER_COOLDOWN_ENABLED` | _(未设置 → 关闭)_ | `open-sse/services/providerCooldownTracker.ts` | 启用全局跨请求服务商/连接冷却跟踪。默认关闭（与 Connection Cooldown / Provider Circuit Breaker 重叠）。接受 `true`/`1`/`on` 启用。 |
| `PROVIDER_COOLDOWN_MIN_MS` | `5000` | `open-sse/services/providerCooldownTracker.ts` | 失败的服务商/连接重试前的最短冷却时间（毫秒）。随连续失败次数指数级增长。仅在 `PROVIDER_COOLDOWN_ENABLED` 时使用。 |
| `PROVIDER_COOLDOWN_MAX_MS` | `300000`（5 分钟） | `open-sse/services/providerCooldownTracker.ts` | 失败的服务商/连接重试前的最大冷却上限（毫秒）。仅在 `PROVIDER_COOLDOWN_ENABLED` 时使用。 |
| `STREAM_RECOVERY_ENABLED` | _(未设置 → 关闭)_ | `src/lib/resilience/settings.ts`（种子） → `open-sse/services/streamRecovery.ts`（逻辑） | **这是什么：** 透明恢复被截断的上游流（free-claude-code 端口）。将打开 SSE 窗口保持最多 `STREAM_RECOVERY.HOLDBACK_MS`（750 毫秒），使得 _提交前_ 截断 — 即任何字节到达客户端之前 — 被透明地重新打开和重试。**何时启用：** 频繁在流开始时 0 字节截断的不稳定上游；如果无法承受每个流最多 750 毫秒的首 Token 延迟增加，请保持关闭。接受 `true`/`1`/`on`。为持久化容灾设置提供种子；Dashboard 设置一旦设置即生效。 |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED` | _(未设置 → 关闭)_ | `src/lib/resilience/settings.ts`（种子） → `open-sse/services/streamRecovery.ts`（逻辑） | **这是什么：** 流中续传（Fase 4.4）— _提交后_ 截断（字节已到达客户端）之后，用部分文本作为 assistant 预填充重新请求，拼接缺失的后缀。仅限纯文本 OpenAI 兼容流；有工具调用在进行时永不触发。**何时启用：** 长生成被中途截断，且你接受恢复的后缀以一次性爆发而非逐 Token 到达。独立于 `STREAM_RECOVERY_ENABLED`（不同的风险特征）。接受 `true`/`1`/`on`。 |
| `HEALTHCHECK_STAGGER_MS` | `3000` | `src/lib/tokenHealthCheck.ts` | 启动时服务商 Token 健康检查之间的错开间隔（毫秒）。 |
| `REQUEST_RETRY` | `2` | `src/sse/services/cooldownAwareRetry.ts` | 模型作用域冷却响应上的自动重试次数，之后将错误返回给客户端。 |
| `MAX_RETRY_INTERVAL_SEC` | `30` | `src/sse/services/cooldownAwareRetry.ts` | 冷却重试之间的最大退避间隔（秒）。不管上游 `Retry-After` 如何，均受此值限制。 |
| `HEADROOM_URL` | `http://localhost:8787` | `src/lib/headroom/detect.ts` | Headroom Token 节省器代理 URL。Dashboard 生命周期（`api/headroom/*`）默认在 loopback 上启动本地 `headroom-ai` CLI；覆盖以指向外部 Docker sidecar 代理。 |

### 流恢复调优常量（非环境变量）

上面的两个 `STREAM_RECOVERY_*` 开关是唯一的面向运维人员的开关。
恢复行为其余部分由 `open-sse/config/constants.ts`（`STREAM_RECOVERY`）中的硬编码常量调优，在此列出仅供参考 —
修改它们需要代码编辑，而非环境变量：

- `STREAM_RECOVERY.HOLDBACK_MS = 750` — 打开 SSE 窗口保持多长时间，
  以便在任何字节提交给客户端之前可重试早期截断。
- `STREAM_RECOVERY.BUFFER_MAX_BYTES = 65536` — 保持窗口的硬上限；一旦
  累积这么多字节就提交（刷新 + 透传），不管计时器。
- `STREAM_RECOVERY.EARLY_RETRY_MAX = 4` — 保持未提交期间上游流的最多透明重开次数。

> **每个服务商的滑动窗口速率限制（无环境变量）：** FCC 迁移的
> 每个服务商滑动窗口速率限制 _回退_ 存在于代码中
> （`open-sse/services/providerDefaultRateLimit.ts`，通过
> `open-sse/services/rateLimitManager.ts` 连接），但附带了一个**空的默认 Map**
> 且目前**没有运维人员环境变量** — 它仅通过测试钩子/
> 代码编辑启用。有意不在上述表格中列出。确实有开关的
> 每个 `(token, IP)` 中继限制器是 `RELAY_IP_PER_MINUTE`（§3 网络与端口）。

---

## 22. 调试

> [!CAUTION]
> 这些变量会产生**详细输出**，并可能泄露敏感数据。**切勿在生产环境中启用。**

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `CURSOR_DEBUG` | _(未设置)_ | `open-sse/executors/cursor.ts` | 设为 `1` 可启用详细的 Cursor executor 日志（解码的 SSE 块等）。 |
| `CURSOR_STREAM_DEBUG` | _(未设置)_ | `open-sse/executors/cursor.ts` | `CURSOR_DEBUG` 的向后兼容别名。 |
| `CURSOR_DUMP_FILE` | _(未设置)_ | `open-sse/executors/cursor.ts` | 当 `CURSOR_DEBUG=1` 时，接收原始解码 Cursor 块的可选文件路径。 |
| `CURSOR_STREAM_TIMEOUT_MS` | `300000` | `open-sse/executors/cursor.ts` | Cursor executor 的流空闲超时（毫秒）。 |
| `CURSOR_TOOL_DIRECTIVE` | 启用 (`!== "0"`) | `open-sse/executors/cursor.ts` | 使 composer-2.5 可靠发出工具调用的工具提交指令。设为 `0` 可禁用。 |
| `CURSOR_IMAGE_FETCH_TIMEOUT_MS` | `15000` | `open-sse/utils/cursorImages.ts` | 远程 `image_url` 视觉输入的单张图片获取超时（毫秒）。 |
| `CURSOR_STATE_DB_PATH` | _(探测)_ | `open-sse/utils/cursorVersionDetector.ts` | 覆盖版本检测使用的 Cursor 状态数据库查询。 |
| `CURSOR_TOKEN` | _(未设置)_ | `scripts/ad-hoc/cursor-tap.cjs` | 开发工具使用的直接 Cursor bearer Token。 |
| `OMNIROUTE_LOG_REQUEST_SHAPE` | 启用 (`!== "0"`) | `src/app/api/v1/chat/completions/route.ts` | 记录大型聊天载荷的 content-type/length 标记。设为 `"0"` 可静默。 |
| `DEBUG_RESPONSES_SSE_TO_JSON` | _(未设置)_ | `open-sse/handlers/responseTranslator.ts` | 设为 `true` 可记录 Responses API SSE→JSON 转换详情。 |
| `NEXT_PUBLIC_OMNIROUTE_E2E_MODE` | _(未设置)_ | E2E 测试工具 | 设为 `true` 可启用 E2E 测试模式（放宽认证、测试钩子）。 |

---

## 23. GitHub 集成

允许用户直接从 Dashboard 报告问题。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `GITHUB_ISSUES_REPO` | _(未设置)_ | `src/app/api/v1/issues/report/route.ts` | 仓库，`owner/repo` 格式。 |
| `GITHUB_ISSUES_TOKEN` | _(未设置)_ | `src/app/api/v1/issues/report/route.ts` | 具有 `issues:write` 权限域的 GitHub Personal Access Token。 |
| `GITHUB_TOKEN` | _(未设置)_ | issue 分类 / 云代理辅助 | 通用 GitHub 访问 Token，用作 `GITHUB_ISSUES_TOKEN` 的回退，并被 `src/lib/cloudAgent/*` 中的云代理辅助使用。 |

---

## 部署场景

中继后端 SRE 指南（ts/bifrost/auto 行为、9router vs CLIProxyAPI 部署以及高吞吐量回退策略）请参阅 [Relay Backend Strategy](/docs/reference/RELAY_BACKEND_STRATEGY.md)。

### 最小本地开发

```bash
JWT_SECRET=$(openssl rand -base64 48)
API_KEY_SECRET=$(openssl rand -hex 32)
INITIAL_PASSWORD=dev123
PORT=20128
NODE_ENV=development
```

### Docker 生产

```bash
JWT_SECRET=<generated>
API_KEY_SECRET=<generated>
INITIAL_PASSWORD=<generated>
STORAGE_ENCRYPTION_KEY=<generated>
DATA_DIR=/data
PORT=20128
API_PORT=20129
NODE_ENV=production
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=true
NEXT_PUBLIC_BASE_URL=https://omniroute.example.com
BASE_URL=http://localhost:20128
OMNIROUTE_MEMORY_MB=512
CORS_ORIGIN=https://your-frontend.example.com
```

### 气隙 / CI

```bash
JWT_SECRET=test-jwt-secret-for-ci
API_KEY_SECRET=test-api-key-secret-for-ci
INITIAL_PASSWORD=testpass
NODE_ENV=production
OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true
APP_LOG_TO_FILE=false
```

### 带反向代理的 VPS（nginx + Cloudflare）

```bash
JWT_SECRET=<generated>
API_KEY_SECRET=<generated>
STORAGE_ENCRYPTION_KEY=<generated>
PORT=20128
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=true
NEXT_PUBLIC_BASE_URL=https://omniroute.example.com
BASE_URL=http://127.0.0.1:20128
CORS_ORIGIN=https://omniroute.example.com
ENABLE_TLS_FINGERPRINT=true
CLI_COMPAT_ALL=1
```

---

## 24. 技能沙箱（v3.8.0+）

技能框架（`src/lib/skills/`）在沙箱环境中执行用户定义自动化时应用的限制和安全开关。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `SKILLS_SANDBOX_TIMEOUT_MS` | `10000`（10 秒） | `src/lib/skills/builtins.ts` | 沙箱技能代码的每次执行挂钟超时时间。硬限制；超时则杀死。 |
| `SKILLS_EXECUTION_TIMEOUT_MS` | _(回退到 `SKILLS_SANDBOX_TIMEOUT_MS`)_ | `src/lib/skills/` | 高级技能编排超时。设为高于 `SKILLS_SANDBOX_TIMEOUT_MS` 以允许多步工作流。 |
| `SKILLS_MAX_FILE_BYTES` | `1048576`（1 MB） | `src/lib/skills/builtins.ts` | 技能可从单个沙箱文件读取的最大字节数。 |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES` | `256000`（250 KB） | `src/lib/skills/builtins.ts` | 技能内从单个 HTTP 响应捕获的最大字节数。 |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000` | `src/lib/skills/builtins.ts` | 沙箱调用返回的 stdout/stderr 字符硬上限。 |
| `SKILLS_SANDBOX_NETWORK_ENABLED` | `false` | `src/lib/skills/builtins.ts` | 设为 `1`/`true` 允许沙箱内部向外联网。默认**隔离**以确保安全。 |
| `SKILLS_ALLOWED_SANDBOX_IMAGES` | _(空)_ | `src/lib/skills/builtins.ts` | 逗号分隔的允许用于沙箱执行的容器镜像允许列表。空意味着仅使用内置默认值。 |
| `SKILLS_SANDBOX_DOCKER_IMAGE` | _(内置默认值)_ | `src/lib/skills/` | 启动 Docker 沙箱时使用的容器镜像。覆盖以固定自定义加固的基础镜像。 |

> [!CAUTION]
> 启用 `SKILLS_SANDBOX_NETWORK_ENABLED=true` 会打开任意技能代码的出口路径。在共享部署中请搭配 `OUTBOUND_SSRF_GUARD_ENABLED=true` 和严格的 `CORS_ORIGIN`/代理策略。

---

## 25. 服务商配额、隧道、备份与杂项运行时

服务商配额端点、网络隧道（Tailscale、Ngrok、MITM 调试代理）、1Proxy 出口池、数据库备份以及 executor 层或脚本引用的小型按功能覆盖。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `REDIS_URL` | `redis://localhost:6379` | `src/shared/utils/rateLimiter.ts` | 速率限制器后端的 Redis 连接字符串。 |
| `ALIBABA_CODING_PLAN_HOST` | _(生产主机)_ | `open-sse/services/bailianQuotaFetcher.ts` | 覆盖用于获取阿里巴巴 Bailian coding-plan 配额的主机。 |
| `ALIBABA_CODING_PLAN_QUOTA_URL` | 派生自主机 | `open-sse/services/bailianQuotaFetcher.ts` | 阿里巴巴 Bailian 的完整配额 URL 覆盖。 |
| `CONTEXT_RESERVE_TOKENS` | `1024` | `open-sse/services/contextManager.ts` | 计算提示预算时为补全输出保留的 Token 数。 |
| `MODEL_ALIAS_COMPAT_ENABLED` | 启用 | `open-sse/services/model.ts` | 切换旧客户端使用的旧版模型别名兼容层。 |
| `OMNIROUTE_EMERGENCY_FALLBACK` | 启用 | `open-sse/services/emergencyFallback.ts` | 设为 `false`（或 `0`）可禁用紧急预算耗尽回退，该回退将失败的请求重新路由到免费 `nvidia`/`openai/gpt-oss-120b` 模型。有效优先级为 Feature Flags DB 覆盖 > 环境变量 > 默认值；如果不可用，服务回退到原始环境变量值。 |
| `COMMAND_CODE_CALLBACK_PORT` | _(未设置)_ | `src/app/api/providers/command-code/auth/shared.ts` | Command Code CLI 辅助使用的 OAuth 风格回调的本地端口。 |
| `COMMAND_CODE_VERSION` | `0.33.2` | `open-sse/executors/commandCode.ts` | 作为 `x-command-code-version` 头发送到 Command Code 上游的值。覆盖以升级 CLI 版本。 |
| `MITM_LOCAL_PORT` | `443` | `src/mitm/server.cjs` | MITM 调试代理的本地绑定端口。 |
| `MITM_DISABLE_TLS_VERIFY` | `0` | `src/mitm/server.cjs` | 设为 `1` 可禁用上游 TLS 校验（仅限开发）。 |
| `MITM_IDLE_TIMEOUT_MS` | `60000` | `src/mitm/socketTimeouts.ts`, `src/mitm/server.cjs` | 代理连接的空闲套接字超时（毫秒）；超过该时间的空闲套接字会被拆除，避免泄露半打开隧道。 |
| `MITM_VERBOSE` | `1` | `src/mitm/server.cjs`, `src/mitm/_internal/bypass.cjs` | 路由决策日志详细程度：`0` 静默，值越大记录越多 bypass/路由决策。 |
| `ONEPROXY_ENABLED` | `true` | `src/lib/oneproxySync.ts` | 启用 1Proxy 出口池同步。 |
| `ONEPROXY_API_URL` | `https://1proxy-api.aitradepulse.com` | `src/lib/oneproxySync.ts` | 1Proxy 服务 API URL 覆盖。 |
| `ONEPROXY_MAX_PROXIES` | `500` | `src/lib/oneproxySync.ts` | 每次同步导入的最大代理数。 |
| `ONEPROXY_MIN_QUALITY_THRESHOLD` | `50` | `src/lib/oneproxySync.ts` | 导入代理的最低质量分。 |
| `FREE_PROXY_1PROXY_ENABLED` | `true` | `src/lib/freeProxyProviders/oneproxy.ts` | 启用 1proxy 免费代理源。设为 `false` 可禁用。 |
| `FREE_PROXY_1PROXY_API_URL` | _(见 oneproxy.ts)_ | `src/lib/freeProxyProviders/oneproxy.ts` | 1proxy API URL 覆盖。 |
| `FREE_PROXY_1PROXY_MAX` | `500` | `src/lib/freeProxyProviders/oneproxy.ts` | 从 1proxy 每次同步获取的最大代理数。 |
| `FREE_PROXY_1PROXY_MIN_QUALITY` | `50` | `src/lib/freeProxyProviders/oneproxy.ts` | 1proxy 导入的最低质量分阈值。 |
| `FREE_PROXY_PROXIFLY_ENABLED` | `true` | `src/lib/freeProxyProviders/proxifly.ts` | 启用 Proxifly 免费代理源。设为 `false` 可禁用。 |
| `FREE_PROXY_PROXIFLY_QUANTITY` | `100` | `src/lib/freeProxyProviders/proxifly.ts` | 每次 Proxifly 同步获取的代理数量。 |
| `FREE_PROXY_PROXIFLY_ANONYMITY` | `elite` | `src/lib/freeProxyProviders/proxifly.ts` | Proxifly 的匿名级别过滤（`elite`、`anonymous`、`transparent`）。 |
| `FREE_PROXY_IPLOCATE_ENABLED` | `false` | `src/lib/freeProxyProviders/iplocate.ts` | 启用 IPLocate 免费代理源。仅手动启用。 |
| `FREE_PROXY_IPLOCATE_BASE_URL` | `https://raw.githubusercontent.com/iplocate/free-proxy-list/main/protocols` | `src/lib/freeProxyProviders/iplocate.ts` | IPLocate 代理列表基础 URL 覆盖。 |
| `NEXT_PUBLIC_VERCEL_RELAY_ENABLED` | `true` | `src/app/(dashboard)/…/ProxyPoolTab.tsx` | 在 Proxy Pool 选项卡中显示/隐藏 Deploy Vercel Relay 按钮。 |
| `VERCEL_API_BASE` | `https://api.vercel.com` | `src/app/api/settings/proxy/vercel-deploy/route.ts` | Vercel API 基础 URL 覆盖（用于测试）。 |
| `NEXT_PUBLIC_VERCEL_RELAY_DEFAULT_PROJECT` | `omniroute-relay` | `src/app/(dashboard)/…/VercelRelayModal.tsx` | Vercel Relay 部署弹窗中预填的默认项目名。 |
| `TAILSCALE_BIN` | _(自动检测)_ | `src/lib/tailscaleTunnel.ts` | `tailscale` 二进制文件的显式路径。 |
| `TAILSCALED_BIN` | _(自动检测)_ | `src/lib/tailscaleTunnel.ts` | `tailscaled` 守护进程二进制文件的显式路径。 |
| `TAILSCALE_AUTHKEY` | _(未设置)_ | `src/lib/tailscaleTunnel.ts` | 非交互式/无头 `tailscale up` 的预共享 Tailscale 认证密钥（通过 `--auth-key=` 传递）。未设置时，登录回退到交互式浏览器认证 URL。 |
| `NGROK_AUTHTOKEN` | _(未设置)_ | `src/lib/ngrokTunnel.ts` | 认证出口 ngrok 隧道。 |
| `DB_BACKUP_MAX_FILES` | `20` | `src/lib/db/backup.ts` | 磁盘上保留的最大 SQLite 备份文件数。覆盖从 Settings → Database backup retention 保存的值。 |
| `DB_BACKUP_RETENTION_DAYS` | `0` | `src/lib/db/backup.ts` | 保留备份的最大天数。`0` 禁用基于时间的清理。覆盖从 Settings → Database backup retention 保存的值。 |
| `OMNIROUTE_TLS_PROXY_URL` | _(未设置)_ | `open-sse/services/chatgptTlsClient.ts` | 覆盖测试用的 TLS sidecar URL。生产环境应保持未设置。 |
| `CONTAINER_HOST` | `docker` | `scripts/check-permissions.sh` | 入口点权限检查的容器运行时提示。在无根 Podman 下设为 `podman`，以便修复指令使用 `podman unshare chown` 而非 `sudo chown`。 |
| `QUOTA_STORE_DRIVER` | `sqlite` | `src/lib/quota/storeFactory.ts` | 配额共享消费存储后端：`sqlite`（默认）或 `redis`。 |
| `QUOTA_STORE_REDIS_URL` | _(未设置)_ | `src/lib/quota/storeFactory.ts` | `QUOTA_STORE_DRIVER=redis` 时使用的 Redis 连接字符串（如 `redis://localhost:6379`）。 |
| `QUOTA_SATURATION_THRESHOLD` | `0.5` | `src/lib/quota/enforce.ts` | 池饱和比率（0..1）；达到或超过该值时池进入严格模式（不允许借用）。 |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR` | `0.7` | `open-sse/services/combo.ts` | 软配额策略降低目标优先级时应用的分数乘数（0..1）。 |
| `STATUS_SOFT_DEPRIORITIZE_FACTOR` | `0.5` | `open-sse/services/combo/autoStrategy.ts` | 预检配额截止关闭时（#4540），在 auto-combo 评分中对已耗尽的服务商（`credits_exhausted`/`rate_limited`）应用的分数乘数（0..1）。 |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14` | `src/lib/db/quotaConsumption.ts` | `quota_consumption` 桶在 GC（`gcQuotaConsumption`）前的保留窗口（天）。 |
| `QUOTA_PREFLIGHT_CUTOFF_ENABLED` | `false` | `src/lib/resilience/settings.ts` | 启用（默认关闭）：在评分前丢弃低配额候选项的自动路由硬配额截止。 |
| `OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL` | `false` | `open-sse/services/autoCombo/virtualFactory.ts` | 启用（默认关闭）：当 `auto/<category>:<tier>` 过滤器没有匹配到已连接候选项时，恢复旧版回退到完整（未过滤）池的行为，而非返回空池。默认关闭使 `:free` 意为"仅免费层"。 |
| `AGENTBRIDGE_UPSTREAM_CA_CERT` | _(未设置)_ | `src/mitm/manager.ts` | AgentBridge 上游 TLS 连接信任的额外 CA 证书（PEM）。 |
| `INSPECTOR_BUFFER_SIZE` | `1000` | `src/mitm/inspector/buffer.ts` | Traffic Inspector 环形缓冲区中保留的最大捕获请求数。 |
| `INSPECTOR_MAX_BODY_KB` | `1024` | `src/mitm/inspector/buffer.ts` | 截断前捕获的请求/响应体最大大小（KB）。 |
| `INSPECTOR_HTTP_PROXY_PORT` | `8080` | `src/mitm/inspector/httpProxyServer.ts` | Traffic Inspector HTTP 代理的本地端口。 |
| `INSPECTOR_HTTP_PROXY_AUTOSTART` | `false` | `src/mitm/inspector/httpProxyServer.ts` | 启动时自动启动 inspector HTTP 代理。 |
| `INSPECTOR_TLS_INTERCEPT` | `false` | `src/lib/inspector/captureState.ts` | 对捕获的 HTTPS 流量启用 TLS 拦截（MITM）。 |
| `INSPECTOR_LLM_HOSTS_EXTRA` | _(未设置)_ | `src/lib/inspector/captureState.ts` | 额外的主机名（逗号分隔），被视为大语言模型端点以进行捕获。 |
| `INSPECTOR_MASK_SECRETS` | `true` | `src/mitm/inspector/buffer.ts` | 在捕获流量中脱敏（认证头 / API key）。 |
| `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES` | `30` | `src/app/api/tools/traffic-inspector/capture-modes/system-proxy/route.ts` | 系统代理安全护栏自动还原操作系统代理设置前的分钟数。 |
| `INSPECTOR_INTERNAL_INGEST_TOKEN` | _(自动)_ | `src/app/api/tools/traffic-inspector/internal/ingest/route.ts` | 认证进入 inspector 的内部捕获摄入的 Token。 |
| `PLAYGROUND_COMPARE_MAX_COLUMNS` | `4` | `src/app/(dashboard)/dashboard/playground/` | Playground 比较模式下的最大并排列数。 |
| `PLAYGROUND_IMPROVE_PROMPT_DEFAULT_MODEL` | _(未设置)_ | `src/app/(dashboard)/dashboard/playground/` | Playground 'improve prompt' 操作的默认模型（未设置时回退到活跃模型）。 |
| `BIFROST_ENABLED` | `1` | `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | bifrost sidecar 代理的主开关。设为 `0` 时，路由返回 503 并带 `X-Bifrost-Killswitch` 头，运维人员被弹回 TS 路径。无需重新部署即可禁用 sidecar（tier-1 路由事件、密钥轮换）。 |
| `BIFROST_BASE_URL` | _(未设置)_ | `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | 设置时，Bifrost sidecar 代理路由将 `/v1/chat/completions` 流量转发到此 Go 网关而非 TS 中继处理器。未设置 → 503-with-fallback。尾部斜杠会被剥离。 |
| `BIFROST_API_KEY` | _(未设置)_ | `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | Bifrost 网关的 API key（作为 `Authorization: Bearer ...` 发送）。未设置时，路由期望请求携带有效的 OmniRoute API key；此 key 仅用于网关侧认证。 |
| `BIFROST_STREAMING_ENABLED` | `true` | `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | 设为 true 时，Bifrost sidecar 路由通过网关以 SSE 流式返回响应，而非 TS 流式 executor。设为 `0` 可强制通过网关返回非流式 JSON 响应。 |
| `BIFROST_TIMEOUT_MS` | `30000` | `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | 代理到 Bifrost 网关时的每个请求超时（毫秒）。超时时路由通过 `X-Bifrost-Fallback` 头返回 TS 中继路径。 |
| `OMNIROUTE_BIFROST_KEY` | _(未设置)_ | `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | `BIFROST_API_KEY` 的别名（供通过 `OMNIROUTE_*` 读取环境变量的脚本使用）。两者同时设置时 `BIFROST_API_KEY` 优先。 |
| `OMNIROUTE_RELAY_BACKEND` | `ts` / `auto` | `src/app/api/v1/relay/chat/completions/routingBackend.ts` | `/api/v1/relay/chat/completions` 的中继后端：`ts | bifrost | auto`。`ts` = TypeScript 中继（未配置 Bifrost 时的默认值）；`auto` 在 `BIFROST_BASE_URL` 已设置且 `BIFROST_ENABLED` ≠ `0` 时选择 Bifrost，若 sidecar 不可达则自动回退到 TS；`bifrost` 强制 Bifrost（严格，无回退）。认证/速率限制/注入安全护栏/allowlist 始终在 Next 路由中首先运行。响应携带 `X-Routing-Backend` / `X-Routing-Fallback`。 |
| `RELAY_ROUTING_BACKEND` | _(未设置)_ | `src/app/api/v1/relay/chat/completions/routingBackend.ts` | `OMNIROUTE_RELAY_BACKEND` 的已接受别名（相同的 `ts | bifrost | auto` 值）。两者同时设置时 `OMNIROUTE_RELAY_BACKEND` 优先。 |
| `OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS` | `5000` | `src/app/api/v1/relay/chat/completions/bifrostCooldown.ts` | 在 `auto` 模式下 Bifrost sidecar 跳失败后的冷却时间（毫秒），在此期间中继重新尝试 sidecar 之前直接走 TS 路径；冷却过后再次探测。`0` 禁用。仅在 `OMNIROUTE_RELAY_BACKEND=auto` 时生效。 |
| `OMNIROUTE_TLS_CERT` | _(未设置)_ | `bin/cli/commands/serve.mjs` | PEM TLS 证书路径，用于 `omniroute serve` 通过 HTTPS 提供服务（等同于 `--tls-cert`）。必须与 `OMNIROUTE_TLS_KEY` 配对；独立服务器随后在同一监听器上终止 TLS（`wss://` 工作不变）。未设置 → 纯 HTTP。仅提供证书或密钥中的一个，或路径不可读，会记录警告并保持 HTTP。 |
| `OMNIROUTE_TLS_KEY` | _(未设置)_ | `bin/cli/commands/serve.mjs` | `omniroute serve` HTTPS 的 PEM TLS 私钥路径（等同于 `--tls-key`）。必须与 `OMNIROUTE_TLS_CERT` 配对。参阅 `OMNIROUTE_TLS_CERT`。 |
| `OMNIROUTE_LOCAL_ENDPOINTS_ENABLED` | `0` | `src/lib/security/localEndpoints.ts` | `/api/local/*` 路由的主开关。未设置或设为 `0` 时，所有 `/api/local/*` 路由在生产环境中返回 503。在非 loopback 部署中必须设为 `1` 才能启用 Redis 启动器及类似的一键本地服务启动器。与 `isLocalOnlyPath()` 路由守卫分类（`src/server/authz/routeGuard.ts` 中的 `LOCAL_ONLY_API_PREFIXES`）构成双保险。 |
| `OMNIROUTE_LOCAL_ENDPOINTS_TOKEN` | _(未设置)_ | `src/lib/security/localEndpoints.ts` | 非 loopback 上的 `/api/local/*` 调用者的 Bearer Token（如桌面应用）。设置时，来自非 loopback IP 的请求必须携带 `Authorization: Bearer <token>`。在非 loopback 部署中且 `OMNIROUTE_LOCAL_ENDPOINTS_ENABLED=1` 时必需。 |
| `OMNIROUTE_REDIS_CONTAINER_NAME` | `omniroute-redis` | `bin/cli/commands/redis.mjs` | 一键 Redis 启动器（`omniroute redis up`）的容器名。CLI 和 `RedisLauncherPanel` GUI 均使用。 |
| `OMNIROUTE_REDIS_HOST_PORT` | `6379` | `bin/cli/commands/redis.mjs` | 一键 Redis 启动器的主机端口。如果主机已绑定 6379 则提升。容器内部端口保持 6379。 |
| `OMNIROUTE_REDIS_IMAGE` | `redis:7-alpine` | `bin/cli/commands/redis.mjs` | 一键 Redis 启动器使用的 Redis 镜像。根据需要覆盖为 `redis:8-alpine` 或私有注册表镜像。 |
| `QDRANT_HOST` | `qdrant` | _(可选集群配置文件)_ | `--profile memory` 活跃时 Qdrant sidecar 的主机名。默认指向网内 qdrant 服务名；覆盖为外部部署。仅在代码中 `qdrantEnabled` 为 `true` 时使用（`src/lib/memory/vectorStore.ts:108`）。 |
| `QDRANT_PORT` | `6333` | _(可选集群配置文件)_ | Qdrant sidecar 的 REST 端口。 |
| `QDRANT_GRPC_PORT` | `6334` | _(可选集群配置文件)_ | Qdrant sidecar 的 gRPC 端口。偏好在流式操作中使用 gRPC 而非 REST 的客户端库使用。 |
| `QDRANT_API_KEY` | _(未设置)_ | _(可选集群配置文件)_ | Qdrant Cloud 或认证的本地实例的可选 API key。空 → 不发送 `api-key` 头。 |
| `QDRANT_COLLECTION` | `omniroute-memory` | _(可选集群配置文件)_ | OmniRoute 的对话记忆嵌入的 collection 名称。首次运行时以 `QDRANT_VECTOR_SIZE` 维度创建。 |
| `QDRANT_EMBEDDING_MODEL` | `text-embedding-3-small` | _(可选集群配置文件)_ | Qdrant collection 元数据中记录的默认嵌入模型名称。实际嵌入由 OmniRoute 设置中 `embeddingModel` 字段指向的任意服务商生成。 |
| `QDRANT_VECTOR_SIZE` | `1536` | _(可选集群配置文件)_ | 嵌入向量维度。必须与用于嵌入的模型匹配（text-embedding-3-small → 1536；ada-002 → 1536；nomic-embed-text → 768）。 |
| `QDRANT_HNSW_EF_CONSTRUCT` | `128` | _(可选集群配置文件)_ | HNSW 索引构建时精度。值越高构建越慢、搜索越快。 |

---

## 26. 测试与 E2E 工具

由 `scripts/dev/run-next-playwright.mjs`、`scripts/dev/smoke-electron-packaged.mjs`、
`scripts/dev/run-ecosystem-tests.mjs` 和 `scripts/build/uninstall.mjs` 使用。
在生产部署中保持下面所有值未设置。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_E2E_BOOTSTRAP_MODE` | `auth` | `scripts/dev/run-next-playwright.mjs` | Playwright 运行器的 E2E 引导模式（`auth`、`fresh`、`reuse`）。 |
| `OMNIROUTE_E2E_PASSWORD` | 回退到 `INITIAL_PASSWORD` | `scripts/dev/run-next-playwright.mjs` | 注入到 Playwright 环境的管理员密码。 |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK` | `true` | `scripts/dev/run-next-playwright.mjs` | Playwright 运行期间禁用本地健康检查轮询。 |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK` | `true` | `scripts/dev/run-next-playwright.mjs` | 测试期间禁用 OAuth Token 健康检查循环。 |
| `OMNIROUTE_HEALTHCHECK_SKIP_PROVIDERS` | _(未设置)_ | `src/lib/tokenHealthCheck.ts` | 逗号分隔的排除在主动 Token 刷新扫除之外的服务商（如 `codex,openai`）。完全禁用健康检查的目标替代方案 — 短 TTL 的服务商保持刷新，级联服务商保持仅响应式。 |
| `OMNIROUTE_HIDE_HEALTHCHECK_LOGS` | `true` | `scripts/dev/run-next-playwright.mjs` | Playwright stdout 中的健康检查日志静默。 |
| `OMNIROUTE_PLAYWRIGHT_SKIP_BUILD` | `0` | `scripts/dev/run-next-playwright.mjs` | Playwright 启动前跳过 Next.js 生产构建（CI 优化）。 |
| `OMNIROUTE_SKIP_UNINSTALL_HOOK` | `0` | `scripts/build/uninstall.mjs` | 跳过 OmniRoute 卸载钩子（CI 用，保持 `node_modules` 完整）。 |
| `ECOSYSTEM_SERVER_WAIT_MS` | `180000` | `scripts/dev/run-ecosystem-tests.mjs` | 服务器在运行生态系统/协议测试前变为健康的等待时间（毫秒）。 |
| `ELECTRON_SMOKE_URL` | `http://127.0.0.1:20128/login` | `scripts/dev/smoke-electron-packaged.mjs` | Electron 烟雾测试工具期望打包应用提供服务的 URL。 |
| `ELECTRON_SMOKE_TIMEOUT_MS` | `45000` | `scripts/dev/smoke-electron-packaged.mjs` | 烟雾测试工具放弃前的总超时时间（毫秒）。 |
| `ELECTRON_SMOKE_SETTLE_MS` | `2000` | `scripts/dev/smoke-electron-packaged.mjs` | 页面加载后的稳定窗口（毫秒）。 |
| `ELECTRON_SMOKE_APP_EXECUTABLE` | _(自动)_ | `scripts/dev/smoke-electron-packaged.mjs` | 打包的 Electron 可执行文件的显式路径。 |
| `ELECTRON_SMOKE_DATA_DIR` | _(临时目录)_ | `scripts/dev/smoke-electron-packaged.mjs` | Electron 烟雾测试运行的数据目录。 |
| `ELECTRON_SMOKE_KEEP_DATA` | `0` | `scripts/dev/smoke-electron-packaged.mjs` | 设为 `1` 可在运行后保留烟雾测试数据目录。 |
| `ELECTRON_SMOKE_STREAM_LOGS` | `0` | `scripts/dev/smoke-electron-packaged.mjs` | 设为 `1` 可在运行期间将 Electron 日志流式输出到 stdout。 |
| `CLI_DEVIN_BIN` | _(PATH 查找)_ | `open-sse/executors/devin-cli.ts` | 覆盖 Devin CLI 二进制文件路径。 |

### 文档翻译管线

由 `scripts/i18n/run-translation.mjs`（`npm run i18n:run` 命令）使用。
所有五个变量默认未设置 — 仅在能够运行文档翻译器的机器上的 `.env` 中设置。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_TRANSLATION_API_URL` | _(未设置)_ | `scripts/i18n/run-translation.mjs` | 翻译后端的 OpenAI 兼容基础 URL。 |
| `OMNIROUTE_TRANSLATION_API_KEY` | _(未设置)_ | `scripts/i18n/run-translation.mjs` | 翻译后端的 Bearer Token（永不被记录）。 |
| `OMNIROUTE_TRANSLATION_MODEL` | _(未设置)_ | `scripts/i18n/run-translation.mjs` | 模型 ID，如 `gpt-4o-mini` 或 `cx/gpt-5.4-mini`。 |
| `OMNIROUTE_TRANSLATION_TIMEOUT_MS` | `60000` | `scripts/i18n/run-translation.mjs` | 每个请求的超时，毫秒。 |
| `OMNIROUTE_TRANSLATION_CONCURRENCY` | `4` | `scripts/i18n/run-translation.mjs` | 跨多个文件/locale 运行时的并行翻译请求数。 |

---

## 审计：已移除/废弃的变量

以下变量出现在旧版 `.env.example` 中，但在当前代码库中**没有运行时引用**。它们已被移除：

| 变量 | 原因 |
| --- | --- |
| `STORAGE_DRIVER=sqlite` | 任何源文件均未读取。SQLite 是唯一支持的驱动 — 无需选择。 |
| `INSTANCE_NAME=omniroute` | 存在于旧文档/环境模板中但运行时未使用。可能在未来多实例功能中回归。 |
| `SQLITE_MAX_SIZE_MB=2048` | 源代码中未引用。数据库大小未被人为限制。 |
| `SQLITE_CLEAN_LEGACY_FILES=true` | 源代码中未引用。旧版清理可能已被移除。 |
| `CLI_ROO_BIN` | 未在 `src/shared/services/cliRuntime.ts` 中注册。 |
| `CLI_KIMI_CODING_BIN` | 未在 `src/shared/services/cliRuntime.ts` 中注册（Kimi Coding 使用 OAuth，而非 CLI 二进制文件）。 |
| `IFLOW_OAUTH_CLIENT_ID` / `IFLOW_OAUTH_CLIENT_SECRET` | 源代码中任何地方均未引用。 |
| `CEREBRAS_API_KEY` / `COHERE_API_KEY` / `FIREWORKS_API_KEY` / `GROQ_API_KEY` / `MISTRAL_API_KEY` / `NEBIUS_API_KEY` / `PERPLEXITY_API_KEY` / `TOGETHER_API_KEY` / `XAI_API_KEY` | 在 v3.8.0 中移除。运行时不再读取这些环境变量 — 凭证来自 Dashboard / `data/provider-credentials.json` / 加密数据库。 |
| `CURSOR_PROTOBUF_DEBUG` | 在 v3.8.0 中移除。Cursor executor 使用 `CURSOR_DEBUG` / `CURSOR_STREAM_DEBUG`（参阅 §22）。 |
| `CLI_COMPAT_KIRO` | 在 v3.8.0 中移除。Kiro 在 `CLI_COMPAT_OMITTED_PROVIDER_IDS` 中 — 其开关无效。 |
| `QIANFAN_API_KEY` | 在 v3.8.0 中随其他未使用的服务商 API key 桩一起移除。 |

### 默认值修正

| 变量 | 旧 `.env.example` 值 | 实际代码默认值 | 修正 |
| --- | --- | --- | --- |
| `APP_LOG_RETENTION_DAYS` | `90` | `7` | ✅ 已移除误导性值；记录 `7` 为默认值 |
| `CALL_LOG_RETENTION_DAYS` | `90` | `7` | ✅ 已移除误导性值；记录 `7` 为默认值 |

### OpenCode 配置重新生成（临时工具）

由 `scripts/ad-hoc/regen-opencode-config.ts` 用于重新生成 `opencode.json`，
其中包含从运行中的 OmniRoute 实例拉取的准确的 `limit.context` 和 `limit.output` 值。
这些变量都不是正常运行所需的 — 该脚本仅供开发者工具使用。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_URL` | `http://localhost:20128` | `scripts/ad-hoc/regen-opencode-config.ts` | 查询 `/v1/models` 的 OmniRoute 实例基础 URL。 |
| `OMNIROUTE_KEY` | _(未设置)_ | `scripts/ad-hoc/regen-opencode-config.ts` | 认证 OmniRoute `/v1/models` 端点的 API key。未设置时回退到 `OPENCODE_API_KEY`。 |
| `OPENCODE_API_KEY` | _(未设置)_ | `scripts/ad-hoc/regen-opencode-config.ts` | 写入重新生成的 `opencode.json` 的 OpenCode 风格 API key (`sk-...`)。未设置时回退到 `OMNIROUTE_KEY`。 |

### 压缩离线评估工具（临时工具）

由离线压缩评估 CLI `scripts/compression-eval/index.ts` 使用。
正常运行不需要 — 仅供开发者工具使用。

| 变量 | 默认值 | 源文件 | 说明 |
| --- | --- | --- | --- |
| `OMNIROUTE_EVAL_CREDENTIALS` | `{}`（空） | `scripts/compression-eval/index.ts` | 运维人员提供的 JSON 凭证，供离线压缩评估 CLI 使用的服务商使用（通过 `JSON.parse` 解析）。未设置时进行试运行。 |