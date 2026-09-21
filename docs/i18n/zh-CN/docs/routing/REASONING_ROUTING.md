# Reasoning Routing (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

推理路由规则扩展了现有的模型和组合路由。当没有活动规则匹配时，
现有的思考、后缀、连接默认值和提供者转换行为保持
不变。

## 管理

规则管理位于 **设置 → 全局路由**。API 密钥编辑器提供相同的
管理界面，但仅显示针对所选密钥的规则。

管理 API 通过以下路由公开：

- `GET` 和 `POST`：`/api/settings/reasoning-routing-rules`
- `GET`、`PATCH` 和 `DELETE`：`/api/settings/reasoning-routing-rules/[id]`
- `POST`：`/api/settings/reasoning-routing-rules/simulate`

所有路由均使用 `requireManagementAuth`。输入使用
`src/shared/validation/schemas/reasoningRouting.ts` 中的 schema 进行验证。模拟器绝不会发起上游调用。

## 规则解析

早期求值只会选择一条规则。作用域按以下顺序检查：

1. `apiKey`
2. `combo`
3. `model`
4. `global`

在同一作用域内，优先选择 `priority` 较高的规则，其次是精确模型匹配优先于 glob 模式，
然后按稳定的 `createdAt` 和 `id` 顺序决定。`requestTags` 仅从 `metadata.tags`
读取，并支持 `any` 或 `all` 匹配。

仅当早期规则均未胜出且已选定具体的提供者连接时，才会求值 `connection` 规则。
它只能更改强度和预算。

## 强度和预算

`sourceEffort` 接受 `any`、`missing`、`none`、`low`、`medium`、`high`、`xhigh`、`max` 和
`ultra`。`missing` 表示请求既不包含离散的推理强度，也不包含思考开关或思考预算。
因此，仅包含预算的信号只会被 `any` 匹配。

`effortMode` 有三种变体：

- `inherit` 保留客户端的推理强度，同时仍允许更改模型或组合。
- `default` 仅在不存在显式推理信号时设置 `targetEffort`。
- `force` 使用 `targetEffort` 替换离散的推理强度。

此外，`budgetAction` 可以是 `preserve`、`remove` 或 `set`。`force` 与 `none` 结合使用时，会移除
所有可识别的推理强度和预算字段。`none` 与 `set` 同时使用是无效的。

针对已知不兼容模型的请求会在上游调用之前被拒绝。对于组合目标，不兼容的条目会被移除；
如果没有任何条目保留，请求将返回状态码 `400`。
未知的能力数据会产生警告，但规则仍保持活动状态。

## 安全性和传输协议

源模型和目标模型，或源组合和目标组合，仍受现有 API 密钥
策略约束。推理规则绝不会扩大模型、组合或配额权限。

该引擎已集成到 Chat Completions、Responses、Anthropic Messages 和内部
Codex WebSocket 路径中。WebSocket 路径仅接受 Codex 目标模型；无法在该路径中
执行组合目标。规则决策会存储在现有的路由跟踪记录中，且不包含机密信息。

## 持久化

迁移 `src/lib/db/migrations/126_reasoning_routing_rules.sql` 会创建
`reasoning_routing_rules` 表。规则引用已存储的 API 密钥、组合和提供者连接。
删除这些对象时会清理相关规则。`src/lib/db/reasoningRoutingRules.ts` 中的数据库访问层
为请求路径维护一个可失效缓存。

规则包含在 SQLite 备份、完整数据库导出和配置同步包中。
`reconcileReasoningRulesForSync` 会禁用缺少引用的已导入规则，并报告这些冲突。
