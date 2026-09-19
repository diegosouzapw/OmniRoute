# Admission lanes (#9654) — two lane systems, what gates each, where each reports (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute 有**两套**作用域不同的进程本地通道系统。二者相辅相成；运维人员应清楚自己正在查看的是哪一套系统。

## 1. 字节级、进程范围的准入控制（`chatBodyAdmission.ts`）

- **作用域：**适用于 `POST /v1/chat/completions`、`/v1/messages`、`/v1/responses` 及其他聊天形式路由的缓冲请求体/堆内存路径。用于防止大型编码智能体请求体导致堆内存放大（#4380）。
- **每个进程使用一个全局控制器，而不是按密钥划分通道（#10110）。** 每个 API 密钥（经哈希处理）或 `anonymous` 会话都使用**同一个**共享预算进行准入——经过哈希处理的会话 ID 仅用作公平调度键（在等待者之间进行轮询分派），绝不会用作容量分片。本文档之前的版本描述了具有独立容量的按密钥通道；该模型已在 #10110 中移除，因为它会让未经身份验证的伪造凭据成倍扩大进程范围的上限。
- **门控（#503-fanout）：自动推导的摄取字节预算，而非固定的请求数。** 旧版 `CHAT_MAX_HEAVY_IN_FLIGHT` 请求数上限（此修复前默认为 `1`）会将编码智能体的扇出（多个子智能体/CLI，请求体通常 > 256 KB）压缩到约为 1 的有效并发度，从而在完全正常的负载下返回 503。现在，只有运维人员显式设置 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` 时，该上限才会生效。如果未设置，则改为由 `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` 控制准入——该预算根据进程的实际内存上限自动推导（`src/shared/middleware/admissionBudget.ts`）：取 V8 堆上限与任何 cgroup/容器上限中较严格者的 25%，再除以 8 倍的瞬时放大系数，并限制在 8 MiB 到 2 GiB 之间。显式覆盖值也使用相同的限制范围。这样一来，从 512 MB 容器到 32 GB 桌面环境，它都能自动扩缩，无需调整环境变量。无法装入有效预算的请求体会立即以 `413 body_exceeds_budget` 失败；只有各自可处理的请求体之间发生资源争用时，才会进入有界公平队列。实时多信号资源压力跟踪器（V8 堆占用率、cgroup、PSI、OOM 事件——`open-sse/utils/resourcePressurePolicy.ts`）会在 `high` 压力下缩短有界等待时间，并在 `critical` 压力下立即以 `503 resource_pressure` 拒绝请求，此时甚至尚未摄取任何字节。
- **调优：**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — 覆盖自动推导的字节预算
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — 旧版请求数上限，仅在显式启用时生效
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 返回 503 前的队列等待时间（默认值为 2000）
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — 排队字节数的堆内存安全阀（默认值为 4 MB）
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — 自 #10110 起已弃用且不执行任何操作（为保持配置兼容性而接受，但会被忽略）
- **报告：**`GET /api/monitoring/health` → `chatAdmission`（#11244）——包括 #503-fanout 新增的 `inflightBytes`、`maxInflightBytes`、`budgetSource`（`v8_heap` | `cgroup` | `override`）、`pressureSeverity` 和 `countCapEnabled`（在默认部署中为 false——这可确认实际生效的是字节预算，而非旧版请求数上限）。

## 2. 自适应运行时虚拟通道（`open-sse/services/admission`）

- **范围：**用于提供者分发的租户键准入——队列成本、延迟引导的限制自适应、通道排队和通道指标。
- **开关：****选择性启用。**除非设置 `OMNIROUTE_CHAT_VIRTUAL_LANES=true`，否则处于禁用状态。未启用时，自适应控制器会保持共享队列行为（只有操作员启用通道后，才满足 #9654 的标准 1）。
- **调优：**`OMNIROUTE_CHAT_VIRTUAL_LANES` + 自适应配置（`maxQueueCount`、`maxQueueCost`、`defaultMaxWaitMs`，……）。
- **报告：**`GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`、`laneQueuedCount`、`laneQueuedCost`、`laneTenants`（不透明的通道 ID，绝不包含原始键）以及 `virtualLanes`——快照中用于权威指示“通道已启用”的标志。

## 3. 扇出探测——combo/fusion 的逐目标准入（#9654 Wave 2）

Combo（优先级/轮询）和 fusion 会在一个父请求下扇出 N 个模型目标。自 #9654 Wave 2 起，**每个扇出目标在分发前都会接受门控**：通过针对**父请求**租户通道的逐目标探测（`PerTargetAdmissionHook`，由 `createPerTargetAdmissionHook` 构建）来完成。

- **范围：**由 combo、fusion 和 chaos engine 分发的每个扇出目标。系统 1（字节级）不受影响——它从不探测扇出目标。
- **开关：****随系统 2 选择性启用。**未设置 `OMNIROUTE_CHAT_VIRTUAL_LANES` 时为空操作——在该模式下，父请求已经持有共享队列租约，因此探测会造成重复计数并拒绝 combo 目标。
- **语义：**
  - **严格非阻塞——跳过，绝不排队。**`maxWaitMs 0`：通道已满时会跳过目标，改由 combo 的回退机制（或 fusion 的存活面板）提供服务。这是有意为之：扇出目标属于冗余工作，对其排队会给通道旨在阻止的拥塞点叠加更多负载。因此，`defaultMaxWaitMs` **仅**适用于父请求；扇出探测绝不等待，并且有意**不提供任何选项**使其等待（问题历史表明，等待选项会产生 #9654 所防止的大规模 502/504 类问题——只有在操作员报告跳过扇出目标会损害响应质量时，才应重新考虑）。
  - **准入后释放。**获准的探测会立即释放其租约：它是容量门控，而非容量占用。父请求的租约涵盖扇出；额外持有 N 个租约会夸大共享活跃成本并拒绝其他租户。这是尽力而为的机制，而非预留：通道可能会在探测与分发之间重新填满，因此在激烈争用下，门控可能会准许目标进入一个在目标实际分发时又已满的通道。
  - **按实际扇出正文定价。**探测根据目标的实际正文估算成本——包括从其 `stream` 标志派生的请求类别，与父请求路径完全一致——因此，fusion 面板成员（`stream: false`）会按其实际占用的非流式类别定价，而优先级/轮询目标则按用户请求的类别定价。
- **报告：**第一个目标之后发生探测跳过时，会增加 combo 的逐请求 `fallbackCount`（与现有回退语义一致；可在 combo 日志中查看）；当所有面板成员均被跳过时，fusion 返回 503。目前快照中**没有聚合计数器**（例如 `virtualFanoutSkipped`）——如果操作员报告无法判断通道门控跳过扇出目标的频率，这就是添加该计数器的触发条件。

## 仪表板中显示的是哪一个

- `adaptiveAdmission.laneCount` / `laneTenants` → **自适应虚拟通道**（系统 2）。
- `adaptiveAdmission.virtualLanes === true` → 第 3 节的扇出探测也处于活动状态。若负载中缺少 `virtualLanes` 或其值为 `false`，则表示未设置 `OMNIROUTE_CHAT_VIRTUAL_LANES`——字节级通道（系统 1）仍处于活动状态，但在启用该设置之前，`adaptiveAdmission` 下的功能（以及扇出准入限制）均不会生效。

## 两者为何同时存在

字节级通道限制内存密集型解析/压缩路径；自适应通道则限制每个租户的分发成本。#9654 的标准 1（“一个会话的突发流量不会导致另一个会话收到 503”）始终由系统 1 强制保证，并在选择启用系统 2 后由系统 2 进一步保证。

## 4. 单进程长时 `/v1/responses`（健康余量）

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) 添加了 `tryAcquireHealthyHeadroom`，以便在堆内存低于 `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` 时，允许第二个结构复杂的请求进入。`admitChatRequest` 使用的 BYTE 路径（请求体 ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`，默认为 256 KiB，包括 `POST /v1/responses`）使用**相同的**宽限机制。

这是支持在**单进程**中运行两个以上并发长时 SSE `/v1/responses` 的方案：仅在堆内存和进程级在途字节预算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）允许的范围内，提高主要准入额度和健康余量。能否支持数十个长时 SSE 客户端（40–50 个）取决于该内存预算，而不是产品存在硬性的“最多 2 个”限制。堆内存面临压力时，系统仍会通过可重试的 `503` 进行卸载，从而避免 #7849 的问题再次出现。

若要**成倍增加可用堆内存**，请运行 N 个使用独立 `DATA_DIR` 的实例（#11024）。切勿在同一个 SQLite 文件上设置 `replicas > 1`（#10350）。本节并非重新讨论 DATA_DIR 横向扩展方案。
