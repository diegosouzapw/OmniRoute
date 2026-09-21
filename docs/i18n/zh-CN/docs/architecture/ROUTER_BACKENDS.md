# Router Backends & Embedded Services — architecture contract (ADR) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **状态：** 已接受 · **上下文：** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670)、
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **契约：** `domain/routing/routerBackends.ts`
> （类型化注册表——代码随 [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) 合入）

此 ADR 明确了 `ts`（原生）、`bifrost`、`cliproxy`、`9router` 和
VibeProxy 兼容引擎之间的关系，避免贡献者继续混淆两个在架构上相互独立的概念。它将路由后端注册表工作引入的类型化
注册表记录为该模型的唯一事实来源。

## 核心区别——两个正交维度

引擎的角色由**两个相互独立的维度**描述，并共同编码在注册表的
`RouterBackendDefinition` 中：

1. **生命周期**（`RouterBackendLifecycle`）——_引擎如何运行_：
   - `in-process`——在 OmniRoute Node 进程内部运行（原生 TS 流水线）。
   - `supervised`——由 OmniRoute 通过 `ServiceSupervisor` 安装、启动、停止并执行健康检查的本地子进程，随后作为提供者连接使用。
   - `external`——OmniRoute 向其分派请求但**不**负责管理的 HTTP 端点
     （通过环境变量中的基础 URL 配置）。
   - `disabled`——已注册但不可选择。
2. **选择维度**（中继路由后端）——_中继是否向其分派请求_：
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`，定义于
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`。

需要避免的错误：将“嵌入式服务”和“路由后端”视为同一个
列表。它们并不相同。`supervised` 引擎（9router/cliproxy）是**由原生流水线使用的提供者
连接**，而不是替代的中继分派后端。`bifrost` 则恰恰相反——它是一个中继分派后端，但（历史上）
仅为 `external`。

## 注册表——唯一事实来源

`domain/routing/routerBackends.ts` 契约（代码随
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) 合入）对每个引擎仅声明一次，其中包含其
生命周期、能力、服务标识、默认端口、健康检查配置和
遥测支持。使用方通过 `getRouterBackend(id)`、
`listRouterBackends()` 和 `listRouterBackendsByCapability(cap)` 查找引擎，而不是
为每个边车服务编写特殊分支。

| 后端        | 生命周期     | 服务（维度 A） | 中继后端（维度 B） | 健康检查      | 默认端口 |
| ----------- | ------------ | -------------- | ------------------ | ------------- | -------- |
| `ts`        | `in-process` | —              | `ts`（原生）       | —             | —        |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto` | `/health`     | —        |
| `cliproxy`  | `supervised` | `cliproxy`     | —（提供者）        | `/v1/models`  | 8317     |
| `9router`   | `supervised` | `9router`      | —（提供者）        | `/api/health` | 20130    |
| `vibeproxy` | `external`   | —              | —（提供者适配器）  | `/v1/models`  | —        |

¹ 将 Bifrost 提升为 `supervised` 嵌入式服务（可从
`/api/services/bifrost/` 安装/启动）的工作在
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) 中跟踪；在其合并之前，
Bifrost 仅为 `external`（只能通过 `BIFROST_BASE_URL` 访问）。

`capabilities`（`chat`、`responses`、`streaming`、`tools`、`vision`、
`oauth-backed`、`dashboard-embed`、`model-sync`、`native-hot-path`）允许调用方
根据引擎实际具备的能力进行筛选，而不是为每个 ID 硬编码分支。

## 轴 A — 嵌入式服务（受监督进程侧）

- **受监督进程注册表：** `src/lib/services/bootstrap.ts` `SERVICES[]`
  （目前：`9router`、`cliproxy`）。
- **生命周期所有者：** `src/lib/services/ServiceSupervisor.ts` — `start()` 会生成
  子进程，通过 `waitForHealthy()` 进行就绪检查，并将 stdout/stderr 写入环形缓冲区；
  `stop()` 依次发送 SIGTERM→SIGKILL；所有操作均在锁下串行执行。
- **状态联合类型**（`src/lib/services/types.ts`）：
  `not_installed | stopped | starting | running | stopping | error`，以及与之正交的
  `HealthState = healthy | unhealthy | unknown`。
- **为什么使用独立进程（而不是进程内 SDK）？** 进程隔离使每个 sidecar 的
  安装/启动/停止/健康检查/日志都能够独立控制，并使环回生成防护机制得以应用。
  对进程内适配器进行建模属于未来工作 — `native-hot-path` 能力标志将用于表达这一点。

### 生命周期路由契约（`/api/services/<tool>/…`）

状态码**按状态/动词/路径进行专门设计** — 这是契约，而非不一致：

| 调用                         | 条件                         | 状态                                  |
| ---------------------------- | ---------------------------- | ------------------------------------- |
| `POST .../start`             | 服务为 `not_installed`       | **409**（前置条件）                   |
| `POST .../stop`              | 已停止                       | **200**（幂等空操作）                 |
| `GET .../status`             | 正常                         | **200**（`live ?? row ?? "unknown"`） |
| `POST .../start`             | 进程生成失败                 | **503**（瞬时故障）                   |
| `GET .../status`, `.../stop` | 未捕获错误                   | **500**                               |
| `GET /api/services/<x>/logs` | 未知工具 `<x>`               | **404** `Service '<x>' not found`     |
| `GET .../status?reveal=key`  | 缺少 `X-Reveal-Confirm: yes` | **403**（仅限 9router）               |
| **任何** `/api/services/*`   | 调用方不在环回/私有局域网中  | **403 LOCAL_ONLY**                    |

所有错误响应体都由 `createErrorResponse()` 构造 →
`{ error: { message, type }, requestId }`，其中 `type` 根据状态码派生
（`500→server_error`、`404→not_found`、`409→conflict`，其他情况为 `invalid_request`），
并作为可供程序处理的判别字段。消息已预先净化
（`sanitizeErrorMessage()`，硬性规则 #12）。

**环回防护**是最常见的 `403` 来源：`/api/services/` 位于
`LOCAL_ONLY_API_PREFIXES`（`src/server/authz/routeGuard.ts`）中，并且
`src/server/authz/policies/management.ts` 会在身份验证**之前**拒绝任何非环回 /
非私有局域网调用方，因为这些路由会生成子进程（硬性规则 15 和 17）。
通过公共隧道访问这些路由按设计会返回 `403`。

## 轴 B — 中继路由后端（分发侧）

只有中继代理路径 `/api/v1/relay/chat/completions` 会选择分发后端；
主 `/api/v1/chat/completions` 接口绝不会查询 `routingBackend.ts`。

- **选择**（`resolveRelayRoutingBackend`）：使用单个全局环境变量开关 —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}。
  如果未设置，则在 Bifrost 已配置并启用时使用 `auto`，否则使用 `ts`。
- **行为：**
  - `bifrost`（强制）：Bifrost 失败 → 直接返回 `502`，不进行回退。
  - `auto`：尝试 Bifrost；失败或处于冷却期时，静默回退到原生实现。
  - `ts` / 回退后：使用原生 `open-sse` 转换器/执行器管道。
- **冷却：** `bifrostCooldown.ts` 中按 `baseUrl` 分别设置失败冷却期。

目前在中继层级，选择是**全有或全无的** — `release/v3.8.43` 上不存在按提供者
或按请求切换引擎的机制。sidecar 清单工作正在添加按请求控制的门控机制
（[#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) 清单 +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`），
使 `auto` 仅将清单中符合条件的提供者通过 Bifrost 路由。

## 仪表盘集成

服务仪表盘通过
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
每 5 秒轮询一次 `GET /api/services/<tool>/status`，返回 `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`。目前没有共享的可用性上下文提供程序——
每个组件都会针对各个工具调用该 hook。当 `!res.ok` 时，该 hook 当前仅显示简单的
`HTTP <status>`；将 `error.type` 字段映射为用户易于理解的说明是一项已跟踪的 UX 改进，而非契约变更。

## 影响

- 新引擎只需在 `ROUTER_BACKENDS` 中注册一次；使用方即可通过能力查询获取它们，
  无需新增针对各个 id 的分支。
- “这是服务还是路由后端？”由 `lifecycle` 字段决定，而不是由某个 id 恰好出现在哪个列表中决定。
- Bifrost 监管 (#5817) 和原生热路径迁移 (#5670) 将基于此共享契约构建，
  而不是对每个 sidecar 进行特殊处理。
