# Cluster Decisions — Optional Sidecar Profiles (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md)

---

**狀態：** 提案（等待 @diegosouzapw 審查）
**日期：** 2026-06-20
**參考：** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932)、PR #4381

## TL;DR

為 [`docker-compose.yml`](../../docker-compose.yml) 中現有的 8 服務部署提供兩個選擇性啟用的 Compose profiles（`memory`、`bifrost`）。預設啟動行為**維持不變**：3 個 `omniroute` 副本 + Caddy + Redis + CliproxyAPI。兩個新 profiles 會將 Qdrant 與 Bifrost 新增為選用的 sidecars，並透過 `docker compose --profile <name> up` 控制啟用。**不會移除或取代任何現有服務。**

## 為何這是保守的做法

OmniRoute 現有的部署架構已經精簡且經過驗證：

- **`redis:7-alpine`** 可在正式環境規模下處理速率限制／快取工作負載。
- **SQLite + sqlite-vec + FTS5** 涵蓋本機記憶體 + 向量 + 文字搜尋（請參閱 [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)）。
- **Caddy** 已經是負載平衡器 + TLS 終止器（[`docker-compose.yml`](../../docker-compose.yml)）。
- **Bifrost** 已在 [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 中整合為 Tier-1 路由器（具有透過 `BIFROST_ENABLED` 環境變數控制之緊急停用開關的 sidecar proxy——設為 `=0` 即可繞過 sidecar，並回退至 TS 路徑）。

此處的兩個 profiles 是**針對觸及 SQLite 效能上限之部署所提供的橫向擴充選項**，而非遷移方案。兩者預設皆為停用。

## 兩個 profiles

### `memory` — Qdrant 向量記憶體 Sidecar

**適合啟用的情況：**

- 每個部署有 > 1M 個 embeddings（sqlite-vec 在大規模下開始變慢）。
- 多副本部署需要在 `omniroute-1/2/3` 之間共享向量狀態。
- 已有外部 Qdrant 叢集（Qdrant Cloud、自行部署）。

**新增內容：**

| 服務     | 映像檔                  | 連接埠      | 備註                                             |
| -------- | ----------------------- | ----------- | ------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW 索引；持久化 volume `omniroute_qdrant_data` |

**啟用方式：** 在設定 UI 中將 `qdrantEnabled = true`，**或**設定 `QDRANT_HOST=qdrant` 環境變數。優先順序規則請參閱 [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts)（設定資料表 → 環境變數 → 預設值）。

**環境變數：** `QDRANT_HOST`、`QDRANT_PORT`、`QDRANT_API_KEY`、`QDRANT_COLLECTION`、`QDRANT_VECTOR_SIZE`、`QDRANT_HNSW_EF_CONSTRUCT`（請參閱 `.env.example` 第 1672-1683 行）。

### `bifrost` — Bifrost Tier-1 路由器 Sidecar

**適合啟用的情況：**

- 執行 ≥3 個 `omniroute` 副本，且希望將提供者輪替集中於單一 Go 程序中。
- 希望所有副本對上游提供者發出的請求都使用單一稽核／記錄介面。
- 希望 Tier-1 路由層能獨立於 OmniRoute 副本進行橫向擴充。

**新增內容：**

| 服務      | 映像檔                            | 連接埠 | 備註                                                                     |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | 以 Go 為基礎的 Tier-1 路由器；持久化日誌 volume `omniroute_bifrost_logs` |

**啟用方式：** 在 `.env.example` 中設定 `BIFROST_BASE_URL=http://bifrost:8080`。位於 [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 的現有 sidecar proxy 路由（於 PR #4381 新增）將自動採用此設定。

**環境變數：** `BIFROST_BASE_URL`、`BIFROST_API_KEY`、`BIFROST_STREAMING_ENABLED`、`BIFROST_TIMEOUT_MS`（請參閱 `.env.example` 第 1685-1695 行）。

## 此 PR 明確不執行的事項

原始 issue 討論串曾提出規模更大的叢集重寫方案。在稽核實際工作負載型態後，基於下列原因，以下項目均遭到**否決**：

| 元件                                 | 結論     | 原因                                                                                                  |
| ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **捨棄** | `redis:7-alpine` 已足以應付正式環境規模下的速率限制工作負載；沒有需要突破的效能上限。                 |
| **NATS**                             | **捨棄** | 每個 `omniroute` 複本都是單一 Node.js 程序；不存在多程序發布／訂閱工作負載。                          |
| **PostgreSQL**                       | **捨棄** | SQLite + sqlite-vec + FTS5 足以涵蓋全部 3 種使用情境；97 個遷移加上 Electron 封裝，使遷移方案不可行。 |
| **Neo4j**                            | **捨棄** | 路由只是 5 個資料表的聯結；SQLite 的遞迴 CTE 已經足夠。                                               |
| **MinIO**                            | **捨棄** | 沒有數 MB 大小的 blob 工作負載；圖片／音訊僅透過代理轉送。                                            |
| **pgvector / pg_ai / pg_textsearch** | **捨棄** | 原因與 PostgreSQL 相同，受限於 SQLite 的效能上限；pgvector 生態系統較為零散。                         |
| **HAProxy / Envoy**                  | **捨棄** | Caddy 已提供負載平衡 + TLS；兩者皆已被明確否決作為第一級路由器（請參閱 `AGENTS.md`）。                |

若未來有使用情境證實需要其中任一項目，應在此文件中進行修訂。

## 4 週推出計畫（若獲核准）

1. **第 1 週** — 合併此 PR，並使用含 3 個複本的 compose 堆疊驗證選擇性啟用的設定檔。
2. **第 2 週** — 針對 OpenAI/Claude/Gemini/Ollama（14 個以上提供者中的 4 個）全面啟用 Bifrost，使用 [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 的 sidecar 代理路由（由 `BIFROST_ENABLED` 控制，並可在執行階段緊急停用）。
3. **第 3 週** — 在單一測試部署中啟用 Qdrant 記憶體設定檔；測量其相較於 sqlite-vec 的延遲差異。
4. **第 4 週** — 可觀測性健康檢查（`docker compose ps` 結束代碼 + `wget` 煙霧測試）；依 ADR-041 重新整理 71 項支柱。

## 此 PR 中變更的檔案

| 檔案                                               | 變更                                                                                                                                                                                                  |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 行：`memory` 設定檔（Qdrant）、`bifrost` 設定檔（Bifrost）、持久性磁碟區、健康檢查。                                                                                                              |
| `.env.example`                                     | +24 行：`QDRANT_*`（6 個變數）、`BIFROST_*`（4 個變數）。                                                                                                                                             |
| `docs/reference/ENVIRONMENT.md`                    | 在第 25 節新增 6 列 `QDRANT_*` 環境變數。                                                                                                                                                             |
| `src/lib/memory/qdrant.ts`                         | +33 行：為 `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` 新增環境變數後援鏈（設定 → 環境變數 → 預設值）。 |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 行：新增 9 個測試案例，以固定環境變數後援的優先順序。                                                                                                                                             |
| `docs/architecture/cluster-decisions.md`（此檔案） | 新增 — 選擇性啟用設定檔的決策紀錄。                                                                                                                                                                   |
| `AGENTS.md`                                        | +1 行：在參考文件表格中新增指向此文件的連結。                                                                                                                                                         |

**實際異動的程式碼：**4 個正式環境檔案（`docker-compose.yml`、`qdrant.ts`、`.env.example`、`ENVIRONMENT.md`）、1 個測試檔案（`qdrant-wiring.test.ts`）、2 個文件檔案（`cluster-decisions.md`、`AGENTS.md`）。
