# Monitoring & Observability Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**：OmniRoute 内置健康监控、提供者自动驾驶、配额跟踪和可观测性钩子。本指南涵盖仪表板、警报和故障排除。

**来源：**

- `src/lib/monitoring/observability.ts` — 可观测性快照
- `src/lib/monitoring/comboHealthAutopilot.ts` — 组合健康自动驾驶
- `src/lib/monitoring/providerHealthAutopilot.ts` — 提供者自动驾驶
- `src/lib/monitoring/providerHealthMatrix.ts` — 提供者健康矩阵
- `src/lib/localHealthCheck.ts` — 本地健康检查
- `src/lib/tokenHealthCheck.ts` — 令牌刷新健康状态
- `src/lib/proxyHealth.ts` — 代理健康状态缓存（详见 PROXY_GUIDE.md）

---

## 概述

OmniRoute 具有 **3 层监控**：

```
┌──────────────────────────────────────────────────────────────┐
│  第 1 层：系统健康状态（服务器级）                           │
│  ├─ localHealthCheck.ts — 数据库、端口、原生依赖项            │
│  ├─ db/healthCheck.ts — 完整性、外键、孤立产物                │
│  └─ 仪表板：/dashboard/health                                │
├──────────────────────────────────────────────────────────────┤
│  第 2 层：提供者健康状态（按提供者提供弹性保障）              │
│  ├─ providerHealthAutopilot.ts — 熔断器、冷却时间             │
│  ├─ providerHealthMatrix.ts — 按提供者/模型划分的健康评分     │
│  └─ 仪表板：/dashboard/providers                             │
├──────────────────────────────────────────────────────────────┤
│  第 3 层：实时可观测性（运行时快照）                          │
│  ├─ observability.ts — 熔断器、会话、配额                    │
│  ├─ tokenHealthCheck.ts — OAuth 令牌刷新健康状态              │
│  └─ MCP 工具：omniroute_get_health、omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## 仪表板页面

### `/dashboard/health`（系统健康状态）

顶层健康仪表板显示：

| 部分             | 显示内容                           |
| ---------------- | ---------------------------------- |
| **服务器状态**   | 运行时间、版本、端口、活动连接数   |
| **数据库**       | 连接、完整性、WAL 大小、最近迁移   |
| **提供者摘要**   | 活跃数量、健康数量、熔断器开启数量 |
| **配额监控器**   | 活动会话数、警报状态、已耗尽数量   |
| **最近错误**     | 最近 10 个错误及其堆栈跟踪         |
| **资源使用情况** | 内存、CPU、堆压力指示器            |

### `/dashboard/providers`（提供者健康状态）

按提供者显示的仪表板：

| 列       | 描述                                 |
| -------- | ------------------------------------ |
| 提供者   | 提供者 ID + 显示名称                 |
| 健康状态 | 绿色/黄色/红色状态                   |
| 熔断器   | 开启/关闭/半开启状态                 |
| 连接     | 连接数、上次刷新时间                 |
| 模型     | 可用模型、各模型的健康状态           |
| 成本     | 今日成本、7 天趋势                   |
| 错误     | 最近 24 小时错误数、最常见的错误类别 |

单击提供者可查看：

- 最近请求及延迟明细
- 各连接的健康评分
- 各模型的锁定状态
- 自动驾驶建议

### `/dashboard/quota`（配额跟踪）

对于每个 API 密钥：

- 当前使用量与限制的对比（进度条）
- 配额趋势（30 天图表）
- 下次重置时间
- 警报历史记录

### `/dashboard/combos`（组合健康状态）

按组合显示：

- 策略 + 目标
- 各目标的健康状态
- 最近的回退事件
- 成功率（24 小时、7 天、30 天）

---

## 健康检查 API

OmniRoute 提供**两个** HTTP 健康检查端点。对于编排器而言，它们不能互换使用。

| 路径                         | 用途                                                    | 开销                        | 适用场景                                                             |
| ---------------------------- | ------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------- |
| `GET /healthz`               | 生命周期存活/就绪状态（`ok` / `starting` / `stopping`） | 极低（仅检查阶段标志）      | Kubernetes **就绪探针**；如果必须使用 HTTP，可用作宽松的**存活探针** |
| `GET /api/monitoring/health` | 深度系统及提供者摘要（数据库、堆、目录计数等）          | 较高（同步数据库/监控工作） | 仪表板、黑盒深度检查、Docker 内置健康检查                            |

> **注意：** 提供者健康矩阵、自动驾驶问题、配额监控、令牌健康状况，以及 `/api/monitoring/health` 以外的延迟详情，可通过 **MCP 工具** `observability_snapshot` 或**仪表板**页面获取——这些功能没有专用的 REST 路由。

两个路由都与请求处理运行在**同一个 Node 事件循环**上。CPU 密集型路径（例如大型 `GET /v1/models` 目录处理、长上下文压缩/令牌计数）可能延迟**所有** HTTP 处理程序，包括 `/healthz`。事件循环繁忙 ≠ 进程已终止。应优先修复造成阻塞的任务；调整探针只能减少误杀。

### 轻量级编排器探针

```bash
GET /healthz
# 或 HEAD /healthz
```

- 当服务器生命周期阶段为就绪时，返回 **200** + 响应体 `ok`
- 在启动或关闭期间，返回 **503** + `starting` / `stopping`
- 实现：`src/app/healthz/route.ts`（不执行数据库 ping）

### 系统健康状态（深度检查）

```bash
GET /api/monitoring/health
```

响应：

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`：探针缓存与 SQLite `test_status` 的对比

`GET /api/monitoring/health` → `credentialHealth` 是**内存中的探针缓存
指标**，而不是 `provider_connections.test_status` 的实时转储。在 #12532 之后，
请求路径只读取 `getCachedCredentialHealthSummary()`；后台探针会在事件循环之外
刷新缓存。

| 层级            | 位置                                                                  | 含义                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 探针缓存指标    | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | 进程内存中仍保留的最近一次凭据健康探测结果。`source` 始终为 `probe-cache`。                                                                                                            |
| 失败连接详情    | `credentialHealth.failedConnections`                                  | **仅当 `failed > 0` 时**存在。包含 `status=error` 的缓存行有界列表（`connectionId`、`status`、经过清理的 `lastError` / `lastErrorType`）。如果列表已被截断，则会设置 `failedOmitted`。 |
| SQLite 持久状态 | `credentialHealth.staleDbNonOkCount`                                  | **活跃**（`is_active=1`）连接行中，持久化 `test_status` 为已知非正常值（`error`、`expired`、`credits_exhausted`、`banned`、`deactivated`、`unavailable`）的数量。                      |

这两个层级可能会有意出现不一致：

- 指标中 `failed=0`，但 `staleDbNonOkCount>0`——SQLite 中仍保留着持久的
  `test_status`（例如 `expired` 或 `credits_exhausted`），而最新的
  探针缓存快照没有将其计入 `status=error`。
- 指标中 `failed>0`，但 SQLite 看起来正常——最近一次探测失败并已
  缓存；数据库行尚未更新，或者随后已被清除。

抓取此端点时，不要仅根据 `provider_connections.test_status` 发出警报。
使用 `failed` + `failedConnections` 判断实时探测失败；需要持久状态计数时，
则使用 `staleDbNonOkCount`。

### Kubernetes 探针建议

OmniRoute 是一个**单 Node 进程**（单个事件循环）。默认 Docker `HEALTHCHECK` 以轻量级 `/healthz` 为目标。对于 kubelet 的存活探针间隔而言，`/api/monitoring/health` **开销过高**。

| 探针             | 推荐目标                                                                       | 备注                                                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **启动**         | HTTP `GET /healthz`，配置较长的 `failureThreshold`（或较大的 `startPeriod`）   | 冷启动 + SQLite 迁移可能需要数秒以上                                                                                                                                                                                                                                             |
| **就绪**         | HTTP `GET /healthz`                                                            | 生命周期状态为 `ok` / `starting` / `stopping`（200 与 503）。如果事件循环被 CPU 阻塞，状态仍会反复变化。**耗时数秒才返回 200 并不表示健康**（#10303）——这意味着事件循环在运行这个仅返回 3 字节内容的处理程序之前已处于饥饿状态                                                   |
| **存活**         | HTTP `GET /livez`，**或对主服务端口（`PORT`，默认值为 `20128`）执行 TCP 探测** | `/livez` 仅表示进程存活（只要处理程序能够运行，就始终返回 200）。它仍与主服务共享事件循环——繁忙 ≠ 已死，而且在检测事件循环饥饿（#10303）方面并不比 TCP 更好。如果 HTTP 探针在目录/压缩负载下超时，请优先使用 **TCP**；无论采用哪种方式，都**不要**因短暂的事件循环停顿而终止 pod |
| **深度健康检查** | 由外部检查器请求 `GET /api/monitoring/health`                                  | 不适用于 kubelet `livenessProbe` / 高频 `readinessProbe`                                                                                                                                                                                                                         |

配置示例（请根据冷启动时间和压缩负载调整阈值）：

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # 当事件循环停顿时，HTTP /livez 仍可能超时。TCP 是
  # 更为保守的替代方案：
  # tcpSocket:
  #   port: http
```

**不要**将 kubelet **存活探针**指向 `/api/monitoring/health`。该路径会执行实际的数据库/监控工作，并且在高负载下会产生误报。

相关内容：[#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052)（事件循环繁忙时的探针）、[#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055)（目录定价占用过多资源）、[#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117)（压缩令牌计数占用过多资源）。

### 可选的请求路径工作（内存、技能、令牌刷新）

内存提取、技能注入和 OAuth 令牌刷新与 `/healthz` 共享**主 Node 事件循环**。它们是由仪表板开关控制的功能（`memoryEnabled`、`skillsEnabled`），并非工作线程池。请参阅[环境 — 事件循环开销](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)。

### 提供者健康状态

> **没有 REST 端点。**可通过 MCP 工具 `observability_snapshot` 或仪表板的 `/dashboard/providers` 页面获取提供者健康数据。

### 提供者详情

> **没有 REST 端点。**可通过仪表板的 `/dashboard/providers` 页面查看各提供者的详细信息。

---

## 提供者健康自动驾驶

`providerHealthAutopilot.ts` 模块是一个**自愈系统**，它可以：

1. 检测提供者问题（断路器开启、冷却、锁定、配额警告）
2. 生成解决问题的**建议操作**
3. 可选地**自动执行**低风险操作

### 检测到的问题类型

| 问题类型                     | 严重程度 | 示例条件                    |
| ---------------------------- | -------- | --------------------------- |
| `provider_circuit_open`      | 严重     | 失败 5 次后断路器开启       |
| `provider_circuit_half_open` | 警告     | 断路器正在测试是否已恢复    |
| `connection_cooldown`        | 警告     | 收到 429 后连接进入冷却状态 |
| `stale_connection_error`     | 警告     | 上次刷新失败已超过 30 分钟  |
| `terminal_connection_error`  | 严重     | OAuth 已撤销、密钥无效      |
| `inactive_connection`        | 信息     | 已在设置中禁用连接          |
| `model_lockout`              | 警告     | 特定模型处于隔离状态        |
| `quota_monitor_warning`      | 警告     | 配额使用率达到 80% 以上     |

### 生成的操作类型

| 操作                           | 风险 | 描述                   |
| ------------------------------ | ---- | ---------------------- |
| `clear_provider_breaker`       | 中   | 将断路器重置为关闭状态 |
| `clear_connection_cooldown`    | 低   | 解除连接的冷却状态     |
| `clear_stale_connection_error` | 低   | 清除过时的错误标志     |
| `clear_model_lockout`          | 低   | 重新启用被隔离的模型   |
| `reactivate_connection`        | 中   | 重新启用已停用的连接   |
| `deactivate_connection`        | 高   | 禁用存在问题的连接     |

### API

> **没有 REST 端点。** 自动驾驶问题可通过 MCP 工具 `observability_snapshot` 或仪表板获取。自动驾驶在内部运行；其行为通过设置数据库（每个连接的 `autopilotMode` 字段）进行配置，而不是通过环境变量配置——使用 `grep -rn` 搜索自动驾驶模式环境变量不会返回任何结果。

### 自动驾驶模式

自动驾驶默认以**手动模式**运行——它会检测问题并生成建议操作，但不会自动应用这些操作。可以通过仪表板应用操作。

---

## 组合健康自动驾驶

`comboHealthAutopilot.ts` 是提供者自动驾驶的**组合专用**版本。它可以：

- 检测不健康的组合
- 建议重新排序目标
- 建议禁用故障目标
- 在失败 N 次后自动移除失效目标

### 组合问题示例

```
组合 "always-on"（优先级策略）
├─ 目标 1：openai/gpt-5（健康）
├─ 目标 2：anthropic/claude-opus-4-6（⚠️ 模型锁定至 14:00）
└─ 目标 3：kiro/claude-sonnet-4-5（健康）

建议操作：重新排序——在锁定到期之前，将 kiro 移到 anthropic 之前
```

---

## 配额监控器

`observability.ts` 为订阅提供者（Claude Code、Codex、GitHub Copilot）公开**按会话划分的配额监控器**：

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### 状态含义

| 状态        | 出现条件         | UI 操作                      |
| ----------- | ---------------- | ---------------------------- |
| `starting`  | 正在进行初始轮询 | 显示加载指示器               |
| `idle`      | 最近没有活动     | 在仪表板中隐藏               |
| `healthy`   | 剩余配额 > 50%   | 绿色圆点                     |
| `warning`   | 剩余配额 < 50%   | 黄色警告                     |
| `exhausted` | 配额 = 0%        | 红色阻断，路由到下一个提供者 |
| `error`     | 轮询失败         | 红色圆点，尽快重试           |

### API

> **没有 REST 端点。** 配额监控器数据可通过 MCP 工具 `observability_snapshot` 或仪表板获取。

---

## 可观测性快照

MCP 工具 `observability_snapshot` 会为 AI 智能体返回一份**完整的系统快照**：

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* 见上文 */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

智能体使用此快照来作出**路由决策**——例如，“如果 openai 的熔断器处于开启状态，则优先路由至 anthropic”。

---

## 令牌健康检查

OAuth 提供者（Claude Code、GitHub Copilot、Cursor）需要**定期刷新令牌**。`src/lib/tokenHealthCheck.ts` 会运行一个后台调度器：

- **轮询周期**：每 60 秒一次（`src/lib/tokenHealthCheck.ts:30` 中的轮询配置为 `TICK_MS = 60 * 1000`）
- **每个连接的健康检查间隔**：默认为 60 分钟（`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`）；可通过设置数据库进行配置
- **发生 401 时抢先刷新**：由每个连接对应的拦截器处理

### 令牌健康状态

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### 配置

令牌健康检查配置由 `tokenHealthCheck.ts` 在内部处理。

### 令牌健康状况

> **没有 REST 端点。**令牌健康数据可通过仪表板或 MCP 工具 `observability_snapshot` 获取。

---

## 告警

### 内置渠道

OmniRoute 支持 **3 种告警渠道**：

| 渠道       | 设置     | 使用场景                  |
| ---------- | -------- | ------------------------- |
| 仪表板横幅 | 始终启用 | 应用内通知                |
| Webhook    | 配置 URL | Slack、Discord、PagerDuty |
| 日志       | 默认启用 | 用于外部日志聚合          |

### Webhook 配置

> **注意：**Webhook 告警配置通过仪表板的“设置”页面进行管理。有关 Webhook URL、事件筛选和有效负载自定义，请参阅设置界面。

### 告警类型

| 告警                         | 触发条件                          | 默认严重级别 |
| ---------------------------- | --------------------------------- | ------------ |
| `provider_circuit_open`      | 熔断器开启                        | 严重         |
| `provider_circuit_half_open` | 熔断器测试恢复情况                | 信息         |
| `quota_warning`              | 配额使用率达到 80% 及以上         | 警告         |
| `quota_exhausted`            | 配额使用率达到 100%               | 严重         |
| `token_refresh_failed`       | 连续刷新失败 3 次及以上           | 警告         |
| `token_expired`              | 令牌已过期                        | 严重         |
| `combo_target_unhealthy`     | 组合目标处于冷却状态达 1 小时以上 | 警告         |
| `db_integrity_warning`       | FK 违规数大于 0                   | 警告         |
| `heap_pressure`              | 堆使用量超过阈值的 80%            | 警告         |

---

## 性能指标

### 跟踪的指标

| 指标                    | 类型   | 来源                            |
| ----------------------- | ------ | ------------------------------- |
| `request_count`         | 计数器 | `services/usage.ts`             |
| `request_latency_ms`    | 直方图 | `services/usage.ts`             |
| `tokens_consumed`       | 计数器 | `services/usage.ts`             |
| `cost_usd`              | 计数器 | `services/usage.ts`             |
| `provider_errors`       | 计数器 | `services/errorClassifier.ts`   |
| `circuit_state_changes` | 计数器 | `services/resilience.ts`        |
| `cache_hits`            | 计数器 | `services/signatureCache.ts`    |
| `compression_savings`   | 直方图 | `services/compression/stats.ts` |
| `quota_used`            | 仪表   | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | 仪表   | `observability.ts`              |

### 延迟百分位数 (p50/p95/p99)

> **没有 REST 端点。** 延迟百分位数数据可通过仪表板的 `/dashboard/health` 页面获取。计划在 v3.9 中支持 Prometheus/OpenTelemetry 导出。

### Prometheus / OpenTelemetry 导出（第 2 阶段）

计划在 v3.9 中原生支持导出到 Prometheus、OpenTelemetry 和 Datadog。

目前，可使用任何基于 HTTP 的监控系统（Prometheus blackbox exporter、Datadog HTTP check 等）抓取 `/api/monitoring/health`。

---

## 告警配置方案

### Slack

> **注意：** Webhook 告警通过仪表板的设置页面进行配置——没有专用的 webhook 环境变量（`grep -rn` 返回零条结果）。有关 webhook URL、事件筛选和有效载荷自定义，请参阅设置界面。

### Discord

> Webhook 告警使用与 Slack 相同的设置界面流程。Discord 接受相同格式的 JSON 有效载荷。

### PagerDuty

> Webhook 告警使用相同的设置界面流程。PagerDuty Events API v2 路由密钥在设置界面中配置。

### 自定义 Webhook（JSON）

> 任何接受带 JSON 正文的 POST 请求的 HTTP 端点均可使用。请在设置界面中配置 URL。

---

## 仪表板配置

### 自定义健康状态仪表板

创建 `~/.omniroute/dashboard.json`：

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### 将提供者固定到顶部

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## 故障排除

### “提供者显示健康，但请求失败”

1. 检查 **autopilot 问题**——可能有模型被锁定
2. 查看**最近的错误**，确认具体的错误类别
3. 尝试提供者卡片中的**连接测试**
4. 检查提供者是否在**上游受到速率限制**（本地不可见）

### “配额显示健康，但我看到了 429”

- 429 表示提供者认为你的配额已用尽
- OmniRoute 的配额跟踪可能**已过时**——应以上游提供者的数据为准
- 配额数据会通过内部配额监控器自动刷新

### “组合失败，但所有目标看起来都很健康”

- 检查**组合健康状态**仪表板是否存在目标排序问题
- 查看**回退事件**——组合可能过快耗尽所有目标
- 验证所用**策略**是否符合你的使用场景（优先级、轮询或自动）

### “数据库健康检查失败”

- 运行 `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- 如果返回“ok”——这是误报，健康检查过于严格
- 如果返回任何其他内容——**停止 OmniRoute**，然后按照[灾难恢复指南](./DATABASE_GUIDE.md#disaster-recovery)操作

### “内存堆压力达到严重级别”

```bash
# 检查当前堆
node -e "console.log(process.memoryUsage())"

# 触发手动 GC（如果使用 --expose-gc）
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# 减少并发请求数（通过仪表板设置页面进行设置，而不是通过环境变量）
# 不存在 `MAX_CONCURRENT_REQUESTS` 环境变量——请在设置 → 并发中进行配置。
```

---

## 另请参阅

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用量和成本跟踪
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — 数据库架构和健康状况
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — 代理健康状况（独立缓存）
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 系统架构
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 熔断器详情
- 源代码：`src/lib/monitoring/`（4 个文件，2121 行代码）
