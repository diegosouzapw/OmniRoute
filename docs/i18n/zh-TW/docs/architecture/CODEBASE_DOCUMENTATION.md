---
title: "OmniRoute 程式碼基礎文件"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute 程式碼基礎文件

> **版本：** v3.8.0
> **最後更新：** 2026-06-28
> **讀者對象：** 為 OmniRoute 貢獻程式碼或在其之上建立整合的工程師。
>
> 如需高階架構圖表及各子系統背後的設計理念，請參閱 [ARCHITECTURE.md](./ARCHITECTURE.md)。如需深入了解各子系統（Auto Combo、MCP 伺服器、A2A 伺服器、技能、記憶體、雲端代理、韌性、壓縮等），請參閱 `docs/` 目錄中的對應文件。

本文說明 **當前儲存庫中的內容**，使新進工程師能夠瀏覽目錄結構、理解執行時期分層，並知道在何處新增程式碼，而不需要自行發明新模組。

---

## 1. 技術棧

| 面向         | 選擇                                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Web 框架     | **Next.js 16**（App Router，standalone 輸出，無全域中介軟體）                                                              |
| 語言         | **TypeScript 6.0+** — 目標 `ES2022`，`module: esnext`，`moduleResolution: bundler`，`strict: false`                       |
| 執行時期     | **Node.js** `>=22.22.2 <23` 或 `>=24.0.0 <27`（透過 `engines` + `SUPPORTED_NODE_RANGE` 強制）                               |
| 資料庫       | **SQLite** 透過 `better-sqlite3`（單例，WAL 日誌模式）                                                                      |
| 桌面應用     | **Electron 41** + `electron-builder` 26.10（獨立 workspace 位於 `electron/`）                                               |
| 測試         | **Node 原生測試執行器**（單元/整合測試），**Vitest**（MCP、autoCombo、快取），**Playwright**（e2e + protocols-e2e）         |
| 建置         | Next.js standalone 透過 `scripts/build/build-next-isolated.mjs`                                                            |
| 程式碼風格   | ESLint flat config + Prettier（`lint-staged` 透過 Husky pre-commit）                                                       |
| 模組系統     | 全面 ESM（`"type": "module"`）                                                                                              |
| Workspaces   | npm workspace — `open-sse` 是唯一的子 workspace                                                                             |

路徑別名（`tsconfig.json`）：

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

預設 HTTP 埠：**`20128`**（API 與儀表板共用同一個程序。資料
目錄由 `DATA_DIR` 環境變數指定，預設為 `~/.omniroute/`）。

---

## 2. 儲存庫佈局

```
OmniRoute/
├── src/                  Next.js 應用程式（App Router、函式庫、領域、伺服器、共用）
├── open-sse/             串流引擎 workspace（@omniroute/open-sse）
├── electron/             桌面包裝程式（Electron 41 main + preload）
├── bin/                  CLI 進入點（omniroute、reset-password）
├── tests/                單元、整合、e2e、protocols-e2e、翻譯器、安全性、測試用 fixture
├── scripts/              建置、同步、檢查、遷移及執行時期輔助腳本
├── docs/                 公開文件（此目錄）
├── public/               靜態資源、PWA manifest、service worker
├── config/               執行時期設定範例
├── images/               行銷/截圖資源
├── _ideia/、_references/、_mono_repo/、_tasks/   內部草稿/規劃（不隨產品出貨）
├── CLAUDE.md             給 Claude Code 的儲存庫規則
├── AGENTS.md             給代理程式的進階架構參考
├── package.json          v3.8.0，workspace 根目錄
└── tsconfig.json         路徑別名 + 核心編譯器選項
```

---

## 3. `src/` — Next.js 應用程式

```
src/
├── app/                  App Router 頁面 + API 路由
├── lib/                  核心函式庫（資料庫、認證、OAuth、技能、記憶體……）
├── domain/               純領域層（政策、備援、成本、鎖定……）
├── server/               僅伺服器模組（授權、CORS、認證）
├── shared/               型別、常數、驗證、合約、工具（跨邊界安全）
├── mitm/                 CLI 整合的中間人代理輔助程式
├── models/               本地模型元資料 / 別名
├── sse/                  仍位於 src/ 下的舊版 SSE 處理器（非 open-sse/）
├── store/                客戶端狀態儲存
├── middleware/           路由層級中介軟體工具（非 Next.js 全域中介軟體）
├── scripts/              應用程式程式碼可匯入的內部腳本
├── types/                環境與共用 TS 型別
├── i18n/                 語系包
├── instrumentation.ts    Next.js 儀器鉤子
├── instrumentation-node.ts
├── server-init.ts        程序層級啟動（環境變數、資料庫、工作、同步）
└── proxy.ts              頂層代理啟動輔助程式
```

### 3.1 `src/app/` — App Router

App Router 同時提供儀表板 UI 和公開/管理 HTTP API。
**沒有全域中介軟體** — 攔截是在每個路由層級進行的。

`src/app/` 下的頂層區段：

| 路徑                                                                              | 用途                                       |
| --------------------------------------------------------------------------------- | ------------------------------------------ |
| `api/`                                                                            | 所有 HTTP API 路由（詳見下方細分）         |
| `a2a/`                                                                            | A2A JSON-RPC 2.0 端點（`POST /a2a`）       |
| `.well-known/agent.json/`                                                         | A2A Agent Card 探索文件                    |
| `(dashboard)/`                                                                    | 儀表板 UI（路由群組，無 URL 前綴）         |
| `auth/`、`login/`、`forgot-password/`、`callback/`                               | 認證流程                                   |
| `landing/`                                                                        | 行銷/登陸頁面                              |
| `docs/`                                                                           | 嵌入式 API 文件檢視器                      |
| `status/`、`maintenance/`、`offline/`                                             | 運作狀態頁面                               |
| `privacy/`、`terms/`                                                              | 法律頁面                                   |
| `400/`、`401/`、`403/`、`408/`、`429/`、`500/`、`502/`、`503/`                    | 靜態錯誤頁面                               |
| `error.tsx`、`global-error.tsx`、`not-found.tsx`、`forbidden/`、`loading.tsx`     | 框架錯誤/載入邊界                          |
| `layout.tsx`、`page.tsx`、`globals.css`、`manifest.ts`                            | 根殼層                                     |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — UI 頁面

`agents`、`analytics`、`api-manager`、`audit`、`auto-combo`、`batch`、`cache`、
`changelog`、`cli-tools`、`cloud-agents`、`combos`、`compression`、`context`、
`costs`、`endpoint`、`health`、`limits`、`logs`、`memory`、`onboarding`、
`playground`、`providers`、`search-tools`、`settings`、`skills`、`system`、
`translator`、`usage`、`webhooks`，加上根目錄 `page.tsx`、`HomePageClient.tsx`、
`BootstrapBanner.tsx`。

#### 3.1.2 `src/app/api/` — 頂層 API 群組

```
src/app/api/
├── a2a/{status, tasks}
├── acp/
├── admin/
├── analytics/
├── assess/
├── auth/
├── batches/
├── cache/
├── cli-tools/
├── cloud/{codex-responses-ws}
├── combos/
├── compliance/
├── compression/
├── context/
├── db/、db-backups/
├── evals/
├── fallback/
├── files/
├── health/
├── init/
├── internal/{concurrency}
├── keys/
├── logs/
├── mcp/{audit, sse, status, stream, tools}
├── memory/{health, [id]/, route.ts}
├── model-combo-mappings/
├── models/
├── monitoring/
├── oauth/
├── openapi/
├── policies/
├── pricing/
├── provider-metrics/、provider-models/、provider-nodes/
├── providers/
├── rate-limit/、rate-limits/
├── resilience/
├── restart/、shutdown/
├── search/
├── sessions/
├── settings/
├── skills/{executions, [id], install, marketplace, route.ts, skillssh}
├── storage/
├── sync/、synced-available-models/
├── system/
├── tags/
├── telemetry/
├── token-health/
├── translator/
├── tunnels/
├── services/   嵌入式服務管理（9router、cliproxy）— LOCAL_ONLY
├── upstream-proxy/
├── usage/
├── v1/         與 OpenAI 相容的公開 API
├── v1beta/     Gemini 風格的相容層
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — 嵌入式服務管理

用於安裝、啟動、停止和監控 9Router 及 CLIProxyAPI 的路由。
所有路徑均標記為 **LOCAL_ONLY**（僅限迴路位址，硬性規則 #17），因為它們
可能執行 `npm install` 並產生子程序。

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             getOrInitSupervisor() 輔助程式
│   ├── install/route.ts    POST — 透過 execFile 執行 npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install 更新版本
│   ├── rotate-key/route.ts POST — 產生新 API 金鑰並重新啟動
│   ├── status/route.ts     GET  — 即時狀態 + 資料庫狀態 + 版本元資料
│   └── auto-start/route.ts POST — 切換 auto_start 旗標
├── cliproxy/
│   ├── _lib.ts             getOrInitSupervisor() 輔助程式
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install 更新版本
│   ├── status/route.ts     GET  — 即時狀態 + 資料庫狀態 + 版本元資料
│   └── auto-start/route.ts POST — 切換 auto_start 旗標
└── [name]/
    └── logs/route.ts       GET  — SSE 日誌尾部（所有服務共用）
```

對應的儀表板 UI：
`src/app/(dashboard)/dashboard/providers/services/` — 雙標籤頁面（CLIProxyAPI + 9Router）。
9Router 嵌入式 UI 的反向代理：
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[...path]/route.ts`

深入探討：`docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — 與 OpenAI 相容的公開 API

```
v1/
├── accounts/[id]/                       帳戶查詢
├── agents/tasks/[id]/、agents/tasks/    A2A 風格任務端點
├── api/                                 在 v1/api 下公開的內部 API 輔助程式
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}、batches/      OpenAI Batches API
├── chat/completions/                    聊天補全（主要端點）
├── chatgpt-web/                         ChatGPT-Web 相容層
├── completions/                         舊版文字補全
├── embeddings/                          嵌入向量
├── files/[id]/、files/                  檔案 API
├── _helpers/                            共用路由輔助程式（無公開 URL）
├── images/{edits, generations}/         圖片生成 + 編輯
├── issues/                              分流輔助端點
├── management/{proxies}/                管理範圍路由（位於 v1 內）
├── messages/{count_tokens}/             Anthropic 風格訊息相容層
├── models/                              模型列表（`route.ts`、`catalog.ts`）
├── moderations/                         內容審查
├── music/                               音樂生成
├── providers/[provider]/                各供應商操作
├── quotas/{check}                       配額查詢
├── registered-keys/                     已註冊金鑰管理
├── rerank/                              重新排序
├── responses/[...path]/                 OpenAI Responses API（catch-all）
├── search/                              網路搜尋
├── videos/                              影片生成
├── ws/                                  WebSocket 橋接
└── route.ts                             索引處理器
```

每個路由檔案遵循相同的模式：

```
路由 → CORS 預檢 → Zod 請求體驗證 → 選擇性認證
      → API 金鑰政策執行 → 處理器委派（open-sse）
```

`v1beta/` 是 Gemini 風格的相容層（一個薄包裝層，將請求轉換成
相同的 `open-sse/handlers/` 管線）。

### 3.2 `src/lib/` — 核心函式庫

務必透過這些模組匯入資料、同步、OAuth、技能、記憶體等。以下
表格列出實際目錄及值得注意的頂層檔案。

| 模組              | 用途                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`            | A2A 協定伺服器：`taskManager.ts`、`streaming.ts`、`taskExecution.ts`、`routingLogger.ts`、`skills/`（6 個技能：成本分析、健康報告、供應商探索、配額管理、智慧路由、列出能力）                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `acp/`            | 代理控制協定：`index.ts`、`manager.ts`、`registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `api/`            | 內部 API 輔助程式：`requireManagementAuth.ts`、`requireCliToolsAuth.ts`、`errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `auth/`           | `managementPassword.ts`（密碼重設/雜湊）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `batches/`        | OpenAI Batches API 服務（`service.ts`）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `catalog/`        | OpenRouter 目錄同步（`openrouterCatalog.ts`）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `cloudAgent/`     | 雲端代理註冊表：`api.ts`、`baseAgent.ts`、`db.ts`、`index.ts`、`registry.ts`、`types.ts`、`agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `combos/`         | Combo 解析輔助程式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `compliance/`     | 稽核 + 供應商稽核：`index.ts`、`providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `config/`         | 執行時期設定黏合層                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `db/`             | SQLite 領域模組（參見 §3.2.1）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `display/`        | API 回應使用的 UI/顯示輔助程式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `embeddings/`     | 嵌入服務註冊表                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `env/`            | 環境變數載入 + 內省                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `evals/`          | 評估執行時期                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `guardrails/`     | `piiMasker.ts`、`promptInjection.ts`、`visionBridge.ts`、`visionBridgeHelpers.ts`、`registry.ts`、`base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `jobs/`           | 背景工作（`autoUpdate.ts`……）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `memory/`         | 持久化記憶體：`store.ts`、`cache.ts`、`retrieval.ts`、`summarization.ts`、`extraction.ts`、`injection.ts`、`qdrant.ts`、`settings.ts`、`verify.ts`、`schemas.ts`、`types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `oauth/`          | OAuth 供應商（13 個）：`antigravity`、`claude`、`cline`、`codex`、`cursor`、`gemini`、`github`、`gitlab-duo`、`kilocode`、`kimi-coding`、`kiro`、`qoder`、`windsurf` 加上 `services/`、`utils/{pkce, server, banner, codexAuthFile, ui}`、`constants/oauth.ts`                                                                                                                                                                                                                                                                                                                                                                                    |
| `plugins/`        | 外掛載入器（`index.ts`）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `promptCache/`    | `prefixAnalyzer.ts`、`index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `providerModels/` | 受管模型生命週期：`modelDiscovery.ts`、`managedModelImport.ts`、`managedAvailableModels.ts`、`cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `providers/`      | 供應商輔助程式：`catalog.ts`、`validation.ts`、`imageValidation.ts`、`claudeExtraUsage.ts`、`codexConnectionDefaults.ts`、`codexFastTier.ts`、`webCookieAuth.ts`、`managedAvailableModels.ts`、`requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `resilience/`     | `settings.ts` — 斷路器、冷卻、鎖定設定                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `runtime/`        | 執行時期功能檢測                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `services/`       | 嵌入式服務框架：`ServiceSupervisor.ts`（通用子程序監控器，具備操作鎖、環形緩衝區、健康檢查）、`bootstrap.ts`（程序層級註冊與自動啟動）、`registry.ts`（工具 → 監控器對應）、`apiKey.ts`（AES-256-GCM 金鑰儲存）、`modelSync.ts`（定期模型同步）、`ringBuffer.ts`（5 MB 循環日誌緩衝區）、`healthCheck.ts`（HTTP 健康探測）、`types.ts`、`embedWsProxy.ts`（WebSocket 代理）、`installers/{ninerouter,cliproxy}.ts`。參見 `docs/frameworks/EMBEDDED-SERVICES.md`                                                                                                                              |
| `agentSkills/`    | 代理技能目錄 + 產生器：`catalog.ts`（getCatalog/getSkillById/filterCatalog/computeCoverage）、`generator.ts`（generateAgentSkills → 寫入 `skills/{id}/SKILL.md`）、`openapiParser.ts`（從 OpenAPI 規格提取 REST 端點）、`cliRegistryParser.ts`（從 bin/cli-registry 提取 CLI 子命令）、`schemas.ts`（Zod：AgentSkillSchema、SkillCoverageSchema、ListQuerySchema、GenerateBodySchema）、`types.ts`（AgentSkill、SkillCoverage、SkillMarkdown、GeneratorReport）。由 REST 路由（`/api/agent-skills/*`）、MCP 工具（`omniroute_agent_skills_*`）和 A2A 技能 `list-capabilities` 使用。參見 [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md)。 |
| `skills/`         | 技能框架：`registry.ts`、`executor.ts`、`interception.ts`、`injection.ts`、`sandbox.ts`、`custom.ts`、`hybrid.ts`、`builtins.ts`、`a2a.ts`、`providerSettings.ts`、`schemas.ts`、`skillssh.ts`、`types.ts`，加上 `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                             |
| `spend/`          | `batchWriter.ts`（寫入緩衝區）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `sync/`           | `bundle.ts`、`tokens.ts`（雲端同步）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `system/`         | 系統層級輔助程式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `translator/`     | 頂層翻譯器黏合層（委派給 `open-sse/translator/`）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `usage/`          | 用量會計：`costCalculator.ts`、`tokenAccounting.ts`、`usageHistory.ts`、`aggregateHistory.ts`、`usageStats.ts`、`callLogs.ts`、`callLogArtifacts.ts`、`fetcher.ts`、`providerLimits.ts`、`migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `versionManager/` | 自動更新 + 版本清單                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ws/`             | WebSocket 橋接                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `zed-oauth/`      | Zed 編輯器 OAuth 流程                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

`src/lib/` 中的頂層檔案：

- `localDb.ts` — 僅重新匯出層。**切勿**在此新增邏輯。
- `proxyHealth.ts`、`proxyLogger.ts`、`tokenHealthCheck.ts`、`localHealthCheck.ts`
- `oneproxyRotator.ts`、`oneproxySync.ts`
- `apiBridgeServer.ts`、`cacheLayer.ts`、`semanticCache.ts`、`settingsCache.ts`
- `cloudSync.ts`、`initCloudSync.ts`
- `cloudflaredTunnel.ts`、`ngrokTunnel.ts`、`tailscaleTunnel.ts`
- `consoleInterceptor.ts`、`container.ts`、`gracefulShutdown.ts`、`idempotencyLayer.ts`
- `ipUtils.ts`、`logEnv.ts`、`logPayloads.ts`、`logRotation.ts`
- `modelAliasSeed.ts`、`modelCapabilities.ts`、`modelMetadataRegistry.ts`、`modelsDevSync.ts`
- `piiSanitizer.ts`、`pricingSync.ts`
- `apiKeyExposure.ts`、`cacheControlSettings.ts`、`dataPaths.ts`、`toolPolicy.ts`
- `translatorEvents.ts`、`usageDb.ts`、`usageAnalytics.ts`、`webhookDispatcher.ts`

#### 3.2.1 `src/lib/db/`

單例 SQLite 資料庫（`core.ts` 中的 `getDbInstance()`，WAL 日誌模式）。
**切勿在路由或處理器中撰寫原始 SQL** — 請透過這些模組操作。

![資料庫架構概覽（選取的核心資料表）](../diagrams/exported/db-schema-overview.svg)

> 來源：[diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

領域模組（每個掌管一個或多個資料表）：`apiKeys.ts`、`backup.ts`、
`batches.ts`、`cleanup.ts`、`cliToolState.ts`、`combos.ts`、
`commandCodeAuth.ts`、`compression.ts`、`compressionAnalytics.ts`、
`compressionCacheStats.ts`、`compressionCombos.ts`、`compressionScheduler.ts`、
`contextHandoffs.ts`、`core.ts`、`creditBalance.ts`、`databaseSettings.ts`、
`detailedLogs.ts`、`domainState.ts`、`encryption.ts`、`evals.ts`、`files.ts`、
`healthCheck.ts`、`jsonMigration.ts`、`migrationRunner.ts`、
`modelComboMappings.ts`、`models.ts`、`oneproxy.ts`、`prompts.ts`、
`providers.ts`、`providerLimits.ts`、`proxies.ts`、`quotaSnapshots.ts`、
`readCache.ts`、`reasoningCache.ts`、`registeredKeys.ts`、`secrets.ts`、
`sessionAccountAffinity.ts`、`settings.ts`、`stateReset.ts`、`stats.ts`、
`syncTokens.ts`、`tierConfig.ts`、`upstreamProxy.ts`、`versionManager.ts`、
`webhooks.ts`。

`migrations/` 包含 55 個版本化的 `.sql` 檔案（冪等、事務性），並在
啟動時由 `migrationRunner.ts` 執行。

所有遷移建立的資料表（共 52 個）：

`a`、`account_key_limits`、`api_keys`、`batches`、`call_logs`、
`combo_adaptation_state`、`combos`、`command_code_auth_sessions`、
`compression_analytics`、`compression_cache_stats`、
`compression_combo_assignments`、`compression_combos`、`context_handoffs`、
`daily_usage_summary`、`db_meta`、`domain_budgets`、`domain_circuit_breakers`、
`domain_cost_history`、`domain_fallback_chains`、`domain_lockout_state`、
`eval_cases`、`eval_runs`、`eval_suites`、`files`、`hourly_usage_summary`、
`key_value`、`mcp_tool_audit`、`memories`、`model_combo_mappings`、
`provider_connections`、`provider_key_limits`、`provider_nodes`、
`proxy_assignments`、`proxy_logs`、`proxy_registry`、`quota_snapshots`、
`reasoning_cache`、`registered_keys`、`request_detail_logs`、
`routing_decisions`、`semantic_cache`、`session_account_affinity`、
`skill_executions`、`skills`、`sync_tokens`、`tier_assignments`、
`tier_config`、`upstream_proxy_config`、`usage_history`、`version_manager`、
`webhooks`（加上用於記憶體搜尋的 FTS5 虛擬資料表）。

### 3.3 `src/domain/` — 領域層

純商業邏輯，無 I/O。由路由和處理器匯入。

| 檔案                                           | 用途                                               |
| ---------------------------------------------- | -------------------------------------------------- |
| `policyEngine.ts`                              | 頂層政策解析器                                     |
| `fallbackPolicy.ts`                            | 備援決策樹                                         |
| `costRules.ts`                                 | 成本計算規則                                       |
| `lockoutPolicy.ts`                             | 模型鎖定決策                                       |
| `tagRouter.ts`                                 | 基於標籤的路由                                     |
| `comboResolver.ts`                             | 從請求解析 combo → 目標清單                        |
| `connectionModelRules.ts`                      | 各連線的模型過濾器                                 |
| `modelAvailability.ts`                         | 模型可用性檢查                                     |
| `degradation.ts`                               | 降級模式轉換                                       |
| `providerExpiration.ts`                        | 過期帳戶/金鑰偵測                                  |
| `quotaCache.ts`                                | 快取配額決策                                       |
| `responses.ts`、`omnirouteResponseMeta.ts`     | 回應形狀輔助程式                                   |
| `configAudit.ts`                               | 設定變更稽核                                       |
| `assessment/`                                  | 模型評估（依 RFC，部分實作）                       |
| `types.ts`                                     | 共用領域型別                                       |

### 3.4 `src/server/` — 僅伺服器端

無法從客戶端元件匯入。

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        將路由分類為公開或管理
│   ├── assertAuth.ts      斷言輔助程式
│   ├── context.ts         每個請求的授權上下文
│   ├── headers.ts
│   ├── pipeline.ts        授權管線
│   ├── policies/          具體政策
│   └── types.ts
└── cors/origins.ts        CORS 來源白名單
```

### 3.5 `src/shared/` — 安全共用

分為聚焦的子目錄：

- `constants/` — `providers.ts`（Zod 驗證的供應商目錄）、`models.ts`、
  `modelSpecs.ts`、`modelCompat.ts`、`pricing.ts`、`cliTools.ts`、
  `cliCompatProviders.ts`、`routingStrategies.ts`、`comboConfigMode.ts`、
  `headers.ts`、`upstreamHeaders.ts`（封鎖清單）、`mcpScopes.ts`、
  `errorCodes.ts`、`publicApiRoutes.ts`、`batch.ts`、`batchEndpoints.ts`、
  `bodySize.ts`、`colors.ts`、`appConfig.ts`、`config.ts`、
  `sidebarVisibility.ts`、`visionBridgeDefaults.ts`。
- `validation/` — `schemas.ts`（約 80 個 Zod 架構）、`compressionConfigSchemas.ts`、
  `oneproxySchemas.ts`、`providerSchema.ts`、`settingsSchemas.ts`、`helpers.ts`。
- `contracts/` — 發布到 npm 的公開 API 合約。
- `types/` — 共用 TS 型別。
- `utils/` — `circuitBreaker.ts`、`apiAuth.ts`、`apiKey.ts`、`apiKeyPolicy.ts`、
  `apiResponse.ts`、`api.ts`、`classify429.ts`、`cliCompat.ts`、`clipboard.ts`、
  `cloud.ts`、`cn.ts`、`cors.ts`、`costEstimator.ts`、`featureFlags.ts`、
  `fetchTimeout.ts`、`formatting.ts`、`inputSanitizer.ts`、`logger.ts`、
  `machine.ts`、`machineId.ts`、`maskEmail.ts`、`modelCatalogSearch.ts`、
  `nodeRuntimeSupport.ts`、`parseApiKeys.ts`、`providerHints.ts`、
  `providerModelAliases.ts`、`rateLimiter.ts`、`releaseNotes.ts`、
  `a11yAudit.ts`，加上 `services/`、`network/`、`middleware/`、`schemas/`、`hooks/`、`components/` 下的儀表板鉤子/元件。

---

## 4. `open-sse/` — 串流引擎 workspace

獨立的 npm workspace，發布為 `@omniroute/open-sse`。負責請求
處理、執行器、翻譯器、服務、轉換器及 MCP 伺服器。

```
open-sse/
├── index.ts                公開匯出
├── package.json            Workspace 清單
├── tsconfig.json
├── types.d.ts
├── config/                 供應商註冊表、標頭設定檔、身分識別……
├── handlers/               請求處理器（聊天、嵌入、音訊、圖片……）
├── executors/              84 個供應商專屬的 HTTP 執行器
├── translator/             格式轉換（OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro）
├── transformer/            Responses API ↔ Chat Completions 串流轉換器
├── services/               80+ 個服務模組（combo、備援、配額、身分識別……）
├── utils/                  串流輔助程式、TLS 客戶端、AWS SigV4、代理請求……
└── mcp-server/             MCP 伺服器（3 種傳輸方式、30 個範圍、94 個工具）
```

### 4.1 `open-sse/handlers/`

| 處理器                     | 用途                                                                      |
| -------------------------- | ------------------------------------------------------------------------- |
| `chatCore.ts`              | 主要聊天管線（快取、速率限制、combo 路由、執行器分派）                    |
| `responsesHandler.ts`      | OpenAI Responses API 進入點                                               |
| `embeddings.ts`            | 嵌入向量                                                                  |
| `imageGeneration.ts`       | 圖片生成                                                                  |
| `audioSpeech.ts`           | 文字轉語音                                                                |
| `audioTranscription.ts`    | 語音轉文字                                                                |
| `videoGeneration.ts`       | 影片生成                                                                  |
| `musicGeneration.ts`       | 音樂生成                                                                  |
| `rerank.ts`                | 重新排序                                                                  |
| `moderations.ts`           | 內容審查                                                                  |
| `search.ts`                | 網路搜尋                                                                  |
| `sseParser.ts`             | SSE 事件解析器                                                            |
| `usageExtractor.ts`        | 從上游串流提取 Token 計數                                                 |
| `responseSanitizer.ts`     | 移除供應商特定的雜訊                                                      |
| `responseTranslator.ts`    | 供應商回應與翻譯層之間的黏合層                                            |

### 4.2 `open-sse/executors/`

84 個供應商執行器，每個都繼承 `BaseExecutor`（`base.ts`）：

`antigravity`、`azure-openai`、`blackbox-web`、`chatgpt-web`、`cliproxyapi`、
`cloudflare-ai`、`codex`、`commandCode`、`cursor`、`default`、`devin-cli`、
`muse-spark-web`、`nlpcloud`、`opencode`、`perplexity-web`、`petals`、
`pollinations`、`puter`、`qoder`、`vertex`、`windsurf`，加上 `claudeIdentity.ts`
（共用身分識別輔助程式）和 `index.ts`（註冊表）。

> 注意：未列在此處的供應商由 `default.ts` 使用通用的
> 與 OpenAI 相容的執行器處理。完整供應商目錄（268 個條目）位於
> `src/shared/constants/providers.ts`。

### 4.3 `open-sse/translator/`

軸輻式翻譯（OpenAI 為軸心）。

- **9 個請求翻譯器**（`translator/request/`）：
  `antigravity-to-openai`、`claude-to-gemini`、`claude-to-openai`、
  `gemini-to-openai`、`openai-responses`、`openai-to-claude`、
  `openai-to-cursor`、`openai-to-gemini`、`openai-to-kiro`。
- **9 個回應翻譯器**（`translator/response/`）：
  `claude-to-openai`、`cursor-to-openai`、`gemini-to-claude`、`gemini-to-openai`、
  `kiro-to-openai`、`openai-responses`、`openai-to-antigravity`、
  `openai-to-claude`。
- **9 個輔助程式**（`translator/helpers/`）：
  `claudeHelper`、`geminiHelper`、`geminiToolsSanitizer`、`maxTokensHelper`、
  `openaiHelper`、`responsesApiHelper`、`schemaCoercion`、`toolCallHelper`，加上
  輔助程式測試。
- **圖片輔助程式**（`translator/image/sizeMapper.ts`）。
- 頂層：`bootstrap.ts`、`formats.ts`、`registry.ts`、`index.ts`。

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — 基於 `TransformStream` 的 Responses API ↔ Chat
  Completions 轉換器（由 `responses/` 路由的 catch-all 使用）。

### 4.5 `open-sse/services/`

重點項目（完整列表位於 `open-sse/services/` 下）：

| 面向                 | 檔案                                                                                                                                                                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Combo 路由           | `combo.ts`（17 種策略）、`comboConfig.ts`、`comboMetrics.ts`、`comboManifestMetrics.ts`、`comboAgentMiddleware.ts`                                                                                                                                |
| Auto Combo 引擎      | `autoCombo/` — `engine.ts`、`scoring.ts`、`taskFitness.ts`、`virtualFactory.ts`、`modePacks.ts`、`autoPrefix.ts`、`persistence.ts`、`providerDiversity.ts`、`providerRegistryAccessor.ts`、`routerStrategy.ts`、`selfHealing.ts`、`index.ts`      |
| 韌性                 | `accountFallback.ts`（冷卻 + 鎖定）、`errorClassifier.ts`、`emergencyFallback.ts`、`rateLimitManager.ts`、`rateLimitSemaphore.ts`、`accountSemaphore.ts`、`accountSelector.ts`                                                                      |
| 配額                 | `quotaMonitor.ts`、`quotaPreflight.ts`、`bailianQuotaFetcher.ts`、`codexQuotaFetcher.ts`、`deepseekQuotaFetcher.ts`、`openrouterQuotaFetcher.ts`、`openrouterFreeWindow.ts`、`crofUsageFetcher.ts`、`antigravityCredits.ts`                       |
| 快取                 | `reasoningCache.ts`、`searchCache.ts`、`signatureCache.ts`、`requestDedup.ts`                                                                                                                                                                     |
| 路由智慧             | `intentClassifier.ts`、`taskAwareRouter.ts`、`backgroundTaskDetector.ts`、`volumeDetector.ts`、`wildcardRouter.ts`、`workflowFSM.ts`、`specificityDetector.ts`、`specificityRules.ts`、`specificityTypes.ts`                                      |
| 模型處理             | `modelCapabilities.ts`、`modelDeprecation.ts`、`modelFamilyFallback.ts`、`modelStrip.ts`、`model.ts`、`provider.ts`、`providerRequestDefaults.ts`、`providerCostData.ts`、`payloadRules.ts`                                                       |
| 壓縮                 | `compression/` — 完整壓縮引擎接線                                                                                                                                                                                                                  |
| Token + 工作階段     | `tokenRefresh.ts`、`sessionManager.ts`、`apiKeyRotator.ts`、`contextManager.ts`、`contextHandoff.ts`、`systemPrompt.ts`、`roleNormalizer.ts`、`responsesInputSanitizer.ts`、`toolSchemaSanitizer.ts`、`toolLimitDetector.ts`、`thinkingBudget.ts` |
| 層級 / 清單          | `tierResolver.ts`、`tierConfig.ts`、`tierDefaults.json`、`tierTypes.ts`、`manifestAdapter.ts`                                                                                                                                                     |
| IP / 網路            | `ipFilter.ts`、`webSearchFallback.ts`                                                                                                                                                                                                             |
| 批次                 | `batchProcessor.ts`                                                                                                                                                                                                                               |
| 用量                 | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **31 個已註冊工具**，在 `server.ts` 中接線（12 個定義於 `schemas/tools.ts` 範圍下，
  5 個壓縮工具、3 個記憶體工具、4 個技能工具，加上透過 `advancedTools.ts` 新增的進階工具）。
- **3 種傳輸方式**：stdio、HTTP Streamable、SSE。
- **13 個範圍**，宣告於 `src/shared/constants/mcpScopes.ts`。
- 稽核資料表：`mcp_tool_audit`（由 `audit.ts` 填充）。
- 檔案：`server.ts`、`index.ts`、`httpTransport.ts`、`audit.ts`、`scopeEnforcement.ts`、
  `runtimeHeartbeat.ts`、`descriptionCompressor.ts`、`schemas/{tools, a2a, audit, index}.ts`、
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`，
  加上 `__tests__/` 下的測試。
- 參見 [MCP-SERVER.md](../frameworks/MCP-SERVER.md) 以取得完整工具目錄。

### 4.7 `open-sse/config/`

供應商註冊表（`providerRegistry.ts`、`providerModels.ts`、
`providerHeaderProfiles.ts`）、各格式模型註冊表（`audioRegistry.ts`、
`embeddingRegistry.ts`、`imageRegistry.ts`、`moderationRegistry.ts`、
`musicRegistry.ts`、`rerankRegistry.ts`、`searchRegistry.ts`、`videoRegistry.ts`）、
身分識別輔助程式（`codexIdentity.ts`、`codexInstructions.ts`、
`anthropicHeaders.ts`、`antigravityUpstream.ts`、`antigravityModelAliases.ts`、
`cliFingerprints.ts`、`toolCloaking.ts`、`defaultThinkingSignature.ts`）、
憑證輔助程式（`credentialLoader.ts`、`codexClient.ts`），以及雲端
配接器（`azureAi.ts`、`bedrock.ts`、`datarobot.ts`、`glmProvider.ts`、
`maritalk.ts`、`oci.ts`、`petals.ts`、`runway.ts`、`sap.ts`、`watsonx.ts`、
`ollamaModels.ts`、`errorConfig.ts`、`constants.ts`、`registryUtils.ts`）。

### 4.8 `open-sse/utils/`

串流基礎元件與供應商輔助程式：`stream.ts`、`streamHandler.ts`、
`streamHelpers.ts`、`streamPayloadCollector.ts`、`streamReadiness.ts`、
`sseHeartbeat.ts`、`proxyFetch.ts`、`proxyDispatcher.ts`、`tlsClient.ts`、
`networkProxy.ts`、`awsSigV4.ts`、`cacheControlPolicy.ts`、
`cursorChecksum.ts`、`cursorAgentProtobuf.ts`、`cursorVersionDetector.ts`、
`comfyuiClient.ts`、`kieTask.ts`、`bypassHandler.ts`、`aiSdkCompat.ts`、
`thinkTagParser.ts`、`urlSanitize.ts`、`usageTracking.ts`、`requestLogger.ts`、
`progressTracker.ts`、`cors.ts`、`error.ts`、`logger.ts`、`sleep.ts`、
`ollamaTransform.ts`。

---

## 5. `electron/` — 桌面包裝程式

```
electron/
├── main.js                  Electron 主程序
├── preload.js               預載橋接（啟用 contextIsolation）
├── types.d.ts
├── package.json             electron-builder 設定，版本 3.8.0
├── README.md
├── assets/                  建置資源（圖示、授權檔案……）
├── node_modules/            專屬 node_modules（better-sqlite3、electron-updater）
└── dist-electron/           建置輸出（不提交）
```

五個 npm 腳本位於 workspace 根目錄：`electron:dev`、`electron:build`、
`electron:build:{win,mac,linux}`、`electron:smoke:packaged`。自動更新透過
`electron-updater` 指向 GitHub 發布 feed。

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           主要 CLI 進入點（Node ESM）
├── reset-password.mjs      從 CLI 重設管理密碼
├── mcp-server.mjs          MCP 伺服器啟動器（stdio）
├── nodeRuntimeSupport.mjs  Node 版本守衛
└── cli/
    ├── program.mjs         Commander 程式建置器
    ├── runtime.mjs         withRuntime 輔助程式（server-first/db-fallback）
    ├── output.mjs          輸出格式化器（json/jsonl/table/csv）
    ├── i18n.mjs            t() 輔助程式及語系包
    ├── api.mjs             API 請求輔助程式
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    命令註冊
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             （每個命令/群組一個檔案）
```

`package.json` → `bin` 中公開了兩個二進位檔：

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| 目錄                                                                              | 類型                                                                                            |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `tests/unit/`                                                                     | 透過 Node 原生測試執行器的單元測試（1821 個檔案，加上 `api/`、`auth/`、`authz/` 子目錄）       |
| `tests/integration/`                                                              | 跨模組 + 資料庫狀態測試                                                                        |
| `tests/e2e/`                                                                      | Playwright UI 測試                                                                             |
| `tests/protocols-e2e/`                                                            | MCP/A2A 協定 e2e 測試                                                                          |
| `tests/translator/`                                                               | 翻譯器專用測試                                                                                 |
| `tests/security/`                                                                 | 安全性回歸測試                                                                                 |
| `tests/load/`                                                                     | 負載/壓力測試                                                                                  |
| `tests/golden-set/`                                                               | 翻譯器回歸測試的參考輸出                                                                       |
| `tests/helpers/`、`tests/fixtures/`、`tests/manual/`、`tests/scratch_test.mjs`    | 支援                                                                                           |

常用命令：

| 命令                                                        | 執行內容                                                          |
| ----------------------------------------------------------- | ----------------------------------------------------------------- |
| `npm run test:unit`                                         | 所有 `tests/unit/*.test.ts` 透過 Node 測試執行器（並發數 10）    |
| `npm run test:vitest`                                       | Vitest 套件（MCP、autoCombo、快取）                               |
| `npm run test:e2e`                                          | Playwright UI 套件                                                |
| `npm run test:protocols:e2e`                                | MCP + A2A 協定 e2e                                               |
| `npm run test:coverage`                                     | 覆蓋率門檻（≥60% 行/陳述式/函式/分支）                           |
| `node --import tsx/esm --test tests/unit/<file>.test.ts`    | 單一檔案執行                                                      |

---

## 8. `scripts/`

按用途分為 6 個子資料夾。

- **`scripts/build/`** — `build-next-isolated.mjs`、`prepublish.ts`、
  `prepare-electron-standalone.mjs`、`pack-artifact-policy.ts`、
  `validate-pack-artifact.ts`、`postinstall.mjs`、`postinstallSupport.mjs`、
  `uninstall.mjs`、`bootstrap-env.mjs`、`runtime-env.mjs`、
  `native-binary-compat.mjs`。
- **`scripts/dev/`** — `run-next.mjs`、`run-next-playwright.mjs`、
  `run-standalone.mjs`、`standalone-server-ws.mjs`、`responses-ws-proxy.mjs`、
  `v1-ws-bridge.mjs`、`smoke-electron-packaged.mjs`、
  `run-playwright-tests.mjs`、`run-ecosystem-tests.mjs`、
  `run-protocol-clients-tests.mjs`、`sync-env.mjs`、`healthcheck.mjs`、
  `system-info.mjs`。
- **`scripts/check/`** — `check-cycles.mjs`、`check-docs-sync.mjs`、
  `check-docs-counts-sync.mjs`、`check-env-doc-sync.mjs`、
  `check-deprecated-versions.mjs`、`check-route-validation.mjs`、
  `check-t11-any-budget.mjs`、`check-pr-test-policy.mjs`、
  `check-supported-node-runtime.ts`、`test-report-summary.mjs`。
- **`scripts/docs/`** — `generate-docs-index.mjs`、`gen-provider-reference.ts`。
- **`scripts/i18n/`** — `generate-multilang.mjs`、`run-visual-qa.mjs`、
  `generate-qa-checklist.mjs`、`apply-priority-overrides.mjs`、
  `validate_translation.py`、`check_translations.py`、`i18n_autotranslate.py`、
  `untranslatable-keys.json`。
- **`scripts/ad-hoc/`** — `cursor-tap.cjs`、`sync-cursor-models.mjs`、
  `migrate-env.mjs`、`dbsetup.js`。

---

## 9. 請求管線（摘要）

![請求管線（/v1/chat/completions）](../diagrams/exported/request-pipeline.svg)

> 來源：[diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
客戶端請求
  → /v1/chat/completions (route.ts)
     CORS 預檢檢查
     Zod 驗證（shared/validation/schemas.ts 中的 chatCompletionsSchema）
     認證（extractApiKey + isValidApiKey 或 requireManagementAuth）
     政策引擎（src/server/authz/pipeline.ts）
     防護措施（PII 遮罩、提示注入防護、視覺橋接）
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     快取檢查（語意 + 讀取快取）
     速率限制（rateLimitManager、accountSemaphore）
     Combo 路由（若模型解析為 combo）
       comboResolver → 每個目標迴圈 → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       向上游發起請求 → 透過 accountFallback 重試/退避
     translateResponse() (open-sse/translator/response/*)
     SSE 串流或 JSON 回應
     若為 Responses API：透過 open-sse/transformer/responsesTransformer.ts 的 TransformStream
  → 合規稽核（src/lib/compliance/）
  → 回應傳回客戶端
```

### 韌性執行時期狀態（三種機制）

| 機制                 | 範圍                             | 位置                                                                                                                      |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 供應商斷路器         | 整個供應商                       | `src/shared/utils/circuitBreaker.ts`，持久化於 `domain_circuit_breakers`                                                  |
| 連線冷卻             | 單一帳戶/金鑰                    | `markAccountUnavailable()` 位於 `src/sse/services/auth.ts`；由 `accountFallback.checkFallbackError()` 使用                |
| 模型鎖定             | 供應商 + 連線 + 模型             | `open-sse/services/accountFallback.ts`，持久化於 `domain_lockout_state`                                                    |

參見 [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) 及
[CLAUDE.md](../../CLAUDE.md) 中的專屬章節。

---

## 10. 如何貢獻

### 新增供應商

1. 在 `src/shared/constants/providers.ts` 中註冊（載入時以 Zod 驗證）。
2. 若需要自訂邏輯，在 `open-sse/executors/` 中新增執行器（繼承 `BaseExecutor`）。
3. 若該供應商不支援 OpenAI 格式，在 `open-sse/translator/` 中新增翻譯器。
4. 若為 OAuth 基礎，在 `src/lib/oauth/providers/` 和 `src/lib/oauth/services/` 下新增設定。
5. 在 `open-sse/config/providerRegistry.ts`（或 `open-sse/config/` 下格式專屬的註冊表）中註冊模型。
6. 在 `tests/unit/` 下撰寫測試。

### 新增 API 路由

1. 建立 `src/app/api/your-route/route.ts`。
2. 遵循模式：CORS → Zod 請求體驗證 → 認證 → 處理器委派。
3. 若為新的請求形狀：在 `src/shared/validation/schemas.ts` 中新增 Zod 架構。
4. 若僅限管理：將路徑加入 `src/shared/constants/publicApiRoutes.ts`（公開 API 表面的封鎖清單）。
5. 在 `tests/unit/` 下新增測試。
6. 更新 `docs/reference/API_REFERENCE.md` 和 `docs/openapi.yaml`。

### 新增資料庫模組

1. 建立 `src/lib/db/yourModule.ts` 並從 `./core.ts` 匯入 `getDbInstance()`。
2. 匯出您領域的 CRUD 函式。
3. 若需新建資料表：在 `src/lib/db/migrations/` 下新增遷移檔案，依序編號、冪等、事務性。
4. 從 `src/lib/localDb.ts` 重新匯出（僅重新匯出 — **不含邏輯**）。
5. 在 `tests/unit/` 下新增測試。

### 新增 MCP 工具

1. 在 `open-sse/mcp-server/tools/` 下新增工具定義（或擴充 `open-sse/mcp-server/schemas/tools.ts`）。
2. 在 `src/shared/constants/mcpScopes.ts` 中指派適當的範圍。
3. 在 `open-sse/mcp-server/server.ts` 中註冊該工具。
4. 在 `open-sse/mcp-server/__tests__/` 下新增測試。
5. 更新 [MCP-SERVER.md](../frameworks/MCP-SERVER.md)。

### 新增 A2A 技能

參見 [A2A-SERVER.md § 新增技能](../frameworks/A2A-SERVER.md)。技能位於
`src/lib/a2a/skills/`，並透過 A2A 任務管理器註冊。

---

## 11. 慣例

- **程式碼風格**：2 空格縮排、雙引號、100 字元寬度、分號、`es5` 結尾逗號 — 由 Prettier 透過 `lint-staged` 強制執行。
- **匯入順序**：外部 → 內部（`@/`、`@omniroute/open-sse`）→ 相對。
- **命名**：檔案 `camelCase` 或 `kebab-case`，元件 `PascalCase`，常數 `UPPER_SNAKE`。
- **ESLint**：`no-eval`、`no-implied-eval`、`no-new-func` = `error` 適用於所有地方；`no-explicit-any` = `warn` 在 `open-sse/` 和 `tests/` 中，其他位置為 error。
- **TypeScript**：`strict: false`（舊有設定）。在跨模組邊界處優先使用明確型別而非推斷。
- **資料庫**：切勿在路由或處理器中撰寫原始 SQL — 務必透過 `src/lib/db/` 模組操作。切勿在 `src/lib/localDb.ts` 中新增邏輯。
- **資料庫實體型別（#3512）**：一個寫入或讀取資料表列形狀的函式，應接收/回傳一個與該資料表欄位 1:1 對應的命名 TS 介面，而非 `any` 或呼叫處的內聯匿名型別。將該介面置於函式旁邊（例如將 `export interface UsageEntry` 放在 `src/lib/usage/usageHistory.ts` 中 `saveRequestUsage` 之上），在不同寫入者逐步填充該列時，將個別欄位保持為可選/可為 null，並對在不同呼叫者間形狀各異的欄位優先使用 `unknown` 而非 `any`（在欄位上註明，例如 `UsageEntry.tokens` 接受原始供應商形狀的用量和正規化後的形狀）。一旦某個檔案的 `any` 計數以此方式歸零，將其加入 `check:any-budget:t11` 白名單（`scripts/check/check-t11-any-budget.mjs`、`maxAny: 0`），使其不會回歸。這是首批適用的慣例 — 更廣泛的「無匿名 `any`」清理將在其餘程式碼庫中迭代進行。
- **錯誤處理**：使用特定錯誤型別的 try/catch，以 pino 上下文記錄日誌。切勿在 SSE 串流中默默吞嚥錯誤；使用中止信號進行清理。
- **安全性**：切勿使用 `eval()` / `new Function()` / 隱含 eval。使用 Zod 驗證所有輸入。加密靜態憑證（AES-256-GCM）。保持 `src/shared/constants/upstreamHeaders.ts` 封鎖清單與清理/驗證層一致。
- **提交訊息**：約定式提交 — `feat(scope): subject`。允許的範圍：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`。
- **分支**：前綴 `feat/`、`fix/`、`refactor/`、`docs/`、`test/`、`chore/`。切勿直接提交到 `main`。
- **Husky**：pre-commit 執行 `lint-staged` + `check:docs-sync` + `check:any-budget:t11`；pre-push 執行 `check:any-budget:t11` + `check:tracked-artifacts`（快速閘道；不包含 `test:unit`）。

---

## 12. 硬性規則（來自 CLAUDE.md）

1. 切勿提交機密或憑證。
2. 切勿在 `src/lib/localDb.ts` 中新增邏輯。
3. 切勿使用 `eval()` / `new Function()` / 隱含 eval。
4. 切勿直接提交到 `main`。
5. 切勿在路由中撰寫原始 SQL — 務必透過 `src/lib/db/` 模組操作。
6. 切勿在 SSE 串流中默默吞嚥錯誤。
7. 務必使用 Zod 架構驗證輸入。
8. 變更正式環境程式碼時務必包含測試。
9. 覆蓋率必須保持 ≥ 60%（陳述式、行、函式、分支）。

---

## 13. 參見

- [ARCHITECTURE.md](./ARCHITECTURE.md) — 高階架構與模組職責。
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 公開 + 管理 API 參考。
- [FEATURES.md](../guides/FEATURES.md) — 功能矩陣與版本亮點。
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — 斷路器、冷卻、鎖定深入探討。
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo 評分與策略。
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — 完整 MCP 工具目錄 + 傳輸方式。
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — A2A 協定技能與探索。
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — RTK + Caveman 壓縮。
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — CLI 整合。
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)（若存在）、[DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md)、[FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md)、[VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md)、[TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md)、[PWA_GUIDE.md](../guides/PWA_GUIDE.md) — 部署目標。
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 常見運維問題。
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — 貢獻者工作流程。
- [CLAUDE.md](../../CLAUDE.md) — 給 Claude Code 的儲存庫規則（上述許多慣例的真實來源）。
- [AGENTS.md](../../AGENTS.md) — 代理程式使用的進階架構參考。
