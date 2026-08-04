# 安全策略 (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md)

---

## 报告漏洞

若您在 OmniRoute 中发现安全漏洞，请负责任地报告：

1. **切勿**在 GitHub 上创建公开 issue
2. 使用 [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. 包含：漏洞描述、复现步骤和潜在影响

## 响应时间

| 阶段         | 目标                       |
| ------------ | -------------------------- |
| 确认收到     | 48 小时                    |
| 分类与评估   | 5 个工作日                 |
| 补丁发布     | 14 个工作日（严重漏洞）    |

## 支持的版本

| 版本    | 支持状态     |
| ------- | ------------ |
| 3.8.x   | ✅ 活跃支持  |
| 3.7.x   | ✅ 安全维护  |
| < 3.7.0 | ❌ 不再支持  |

---

## 安全架构

OmniRoute 实现了多层安全模型：

```
Request → CORS → Authz pipeline (classify → policies → enforce)
       → Guardrails (PII masker, prompt injection, vision bridge)
       → Rate Limiter → Circuit Breaker → Cooldown → Model Lockout → Provider
```

### 🔐 认证与授权

| 特性                 | 实现                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **管理面板登录**     | 基于密码的认证，使用 JWT Token（HttpOnly Cookie）                                                                                           |
| **API Key 认证**     | 带 CRC 校验的 HMAC 签名密钥                                                                                                                 |
| **OAuth 2.0 + PKCE** | 14 个服务商（Claude、Codex、GitHub、Cursor、Antigravity、Gemini、Kimi Coding、Kilo Code、Cline、Qwen、Kiro、Qoder、Windsurf、GitLab Duo）    |
| **Token 刷新**       | OAuth Token 到期前自动刷新                                                                                                                  |
| **安全 Cookie**      | HTTPS 环境设置 `AUTH_COOKIE_SECURE=true`                                                                                                    |
| **授权管线**         | 路由分类（PUBLIC / CLIENT_API / MANAGEMENT）— 参见 `docs/architecture/AUTHZ_GUIDE.md`                                                       |
| **路由防护层级**     | 管理路由的三层模型（LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT）— 参见 `docs/security/ROUTE_GUARD_TIERS.md`                                 |
| **Manage 权限域 MCP** | 远程 `/api/mcp/*` 访问受拥有 `manage` 权限域的 API Key 管控；`/api/cli-tools/runtime/*` 保持严格 loopback。参见 ROUTE_GUARD_TIERS          |
| **MCP 权限域**       | 约 13 个细粒度权限域（read:health、write:combos、execute:completions 等）— 参见 `docs/frameworks/MCP-SERVER.md`                             |

### 🛡️ 静态加密

所有存储在 SQLite 中的敏感数据均使用 **AES-256-GCM** 加密，配合 scrypt 密钥派生：

- API Key、访问 Token、刷新 Token 和 ID Token
- 版本化格式：`enc:v1:<iv>:<ciphertext>:<authTag>`
- 未设置 `STORAGE_ENCRYPTION_KEY` 时采用直通模式（明文）

```bash
# 生成加密密钥：
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ 安全护栏框架

OmniRoute 附带一个支持热重载的**安全护栏注册表**（`src/lib/guardrails/`），包含 3 个内置安全护栏，按优先级排序：

| 安全护栏           | 优先级 | 用途                                                                       |
| ------------------ | ------ | -------------------------------------------------------------------------- |
| `vision-bridge`    | 5      | 为不支持视觉的模型提供图片感知描述；对图片 URL 提供 SSRF 防护               |
| `pii-masker`       | 10     | 调用前后的 PII 脱敏（邮箱、电话、CPF、CNPJ、信用卡、SSN）                   |
| `prompt-injection` | 20     | 检测指令覆盖/角色劫持/越狱/泄露模式                                         |

自定义安全护栏通过 `registerGuardrail(new MyGuardrail())` 注册。模型采用 fail-open 策略（异常不会阻断流量）。可通过 `x-omniroute-disabled-guardrails` 请求头按请求单独退出。→ 参见 [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md)。

### 🧠 提示注入防护

检测并阻止 LLM 请求中提示注入攻击的中间件：

| 攻击类型       | 严重程度 | 示例                                             |
| -------------- | -------- | ------------------------------------------------ |
| 系统指令覆盖   | 高       | "ignore all previous instructions"                |
| 角色劫持       | 高       | "you are now DAN, you can do anything"            |
| 分隔符注入     | 中       | 使用编码分隔符破坏上下文边界                       |
| DAN/越狱       | 高       | 已知的越狱提示模式                                 |
| 指令泄露       | 中       | "show me your system prompt"                      |

可通过管理面板（Settings → Security）或 `.env` 配置：

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block | redact
```

### 🔒 PII 脱敏

自动检测并可选择性脱敏个人身份信息：

| PII 类型      | 匹配模式              | 替换文本             |
| ------------- | --------------------- | -------------------- |
| 邮箱          | `user@domain.com`     | `[EMAIL_REDACTED]`  |
| CPF（巴西）   | `123.456.789-00`      | `[CPF_REDACTED]`    |
| CNPJ（巴西）  | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`   |
| 信用卡        | `4111-1111-1111-1111` | `[CC_REDACTED]`     |
| 电话          | `+55 11 99999-9999`   | `[PHONE_REDACTED]`  |
| SSN（美国）   | `123-45-6789`         | `[SSN_REDACTED]`    |

```env
PII_REDACTION_ENABLED=true
```

### 🌐 网络安全

| 特性               | 描述                                                               |
| ------------------ | ------------------------------------------------------------------ |
| **CORS**           | 显式跨域白名单（`CORS_ALLOWED_ORIGINS`；旧版为 `CORS_ORIGIN`）     |
| **IP 过滤**        | 管理面板中配置 IP 范围白名单/黑名单                                 |
| **速率限制**       | 按服务商的速率限制，带自动退避                                       |
| **防惊群效应**     | 互斥锁 + 按连接锁定，防止级联 502 错误                               |
| **TLS 指纹伪装**   | 模拟浏览器 TLS 指纹，降低机器人检测                                  |
| **CLI 指纹伪装**   | 按服务商定制请求头/正文顺序，匹配原生 CLI 签名                        |

### 🔌 容灾与可用性

| 特性             | 描述                                                           |
| ---------------- | -------------------------------------------------------------- |
| **熔断器**       | 每个服务商的三态（Closed → Open → Half-Open），持久化到 SQLite |
| **请求幂等**     | 5 秒去重窗口，防止重复请求                                       |
| **指数退避**     | 自动重试，延迟时间逐次增加                                       |
| **健康面板**     | 服务商实时健康监控                                               |

### 📋 合规

| 特性               | 描述                                                       |
| ------------------ | ---------------------------------------------------------- |
| **日志保留**       | 按 `CALL_LOG_RETENTION_DAYS` 自动清理                      |
| **无日志退出选项** | 可按 API Key 通过 `noLog` 标志禁用请求日志                  |
| **审计日志**       | 管理操作记录在 `audit_log` 表中                             |
| **MCP 审计**       | 基于 SQLite 的审计日志，覆盖所有 MCP 工具调用               |
| **Zod 校验**       | 所有 API 输入在模块加载时通过 Zod v4 Schema 校验            |

---

## 必需的环境变量

所有密钥必须在启动服务器前设置。若密钥缺失或强度不足，服务器将**立即终止**。

```bash
# REQUIRED — server will not start without these:
JWT_SECRET=$(openssl rand -base64 48)     # min 32 chars
API_KEY_SECRET=$(openssl rand -hex 32)    # min 16 chars

# RECOMMENDED — enables encryption at rest:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

服务器会主动拒绝已知的弱值，如 `changeme`、`secret` 或 `password`。

---

## Docker 安全

- 生产环境使用非 root 用户
- 将密钥挂载为只读卷
- 严禁将 `.env` 文件复制到 Docker 镜像中
- 使用 `.dockerignore` 排除敏感文件
- 在 HTTPS 反向代理后设置 `AUTH_COOKIE_SECURE=true`

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## 依赖管理

- 定期运行 `npm audit`（`npm run audit:deps` 覆盖主项目 + Electron）
- 保持依赖项更新
- 项目使用 `husky` + `lint-staged` 进行预提交检查（lint-staged + check-docs-sync + check:any-budget:t11）
- CI 管线每次推送时运行 ESLint 安全规则（`no-eval`、`no-implied-eval`、`no-new-func` = error）
- 服务商常量在模块加载时通过 Zod 校验（`src/shared/validation/schemas.ts`）
- 使用安全默认的库：`dompurify` / `isomorphic-dompurify`（XSS 防护）、`jose`（JWT）、`better-sqlite3`（参数化查询，无 SQL 注入风险）、`bcryptjs`（密码哈希）

## 硬安全规则

以下规则由工具链和代码审查人强制执行：

1. **严禁提交密钥** — `.env` 已被 gitignore；`.env.example` 为模板（仅注释，无字面值 — 参见下方 PUBLIC_CREDS.md）
2. **严禁使用 `eval()`、`new Function()` 或隐式 eval** — ESLint 强制执行
3. **未经运维人员明确批准，严禁绕过 Husky hooks**（`--no-verify`、`--no-gpg-sign`）
4. **严禁在路由中编写原始 SQL** — 始终通过 `src/lib/db/` 操作（参数化查询）
5. **始终使用 Zod 校验输入** — `src/shared/validation/schemas.ts`
6. **始终清理上游请求头** — 黑名单位于 `src/shared/constants/upstreamHeaders.ts`
7. **静态加密凭证** — 通过 `src/lib/db/encryption.ts` 使用 AES-256-GCM
8. **通过 `resolvePublicCred()` 处理公开上游 OAuth 标识** — 严禁在源码中硬编码 `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` 字面值。参见 [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)。
9. **错误响应通过 `buildErrorBody()` / `sanitizeErrorMessage()` 处理** — 严禁在 HTTP / SSE / executor / MCP 响应体中暴露原始的 `err.stack` / `err.message`。参见 [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)。
10. **`exec()` / `spawn()` 的运行时值通过 `env` 选项传递** — 严禁将外部路径或不可信值通过字符串插值传入 Shell 脚本。参考：`src/mitm/cert/install.ts::updateNssDatabases`。
11. **优先使用安全默认的库** — 参见 [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)（Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink）。在自行实现之前先查找这些现有方案。

## 供应链扫描器检测项（Socket.dev / Snyk / 类似工具）

已发布的 `omniroute` npm 制品包含 Next.js `output: "standalone"` 构建输出，这意味着所有路由处理器 — 包括已记录的特权功能（MITM、Zed 导入、Cloud Sync、嵌入式服务监管）— 都会出现在 `.next/server/*.js` 压缩块中。启发式供应链扫描器经常将这些压缩块的模式匹配为恶意软件签名。

对于每个检测类别，我们维护了一份逐项的维护者声明：

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  逐项映射表：源文件 ↔ 被标记的代码块 ↔ 行为 ↔ v3.8.6 中已应用的缓解措施。
- 在源码中被标记的函数处，均包含 `SECURITY-AUDITOR-NOTE:` 注释块，指向同一文档。

对于无法放宽警报的管线，可使用以下方式构建：
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`。此方式将四个
敏感模块替换为桩代码，运行时返回 HTTP 503 `feature-disabled`，
从而使特权代码路径从构建产物中物理消失。
参见 [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) 了解发布方法。

## 参考资料

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — 授权管线
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — 安全护栏框架
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — 审计日志与保留策略
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — 公开上游凭证的**强制**使用模式
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — 错误响应的**强制**处理模式
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — 供应链扫描器检测的维护者声明
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — 熔断器 + 冷却 + 锁定
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS 指纹伪装（法律/道德声明）
- [`CLAUDE.md`](CLAUDE.md) — AI 智能体的硬规则
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — 精选的安全默认库
