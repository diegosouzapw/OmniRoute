---
title: "疑難排解"
version: 3.8.49
lastUpdated: 2026-07-15
---

# 疑難排解

> **給使用者**：想要快速解決問題？請參考下方的[快速參考](#快速參考)。

🌐 **語言：** 🇺🇸 [English](../../../../guides/TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../../pt-BR/docs/guides/TROUBLESHOOTING.md) | 🇪🇸 [Español](../../es/docs/guides/TROUBLESHOOTING.md) | 🇫🇷 [Français](../../fr/docs/guides/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../../it/docs/guides/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../../ru/docs/guides/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../../zh-CN/docs/guides/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../../de/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../../in/docs/guides/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../../th/docs/guides/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../../uk-UA/docs/guides/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../../ar/docs/guides/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../../ja/docs/guides/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../../vi/docs/guides/TROUBLESHOOTING.md) | 🇧🇬 [Български](../../bg/docs/guides/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../../da/docs/guides/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../../fi/docs/guides/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../../he/docs/guides/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../../hu/docs/guides/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../../id/docs/guides/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../../ko/docs/guides/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../../ms/docs/guides/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../../nl/docs/guides/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../../no/docs/guides/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../../pt/docs/guides/TROUBLESHOOTING.md) | 🇷🇴 [Română](../../ro/docs/guides/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../../pl/docs/guides/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../../sk/docs/guides/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../../sv/docs/guides/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../../phi/docs/guides/TROUBLESHOOTING.md) | 🇨🇿 [Čeština](../../cs/docs/guides/TROUBLESHOOTING.md)

OmniRoute 的常見問題與解決方案。

---

## 快速參考

**剛接觸 OmniRoute？** 從這裡開始 — 這些能解決 90% 的問題：

| 我看見這個              | 代表什麼                         | 該怎麼做                                                                                     |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| 「無法連線」            | OmniRoute 未在執行               | 執行 `omniroute` 或 `docker restart omniroute`                                                  |
| 「API 金鑰無效」        | 金鑰錯誤或已過期                 | 從供應商網站重新複製金鑰                                                                        |
| 「超出速率限制」        | 請求傳送過於頻繁                 | 等待 1 分鐘，或使用 `model: "auto"` 自動切換                                                    |
| 「超出配額」            | 免費/付費配額已用完              | 連接更多供應商，或使用免費供應商（Kiro, Pollinations）                                            |
| 「回應緩慢」            | 供應商忙碌或距離較遠             | 使用 `model: "auto/fast"` 或連接較快的供應商（Groq, Cerebras）                                  |
| 「使用了錯誤的供應商」  | `auto` 選了不同的供應商          | 這是正常的！`auto` 會選最好的。使用 `model: "openai/gpt-4o"` 來強制指定供應商                    |
| 「502 Bad Gateway」     | 供應商故障                       | 等待後重試，或使用 `model: "auto"` 切換供應商                                                   |
| 「401 Unauthorized」    | 憑證錯誤                         | 檢查 API 金鑰或重新透過 OAuth 認證                                                               |
| 「429 Too Many Requests」| 已達速率限制                      | 等待 1 分鐘，或連接更多供應商                                                                    |

**還是卡住了？** 請參考下方的[詳細疑難排解](#詳細疑難排解)，或在 [Discord](https://discord.gg/U47eFqAXCn) 上提問。

---

## 詳細疑難排解

---

## 快速修復

| 問題                                                | 解決方案                                                                                                                                                   |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 首次登入無法運作                                     | 在 `.env` 中設定 `INITIAL_PASSWORD`（無硬編碼預設值）                                                                                                         |
| 儀表板開啟在錯誤的連接埠                             | 設定 `PORT=20128` 和 `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                                                                                            |
| 沒有日誌寫入磁碟                                     | 設定 `APP_LOG_TO_FILE=true`，並確認呼叫記錄捕捉功能已啟用                                                                                                      |
| EACCES：權限被拒                                     | 設定 `DATA_DIR=/path/to/writable/dir` 以覆蓋 `~/.omniroute`                                                                                                   |
| 路由策略未儲存                                       | 更新至最新的 v3.x 版本（早期版本已修復 Zod schema 以確保設定持續性）                                                                                            |
| 登入崩潰／空白頁面                                   | 檢查 Node.js 版本 — 請參閱下方的 [Node.js 相容性](#nodejs-相容性)                                                                                              |
| `dlopen` / `slice is not valid mach-o file`（macOS）| 執行 `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` — 請參閱下方的 [macOS 原生模組重建](#macos-原生模組重建)                    |
| Proxy「fetch 失敗」                                  | 確保 Proxy 設定在正確的層級 — 請參閱下方的 [Proxy 問題](#proxy-問題)                                                                                          |
| 防毒軟體隔離 `README.md`                             | 誤判 — 請參閱下方的[防毒軟體誤判](#防毒軟體誤判)                                                                                                              |
| Kaspersky 將桌面應用程式標記為木馬                    | 未簽署安裝程式的行為分析誤判 — 請參閱下方的[防毒軟體誤判](#防毒軟體誤判)                                                                                      |

---

## 防毒軟體誤判

<a name="防毒軟體誤判"></a>

### Avast/AVG 將 `README.md` 隔離並標記為 `MD:HttpRequest-inf[Susp]`

**這是誤判。沒有任何檔案受感染，也無需任何操作。**

Avast 和 AVG 執行啟發式掃描，會將包含大量類似 HTTP 請求連結的純文字/Markdown 檔案標記為可疑。OmniRoute 的 `README.md` 隨 npm 套件一起發布（它列在 `package.json` → `files` 中），因此在全域安裝時會出現在 `node_modules/omniroute/README.md` — 而其中包含約 15 個 `http://localhost:20128/...` 的範例（MCP HTTP/SSE 端點、A2A `.well-known` URL 以及 `curl` 程式碼片段）。這樣的連結密度足以觸發啟發式掃描。

如果這個問題是最近才發生的：檔案的本質並未改變。README 增加了端點表格（新增了 MCP HTTP + SSE + A2A）和更多 `curl` 範例，使其超過了閾值。

該檔案是沒有可執行內容的靜態文件。您可以安全地將其從隔離區還原。

**該怎麼做：**

1. **停止通知** — 在防毒軟體中排除安裝目錄（Avast：設定 → 例外），加入您的全域 `node_modules` 路徑和/或 OmniRoute 資料目錄（`~/.omniroute/`）。
2. **回報誤判** — <https://www.avast.com/false-positive-file-form.php>，附上被隔離的 `README.md`。這能幫助所有人，因為這是供應商的啟發式掃描對文字檔案的過度反應。

**為什麼我們不在這邊「修復」這個問題：** 範例全都是 `http://localhost`，而 localhost 若要使用 `https` 會需要自簽憑證，增加使用摩擦。為了避開某家廠商的啟發式掃描而修改文件，會損害所有讀者的閱讀體驗，只為了一個掃描器的錯誤。

### Kaspersky 將桌面應用程式標記為 `PDM:Trojan.Win32.Generic`

**這是行為啟發式掃描的誤判。沒有任何檔案受感染。** Kaspersky 的 `PDM:` 前綴表示判定來自其主動防禦模組（系統監控器），該模組根據安裝程式的*行為*來判斷，而非比對已知惡意軟體。當觸發時，Kaspersky 會「回滾」整個安裝過程 — 刪除它已經寫入的檔案 — 因此應用程式最終會損壞或遺失。

被標記的檔案是桌面應用程式所捆綁的、已聲明的開源依賴的標準組件，例如：

- `resources/app/.build/next/node_modules/playwright-<hash>/lib/…/agentParser.js` 和 `workerProcessEntry.js` — [Playwright](https://playwright.dev)，用於應用程式內供應商登入和瀏覽器支援聊天的瀏覽器自動化函式庫。
- `resources/app/.build/next/node_modules/tls-client-node-<hash>/bin/tls-client-windows-64-<ver>.dll` — 來自 `tls-client-node` 的原生二進位檔案，用於某些網路供應商的 Cloudflare 相容 HTTP。

**為什麼會觸發：** Windows 安裝程式**尚未進行程式碼簽署**，因此未簽署的 NSIS 安裝程式沒有信譽，行為啟發式掃描會以最大強度執行。加上捆綁的原生 DLL 和數百個寫入 `%LOCALAPPDATA%\Programs\OmniRoute` 的 `.js` 檔案（包括 Next.js 獨立建置的雜湊後綴套件目錄），這就足以觸發啟發式掃描。程式碼簽署已規劃中；在完成之前，新版本可能會重複觸發此問題。

**該怎麼做：**

1. **先驗證您的下載**（排除檔案被竄改的可能性）。每個版本都會發布 `latest.yml`，其 `sha512` 欄位（base64）涵蓋 `OmniRoute.Setup.<version>.exe` 安裝程式。在 PowerShell 中，從包含安裝程式的目錄執行：
   ```powershell
   $b = [System.Security.Cryptography.SHA512]::Create().ComputeHash(
     [System.IO.File]::ReadAllBytes("$PWD\OmniRoute.Setup.<version>.exe"))
   [Convert]::ToBase64String($b)
   ```
   輸出必須與 `latest.yml` → `sha512` 相符。如果不符，請刪除檔案並僅從 [GitHub 發布頁面](https://github.com/diegosouzapw/OmniRoute/releases) 重新下載。
2. **還原 + 排除** — 從隔離區還原被回滾的項目，並為 `%LOCALAPPDATA%\Programs\OmniRoute` 加入排除規則（Kaspersky → 設定 → 威脅與排除），然後重新安裝。
3. **回報誤判** — <https://opentip.kaspersky.com/>。使用者提交的誤判報告確實能加速允許清單的建立。

---

## Node.js 相容性

<a name="nodejs-相容性"></a>

### 登入頁面崩潰或顯示「Module self-registration」錯誤

**原因：** 您執行的 Node.js 版本低於 OmniRoute 核准的安全執行環境最低版本。最常見的情況是執行較舊的 Node 22 或 24 修補版本，低於 OmniRoute 所需的修補安全門檻。

**症狀：**

- 登入頁面顯示空白畫面或伺服器錯誤
- 主控台顯示 `Error: Module did not self-register` 或類似的原生綁定錯誤
- 如果執行環境超出支援的安全政策範圍，登入頁面會顯示**橘色警告橫幅**，上面有您的 Node 版本

**修復方式：**

1. 安裝支援的 Node.js LTS 版本（建議：Node.js 24.x）：
   ```bash
   nvm install 24
   nvm use 24
   ```
2. 驗證版本：`node --version` 應顯示 `v24.0.0` 或更高的 24.x LTS 版本
3. 重新安裝 OmniRoute：`npm install -g omniroute`
4. 重新啟動：`omniroute`

> **支援的安全版本：** `>=22.22.2 <23` 或 `>=24.0.0 <27`。Node.js 24.x LTS（Krypton）和 Node.js 26 皆受完整支援。

### macOS：`dlopen` /「slice is not valid mach-o file」

<a name="macos-原生模組重建"></a>

**原因：** 在全域 `npm install -g omniroute` 之後，套件內的 `better-sqlite3` 原生二進位檔案可能是為與本地執行環境不同的架構或 Node.js ABI 所編譯。這在 macOS（Apple Silicon 和 Intel 皆適用）上很常見，當預先編譯的二進位檔案與您的環境不符時就會發生。

**症狀：**

- 伺服器在啟動時立即失敗，出現 `dlopen` 錯誤
- 錯誤訊息包含 `slice is not valid mach-o file`
- 完整範例：

```
dlopen(/Users/<user>/.nvm/versions/node/v24.14.1/lib/node_modules/omniroute/app/node_modules/better-sqlite3/build/Release/better_sqlite3.node, 0x0001): tried: '...' (slice is not valid mach-o file)
```

**修復方式 — 為您的本地環境重建（無需降級 Node.js）：**

```bash
cd $(npm root -g)/omniroute/app
npm rebuild better-sqlite3
omniroute
```

> **注意：** 這會針對您當地的 Node.js 版本和 CPU 架構重新編譯原生綁定，解決二進位檔案不匹配的問題。官方支援的執行環境範圍為 **`>=22.22.2 <23` 或 `>=24.0.0 <27`**（`src/shared/utils/nodeRuntimeSupport.ts` 中的 `SUPPORTED_NODE_RANGE`，與 `package.json` 的 `engines` 欄位一致）。Node.js 24.x LTS（Krypton）和 Node.js 26 搭配 `better-sqlite3` v12.x 皆受完整支援。

---

## Proxy 問題

<a name="proxy-問題"></a>

### 供應商驗證顯示「fetch 失敗」

**原因：** API 金鑰驗證端點（`POST /api/providers/validate`）先前會繞過 Proxy 設定，導致在需要 Proxy 路由的環境中失敗。

**修復方式（v3.5.5+）：** 此問題現已修復。供應商驗證會透過 `runWithProxyContext` 路由，自動遵循供應商層級和全域的 Proxy 設定。

### Token 健康狀態檢查失敗，顯示「fetch 失敗」

**原因：** 背景 OAuth Token 刷新未針對每個連線解析 Proxy 設定。

**修復方式（v3.5.5+）：** Token 健康狀態檢查排程器現在會在嘗試刷新前，先為每個連線解析 Proxy 設定。請更新至 v3.5.5+。

### SOCKS5 Proxy 回傳「invalid onRequestStart method」

**原因：** 在 Node.js 22 上，undici@8 的分派器與 Node 內建的 `fetch()` 實作不相容。

**修復方式（v3.5.5+）：** OmniRoute 現在在啟用 Proxy 分派器時使用 undici 自己的 `fetch()` 函式，確保行為一致。請更新至 v3.5.5+。

### WSL 下的 MITM Proxy：Windows 主機上的桌面應用程式未被攔截

**原因：** MITM Proxy 及其 CA 憑證會安裝在 OmniRoute 執行的環境中。在 WSL 下，該環境是 Linux 客體，而 AI 桌面應用程式（Kiro、Trae、Copilot、Zed 等）則在 Windows 主機上執行。主機應用程式不信任客體的憑證儲存區，也不會透過客體的系統 Proxy 路由，因此桌面攔截無法在該處生效。

**建議：** 在與您要攔截的桌面應用程式相同的作業系統上原生執行 OmniRoute（Windows 應用程式用 Windows；macOS/Linux 同理）。在 WSL 內執行 OmniRoute 同時鎖定主機應用程式，需要手動在 Windows 主機上信任所產生的 CA 憑證，並將每個主機應用程式的網路/Proxy 設定指向 WSL Proxy 端點 — 這是不受支援且脆弱的設定。

---

## 供應商問題

###「Language model did not provide messages」

**原因：** 供應商配額已用完。

**修復方式：**

1. 檢查儀表板配額追蹤器
2. 使用包含備援層級的組合
3. 切換至較便宜/免費的方案

### 速率限制

**原因：** 訂閱配額已用完。

**修復方式：**

- 加入備援：`cc/claude-opus-4-6 → glm/glm-4.7 → if/qwen3.8-max-preview`
- 使用 GLM/MiniMax 作為便宜的備援方案

### OAuth Token 已過期

OmniRoute 會自動刷新 Token。如果問題持續存在：

1. 儀表板 → 供應商 → 重新連線
2. 刪除並重新加入供應商連線

### Kiro 多帳號：第二個帳號使第一個帳號失效

**原因：** Kiro 的後端對每個 OIDC 用戶端註冊強制執行單一活躍階段。當兩個帳號共用相同的已註冊用戶端（v3.8.0 之前匯入的連線）時，刷新一個帳號的 Token 會使另一個帳號的刷新 Token 失效。

**修復方式（v3.8.0+）：** 重新匯入受影響的連線。從 v3.8.0 開始，每個透過**匯入 Token**、**Google/GitHub 社群登入**或**自動匯入**建立的新 Kiro 連線，都會自動註冊其專屬的 OIDC 用戶端。因此該連線完全隔離，刷新一個帳號不會影響任何其他帳號。

在 v3.8.0 *之前*匯入的連線不帶有每個連線的用戶端註冊。這些連線會繼續使用共用的社群登入刷新端點。若要獲得隔離，請從儀表板 → 供應商刪除舊連線，並透過三種匯入流程之一重新加入。

如需完整詳細資訊和逐步新增兩個 Kiro 帳號的說明，請參閱 [`docs/guides/KIRO_SETUP.md`](./KIRO_SETUP.md)。

---

## 雲端問題

### 雲端同步錯誤

1. 確認 `BASE_URL` 指向您執行的實例（例如 `http://localhost:20128`）
2. 確認 `CLOUD_URL` 指向您的雲端端點（例如 `https://omniroute.dev`）
3. 保持 `NEXT_PUBLIC_*` 的值與伺服器端的值一致

### 雲端 `stream=false` 回傳 500

**症狀：** 雲端端點在非串流呼叫時出現 `Unexpected token 'd'...`。

**原因：** 上游回傳 SSE 負載，但用戶端預期的是 JSON。

**解決方法：** 對雲端直接呼叫使用 `stream=true`。本地執行環境包含 SSE→JSON 備援機制。

### 雲端顯示已連線但出現「API 金鑰無效」

1. 從本地儀表板（`/api/keys`）建立新的金鑰
2. 執行雲端同步：啟用雲端 → 立即同步
3. 舊的/未同步的金鑰仍可能在雲端回傳 `401`

---

## Docker 問題

### CLI 工具顯示未安裝

1. 檢查執行環境欄位：`curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. 對於可攜帶模式：使用映像檔目標 `runner-cli`（內建 CLI）
3. 對於主機掛載模式：設定 `CLI_EXTRA_PATHS` 並將主機 bin 目錄以唯讀方式掛載
4. 如果 `installed=true` 且 `runnable=false`：二進位檔案已找到但健康檢查失敗

### 快速執行環境驗證

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## 成本問題

### 成本過高

1. 在儀表板 → 使用量中檢查用量統計
2. 將主要模型切換至 GLM/MiniMax
3. 對非關鍵任務使用免費方案（Qoder、Kiro）
4. 為每個 API 金鑰設定成本預算：儀表板 → API 金鑰 → 預算

---

## 除錯

### 啟用日誌檔案

在 `.env` 檔案中設定 `APP_LOG_TO_FILE=true`。應用程式日誌會寫入 `logs/` 目錄下。
請求工件會在啟用呼叫記錄管線時儲存在 `${DATA_DIR}/call_logs/` 目錄下。
啟用管線捕捉時，設定 `CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS=false` 可省略串流區塊負載，或調整 `CALL_LOG_PIPELINE_MAX_SIZE_KB` 來變更工件大小上限（KB）。

### 檢查供應商健康狀態

```bash
# 健康狀態儀表板
http://localhost:20128/dashboard/health

# API 健康狀態檢查
curl http://localhost:20128/api/monitoring/health
```

### 執行環境儲存

- 主要狀態：`${DATA_DIR}/storage.sqlite`（供應商、組合、別名、金鑰、設定）
- 使用量：`storage.sqlite` 中的 SQLite 表格（`usage_history`、`call_logs`、`proxy_logs`）+ 選用的 `${DATA_DIR}/call_logs/`
- 應用程式日誌：`<repo>/logs/...`（當 `APP_LOG_TO_FILE=true` 時）
- 呼叫記錄工件：啟用呼叫記錄管線時在 `${DATA_DIR}/call_logs/YYYY-MM-DD/...` 下

請求記錄頁面的**清理歷史記錄**動作會清除 `call_logs`、舊的 `request_detail_logs` 以及本地的 `${DATA_DIR}/call_logs/` 工件目錄。

---

## 斷路器問題

### 供應商卡在 OPEN 狀態

當供應商的斷路器處於 OPEN 狀態時，請求將被阻擋直到冷卻時間結束。

**修復方式：**

1. 前往**儀表板 → 設定 → 備援**
2. 檢查受影響供應商的斷路器卡片
3. 點擊**全部重設**以清除所有斷路器，或等待冷卻時間結束
4. 在重設前確認供應商確實可用

### 供應商持續觸發斷路器

如果供應商反覆進入 OPEN 狀態：

1. 檢查**儀表板 → 健康狀態 → 供應商健康狀態**以了解失敗模式
2. 前往**設定 → 備援 → 供應商設定檔**並提高失敗閾值
3. 檢查供應商是否變更了 API 限制或需要重新認證
4. 檢閱延遲遙測資料 — 高延遲可能導致基於超時的失敗

---

## 語音轉文字問題

###「Unsupported model」錯誤

- 確保使用正確的前綴：`deepgram/nova-3` 或 `assemblyai/best`
- 確認該供應商已在**儀表板 → 供應商**中連線

### 轉錄回傳空值或失敗

- 檢查支援的音訊格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`
- 確認檔案大小在供應商限制內（通常 < 25MB）
- 在供應商卡片中檢查供應商 API 金鑰的有效性

---

## 翻譯器除錯

使用**儀表板 → 翻譯器**來除錯格式翻譯問題：

| 模式             | 使用時機                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **遊樂場**       | 並排比較輸入/輸出格式 — 貼上失敗的請求以查看翻譯結果                                              |
| **聊天測試器**   | 發送即時訊息並檢查完整的請求/回應負載，包括標頭                                                    |
| **測試平台**     | 跨格式組合執行批次測試，找出哪些翻譯有問題                                                         |
| **即時監控器**   | 監控即時請求流程，捕捉間歇性的翻譯問題                                                             |

### 常見格式問題

- **思考標籤未顯示** — 檢查目標供應商是否支援思考功能以及思考預算設定
- **工具呼叫被遺漏** — 某些格式翻譯可能會移除不支援的欄位；請在遊樂場模式中驗證
- **系統提示詞遺失** — Claude 和 Gemini 處理系統提示詞的方式不同；請檢查翻譯輸出
- **SDK 回傳原始字串而非物件** — 已在 v1.x 中解決；回應清理器會移除導致 OpenAI SDK Pydantic 驗證失敗的非標準欄位（`x_groq`、`usage_breakdown` 等）。如果您在 v3.x+ 仍看到此問題，請提交 issue。
- **GLM/ERNIE 拒絕 `system` 角色** — 已在 v1.x 中解決；角色正規化器會自動將系統訊息合併到使用者訊息中，以相容不相容的模型。如果您在 v3.x+ 仍看到此問題，請提交 issue。
- **`developer` 角色不被辨識** — 已在 v1.x 中解決；對非 OpenAI 供應商會自動轉換為 `system`。如果您在 v3.x+ 仍看到此問題，請提交 issue。
- **`json_schema` 在 Gemini 上無法使用** — 已在 v1.x 中解決；`response_format` 現在會轉換為 Gemini 的 `responseMimeType` + `responseSchema`。如果您在 v3.x+ 仍看到此問題，請提交 issue。

---

## 備援設定

### 自動速率限制未觸發

- 自動速率限制僅適用於 API 金鑰供應商（不適用於 OAuth/訂閱）
- 確認**設定 → 備援 → 供應商設定檔**已啟用自動速率限制
- 檢查供應商是否回傳 `429` 狀態碼或 `Retry-After` 標頭

### 調整指數退避

供應商設定檔支援以下設定：

- **基本延遲** — 首次失敗後的初始等待時間（預設：1 秒）
- **最大延遲** — 等待時間上限（預設：30 秒）
- **乘數** — 每次連續失敗延遲的增加倍率（預設：2 倍）

### 防止驚群效應

當大量並發請求湧入一個已達速率限制的供應商時，OmniRoute 會使用互斥鎖 + 自動速率限制來序列化請求，防止連鎖失敗。這對 API 金鑰供應商是自動生效的。

---

## 選用：RAG / LLM 失敗分類（16 種問題）

部分 OmniRoute 使用者將閘道器部署在 RAG 或 Agent 堆疊之前。在這些設定中，常會看到一種奇怪的現象：OmniRoute 看起來正常（供應商正常、路由設定檔無誤、無速率限制警示），但最終答案仍然錯誤。

實際上，這些問題通常來自下游的 RAG 管線，而非閘道器本身。

如果您想要一個共享的詞彙來描述這些失敗，可以使用 WFGY ProblemMap，這是一個外部的 MIT 授權文字資源，定義了十六種常見的 RAG / LLM 失敗模式。高層次涵蓋：

- 檢索偏移與中斷的上下文邊界
- 空索引或過時索引以及向量儲存庫
- 嵌入與語義不匹配
- 提示詞組裝與上下文視窗問題
- 邏輯崩潰與過度自信的答案
- 長鏈與 Agent 協調失敗
- 多 Agent 記憶與角色偏移
- 部署與啟動順序問題

概念很簡單：

1. 當您調查一個錯誤回應時，記錄：
   - 使用者的任務與請求
   - OmniRoute 中的路由或供應商組合
   - 下游使用的任何 RAG 上下文（檢索的文件、工具呼叫等）
2. 將事件對應到一或兩個 WFGY ProblemMap 編號（`No.1` … `No.16`）。
3. 將編號儲存在您自己的儀表板、Runbook 或事件追蹤器中，放在 OmniRoute 日誌旁邊。
4. 使用對應的 WFGY 頁面來決定是否需要變更您的 RAG 堆疊、檢索器或路由策略。

完整文字與具體做法在此（MIT 授權，僅文字）：

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

如果您沒有在 OmniRoute 後方執行 RAG 或 Agent 管線，可以忽略本節。

---

## v3.8.0 已知問題

v3.8.0 版本特有的問題及其目前的解決方法。如果後續修補版本中提供了修復，本條目將會更新或移除。

### Windsurf OAuth 流程失敗，顯示 401

**症狀：**

- 從儀表板完成 Windsurf OAuth 流程時出現「401 unauthorized」
- 回呼後 Windsurf 供應商卡片仍停留在「需要重新連線」狀態

**原因：**

- `WINDSURF_FIREBASE_API_KEY` 環境變數遺失或為空
- `WINDSURF_API_KEY` 設定錯誤或指向過期的 Token
- 本地防火牆/Proxy 阻擋了 OAuth 回呼

**修復方式：**

1. 確認 `.env` 中已設定 `WINDSURF_FIREBASE_API_KEY` 和 `WINDSURF_API_KEY`
2. 重新啟動 OmniRoute 以載入新的環境變數值
3. 從**儀表板 → 供應商 → Windsurf → 重新連線**重新執行 OAuth 流程

### Devin CLI 認證失敗

**症狀：**

- 呼叫 Devin 相關工具時出現「Devin CLI not found」或「auth failed」
- CLI 執行環境檢查回報 `installed=false`

**原因：**

- `CLI_DEVIN_BIN` 指向不存在的路徑
- 主機上未安裝 Devin CLI

**修復方式：**

1. 為您的平台安裝 Devin CLI
2. 在 `.env` 中設定 `CLI_DEVIN_BIN=/usr/local/bin/devin`（或實際路徑）
3. 重新啟動 OmniRoute 並從**儀表板 → CLI 工具**重新測試

### 模型冷卻卡住（手動重設）

**症狀：**

- 模型在冷卻時間過後仍列在冷卻清單中
- 儘管時間戳記已在過去，請求在組合路由中仍跳過該模型

**手動重設：**

- **儀表板：** **設定 → 模型冷卻** → 點擊受影響卡片上的**重新啟用**
- **API：** 使用管理認證標頭呼叫 `DELETE /api/resilience/model-cooldowns`

### Command Code 供應商連線失敗，顯示 403

**症狀：**

- 測試 Command Code 供應商連線時出現 403
- 剛新增後供應商卡片顯示「unauthorized」

**原因：** OAuth 流程未完成（回呼未收到或 Token 未持久化）。

**修復方式：**

- 從 CLI 執行 `omniroute providers` 以重新觸發 OAuth 流程，或
- 從**儀表板 → 供應商 → Command Code → 重新連線**重新執行 OAuth

### ModelScope 回傳積極的 429 冷卻

**症狀：**

- 在 ModelScope 上，少量請求突發後出現非常短或立即的冷卻
- 組合路由比預期更早跳過 ModelScope

**原因：** ModelScope 會發出供應商特定的 `Retry-After` 標頭。v3.8.0 提供了專門處理這些標頭的功能，因此較舊的版本會將其誤讀為一般的速率限制提示。

**修復方式：**

- 確保您使用 v3.8.0 或更新版本
- 確認**設定 → 備援**下的 `useUpstream429BreakerHints` 切換已啟用

### OMNIROUTE_WS_BRIDGE_SECRET 在生產環境中遺失

**症狀：**

- 在遠端生產主機上執行時，每個 Codex/Responses WebSocket 橋接請求都出現 401
- WebSocket 橋接握手在連線後立即關閉

**原因：** 生產環境缺少 `OMNIROUTE_WS_BRIDGE_SECRET` 環境變數。

**修復方式：**

1. 產生隨機密鑰：`openssl rand -hex 32`
2. 在生產伺服器環境中設定 `OMNIROUTE_WS_BRIDGE_SECRET=<隨機密鑰>`（以及任何與橋接通訊的用戶端）
3. 重新啟動 OmniRoute

### Responses API：背景模式降級為同步

**症狀：**

- 記錄警告：`background mode degraded to synchronous`
- `background: true` 請求回傳正常的同步回應，而非背景工作控制代碼

**原因：** v3.8.0 會故意將 Responses API 上的 `background: true` 降級為同步執行，同時發出警告。完整的非同步背景執行是未來的交付項目。

**修復方式：**

- 調整用戶端在不使用 `background` 的情況下呼叫，或
- 等待後續發布完整非同步背景模式的版本（請關注更新日誌）

---

## 還是卡住了？

- **GitHub Issues**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **架構**：請參閱 [`docs/architecture/ARCHITECTURE.md`](../architecture/ARCHITECTURE.md) 了解內部細節
- **API 參考**：請參閱 [`docs/reference/API_REFERENCE.md`](../reference/API_REFERENCE.md) 了解所有端點
- **健康狀態儀表板**：查看**儀表板 → 健康狀態**以取得即時系統狀態
- **翻譯器**：使用**儀表板 → 翻譯器**來除錯格式問題
