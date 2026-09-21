# Memory System (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **事实来源：** `src/lib/memory/` 和 `src/app/api/memory/`
> **最后更新：** 2026-06-28 — v3.8.40（默认关闭 + int8 量化补齐）

OmniRoute 提供以 API 密钥为键（也可以选择使用会话 ID）的持久化对话记忆。系统通过轻量级正则表达式模式匹配，自动从 LLM 响应中提取记忆，并将其作为开头的系统消息注入后续请求（对于拒绝 system 角色的提供者，则作为第一条用户消息注入）。

> **记忆功能默认关闭（v3.8.30+）。** `DEFAULT_MEMORY_SETTINGS.enabled`
> 现在为 `false`（`src/lib/memory/settings.ts`）。启用记忆后，最多会将
> `maxTokens`（约 2k）的检索上下文注入到**每个**聊天请求中，而这些
> token 会产生费用——对于新安装实例和自行管理上下文的客户端而言，这可能是意料之外的成本。
> 请在 **设置 → 记忆** 中明确选择启用（启用记忆后，
> `MemorySkillsTab` 会显示 token 成本警告提示）。
> 客户端可以通过 `x-omniroute-no-memory`
> 请求标头（`true`/`1`/`yes`）为单个请求停用此功能——请参阅
> [API_REFERENCE.md](../reference/API_REFERENCE.md) 中的请求标头表。
> 无记忆请求会设置 `memoryOwnerId = null`，从而为该请求同时禁用
> **记忆**和技能注入（`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`）。

记忆的作用域是**每个 API 密钥**，而不是每个用户——使用同一 API 密钥进行身份验证的每个请求都会共享同一个记忆池，也可以选择通过 `sessionId` 进一步限定作用域。

## 架构

```
客户端 → /v1/chat/completions（已在上游解析 apiKeyInfo）
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # 提取 id
    → getMemorySettings()                     # 缓存的设置
    → shouldInjectMemory(body, {enabled})     # 门控
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + 可选向量
    → injectMemory(body, memories, provider)  # 系统消息或用户消息
  → 调用上游提供者
  → 收到响应时：extractFacts(text, apiKeyId, sessionId)  # 非阻塞
    → setImmediate → 对每个匹配项调用 createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

注入和提取的调用点连接在
`open-sse/handlers/chatCore.ts` 中（搜索 `retrieveMemories`、`injectMemory`
和 `extractFacts`）。

## 引擎架构（三级解析）

记忆引擎会根据可用的基础设施和设置，在运行时确定检索路径。系统包含三个层级，并按照优先级顺序应用：

```
  ┌─────────────────────────────────────────────────────────────┐
  │  第 0 层 — 关键词（FTS5）                                    │
  │  通过探测确定可用性：当 SQLite 构建支持 FTS5 时              │
  │  可用（better-sqlite3 / node:sqlite / bun:sqlite）；         │
  │  在不含 FTS5 的构建中不可用（例如 sql.js/WASM —             │
  │  "no such module: fts5"）。当 strategy = "exact" 时使用，    │
  │  或作为回退方案；engine-status 中的 keyword 反映探测结果。   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid？
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  第 1 层 — 嵌入式向量（sqlite-vec）                          │
  │  通过 db.loadExtension() 加载 sqlite-vec v0.1.9。            │
  │  对 Float32 向量执行 KNN 暴力搜索。在以下条件下启用：        │
  │   • sqlite-vec loadExtension 成功                            │
  │   • 有可用的嵌入源（remote | static | transformers），       │
  │     且该源能够生成 Float32Array                              │
  │   • vec_memories 表存在（首次 ready() 时创建）               │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled？
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  第 2 层 — Qdrant（可选启用的外部向量数据库）                │
  │  启用后，将在语义/混合检索中取代 sqlite-vec。                │
  │  需要正在运行的 Qdrant 实例以及已配置的主机/端口。           │
  └─────────────────────────────────────────────────────────────┘
```

系统会自动且透明地降级：

- 如果 sqlite-vec 加载失败，则第 1 层不可用 → 回退到第 0 层。
- 如果嵌入源返回错误，则第 1 层会回退到第 0 层。
- 如果 Qdrant 运行状况异常，则第 2 层会回退到第 1 层（如果第 1 层也不可用，则回退到第 0 层）。

## 嵌入源

嵌入层（`src/lib/memory/embedding/`）根据 `MemorySettingsExtended.embeddingSource`
确定要使用的源：

| 源             | 描述                                                                       | 是否需要密钥 | 冷启动            |
| -------------- | -------------------------------------------------------------------------- | ------------ | ----------------- |
| `remote`       | 使用已配置提供者的嵌入 API（OpenAI、Cohere 等）                            | 是           | 无                |
| `static`       | 通过 `potion-base-8M` 进行本地查找表嵌入（WordPiece + 平均池化）           | 否           | ~200ms            |
| `transformers` | 通过 `@huggingface/transformers` v4、`all-MiniLM-L6-v2` 进行本地 ONNX 推理 | 否           | ~3s + ~400MB 内存 |
| `auto`         | 运行时解析：remote（如果存在密钥）→ static → transformers → null           | 视情况而定   | 视情况而定        |

**`auto` 的解析顺序：**

1. 在 `listEmbeddingProviders()` 中查找第一个 `hasKey === true` 的提供者 → `remote`。
2. 如果 `settings.staticEnabled === true` → `static`。
3. 如果 `settings.transformersEnabled === true` → `transformers`。
4. 否则 → `null`（降级为 FTS5 关键字搜索）。

嵌入缓存（`src/lib/memory/embedding/cache.ts`）使用内存中的
LRU 映射，以 `${source}:${model}:${dim}:${sha256(text)}` 为键，最多容纳
`MEMORY_EMBEDDING_CACHE_MAX` 个条目（默认 1000），TTL 为
`MEMORY_EMBEDDING_CACHE_TTL_MS`（默认 5 分钟）。在每个进程的生命周期内由
所有调用方共享。

## 混合 RRF（k=60）

当 `strategy = "hybrid"` 且向量存储可用时，检索使用
倒数排名融合来合并 FTS5 和向量结果：

```
RRF(d) = Σ  1 / (k + rank_i(d))      其中 k = 60（可通过 MEMORY_RRF_K 配置）
          i
```

具体而言：

1. 执行 FTS5 搜索 → 排名列表 `R_fts`（位置 1..N）。
2. 执行 KNN 向量搜索 → 排名列表 `R_vec`（位置 1..M）。
3. 对于每个唯一的 `memoryId`：  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)`（如果不在列表中则为 0）。
4. 按 `rrf_score` 降序排序，并执行令牌预算遍历。

众所周知，RRF 无需对异构检索系统之间的分数进行归一化即可取得良好效果。
默认的 `k=60` 源自 Cormack 等人的原始论文，适用于小型语料库（<10k 条记忆）。

## 回填（惰性 + 重新索引）

当嵌入模型发生变化时（通过 `embedding_signature` 检测），系统会重建
向量存储，并将 `memories` 表中的所有现有记忆标记为
`needs_reindex = 1`。

**惰性回填**：在下一次检索时，任何缺少向量条目的记忆都会在搜索运行前
被嵌入并插入 `vec_memories`。这样可将回填成本分摊到实际请求中，而不会
阻塞启动过程。

**显式重新索引**：`/dashboard/memory` 中的 Engine 选项卡提供了一个
“立即重新索引”按钮，该按钮会调用 `POST /api/memory/reindex`。处理程序调用
`src/lib/memory/reindex.ts` 中的 `runReindexBatch()`，每次请求最多处理
`limit` 个待处理条目。可通过 `GET /api/memory/engine-status`
（`vectorStore.needsReindex`）轮询进度。

`memory_vec_meta` 表（迁移 `083_memory_vec.sql`）存储：

- `active_dim` — 当前向量维度（null = 尚未校准）。
- `embedding_signature` — 用于检测变化的 `${source}:${model}:${dim}`。
- `last_reset_at` — 上次完全重置的时间戳。
- `vec_loaded` — 表示 sqlite-vec 是否成功加载的 0/1 标志。

## 设置扩展

`src/shared/schemas/memory.ts` 中的 `MemorySettingsExtended` 提供了九个嵌入和向量字段，并通过 `src/lib/db/settings.ts` 持久化：

| 字段                     | 类型                                               | 默认值   | 说明                                         |
| ------------------------ | -------------------------------------------------- | -------- | -------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | 要使用的嵌入源                               |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` 格式的提供者/模型           |
| `customBaseUrl`          | `string \| null`                                   | `null`   | 仅用于记忆的 OpenAI 兼容端点基础 URL         |
| `customModelId`          | `string \| null`                                   | `null`   | 发送到自定义端点的模型 ID                    |
| `transformersEnabled`    | `boolean`                                          | `false`  | 选择启用 Transformers.js（MiniLM，约 400MB） |
| `staticEnabled`          | `boolean`                                          | `false`  | 选择启用本地静态 potion-base-8M 模型         |
| `rerankEnabled`          | `boolean`                                          | `false`  | 启用重排序步骤（每个请求增加 200-500ms）     |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` 格式的重排序提供者/模型     |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | 要使用的向量后端                             |

这些设置通过 `GET /PUT /api/settings/memory` 公开（模式为 `MemorySettingsExtendedSchema`）。

对于 `remote` 源，Memory 还接受可选的 `customBaseUrl` 和 `customModelId` 设置。两者结合使用，可以在不更改全局嵌入注册表的情况下选择兼容 OpenAI 的 `/embeddings` 端点和模型。端点在使用前会进行规范化，并由提供者的出站 URL 策略进行检查：要求使用 HTTP(S)，拒绝嵌入式凭据和查询字符串，同时仍会阻止云元数据地址。空值会保留所选的注册表提供者。返回到仪表板的错误会经过脱敏处理，并且端点凭据绝不会被记录到日志中。

> **TODO (D20)：** `global` 作用域（在所有 API 密钥之间共享记忆）未在此版本中实现。它需要更改模式并添加全局检索路径。请单独跟踪。

## 存储层

### 主要存储：SQLite（`memories` 表）

由迁移 `015_create_memories.sql` 创建：

| 列                          | 类型               | 说明                                                               |
| --------------------------- | ------------------ | ------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | 通过 `crypto.randomUUID()` 生成的 UUID                             |
| `api_key_id`                | `TEXT NOT NULL`    | 所属 API 密钥                                                      |
| `session_id`                | `TEXT`             | 可选的单会话作用域                                                 |
| `type`                      | `TEXT NOT NULL`    | `factual`、`episodic`、`procedural`、`semantic` 之一               |
| `key`                       | `TEXT`             | 稳定的 upsert 键，例如 `preference:i_prefer_python`                |
| `content`                   | `TEXT NOT NULL`    | 实际的事实文本                                                     |
| `metadata`                  | `TEXT`             | JSON 数据块（category、extractedAt、source 等）                    |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 字符串                                                    |
| `expires_at`                | `TEXT`             | 可选的到期时间；`NULL` 表示永久                                    |
| `memory_id`                 | `INTEGER UNIQUE`   | 由 `023_fix_memory_fts_uuid.sql` 添加，用于连接 UUID 与 FTS5 rowid |

索引：`api_key_id`、`session_id`、`type`、`expires_at`，以及唯一的 `memory_id` 索引。

**Upsert 语义**：`createMemory()` 会查找具有相同 `(api_key_id, key)` 的现有行，并在找到时就地更新（通过浅层展开合并 `metadata`）。这可以防止表因重复的偏好陈述而无限增长。

### 全文搜索（`memory_fts` 虚拟表）

`022_add_memory_fts5.sql` 创建了一个基于 `content` 和 `key` 的 FTS5 虚拟表。`023_fix_memory_fts_uuid.sql` 修复了一个实际使用中的错误：UUID 主键无法连接到 FTS5 的整数 rowid。该迁移添加了 `memory_id` 列，重新创建 FTS 表，并配置触发器（`memory_fts_ai`、`memory_fts_ad`、`memory_fts_au`），以便在 INSERT、DELETE 和 UPDATE 时保持 FTS 同步。

由 `retrieval.ts` 用于 `semantic` 和 `hybrid` 策略（见下文）。检索代码使用 `hasTable("memory_fts")` 进行防护；如果 FTS 表缺失或 FTS 查询抛出异常，则回退到按时间顺序排列。

### 可选：Qdrant（向量存储第 2 层）

`src/lib/memory/qdrant.ts` 实现了可选的 Qdrant 集成，作为第 2 层向量存储。仅当引擎选择器 `memoryVectorStore === "qdrant"` 时，检索才会路由到 Qdrant——默认值 `"auto"`（以及 `"sqlite-vec"`）**绝不会**选择 Qdrant。Engine 选项卡中的开关会同时设置 `qdrantEnabled` 和 `memoryVectorStore`：启用后，Qdrant 将成为主要存储；禁用后则重置为 `"auto"`（#5597——在该修复之前，启用操作不会生效，因为没有任何代码写入引擎选择器）。如果 Qdrant 无法访问或未返回任何内容，检索将回退到 sqlite-vec → FTS5。

- `upsertSemanticMemoryPoint()` — 使用已配置的嵌入模型对 `key + content` 进行嵌入，确保集合存在（首次使用时创建采用余弦距离的向量），并更新插入一个带有载荷 `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` 的点。
- `searchSemanticMemory(query, topK, scope)` — 对查询进行嵌入，在集合中搜索，并按 `kind = "omniroute_memory"` 进行过滤，还可选择按 `apiKeyId` / `sessionId` 过滤。将 `topK` 限制在 `[1, 20]` 范围内。
- `deleteSemanticMemoryPoint(id)` — 删除单个点。在 SQLite 行被移除后由 `deleteMemory()` 调用（D15）。
- `cleanupSemanticMemoryPoints({retentionDays})` — 批量删除 `expiresAtUnix` 已过期或 `createdAtUnix` 早于保留期限截止时间的点。先进行计数，以便仪表板显示实际数量。
- `checkQdrantHealth()` — 带延迟信息的 `GET /readyz` 健康探测。

设置 UI 在 `/dashboard/memory` 的 **引擎选项卡**中提供 Qdrant 配置、健康检查、语义搜索测试和清理功能。截至 v3.8.6，`src/app/api/settings/qdrant/` 下的对应路由均已接通：

| 路由                                    | 方法          | 描述                  |
| --------------------------------------- | ------------- | --------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | 读取/更新 Qdrant 设置 |
| `/api/settings/qdrant/health`           | `GET`         | 存活探测 + 延迟       |
| `/api/settings/qdrant/search`           | `POST`        | 语义搜索测试          |
| `/api/settings/qdrant/cleanup`          | `POST`        | 移除已过期/过旧的点   |
| `/api/settings/qdrant/embedding-models` | `GET`         | 列出可用的嵌入模型    |

**行为说明（预期行为）：**

- **引擎选择** — 在引擎选项卡中启用 Qdrant 会将其设为主存储（设置 `memoryVectorStore="qdrant"`）；禁用后重置为 `"auto"`（#5597）。
- **不回填** — 只有在启用 Qdrant **之后**创建/更新的记忆才会写入其中（即发即弃式双写）。预先存在的 SQLite 记忆**不会**迁移；“立即重新索引”只会重建 sqlite-vec 索引，不会重建 Qdrant。
- **向量维度会自动检测** — 首次使用时根据实际嵌入结果确定，无需填写维度字段。集合存在后更改嵌入模型**不会**自动处理：现有集合保持不变，维度不匹配的写入/搜索会失败并回退到 sqlite-vec。若要切换嵌入器，请重新创建集合（使用新名称，或在 Qdrant 中将其删除）。
- **距离度量** — 始终为**余弦距离**（创建集合时硬编码，不可配置）。
- **身份验证** — 仅使用 API 密钥（通过 `api-key` 请求头发送；对于无需身份验证的本地 Docker 环境可不填）。不使用 JWT/RBAC。
- **配置字段** — UI 提供 `host`、`port`、`collection`、`embeddingModel`、`apiKey`。`vectorSize` / `hnswEfConstruct` 只能通过环境变量/数据库配置，而且 `vectorSize` 不用于创建集合（维度来自嵌入结果）。

### 向量量化（int8 — 可选启用，两个后端均支持）

两个向量后端均支持**可选启用的 int8 量化**，以较小的召回率损失为代价，减少已存储向量的内存占用（约比 Float32 小 4 倍）。两者默认均为**关闭**状态——除非明确启用，否则向量会保持全精度。

| 后端       | 设置                                  | 类型                           | 默认值   | 读取位置                                                    |
| ---------- | ------------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization`（数据库键）      | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION`（环境变量） | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** 通过 `qdrantQuantization` 设置键按实例配置（在 `PUT /api/settings/qdrant` 中以 `quantization` 字段公开）。当设置为 `"int8"` 时，`buildQuantizationConfig()` 会请求标量量化（`always_ram`、分位数 `0.99`），并在搜索时启用 `rescore: true`，以便使用全精度向量对 int8 候选集进行优化。
- **sqlite-vec** 量化**只能通过环境变量配置**（不是数据库设置）：设置 `MEMORY_VEC_QUANTIZATION=int8`，即可通过 `vec_quantize_int8(?, 'unit')` 将本地向量存储为 `int8[dim]` 列。所选模式会纳入 `embedding_signature`（添加 `:int8` 后缀），因此切换模式会触发对 `vec_memories` 表的完整重新索引——使用的延迟回填路径与更改嵌入模型时相同。

## 记忆类型

`MemoryType` (`src/lib/memory/types.ts`)：

| 类型         | 用途                                            |
| ------------ | ----------------------------------------------- |
| `factual`    | 偏好、稳定的用户事实、行为模式                  |
| `episodic`   | 与特定时刻相关的决定（“我选择了 Postgres”）     |
| `procedural` | 工作流/操作方法记忆（保留；目前没有自动提取器） |
| `semantic`   | 为向量存储条目保留                              |

`MemoryConfig` 的检索策略为 `exact`、`semantic` 或 `hybrid` 之一，
作用域为 `session`、`apiKey` 或 `global` 之一。`getMemorySettings()` 返回的
默认作用域是 `apiKey`。

## 事实提取（`extraction.ts`）

提取是**基于正则表达式的**，而不是基于 LLM 的——它通过
`setImmediate()` 在进程内运行，因此绝不会阻塞响应流：

- **偏好模式** → `MemoryType.FACTUAL`
  （例如 `I prefer …`、`I really like …`、`my favorite is …`、`I hate …`）
- **决策模式** → `MemoryType.EPISODIC`
  （例如 `I'll use …`、`I chose …`、`I went with …`、`I'm going to adopt …`）
- **行为模式** → `MemoryType.FACTUAL`
  （例如 `I usually …`、`I always …`、`I tend to …`）

每个匹配项都会经过清理（`trim`、合并空白字符、限制为最多 500 个字符），
通过稳定的 `factKey(category, content)` 在批次内去重，并使用
`createMemory()` 存储，同时附带元数据
`{category, extractedAt, source: "llm_response"}`。输入文本上限为
64 KiB（`MAX_EXTRACTION_TEXT_LENGTH`）——如果超过此长度，则使用文本的
**尾部**，以确保最新的助手内容始终参与提取。

`extractFactsFromText(text)` 会被导出以供测试使用，并返回结构化事实，
而不存储它们。

## 检索（`retrieval.ts`）

`retrieveMemories(apiKeyId, config)` 是主要入口点。它会：

1. 通过 `MemoryConfigSchema` 规范化并验证配置。
2. 当 `enabled` 为 false 或 `maxTokens <= 0` 时，立即返回 `[]`。
3. 将 `maxTokens` 限制在 `[1, 8000]` 范围内。
4. 检测现代 `memories` 表是否存在（相对于旧版 `memory` 表），以确保旧数据库仍可正常工作。
5. 构建基础查询，其中包含过期保护条件
   （`expires_at IS NULL OR datetime(expires_at) > datetime('now')`）、可选的
   会话作用域，以及可选的 `retentionDays` 截止条件。
6. 根据策略进行分支：
   - **`exact`**（默认）：按时间顺序执行 `ORDER BY created_at DESC LIMIT 100`。
   - **`semantic`**：如果存在 `config.query` 和 `memory_fts`，则使用
     `memory_fts MATCH ?` 进行 JOIN，并按 FTS 排名排序；当 FTS 返回 0 行时，
     回退到按时间顺序检索。
   - **`hybrid`**：合并 FTS 结果（相关性更高）和按时间顺序检索的结果集，
     并按 id 去重。
7. 如果提供了查询，则对 `content`、`key` 和 `metadata` JSON 计算关键词
   相关性分数（`getRelevanceScore`）。分数为零的行会被过滤掉。
8. 先按分数降序排序，再按 `createdAt` 降序排序。
9. 遍历排序后的列表，并在累计的 `estimateTokens(content)`（约为
   `length / 4`）不超过预算时接纳条目。只要存在任何匹配项，就始终至少返回
   一个条目。

`estimateTokens` 会被导出，并用于检索、摘要生成以及 MCP
`omniroute_memory_search` 工具。

## 注入（`injection.ts`）

`injectMemory(request, memories, provider)`：

1. 将所有记忆内容合并为单个 `Memory context: …` 字符串。
2. 根据提供者名称选择策略：
   - **系统消息**（OpenAI、Anthropic、Gemini 等默认使用）——在任何现有系统消息之前添加
     `{role: "system", content: memoryText}`，因此用户的系统提示词仍具有更高优先级。
   - **用户消息**（回退策略）——适用于
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` 中的提供者：`o1`、`o1-mini`、`o1-preview`、
     `glm`、`glmt`、`glm-cn`、`zai`、`qianfan`。这些提供者拒绝系统角色，
     否则将返回 400 错误（关于 GLM/Zhipu，请参阅 issue #1701）。
3. 在 `memory.injection.injected` 下记录数量、策略和模型。

`providerSupportsSystemMessage(provider)` 会被导出，供需要自行做出
路由决策的调用方使用。为安全起见，未知提供者默认返回 `true`
（允许系统角色）。

## 设置（`settings.ts`）

记忆配置**存储在数据库的设置表中**，而不是环境变量中。
`getMemorySettings()` 从 `getSettings()` 读取配置，并在进程内缓存结果；
设置 PUT 路由会在写入后调用 `invalidateMemorySettingsCache()`。

### 旧版字段（所有版本）

| 数据库键              | 类型   | 默认值                                            | UI 控件                            |
| --------------------- | ------ | ------------------------------------------------- | ---------------------------------- |
| `memoryEnabled`       | 布尔值 | `false`（自 v3.8.30 起默认关闭）                  | 开启/关闭记忆                      |
| `memoryMaxTokens`     | 整数   | `2000`（范围 `0–16000`）                          | 注入的令牌预算                     |
| `memoryRetentionDays` | 整数   | `30`（范围 `1–365`）                              | 保留期限                           |
| `memoryStrategy`      | 枚举   | `"hybrid"`（`recent`、`semantic`、`hybrid` 之一） | 检索策略                           |
| `skillsEnabled`       | 布尔值 | `false`                                           | 切换按键注入技能（参见 SKILLS.md） |

注意：UI 策略 `"recent"` 会通过 `toMemoryRetrievalConfig()` 映射到内部的 `"exact"`
检索策略（按时间顺序）。

### 新字段（v3.8.6，计划 21 D9）

有关字段说明，另请参阅上文的“设置扩展”部分。

| 数据库键                    | API 字段                 | 默认值   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant 相关的数据库键（`qdrantEnabled`、`qdrantHost`、`qdrantPort`、
`qdrantApiKey`、`qdrantCollection`，默认值为 `"omniroute_memory"`；
`qdrantEmbeddingModel`，默认值为 `"openai/text-embedding-3-small"`）由
`qdrant.ts` 中的 `normalizeQdrantConfig()` 读取。

### 环境变量（v3.8.6）

有六个可选的环境变量可用于调整引擎的运行时行为（记录在 `.env.example` 中）：

| 变量                            | 默认值                     | 说明                                                                                                  |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | 嵌入缓存 TTL（5 分钟）                                                                                |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | 嵌入 LRU 缓存中的最大条目数                                                                           |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js 模型的 HF 仓库                                                                        |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | 静态 potion 模型的 HF 仓库                                                                            |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | 存储已下载模型的位置                                                                                  |
| `MEMORY_VEC_TOP_K`              | `20`                       | 向量搜索的默认 top-K                                                                                  |
| `MEMORY_RRF_K`                  | `60`                       | 混合搜索的 RRF k 常量                                                                                 |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | 设置为 `int8` 可量化存储本地 sqlite-vec 向量（约缩小 4 倍；需显式启用）。更改模式会强制重新建立索引。 |

## 摘要压缩（`summarization.ts`）

当某个密钥的记忆所累计的 token 总数超出预算时，`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` 会压缩较早的内容。它按 `created_at` 降序遍历各行，保留符合预算的行，并将其余行的 `content` 原地替换为原始内容的前三个句子。`tokensSaved` 是新旧内容的 `estimateTokens` 之差。

此例程在当前聊天管线中**可用但不会被自动调用**——如果需要持续压缩，请通过 cron、管理员操作或 `MemoryConfig.autoSummarize` 粘合逻辑调用它。数据丢失是单向的：原始文本会被覆盖。

## REST API

所有端点都需要管理身份验证（`requireManagementAuth`）。

### 核心记忆端点（现有 + 已更新）

| 方法     | 路径                 | 描述                                                                                                                                                                            |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | 支持过滤条件的分页列表：`apiKeyId`、`type`、`sessionId`、`q`、`limit`、`page`、`offset`。响应包含 `stats.total`、`stats.tokensUsed`、`stats.hitRate`、`cacheStats`              |
| `POST`   | `/api/memory`        | 创建条目（经 Zod 验证：`content`、`key`，以及可选的 `type`、`sessionId`、`apiKeyId`、`metadata`、`expiresAt`）。调用 `createMemory()`，该函数基于 `(apiKeyId, key)` 执行 upsert |
| `GET`    | `/api/memory/[id]`   | 按 UUID 获取单个条目                                                                                                                                                            |
| `PUT`    | `/api/memory/[id]`   | 更新条目字段（`type`、`key`、`content`、`metadata`）。请求体：`MemoryUpdatePutSchema`。如果嵌入源可用，还会同步向量。                                                           |
| `DELETE` | `/api/memory/[id]`   | 删除条目；同时从 `vec_memories`（D15）中删除，并尽力从 Qdrant 中删除。条目不存在时返回 404。                                                                                    |
| `GET`    | `/api/memory/health` | 运行 `verifyExtractionPipeline("health-check")`——往返执行创建→列出→删除。返回 `{working, latencyMs, error?}`                                                                    |

### 新记忆引擎端点（计划 21）

| 方法   | 路径                              | 描述                                                                                                                            |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | 试运行 `retrieveMemories`——返回带有分数、层级和 token 数的排序结果。请求体：`RetrievePreviewSchema`。不会注入或修改记忆。       |
| `GET`  | `/api/memory/embedding-providers` | 列出提供嵌入模型的提供者，并指明哪些提供者已配置 API 密钥。                                                                     |
| `GET`  | `/api/memory/engine-status`       | 返回完整的引擎状态：关键词层级、嵌入解析结果、向量存储统计信息、Qdrant 健康状态、重排序配置。结构：`MemoryEngineStatusSchema`。 |
| `POST` | `/api/memory/summarize`           | 手动触发记忆压缩。请求体：`MemorySummarizeSchema`（`olderThanDays`、`apiKeyId?`、`dryRun`）。返回 `{candidates, tokensSaved}`。 |
| `POST` | `/api/memory/reindex`             | 触发对 `needs_reindex=1` 的记忆进行向量重新索引。请求体：`MemoryReindexSchema`（`force`）。返回 `{started, pending}`。          |

### 设置端点

| 方法   | 路径                                    | 描述                                                                                    |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | 当前已规范化的 `MemorySettingsExtended`（7 个新字段 + 旧版字段）                        |
| `PUT`  | `/api/settings/memory`                  | 更新 `MemorySettingsExtendedSchema` 中的任意字段（共 12 个字段）                        |
| `GET`  | `/api/settings/qdrant`                  | 当前 Qdrant 设置（`QdrantSettingsSchema`）                                              |
| `PUT`  | `/api/settings/qdrant`                  | 更新 Qdrant 设置。请求体：`QdrantSettingsUpdateSchema`。`apiKey` = 空字符串时移除密钥。 |
| `GET`  | `/api/settings/qdrant/health`           | 对已配置的 Qdrant 实例执行存活探测。返回 `QdrantHealthResultSchema`。                   |
| `POST` | `/api/settings/qdrant/search`           | 针对 Qdrant 的语义搜索测试。请求体：`QdrantSearchSchema`（`query`、`topK`）。           |
| `POST` | `/api/settings/qdrant/cleanup`          | 移除 Qdrant 中与已过期/旧记忆对应的点。                                                 |
| `GET`  | `/api/settings/qdrant/embedding-models` | 列出可用于 Qdrant 的嵌入模型。                                                          |

`/api/memory` 列表查询支持基于 `page` 的分页（`parsePaginationParams`）**或**原始 `offset`——当存在 `offset` 时，它会优先采用，并计算派生的 `page` 以符合响应结构。

## MCP 工具（`open-sse/mcp-server/tools/memoryTools.ts`）

启用 MCP 服务器后，会注册三个记忆工具：

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → 封装 `retrieveMemories()`。从 v3.8.6（D16）开始，`strategy` 从
  `getMemorySettings()` 读取，而不再硬编码为 `"exact"`。如果提供了
  `query`，且 `strategy` 为 `semantic` 或 `hybrid`，则会在向量存储
  可用时使用它。
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → 封装 `createMemory()`。仅接受 4 种规范类型：
  `factual`、`episodic`、`procedural`、`semantic`（D17）。
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → 列出匹配的
  条目，可选择按早于指定时间戳创建进行筛选，然后通过
  `deleteMemory()` 逐一删除（同时也会从 sqlite-vec + Qdrant 中移除向量）。

有关传输方式和作用域的详细信息，请参阅 [MCP-SERVER.md](./MCP-SERVER.md)。

## 仪表板（记忆工作室）

`src/app/(dashboard)/dashboard/memory/page.tsx` 现在是一个包含 **3 个选项卡的工作室**：

### 选项卡：记忆

- 概念卡片（可折叠的“工作原理”说明）。
- 实时列表、搜索和分页（300 ms 防抖）。
- 类型筛选器（`factual` / `episodic` / `procedural` / `semantic` / 全部）。
- 添加记忆模态框（键、内容、类型）。
- 行内编辑（铅笔按钮 → `PUT /api/memory/[id]`）。
- 逐行删除（带确认对话框）。
- 将当前页面导出为 JSON；通过文件选择器导入 JSON。
- 统计卡片：`totalEntries`、`tokensUsed`、`hitRate`。
- “压缩旧记忆”按钮 → `POST /api/memory/summarize`（先试运行并显示
  候选项数量，然后进行确认）。
- 由 `GET /api/memory/health` 驱动的绿色/红色健康状态指示点。

### 选项卡：演练场

- 查询输入框 + 策略选择器（精确 / 语义 / 混合）+ 令牌预算。
- “模拟” → `POST /api/memory/retrieve-preview` — 显示排序后的结果，包括
  `score`、`tier`、`tokens`、`vecScore`、`ftsScore`。
- 解析面板，用于显示所使用的嵌入来源 / 向量存储，以及是否发生了回退。

### 选项卡：引擎

- 引擎状态面板（关键字 FTS5 标签、嵌入标签、向量存储标签、
  Qdrant 健康状态标签、重排序标签）。
- “立即重新索引”按钮 → `POST /api/memory/reindex`。
- 嵌入来源选择器（自动 / 远程 / 静态 / transformers + 切换开关）。
- Qdrant 配置卡片（启用开关、主机/端口/集合/密钥、测试连接、
  语义搜索测试、清理）。
- 重排序配置卡片（启用开关、提供者/模型选择器）。

记忆和 Qdrant 设置也位于
`/dashboard/settings → 记忆与技能`（`MemorySkillsTab.tsx`）下，
作为旧版/全局设置界面。

## 缓存

`src/lib/memory/store.ts` 为 `getMemory(id)` 读取维护了一个进程内的类 LRU 缓存
（`MEMORY_CACHE_TTL = 1 min`、`MEMORY_MAX_CACHE_SIZE = 500`，并淘汰最旧的 20 %
条目），此外还有一个通用键值 `memoryCache` 层
（`src/lib/memory/cache.ts`），它提供 `get`/`set`/`invalidate`
方法，供需要自定义作用域缓存的调用方使用（1 000 条目的 LRU，
默认 TTL 为 5 min）。

## 隐私与生命周期

- 记忆的所有者是 API 密钥 ID（`chatCore.ts` 中的 `resolveMemoryOwnerId`）。如果没有 `apiKeyInfo.id`，则不会执行检索、注入或提取。
- `expires_at` 为未来时间的条目会被排除在检索结果之外；超过 `retentionDays` 的旧条目会通过 `retrieveMemories` 中的 `created_at >= cutoff` 子句排除。
- 如需硬删除，请使用 `DELETE /api/memory/[id]` 或 `omniroute_memory_clear`。
- 提取通过 `setImmediate` 以触发后不等待的方式执行；失败会记录在 `memory.extraction.background.failed` 下，且永远不会暴露给调用方。
- 验证往返流程（`verifyExtractionPipeline`）会在 `finally` 块中清理其自身的测试条目。

## 另请参阅

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` 设置会将工具定义与记忆一起注入。
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP 传输方式/作用域。
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 更广泛的 API 接口。
- 源模块：
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + 混合 RRF
  - `src/lib/memory/embedding/index.ts` — 多源嵌入层
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — 所有记忆 API 请求体的 Zod 模式
  - `src/shared/schemas/qdrant.ts` — Qdrant 设置/操作的 Zod 模式
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` 的 CRUD 操作
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + 子路由
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI（页面 + 组件 +
    选项卡 + 钩子）
  - `open-sse/handlers/chatCore.ts`（注入/提取接线）
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## 选择嵌入提供者 (v3.8.16+)

OmniRoute 的记忆引擎支持**四种嵌入来源**（`src/lib/memory/embedding/`）。每种来源在**延迟、成本、模型质量和设置复杂度**方面各有取舍。

### 嵌入来源

| 提供者         | 来源                                     | 延迟                             | 成本                 | 质量                         | 设置                     |
| -------------- | ---------------------------------------- | -------------------------------- | -------------------- | ---------------------------- | ------------------------ |
| `transformers` | 本地 ONNX 模型 (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                  | 免费                 | 良好                         | 只需 `npm install`       |
| `static`       | 预计算向量（已缓存）                     | <1ms                             | 免费                 | 不适用（取决于是否命中缓存） | 无                       |
| `remote`       | OpenAI / Cohere / Voyage API             | ~100-300ms                       | $0.02-0.10/1M tokens | 极佳                         | API 密钥                 |
| `auto`         | 在运行时选择最佳可用来源                 | 与所选来源相同                   | 免费                 | 与所选来源相同               | 无                       |
| _(cache)_      | 位于任意来源之上的内存 LRU 层            | <1ms（命中），完整延迟（未命中） | 免费                 | 与底层来源相同               | 始终启用（不可选为来源） |

### 决策树

```
                  你的部署环境是什么？
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  开发/测试    小型生产环境  大型生产环境    边缘/离线
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  （免费，无需 API）          （质量最佳）    （无需互联网）
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            始终在顶层添加 `cache` 层
            （LruCache 会包装任意提供者）
```

### 数据库与 API 配置

记忆嵌入选项通过设置 API/UI 配置，而不是通过环境变量配置。设置中的相关数据库键（`src/lib/memory/settings.ts` 中的 `normalizeMemorySettings`）如下：

- `memoryEmbeddingSource`：`"transformers"`（本地）、`"remote"`（基于 API，例如 OpenAI）、`"static"`（外部存储）或 `"auto"`
- `memoryEmbeddingProviderModel`：远程/静态来源的模型标识符（例如 `"text-embedding-3-small"`）
- `memoryTransformersEnabled`：`true` | `false`
- `memoryStaticEnabled`：`true` | `false`
- `memoryVectorStore`：`"sqlite-vec"`、`"qdrant"` 或 `"auto"`

#### 本地模型 (`transformers`)

在内部使用 transformers.js 运行本地模型：

```bash
# 在代码中读取的环境变量 (src/lib/memory/embedding/index.ts)：
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF 模型仓库
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF 静态 potion 模型
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # 缓存目录
```

#### LRU 嵌入缓存

默认情况下缓存始终启用，并通过环境变量配置：

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # 最大缓存条目数
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL（5 分钟）
```

### 性能数据

在典型的 4 核 x86 服务器上进行的基准测试（每段文本约 100 个 token）：

| 提供者               | p50   | p95   | p99   | 每 100 万次嵌入的成本                |
| -------------------- | ----- | ----- | ----- | ------------------------------------ |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | 免费                                 |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | 约 $0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | 取决于 Qdrant 托管服务               |
| `cache`（命中）      | <1ms  | <1ms  | 2ms   | 免费                                 |

---

## 事实提取模式 (v3.8.16+)

`extraction.ts` 模块 (`src/lib/memory/extraction.ts`) 使用**正则表达式模式匹配**从对话消息中提取结构化事实。了解这些模式有助于你针对自己的使用场景优化提取质量。

### 默认模式类别

| 类别                | 示例模式                                                    | 捕获内容             |
| ------------------- | ----------------------------------------------------------- | -------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`、`"I like <X>"`、`"I hate <X>"`            | 用户偏好             |
| DECISION_PATTERNS   | `"I'll use <X>"`、`"I decided to <X>"`、`"I went with <X>"` | 用户决策（情景记忆） |
| PATTERN_PATTERNS    | `"I usually <X>"`、`"I always <X>"`、`"I never <X>"`        | 持久的行为模式       |

### 示例模式（简化版）

```ts
// 来自 src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### 会提取哪些内容

当用户说：

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> 提取过程会生成 4 条记忆：
>
> | 键                                   | 类别       | 类型     | 内容                        |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### 提取限制

为防止提取失控，适用以下限制：

| 最小内容长度 | 3 个字符 |
| 最大内容长度 | 500 个字符 |

### 何时禁用提取

只要启用了记忆功能，提取就会自动运行；没有单独的
仅提取开关。要将其关闭，请完全禁用记忆功能（通过 `PUT /api/settings/memory`
设置 `enabled: false`）。在以下情况下可考虑这样做：

- 消息量很大，且提取成本不可忽略
- 对话大多是临时性的（聊天、调试），没有长期价值
- 已经通过自定义插件捕获上下文

---

## 混合 RRF 调优 (v3.8.16+)

**倒数排名融合 (RRF)** 算法会合并 FTS5（关键词）和向量（语义）结果。`k` 参数控制赋予排名靠后结果的权重。

### 公式

对于每个候选记忆，RRF 分数为：

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

其中：

- `k` 是常数（默认为 60）
- `rank_i(d)` 是文档 `d` 在第 i 个检索系统（FTS、向量）中的排名
- 对所有检索系统的结果求和

### `k` 如何影响结果

| `k` 值               | 效果                                                           | 最适合的场景              |
| -------------------- | -------------------------------------------------------------- | ------------------------- |
| `k=0`                | 纯排名融合（无平滑）                                           | 理论基线                  |
| `k=10-30`            | 大幅提高靠前结果的权重，低排名结果几乎没有贡献                 | 排名前 3 的结果通常正确时 |
| **`k=60`**（默认值） | 均衡——排名前 10 的结果都能做出有意义的贡献                     | 通用检索                  |
| `k=100+`             | 更平坦——如果低排名结果出现在多个系统中，它们甚至可能占主导地位 | 召回率比精确率更重要时    |

### 在实践中调优 `k`

```bash
# 默认值
MEMORY_RRF_K=60

# 激进的精确率设置（小型记忆库、文档较少）
MEMORY_RRF_K=20

# 最大召回率（大型记忆库、查询多样）
MEMORY_RRF_K=120
```

**`k=20` 时的示例：**

- FTS 排名第 1 → 贡献 `1/21 = 0.048`
- FTS 排名第 10 → 贡献 `1/30 = 0.033`
- 向量排名第 1 → 贡献 `0.048`
- 合并后的最大值：`0.096`

**`k=60` 时的示例：**

- FTS 排名第 1 → 贡献 `1/61 = 0.016`
- FTS 排名第 10 → 贡献 `1/70 = 0.014`
- 向量排名第 1 → 贡献 `0.016`
- 合并后的最大值：`0.033`

`k` 越高，排名第 1 与排名第 10 之间的**相对差异**就越小，因此该算法更依赖**各检索系统之间的共识**，而不是最高排名的置信度。

### 何时更改 `k`

| 症状                                 | 可尝试的方法                                       |
| ------------------------------------ | -------------------------------------------------- |
| 排名第一的结果总是获胜，但它是错误的 | **降低** k（例如 20）——更看重靠前排名的置信度      |
| 正确答案位于前 5 名，但不是第 1 名   | **提高** k（例如 100）——更平坦的评分方式会奖励共识 |
| 召回率高，但精确率低                 | **降低** k——增强排名区分度                         |
| 召回率低（遗漏相关文档）             | **提高** k——给排名靠后的文档一个机会               |

### RRF 权重

倒数排名融合对语义向量排名和全文搜索排名使用相同的权重：

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

没有可用于调整各自权重的环境变量（`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` 不存在）。

---

## 摘要策略 (v3.8.16+)

`summarization.ts` 模块 (`src/lib/memory/summarization.ts`) 会压缩较旧的记忆，以在保留召回能力的同时缩小活跃记忆集。

### 触发摘要的时机

| 触发方式          | 阈值（默认） |
| ----------------- | ------------ |
| 通过 API 手动触发 | 不适用       |

### 摘要的内容

`summarization.ts` 导出了两个入口点：

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — 将某个会话的
  记忆压缩为一段摘要文本，并将其限制在指定的 token 预算内。
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API 使用的基于时间的
  压缩方法：它会选择所有早于 `days` 的记忆，根据它们创建一条压缩后的摘要记忆，
  并且（当 `dryRun` 为 `false` 时）删除原始记忆。传入 `dryRun: true` 可预览候选集
  和 token 总数，而不会修改任何内容。

不存在标签/键聚类过程，也不会对每条记忆进行“核心内容与可摘要内容”的评分 —
选择完全基于时间截止点，而摘要文本则是每个候选项经过压缩并带有类型前缀的一行内容。

### 触发摘要

摘要是**手动启用 / 选择性启用**的 — `autoSummarize` 设置默认为 `false`，
因此不会自动压缩任何内容。可通过 API 触发：

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

若要保持关闭状态，只需将 `autoSummarize` 保持为默认值 (`false`)。

### 摘要质量提示

- **先使用 `dryRun` 预览** — `summarizeMemoriesOlderThan(..., true)` 会返回
  候选项列表和 token 总数，以便你在删除原始记忆之前确认将要合并的内容。
- 如果记忆语料库较大，请**在低流量时段运行摘要任务** — LLM 调用是最耗时的部分

```bash
# Cron 风格：每天凌晨 3 点生成摘要
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend 提供程序模式

> **权威来源：** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **测试：** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend 提供程序模式在现有记忆引擎之上引入了一个**可插拔的后端抽象层**。记忆系统不再绑定到单一存储实现，而是支持多个后端（SQLite、Obsidian、Notion、自定义 HTTP 后端），并且可以配置主后端/回退后端路由。

### 架构

```
┌──────────────────────────────────────────────────────────┐
│                    API 路由                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           单例协调器 (manager.ts)                         │
│                                                          │
│  主后端 ──► 后端 A  （例如 SQLite）                      │
│  回退   ──► 后端 B  （例如 Obsidian）                    │
│             后端 C  （例如通过 GenericBackend 使用 Notion）│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ 后端       │ │ 后端       │ │ 后端 (HTTP)      │
└────────────┘ └────────────┘ └──────────────────┘
```

#### 核心接口 (`backend.ts`)

每个后端都必须实现 `MemoryBackend` 接口：

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // 增删改查
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // 搜索
  search(config: SearchConfig): Promise<Memory[]>;

  // 健康状态
  health(): Promise<HealthCheckResult>;

  // 生命周期（可选）
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

这是一个单例协调器，负责：

- 通过 `register(backend)` **注册**后端 — 在启动时从 `index.ts` 调用
- 通过 `configure(primary, fallbacks)` **配置**主后端和回退后端
- 将增删改查/搜索请求**路由**到主后端，并在失败时使用回退链
- 定期对所有后端执行**健康检查**

**回退行为：**

| 操作     | 主后端            | 回退后端            |
| -------- | ----------------- | ------------------- |
| `create` | ✅ 仅主后端       | ❌                  |
| `get`    | ✅ 先尝试主后端   | ✅ 返回 null 时回退 |
| `update` | ✅ 仅主后端       | ✅ 即发即弃式同步   |
| `delete` | ✅ 仅主后端       | ✅ 即发即弃式同步   |
| `list`   | ✅ 仅主后端       | ❌                  |
| `search` | ✅ 优先使用主后端 | ✅ 出错时回退       |

#### GenericMemoryBackend (`genericBackend.ts`)

这是一个通用 HTTP 连接器，可将任意 REST API 适配为 MemoryBackend。适用于：

- **Notion** — 通过 Notion API 连接
- **Obsidian** — 通过 Obsidian Local REST API 连接
- **自定义后端** — 任何公开 RESTful 记忆 API 的服务

**配置：**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // 后端 API 的基础 URL
  apiKey?: string;           // 用于身份验证的 Bearer 令牌
  headers?: Record<string, string>;  // 自定义 HTTP 标头
  timeout?: number;          // 请求超时时间（默认：30000ms）
  backendType?: string;      // 用于日志记录

  // 端点覆盖（默认使用 REST 约定）
  endpoints?: {
    search?: string;   // 默认："/memories/search"
    create?: string;   // 默认："/memories"
    list?: string;     // 默认："/memories"
    get?: string;      // 默认："/memories/{id}"
    update?: string;   // 默认："/memories/{id}"
    delete?: string;   // 默认："/memories/{id}"
    health?: string;   // 默认："/health"
  };

  // 查询参数名称映射
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // 路径参数名称映射
  pathParams?: {
    id?/memoryId?
  };
}
```

**已知后端**已在 `KNOWN_BACKENDS` 中预配置：

```typescript
createKnownBackend("obsidian"); // → 指向 localhost:27123 的 GenericMemoryBackend
createKnownBackend("notion"); // → 指向 api.notion.com/v1 的 GenericMemoryBackend
```

#### 内置后端

##### SQLiteBackend (`sqliteBackend.ts`)

默认主后端。使用 `src/lib/memory/store.ts` 封装现有的 SQLite 内存存储。启动时自动注册。

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

封装现有的 Obsidian 集成（`src/lib/memory/obsidianBackend.ts`）。通过 Obsidian Local REST API 连接到 Obsidian 仓库。

### 设置

内存后端设置存储在应用设置表中，并通过 `src/lib/memory/settings.ts` 管理：

| 设置     | 环境/配置键              | 默认值     | 描述                    |
| -------- | ------------------------ | ---------- | ----------------------- |
| 主后端   | `memoryPrimaryBackend`   | `"sqlite"` | 主后端的 ID             |
| 回退后端 | `memoryFallbackBackends` | `[]`       | 按顺序排列的回退后端 ID |
| 后端配置 | `memoryBackendConfigs`   | `{}`       | 每个后端的配置覆盖      |

设置通过 `normalizeMemorySettings()` 进行规范化，并缓存在 `getMemorySettings()` 中。

### 初始化流程

```
应用启动
  → index.ts 导入（副作用）：注册 SQLiteBackend
  → 从应用生命周期中调用 initMemoryBackends()：
      1. 加载设置（getMemorySettings）
      2. 配置主后端和回退后端
      3. 初始化所有后端（健康检查）
      4. 准备接收请求
```

### 添加新后端

1. 在 `src/lib/memory/<name>Backend.ts` 中**实现 `MemoryBackend`** 接口
2. 从 `src/lib/memory/index.ts` **导出**
3. 启动时使用 `memoryManager.register(yourBackend)` **注册**
4. 通过设置进行**配置**：将 `memoryPrimaryBackend` 设为你的后端 ID
5. 以 `src/lib/memory/__tests__/generic-backend.test.ts` 为参考进行**测试**

#### 示例：Brain 后端

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### 验证

#### 单元测试

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

预期输出：**35 个测试，全部通过**，涵盖：

- 构造函数（2）
- 健康检查（4）— 成功、500 失败、网络错误、延迟
- 初始化（2）— 成功、失败
- 创建（2）— 默认端点、自定义端点
- 获取（4）— 成功、404 → null、非 404 抛出异常、自定义路径参数
- 更新（2）— 成功、404 → false
- 删除（2）— 成功、404 → false
- 列表（2）— 查询参数、自定义参数名称
- 搜索（3）— 查询参数、自定义端点、选项序列化
- 身份验证标头（2）— Bearer 令牌、自定义标头
- 工厂函数（1）

#### 类型检查

```bash
npm run typecheck:core
```

预期：**0 个错误**。
