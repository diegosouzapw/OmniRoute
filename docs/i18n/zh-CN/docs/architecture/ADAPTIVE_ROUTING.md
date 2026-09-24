# Adaptive Routing: Routing Events, Quality Feedback & Explainability (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

本文档介绍了为 OmniRoute 新增的反馈驱动型自适应路由基础。其设计刻意保持精简：引入类型化的路由结果通道、用于现有自动组合评分器的在线质量信号、可选的 OpenTelemetry 导出器，以及可解释性端点。它**不会**取代现有的韧性技术栈（断路器、连接冷却、模型锁定、健康矩阵、自动驾驶）——而是对其进行补充。

## 1. 架构上下文

OmniRoute 是一个数据平面，包含**请求热路径**和**控制/智能平面**。热路径必须保持快速、内存高效、异步、具备韧性且行为可预测。评估、质量评分、实验和历史分析则属于控制平面。

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   数据平面（快速、同步、内存中）
│  路由 / 故障转移    │
│  健康检查 / 防护机制│
│  缓存 / 流式传输    │
└──────────┬──────────┘
           │ RoutingEvent（触发即忘，约 0.2µs）
           ▼
┌─────────────────────┐
│  反馈接收器         │   控制平面（异步、尽力而为）
│  质量跟踪器         │
│  OTel 导出器        │
│  解释存储           │
└──────────┬──────────┘
           ▼  质量评分
      自动组合评分器
```

### 已有内容（已审计，未重复实现）

| 概念                     | 现有实现                                                                     |
| ------------------------ | ---------------------------------------------------------------------------- |
| 可用性（能否发送流量？） | 断路器（CLOSED/DEGRADED/OPEN/HALF_OPEN，持久化至数据库）、连接冷却、模型锁定 |
| 健康状态报告             | `providerHealthMatrix.ts`、`providerHealthAutopilot.ts`                      |
| 影子流量                 | `open-sse/services/combo/shadowRouting.ts`                                   |
| 防护机制                 | `src/lib/guardrails/`（前置/后置钩子）                                       |
| 精确缓存                 | `src/lib/semanticCache.ts`（基于签名）                                       |
| 评估器 / 评估驱动路由    | `src/lib/evals/`、`open-sse/services/evalRouting.ts`                         |
| 组合决策可解释性         | `open-sse/services/combo/decisionTrace.ts`                                   |
| 仪表板实时事件           | `src/lib/events/eventBus.ts`（UI 通知通道、`unknown` 载荷、100 条历史记录）  |

路由事件层**不是**对 `eventBus` 的重新实现：该总线是仪表板的实时通知通道（类型化的_事件名称_、不透明载荷、UI 消费者）。`RoutingEvent` 是一个类型化的_结果_结构体（延迟/token/成本/结果/结束原因），由控制平面的反馈接收器（质量跟踪器、OTel 导出器、解释存储）消费。

### 缺失内容（本次新增）

1. **类型化的路由结果事件 + 接收器抽象**（`RoutingEvent` /
   `RoutingEventSink`）。`decisionTrace` 仅限于组合范围且仅存在于内存中；
   `comboMetrics` 是累积计数器；`call_logs` 是原始异步持久化数据。
   这些都不是基于接收器的类型化结果通道，无法供质量跟踪器、OTel
   导出器或 Future-AGI 风格的评估器订阅。
2. 用于输出质量的**在线质量信号**（EWMA）——此前评分器仅通过静态任务适配度和显式启用的评估通过率来间接表示“质量”。
3. 使用 GenAI 语义约定的**可选、无依赖 OTel 导出器**。
4. 返回实际路由决策和质量状态的**可解释性端点**。

## 2. 路由事件（反馈基础）

文件：`open-sse/services/routing/events.ts`、`.../index.ts`

`RoutingEvent` 仅携带路由元数据：

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // 白名单联合类型
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` 是 TypeScript 中类似 `Send+Sync` 的 trait：

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // 必须为 O(1)，不得执行同步 I/O
}
```

热路径会在每个请求完成时调用一次 `emitRoutingEvent(event)`
（包括流式完成回调、非流式成功路径，以及 `handleChatCore` 中响应格式错误的 200 失败路径）。分发采用同步扇出方式，将事件发送到已注册的接收器，但每个接收器仅执行入队或更新内存状态。**热路径上不得执行同步数据库写入，也不得执行网络 I/O。**

默认接收器：

- `MemoryRoutingEventStore` — 有界（500）环形缓冲区，按最新优先排序，供
  explain 端点使用。
- `QualityTracker` 使用方 — 更新 EWMA 质量估计值。
- `OtlpHttpsEventSink` — 可选，仅在设置了 `OMNIROUTE_OTEL_ENDPOINT`
  （或 `OTEL_EXPORTER_OTLP_ENDPOINT`）时启用。

### 测得的开销（如实对比）

在此工作站上运行 `npm run bench:routing-events`（10 万次迭代；由于单次操作的百分位数低于
`performance.now()` 的计时器分辨率，因此亚微秒操作以汇总的 µs/op 衡量）：

| 场景                              | µs/op  | ops/s  |
| --------------------------------- | ------ | ------ |
| 基线（仅评分）                    | ~0.045 | ~22 M  |
| 基线 + RoutingEvent（2 个接收器） | ~0.168 | ~5.9 M |
| 基线 + 事件 + OTel 入队           | ~0.163 | ~6.1 M |
| 并发（8 个交错突发批次）          | ~0.18  | —      |

相对于基线评分，事件分发增加的开销约为 ~0.12 µs/请求；OTel 接收器
仅执行入队（O(1) 缓冲区压入），没有带来可测量的额外开销。这些数字
与机器环境相关，且仅具有相对参考意义，并非生产环境保证。v1 中的「~0.2 µs」
数字是汇总估计值；此方法将评分基线与事件分发成本分开测量。

## 3. 质量信号（反馈驱动的提供者状态）

文件：`open-sse/services/routing/quality.ts`

v2 将**运行质量**与**语义质量**分开：

- **运行质量** — 源自路由热路径（HTTP 4xx/5xx、连接
  失败、429、格式错误的响应、流中断、`finish_reason=length`、
  零输出成功，以及延迟/TTFT EWMA）。不得将 200 视为语义
  质量。
- **语义质量** — 所生成输出的实际价值。仅由评估器通过
  `setSemanticQuality()` 产生。在评估器提供该值之前，它始终为 `null`，
  且绝不会渗入运行质量分数。

每个 (provider, model) 的状态（EWMA + 有界计数器）：

- `successEwma` — 结果是否成功的 EWMA（α=0.2）。
- `latencyEwma` / `ttftEwma` — 延迟的 EWMA（α=0.1）。
- `samples`、`anomalies`、`rateLimited`、`semantic`、`semanticConfidence`。
- `recencyMs` — 距离上次观测到该模型所经过的时间。

### 置信度/样本感知

`confidence = clamp01(samples / 50)`，返回给评分器的分数会向中性中点
混合：

```
score = 0.5 + confidence * (operational - 0.5)
```

结果（已通过测试验证）：

- 冷启动提供者（0 个样本）的分数为 **0.5** — 不会受到不公平惩罚，但
  也无法胜过拥有数千条可靠观测数据的提供者。
- 仅凭 7 次幸运成功的提供者，其分数会被拉向 0.5（绝不会因
  乐观初始化而占据主导地位）。
- 拥有 50 个以上样本的提供者会收敛至其真实运行质量分数。
- 质量下降和恢复均是渐进的（EWMA），一次孤立故障
  不会摧毁一个健康的提供者。

`ProviderQuality` 暴露 `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`。

该信号作为 `quality` 评分因子输入 auto-combo 评分器：

- `open-sse/services/autoCombo/scoring.ts` 中的
  `ScoringFactors.quality` / `ScoringWeights.quality`。
- `DEFAULT_WEIGHTS`：`health` 从 0.1905 → 0.1605，`quality` 为 0.03。总和保持为 1.0。
- `buildAutoCandidates` 使用跟踪器中的数据填充 `candidate.quality`；没有
  数据的候选项默认为中性值 **0.5**（冷启动候选项既不会获得加成，也不会
  受到惩罚）。

闭环：

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo 质量因子
      ↑                                                    │
      └────── 请求结果（handleChatCore）←──────────────────┘
```

### 硬排除与软惩罚

质量信号仅用于**软性自适应偏好**。硬排除仍由
现有韧性机制负责：熔断器处于 OPEN 状态、配额耗尽、
身份验证失败、模型锁定——这些均不受质量分数影响。
质量分数暂时下降的提供者只会降低优先级，绝不会被
硬性禁用。

## 3b. 规范化流式计时（TTFT / ITL）

文件：`open-sse/utils/streamTiming.ts`

`createStreamTiming()` 是流式处理路径的唯一插桩接入点，
已接入 `createSSEStream`（open-sse/utils/stream.ts）：

- `markByte()` — 收到第一个上游数据块。
- `markForward()` — 向客户端转发第一个数据块（用于 TTFT）。
- `markInterrupted()` — 流在正常结束前发生超时/中止/错误。
- `ttft()` = 首个转发的 SSE 数据块的延迟。**这不是令牌级 TTFT** —
  单个 SSE 数据块可能包含零个、一个或多个令牌。文档中对此有精确定义。
- `avgItlMs()` = 数据块间隔的平均值（作为 ITL 的数据块延迟代理指标）。

TTFT/ITL/中断状态会进入 `RoutingEvent`（`ttftMs`、`itlMs`），并由 OTel 接收器导出为 GenAI/OmniRoute span 属性。

## 4. OpenTelemetry / GenAI 可观测性

文件：`open-sse/services/routing/otel.ts`

- 无依赖的 OTLP/HTTP JSON 导出器（使用全局 `fetch`，不使用
  `@opentelemetry/*` SDK）。
- span 遵循 GenAI 语义约定（`gen_ai.provider.name`、
  `gen_ai.request.model`、`gen_ai.usage.input_tokens/output_tokens`、
  `gen_ai.completion.finish_reason`、`gen_ai.system`），并包含 OmniRoute 路由
  属性（结果、状态、TTFT、重试、回退）。
- `record()` 只会将事件加入有界缓冲区（O(1)）；后台定时器通过
  `POST {endpoint}/v1/traces` 异步刷新。在过载情况下，会丢弃最旧的事件
  （通过 `dropped` 计数器统计）— 绝不对数据平面施加背压。
- **除非已配置，否则处于禁用状态。** 必须设置 `OMNIROUTE_OTEL_ENDPOINT`
  （或 `OTEL_EXPORTER_OTLP_ENDPOINT`）；否则不会注册该接收器，也不会运行任何
  OTel 代码。

## 5. 可解释性

- `GET /v1/explain/routing` 返回最近的 `RoutingEvent`（真实决策，最新的在前）
  以及按提供者/模型划分的质量快照。
- 身份验证方式与 `/v1/combos` 一致（Bearer API 密钥或仪表板会话；在
  `REQUIRE_API_KEY=false` 的单用户本地部署中允许匿名访问）。
- 每次调用的组合级追踪仍可通过现有的 `decisionTrace.ts`
  获取（请求头 `X-OmniRoute-Combo-Trace`）。
- 安全性：事件仅携带路由元数据，绝不包含提示词/正文/凭据。

## 6. 评估平面集成（面向 Future AGI）

OmniRoute 将 Future AGI（或任何评估器）视为**潜在的智能/评估后端，而非依赖项**。接入点包括：

- `RoutingEventSink` 可以将事件异步转发给评估器。
- `MemoryRoutingEventStore` + 质量快照为评估器提供原始决策流。
- 未来的 `Evaluator`（确定性评估器、本地判定器、HTTP、WASM）将消费
  事件/追踪并返回 `QualityScore`，该分数会进入相同的
  `getQualityScore`/质量因子路径。
- 现有的评估驱动路由（`open-sse/services/evalRouting.ts`）在启用时已根据
  `eval_runs` 通过率对组合目标重新排序。

请求路径上不会同步运行任何评估，并且在没有评估器的情况下，网关仍可完整运行。

## 7. 最终架构审查

1. **同步热路径上还保留了什么？** 路由/评分、防护规则预检查、缓存查找，
   以及一次向内存接收器进行的 `emitRoutingEvent` 扇出（相较基准评分约增加
   0.12 µs）。
2. **哪些处理已移至异步执行？** OTel 导出（定时器 + fetch）、
   `call_logs`/用量持久化、语义缓存写入；质量状态位于内存中且为 O(1)
   （无需异步）。
3. **路由结果如何转化为反馈？** `handleChatCore` 发出
   `RoutingEvent` → `QualityTracker` 更新 EWMA 状态 → `getQualityScore`
   将结果提供给自动组合的 `quality` 因子。
4. **质量如何影响后续路由？** 较低的质量分数会降低相应提供者/模型在
   `scoreAutoTargets` 中的加权分数，因此性能下降的模型会逐渐降低优先级，
   并随着其 EWMA 改善而恢复。
5. **Future AGI 如何在不成为依赖项的情况下集成？** 通过
   `RoutingEventSink` 接口/未来的 `Evaluator` 适配器 — 不存在硬编码依赖。
6. **评估器不可用时会怎样？** 路由不受影响；对于没有观测信号的模型，
   质量分数回退为中性值（1.0）。
7. **遥测不可用时会怎样？** 不会注册 OTel 接收器；路由层的其余部分保持不变。
8. **过载时会怎样？** OTel 缓冲区会丢弃最旧的事件；质量状态和环形缓冲区
   在设计上均为有界；不会产生背压。
9. **提供者状态在性能下降后如何恢复？** 随着成功事件累积，EWMA 会重新收敛；
   预热机制使冷启动模型保持中性；熔断器则通过 HALF_OPEN 探测独立恢复。
10. **哪些提议的功能被有意设定为不实现，为什么？**
    - 影子流量/实验 — 已实现
      （`combo/shadowRouting.ts`）；不重复构建。
    - 防护规则 — 已实现（`src/lib/guardrails/`）；不重复实现。
    - 语义缓存 — 已实现（`src/lib/semanticCache.ts`）；不重复实现。
    - 完整的实验管理平台、数据集工具、提示词优化平台、向量数据库或强制性的
      外部 OTel 基础设施 — 超出精简数据平面的范围。
    - Rust `RoutingEvent` 结构体 — 数据平面使用 TypeScript；TS 类型是适配后的
      等效实现。

## 8. 配置参考

| 变量                          | 默认值      | 作用                                                              |
| ----------------------------- | ----------- | ----------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | 未设置      | 设置后启用 OTLP/HTTP 跟踪导出器（例如 `http://collector:4318`）。 |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | 未设置      | OTLP 端点的备用别名。                                             |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name` 资源属性。                                         |

## 9. 测试

- `tests/unit/routing-events.test.ts` — 事件规范化、状态
  分类、有界环形缓冲区、接收器扇出与隔离。
- `tests/unit/routing-quality.test.ts` — EWMA 预热、失败/成功恢复、
  异常惩罚、429 瞬态处理、快照、重置。
- `tests/unit/routing-scoring-quality.test.ts` — 权重完整性、中性
  默认值、质量因子排名。
- `tests/unit/routing-otel.test.ts` — 启用门控、GenAI span 负载、异步
  刷新、过载时丢弃。
- `tests/unit/routing-events-concurrency.test.ts` — 数千个事件、环形
  缓冲区有界性、抛出异常的接收器隔离、交错异步突发、
  插入期间重置。
- `tests/unit/routing-adaptive-e2e.test.ts` — 通过实际
  `scoreAutoTargets` 评分器实现的确定性端到端循环：健康 → 劣化 → 恢复 → 短暂波动，以及
  冷启动和冷门提供者侥幸成功的场景。
- `tests/unit/stream-timing.test.ts` — TTFT（首个转发的数据块）、ITL、
  首字节与首次转发的对比、中断、格式错误/空数据块的安全处理。

## 10. 既有问题状态（阶段 18）

| 问题                                                | 状态                   | 备注                                                                                                                                                                                            |
| --------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` 导出不匹配                              | **已修复（环境问题）** | `node_modules` 与 `package-lock.json` 不同步（已安装 1.3.1，而锁定版本为 1.4.0）。运行 `npm install omniglyph@1.4.0` 后恢复了锁定版本；类型错误降至 0。清单文件未更改。                         |
| 过时的 `getKnownContextOverflow` 测试               | **已知 — 未修复**      | `combo-context-overflow-compression-probe.test.ts` 导入了一个在 `open-sse/services/combo.ts` 中已不存在的函数（仅注释中仍有引用）。修复需要重新实现该函数或重写这些测试——这属于无关的架构改动。 |
| `combo-runtime-unit-concurrency.test.ts` 数据库隔离 | **已知 — 未修复**      | 直接运行时，测试框架的 SQLite 隔离断言失败；在基础分支上也以相同方式失败。                                                                                                                      |
| i18n `llm.txt` 偏差                                 | **已知 — 未修复**      | `docs/i18n/*/llm.txt` 与根目录中的文件不同；这是既有问题，会阻止文档同步的 pre-commit 检查。                                                                                                    |

环境问题与代码问题保持明确区分；没有通过更改测试过滤器来隐藏
无关的失败。
