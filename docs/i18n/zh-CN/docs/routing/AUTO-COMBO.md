# OmniRoute Auto-Combo Engine (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **面向用户**：想要快速上手？请参阅 [Auto-Combo 用户指南](../getting-started/AUTO-COMBO-GUIDE.md)，其中提供了简单的说明和示例。

> 具有自适应评分和零配置自动路由能力的自管理模型链

## 零配置自动路由（`auto/` 前缀）

> **新增：** 无需创建组合。可直接在任何客户端中使用 `auto/` 前缀。

### 快速示例

| 模型 ID        | 变体    | 行为                                               |
| -------------- | ------- | -------------------------------------------------- |
| `auto`         | default | 所有已连接的提供者、LKGP 策略、均衡权重            |
| `auto/coding`  | coding  | 质量优先权重，适合代码生成                         |
| `auto/fast`    | fast    | 低延迟加权选择                                     |
| `auto/cheap`   | cheap   | 成本优化路由（最低成本优先）                       |
| `auto/offline` | offline | 优先选择配额可用性最高的提供者                     |
| `auto/smart`   | smart   | 质量优先 + 更高的探索率（10%），以便发现更好的模型 |
| `auto/lkgp`    | lkgp    | 显式使用 LKGP（与默认的 `auto` 相同）              |
| `auto/chaos`   | chaos   | 并行扇出，每个提供者选择一个模型（并非故障注入）   |

### 类别 × 层级组合（`auto/<category>:<tier>`）

OpenRouter 风格的后缀将**使用哪类路由**（类别）与**如何优化路由**（层级）分开，因此你可以自由组合它们（#4235 Phase B，`open-sse/services/autoCombo/suffixComposition.ts`）：

- **类别**（按能力筛选候选池）：`coding` · `reasoning` · `vision` · `chat` · `multimodal`。`vision`/`multimodal` 保留支持视觉的模型；`reasoning` 保留推理/思考模型。
- **层级**（选择评分权重/候选池过滤器）：`fast`（快速交付）· `cheap`（别名 `floor`，节省成本）· `reliable`（断路器健康状态 + 延迟稳定性）· `free` / `pro`（通过 `classifyTier` 按模型层级筛选候选池——免费层级与高级层级）。

| 示例                   | 解析结果                                         |
| ---------------------- | ------------------------------------------------ |
| `auto/coding:fast`     | 编码候选池，低延迟权重                           |
| `auto/coding:cheap`    | 编码候选池，成本优化（别名 `auto/coding:floor`） |
| `auto/reasoning:pro`   | 仅限推理/思考模型，高级层级                      |
| `auto/vision`          | 支持视觉的模型（无层级 → 均衡权重）              |
| `auto/multimodal:free` | 支持多模态的模型，仅限免费层级                   |

任何有效的 `auto/<category>[:<tier>]` 都会按需解析；其中精心挑选的子集会在 `/v1/models` 和仪表板中公布（`open-sse/services/autoCombo/builtinCatalog.ts` 中的 `AUTO_SUFFIX_VARIANTS`）。筛选采用**失败时开放**策略——如果某项约束无法匹配任何已连接模型，则会使用完整候选池，确保路由不会中断。核心评分器（`combo.ts`）保持不变；类别/层级过滤器在 `buildAutoCandidates` 中应用。

> **实时模型智能：** 启用 `ARENA_ELO_SYNC_ENABLED` 标志后，自动路由适配度将参考实时 **Arena ELO** 排名和 **models.dev** 层级数据（否则回退到静态适配度映射）。

**使用方法：**

```bash
# 任何支持 OpenAI 格式的 IDE 或 CLI 工具
基础 URL: http://localhost:20128/v1
API 密钥:  <your-endpoint-key>

# 在代码/配置中，将模型设置为：
model: "auto"                 # 均衡默认值
model: "auto/coding"          # 最适合编码任务
model: "auto/fast"            # 可用选项中速度最快
model: "auto/cheap"           # 每个 token 的成本最低
```

**运行过程：**

1. OmniRoute 在 `src/sse/handlers/chat.ts` 中检测 `auto/` 前缀
2. 从数据库查询所有**活跃的提供者连接**
3. 筛选出具有有效凭据（API 密钥或 OAuth 令牌）的连接
4. 确定每个连接使用的模型（`connection.defaultModel` 或提供者的第一个模型）
5. 在内存中构建**虚拟组合**（不存储在数据库中）
6. 使用所选变体的权重配置文件 + LKGP 策略进行路由

**关键特性：**

- ✅ **始终启用：** 无需开关、无需创建组合、无需配置
- ✅ **动态：** 自动反映当前已连接的提供者
- ✅ **会话粘性：** LKGP 确保优先使用上一次成功的提供者
- ✅ **支持多账户：** 每个提供者连接都会成为独立候选项
- ✅ **不写入数据库：** 虚拟组合仅在请求期间存在，持久化开销为零

### 按密钥控制候选项（#7819，Level 1+2）

`GET /v1/auto-combo/{channel}/candidates`（`{channel}` = `auto/` 后的后缀，基础通道则使用字面值 `auto`）是一个**只读**端点，用于列出 `auto/*` 通道当前的候选池，并附带实时可达性信息；它会复用现有的弹性机制读取结果（绝不直接读取断路器的 `state`）：

- 提供者断路器——`getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- 连接冷却——已解析的 `provider_connections` 行中的 `rateLimitedUntil` / `testStatus`
- 模型锁定——`isModelLocked(provider, connectionId, model)`

每个候选项还会包含此 API 密钥对应的 `excluded` 标志。排除项按 API 密钥存储（`auto_candidate_overrides` 表，迁移 `128`）——OmniRoute 是单租户系统，没有 `users` 表，因此 `apiKeyId` 是最接近真实调用方身份的标识——并通过纯函数且经过单元测试的 `filterExcludedCandidates()`（`open-sse/services/autoCombo/candidateOverrides.ts`），在 `open-sse/services/autoCombo/virtualFactory.ts` 的候选池汇聚点强制执行。该过滤器采用**失败时开放**策略：未设置 apiKeyId/channel 或数据库查询失败时，都会保留未过滤的候选池，因此未配置任何覆盖项的运维人员所看到的路由行为与引入此功能之前逐字节完全一致。

**推迟到后续 issue：** 每个候选项的权重 + 显式排序（Level 3
— 接入现有的加权/优先级策略路径），以及为每个 `auto/*` 通道固定特定的
`combo.ts` 策略（Level 4）。关于在单租户模型下，覆盖配置应继续按 API key 维护还是改为全局配置这一待定问题，请参阅 #7819 计划。

**幕后流程：**

```txt
请求：{ model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts 检测前缀
   ↓
createVirtualAutoCombo('coding') → 从活动连接生成 candidatePool
   ↓
handleComboChat（与持久化组合使用相同的引擎）
   ↓
自动评分机制为每个请求选择最佳提供者/模型
```

**实现文件：**

| 文件                                                      | 用途                             |
| --------------------------------------------------------- | -------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | 前缀解析器（`parseAutoPrefix`）  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 创建虚拟 `AutoComboConfig` 对象  |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 用于模拟提供者注册表的测试钩子   |
| `src/sse/handlers/chat.ts`                                | 集成：自动前缀短路处理           |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` 系统条目 |

## 与真实模型 ID 匹配的组合名称

`name` 与裸模型 ID 相同的组合（例如名为 `gpt-5.5` 的组合）是一种**有意设计且受支持的模式**，并非错误：这是 [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) 中记录的按模型 ID 进行提供者回退的机制。由于组合解析先于裸模型 ID 解析执行（`src/sse/services/model.ts` 中的 `getComboForModel()`），对裸 ID `gpt-5.5` 的请求会通过该组合的目标（例如 `acme-responses/gpt-5.5`、`backup-responses/gpt-5.5`）进行路由，而不是直接路由到单个提供者——这复用了为 [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) 构建的“组合先于重写”优先级，并通过 `tests/unit/responses-combo-resolution-3227.test.ts` 和 `tests/unit/combo-name-codex-responses-rewrite.test.ts` 进行回归测试。

创建组合或对组合重命名，使其名称遮蔽真实模型 ID 时，**绝不会被拒绝**——否则会破坏这一已有文档说明的工作流程。相反（#8530），当（新）名称与真实模型 ID 冲突时，`POST /api/combos` 和 `PUT /api/combos/[id]` 会在响应中附加一个非阻塞的 `warning` 字段：

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

启动时，`scanComboModelNameCollisionsAtBoot()`（`src/instrumentation-node.ts`）还会记录一条单行 `[STARTUP]` 警告，列出每个遮蔽模型 ID 的现有组合，以便意外触发此情况（而非按照 #6940 有意为之）的运维人员能够注意到。检测辅助函数位于 `src/lib/combos/modelNameCollision.ts`。

## 从客户端调用自定义组合

持久化组合（设置 → 组合）仅在客户端的 `model` 字段中发送组合的**精确名称**时使用——不会对组合名称进行模糊或部分匹配，也不涉及 `auto/` 前缀。解析顺序（`src/sse/services/model.ts` 中的 `getComboForModel()`）：

1. 精确匹配组合名称（`model: "my-combo"`），
2. `combo/<name>` 前缀（`model: "combo/my-combo"`），
3. 模型→组合的 glob 映射（`/api/model-combo-mappings`）。

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

两个常见陷阱：

- **`auto` 不会使用你的组合。** `auto`/`auto/*` 会构建自己的零配置候选池，且仅当某个组合的名称恰好为 `auto` 时才会查询持久化组合（不建议这样做）。要通过组合进行路由，请发送其精确名称，而不是 `auto`。
- **`openrouter/auto` 是真实的付费 OpenRouter 产品**（“自动选择最佳可用模型”），并非 OmniRoute 别名。它是 OpenRouter 注册表（`open-sse/config/providers/registry/openrouter/index.ts`）中的单个静态模型条目，并单独计费。使用“设置 → 路由 → 隐藏付费模型”可将其从 `auto` 候选池中排除。

有关本文所记录的最初困惑，请参阅 [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) 和 [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111)。

## 工作原理（持久化自动组合）

自动组合引擎使用一个**包含 16 个因素的评分函数**（定义于 `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`），为每个请求动态选择最佳提供者/模型。默认权重之和为 `1.0`；自定义权重由 `normalizeScoringWeights()` 重新归一化。在这 16 个因素中，`cacheAffinity` 和 `resetWindowAffinity` 的默认权重为 `0`；`reliability` 在 `DEFAULT_WEIGHTS` 中为 `0`，但在通用包中为 `0.03`，在 `reliability-first` 中为 `0.04`；而 `quality` 在包中为 `0.02`（在 `quality-first` 中为 `0.03`）：系统仍会为每个候选项计算这些因素，并且 `cacheAffinity` 会在评分之外控制提示词缓存去重，因此默认权重为零的因素默认不参与评分，而在包中则会参与。

![自动组合的 16 因素评分](../diagrams/exported/auto-combo-scoring.svg)

> 来源：[diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd)（通过 `npm run docs:render-diagrams` 重新生成）。文件名是历史遗留名称；源文件和渲染后的图表展示了 `DEFAULT_WEIGHTS` 中声明的全部 16 个因素。

| 因素                  | 默认权重 | 说明                                                                                                                                                  |
| :-------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429   | 剩余配额/速率限制余量 [0..1]                                                                                                                          |
| `health`              | 0.1605   | 来自断路器的健康评分（CLOSED=1.0、HALF_OPEN=0.5、OPEN=0.0）                                                                                           |
| `costInv`             | 0.1429   | **混合**成本的倒数（60% 输入 token 价格 + 40% 输出 token 价格，并进行归一化）— 越便宜，评分越高                                                       |
| `latencyInv`          | 0.1143   | 相对于候选池进行归一化的 p95 延迟倒数 — 越快，评分越高                                                                                                |
| `taskFit`             | 0.0762   | 任务类型适配度（编码、审查、规划、分析、调试、文档）                                                                                                  |
| `stability`           | 0.0476   | 基于延迟标准差计算的方差稳定性 — 响应时间波动越大的候选项评分越低                                                                                     |
| `tierPriority`        | 0.0476   | 账户层级优先级 — Ultra=1.0、Pro=0.67、Standard=0.33、Free=0.0                                                                                         |
| `tierAffinity`        | 0.0476   | 候选项层级与清单建议层级之间的亲和度                                                                                                                  |
| `specificityMatch`    | 0.0476   | 请求特异性（清单提示）与模型层级之间的匹配度                                                                                                          |
| `contextAffinity`     | 0.0476   | 请求所需上下文窗口与模型上下文窗口之间的亲和度                                                                                                        |
| `sessionAvailability` | 0.0476   | 当前会话中候选连接的 OAuth 会话可用性（`getOAuthSessionAvailability()`；非 OAuth 连接的评分为 1.0）                                                   |
| `connectionDensity`   | 0.0476   | 将负载分散到同一提供者的不同连接上（避免集中）                                                                                                        |
| `cacheAffinity`       | 0.00     | 通过 Rendezvous 哈希，使请求倾向于选择最有可能已保存该请求提示词缓存前缀的连接（`open-sse/services/combo/promptCacheAffinity.ts`）；默认禁用（#8008） |
| `resetWindowAffinity` | 0.00     | 倾向于选择配额重置窗口更有利的连接（默认禁用）                                                                                                        |
| `quality`             | 0.03     | 来自路由事件质量跟踪器、由反馈驱动的输出质量信号；没有观测数据的候选项会获得中性值 0.5                                                                |
| `reliability`         | 0.00     | 基于过去 24 小时使用历史记录，在至少十个样本的门槛下计算观测成功占比 `1 - failureRate`（否则使用实时指标）；没有观测数据的候选项视为 1.0。默认禁用    |

**总和：** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`，与 `DEFAULT_WEIGHTS` 中的声明一致；用户配置的权重在评分前会由 `normalizeScoringWeights()` 重新归一化为一个分布。

## 模式包

`open-sse/services/autoCombo/modePacks.ts` 中预定义了 6 个权重配置。每个模式包都会完全替换默认权重，使选择偏向某一目标。每个模式包的权重总和都已达到 `1.0`（保留四位小数时显示为 `0.9999`），因此当模式包处于活动状态时，`normalizeScoringWeights()` 没有任何实质性内容需要校正——在舍入误差范围内，以下值就是评分器实际应用的值。

| 因素                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

说明：

- **模式包包含 `quality` 和 `reliability`**（`quality 0.02`，`quality-first 0.03`；`reliability 0.03`，`reliability-first 0.04`），并会整体替换权重映射（`weights = pack`，而不是合并）。`DEFAULT_WEIGHTS` 包含 `quality 0.03 / reliability 0`；选择 `balanced`/`default` 会保留这些默认值，而选择模式包则会使用上方列出的模式包值。对于冷池（尚无观测数据，因此 `quality 0.5` 且 `reliability 1`），这两个因素在通用模式包下会增加 `+0.04`（`0.03 + 0.01`），在 `quality-first` 下会增加 `+0.045`，在 `reliability-first` 下会增加 `+0.05`。
- 在每个模式包中，`tierAffinity`、`specificityMatch` 和 `resetWindowAffinity` 都被显式设置为 `0`。
- 各模式包的侧重点一览：
  - **ship-fast** → latencyInv 0.3048 + health 0.2667（低延迟、健康的连接）
  - **cost-saver** → costInv 0.3324（成本最低的 token 胜出）
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03，为所有模式包中的最高值（最适合任务且表现稳定的模型）
  - **offline-friendly** → quota 0.3324 + health 0.2667（不考虑速度/成本，最大化余量）
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04，为所有模式包中的最高值（最大限度减少意外情况）
  - **chaos-mode** → health 0.4000 + taskFit 0.1905（权重包 `auto/chaos` 为其面板成员分配的权重；并行扇出不会读取这些权重，而且这不是故障注入配置，参见 [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out)）

### 每请求控制（请求头）— #6023 / #6024 / #6025 / #3470

可以通过三个请求头**按请求**控制 `auto` 组合，而无需修改该组合已存储的配置。这些请求头仅适用于 `auto` 策略，并且只对携带它们的请求生效；如果请求头不存在，则使用组合已保存的 `modePack`/`budgetCap`/`budgetFallback`。

| 请求头                        | 接受的值                                                                                                                                                                     | 作用                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | 预设别名（`fast`、`balanced`、`quality`、`cheap`、`reliable`、`offline`）或原始包名称（`ship-fast`、`cost-saver`、`quality-first`、`offline-friendly`、`reliability-first`） | 覆盖此请求的评分权重。`balanced`/`default` 强制使用默认权重（不使用包）。未知值将被忽略（保留配置）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `X-OmniRoute-Budget`          | 正数（每个请求的最高美元金额）                                                                                                                                               | 硬性成本上限：在选择之前，将过滤掉估算成本超过该上限的候选项。当**所有**候选项都超过上限时，具体行为由下方的 `X-OmniRoute-Budget-Fallback` 控制。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Budget-Fallback` | `cheapest`（默认，别名：`cheapest-viable`、`soft`）或 `strict`（别名：`block`、`hard`）                                                                                      | `cheapest`：回退到全局成本最低的候选项，即使其成本仍然超过上限（旧版行为）。`strict`：拒绝选择——请求会立即失败并返回 `HTTP 402`，而不是在未提示的情况下超支。未知值将被忽略。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `X-OmniRoute-Effort`          | `auto`（其他值保留）                                                                                                                                                         | 自适应思考预算：当请求不包含任何形式的推理字段（`reasoning_effort`、`reasoning`、`thinking`）时，网关会根据确定性的请求形态信号（最后一条用户消息的长度、截至最后一条用户消息的上下文大小、先前的工具结果、工具循环深度）将 `auto` 解析为 `low`/`medium`/`high`。这些信号仅限于当前轮次——最后一条用户消息之后的所有内容都会被忽略——因此，工具循环中的每个请求都会解析为相同级别（每轮无状态固定，不保留会话状态，也不会在循环中途升级，以免破坏上游提示词缓存前缀）。客户端显式指定的推理字段始终优先。仅适用于上游分派解析为 OpenAI Chat Completions 形态（`targetFormat === FORMATS.OPENAI`）的请求——`reasoning_effort` 是 OpenAI 形态的字段，因此对于面向 Claude 或 Gemini 的请求，此请求头不会产生任何作用（参见 `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`）。 |

```bash
# 强制使用最快配置，将此请求的费用上限设为 $0.05，并在超支时直接阻止，而不是继续超支
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

解析过程是一个纯函数（`open-sse/services/autoCombo/requestControls.ts`）；解析后的值会传入引擎现有的 `config.modePack` / `config.budgetCap` /
`config.budgetFallback` 输入。组合中存储的 `config.budgetFallback`（"strict" |
"cheapest"）用于设置持久策略；请求头则会针对单个请求覆盖该策略。

## 所有路由策略

OmniRoute 的组合引擎支持 **20 种路由策略**（声明于 `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`）。Auto Combo 引擎本身通过 `auto` 策略提供；其他策略可用于持久化组合。

| 策略                | 描述                                                                                                                              |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | 按明确优先级排列的首选目标有序列表                                                                                                |
| `weighted`          | 根据各目标权重进行加权随机选择                                                                                                    |
| `round-robin`       | 按顺序循环选择目标（分批处理；见下文）                                                                                            |
| `context-relay`     | 在目标之间移交上下文（适用于长对话）                                                                                              |
| `fill-first`        | 先用满每个目标的配额，再转至下一个目标                                                                                            |
| `p2c`               | 二选一（Power-of-2-choices）随机负载均衡                                                                                          |
| `random`            | 均匀随机选择                                                                                                                      |
| `least-used`        | 选择当前负载最低的目标                                                                                                            |
| `cost-optimized`    | 根据目录定价，将每个请求的费用降至最低                                                                                            |
| `reset-aware` ⭐    | 按配额重置时间确定优先级——重置周期较短的目标排名更高                                                                              |
| `reset-window`      | 优先选择配额窗口最早重置的目标                                                                                                    |
| `headroom`          | 选择剩余配额余量最大的目标                                                                                                        |
| `quota-weighted`    | 跳过配额已耗尽的账户，然后按照剩余配额除以进行中负载所得的比例，从其余账户中进行选择；现有对话会保持固定                          |
| `strict-random`     | 随机选择，不对重复项去重                                                                                                          |
| `auto`              | 使用 Auto Combo 评分（16 个因素）——**推荐**                                                                                       |
| `lkgp`              | 最近已知可用路径（固定使用最近成功的提供者，随后回退到规则）                                                                      |
| `context-optimized` | 选择最适合当前上下文大小的目标                                                                                                    |
| `cache-optimized`   | 按提示缓存亲和性重新排列目标——最有可能已缓存此请求前缀的连接会最先尝试（`open-sse/services/combo/promptCacheAffinity.ts`，#8008） |
| `fusion` 🧬         | 并行分发给一组模型，然后由裁判模型综合生成一个答案（见下文）                                                                      |
| `pipeline`          | 按顺序运行各目标，将每一步的输出传入下一步作为输入；仅返回最终答案（#6396）                                                       |

⭐ = v3.8.0 中新增 · 🧬 = v3.8.36 中新增

### `weighted` 语义

`weighted` 是**针对每个请求进行一次按比例随机抽取**
（`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`），并非用于均衡分配：

- 每个请求以 `weight / totalWeight` 的概率抽取**一个**步骤；其余步骤按权重降序排列，作为该请求的回退链。
- 当任何其他步骤的权重 > 0 时，权重为 `0`（或未设置权重）的步骤**永远不会被抽中**——它只能在已抽中的步骤失败后作为回退。仅当**所有**权重均为 0 时，才会变为均匀选择。
- 如果某个步骤的所有目标都不可用——提供者断路器为 `OPEN`、连接处于冷却期、模型被锁定——则会在抽取前将该步骤移除
  （`open-sse/services/combo/targetResolution.ts`），因此单个健康步骤可能会暂时赢得每个请求。
- `stickyWeightedLimit`（组合配置，默认值为 `1`，即关闭）会将抽中的步骤固定使用指定次数的连续成功请求，然后再重新抽取。

如需严格轮换，请使用 `round-robin`；在 `weighted` 中使用相等权重只能实现统计意义上的均衡，而非严格均衡。

### 智能体流水线模式

包含至少两个模型的 `pipeline` 组合可通过
`config.agenticOrchestration.enabled` 启用规划器/执行器路由。第一个目标负责规划和最终回答；
第二个目标发出客户端原生工具调用。OmniRoute 会从请求协议中检测工具结果
续传，请规划器判断是否需要新一轮工具调用，并动态选择执行器或规划器作为面向客户端的
最终步骤。

第二个目标之后的其他模型会按顺序充当执行器备选。HTTP 响应失败或传输异常时，
系统会切换到下一个执行器，并沿用相同的规划器决策和原生工具，但使用该执行器自己的
步骤提示词和解析后的连接。第一个成功的响应会原样返回，包括 SSE 流式传输；
成功的流式传输开始后发生的失败无法在此处重试。如果所有执行器均失败，则返回最后一次
失败。客户端中止请求时会停止分派。

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

执行器可以在一个响应中发出多个相互独立的调用。存在依赖关系的调用会在后续客户端
工具结果轮次中处理，规划器会审查每个结果。`maxToolRounds` 默认为 `8`，可接受
`1`–`32`；达到上限后，规划器必须生成当前可得的最佳最终回答。规划器的内部决策会被缓冲，
而选定的面向客户端的响应会保留原始流式传输偏好。

### `round-robin` 粘性批处理与账户扩展

轮询采用批处理方式，而非每次请求切换一次：

- `stickyRoundRobinLimit`（依次读取组合配置、`comboStickyRoundRobinLimit`、
  `settings.stickyRoundRobinLimit`，默认值为 **3**）会在轮换前让同一目标连续处理指定次数的
  成功请求。如需每次请求都轮换，请将组合覆盖值设置为 `1`。组合编辑器会显示生效值及其
  来源层级。
- `connectionAwareExpansion`（依次读取组合配置和设置，默认值为 **false**）会在轮换前
  将每个提供者级步骤扩展为按账户划分的目标。在此选项启用前，B 组策略
  （priority、weighted、round-robin、random、p2c、least-used、cost-optimized、lkgp、
  fill-first、strict-random、context-optimized、cache-optimized、context-relay、fusion、
  pipeline）会保持提供者级视图。组合编辑器提供继承 / 开启 / 关闭选项；继承会使用全局
  默认值（关闭）。
- 提示词缓存亲和性路由（`promptCacheAffinityEnabled`，默认值为 **true**）会重新排序
  固定连接，使匹配的缓存键保留在同一账户上。对于按账户固定的步骤，它的优先级高于
  round-robin 和 weighted 轮换。如果需要严格轮换，请在设置 → 组合默认值中将其关闭。
  此选项不支持按组合覆盖。

对于一个模型上的多账户轮换，建议使用**一个动态账户步骤**（`connectionId` 为空，
使用整个账户池）并将粘性限制设为 `1`，而不是使用三个固定的 `connectionId`。
即使 RR 计数器继续递增，固定步骤与亲和性机制的组合仍会使请求集中到同一账户。

## 融合策略

`fusion` 是唯一一种**不会**选择单个目标的策略。它会将提示并行分发给
**面板中的每个模型**，然后由一个可配置的**评审模型**综合所有面板响应，
生成单个最终答案。该策略移植自上游 `decolua/9router`
（OpenRouter 的 Fusion 设计）；实现在 `open-sse/services/fusion.ts` 中。

工作原理：

0. **携带工具时绕过** — 如果请求携带非空 `tools` 数组，且
   `tool_choice` 未被显式设为 `"none"`，则完全跳过面板：请求会直接路由到
   单个模型（配置的评审模型，或 `panel[0]`），并原样传递 `tools`/`tool_choice`。
   面板成员无权使用工具，而评审模型的综合指令也不鼓励生成工具调用，因此
   智能体式/工具调用客户端将获得真实的工具调用决策，而不是综合生成的文本 (#6771)。
1. **扇出**（仅限不携带工具的请求）— 提示会同时发送给面板中的每个
   模型，并强制使用非流式模式且移除工具（评审模型需要完整文本才能进行
   综合）。
2. **法定数量与宽限期收集** — 一旦收到 `minPanel` 个答案，就会为尚未响应的模型
   启动一个较短的宽限计时器；计时结束后，融合将使用已收集到的所有答案继续进行。
   这限制了最慢模型对总耗时的影响，同时受硬超时限制。
3. **评审综合** — 面板答案会被匿名化（`Source 1`、`Source 2`、……，使
   评审模型依据内容实质而非模型品牌进行权衡），然后交给评审模型。评审模型会分析
   共识、矛盾、覆盖不完整之处、独到见解和盲点，最后生成**一个**
   权威答案。评审调用会保留客户端原始的 `stream` 标志和工具，因此仍然支持
   流式传输及下游工具使用。
4. **优雅降级** — 0 个面板答案 → `503`；恰好有 1 个成功响应 → 直接返回该答案
   （无需融合）；仅包含单个模型的面板也会直接作答。

面板成员也可以是引用另一个组合的 `combo-ref` 步骤（`{kind: "combo-ref", comboName: "..."}`）
——它会被解析为**一个黑盒面板声音**（对所引用组合执行一次完整的递归调度，而不是将该组合
自身的目标扇出），并使用其他所有消费 combo-ref 的策略已有的相同深度/循环保护
机制 (#6764)。

### 配置

在组合的 `config` 数据块中配置（无需迁移架构——它复用现有的
`combos` 表）：

| 字段                                     | 类型     | 默认值         | 用途                                                               |
| :--------------------------------------- | :------- | :------------- | :----------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | 第一个面板模型 | 用于综合生成最终答案的模型                                         |
| `config.fusionTuning.minPanel`           | `number` | `2`            | 启动宽限计时器前所需的成功答案数（限制在 `[2, panelSize]` 范围内） |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`         | 达到法定数量后等待滞后模型的时长                                   |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`        | 绝对时间上限，防止单个挂起的模型阻塞请求                           |

默认值定义在 `FUSION_DEFAULTS`（`open-sse/services/fusion.ts`）中。

### 示例

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

然后像调用其他组合一样调用它：`{"model":"fusion-panel","messages":[...]}`。

## 虚拟 Auto-Combo 工厂

Auto Combo 引擎不需要预定义组合。相反，`open-sse/services/autoCombo/virtualFactory.ts` 会动态构建候选项：

1. 获取 `getProviderConnections({ isActive: true })`（所有已启用的连接）
2. 筛选出凭据有效的连接（API 密钥，或通过 `hasUsableOAuthToken()` 验证的未过期 OAuth 令牌）
3. 与 `getProviderRegistry()` 交叉引用，以获取模型可用性和定价
4. 针对每个元组 `(provider, model, connection)` 构建一个 `VirtualAutoComboCandidate`
5. 选择 `connection.defaultModel`（或注册表中的第一个模型）作为分发目标
6. 使用 16 因子的 `scorePool()` 和变体的权重包为每个候选项评分
7. 返回生成的内存中 `AutoComboConfig`，供 `handleComboChat()` 使用——永远不会持久化到数据库

这意味着，**添加启用了 `auto/*` 的新提供者时，候选池会自动扩展**——无需手动编辑组合。虚拟组合会针对每个请求重新构建，因此新添加或刚恢复健康的连接能够立即被选中。

## 自愈

- **临时排除**：分数 < 0.2 → 排除 5 分钟（渐进式退避，最长 30 分钟）
- **感知熔断器状态**：OPEN → 自动排除；HALF_OPEN → 发送探测请求
- **事件模式**：超过 50% 为 OPEN → 禁用探索，最大化稳定性
- **冷却恢复**：排除结束后，第一个请求将作为使用较短超时时间的“探测”请求

## 多臂老虎机探索

5% 的请求（可配置）会随机路由到提供者以进行探索。事件模式下会禁用此功能。

## API

**不存在专用的 `POST /api/combos/auto` 端点**——Auto-Combo 通过两种方式使用：

1. **零配置（推荐）：** 发送任意聊天补全请求，并将 `model` 设置为 `"auto"` 或 `"auto/<variant>"`。虚拟工厂会为每个请求构建组合——无需持久化，也无需调用 API。

2. **使用 `strategy: "auto"` 的持久化组合：** 通过 `POST /api/combos` 创建常规组合，并设置 `strategy: "auto"`，以及 `config.auto.weights` / `config.auto.candidatePool`。它使用相同的评分引擎；组合会存储在 `combos` 中，并可通过 ID 重复使用。

对于发现功能，`GET /api/combos/auto` 会列出每个变体及其解析后的候选池，以及 `context_length` / `max_output_tokens`——即候选池窗口中的最大值。客户端（例如 opencode 插件）必须公布这些值，而不是 `0`：上下文为零会完全禁用 opencode 的自动压缩，导致会话持续增长，直到网关的历史记录清除机制破坏上下文。公布最大值是安全的，因为 Auto-Combo 上下文预过滤器会将超大请求路由到具有大窗口的候选项。

```bash
# 零配置用法（无需创建组合）
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# 通过常规组合端点创建持久化自动组合
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### 自动路由策略

持久化的 `strategy: "auto"` 组合可将 `config.routerStrategy`（或旧版
`config.auto.routerStrategy`）设置为以下值之一：

- `rules` — 默认的加权评分
- `score` — 选择配置的加权分数最高者。分数完全相同时，保持配置的
  候选项顺序；现有的 `explorationRate` 会从完整的排序池中采样。
- `cost` / `eco` — 最便宜的健康提供者
- `latency` / `fast` — 具有可靠性惩罚的最低 p95 延迟
- `sla-aware` / `sla` — 优先选择满足 p95 延迟、错误率及可选
  成本 SLO 的候选项
- `lkgp` — 优先使用最后一个已知良好的提供者
- `nadir` — 询问 [Nadir](https://getnadir.com) 的决策 API，确定池中的哪个模型是
  提示所需的模型；需选择启用，失败时开放回退至 `rules`

### 路由策略详解

Auto-Combo 引擎提供了 7 种可插拔的 **RouterStrategy** 实现，
你可以通过 `config.routerStrategy`（或旧版 `config.auto.routerStrategy`）进行切换。
每种策略都会根据 `RoutingContext`
（任务类型、工具/视觉提示、令牌估算值、可选的 SLA 策略、可选的
最后一个已知良好提供者）从候选池中选出一个提供者。

#### 1. `rules`（默认）— 16 因子加权评分

封装现有的评分引擎。先过滤掉断路器状态为 `OPEN` 的
候选项，然后使用当前任务类型和 `getTaskFitness()` 运行 `scorePool()`，
选择得分最高的提供者。

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**适用场景**：默认策略。适用于希望在所有信号之间取得平衡权衡的情况。

**别名**：`rules`（无别名）

---

#### 2. `cost` / `eco` — 最便宜的健康提供者

按 `costPer1MTokens`（升序）对候选池进行排序，并选择最便宜的提供者。
会先过滤掉状态为 `OPEN` 的候选项。

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**适用场景**：成本敏感型工作负载、批处理或后台作业。

**别名**：`cost`、`eco`

---

#### 3. `latency` / `fast` — 具有可靠性惩罚的最低 p95 延迟

按 `p95LatencyMs + (errorRate * 1000)` 排序。错误率惩罚可确保
不可靠的提供者即使名义延迟较低，也会获得较低的排名。

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**适用场景**：对延迟敏感的工作负载，例如实时聊天、自动补全或
交互式编码助手。

**别名**：`latency`、`fast`

---

#### 4. `sla-aware` / `sla` — 延迟/错误/成本 SLO 合规性

根据每个候选项满足所配置 SLO 策略的程度进行评分：

| 因素       | 权重 | 公式                                              |
| ---------- | ---- | ------------------------------------------------- |
| 延迟得分   | 35%  | `threshold / max(value, ε)`                       |
| 错误得分   | 35%  | `threshold / max(value, ε)`                       |
| 健康度得分 | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| 成本得分   | 10%  | `threshold / max(value, ε)` 或反向归一化          |
| 稳定性得分 | 5%   | 延迟标准差的反向归一化值                          |

当 `hardConstraints: true` 时，候选项首先按**违规得分**
（超出任意 SLO 的程度）排序，然后按综合得分排序。否则仅按
综合得分排序。

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description = "选择最有可能满足延迟、错误率和成本 SLO 的提供者";

  select(pool, context) {
    // ... 根据策略为每个候选项评分：{ targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA 字段**（在组合配置中设置）：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**适用场景**：具有严格延迟、错误率或成本预算的生产工作负载。

**别名**：`sla-aware`、`sla`

---

#### 5. `lkgp` — 优先使用最后一个已知良好的提供者

首先尝试**最后一个已知良好的提供者**（如果已设置），然后回退到
`rules` 策略。适用于会话粘性——由同一个提供者处理
对话中的后续请求。

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "优先尝试最后一个已知良好的提供者，然后回退到 rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // 回退到 rules 策略
    return getStrategy("rules").select(pool, context);
  }
}
```

**适用场景**：希望由同一提供者处理后续请求的多轮对话
（例如为了缓存、上下文连续性或定价一致性）。

**别名**：`lkgp`（无其他别名）

---

#### 6. `nadir` — 通过 Nadir 感知提示词并选择模型

上述每种策略都根据自身的遥测数据对候选项进行排名；它们均不会读取
请求。`nadir` 会将最后一轮用户消息以及池中的模型 ID 发送到
[Nadir](https://getnadir.com) 的决策 API（`POST /v1/bucket`），并路由到 Nadir
从该选项列表中选择的模型（`simple` → 能够胜任的最便宜模型，`complex` →
前沿模型）。提供该模型服务的连接仍由 `rules` 选择，因此配额、
健康状况和成本仍会决定使用哪个账户。

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` 和 `OMNIROUTE_NADIR_BASE_URL` 是这两个字符串对应的
环境变量回退值。仅在使用自托管 Nadir 时才需要 `baseUrl`（允许以 `/v1` 结尾）。
无密钥调用会进入 Nadir 的匿名层级，该层级按 IP 限制速率。

发送到外部的数据：最后一条用户消息的文本（前 16k 个字符）、候选
模型 ID，以及 `source: "omniroute"` 渠道标签。不包含系统提示词、历史记录、工具或
请求头。

失败行为为故障开放：超时（默认 2000 ms）、非 2xx 响应、主机不可达、
响应格式错误或选择了池外模型时，均会采用 `rules`
的决策，并为原因添加前缀 `NadirStrategy: fallback (…)`。一次调用失败后，
该策略将在 30 秒内跳过网络请求，因此服务中断的代价是每 30 秒发生一次超时，而不是
每个请求都发生一次。仅当 Nadir 实际做出选择时，路由事件才会报告
`strategy: "nadir"`。

**适用场景**：模型池跨越多个模型层级（小型、中型和
前沿模型）的混合难度流量，目标是降低始终使用前沿模型所产生的成本。

**别名**：`nadir`（无其他别名）

---

### 自定义路由器策略

你可以通过公共 API 注册自己的 `RouterStrategy` 实现：

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "我的自定义路由策略";

  select(pool, context) {
    // 在此编写你的路由逻辑
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

然后使用它：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### 路由器策略选择指南

| 使用场景     | 策略        | 原因                           |
| ------------ | ----------- | ------------------------------ |
| 均衡工作负载 | `rules`     | 默认策略——综合考虑所有因素     |
| 最小化成本   | `cost`      | 始终选择最便宜的选项           |
| 最小化延迟   | `latency`   | 选择速度最快且可靠的提供者     |
| 严格的 SLO   | `sla-aware` | 按 p95/错误率/成本阈值筛选     |
| 多轮聊天     | `lkgp`      | 会话粘性                       |
| 混合难度     | `nadir`     | 根据每个提示词选择对应模型层级 |

SLA 感知字段：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## 任务适配度

30 多个模型在 6 种任务类型（`coding`、`review`、`planning`、`analysis`、`debugging`、`documentation`）中进行评分。支持通配符模式（例如，`*-coder` → 较高的编码分数）。

## Auto 变体概述

包括不带变体的 `auto`（默认值），以及 `autoPrefix.ts` 中声明的 6 个 `AutoVariant` 值，共有 **7 个可调用的模型 ID**：

`auto`、`auto/coding`、`auto/fast`、`auto/cheap`、`auto/offline`、`auto/smart`、`auto/lkgp`

（`AutoVariant` 本身枚举了 6 个值；第 7 个选项是“不使用变体”——即不带后缀的 `auto`——由 `parseAutoPrefix()` 处理为 `variant: undefined`。）

## 层级如何适配 Auto-Combo

16 因子评分函数（`open-sse/services/autoCombo/scoring.ts`）将层级归属视为两个信号：`tierPriority`（0.0476）和 `tierAffinity`（0.0476）。有关完整的 `DEFAULT_WEIGHTS` 集合，请参阅上方的规范[评分因子表](#how-it-works-persisted-auto-combos)——每个配置包的覆盖值（ship-fast/cost-saver/quality-first/offline-friendly）列在“每个配置包的权重配置”表中。

仅凭层级**不会**强制优先选择 Tier 1——如果 Tier 1 的延迟表现不佳，或成本与质量的权衡不是最优，则 Tier 2 会胜出。若要强制按层级排序，请使用组合策略 `priority`，并按层级排列提供者。

若要强烈偏向 Tier 1（订阅），请增加 `tierPriority` 的权重：

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

有关层级定义和提供者分类，请参阅 [`docs/guides/TIERS.md`](../guides/TIERS.md)。

## 测试与覆盖范围

### 确定性路由决策矩阵（`npm run test:combo:matrix`）

`tests/integration/combo-matrix/*.test.ts` 通过模拟的上游，在真实组合管线中对全部 19 种
公开策略的路由**决策**进行端到端验证。
覆盖范围包括：

- 全部 19 种 `ROUTING_STRATEGY_VALUES` 策略（ordered、weighted、cost、context、fusion 等）。
- `quota-share`（内部）端到端测试：通过真实的 `selectQuotaShareTarget` 接缝（`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`），验证 DRR 公平性与饱和时降权。
- 覆盖各种目标数量下的 `context-relay` 通用交接行为。

此测试套件在 CI（`test:integration` 作业）中使用 `--test-concurrency=1` 和
`--test-force-exit` 运行，因此具有确定性，且不需要实时凭据。

### 受控的实时冒烟测试（不在 CI 中——使用真实提供者）

| 命令                                   | 功能                                                                        |
| :------------------------------------- | :-------------------------------------------------------------------------- |
| `npm run test:combo:live`              | 使用 `RUN_COMBO_LIVE=1` 进行进程内真实路由；创建实时 OmniRoute 数据库的快照 |
| `npm run test:combo:live:vps`          | 对实时 OmniRoute 服务器发起 HTTP 调用（设置 `COMBO_LIVE_BASE_URL`）         |
| `npm run test:combo:live:vps:failover` | 同上，但包含刻意设计的故障转移场景                                          |

这些冒烟测试会验证真实的线缆路径（组合 → 提供者 → 补全）。它们被有意
排除在 CI 之外，因为需要实时凭据和 VPS 访问权限。

---

## 文件

| 文件                                                      | 用途                                                                         |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 因子评分函数、`DEFAULT_WEIGHTS`、池归一化                                 |
| `open-sse/services/autoCombo/taskFitness.ts`              | 模型 × 任务适配度查找                                                        |
| `open-sse/services/autoCombo/engine.ts`                   | 选择逻辑、多臂老虎机、预算上限                                               |
| `open-sse/services/autoCombo/selfHealing.ts`              | 排除、探测、事件模式                                                         |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 种权重配置（快速交付、成本节省、质量优先、离线友好、可靠性优先、混沌模式） |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` 前缀解析器 + 6 种变体                                                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 根据实时连接在内存中构建 `AutoComboConfig`                                   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 用于模拟提供者注册表的测试钩子                                               |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES`（20 种策略）                                       |
| `src/sse/handlers/chat.ts`                                | 集成：auto-prefix 短路逻辑                                                   |
