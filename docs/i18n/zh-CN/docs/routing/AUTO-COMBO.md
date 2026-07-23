---
title: "OmniRoute Auto-Combo Engine"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo 引擎

> **面向用户**：想要快速上手？参见 [Auto-Combo 用户指南](../getting-started/AUTO-COMBO-GUIDE.md)，其中有简明的说明和示例。

> 自适应评分的自管理模型链路 + 零配置自动路由

## 零配置自动路由（`auto/` 前缀）

> **新特性：** 无需创建 Combo。在任何客户端中直接使用 `auto/` 前缀。

### 快速示例

| 模型 ID        | 变体     | 行为                                                                     |
| -------------- | -------- | ------------------------------------------------------------------------ |
| `auto`         | 默认     | 所有已连接服务商，LKGP 策略，均衡权重                                    |
| `auto/coding`  | coding   | 质量优先权重，适合代码生成                                               |
| `auto/fast`    | fast     | 低延迟加权选择                                                           |
| `auto/cheap`   | cheap    | 成本优先路由（最便宜优先）                                               |
| `auto/offline` | offline  | 偏好配额余量最高的服务商                                                 |
| `auto/smart`   | smart    | 质量优先 + 更高探索率（10%）以获得更好的模型发现                         |
| `auto/lkgp`    | lkgp     | 显式 LKGP（与默认 `auto` 相同）                                          |

### 类别 × 层级组合（`auto/<category>:<tier>`）

OpenRouter 风格的后缀将**什么类型的路由**（类别）与**如何优化它**（层级）分开，让你可以自由组合（#4235 Phase B，`open-sse/services/autoCombo/suffixComposition.ts`）：

- **类别**（按能力筛选候选池）：`coding` · `reasoning` · `vision` · `chat` · `multimodal`。`vision`/`multimodal` 保留具备视觉能力的模型；`reasoning` 保留推理/思考模型。
- **层级**（选择评分权重 / 池过滤器）：`fast`（ship-fast）· `cheap`（别名 `floor`，cost-saver）· `reliable`（熔断器健康 + 延迟稳定性）· `free` / `pro`（通过 `classifyTier` 按模型层级筛选池——免费层 vs. 高级层）。

| 示例                    | 解析为                                                 |
| ----------------------- | ------------------------------------------------------ |
| `auto/coding:fast`      | coding 池，低延迟权重                                  |
| `auto/coding:cheap`     | coding 池，成本优先（别名 `auto/coding:floor`）        |
| `auto/reasoning:pro`    | 仅推理/思考模型，高级层                                |
| `auto/vision`           | 具备视觉能力的模型（无层级 → 均衡权重）                |
| `auto/multimodal:free`  | 具备多模态能力的模型，仅免费层                          |

任何有效的 `auto/<category>[:<tier>]` 都按需解析；精选子集通过 `/v1/models` 和仪表盘宣传（`AUTO_SUFFIX_VARIANTS`，见 `open-sse/services/autoCombo/builtinCatalog.ts`）。过滤策略为**失效开放（fail-open）** ——如果约束条件未匹配到任何已连接的模型，则使用全量池，确保路由永不中断。核心评分器（`combo.ts`）保持不变；类别/层级过滤器在 `buildAutoCandidates` 中应用。

> **实时模型智能：** 当 `ARENA_ELO_SYNC_ENABLED` 开关打开时，自动路由的适配度由实时的 **Arena ELO** 排名 + **models.dev** 层级数据驱动（否则回退到静态适配度映射表）。

**使用方法：**

```bash
# 任何支持 OpenAI 格式的 IDE 或 CLI 工具
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# 在代码/配置中，将 model 设置为：
model: "auto"                 # 均衡默认
model: "auto/coding"          # 代码任务最佳
model: "auto/fast"            # 最快可用
model: "auto/cheap"           # 每 Token 最便宜
```

**执行流程：**

1. OmniRoute 在 `src/sse/handlers/chat.ts` 中检测 `auto/` 前缀
2. 从数据库查询所有**活跃的服务商连接**
3. 过滤出具备有效凭据的（API Key 或 OAuth Token）
4. 确定每个连接的模型（`connection.defaultModel` 或服务商的第一个模型）
5. 在内存中构建**虚拟 Combo**（不存入数据库）
6. 使用所选变体的权重配置 + LKGP 策略进行路由

**核心特性：**

- ✅ **始终在线：** 无需切换、无需创建 Combo、无需任何配置
- ✅ **动态：** 自动反映当前已连接的服务商
- ✅ **会话粘性：** LKGP 确保优先使用上一次成功的服务商
- ✅ **多账号感知：** 每个服务商连接都成为独立的候选
- ✅ **无数据库写入：** 虚拟 Combo 仅存在于请求期间，零持久化开销

**底层机制：**

```txt
Request: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts 检测前缀
   ↓
createVirtualAutoCombo('coding') → 从活跃连接构建候选池
   ↓
handleComboChat（与持久化 Combo 相同的引擎）
   ↓
自动评分为每次请求选择最佳服务商/模型
```

**实现文件：**

| 文件                                                        | 用途                                     |
| ----------------------------------------------------------- | ---------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`                 | 前缀解析器（`parseAutoPrefix`）          |
| `open-sse/services/autoCombo/virtualFactory.ts`             | 创建虚拟 `AutoComboConfig` 对象          |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts`   | 模拟服务商注册表的测试 hook               |
| `src/sse/handlers/chat.ts`                                  | 集成：auto 前缀短路                      |
| `src/shared/constants/providers.ts`                         | `SYSTEM_PROVIDERS.auto` 系统条目          |

## 工作原理（持久化 Auto-Combo）

Auto-Combo 引擎使用**12 因子评分函数**（定义在 `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`）为每次请求动态选择最佳服务商/模型。所有权重之和为 **1.0**。

![Auto-Combo 12-factor scoring](../diagrams/exported/auto-combo-12factor.svg)

> 来源：[diagrams/auto-combo-12factor.mmd](../diagrams/auto-combo-12factor.mmd)（通过 `npm run docs:render-diagrams` 重新生成）。

| 因子                    | 默认权重 | 描述                                                                                           |
| :---------------------- | :------- | :--------------------------------------------------------------------------------------------- |
| `health`                | 0.20     | 来自熔断器的健康评分（CLOSED=1.0，HALF_OPEN=0.5，OPEN=0.0）                                     |
| `quota`                 | 0.15     | 剩余配额 / 速率限制余量 [0..1]                                                                  |
| `costInv`               | 0.15     | 反向**混合**成本（60% 输入 + 40% 输出 Token 价格，归一化）——越便宜得分越高                      |
| `latencyInv`            | 0.12     | 反向 p95 延迟，按池归一化——越快得分越高                                                         |
| `taskFit`               | 0.08     | 任务类型适配度（coding、review、planning、analysis、debugging、docs）                           |
| `stability`             | 0.05     | 基于方差的稳定性（低延迟标准差 / 错误率）                                                        |
| `tierPriority`          | 0.05     | 账号层级优先级——Ultra=1.0，Pro=0.67，Standard=0.33，Free=0.0                                    |
| `tierAffinity`          | 0.05     | 候选层级与清单推荐层级之间的亲和度                                                               |
| `specificityMatch`      | 0.05     | 请求特异性（清单提示）与模型层级之间的匹配度                                                    |
| `contextAffinity`       | 0.05     | 请求上下文窗口需求与模型上下文窗口之间的亲和度                                                  |
| `connectionDensity`     | 0.05     | 将负载分散到同一服务商的不同连接上（反集中）                                                    |
| `resetWindowAffinity`   | 0.00     | 偏向配额重置窗口有利的连接（默认禁用）                                                          |

**总和：** `0.20 + 0.15 + 0.15 + 0.12 + 0.08 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.00 = 1.0`（由 `validateWeights()` 校验）。

## 模式包

`open-sse/services/autoCombo/modePacks.ts` 中定义了四种预置的权重配置文件。每种模式包覆盖默认权重，以将选择偏向特定目标。以下是**每种模式包的完整权重表**（每行之和为 1.0）。

| 因子           | ship-fast | cost-saver | quality-first | offline-friendly |
| :------------- | :-------- | :--------- | :------------ | :--------------- |
| quota          | 0.14      | 0.14       | 0.10          | **0.37**         |
| health         | 0.28      | 0.19       | 0.18          | 0.28             |
| costInv        | 0.05      | **0.37**   | 0.05          | 0.10             |
| latencyInv     | **0.32**  | 0.05       | 0.05          | 0.05             |
| taskFit        | 0.10      | 0.10       | **0.37**      | 0.00             |
| stability      | 0.00      | 0.05       | 0.15          | 0.10             |
| tierPriority   | 0.05      | 0.05       | 0.05          | 0.05             |

说明：

- `tierAffinity` 和 `specificityMatch` 不在模式包中设置——`calculateScore()` 在缺席时当作 `?? 0` 处理。
- 每种模式包的核心侧重一览：
  - **ship-fast** → latencyInv 0.32 + health 0.28（低延迟、健康的连接）
  - **cost-saver** → costInv 0.37（最便宜的 Token 获胜）
  - **quality-first** → taskFit 0.37 + stability 0.15（最适合任务的模型，稳定一致）
  - **offline-friendly** → quota 0.37 + health 0.28（最大余量，不论速度/成本）

## 全部路由策略

OmniRoute 的 Combo 引擎支持 **17 种路由策略**（声明在 `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`）。Auto Combo 引擎本身以 `auto` 策略对外暴露；其余策略供持久化 Combo 使用。

| 策略                  | 描述                                                                                       |
| :-------------------- | :----------------------------------------------------------------------------------------- |
| `priority`            | 带显式优先级的首个目标顺序列表                                                              |
| `weighted`            | 按每目标权重的加权随机                                                                     |
| `round-robin`         | 按顺序轮流遍历目标                                                                         |
| `context-relay`       | 跨目标交接上下文（长对话）                                                                  |
| `fill-first`          | 填满每个目标的配额后再移到下一个                                                            |
| `p2c`                 | Power-of-2-choices 随机负载均衡                                                             |
| `random`              | 均匀随机选择                                                                               |
| `least-used`          | 选择当前负载最低的目标                                                                     |
| `cost-optimized`      | 根据目录定价最小化每次请求的 $                                                              |
| `reset-aware` ⭐      | 按配额重置时间优先——较短的重置窗口排名更高                                                  |
| `reset-window`        | 偏好配额窗口最快重置的目标                                                                  |
| `headroom`            | 选择剩余配额余量最多的目标                                                                  |
| `strict-random`       | 无去重重复的随机选择                                                                        |
| `auto`                | 使用 Auto Combo 评分（9 因子）——**推荐**                                                    |
| `lkgp`                | 上一次成功路径（粘性路由到上次成功的目标）                                                  |
| `context-optimized`   | 选择最适合当前上下文大小的目标                                                              |
| `fusion` 🧬           | 并行扩散到一组评审团模型，然后通过裁判模型合成一个答案（见下文）                              |

⭐ = v3.8.0 新增 · 🧬 = v3.8.36 新增

## Fusion 策略

`fusion` 是唯一**不**选择单个目标的策略。它将提示**并行扩散给每个评审团模型**，然后由可配置的**裁判模型**从所有评审团响应中合成为一个最终答案。从上游 `decolua/9router`（OpenRouter 的 Fusion 设计）移植；实现在 `open-sse/services/fusion.ts`。

工作方式：

1. **扩散**——提示同时发送给每个评审团模型，强制非流式，且剥离工具（裁判模型需要完整的文本来合成）。
2. **法定-宽限收集**——一旦 `minPanel` 个答案到达，启动短暂的宽限计时器等待落后者，然后以收集到的内容进行融合。这为最慢的模型设置了对墙上时间的惩罚上限，并受硬超时限制。
3. **裁判合成**——评审团答案被匿名化（`Source 1`、`Source 2`、……——这样裁判看重的是内容质量而非模型品牌），提交给裁判模型，由它分析共识/矛盾/部分覆盖/独特洞察/盲点，然后撰写**一个**权威答案。裁判调用保留客户端的原始 `stream` 标志 + 工具，因此流式传输和下游工具使用仍然有效。
4. **优雅降级**——0 个评审团答案 → `503`；恰好 1 个幸存者 → 直接返回该答案（无物可融合）；单模型评审团直接回答。

### 配置

在 Combo 的 `config` blob 上配置（无需 Schema 迁移——复用现有的 `combos` 表）：

| 字段                                      | 类型     | 默认值             | 用途                                                                              |
| :---------------------------------------- | :------- | :----------------- | :-------------------------------------------------------------------------------- |
| `config.judgeModel`                       | `string` | 第一个评审团模型   | 合成最终答案的模型                                                                |
| `config.fusionTuning.minPanel`            | `number` | `2`                | 宽限计时器启动前需要的成功答案数（限制在 `[2, panelSize]` 范围内）                |
| `config.fusionTuning.stragglerGraceMs`    | `number` | `8000`             | 达到法定人数后等待落后者的时长                                                    |
| `config.fusionTuning.panelHardTimeoutMs`  | `number` | `90000`            | 绝对上限，防止一个挂起的模型阻塞整个请求                                          |

默认值见 `FUSION_DEFAULTS`（`open-sse/services/fusion.ts`）。

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

然后像任何 Combo 一样调用：`{"model":"fusion-panel","messages":[...]}`。

## 虚拟 Auto-Combo 工厂

Auto Combo 引擎不需要预定义的 Combo。相反，`open-sse/services/autoCombo/virtualFactory.ts` 动态构建候选：

1. 拉取 `getProviderConnections({ isActive: true })`（所有已启用的连接）
2. 过滤出具备有效凭据的（API Key 或未过期的 OAuth Token，通过 `hasUsableOAuthToken()`）
3. 与 `getProviderRegistry()` 交叉引用以获取模型可用性 + 定价
4. 为每个 `(provider, model, connection)` 元组建构 `VirtualAutoComboCandidate`
5. 选取 `connection.defaultModel`（或注册表中的第一个模型）作为调度目标
6. 使用 9 因子 `scorePool()` 和变体的权重包对每个候选评分
7. 将生成的仅内存 `AutoComboConfig` 返回给 `handleComboChat()`——从不持久化到数据库

这意味着**添加一个启用 `auto/*` 的新服务商会自动扩展候选池**——无需手动修改 Combo。虚拟 Combo 按请求重建，因此新增或新恢复健康的连接会立即被识别。

## 自愈

- **临时排除：** 评分 < 0.2 → 排除 5 分钟（渐进退避，最长 30 分钟）
- **熔断器感知：** OPEN → 自动排除；HALF_OPEN → 探测请求
- **事故模式：** >50% OPEN → 禁用探索，最大化稳定性
- **冷却恢复：** 排除后，第一个请求作为"探测"，缩短超时

## Bandit 探索

5% 的请求（可配置）路由到随机服务商进行探索。事故模式下禁用。

## API

**没有专用的 `POST /api/combos/auto` 端点**——Auto-Combo 通过两种方式消费：

1. **零配置（推荐）：** 发送任何带 `model: "auto"` 或 `model: "auto/<variant>"` 的聊天补全请求。虚拟工厂按请求构建 Combo——无需持久化，无需 API 调用。

2. **使用 `strategy: "auto"` 的持久化 Combo：** 通过 `POST /api/combos` 创建常规 Combo，设置 `strategy: "auto"` 加上 `config.auto.weights` / `config.auto.candidatePool`。使用相同的评分引擎；Combo 存入 `combos` 表，按 ID 复用。

对于发现，`GET /api/combos/auto` 列出每个变体及其已解析的候选池，加上 `context_length` / `max_output_tokens`——取候选池窗口的 MAX 值。客户端（如 opencode 插件）必须宣传这些值而不是 `0`：上下文为零会完全禁用 opencode 的自动压缩，导致会话持续增长直到网关的历史记录清理销毁上下文。宣传 MAX 值是安全的，因为 auto-combo 上下文预过滤器会将超大请求路由到大窗口候选。

```bash
# 零配置用法（无需创建 Combo）
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# 通过常规 Combo 端点创建持久化 Auto Combo
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto Router 策略

持久化的 `strategy: "auto"` Combo 可以设置 `config.routerStrategy`（或旧版 `config.auto.routerStrategy`）为以下之一：

- `rules` — 默认加权评分
- `cost` / `eco` — 选择最便宜的健康服务商
- `latency` / `fast` — 选择最低 p95 延迟且带可靠性惩罚的服务商
- `sla-aware` / `sla` — 偏好满足 p95 延迟、错误率和可选的成本 SLO 的候选
- `lkgp` — 优先使用上一次成功路径的服务商

### Router 策略详解

Auto-Combo 引擎暴露了 5 个可插拔的 **RouterStrategy** 实现，可通过 `config.routerStrategy`（或旧版 `config.auto.routerStrategy`）切换。每个策略从候选池中选取一个服务商，依据 `RoutingContext`（任务类型、工具/视觉提示、Token 估算、可选的 SLA 策略、可选的上次成功路径服务商）。

#### 1. `rules`（默认）— 6 因子加权评分

封装现有的评分引擎。过滤掉 `OPEN` 熔断器候选，然后使用当前任务类型和 `getTaskFitness()` 运行 `scorePool()`，选择得分最高的服务商。

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description =
    "6-factor weighted scoring: quota, health, cost, latency, taskFit, stability";

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

**适用场景**：默认。在所有信号之间寻求均衡权衡。

**别名**：`rules`（无别名）

---

#### 2. `cost` / `eco` — 选择最便宜的健康服务商

按 `costPer1MTokens`（升序）排序候选池，选择最便宜的。先过滤掉 `OPEN` 候选。

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

**适用场景**：成本敏感的工作负载、批量处理或后台任务。

**别名**：`cost`、`eco`

---

#### 3. `latency` / `fast` — 最低 p95 延迟，带可靠性惩罚

按 `p95LatencyMs + (errorRate * 1000)` 排序。错误率惩罚确保即使名义延迟低的不可靠服务商排名也更靠后。

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

**适用场景**：延迟敏感的工作负载，如实时聊天、自动补全或交互式编程助手。

**别名**：`latency`、`fast`

---

#### 4. `sla-aware` / `sla` — 延迟/错误/成本 SLO 合规

按候选满足已配置 SLO 策略的程度评分：

| 因子              | 权重 | 公式                                              |
| ----------------- | ---- | ------------------------------------------------- |
| 延迟评分          | 35%  | `threshold / max(value, ε)`                       |
| 错误评分          | 35%  | `threshold / max(value, ε)`                       |
| 健康评分          | 15%  | `1.0`（CLOSED）/ `0.5`（HALF_OPEN）/ `0.0`（OPEN） |
| 成本评分          | 10%  | `threshold / max(value, ε)` 或反向归一化          |
| 稳定性评分        | 5%   | 反向归一化延迟标准差                              |

当 `hardConstraints: true` 时，候选主要按**违规评分**（超出任何 SLO 的程度）排序，然后按综合评分。否则仅按综合评分。

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... 针对策略对每个候选评分：{ targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA 字段**（在 Combo 配置上设置）：

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

**适用场景**：对延迟、错误率或成本预算有严格要求的线上工作负载。

**别名**：`sla-aware`、`sla`

---

#### 5. `lkgp` — 首先使用上一次成功路径的服务商

首先尝试**上一次成功路径的服务商**（如果设置），然后回退到 `rules` 策略。适用于会话粘性——同一服务商处理同一对话中的后续请求。

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

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

**适用场景**：希望同一服务商处理后续请求的多轮对话（例如为了缓存、上下文连续性或定价一致性）。

**别名**：`lkgp`（无别名）

---

### 自定义 Router 策略

你可以通过公共 API 注册自己的 `RouterStrategy` 实现：

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // 你的路由逻辑
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

### Router 策略选择指南

| 使用场景     | 策略        | 原因                               |
| ------------ | ----------- | ---------------------------------- |
| 均衡工作负载 | `rules`     | 默认——考虑所有因素               |
| 最小化成本   | `cost`      | 始终选择最便宜的                   |
| 最小化延迟   | `latency`   | 选择最快且可靠的服务商             |
| 严格 SLO     | `sla-aware` | 按 p95/错误/成本阈值过滤          |
| 多轮聊天     | `lkgp`      | 会话粘性                           |

SLA-aware 字段：

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

30+ 个模型在 6 种任务类型（`coding`、`review`、`planning`、`analysis`、`debugging`、`documentation`）中评分。支持通配符模式（例如 `*-coder` → 高 coding 评分）。

## Auto 变体总览

包括裸 `auto`（默认）加上 `autoPrefix.ts` 中声明的 6 个 `AutoVariant` 值，共有 **7 个可调用的模型 ID**：

`auto`、`auto/coding`、`auto/fast`、`auto/cheap`、`auto/offline`、`auto/smart`、`auto/lkgp`

（`AutoVariant` 本身枚举 6 个值；第 7 个选项是"无变体"——裸 `auto`——由 `parseAutoPrefix()` 处理为 `variant: undefined`。）

## 层级如何融入 Auto-Combo

12 因子评分函数（`open-sse/services/autoCombo/scoring.ts`）将层级归属作为两个信号：`tierPriority`（0.05）和 `tierAffinity`（0.05）。完整 `DEFAULT_WEIGHTS` 集合见上文[规范评分因子表](#工作原理持久化-auto-combo)——各模式包的覆盖（ship-fast/cost-saver/quality-first/offline-friendly）列在"每种模式包的权重"表中。

仅凭层级**不**强制 Tier 1 优先——如果 Tier 1 延迟不佳或成本性价比不理想，Tier 2 胜出。要强制按层级排序，使用 Combo 策略 `priority` 并按层级排列服务商。

要强烈偏向 Tier 1（订阅层），增大 `tierPriority` 权重：

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

层级定义和服务商分类参见 `docs/marketing/TIERS.md`。

## 测试与覆盖率

### 确定性路由决策矩阵（`npm run test:combo:matrix`）

`tests/integration/combo-matrix/*.test.ts` 通过完整的 Combo 管线以端到端方式（使用模拟上游）验证了全部 17 种公开策略的路由**决策**。覆盖范围包括：

- 全部 17 种 `ROUTING_STRATEGY_VALUES` 策略（ordered、weighted、cost、context、fusion 等）。
- `quota-share`（内部）端到端：通过真实的 `selectQuotaShareTarget` 接缝（`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`）验证 DRR 公平性 + 饱和降优。
- `context-relay` 在所有目标数量上通用的跨上下文交换覆盖。

该测试套件在 CI 中运行（`test:integration` 任务），使用 `--test-concurrency=1` 和 `--test-force-exit`，因此是确定性的且不需要真实凭据。

### 有人值守的实时冒烟测试（非 CI —— 真实服务商）

| 命令                                    | 功能                                                                             |
| :-------------------------------------- | :------------------------------------------------------------------------------- |
| `npm run test:combo:live`               | 进程内真实路由，`RUN_COMBO_LIVE=1`；对活跃的 OmniRoute 数据库做快照               |
| `npm run test:combo:live:vps`           | 针对活跃的 OmniRoute 服务器进行 HTTP 调用（设置 `COMBO_LIVE_BASE_URL`）            |
| `npm run test:combo:live:vps:failover`  | 同上，包含预定的容灾方案场景                                                      |

这些冒烟测试演练了真实的网络路径（Combo → 服务商 → 补全）。它们被特地从 CI 中排除，因为需要真实凭据和 VPS 访问。

---

## 文件

| 文件                                                        | 用途                                                                      |
| :---------------------------------------------------------- | :------------------------------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`                    | 9 因子评分函数、`DEFAULT_WEIGHTS`、池归一化                                |
| `open-sse/services/autoCombo/taskFitness.ts`                | 模型 × 任务适配度查找                                                       |
| `open-sse/services/autoCombo/engine.ts`                     | 选择逻辑、bandit、预算上限                                                   |
| `open-sse/services/autoCombo/selfHealing.ts`                | 排除、探测、事故模式                                                        |
| `open-sse/services/autoCombo/modePacks.ts`                  | 4 种权重配置（ship-fast、cost-saver、quality-first、offline-friendly）      |
| `open-sse/services/autoCombo/autoPrefix.ts`                 | `auto/` 前缀解析器 + 6 种变体                                                |
| `open-sse/services/autoCombo/virtualFactory.ts`             | 从活跃连接构建仅内存的 `AutoComboConfig`                                     |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts`   | 模拟服务商注册表的测试 hook                                                 |
| `src/shared/constants/routingStrategies.ts`                 | `ROUTING_STRATEGY_VALUES`（17 种策略）                                      |
| `src/sse/handlers/chat.ts`                                  | 集成：auto 前缀短路                                                         |
