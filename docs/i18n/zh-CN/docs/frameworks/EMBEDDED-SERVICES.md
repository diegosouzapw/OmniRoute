# Embedded Services (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **版本：** v3.8.44
> **最后更新：** 2026-07-03
> **适用对象：** 添加、维护或调试嵌入式服务（9Router、CLIProxyAPI、Mux、Bifrost）的工程师。

嵌入式服务是安装在本地的进程伴生工具，由 OmniRoute 负责安装、监管，并将其作为一等路由目标公开。与通过互联网使用 API 密钥访问的外部提供者不同，嵌入式服务与 OmniRoute 运行在同一台计算机上，并通过环回接口通信。

---

## 目录

1. [概述](#1-overview)
2. [架构 — 4 层](#2-architecture--4-layers)
3. [生命周期状态机](#3-lifecycle-state-machine)
4. [API 参考](#4-api-reference)
5. [安全性](#5-security)
6. [添加新的嵌入式服务](#6-adding-a-new-embedded-service)
7. [故障排除](#7-troubleshooting)
8. [常见问题](#8-faq)

---

## 1. 概述

### 为什么使用嵌入式服务？

内置了五项服务：

| 服务            | npm 包                                | 默认端口 | 用途                                                                                                                                                                  |
| --------------- | ------------------------------------- | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                             |  20130   | OmniRoute 可将其用作子提供者的 AI 路由器。模型以 `9router/{sub}/{model}` 的形式公开                                                                                   |
| **CLIProxyAPI** | GitHub 发布版二进制文件（`cliproxy`） |   8317   | 用于 Anthropic CLI 身份验证流程的本地代理适配器。当 OAuth 令牌过期时提供故障转移路由                                                                                  |
| **Mux**         | `mux`（无头模式 `mux server`）        |   8322   | 本地智能体编排守护进程（coder/mux）。仅对其生命周期进行管理，不作为路由目标（不代理 LLM）                                                                             |
| **Bifrost**     | `@maximhq/bifrost`                    |   8080   | Go AI 网关中继后端。运行时，由中继路由（`/v1/relay/`）自动选用                                                                                                        |
| **Dario**       | `@askalf/dario`                       |   3456   | Claude 订阅代理——针对 Claude-Code 形式的流量，可作为 CLIProxyAPI 的替代方案或故障转移方案；注入的密钥会成为 `DARIO_ADMIN_TOKEN`，用于保护其 `/admin/*` OAuth 控制平面 |

所有五项服务均遵循相同的监管模型：

- OmniRoute 将它们安装在 `DATA_DIR/services/{name}/` 下（与 OmniRoute 自身的 `package.json` 隔离）
- OmniRoute 将它们作为子进程启动并监控
- OmniRoute 将临时 API 密钥注入子进程的环境，并在适用情况下实现无停机轮换
- 所有管理路由（`/api/services/*`）均为 **LOCAL_ONLY**——只能通过环回接口访问（硬性规则 #17）

### 关键决策（来自设计方案）

| 决策                       | 取值                                                                    |
| -------------------------- | ----------------------------------------------------------------------- |
| 仪表板访问 9Router 原生 UI | 通过 `/dashboard/providers/services/9router/embed/*` 进行反向代理       |
| 安装机制                   | 通过 `execFile` 执行 `npm install {package}`（不使用 shell 插值）       |
| 使用模式                   | 在路由引擎中将提供者注册为 `9router/{sub}/{model}`                      |
| API 密钥管理               | OmniRoute 生成密钥、对其进行静态加密（AES-256-GCM），并通过环境变量注入 |
| 仪表板位置                 | `/dashboard/providers/services`（三个选项卡）                           |
| 自动启动                   | 每项服务均可单独切换，默认关闭                                          |

---

## 2. 架构 — 4 层

```
┌────────────────────────────────────────────────────────────────────┐
│  第 1 层 — UI                                                       │
│  /dashboard/providers/services  （选项卡：CLIProxyAPI | 9Router | Mux）│
│  实时日志 (SSE)、启动/停止/重启/更新、设置、安装                     │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               外壳 + 通过 ?tab= 路由选项卡          │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  第 2 层 — API（LOCAL_ONLY — 仅限环回接口）                         │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    （反向 HTTP + WebSocket 代理 → 9Router 上游）                    │
│                                                                    │
│  访问控制：LOCAL_ONLY_API_PREFIXES 包含 "/api/services/" 和         │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ 进程内调用
┌──────────────────────▼─────────────────────────────────────────────┐
│  第 3 层 — ServiceSupervisor (src/lib/services/)                   │
│                                                                    │
│  ServiceSupervisor.ts   通用监督器 (child_process.spawn)           │
│    ├── 安装：      execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── 启动：      spawn(node, [entrypoint], {env, cwd})           │
│    ├── API 密钥：  crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── 端口：      9Router 使用 20130（可配置）                     │
│    ├── 日志：      stdio 环形缓冲区 5 MB → SSE 事件                 │
│    ├── 健康检查：  每 2–5 秒 HTTP GET /health，惰性恢复             │
│    └── 生命周期：  SIGTERM 15 秒 → SIGKILL                         │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       在进程启动时引导所有 SERVICES[]                │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       定期 GET /v1/models → service_models 表        │
│  ringBuffer.ts      循环日志缓冲区（每个服务 5 MB）                 │
│  healthCheck.ts     轮询 HTTP 健康探测                             │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      （安装程序适配器）                             │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ 兼容 OpenAI 的 HTTP（环回接口）
┌──────────────────────▼─────────────────────────────────────────────┐
│  第 4 层 — 提供者/路由                                              │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    每次请求都重新查找端口和 API 密钥（不缓存）。                    │
│    代理前从模型 ID 中移除 "9router/" 前缀。                         │
│    如果监督器不处于 "running" 状态，则返回 503 service_not_running。│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    "9router" 的条目：isEmbeddedService: true                       │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    模型存储为 "9router/{sub}/{model}"（带前缀）。                   │
│    由 modelSync.ts 每 5 分钟同步一次。                              │
│                                                                    │
│  Mux 仅受生命周期管理（第 1–3 层）— 它是一个智能体编排守护进程，    │
│  而不是 LLM 代理，因此没有第 4 层执行器/提供者条目，                │
│  也绝不会成为路由目标。                                            │
└────────────────────────────────────────────────────────────────────┘
```

### 关键源文件

| 文件                                        | 作用                                       |
| ------------------------------------------- | ------------------------------------------ |
| `src/lib/services/ServiceSupervisor.ts`     | 核心类：生命周期、锁、健康检查、环形缓冲区 |
| `src/lib/services/bootstrap.ts`             | 进程级注册和自动启动                       |
| `src/lib/services/registry.ts`              | 单例映射 `tool → supervisor`               |
| `src/lib/services/apiKey.ts`                | 密钥生成、AES-256-GCM 静态加密             |
| `src/lib/services/modelSync.ts`             | 定期同步模型（每 5 分钟）+ 按需同步        |
| `src/lib/services/ringBuffer.ts`            | 带 SSE 订阅功能的 5 MB 环形日志缓冲区      |
| `src/lib/services/healthCheck.ts`           | HTTP 健康探测（间隔可配置）                |
| `src/lib/services/installers/ninerouter.ts` | 通过 npm 安装/更新/卸载 9Router            |
| `src/lib/services/installers/cliproxy.ts`   | 通过 npm 安装/更新/卸载 CLIProxyAPI        |
| `src/lib/services/installers/mux.ts`        | 通过 npm 安装/更新/卸载 Mux                |
| `src/app/api/services/9router/_lib.ts`      | `getOrInitSupervisor()` 辅助函数           |
| `src/app/api/services/[name]/logs/route.ts` | 共享 SSE 日志端点                          |
| `open-sse/executors/ninerouter.ts`          | 提供者执行器（第 4 层）                    |

---

## 3. 生命周期状态机

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
                  健康探测成功      │         崩溃 / SIGTERM     │
                               ┌────▼─────┐  （5 秒内退出）      │
                               │ running  │──── 崩溃 ───────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

状态存储在 `version_manager` 数据库表（`status` 列）中，并同步到
`ServiceSupervisor` 的内存状态。对于正在运行的进程，内存状态是权威状态；
数据库状态是在启动时使用的持久化后备状态。

### 状态转换

| 来源            | 事件                            | 目标                   |
| --------------- | ------------------------------- | ---------------------- |
| `not_installed` | `install()` 成功                | `stopped`              |
| `stopped`       | 调用 `start()`                  | `starting`             |
| `starting`      | 健康探测返回 200                | `running`              |
| `starting`      | 进程在达到健康状态前退出        | `error`                |
| `running`       | 调用 `stop()`                   | `stopping` → `stopped` |
| `running`       | 进程意外退出（< 5 秒）          | `error`（快速崩溃）    |
| `running`       | 进程意外退出（> 5 秒）          | `error`                |
| `error`         | 调用 `start()`                  | `starting`             |
| 任意状态        | 在 `stopping` 期间调用 `stop()` | 无操作                 |

### 操作锁

`ServiceSupervisor` 通过异步操作锁（`withLock()`）串行化生命周期操作。
对同一 supervisor 并发调用 `start()` 时，只会生成一个进程；第二个调用方会等待，
然后返回现有状态。这可以防止竞态条件，例如自动启动和 UI 按钮同时触发时。

---

## 4. API 参考

`/api/services/` 下的所有路由均为 **LOCAL_ONLY**（仅限环回地址，硬性规则 #17）。
无论是否提供身份验证令牌，非环回请求都会收到 `403 LOCAL_ONLY`。

### 4.1 9Router 端点（11 条路由）

#### `POST /api/services/9router/install`

从 npm 安装 9Router。创建 `DATA_DIR/services/9router/`，其中包含独立的
`package.json` 和 `node_modules/`。不会与 OmniRoute 自身的依赖项冲突。

**请求正文**（全部可选）：

```json
{ "version": "latest" }
```

| 字段      | 类型     | 默认值     | 描述                           |
| --------- | -------- | ---------- | ------------------------------ |
| `version` | `string` | `"latest"` | 要安装的 npm 版本标签或 semver |

**响应：**

| 状态码 | 描述                                                   |
| ------ | ------------------------------------------------------ |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }` |
| `400`  | 请求正文无效（Zod 验证失败）                           |
| `409`  | 已在安装（锁已被持有）                                 |
| `500`  | npm 安装失败——请查看 `message` 了解友好错误信息        |

**注意：** 使用 `execFile('npm', [...])`——不使用 shell，也不进行插值（硬性规则 #13）。
EACCES 错误会以友好的消息形式呈现。

---

#### `POST /api/services/9router/start`

启动 9Router。如果尚未注册 supervisor，则先进行注册，然后调用
`supervisor.start()`。已在运行时，此操作具有幂等性。

**请求正文：** 无

**响应：**

| 状态码 | 描述                                        |
| ------ | ------------------------------------------- |
| `200`  | `ServiceStatus` 对象（参见下方 schema）     |
| `409`  | 9Router 未安装（`status: "not_installed"`） |
| `503`  | 启动失败（进程错误——请参阅 `lastError`）    |

**ServiceStatus schema：**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

优雅地停止 9Router。发送 SIGTERM，等待 15 秒；如果进程仍然存活，则发送 SIGKILL。
已停止时，此操作具有幂等性。

**请求正文：** 无

**响应：**

| 状态码 | 描述                                |
| ------ | ----------------------------------- |
| `200`  | `ServiceStatus`（state: "stopped"） |
| `503`  | 停止操作意外失败                    |

---

#### `POST /api/services/9router/restart`

等同于在操作锁内先执行 `stop()`，再执行 `start()`。

**请求正文：** 无

**响应：** 与 `start` 相同（返回最终的 `ServiceStatus`）。

---

#### `POST /api/services/9router/update`

将 9Router 更新到较新的 npm 版本。如果服务正在运行，则先停止服务，
然后运行 npm install（在原位置安装较新的版本），最后重新启动服务。

**请求正文**（全部可选）：

```json
{ "version": "latest" }
```

**响应：**

| 状态码 | 描述                                                            |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | 请求正文无效                                                    |
| `500`  | npm 更新失败                                                    |

---

#### `POST /api/services/9router/rotate-key`

为 9Router 生成新的 API 密钥，对其进行静态加密，然后重启服务
（如果正在运行），以便服务从环境中获取新密钥。旧密钥会立即失效。

**请求正文：** 无

**响应：**

| 状态  | 描述                                       |
| ----- | ------------------------------------------ |
| `200` | `{ keyRotated: true, restarted: boolean }` |
| `500` | 轮换失败                                   |

**安全性：** 新密钥绝不会在响应中返回（避免凭据泄露）。
它使用 AES-256-GCM 加密后存储在 `version_manager` 表中。

---

#### `GET /api/services/9router/status`

返回实时状态和数据库状态的组合信息，包括版本元数据和 API 密钥预览。

**响应：**

| 状态  | 描述           |
| ----- | -------------- |
| `200` | 请参阅下方架构 |
| `500` | 状态读取失败   |

**响应架构：**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

切换自动启动标志。当 `enabled: true` 时，下次 OmniRoute 启动时，
该服务将自动启动（前提是该服务已安装）。

**请求正文：**

```json
{ "enabled": true }
```

**响应：**

| 状态  | 描述                  |
| ----- | --------------------- |
| `200` | `{ autoStart: true }` |
| `400` | 请求正文无效          |

---

#### `GET /api/services/9router/logs`

来自 9Router stdout/stderr 环形缓冲区的实时日志 SSE 流。

**查询参数：**

| 参数     | 类型      | 默认值 | 描述                                                           |
| -------- | --------- | ------ | -------------------------------------------------------------- |
| `tail`   | `integer` | 200    | 首先发送的历史日志行数（最多 1000 行）                         |
| `filter` | `string`  | 无     | 不区分大小写的子字符串筛选器（不支持正则表达式，可防止 ReDoS） |

**SSE 事件：**

| 事件        | 数据        | 描述                     |
| ----------- | ----------- | ------------------------ |
| `snapshot`  | `LogLine[]` | 初始历史日志末尾内容     |
| `log`       | `LogLine`   | 实时日志行               |
| `heartbeat` | `{}`        | 每 15 秒发送一次保活消息 |

**LogLine 架构：**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**响应：**

| 状态  | 描述                              |
| ----- | --------------------------------- |
| `200` | `text/event-stream`               |
| `400` | `filter` 参数过长（> 200 个字符） |
| `404` | 未找到服务（未注册监控程序）      |

---

### 4.2 CLIProxyAPI 端点（10 个路由）

CLIProxyAPI 的端点结构与 9Router 相同，但没有 `rotate-key`，并额外包含
`accounts`、`provider-expose` 和 `auto-restart-adopted`。现在，它会接收一个
在进程生成时注入的专用数据平面 API 密钥（`bootstrap.ts` 中的
`needsApiKey: true`，用于模型同步）；`status` 包含的字段更少。

| 方法   | 路径                                | 描述                                      |
| ------ | ----------------------------------- | ----------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | 从 npm 安装 CLIProxyAPI                   |
| `POST` | `/api/services/cliproxy/start`      | 启动 CLIProxyAPI                          |
| `POST` | `/api/services/cliproxy/stop`       | 停止 CLIProxyAPI                          |
| `POST` | `/api/services/cliproxy/restart`    | 重启 CLIProxyAPI                          |
| `POST` | `/api/services/cliproxy/update`     | 更新到较新版本                            |
| `GET`  | `/api/services/cliproxy/status`     | 实时状态和数据库状态（无 `apiKeyMasked`） |
| `POST` | `/api/services/cliproxy/auto-start` | 切换自动启动                              |

共享的 `GET /api/services/{name}/logs` 端点（参见 §4.1）通过 `[name]`
动态段适用于所有四个服务。

---

### 4.3 Mux 端点（8 个路由）

Mux 的端点结构与 CLIProxyAPI 相同——API 接口中没有 `rotate-key` 路由
（其持有者令牌的生成方式与 9Router 相同，即通过 `getOrCreateApiKey("mux")`
生成，并通过 `MUX_SERVER_AUTH_TOKEN` 环境变量注入，但目前尚无专用的轮换端点）。
Mux 仅受生命周期管理：与 9Router 不同，它没有第 4 层执行器，也从不会注册为路由提供方。

| 方法   | 路径                           | 描述                           |
| ------ | ------------------------------ | ------------------------------ |
| `POST` | `/api/services/mux/install`    | 从 npm 安装 Mux（`npm i mux`） |
| `POST` | `/api/services/mux/start`      | 启动 Mux（`mux server`）       |
| `POST` | `/api/services/mux/stop`       | 停止 Mux                       |
| `POST` | `/api/services/mux/restart`    | 重启 Mux                       |
| `POST` | `/api/services/mux/update`     | 更新到较新的 npm 版本          |
| `GET`  | `/api/services/mux/status`     | 实时状态和数据库状态           |
| `POST` | `/api/services/mux/auto-start` | 切换自动启动                   |

---

### 4.4 Bifrost 端点（8 个路由）

Bifrost 是一个 Go AI 网关中继后端（`@maximhq/bifrost`）。它使用与
CLIProxyAPI 相同的端点结构（没有 `rotate-key`——Bifrost 在其 `-app-dir`
下的 `config.json` 中管理自己的提供方密钥）。

| 方法   | 路径                               | 描述                                              |
| ------ | ---------------------------------- | ------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | 从 npm 安装 Bifrost（`@maximhq/bifrost`）         |
| `POST` | `/api/services/bifrost/start`      | 在端口 8080（默认）上启动 Bifrost                 |
| `POST` | `/api/services/bifrost/stop`       | 停止 Bifrost                                      |
| `POST` | `/api/services/bifrost/restart`    | 重启 Bifrost                                      |
| `POST` | `/api/services/bifrost/update`     | 更新到较新版本                                    |
| `GET`  | `/api/services/bifrost/status`     | 实时状态 + 数据库状态                             |
| `POST` | `/api/services/bifrost/auto-start` | 切换自动启动设置                                  |
| `GET`  | `/api/services/bifrost/logs`       | SSE 日志尾随（通过共享的 `[name]/logs` 动态路由） |

**路由配置：** 当未设置 `BIFROST_BASE_URL` 且受监管的 Bifrost
实例正在运行时，`getBifrostRoutingConfig()`（位于 `routingBackend.ts` 中）会自动
使用 `http://127.0.0.1:{port}` 作为中继基础 URL。显式设置的 `BIFROST_BASE_URL` 环境变量
始终具有更高优先级。

---

### 4.5 Dario 端点（12 个路由）

生命周期结构与其他服务相同（`install`、`start`、`stop`、`restart`、
`update`、`status`、`auto-start`、`auto-restart-adopted`），此外还包括位于 `admin/` 下、由令牌保护的 OAuth
控制平面：`admin/accounts`、`admin/import-from-omniroute`、
`admin/login-start`、`admin/login-complete`（均受 `DARIO_ADMIN_TOKEN` 保护）。

### 4.6 反向代理（9Router 仪表板嵌入）

仪表板通过以下内部反向代理，将 9Router Web UI 嵌入 iframe
中：

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

此代理：

- 将请求转发到 `http://127.0.0.1:{port}/{path}`（仅限环回地址）
- 移除传入的 `cookie` 和 `authorization` 标头（避免 OmniRoute 会话泄露）
- 注入用于 9Router 身份验证的 `Authorization: Bearer {apiKey}`
- 从响应中移除 `set-cookie`、`content-security-policy`、`x-frame-options`、`cross-origin-*`
- 重写 HTML 响应，以注入 `<base href>` 并规范化绝对路径（`/foo` → `/dashboard/.../embed/foo`）

嵌入式仪表板的 WebSocket 升级由专用端口上的配套服务器处理（请参阅
`src/lib/services/embedWsProxy.ts`）。

**安全性：** 嵌入代理路由归类在 `LOCAL_ONLY_API_PREFIXES`
之下，只能通过环回地址访问。即使攻击者通过
Cloudflare/Ngrok 隧道获取了 JWT，也无法通过代理访问嵌入式服务。

---

## 5. 安全性

### LOCAL_ONLY 强制执行（硬性规则 #17）

`/api/services/` 和 `/dashboard/providers/services/*/embed/` 下的所有路由在 `src/server/authz/routeGuard.ts` 中均被归类为 LOCAL_ONLY。环回检查会在任何身份验证分支之前无条件运行：

```
请求到达
  → isLocalOnlyPath(path)?
      → 非环回 → 403 LOCAL_ONLY（始终在身份验证检查之前）
      → 环回   → 继续执行常规身份验证
```

这可以防止泄露的 JWT（例如通过隧道泄露）触发 `npm install` 或进程生成。有关完整的层级矩阵，请参阅 `docs/security/ROUTE_GUARD_TIERS.md`。

### API 密钥注入

9Router 和 Mux 的 HTTP 端点需要 API 密钥/不记名令牌。OmniRoute：

1. 通过 `crypto.randomBytes(32).toString("base64url")` 生成密钥，并添加服务专用前缀（9Router 使用 `nr_`，Mux 使用 `mx_`）。
2. 使用 AES-256-GCM 对其进行静态加密（与提供者凭据所使用的密码算法相同）。
3. 在生成进程时解密并将其作为环境变量注入——9Router 使用 `NINEROUTER_API_KEY`，Mux 使用 `MUX_SERVER_AUTH_TOKEN`（绝不使用 CLI 标志，因此令牌绝不会出现在 `ps`/进程列表中）。
4. 绝不在任何 HTTP 响应中返回明文密钥。

CLIProxyAPI 会在生成进程时获得注入的专用数据平面密钥（`needsApiKey: true`——用于针对适配器同步模型）。

### SSRF 防御

反向 HTTP 代理（`/dashboard/.../embed/[...path]`）被硬编码为仅转发至 `http://127.0.0.1:{port}`。它绝不会跟随重定向到非环回目标。使用 `ssrf-req-filter` 库拒绝任何解析到环回范围之外的上游 URL。

### Shell 安全性（硬性规则 #13）

通过 `execFile('npm', ['install', pkg, '--prefix', dir])` 调用 `npm install`——不使用模板字面量、不使用 shell，也不将外部路径插值到命令字符串中。运行时值（端口、API 密钥）通过子进程的 `env` 对象传递。

### 错误净化（硬性规则 #12）

来自 `/api/services/*` 的所有错误响应都会经过 `buildErrorBody()` 或 `sanitizeErrorMessage()` 处理。原始 `err.stack` 和 `err.message` 绝不会逐字返回给调用方。

---

## 6. 添加新的嵌入式服务

请遵循以下 8 个步骤。将 `src/lib/services/installers/` 和 `src/app/api/services/` 中的现有实现作为规范参考。

### 第 1 步——创建安装器

参照 `ninerouter.ts` 创建 `src/lib/services/installers/{name}.ts`：

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // 选择一个空闲端口

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

使用 `installers/utils.ts` 中的 `runNpm(['install', NAME_PACKAGE, '--prefix', dir])`——绝不要使用 `execSync` 或 shell 插值。

### 第 2 步——在引导流程中注册

向 `src/lib/services/bootstrap.ts` 中的 `SERVICES` 数组添加一个 `ServiceEntry`：

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // 如果不需要 API 密钥，则设为 false
}
```

扩展 `buildSpawnArgsFactory()` 以处理 `cfg.tool === "myservice"`。

#### 可插拔提供者插件契约（第 1 阶段，#7333）

`src/lib/services/providerPlugins/` 引入了 `ServiceProviderPlugin` 契约，将后端的 `bootstrap.ts` `ServiceEntry` 字段和 `serviceBackends.ts` 清单模板字段封装到一个对象中，而不是在两个互不相关的文件中分别表达同一后端的结构。截至本文编写时，**仅 `9router` 已完成迁移**——`bootstrap.ts` 通过 `getServiceProviderPlugin("9router")`（`src/lib/services/providerPlugins/registry.ts`）派生其 `SERVICES[]` 条目；如果该插件缺失，则会抛出启动错误。`cliproxy`、`mux` 和 `bifrost` 仍保持使用原有的内联 `SERVICES[]` 字面量，不作改动。

`open-sse/config/providerPluginManifest.ts` 还新增了附加型辅助函数 `createServiceBackendManifestEntry(pluginId, template)`，用于根据 `SERVICE_BACKEND_MANIFEST_TEMPLATE` 条目构建格式正确的 `ProviderPluginManifestEntry`——它目前**尚未**接入任何实际请求路径（`generateProviderPluginManifestFromRegistry()` 和 `/v1/providers/[provider]/models` 均未接入）；待该契约在第二个后端中得到验证后，再进行后续集成。

以下工作已推迟到后续 PR，并在 issue #7333 下跟踪：通过同一注册表迁移 `cliproxyapi`、将 `mux`/`bifrost` 泛化并加入 `ServiceBackendPluginId` 联合类型、将执行器路由的特殊处理（`open-sse/executors/index.ts`、`open-sse/handlers/chatCore/executorProxy.ts`）整合进插件契约，以及将 `createServiceBackendManifestEntry()` 接入实际的清单/模型代码路径。

### 第 3 步——添加迁移和数据库种子数据

通过 `src/lib/db/migrations/` 中的迁移，确保该服务在 `version_manager` 中有一行记录。该行应包含：

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### 第 4 步——创建 7 个 API 端点

在 `src/app/api/services/{name}/` 下创建：

```
_lib.ts            getOrInitSupervisor() 辅助函数
install/route.ts   POST — 调用 installer.install()
start/route.ts     POST — 调用 supervisor.start()
stop/route.ts      POST — 调用 supervisor.stop()
restart/route.ts   POST — 调用 supervisor.restart()
update/route.ts    POST — 调用 installer.update()
status/route.ts    GET  — 合并实时状态和数据库状态
auto-start/route.ts POST — 切换 auto_start 标志
```

共享的 `GET /api/services/[name]/logs` 路由已完成接线——无需在那里进行任何更改。

通过 `createErrorResponse()` / `buildErrorBody()` 统一处理所有错误响应。

### 步骤 5 — 添加到 LOCAL_ONLY_API_PREFIXES

在 `src/server/authz/routeGuard.ts` 中，确认 `/api/services/` 已列出。
如果引入了新的前缀（例如 `/api/tools/`），请将其添加到
`LOCAL_ONLY_API_PREFIXES`；如果它会生成进程，还需将其添加到 `SPAWN_CAPABLE_PREFIXES`。
在 `tests/unit/authz/routeGuard.test.ts` 中添加测试。

### 步骤 6 — 添加 UI 标签页

创建 `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`。
复用共享组件：

- `ServiceStatusCard` — 实时状态 + 健康状态徽章
- `ServiceLifecycleButtons` — 启动 / 停止 / 重启 / 更新
- `ServiceLogsPanel` — SSE 日志追踪（连接到 `/api/services/{name}/logs`）
- `ApiKeyCard` — 密钥显示 + 轮换（如果 `needsApiKey: true`）

在 `ServicesPageShell.tsx` 中注册该标签页。

### 步骤 7 — 添加提供者条目（如果该服务是路由目标）

如果嵌入式服务公开了兼容 OpenAI 的 `/v1/chat/completions` 端点：

1. 在 `src/shared/constants/providers.ts` 中添加提供者条目，并设置 `isEmbeddedService: true`。
2. 创建扩展 `BaseExecutor` 的 `open-sse/executors/{name}.ts`。每次请求时重新查询端口和
   API 密钥（切勿在构造函数中缓存）。当监督器状态不是 `"running"` 时，返回 `503 service_not_running`
   响应。
3. 在 `open-sse/config/providerRegistry.ts` 中使用服务前缀注册模型
   （例如 `myservice/sub/model`）。`modelSync.ts` 将持续更新这些模型。

### 步骤 8 — 编写文档和测试

1. 更新 `docs/frameworks/EMBEDDED-SERVICES.md`（本文件）——将该服务添加到
   §1 的表格中，并将所有新端点添加到 §4。
2. 在 `tests/unit/services/` 中添加单元测试（生命周期、安装程序、API 结构）。
3. 在 `tests/integration/services/` 中添加集成测试（由 `RUN_SERVICES_INT=1` 控制）。
4. 使用新端点更新 `docs/openapi.yaml`。

---

## 7. 故障排除

### 服务无法启动

**症状：** 点击启动按钮后返回 503，状态一直为 `"error"` 或 `"starting"`。

**检查清单：**

1. 检查 `GET /api/services/{name}/logs`（或仪表板中的日志面板）。查找类似 `Error: ENOENT`、`address already in use` 或 `Cannot find module` 的日志行。
2. 验证 `npm` 是否在 PATH 中：使用运行 OmniRoute 的同一用户账户执行 `which npm`。
3. 验证服务是否已安装：检查 `GET /api/services/{name}/status` 中的 `installedVersion`。如果为 `null`，请先执行安装。
4. 检查 `DATA_DIR/services/{name}/node_modules/` 是否存在且不为空。
5. 检查状态响应中的 `lastError` 字段，以获取经过脱敏处理的退出原因。

---

### 冷启动缓慢（超过 10 秒才达到 `running` 状态）

**症状：** 状态长时间保持为 `"starting"`，之后才变为 `"running"` 或 `"error"`。

**说明：** 9Router 的冷启动过程包括导入大型依赖树（DNS、隧道、MITM 模块）。默认健康检查间隔为 2 秒，共尝试 3 次，之后监管器会判定超时（但会继续轮询）。

**修复：** `healthIntervalMs` 和 `waitForHealthy` 超时时间（`healthIntervalMs * 3`）可在 `bootstrap.ts` 中配置。对于启动时间较长的服务，将 `healthIntervalMs` 增加到 5000，并将 `stopTimeoutMs` 增加到 30 000。

---

### 端口冲突（`EADDRINUSE`）

**症状：** 日志显示 `address already in use :::20130`。

**原因：**

- 另一个进程已在使用端口 20130。
- 先前的 9Router 进程未完全停止（僵尸 PID）。

**修复：**

1. 在 `.env` 中通过 `NINEROUTER_PORT` 环境变量更改默认端口。
2. 查找并终止冲突进程：`lsof -ti :20130 | xargs kill -9`。
3. 可在 `bootstrap.ts` 中通过 `port` 字段为每个服务配置端口。

**注意：** 9Router 默认使用端口 20130，专门用于避免与 OmniRoute 的默认端口 20128 冲突。

---

### 安装时权限被拒绝（EACCES）

**症状：** 安装返回 500，日志显示 `EACCES` 或 `permission denied`。

**原因：**

- OmniRoute 进程对 `DATA_DIR` 或其父目录没有写入权限。
- 在无 root 权限的 Docker 中运行，且对映射卷没有写入权限。

**修复：**

1. 检查 `DATA_DIR`（默认值：`~/.omniroute/`）：`ls -la ~/.omniroute/`
2. 确保 OmniRoute 进程用户拥有该目录：`chown -R $USER ~/.omniroute/`
3. 在 Docker 中，确保卷挂载对容器用户具有正确的权限。

---

### 更新失败（`npm install` 超时或网络错误）

**症状：** 更新返回 500 并包含 `InstallError`，日志显示网络超时。

**检查清单：**

1. 确认 npm 注册表可访问：`npm ping`。
2. 检查企业代理：`npm config get proxy`、`npm config get https-proxy`。
3. 尝试手动安装：`npm install {package}@latest --prefix ~/.omniroute/services/{name}/`。
4. 如果处于隔离网络环境中，请预先下载 tarball，然后使用 `npm install /path/to/tarball.tgz`。

---

### 服务启动后立即显示 `"error"` 状态（快速崩溃）

**症状：** 状态在 5 秒内从 `"starting"` 转变为 `"error"`。`lastError` 显示 `"Fast crash (exited with code 1)"`。

**检查清单：**

1. 读取完整的日志尾部：`GET /api/services/{name}/logs?tail=500`。
2. 常见原因：缺少服务所需的环境变量。
3. 对于 9Router：确认启动进程时传入的环境变量中包含 `NINEROUTER_DISABLE_MITM=true` 和 `NINEROUTER_DISABLE_TUNNEL=true`（请参阅 `installers/ninerouter.ts` 中的 `resolveSpawnArgs`）。

---

## 8. 常见问题

**问：我可以将嵌入式服务端点开放给非回环客户端吗？**

不可以。LOCAL_ONLY 层级是有意设计的（硬性规则 #17）。能够调用
`npm install` 或生成 `node` 进程的路由不得由非回环流量访问，因为通过隧道
（Cloudflare、Ngrok、Tailscale）泄露的 JWT 否则将允许任意创建进程。
`/api/services/` 没有可选择退出此限制的例外——与 `/api/mcp/` 不同，它未被列入
manage 作用域绕过列表。请参阅 `docs/security/ROUTE_GUARD_TIERS.md`。

---

**问：9Router 和 CLIProxyAPI 能否用于生产环境/云部署？**

可以。这两项服务采用与 OmniRoute 本身相同的本地优先模型。它们在同一台机器上运行，
并通过回环接口进行通信。这里的“生产环境”是指部署 OmniRoute 的 VPS 或本地服务器，
而不是远程云服务提供者。

---

**问：如何调试 supervisor？**

1. 实时查看 SSE 日志流：`curl -N http://localhost:20128/api/services/9router/logs`。
2. 在 OmniRoute 的 pino 输出中检查结构化日志，并按
   `service:supervisor` 命名空间进行筛选。
3. 检查数据库行：`sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`。
4. 使用 `GET /api/services/9router/status`，通过一次调用查看当前实时状态、PID、健康状况
   和 `lastError`。

---

**问：supervisor 显示 `health: "degraded"` 或 `health: "unknown"`，但状态为 `"running"`。这有问题吗？**

`"degraded"` 表示健康探测返回了非 200 响应。`"unknown"` 表示尚未完成任何探测
（与首次轮询发生竞态）。这两种情况在启动期间都是暂时的。如果在进入
`"running"` 状态后超过 `healthIntervalMs * 3` 毫秒，健康状态仍为 `"degraded"`，
则表示嵌入式服务正在运行，但其 HTTP API 未响应。请检查状态响应中的端口是否正确，
以及服务是否确实正在该端口上监听。

---

**问：我可以在不完全重启的情况下更改 9Router API 密钥吗？**

不可以。API 密钥会在生成进程时通过环境变量传递给 9Router。运行中进程的环境变量
无法更改。`POST .../rotate-key` 会自动停止并重启服务，以应用新密钥。密钥轮换将在
服务的 `stopTimeoutMs`（默认 15 秒）加上其启动时间之内生效。

---

**问：环形缓冲区的限制是多少？填满后会发生什么？**

每项服务都有一个专用的 5 MB 环形缓冲区。当缓冲区已满时，会移除最早的日志行，
为新日志腾出空间。SSE `snapshot` 事件会返回 `tail` 限制范围内最近的日志行。
除非在数据库行中设置了 `logsBufferPath`，否则日志不会持久化到磁盘。

---

## 另请参阅

- `docs/security/ROUTE_GUARD_TIERS.md` — LOCAL_ONLY 层级详情
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 嵌入式服务模块映射
- `docs/architecture/ARCHITECTURE.md` — 系统级上下文
- `docs/openapi.yaml` — 机器可读的端点定义
- `CLAUDE.md` §“添加新的嵌入式服务” — 快速参考清单
