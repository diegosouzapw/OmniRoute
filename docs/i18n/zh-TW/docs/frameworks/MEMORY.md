# Memory System (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md)

---

> **事實來源：** `src/lib/memory/` 與 `src/app/api/memory/`
> **最後更新：** 2026-06-28 — v3.8.40（預設關閉 + int8 量化補齊）

OmniRoute 提供以 API 金鑰（以及選用的工作階段 ID）為索引的持久化對話記憶。系統會透過輕量級的正規表示式模式比對，自動從 LLM 回應中擷取記憶，並將其重新注入後續請求，作為開頭的系統訊息（若提供者拒絕 system 角色，則作為第一則使用者訊息）。

> **記憶功能預設為關閉（v3.8.30+）。** `DEFAULT_MEMORY_SETTINGS.enabled` 現在為
> `false`（`src/lib/memory/settings.ts`）。啟用記憶功能後，最多會將
> `maxTokens`（約 2k）的擷取內容注入至**每一個**聊天請求中，而這些內容
> 會計費——對新安裝環境以及自行管理上下文的用戶端而言，這可能是意料之外的成本。
> 請在 **Settings → Memory** 中明確選擇啟用（啟用記憶功能時，
> `MemorySkillsTab` 會顯示權杖成本警告提示）。用戶端可透過
> `x-omniroute-no-memory` 請求標頭（`true`/`1`/`yes`），讓單一請求
> 不使用記憶功能——請參閱 [API_REFERENCE.md](../reference/API_REFERENCE.md)
> 中的請求標頭表格。不使用記憶的請求會設定 `memoryOwnerId = null`，
> 因而同時停用該請求的記憶與技能注入
> （`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`）。

記憶是**以每個 API 金鑰為範圍**，而非以每位使用者為範圍——使用相同 API 金鑰驗證的每個請求，都會共用相同的記憶集區，並可選擇再依 `sessionId` 進一步限定範圍。

## 架構

```
用戶端 → /v1/chat/completions（apiKeyInfo 已在上游解析）
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # 擷取 ID
    → getMemorySettings()                     # 快取的設定
    → shouldInjectMemory(body, {enabled})     # 閘門
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + 選用向量
    → injectMemory(body, memories, provider)  # 系統或使用者訊息
  → 上游提供者呼叫
  → 收到回應時：extractFacts(text, apiKeyId, sessionId)  # 非阻塞
    → setImmediate → 對每個相符項目執行 createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

注入與擷取的呼叫位置連接於
`open-sse/handlers/chatCore.ts`（搜尋 `retrieveMemories`、`injectMemory`
及 `extractFacts`）。

## 引擎架構（3 層解析）

記憶引擎會根據可用的基礎架構與設定，在執行階段決定擷取路徑。共有三個層級，並依優先順序套用：

```
  ┌─────────────────────────────────────────────────────────────┐
  │  第 0 層 — 關鍵字（FTS5）                                    │
  │  由探測結果決定可用性：當 SQLite 組建支援 FTS5 時             │
  │  可用（better-sqlite3 / node:sqlite / bun:sqlite）；          │
  │  在不含 FTS5 的組建中不可用（例如 sql.js/WASM —               │
  │  "no such module: fts5"）。當 strategy = "exact" 時使用，     │
  │  或作為後備方案；engine-status keyword 會反映探測結果。       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid？
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  第 1 層 — 內嵌向量（sqlite-vec）                             │
  │  透過 db.loadExtension() 載入 sqlite-vec v0.1.9。             │
  │  對 Float32 向量執行 KNN 暴力搜尋。啟用條件：                  │
  │   • sqlite-vec loadExtension 成功                             │
  │   • 有可用的嵌入來源（remote | static |                       │
  │     transformers），且可產生 Float32Array                    │
  │   • vec_memories 資料表存在（第一次 ready() 時建立）          │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled？
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  第 2 層 — Qdrant（選擇啟用的外部向量資料庫）                  │
  │  啟用後，會在語意／混合模式中取代 sqlite-vec。                 │
  │  需要執行中的 Qdrant 執行個體，以及已設定的主機／連接埠。      │
  └─────────────────────────────────────────────────────────────┘
```

降級處理會自動且透明地進行：

- 若 sqlite-vec 載入失敗，則第 1 層不可用 → 後備至第 0 層。
- 若嵌入來源傳回錯誤，則第 1 層會後備至第 0 層。
- 若 Qdrant 狀態異常，則第 2 層會後備至第 1 層（若第 1 層也不可用，
  則後備至第 0 層）。

## 嵌入來源

嵌入層（`src/lib/memory/embedding/`）會根據 `MemorySettingsExtended.embeddingSource`
決定要使用的來源：

| 來源           | 說明                                                                         | 需要金鑰   | 冷啟動           |
| -------------- | ---------------------------------------------------------------------------- | ---------- | ---------------- |
| `remote`       | 使用已設定的提供者嵌入 API（OpenAI、Cohere 等）                              | 是         | 無               |
| `static`       | 透過 `potion-base-8M` 在本機查找表進行嵌入（WordPiece + 平均池化）           | 否         | ~200ms           |
| `transformers` | 透過 `@huggingface/transformers` v4、`all-MiniLM-L6-v2` 在本機執行 ONNX 推論 | 否         | ~3s + ~400MB RAM |
| `auto`         | 執行階段解析：遠端（若有金鑰）→ 靜態 → transformers → null                   | 視情況而定 | 視情況而定       |

**`auto` 的解析順序：**

1. 在 `listEmbeddingProviders()` 中尋找第一個 `hasKey === true` 的提供者 → `remote`。
2. 如果 `settings.staticEnabled === true` → `static`。
3. 如果 `settings.transformersEnabled === true` → `transformers`。
4. 否則 → `null`（降級為 FTS5 關鍵字搜尋）。

嵌入快取（`src/lib/memory/embedding/cache.ts`）使用記憶體內的
LRU 對映，以 `${source}:${model}:${dim}:${sha256(text)}` 作為索引鍵，最多保留
`MEMORY_EMBEDDING_CACHE_MAX` 個項目（預設為 1000），TTL 為
`MEMORY_EMBEDDING_CACHE_TTL_MS`（預設為 5 分鐘）。在每個處理程序的生命週期內，
所有呼叫端共用此快取。

## 混合式 RRF（k=60）

當 `strategy = "hybrid"` 且向量儲存區可用時，檢索會使用
倒數排名融合來合併 FTS5 與向量結果：

```
RRF(d) = Σ  1 / (k + rank_i(d))      其中 k = 60（可透過 MEMORY_RRF_K 設定）
          i
```

具體而言：

1. 執行 FTS5 搜尋 → 排名清單 `R_fts`（位置 1..N）。
2. 執行 KNN 向量搜尋 → 排名清單 `R_vec`（位置 1..M）。
3. 對每個唯一的 `memoryId`：  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)`（若不在清單中則為 0）。
4. 依 `rrf_score` 降冪排序，然後套用權杖預算走訪。

眾所周知，RRF 無需在異質檢索系統之間進行分數正規化，也能有效運作。預設的
`k=60` 源自 Cormack 等人的原始論文，且適用於小型語料庫（<10k 筆記憶）。

## 回填（延遲 + 重新建立索引）

當嵌入模型發生變更時（透過 `embedding_signature` 偵測），會重新建置
向量儲存區，並在 `memories` 資料表中將所有現有記憶標記為
`needs_reindex = 1`。

**延遲回填**：在下一次檢索時，任何缺少向量項目的記憶都會先被嵌入並插入
`vec_memories`，之後才執行搜尋。這能將回填成本分攤到實際請求中，而不會阻塞啟動。

**明確重新建立索引**：`/dashboard/memory` 中的 Engine 分頁提供
「立即重新建立索引」按鈕，該按鈕會呼叫 `POST /api/memory/reindex`。處理常式會呼叫
`src/lib/memory/reindex.ts` 中的 `runReindexBatch()`，每次請求最多處理
`limit` 個待處理項目。可透過 `GET /api/memory/engine-status`
（`vectorStore.needsReindex`）輪詢進度。

`memory_vec_meta` 資料表（遷移 `083_memory_vec.sql`）儲存：

- `active_dim` — 目前的向量維度（null = 尚未校準）。
- `embedding_signature` — 用於偵測變更的 `${source}:${model}:${dim}`。
- `last_reset_at` — 上次完整重設的時間戳記。
- `vec_loaded` — sqlite-vec 是否成功載入的 0/1 旗標。

## 設定擴充

`src/shared/schemas/memory.ts` 中的 `MemorySettingsExtended` 提供九個嵌入與向量欄位，並透過 `src/lib/db/settings.ts` 持久化：

| 欄位                     | 類型                                               | 預設值   | 說明                                            |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | 要使用的嵌入來源                                |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | 採用 `provider/model` 格式的提供者/模型         |
| `customBaseUrl`          | `string \| null`                                   | `null`   | 僅供記憶體使用、與 OpenAI 相容的端點基底 URL    |
| `customModelId`          | `string \| null`                                   | `null`   | 傳送至自訂端點的模型 ID                         |
| `transformersEnabled`    | `boolean`                                          | `false`  | 選擇啟用 Transformers.js（MiniLM，約 400MB）    |
| `staticEnabled`          | `boolean`                                          | `false`  | 選擇啟用本機靜態 potion-base-8M 模型            |
| `rerankEnabled`          | `boolean`                                          | `false`  | 啟用重新排序步驟（每個要求增加 200–500 毫秒）   |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | 採用 `provider/model` 格式的重新排序提供者/模型 |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | 要使用的向量後端                                |

這些設定透過 `GET /PUT /api/settings/memory` 公開（結構描述為 `MemorySettingsExtendedSchema`）。

對於 `remote` 來源，Memory 也接受選用的 `customBaseUrl` 與 `customModelId` 設定。兩者搭配使用時，可在不變更全域嵌入登錄的情況下，選取與 OpenAI 相容的 `/embeddings` 端點與模型。端點在使用前會進行正規化，並由提供者的輸出 URL 政策檢查：必須使用 HTTP(S)、拒絕內嵌認證資訊與查詢字串，而且仍會封鎖雲端中繼資料位址。空值會保留所選的登錄提供者。傳回儀表板的錯誤會經過清理，而且永遠不會記錄端點認證資訊。

> **TODO (D20)：** 本版本尚未實作 `global` 範圍（跨所有 API 金鑰共享記憶）。這需要結構描述變更及全域擷取路徑。請另行追蹤。

## 儲存層

### 主要：SQLite（`memories` 資料表）

由遷移 `015_create_memories.sql` 建立：

| 欄位                        | 類型               | 備註                                                               |
| --------------------------- | ------------------ | ------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | 透過 `crypto.randomUUID()` 產生的 UUID                             |
| `api_key_id`                | `TEXT NOT NULL`    | 所屬 API 金鑰                                                      |
| `session_id`                | `TEXT`             | 選用的各對話範圍                                                   |
| `type`                      | `TEXT NOT NULL`    | `factual`、`episodic`、`procedural`、`semantic` 其中之一           |
| `key`                       | `TEXT`             | 穩定的 upsert 金鑰，例如 `preference:i_prefer_python`              |
| `content`                   | `TEXT NOT NULL`    | 實際的事實文字                                                     |
| `metadata`                  | `TEXT`             | JSON blob（category、extractedAt、source……）                       |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 字串                                                      |
| `expires_at`                | `TEXT`             | 選用的到期時間；`NULL` 表示永久                                    |
| `memory_id`                 | `INTEGER UNIQUE`   | 由 `023_fix_memory_fts_uuid.sql` 新增，用於銜接 UUID 與 FTS5 rowid |

索引：`api_key_id`、`session_id`、`type`、`expires_at`，以及唯一的 `memory_id` 索引。

**Upsert 語意**：`createMemory()` 會尋找具有相同 `(api_key_id, key)` 的現有資料列，並在找到時原地更新（透過淺層展開合併 `metadata`）。這能避免資料表因重複的偏好陳述而無限制增長。

### 全文搜尋（`memory_fts` 虛擬資料表）

`022_add_memory_fts5.sql` 會針對 `content` 與 `key` 建立 FTS5 虛擬資料表。`023_fix_memory_fts_uuid.sql` 修正了 UUID 主鍵無法連結至 FTS5 整數 rowid 的實際問題——此遷移會新增 `memory_id` 欄位、重新建立 FTS 資料表，並接上觸發程序（`memory_fts_ai`、`memory_fts_ad`、`memory_fts_au`），以便在 INSERT、DELETE 及 UPDATE 時保持 FTS 同步。

由 `retrieval.ts` 用於 `semantic` 與 `hybrid` 策略（請見下文）。擷取程式碼會使用 `hasTable("memory_fts")` 進行防護；如果 FTS 資料表不存在或 FTS 查詢擲回錯誤，則會退回按時間順序排列。

### 選用：Qdrant（向量儲存層級 2）

`src/lib/memory/qdrant.ts` 實作了選用的 Qdrant 整合，作為層級 2 向量儲存。只有在引擎選擇器 `memoryVectorStore === "qdrant"` 時，擷取才會路由至 Qdrant——預設值 `"auto"`（以及 `"sqlite-vec"`）**絕不會**選取 Qdrant。Engine 分頁的切換開關會同時設定 `qdrantEnabled` 與 `memoryVectorStore`：啟用時會將 Qdrant 設為主要儲存區，停用時則重設為 `"auto"`（#5597——在該修正之前，啟用不會產生作用，因為沒有任何程式碼會寫入引擎選擇器）。如果無法連線至 Qdrant 或其未傳回任何內容，擷取會依序退回至 sqlite-vec → FTS5。

- `upsertSemanticMemoryPoint()` — 使用已設定的嵌入模型嵌入 `key + content`、確保集合存在（首次使用時建立餘弦距離向量），並以承載資料 `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` 更新插入一個點。
- `searchSemanticMemory(query, topK, scope)` — 嵌入查詢、搜尋集合，並以 `kind = "omniroute_memory"` 篩選，也可選擇依
  `apiKeyId` / `sessionId` 篩選。將 `topK` 限制在 `[1, 20]` 範圍內。
- `deleteSemanticMemoryPoint(id)` — 刪除單一點。在 SQLite 資料列移除後，由
  `deleteMemory()` 呼叫（D15）。
- `cleanupSemanticMemoryPoints({retentionDays})` — 批次刪除 `expiresAtUnix` 已過期，或 `createdAtUnix` 早於保留期限截止時間的點。會先計數，讓儀表板可顯示實際數量。
- `checkQdrantHealth()` — 使用 `GET /readyz` 進行健康狀態探查並測量延遲。

設定 UI 在 `/dashboard/memory` 的 **引擎分頁** 中提供 Qdrant 設定、健康狀態檢查、語意搜尋測試及清理功能。截至 v3.8.6，`src/app/api/settings/qdrant/` 下的對應路由皆已完成連接：

| 路由                                    | 方法          | 說明                   |
| --------------------------------------- | ------------- | ---------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | 讀取／更新 Qdrant 設定 |
| `/api/settings/qdrant/health`           | `GET`         | 存活探查＋延遲         |
| `/api/settings/qdrant/search`           | `POST`        | 語意搜尋測試           |
| `/api/settings/qdrant/cleanup`          | `POST`        | 移除已過期／過舊的點   |
| `/api/settings/qdrant/embedding-models` | `GET`         | 列出可用的嵌入模型     |

**行為注意事項（預期行為）：**

- **引擎選擇** — 在引擎分頁中啟用 Qdrant 會使其成為主要儲存區（設定 `memoryVectorStore="qdrant"`）；停用時會重設為 `"auto"`（#5597）。
- **不回填** — 只有在啟用 Qdrant **之後**建立／更新的記憶才會寫入其中（即發即忘的雙重寫入）。既有的 SQLite 記憶**不會**遷移；「立即重新建立索引」只會重建 sqlite-vec 索引，不會重建 Qdrant。
- **向量維度會自動偵測**，來源是首次使用時的實際嵌入，因此沒有需要填寫的維度欄位。在集合已存在後變更嵌入模型，系統**不會**自動處理：既有集合會保持不變，維度不符的寫入／搜尋會失敗，並退回使用 sqlite-vec。若要切換嵌入器，請重新建立集合（使用新名稱，或在 Qdrant 中將其刪除）。
- **距離度量** — 一律為**餘弦**（建立集合時硬式編碼；無法設定）。
- **驗證** — 僅支援 API 金鑰（透過 `api-key` 標頭傳送；對未經驗證的本機 Docker 而言為選用）。不使用 JWT/RBAC。
- **設定欄位** — UI 提供 `host`、`port`、`collection`、`embeddingModel`、`apiKey`。`vectorSize` / `hnswEfConstruct` 僅可透過環境變數／資料庫設定，而 `vectorSize` 不會用於建立集合（維度來自嵌入）。

### 向量量化（int8 — 選用，兩種後端皆支援）

兩種向量後端皆支援**選用的 int8 量化**，可減少已儲存向量的記憶體占用（比 Float32 小約 4 倍），但會略微降低召回率。兩者的預設值皆為**關閉**；除非明確啟用，否則向量會保持完整精度。

| 後端       | 設定                             | 類型                           | 預設值   | 讀取位置                                                    |
| ---------- | -------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization`（DB 鍵）    | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION`（env） | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** 透過 `qdrantQuantization` 設定鍵逐一設定各執行個體（在 `PUT /api/settings/qdrant` 中公開為 `quantization` 欄位）。當值為 `"int8"` 時，`buildQuantizationConfig()` 會要求純量量化（`always_ram`、分位數 `0.99`），且搜尋會啟用 `rescore: true`，使完整精度向量能進一步精煉 int8 候選集合。
- **sqlite-vec** 量化**僅能透過環境變數設定**（不是 DB 設定）：設定 `MEMORY_VEC_QUANTIZATION=int8`，即可透過 `vec_quantize_int8(?, 'unit')` 將本機向量儲存為 `int8[dim]` 欄位。所選模式會併入 `embedding_signature`（`:int8` 後綴），因此切換模式會觸發 `vec_memories` 資料表的完整重新索引——使用的延遲回填路徑與嵌入模型變更時相同。

## 記憶類型

`MemoryType` (`src/lib/memory/types.ts`)：

| 類型         | 用途                                               |
| ------------ | -------------------------------------------------- |
| `factual`    | 偏好、穩定的使用者事實、行為模式                   |
| `episodic`   | 與特定時刻相關的決策（「我選擇了 Postgres」）      |
| `procedural` | 工作流程／操作方式記憶（保留；目前沒有自動擷取器） |
| `semantic`   | 保留供向量儲存區項目使用                           |

`MemoryConfig` 的擷取策略為 `exact`、`semantic` 或 `hybrid` 之一，
而範圍則為 `session`、`apiKey` 或 `global` 之一。
`getMemorySettings()` 的預設範圍是 `apiKey`。

## 事實擷取（`extraction.ts`）

擷取是**以正規表示式為基礎**，而非以 LLM 為基礎——它會在程序內使用
`setImmediate()` 執行，因此絕不會阻塞回應串流：

- **偏好模式** → `MemoryType.FACTUAL`
  （例如 `I prefer …`、`I really like …`、`my favorite is …`、`I hate …`）
- **決策模式** → `MemoryType.EPISODIC`
  （例如 `I'll use …`、`I chose …`、`I went with …`、`I'm going to adopt …`）
- **行為模式** → `MemoryType.FACTUAL`
  （例如 `I usually …`、`I always …`、`I tend to …`）

每個比對結果都會經過清理（`trim`、合併空白字元、上限為 500 個字元），
使用穩定的 `factKey(category, content)` 在批次內去除重複項目，並透過
`createMemory()` 儲存，且附帶中繼資料
`{category, extractedAt, source: "llm_response"}`。輸入文字的上限為
64 KiB（`MAX_EXTRACTION_TEXT_LENGTH`）——若超出此長度，則會使用文字的
**尾端**，確保最近的助理內容一律會參與擷取。

`extractFactsFromText(text)` 會匯出供測試使用，並傳回結構化事實而不儲存它們。

## 擷取（`retrieval.ts`）

`retrieveMemories(apiKeyId, config)` 是主要進入點。它會：

1. 透過 `MemoryConfigSchema` 正規化並驗證設定。
2. 當 `enabled` 為 false 或 `maxTokens <= 0` 時，立即傳回 `[]`。
3. 將 `maxTokens` 限制在 `[1, 8000]` 範圍內。
4. 偵測現代的 `memories` 資料表是否存在（相對於舊版的 `memory`
   資料表），以確保較舊的資料庫仍可正常運作。
5. 使用到期保護條件
   （`expires_at IS NULL OR datetime(expires_at) > datetime('now')`）建立基礎查詢，
   並視需要加入工作階段範圍及 `retentionDays` 截止條件。
6. 根據策略分支：
   - **`exact`**（預設）：依時間排序的 `ORDER BY created_at DESC LIMIT 100`。
   - **`semantic`**：若 `config.query` 存在且 `memory_fts` 存在，則使用
     `memory_fts MATCH ?` 進行 JOIN，並依 FTS 排名排序；當 FTS 傳回 0 列時，
     回退至依時間排序。
   - **`hybrid`**：合併 FTS 結果（相關性較高）與依時間排序的集合，
     並依 id 去除重複項目。
7. 提供查詢時，會針對 `content`、`key` 及 `metadata` JSON 計算關鍵字相關性分數
   （`getRelevanceScore`）。分數為零的資料列會被篩除。
8. 先依分數降冪排序，再依 `createdAt` 降冪排序。
9. 逐一檢查已排序的清單，並在累計的 `estimateTokens(content)`
   （約為 `length / 4`）維持在預算內時接受項目。只要有任何符合的項目，
   就一律至少傳回一個項目。

`estimateTokens` 會匯出，並由擷取、摘要及 MCP
`omniroute_memory_search` 工具使用。

## 注入（`injection.ts`）

`injectMemory(request, memories, provider)`：

1. 將所有記憶內容合併為單一 `Memory context: …` 字串。
2. 根據提供者名稱選擇策略：
   - **系統訊息**（OpenAI、Anthropic、Gemini 等的預設值）— 在任何現有系統訊息之前插入
     `{role: "system", content: memoryText}`，讓使用者的系統提示仍具有較高優先權。
   - **使用者訊息**（備援）— 適用於
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` 中的提供者：`o1`、`o1-mini`、`o1-preview`、
     `glm`、`glmt`、`glm-cn`、`zai`、`qianfan`。這些提供者不接受系統角色，
     否則會回傳 400 錯誤（關於 GLM/Zhipu，請參閱 issue #1701）。
3. 在 `memory.injection.injected` 下記錄數量、策略及模型。

`providerSupportsSystemMessage(provider)` 已匯出，供需要自行進行
路由決策的呼叫端使用。為安全起見，未知提供者預設為 `true`
（允許系統角色）。

## 設定（`settings.ts`）

記憶體設定**儲存在 DB 設定資料表中**，而非環境變數中。
`getMemorySettings()` 會從 `getSettings()` 讀取並在處理程序內快取結果；
設定 PUT 路由會在寫入後呼叫 `invalidateMemorySettingsCache()`。

### 舊版欄位（所有版本）

| DB 鍵                 | 類型   | 預設值                                            | UI 控制項                                |
| --------------------- | ------ | ------------------------------------------------- | ---------------------------------------- |
| `memoryEnabled`       | 布林值 | `false`（自 v3.8.30 起預設關閉）                  | 開啟／關閉記憶體                         |
| `memoryMaxTokens`     | 整數   | `2000`（範圍 `0–16000`）                          | 注入的權杖預算                           |
| `memoryRetentionDays` | 整數   | `30`（範圍 `1–365`）                              | 保留期間                                 |
| `memoryStrategy`      | 列舉   | `"hybrid"`（`recent`、`semantic`、`hybrid` 之一） | 擷取策略                                 |
| `skillsEnabled`       | 布林值 | `false`                                           | 切換每個鍵的技能注入（請參閱 SKILLS.md） |

注意：UI 策略 `"recent"` 會透過 `toMemoryRetrievalConfig()` 對應至內部的 `"exact"` 擷取
策略（依時間順序）。

### 新欄位（v3.8.6，計畫 21 D9）

另請參閱上方的「設定擴充」章節，以瞭解欄位說明。

| DB 鍵                       | API 欄位                 | 預設值   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

與 Qdrant 相關的 DB 鍵（`qdrantEnabled`、`qdrantHost`、`qdrantPort`、
`qdrantApiKey`、預設為 `"omniroute_memory"` 的 `qdrantCollection`、
預設為 `"openai/text-embedding-3-small"` 的 `qdrantEmbeddingModel`）由
`qdrant.ts` 中的 `normalizeQdrantConfig()` 讀取。

### 環境變數（v3.8.6）

六個選用的環境變數可調整引擎的執行階段行為（記錄於 `.env.example`）：

| 變數                            | 預設值                     | 說明                                                                                                     |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | 嵌入快取 TTL（5 分鐘）                                                                                   |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | 嵌入 LRU 快取中的項目數上限                                                                              |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js 模型的 HF 儲存庫                                                                         |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | 靜態 potion 模型的 HF 儲存庫                                                                             |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | 儲存已下載模型的位置                                                                                     |
| `MEMORY_VEC_TOP_K`              | `20`                       | 向量搜尋的預設 top-K                                                                                     |
| `MEMORY_RRF_K`                  | `60`                       | 混合搜尋的 RRF k 常數                                                                                    |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | 設為 `int8`，以量化方式儲存本機 sqlite-vec 向量（約縮小 4 倍；需選擇啟用）。變更模式會強制重新建立索引。 |

## 摘要化 (`summarization.ts`)

當某個金鑰的記憶所累積的 token 總數超出預算時，`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` 會壓縮較舊的內容。它會依 `created_at` 降冪逐列迭代，保留符合預算的資料列，並將其餘資料列的 `content` 就地替換為原始內容的前三個句子。`tokensSaved` 是新舊內容之間 `estimateTokens` 的差值。

此常式目前**可用，但不會由現行聊天管線自動呼叫**——若需要持續壓縮，請透過 cron、管理員操作，或 `MemoryConfig.autoSummarize` 的銜接程式碼呼叫。資料遺失是單向的：原始文字會遭到覆寫。

## REST API

所有端點都需要管理驗證 (`requireManagementAuth`)。

### 核心記憶端點（現有 + 已更新）

| 方法     | 路徑                 | 說明                                                                                                                                                                    |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | 支援篩選條件的分頁清單：`apiKeyId`、`type`、`sessionId`、`q`、`limit`、`page`、`offset`。回應包含 `stats.total`、`stats.tokensUsed`、`stats.hitRate`、`cacheStats`      |
| `POST`   | `/api/memory`        | 建立項目（經 Zod 驗證：`content`、`key`，以及選用的 `type`、`sessionId`、`apiKeyId`、`metadata`、`expiresAt`）。呼叫 `createMemory()`，依 `(apiKeyId, key)` 執行 upsert |
| `GET`    | `/api/memory/[id]`   | 依 UUID 擷取單一項目                                                                                                                                                    |
| `PUT`    | `/api/memory/[id]`   | 更新項目欄位（`type`、`key`、`content`、`metadata`）。請求主體：`MemoryUpdatePutSchema`。若可取得嵌入來源，也會同步向量。                                               |
| `DELETE` | `/api/memory/[id]`   | 刪除項目；同時也會從 `vec_memories` (D15) 刪除，並盡力從 Qdrant 刪除。找不到時回傳 404。                                                                                |
| `GET`    | `/api/memory/health` | 執行 `verifyExtractionPipeline("health-check")`——完成建立→列出→刪除的往返測試。回傳 `{working, latencyMs, error?}`                                                      |

### 新記憶引擎端點（計畫 21）

| 方法   | 路徑                              | 說明                                                                                                                              |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories` 的試執行——回傳包含分數、層級與 token 數的排序結果。請求主體：`RetrievePreviewSchema`。**不會**注入或修改記憶。 |
| `GET`  | `/api/memory/embedding-providers` | 列出提供嵌入模型的提供者，並指出哪些提供者已設定 API 金鑰。                                                                       |
| `GET`  | `/api/memory/engine-status`       | 回傳完整的引擎狀態：關鍵字層級、嵌入解析、向量儲存區統計資料、Qdrant 健全狀態、重新排序設定。結構：`MemoryEngineStatusSchema`。   |
| `POST` | `/api/memory/summarize`           | 手動觸發記憶壓縮。請求主體：`MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`)。回傳 `{candidates, tokensSaved}`。  |
| `POST` | `/api/memory/reindex`             | 觸發 `needs_reindex=1` 記憶的向量重新索引。請求主體：`MemoryReindexSchema` (`force`)。回傳 `{started, pending}`。                 |

### 設定端點

| 方法   | 路徑                                    | 說明                                                                                    |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/memory`                  | 目前正規化的 `MemorySettingsExtended`（7 個新欄位 + 舊有欄位）                          |
| `PUT`  | `/api/settings/memory`                  | 更新 `MemorySettingsExtendedSchema` 中的任意欄位（共 12 個欄位）                        |
| `GET`  | `/api/settings/qdrant`                  | 目前的 Qdrant 設定 (`QdrantSettingsSchema`)                                             |
| `PUT`  | `/api/settings/qdrant`                  | 更新 Qdrant 設定。請求主體：`QdrantSettingsUpdateSchema`。`apiKey` = 空字串會移除金鑰。 |
| `GET`  | `/api/settings/qdrant/health`           | 對已設定的 Qdrant 執行個體進行存活探測。回傳 `QdrantHealthResultSchema`。               |
| `POST` | `/api/settings/qdrant/search`           | 對 Qdrant 進行語意搜尋測試。請求主體：`QdrantSearchSchema` (`query`, `topK`)。          |
| `POST` | `/api/settings/qdrant/cleanup`          | 移除 Qdrant 中已過期／過舊記憶的資料點。                                                |
| `GET`  | `/api/settings/qdrant/embedding-models` | 列出可供 Qdrant 使用的嵌入模型。                                                        |

`/api/memory` 清單查詢支援使用以 `page` 為基礎的分頁 (`parsePaginationParams`)，**或**使用原始 `offset`——當提供 `offset` 時，它會優先套用，並計算衍生的 `page` 以符合回應結構。

## MCP 工具 (`open-sse/mcp-server/tools/memoryTools.ts`)

啟用 MCP 伺服器時，會註冊三個記憶工具：

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → 封裝 `retrieveMemories()`。自 v3.8.6 (D16) 起，`strategy` 會從
  `getMemorySettings()` 讀取，而非硬編碼為 `"exact"`。如果提供了
  `query`，且 `strategy` 為 `semantic` 或 `hybrid`，則會在向量儲存區
  可用時使用它。
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → 封裝 `createMemory()`。僅接受 4 種標準類型：
  `factual`、`episodic`、`procedural`、`semantic` (D17)。
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → 列出符合條件的
  項目，可選擇依早於指定時間建立的時間戳篩選，然後透過
  `deleteMemory()` 逐一刪除（這也會從 sqlite-vec + Qdrant 移除向量）。

如需傳輸與範圍的詳細資訊，請參閱 [MCP-SERVER.md](./MCP-SERVER.md)。

## 儀表板（記憶工作室）

`src/app/(dashboard)/dashboard/memory/page.tsx` 現在是一個**具備 3 個分頁的工作室**：

### 分頁：記憶

- 概念卡片（可收合的「運作方式」說明）。
- 即時清單、搜尋與分頁（300 ms 防抖）。
- 類型篩選器（`factual` / `episodic` / `procedural` / `semantic` / 全部）。
- 新增記憶對話框（鍵、內容、類型）。
- 行內編輯（鉛筆按鈕 → `PUT /api/memory/[id]`）。
- 逐列刪除（含確認對話框）。
- 匯出目前頁面的 JSON；透過檔案選擇器匯入 JSON。
- 統計卡片：`totalEntries`、`tokensUsed`、`hitRate`。
- 「壓縮舊記憶」按鈕 → `POST /api/memory/summarize`（先進行試執行並顯示
  候選項目數量，然後要求確認）。
- 由 `GET /api/memory/health` 驅動的綠色／紅色健康狀態指示點。

### 分頁：遊樂場

- 查詢輸入 + 策略選擇器（精確 / 語意 / 混合）+ 詞元預算。
- 「模擬」→ `POST /api/memory/retrieve-preview` — 顯示排序後的結果，以及
  `score`、`tier`、`tokens`、`vecScore`、`ftsScore`。
- 解析面板，顯示使用了哪個嵌入來源／向量儲存區，以及是否發生備援。

### 分頁：引擎

- 引擎狀態面板（關鍵字 FTS5 標籤、嵌入標籤、向量儲存區標籤、
  Qdrant 健康狀態標籤、重新排序標籤）。
- 「立即重新建立索引」按鈕 → `POST /api/memory/reindex`。
- 嵌入來源選擇器（自動 / 遠端 / 靜態 / transformers + 切換開關）。
- Qdrant 設定卡片（啟用切換開關、主機／連接埠／集合／金鑰、測試連線、
  語意搜尋測試、清理）。
- 重新排序設定卡片（啟用切換開關、提供者／模型選擇器）。

記憶與 Qdrant 設定也位於
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`)，作為
舊版／全域設定介面。

## 快取

`src/lib/memory/store.ts` 維護一個程序內、類 LRU 的快取
（`MEMORY_CACHE_TTL = 1 min`、`MEMORY_MAX_CACHE_SIZE = 500`，並淘汰最舊的 20 %
項目），用於 `getMemory(id)` 讀取；此外還有一個通用鍵／值
`memoryCache` 層（`src/lib/memory/cache.ts`），提供 `get`/`set`/`invalidate`
方法，供需要自有範圍快取的呼叫端使用（1 000 個項目的 LRU，
預設 TTL 為 5 min）。

## 隱私權與生命週期

- 記憶的擁有者是 API 金鑰 ID（`chatCore.ts` 中的 `resolveMemoryOwnerId`）。若沒有 `apiKeyInfo.id`，檢索、注入及擷取皆不會執行。
- `expires_at` 為未來時間的項目會從檢索結果中排除；超過 `retentionDays` 的舊項目則會由 `retrieveMemories` 中的 `created_at >= cutoff` 子句排除。
- 若要永久刪除，請使用 `DELETE /api/memory/[id]` 或 `omniroute_memory_clear`。
- 擷取會透過 `setImmediate` 以發送後不等待結果的方式執行；失敗會記錄於 `memory.extraction.background.failed`，且絕不會回傳給呼叫端。
- 驗證往返流程（`verifyExtractionPipeline`）會在 `finally` 區塊中清除自己的測試項目。

## 另請參閱

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` 設定會連同記憶一起注入工具定義。
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP 傳輸／範圍。
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 更廣泛的 API 介面。
- 原始碼模組：
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + 混合式 RRF
  - `src/lib/memory/embedding/index.ts` — 多來源嵌入層
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — 所有記憶 API 主體的 Zod 綱要
  - `src/shared/schemas/qdrant.ts` — Qdrant 設定／操作的 Zod 綱要
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` 的 CRUD
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
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI（頁面 + 元件 +
    分頁 + hooks）
  - `open-sse/handlers/chatCore.ts`（注入／擷取接線）
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## 選擇嵌入提供者（v3.8.16+）

OmniRoute 的記憶引擎支援**四種嵌入來源**（`src/lib/memory/embedding/`）。每一種在**延遲、成本、模型品質與設定複雜度**方面各有取捨。

### 嵌入來源

| 提供者         | 來源                                      | 延遲                             | 成本                 | 品質                     | 設定                       |
| -------------- | ----------------------------------------- | -------------------------------- | -------------------- | ------------------------ | -------------------------- |
| `transformers` | 本機 ONNX 模型（Xenova/all-MiniLM-L6-v2） | 約 50-150ms（CPU）               | 免費                 | 良好                     | 僅需 `npm install`         |
| `static`       | 預先計算的向量（已快取）                  | <1ms                             | 免費                 | 不適用（取決於快取命中） | 無                         |
| `remote`       | OpenAI / Cohere / Voyage API              | 約 100-300ms                     | $0.02-0.10/1M tokens | 極佳                     | API 金鑰                   |
| `auto`         | 在執行階段選擇最佳可用來源                | 與所選來源相同                   | 免費                 | 與所選來源相同           | 無                         |
| _(cache)_      | 位於任何來源之上的記憶體內 LRU 層         | <1ms（命中），完整延遲（未命中） | 免費                 | 與底層來源相同           | 永遠啟用（不可選取的來源） |

### 決策樹

```
                  您的部署環境為何？
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  開發／測試   小型正式環境   大型正式環境   邊緣／離線
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  （免費、無需 API）          （最佳品質）    （無需網際網路）
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            一律在最上層新增 `cache` 層
            （LruCache 會包裝任何提供者）
```

### 資料庫與 API 組態

記憶嵌入選項是透過設定 API/UI 進行配置，而非環境變數。設定中相關的資料庫鍵（`src/lib/memory/settings.ts` 內的 `normalizeMemorySettings`）如下：

- `memoryEmbeddingSource`：`"transformers"`（本機）、`"remote"`（以 API 為基礎，例如 OpenAI）、`"static"`（外部儲存區）或 `"auto"`
- `memoryEmbeddingProviderModel`：遠端／靜態來源的模型識別碼（例如 `"text-embedding-3-small"`）
- `memoryTransformersEnabled`：`true` | `false`
- `memoryStaticEnabled`：`true` | `false`
- `memoryVectorStore`：`"sqlite-vec"`、`"qdrant"` 或 `"auto"`

#### 本機模型（`transformers`）

在內部使用 transformers.js 執行本機模型：

```bash
# 程式碼中讀取的環境變數（src/lib/memory/embedding/index.ts）：
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF 模型儲存庫
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF 靜態 potion 模型
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # 快取目錄
```

#### LRU 嵌入快取

快取預設永遠啟用，並透過環境變數進行配置：

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # 快取項目上限
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL（5 分鐘）
```

### 效能數據

在典型的 4 核心 x86 伺服器上進行基準測試（每段文字約 100 個 token）：

| 提供者               | p50   | p95   | p99   | 每 100 萬個嵌入向量的成本            |
| -------------------- | ----- | ----- | ----- | ------------------------------------ |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | 免費                                 |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | 約 $0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | 視 Qdrant 託管服務而定               |
| `cache`（命中）      | <1ms  | <1ms  | 2ms   | 免費                                 |

---

## 事實擷取模式 (v3.8.16+)

`extraction.ts` 模組 (`src/lib/memory/extraction.ts`) 使用**正規表示式模式比對**，從對話訊息中擷取結構化事實。瞭解這些模式有助於針對您的使用案例調整擷取品質。

### 預設模式類別

| 類別                | 模式範例                                             | 擷取內容             |
| ------------------- | ---------------------------------------------------- | -------------------- |
| PREFERENCE_PATTERNS | `"我偏好 <X>"`、`"我喜歡 <X>"`、`"我討厭 <X>"`       | 使用者偏好           |
| DECISION_PATTERNS   | `"我會使用 <X>"`、`"我決定要 <X>"`、`"我選擇了 <X>"` | 使用者決策（情節性） |
| PATTERN_PATTERNS    | `"我通常 <X>"`、`"我總是 <X>"`、`"我從不 <X>"`       | 持續性的行為模式     |

### 模式範例（簡化版）

```ts
// 來自 src/lib/memory/extraction.ts
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

### 會擷取哪些內容

當使用者說：

> 「我偏好 TypeScript。這個專案我會使用 Postgres。我總是在推送前提交。我不喜歡 Python。」
> 擷取會產生 4 筆記憶：
>
> | 鍵值                                 | 類別       | 類型     | 內容                        |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### 擷取限制

為避免無限制擷取，會套用以下限制：

| 最小內容長度 | 3 個字元 |
| 最大內容長度 | 500 個字元 |

### 何時停用擷取

只要啟用記憶功能，擷取就會自動執行；沒有獨立的
僅擷取切換選項。若要將其關閉，請完全停用記憶功能（透過 `PUT /api/settings/memory`
設定 `enabled: false`）。請在下列情況考慮這麼做：

- 訊息量很大，且擷取成本不可忽略
- 對話大多是暫時性的（聊天、偵錯），沒有長期價值
- 已透過自訂外掛程式擷取上下文

---

## 混合式 RRF 調校 (v3.8.16+)

**倒數排名融合 (Reciprocal Rank Fusion, RRF)** 演算法會合併 FTS5（關鍵字）與向量（語意）結果。`k` 參數控制給予排名較低結果的權重。

### 公式

對於每個候選記憶，RRF 分數為：

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

其中：

- `k` 是常數（預設為 60）
- `rank_i(d)` 是文件 `d` 在第 i 個擷取系統（FTS、向量）中的排名
- 此總和涵蓋所有擷取系統

### `k` 如何影響結果

| `k` 值               | 效果                                                         | 最適合的情況           |
| -------------------- | ------------------------------------------------------------ | ---------------------- |
| `k=0`                | 純排名融合（無平滑處理）                                     | 理論基準               |
| `k=10-30`            | 大幅提高頂端結果的權重，低排名結果幾乎沒有貢獻               | 前 3 名結果通常正確時  |
| **`k=60`**（預設值） | 平衡——前 10 名結果都有顯著貢獻                               | 通用擷取               |
| `k=100+`             | 更平坦——如果低排名結果出現在多個系統中，甚至也可能占主導地位 | 召回率比精確率更重要時 |

### 實務上調校 `k`

```bash
# 預設值
MEMORY_RRF_K=60

# 積極追求精確率（記憶體小、文件少）
MEMORY_RRF_K=20

# 最大召回率（記憶體大、查詢多樣）
MEMORY_RRF_K=120
```

**`k=20` 的範例：**

- FTS 排名 1 → 貢獻 `1/21 = 0.048`
- FTS 排名 10 → 貢獻 `1/30 = 0.033`
- 向量排名 1 → 貢獻 `0.048`
- 合併後最大值：`0.096`

**`k=60` 的範例：**

- FTS 排名 1 → 貢獻 `1/61 = 0.016`
- FTS 排名 10 → 貢獻 `1/70 = 0.014`
- 向量排名 1 → 貢獻 `0.016`
- 合併後最大值：`0.033`

`k` 越高，排名第 1 與第 10 名之間的**相對差異**越小，因此演算法會更依賴**擷取系統之間的共識**，而不是最高排名的信賴度。

### 何時變更 `k`

| 症狀                               | 建議嘗試                                           |
| ---------------------------------- | -------------------------------------------------- |
| 頂端結果總是勝出，但它是錯的       | **降低** k（例如 20）——最高排名的信賴度更重要      |
| 正確答案在前 5 名內，但不是第 1 名 | **提高** k（例如 100）——更平坦的評分方式會獎勵共識 |
| 召回率高，但精確率低               | **降低** k——讓排名區分更明顯                       |
| 召回率低（遺漏相關文件）           | **提高** k——讓排名較低的文件也有機會               |

### RRF 權重

倒數排名融合會對語意向量排名與全文搜尋排名使用相同權重：

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

沒有可用來調整個別權重的環境變數（`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` 不存在）。

---

## 摘要策略 (v3.8.16+)

`summarization.ts` 模組 (`src/lib/memory/summarization.ts`) 會壓縮較舊的記憶，在保留回憶能力的同時縮小使用中的記憶集。

### 何時觸發摘要

| 觸發方式          | 閾值（預設） |
| ----------------- | ------------ |
| 透過 API 手動觸發 | 不適用       |

### 摘要的內容

`summarization.ts` 匯出兩個進入點：

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — 將工作階段的
  記憶濃縮成單一摘要文字，並限制在指定的 token 預算內。
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API 使用的依時間
  壓縮功能：選取所有早於 `days` 的記憶，從中建立一筆濃縮摘要記憶，並在
  `dryRun` 為 `false` 時刪除原始記憶。傳入 `dryRun: true` 可預覽候選集合與
  token 總數，而不修改任何內容。

此處沒有標籤／鍵值分群步驟，也不會對每筆記憶進行「核心與可摘要」評分 —
選取完全依據時間截止點，而摘要文字則由每個候選項目各自形成一行經濃縮、
帶有類型前綴的內容。

### 觸發摘要

摘要是**手動／選擇性啟用**的 — `autoSummarize` 設定預設為 `false`，
因此不會自動壓縮任何內容。請透過 API 觸發：

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

若要保持停用，只需將 `autoSummarize` 維持在其預設值 (`false`)。

### 摘要品質建議

- **先使用 `dryRun` 預覽** — `summarizeMemoriesOlderThan(..., true)` 會傳回
  候選清單與 token 總數，讓您在刪除原始記憶前確認哪些內容將被合併。
- 如果您擁有大量記憶資料，請**在低流量時段執行摘要** — LLM 呼叫是最耗時的部分

```bash
# Cron 形式：每天凌晨 3 點進行摘要
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend 提供者模式

> **唯一真實來源：** `src/lib/memory/backend.ts`、`src/lib/memory/genericBackend.ts`、`src/lib/memory/manager.ts`
> **測試：** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend 提供者模式在現有的記憶引擎之上導入一層**可插拔的後端抽象層**。記憶系統不再與單一儲存實作綁定，而是支援多種後端（SQLite、Obsidian、Notion、自訂 HTTP 後端），並可設定主要／備援路由。

### 架構

```
┌──────────────────────────────────────────────────────────┐
│                    API 路由                               │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           單例協調器 (manager.ts)                         │
│                                                          │
│  主要 ────► 後端 A  （例如 SQLite）                      │
│  備援 ────► 後端 B  （例如 Obsidian）                    │
│             後端 C  （例如透過 GenericBackend 的 Notion）│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ 後端       │ │ 後端       │ │ 後端 (HTTP)      │
└────────────┘ └────────────┘ └──────────────────┘
```

#### 核心介面 (`backend.ts`)

每個後端都必須實作 `MemoryBackend` 介面：

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // 建立、讀取、更新、刪除
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // 搜尋
  search(config: SearchConfig): Promise<Memory[]>;

  // 健康狀態
  health(): Promise<HealthCheckResult>;

  // 生命週期（選用）
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

此單例協調器會：

- 透過 `register(backend)` **註冊**後端 — 啟動時由 `index.ts` 呼叫
- 透過 `configure(primary, fallbacks)` **設定**主要後端與備援後端
- 將 CRUD／搜尋**路由**至主要後端，失敗時使用備援鏈
- 定期對所有後端執行**健康檢查**

**備援行為：**

| 操作     | 主要後端          | 備援後端                |
| -------- | ----------------- | ----------------------- |
| `create` | ✅ 僅主要後端     | ❌                      |
| `get`    | ✅ 先嘗試主要後端 | ✅ 若為 null 則使用備援 |
| `update` | ✅ 僅主要後端     | ✅ 即發即棄同步         |
| `delete` | ✅ 僅主要後端     | ✅ 即發即棄同步         |
| `list`   | ✅ 僅主要後端     | ❌                      |
| `search` | ✅ 先使用主要後端 | ✅ 發生錯誤時使用備援   |

#### GenericMemoryBackend (`genericBackend.ts`)

一種通用 HTTP 連接器，可將任何 REST API 轉接為 MemoryBackend。適用於：

- **Notion** — 透過 Notion API 連線
- **Obsidian** — 透過 Obsidian Local REST API 連線
- **自訂後端** — 任何公開 RESTful 記憶 API 的服務

**設定：**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // 後端 API 的基礎 URL
  apiKey?: string;           // 用於驗證的 Bearer 權杖
  headers?: Record<string, string>;  // 自訂 HTTP 標頭
  timeout?: number;          // 請求逾時時間（預設：30000ms）
  backendType?: string;      // 用於記錄日誌

  // 端點覆寫（預設使用 REST 慣例）
  endpoints?: {
    search?: string;   // 預設："/memories/search"
    create?: string;   // 預設："/memories"
    list?: string;     // 預設："/memories"
    get?: string;      // 預設："/memories/{id}"
    update?: string;   // 預設："/memories/{id}"
    delete?: string;   // 預設："/memories/{id}"
    health?: string;   // 預設："/health"
  };

  // 查詢參數名稱對應
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // 路徑參數名稱對應
  pathParams?: {
    id?/memoryId?
  };
}
```

**已知後端**已預先設定於 `KNOWN_BACKENDS`：

```typescript
createKnownBackend("obsidian"); // → 指向 localhost:27123 的 GenericMemoryBackend
createKnownBackend("notion"); // → 指向 api.notion.com/v1 的 GenericMemoryBackend
```

#### 內建後端

##### SQLiteBackend (`sqliteBackend.ts`)

預設的主要後端。使用 `src/lib/memory/store.ts` 封裝現有的 SQLite 記憶體儲存區。啟動時會自動註冊。

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

封裝現有的 Obsidian 整合功能（`src/lib/memory/obsidianBackend.ts`）。透過 Obsidian Local REST API 連線至 Obsidian vault。

### 設定

記憶體後端設定儲存在應用程式設定資料表中，並透過 `src/lib/memory/settings.ts` 管理：

| 設定     | 環境／設定鍵             | 預設值     | 說明                  |
| -------- | ------------------------ | ---------- | --------------------- |
| 主要後端 | `memoryPrimaryBackend`   | `"sqlite"` | 主要後端的 ID         |
| 備援後端 | `memoryFallbackBackends` | `[]`       | 依序排列的備援後端 ID |
| 後端設定 | `memoryBackendConfigs`   | `{}`       | 各後端的設定覆寫      |

設定會透過 `normalizeMemorySettings()` 正規化，並快取於 `getMemorySettings()`。

### 初始化流程

```
應用程式啟動
  → index.ts 匯入（副作用）：註冊 SQLiteBackend
  → 從應用程式生命週期呼叫 initMemoryBackends()：
      1. 載入設定（getMemorySettings）
      2. 設定主要後端與備援後端
      3. 初始化所有後端（健康狀態檢查）
      4. 準備接收請求
```

### 新增後端

1. 在 `src/lib/memory/<name>Backend.ts` 中**實作 `MemoryBackend`** 介面
2. 從 `src/lib/memory/index.ts` **匯出**
3. 啟動時使用 `memoryManager.register(yourBackend)` **註冊**
4. 透過設定進行**設定**：將 `memoryPrimaryBackend` 設為後端 ID
5. 以 `src/lib/memory/__tests__/generic-backend.test.ts` 作為參考進行**測試**

#### 範例：Brain 後端

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

### 驗證

#### 單元測試

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

預期輸出：**35 項測試，全部通過**，涵蓋：

- 建構函式（2）
- 健康狀態檢查（4）— 成功、失敗 500、網路錯誤、延遲
- 初始化（2）— 成功、失敗
- 建立（2）— 預設端點、自訂端點
- 取得（4）— 成功、404 → null、非 404 時擲出例外、自訂路徑參數
- 更新（2）— 成功、404 → false
- 刪除（2）— 成功、404 → false
- 列出（2）— 查詢參數、自訂參數名稱
- 搜尋（3）— 查詢參數、自訂端點、選項序列化
- 驗證標頭（2）— Bearer 權杖、自訂標頭
- 工廠函式（1）

#### 類型檢查

```bash
npm run typecheck:core
```

預期結果：**0 個錯誤**。
