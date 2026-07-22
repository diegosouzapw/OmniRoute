---
title: "OmniRoute — 儀表板功能總覽"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — 儀表板功能總覽

🌐 **主要 README 翻譯：** 🇺🇸 [English](../README.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/README.md) | 🇪🇸 [Español](../i18n/es/README.md) | 🇫🇷 [Français](../i18n/fr/README.md) | 🇮🇹 [Italiano](../i18n/it/README.md) | 🇷🇺 [Русский](../i18n/ru/README.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](../i18n/de/README.md) | 🇮🇳 [हिन्दी](../i18n/in/README.md) | 🇹🇭 [ไทย](../i18n/th/README.md) | 🇺🇦 [Українська](../i18n/uk-UA/README.md) | 🇸🇦 [العربية](../i18n/ar/README.md) | 🇯🇵 [日本語](../i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/README.md) | 🇧🇬 [Български](../i18n/bg/README.md) | 🇩🇰 [Dansk](../i18n/da/README.md) | 🇫🇮 [Suomi](../i18n/fi/README.md) | 🇮🇱 [עברית](../i18n/he/README.md) | 🇭🇺 [Magyar](../i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/README.md) | 🇰🇷 [한국어](../i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/README.md) | 🇳🇱 [Nederlands](../i18n/nl/README.md) | 🇳🇴 [Norsk](../i18n/no/README.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/README.md) | 🇷🇴 [Română](../i18n/ro/README.md) | 🇵🇱 [Polski](../i18n/pl/README.md) | 🇸🇰 [Slovenčina](../i18n/sk/README.md) | 🇸🇪 [Svenska](../i18n/sv/README.md) | 🇵🇭 [Filipino](../i18n/phi/README.md) | 🇨🇿 [Čeština](../i18n/cs/README.md)

OmniRoute 儀表板各區塊的視覺化導覽。

> 📅 **最後更新：** 2026-06-28 — **v3.8.40**

---

## ✨ v3.8.0 重點功能

v3.7.x → v3.8.0 版本週期新增了零設定自動路由、新供應商、OAuth 流程、更深的抗災能力以及更豐富的 CLI 體驗。以下為重點功能——完整細節請參閱稍後章節及連結的規格文件。

- 🤖 **Auto Combo / 零設定自動路由** — 使用前綴 `auto/coding`、`auto/fast`、`auto/cheap`、`auto/offline`、`auto/smart`、`auto/lkgp`。由 9 因子評分引擎和 4 個精選**模式包**（快速出貨、節省成本、品質優先、離線友善）驅動
- 🆕 **Command Code 供應商**（#2199）— 一級支援，含模型目錄及配額追蹤
- 🆕 **Z.AI 供應商** — 新增免費方案供應商，附配額標籤
- 🎬 **KIE 媒體擴展** — 擴充目錄，納入影片生成模型
- 🔐 **Windsurf + Devin CLI OAuth 流程**（#2168）— 端到端瀏覽器登入
- 🆓 **8 個新的免費供應商** — LLM7、Lepton、UncloseAI、BazaarLink、Completions、Enally、FreeTheAi、Command Code
- 🎯 **清單感知分層路由 W1–W4** — 供應商清單驅動加權層級選擇
- 🎨 **Cursor 完整 OpenAI 相容性** — 工具呼叫、串流、階段管理端到端
- 📊 **Cursor Pro 方案用量** — 在供應商限制儀表板中顯示配額與週期數據
- ⚡ **服務層級 breakdown / Codex 快速層分析** — 各層級用量可視化
- 📌 **每階段黏性路由** — Codex 階段在輪次間固定使用相同帳戶
- 🔊 **Inworld TTS 增強** — 語音目錄、串流及延遲改善
- 🔑 **Kiro 無頭驗證** — 透過本機 `kiro-cli` SQLite 儲存庫登入，無需瀏覽器
- 📉 **DeepSeek 配額與限制監控** — 在儀表板顯示每日/每月用量
- 🔄 **重設感知路由策略** — Combo 現在優先選用配額視窗最早重置的帳戶
- ⏱️ **`fallbackDelayMs`** 與**動態工具限制偵測** — 更精細的備援時機 + 各供應商工具數量限制
- 🔧 **背景模式降級（Responses API）** — 當上游缺乏背景輪詢能力時，降級為同步模式並附上結構化警告
- 🚦 **各供應商 429 分類** + `useUpstream429BreakerHints` 開關 — 利用上游速率限制提示來微調斷路器行為
- 🩺 **模型冷卻儀表板** — 觀察各模型的鎖定狀態，並可從 UI 手動重新啟用
- 🔒 **MITM 動態 Linux 憑證偵測** — 適用於 Debian/Ubuntu、Fedora/RHEL、Arch 及其他發行版
- 💻 **CLI 增強套件** — 20 多個指令，包含 `omniroute providers`、`omniroute combos`、`omniroute doctor`、`omniroute setup`
- 🔍 **Qdrant 嵌入模型探索** — 自動向量儲存模型探測
- 🔑 **API 金鑰 / Bearer 金鑰搭配 `manage` 範圍** — 透過 API 以程式方式執行管理操作
- 🏥 **Combo 目標健康度分析** + **結構化 Combo 建構器** — 各目標健康度及 UI 建構器，用於組合 `(供應商, 模型, 連線)` 步驟
- 🤝 **GitLab Duo OAuth 供應商** — 使用 GitLab 憑證登入
- 🧠 **推理重播快取** — 混合記憶體 + SQLite 持久化推理軌跡

📚 **相關文件：** [技能框架](../frameworks/SKILLS.md) · [記憶系統](../frameworks/MEMORY.md) · [雲端代理](../frameworks/CLOUD_AGENT.md) · [Webhook](../frameworks/WEBHOOKS.md) · [推理重播快取](../routing/REASONING_REPLAY.md)

---

## 🔌 供應商

管理 AI 供應商連線：OAuth 供應商（Claude Code、Codex）、API 金鑰供應商（Groq、DeepSeek、OpenRouter）以及免費供應商（Qoder、Kiro）。Kiro 帳戶包含額度餘額追蹤——剩餘額度、總配額及續約日期，均可在「儀表板 → 用量」中檢視。

OpenRouter 連線可在「進階設定」中儲存各連線的 `preset`。設定後，OmniRoute 會將其作為 OpenRouter 頂層請求欄位發送，例如 `"preset": "email-copywriter"`，除非客戶端請求已提供自己的 `preset`。

![供應商儀表板](../screenshots/01-providers.png)

---

## 🎨 Combo

使用 17 種策略建立模型路由組合：優先、加權、先填滿、輪詢、p2c（二選一）、隨機、最少使用、成本最佳化、重設感知、重設視窗、餘裕空間、嚴格隨機、自動、lkgp（最後已知良好供應商）、情境最佳化、情境轉接，以及**融合**（並行分發給多個模型，再由評判模型合成一個答案）。每個組合可串聯多個模型並自動備援，內含快速範本與就緒檢查。

近期 Combo 改善：

- **結構化 Combo 建構器** — 透過選擇供應商、模型及精確帳戶/連線來建立每個步驟
- **重複供應商支援** — 只要 `(供應商, 模型, 連線)` 組合唯一，即可在同一組合中多次重複使用相同供應商
- **Combo 目標健康度** — 分析與健康度面板現在可區分個別 Combo 目標/步驟，而非全部收攏為模型字串
- **複合層級排序** — `defaultTier -> fallbackTier` 現在會影響頂層 Combo 步驟的執行/備援順序

![Combo 儀表板](../screenshots/02-combos.png)

---

## 📊 分析

全面的用量分析，包含 Token 消耗、成本估算、活動熱圖、每週分佈圖表及各供應商 breakdown。

![分析儀表板](../screenshots/03-analytics.png)

---

## 🏥 系統健康度

即時監控：運作時間、記憶體、版本、延遲百分位數（p50/p95/p99）、快取統計、供應商斷路器狀態、活躍配額監控階段及 Combo 目標健康度。

![健康度儀表板](../screenshots/04-health.png)

---

## 🔧 轉換器測試區

四種模式用於除錯 API 轉換：**測試區**（格式轉換器）、**聊天測試器**（即時請求）、**測試平台**（批次測試）及**即時監控**（即時串流）。

![轉換器測試區](../screenshots/05-translator.png)

---

## 🎮 模型測試區 _（v2.0.9+）_

直接從儀表板測試任何模型。選擇供應商、模型及端點，使用 Monaco Editor 編寫提示詞，即時串流接收回應，可中途中止並檢視時間指標。

---

## 🎨 主題 _（v2.0.5+）_

可自訂的儀表板色彩主題。從 7 個預設顏色（珊瑚、藍、紅、綠、紫罗兰、橙、青）中選擇，或透過挑選任意十六進位色碼建立自訂主題。支援淺色、深色及系統模式。

---

## ⚙️ 設定

全面的設定面板，包含 **7 個分頁**：

- **一般** — 系統儲存、備份管理（匯出/匯入資料庫）
- **外觀** — 主題選擇器（深色/淺色/系統）、色彩主題預設與自訂顏色、健康度記錄可見度、側邊欄項目與群組分隔線可見度控制、端點通道可見度控制
- **AI** — AI 助手功能、預設路由預設（Auto Combo `auto/coding`、`auto/fast`、`auto/cheap`、`auto/smart`）、推理重播快取及技能/記憶開關
- **安全性** — API 端點保護、自訂供應商封鎖、IP 過濾、階段資訊
- **路由** — 模型別名、背景任務降級、清單感知分層路由（W1–W4）、`fallbackDelayMs`、每階段黏性路由
- **抗災能力** — 速率限制持久化、斷路器調校、自動停用被封帳戶、供應商到期監控、**Context Relay** 交接門檻與摘要模型配置、各供應商 429 分類及 `useUpstream429BreakerHints` 開關、模型冷卻
- **進階** — 配置覆寫、配置審計軌跡、備援降級模式、Responses API 背景模式降級

![設定儀表板](../screenshots/06-settings.png)

---

## 🔧 CLI 工具

一鍵配置 AI 程式碼工具：Claude Code、Codex CLI、OpenClaw、Kilo Code、Antigravity、Cline、Continue、Cursor 及 Factory Droid。功能包含自動化配置套用/重置、連線設定檔及模型對應。

![CLI 工具儀表板](../screenshots/07-cli-tools.png)

---

## 🤖 CLI 代理 _（v2.0.11+）_

用於探索與管理 CLI 代理的儀表板。顯示 16 個內建代理的網格（Codex、Claude、Goose、OpenClaw、Aider、OpenCode、Cline、ForgeCode、Amazon Q、Open Interpreter、Cursor CLI、Warp、**Windsurf**、**Devin CLI**、**Kimi Coding**、**Command Code**），包含：

- **安裝狀態** — 已安裝 / 未找到，含版本偵測
- **協定徽章** — stdio、HTTP 等
- **自訂代理** — 透過表單註冊任何 CLI 工具（名稱、二進位檔、版本指令、啟動參數）
- **CLI 指紋比對** — 各供應商開關，用於比對原生 CLI 請求特徵，降低被封風險同時保留代理 IP
- **OAuth 支援代理** — Windsurf 與 Devin CLI 現使用瀏覽器 OAuth 流程進行驗證（v3.8.0+）

---

## 🔗 Context Relay _（v3.5.5+）_

一種 Combo 策略，可在對話中途發生帳戶輪換時保持階段連續性。在目前帳戶額度耗盡前，OmniRoute 會在背景產生結構化的交接摘要。當下一次請求解析到不同帳戶時，該摘要會作為系統訊息注入，使新帳戶能銜接完整上下文。

可透過 Combo 層級或全域設定調整：

- **交接門檻** — 觸發摘要產生的配額使用百分比（預設 85%）
- **摘要最大訊息數** — 濃縮多少近期對話歷史
- **摘要模型** — 可選的覆寫模型，用於產生交接摘要

目前支援 Codex 帳戶輪換。請參閱 [Context Relay 文件](../architecture/ARCHITECTURE.md)。

---

## 🗜️ 提示詞壓縮 _（v3.7.9+）_

「上下文與快取」現在有專屬頁面顯示 Caveman、RTK 及壓縮組合：

- **Caveman** — 語言感知規則包、預覽、輸出模式控制及分析
- **RTK** — 指令感知壓縮，適用於 shell、git、測試、建置、套件、Docker、基礎設施、JSON 及堆疊追蹤輸出
- **壓縮組合** — 命名管線（如 `rtk -> caveman`）可指派給路由組合；預設疊加數學平均達到約 **89%**，當兩套引擎都啟用時，可節省 **78–95%** 的合格上下文
- **原始輸出復原** — 可選的 RTK 脫敏原始輸出指標，用於除錯壓縮失敗

請參閱 [壓縮指南](../compression/COMPRESSION_GUIDE.md)、[RTK 壓縮](../compression/RTK_COMPRESSION.md) 及 [壓縮引擎](../compression/COMPRESSION_ENGINES.md)。

---

## 🛡️ 代理強化 _（v3.5.5+）_

全面代理設定強制執行，涵蓋整個請求管線：

- **Token 健康檢查** — 背景 OAuth 重新整理現在會依連線解析代理設定，防止在需要代理的環境中發生失敗
- **API 金鑰驗證** — 供應商金鑰驗證（`POST /api/providers/validate`）會經由 `runWithProxyContext` 路由，遵循供應商層級與全域代理設定
- **undici Dispatcher 修正** — 代理 dispatcher 使用 undici 自身的 fetch 實作而非 Node 內建 fetch，解決 Node.js 22 上的 `invalid onRequestStart method` 錯誤
- **Node.js 版本偵測** — 登入頁面主動偵測不相容的 Node.js 版本（24+），並顯示警告橫幅，提示使用 Node 22 LTS

---

## 📧 電子郵件隱私遮罩 _（v3.5.6+）_

OAuth 帳戶電子郵件預設會遮罩（例如 `di*****@g****.com`），防止在分享螢幕截圖或錄製示範時意外暴露。使用「設定 → 外觀 → 帳戶電子郵件可見度」可在供應商、Combo、記錄、配額及測試區等畫面中，全域顯示或隱藏完整帳戶郵件。

---

## 👁️ 模型可見度開關 _（v3.5.6+）_

供應商頁面的模型列表現在包含：

- **即時搜尋/篩選列** — 快速尋找特定模型
- **各模型可見度開關**（👁 圖示）— 隱藏的模型會變灰，並從 `/v1/models` 目錄中排除
- **活躍數量徽章**（`N/M 活躍`）— 一目了然顯示啟用模型數量 vs 總數

---

## 🔧 OAuth 環境修復 _（v3.6.1+）_

OAuth 供應商的一鍵「修復環境」功能，可恢復遺失的環境變數並修復受損的驗證狀態。可從「儀表板 → 供應商 → [OAuth 供應商] → 修復環境」進入。自動偵測並修復：

- 遺失的 OAuth 客戶端憑證
- 損毀的 env 檔案條目
- 備份路徑清理

---

## 🗑️ 解除安裝 / 完整解除安裝 _（v3.6.2+）_

所有安裝方式的乾淨移除腳本：

| 指令                     | 動作                                                                             |
| ------------------------ | -------------------------------------------------------------------------------- |
| `npm run uninstall`      | 移除系統應用程式，但**保留您的資料庫與配置**於 `~/.omniroute` 中。              |
| `npm run uninstall:full` | 移除應用程式，並**永久清除所有配置、金鑰與資料庫**。                            |

---

## 🖼️ 媒體 _（v2.0.3+）_

從儀表板產生圖片、影片及音樂。支援 OpenAI、xAI、Together、Hyperbolic、SD WebUI、ComfyUI、AnimateDiff、Stable Audio Open 及 MusicGen。

---

## 📝 請求記錄

即時請求記錄，可依供應商、模型、帳戶及 API 金鑰篩選。顯示狀態碼、Token 用量、延遲及回應詳細資料。

![用量記錄](../screenshots/08-usage.png)

---

## 🌐 API 端點

統一的 API 端點，包含功能 breakdown：Chat Completions、Responses API、Embeddings、圖片生成、Reranking、音訊轉錄、文字轉語音、Moderations 及已註冊的 API 金鑰。支援 Cloudflare Quick Tunnel、Tailscale Funnel、ngrok Tunnel 及雲端代理，便於遠端存取。

![端點儀表板](../screenshots/09-endpoint.png)

---

## 🔑 API 金鑰管理

建立、設定範圍及撤銷 API 金鑰。每個金鑰可限制為特定模型/供應商，並可設定完整存取或唯讀權限。視覺化金鑰管理，附用量追蹤。

---

## 📋 稽核記錄

管理操作追蹤，可依操作類型、執行者、目標、IP 位址及時間戳篩選。完整安全事件歷史記錄。

---

## 🖥️ 桌面應用程式

原生 Electron 桌面應用程式，支援 Windows、macOS 及 Linux。將 OmniRoute 作為獨立應用程式執行，包含系統列整合、離線支援、自動更新及一鍵安裝。

主要功能：

- 伺服器就緒輪詢（冷啟動時無白畫面）
- 系統列及埠號管理
- Content Security Policy
- 單實例鎖定
- 重啟時自動更新
- 平台條件式 UI（macOS 交通號誌燈、Windows/Linux 預設標題列）
- 強化 Electron 建置打包 — 獨立套件中的符號連結 `node_modules` 會在打包前被偵測並拒絕，防止執行時期依賴建置機器（v2.5.5+）
- **優雅關機** — Electron `before-quit` 會乾淨地關閉 Next.js，防止 SQLite WAL 資料庫鎖定（v3.6.2+）

📖 完整文件請參閱 [`electron/README.md`](../../electron/README.md)。

---

## 🌐 V1 WebSocket 橋接器 _（v3.6.6+）_

OmniRoute 現在透過 `/v1/ws` 升級端點支援 **OpenAI 相容的 WebSocket 客戶端**。自訂的 `scripts/dev/v1-ws-bridge.mjs` 伺服器包裝 Next.js，並將 WS 連線升級為完整的雙向串流階段。驗證使用與 HTTP 請求相同的 API 金鑰或階段 Cookie。

主要行為：

- WS 升級在連線建立前由 `src/lib/ws/handshake.ts` 驗證
- 階段關閉或上游錯誤時，串流會乾淨終止
- 可與現有的 HTTP+SSE 串流路徑同時運作

---

## 🔑 同步 Token 與配置套件 _（v3.6.6+）_

現在可透過**限域同步 token** 進行多裝置及外部操作者存取：

- **`POST /api/sync/tokens`** — 簽發新的同步 token（限域，可選到期時間）
- **`DELETE /api/sync/tokens/:id`** — 撤銷 token
- **`GET /api/sync/bundle`** — 下載所有非敏感設定的版本化、ETag 鍵控 JSON 快照（密碼已脫敏）

配置套件由 `src/lib/sync/bundle.ts` 建構。消費者可比對 `ETag` 回應標頭來偵測變更，無需重新下載完整內容。

---

## 🧠 GLM Thinking 預設 _（v3.6.6+）_

**GLM Thinking（`glmt`）** 現已註冊為一級供應商：65,536 最大輸出 token、24,576 思考預算、900 秒預設逾時、Claude 相容 API 格式，及與 GLM 系列的共用用量同步。

**混合 Token 計數** 也在 v3.6.6 中登場：當 Claude 相容供應商暴露 `/messages/count_tokens` 端點時，OmniRoute 會在大請求前呼叫它，並附帶優雅的估算備援。

---

## 🛡️ 安全外出擷取與 SSRF 防護 _（v3.6.6+）_

所有供應商驗證及模型探索呼叫現在都會通過兩層外出防護：

1. **URL 防護**（`src/shared/network/outboundUrlGuard.ts`）— 在 socket 開啟前封鎖私有/迴路/連結本地 IP 範圍
2. **安全擷取包裝**（`src/shared/network/safeOutboundFetch.ts`）— 套用 URL 防護、標準化逾時，並以指數退避重試暫時性錯誤

防護違規會以 HTTP 422（`URL_GUARD_BLOCKED`）呈現，並透過 `providerAudit.ts` 寫入合規稽核記錄。

---

## 🔄 冷卻感知重試 _（v3.6.6+）_

當上游供應商回傳模型層級冷卻時，聊天請求現在會**自動重試**。可透過 `REQUEST_RETRY`（預設：2）及 `MAX_RETRY_INTERVAL_SEC`（預設：30 秒）設定。速率限制標頭學習已改進，涵蓋 `x-ratelimit-reset-requests`、`x-ratelimit-reset-tokens` 及 `Retry-After`——各模型冷卻狀態可在「抗災能力」儀表板中檢視。

---

## 📋 合規稽核 v2 _（v3.6.6+）_

稽核記錄已擴充，包含游標分頁、請求上下文豐富化（請求 ID、使用者代理、IP）、結構化驗證事件、含差異上下文的供應商 CRUD 事件，以及 SSRF 封鎖驗證記錄。新事件由 `src/lib/compliance/providerAudit.ts` 發送。
