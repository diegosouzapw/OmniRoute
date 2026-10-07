# Webhooks (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **事实来源：** `src/lib/webhookDispatcher.ts`、`src/lib/db/webhooks.ts`、`src/app/api/webhooks/`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 可以在平台事件发生时触发 HTTP webhook。可使用它们与 Slack、PagerDuty、Datadog、内部告警服务或任何 HTTP 接收端集成。

调度器使用 HMAC-SHA256 对每次投递进行签名，在发生暂时性故障时重试，跟踪每个 webhook 的投递健康状况，并自动禁用持续失败的端点。

## 支持的事件

`WebhookEvent` 类型（`src/lib/webhooks/eventDescriptions.ts`，由 `src/lib/webhookDispatcher.ts` 使用）目前准确地定义了四种事件：

| 事件                | 触发条件                            |
| ------------------- | ----------------------------------- |
| `request.completed` | 代理请求成功完成                    |
| `request.failed`    | 代理请求在所有重试/回退均失败后失败 |
| `quota.exceeded`    | API 密钥达到预算/配额阈值           |
| `test.ping`         | 测试端点使用的合成事件              |

订阅可使用字面值 `"*"` 接收所有事件。`events` 中未知的事件名称会在调度时被忽略。

> 注意：调度器 API 已接入，但部分非 `test.ping` 事件的生产调用点仍在陆续实现中。请使用 `grep dispatchEvent` 检查当前版本中哪些路径会调用调度器。

## 架构

```
调用方（处理程序、服务、监控器）
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> 按 webhook.events 过滤
    -> 对每个匹配项（并行）：
       deliverWebhook(url, payload, secret)
         构建负载 { event, timestamp, data }
         使用 HMAC-SHA256 对正文进行签名（如果存在密钥）
         使用 10 秒超时发送 POST 请求
         遇到 5xx / 网络错误时最多重试 3 次
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

对于调用方，调度采用即发即弃模式：`Promise.allSettled` 会吞掉每个 webhook 的错误，因此一个有问题的接收端不会阻塞其他接收端。

## HMAC 签名

当 webhook 配置了 `secret` 时，OmniRoute 会对 JSON 正文进行签名并发送：

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> 标头名称使用 `X-Webhook-*` 前缀（而不是 `X-OmniRoute-*`）。签名值为 `sha256=<hex>`——请验证完整前缀。

如果调用 `createWebhook` 时未提供密钥，数据库模块会生成一个密钥（`whsec_<48 hex>`），因此默认情况下所有 webhook 都会被签名。

### 在接收端验证

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

始终应在进行任何 JSON 解析之前，使用**原始**请求正文进行验证。

## 重试与失败策略

`deliverWebhook(url, payload, secret, maxRetries = 3)`：

- 每次尝试的超时时间为 10 秒（`AbortController`）。
- HTTP 2xx 视为成功。
- HTTP 3xx/4xx 视为不可重试的最终状态——记录为已投递，
  其中 `success = res.ok`。
- HTTP 5xx 和网络错误会使用指数退避进行重试：
  `2^attempt * 1000 ms`（1 秒、2 秒、4 秒）。
- 达到 `maxRetries` 后，该次投递将记录为失败。
- 每次投递都会更新 `last_triggered_at`、`last_status`，并重置
  或递增 `failure_count`。
- 分发器会在每次扇出后调用 `disableWebhooksWithHighFailures(10)`，
  因此任何 `failure_count >= 10` 的 webhook 都会被自动禁用。

## 数据库

表 `webhooks`（迁移 `011_webhooks.sql`）：

| 列                  | 类型    | 说明                                   |
| ------------------- | ------- | -------------------------------------- |
| `id`                | TEXT PK | UUID                                   |
| `url`               | TEXT    | 目标 URL                               |
| `events`            | TEXT    | JSON 数组；默认为 `["*"]`              |
| `secret`            | TEXT    | HMAC 密钥（未提供时自动生成）          |
| `enabled`           | INT     | 0/1；默认为 1                          |
| `description`       | TEXT    | 可选的人类可读标签                     |
| `created_at`        | TEXT    | `datetime('now')`                      |
| `last_triggered_at` | TEXT    | 每次投递尝试时更新                     |
| `last_status`       | INT     | 上次尝试的 HTTP 状态码（0 = 网络错误） |
| `failure_count`     | INT     | 成功时重置为 0，失败时 +1              |

除了 `webhooks` 行上的聚合计数器外，投递历史还会持久化到专用的 `webhook_deliveries` 表中
（迁移 `069_webhook_deliveries.sql`，每次尝试时通过
`src/lib/db/webhookDeliveries.ts::insertDelivery` 写入）。类型元数据（Slack / Discord /
Telegram / 自定义有效载荷转换器）由 `070_webhooks_kind_metadata.sql` 添加。

## REST API

所有端点都需要管理身份验证（`requireManagementAuth`）。

| 端点                            | 方法   | 说明                            |
| ------------------------------- | ------ | ------------------------------- |
| `/api/webhooks`                 | GET    | 列出 webhook（密钥已掩码）      |
| `/api/webhooks`                 | POST   | 创建 webhook                    |
| `/api/webhooks/[id]`            | GET    | webhook 详情（完整密钥）        |
| `/api/webhooks/[id]`            | PUT    | 更新字段                        |
| `/api/webhooks/[id]`            | DELETE | 删除                            |
| `/api/webhooks/[id]/test`       | POST   | 触发一次 `test.ping`（不重试）  |
| `/api/webhooks/[id]/deliveries` | GET    | 获取某个 webhook 最近的投递尝试 |
| `/api/webhooks/validate-url`    | POST   | 预先验证 URL（SSRF 防护）       |

`GET /api/webhooks` 会将密钥掩码为 `<前 10 个字符>...`，以避免
在列表页面上泄露。仅在确实需要密钥时使用 `[id]` GET。

### 创建 webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

如果省略 `secret`，服务器会生成一个 `whsec_<hex>` 密钥，并在
响应中返回该密钥。

### 测试 webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

返回 `{ delivered, status, error }`。不会进行重试——这有助于
快速验证接收方是否接受有效载荷和签名。

## 仪表板

位于 `/dashboard/webhooks` 的仪表板页面（参见
`src/app/(dashboard)/dashboard/webhooks/page.tsx`）提供以下功能：

- 使用事件选择器创建/编辑 webhook
- 根据 `enabled`、`failure_count` 和 `last_status` 显示状态指示器（活跃 / 未激活 / 错误）
- 一键测试投递
- 手动启用/禁用切换

## 载荷示例

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "来自 OmniRoute 的测试 webhook 投递",
    "webhookId": "<uuid>"
  }
}
```

非 `test.ping` 事件的字段结构由发出这些事件的调用位置定义；请将 `data` 对象视为向前兼容（可以添加字段，不要依赖字段不存在这一特性）。

## 最佳实践

- **验证每次投递的签名**，并与原始正文进行比对——这样可防止任何猜到你的 webhook URL 的人发送伪造的 POST 请求。
- **在约 5 秒内响应 2xx**——分发器的超时时间为 10 秒。响应缓慢的接收方会消耗重试次数，并使 `failure_count` 增加。
- **确保处理程序具有幂等性**——重试和至少一次投递语义意味着可能出现重复投递。
- **尽量减少订阅**——仅列出你实际使用的事件；`"*"` 会增加你无法控制的接收方的开销。
- **监控 `failure_count`**——端点连续失败 10 次后会自动禁用；修复接收方后，通过调用 `PUT /api/webhooks/[id]` 并设置 `enabled: true` 来重置。
- **定期轮换密钥**——通过 `PUT` 设置新的 `secret`，将新值部署到接收方，然后通过测试端点进行确认。

## 另请参阅

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 完整的管理 API 接口
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 通过 `request.failed` 暴露的提供者故障背后的断路器 / 冷却语义
- 源代码：`src/lib/webhookDispatcher.ts`、`src/lib/db/webhooks.ts`
